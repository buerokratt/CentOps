import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Manifest } from '../../types/manifest';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, DataTable, Dialog, Icon, Track } from '../../components';
import { createColumnHelper } from '@tanstack/react-table';
import { format } from 'date-fns';
import { capitalizeFirst } from '../../utils/capatalizeFirst';
import {
  AiFillCheckCircle,
  AiFillCloseCircle,
  AiFillDelete,
  AiFillEye,
} from 'react-icons/ai';
import api from '../../services/api';
import { useToast } from '../../hooks/useToast';
import { AxiosError } from 'axios';
import { MdPublish } from 'react-icons/md';
import animationData from '../../lottie/noUpdates.json';
import Lottie from 'react-lottie';

const ManifestsUpdatesPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const toast = useToast();
  const [currentRow, setCurrentRow] = useState<string | number | null>(null);
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] =
    useState(false);
  const lottieDefaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  const { data: updates } = useQuery<Manifest[]>({
    queryKey: ['manifest/updates'],
  });

  const approveUpdateMutation = useMutation({
    mutationFn: (updateId: string | number | null) =>
      api.post('manifest/approve-update', {
        update_id: updateId,
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries(['manifest/updates']);
      toast.open({
        type: 'success',
        title: t('global.notification'),
        message: t('manifest.updateApproveSuccess'),
      });
    },
    onError: (error: AxiosError) => {
      toast.open({
        type: 'error',
        title: t('global.notificationError'),
        message: error.message,
      });
    },
  });

  const rejectUpdateMutation = useMutation({
    mutationFn: (updateId: string | number | null) =>
      api.post('manifest/reject-update', {
        update_id: updateId,
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries(['manifest/updates']);
      toast.open({
        type: 'success',
        title: t('global.notification'),
        message: t('manifest.updateRejectSuccess'),
      });
    },
    onError: (error: AxiosError) => {
      toast.open({
        type: 'error',
        title: t('global.notificationError'),
        message: error.message,
      });
    },
  });

  const deleteUpdateMutation = useMutation({
    mutationFn: (updateId: string | number | null) =>
      api.post('manifest/delete-update', {
        update_id: updateId,
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries(['manifest/updates']);
      toast.open({
        type: 'success',
        title: t('global.notification'),
        message: t('manifest.updateDeleteSuccess'),
      });
      setCurrentRow(null);
    },
    onError: (error: AxiosError) => {
      toast.open({
        type: 'error',
        title: t('global.notificationError'),
        message: error.message,
      });
      setCurrentRow(null);
    },
  });

  const publishUpdateMutation = useMutation({
    mutationFn: (updateId: string | number | null) =>
      api.post('manifest/publish-update', {
        update_id: updateId,
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries(['manifest/updates']);
      toast.open({
        type: 'success',
        title: t('global.notification'),
        message: t('manifest.updatePublishSuccess'),
      });
    },
    onError: (error: AxiosError) => {
      toast.open({
        type: 'error',
        title: t('global.notificationError'),
        message: error.message,
      });
    },
  });

  const publishUpdate = async () => {};

  const appRequestColumnHelper = createColumnHelper<Manifest>();
  const appRequestColumns = useMemo(
    () => [
      appRequestColumnHelper.accessor('updateId', {
        header: 'Update Id',
        cell: (uniqueIdentifier) => uniqueIdentifier.getValue(),
      }),
      appRequestColumnHelper.accessor('parentManifestId', {
        header: 'Manifest ID',
        cell: (uniqueIdentifier) => uniqueIdentifier.getValue(),
      }),
      appRequestColumnHelper.accessor('createdAt', {
        header: 'Created At',
        cell: (uniqueIdentifier) =>
          format(
            new Date(uniqueIdentifier.getValue() ?? ''),
            'dd-MM-yyyy hh:mm a'
          ),
      }),
      appRequestColumnHelper.accessor('status', {
        header: 'Status',
        cell: (uniqueIdentifier) =>
          capitalizeFirst(uniqueIdentifier.getValue() ?? '').replaceAll(
            '_',
            ' '
          ),
      }),
      appRequestColumnHelper.display({
        header: '',
        cell: (props) => (
          <Icon
            icon={
              <AiFillEye
                fontSize={22}
                color="rgba(36, 89, 158, 1)"
                onClick={() =>
                  navigate(
                    `/centops/manifests/details/${props.row.original.updateId}`,
                    {
                      state: props.row.original,
                    }
                  )
                }
              />
            }
            size="medium"
          />
        ),
        id: 'view',
        meta: {
          size: '1%',
        },
      }),
      appRequestColumnHelper.display({
        header: '',
        cell: (props) =>
          props.row.original.status === 'pending_approval' && (
            <Icon
              icon={
                <AiFillCheckCircle
                  fontSize={22}
                  color="rgba(34,139,34, 1)"
                  onClick={() =>
                    approveUpdateMutation.mutate(
                      props.row.original.updateId ?? ''
                    )
                  }
                />
              }
              size="medium"
            />
          ),
        id: 'approve',
        meta: {
          size: '1%',
        },
      }),
      appRequestColumnHelper.display({
        header: '',
        cell: (props) =>
          props.row.original.status === 'pending_approval' && (
            <Icon
              icon={
                <AiFillCloseCircle
                  fontSize={22}
                  color="rgba(210, 4, 45, 1)"
                  onClick={() =>
                    rejectUpdateMutation.mutate(
                      props.row.original.updateId ?? ''
                    )
                  }
                />
              }
              size="medium"
            />
          ),
        id: 'reject',
        meta: {
          size: '1%',
        },
      }),
      appRequestColumnHelper.display({
        header: '',
        cell: (props) =>
          props.row.original.status === 'approved' && (
            <Icon
              icon={
                <MdPublish
                  fontSize={22}
                  color="rgba(34,139,34, 1)"
                  onClick={() =>
                    publishUpdateMutation.mutate(
                      props.row.original.updateId ?? ''
                    )
                  }
                />
              }
              size="medium"
            />
          ),
        id: 'publish',
        meta: {
          size: '1%',
        },
      }),
      appRequestColumnHelper.display({
        header: '',
        cell: (props) => (
          <Icon
            icon={
              <AiFillDelete
                fontSize={22}
                color="rgba(210, 4, 45, 1)"
                onClick={() => {
                  setCurrentRow(props.row.original.updateId ?? '');
                  setShowDeleteConfirmationModal(true);
                }}
              />
            }
            size="medium"
          />
        ),
        id: 'delete',
        meta: {
          size: '1%',
        },
      }),
    ],
    [updates, appRequestColumnHelper, t]
  );

  return (
    <>
      <h2>{t('menu.updates')}</h2>
      {updates && updates.length > 0 && (
        <DataTable data={updates} columns={appRequestColumns} />
      )}
      {showDeleteConfirmationModal && (
        <Dialog
          title={t('manifest.deleteUpdate')}
          onClose={() => setShowDeleteConfirmationModal((value) => !value)}
          footer={
            <>
              <Button
                appearance="secondary"
                onClick={() =>
                  setShowDeleteConfirmationModal((value) => !value)
                }
              >
                {t('global.cancel')}
              </Button>
              <Button
                appearance="primary"
                onClick={() => {
                  deleteUpdateMutation.mutate(currentRow);
                  setShowDeleteConfirmationModal((value) => !value);
                }}
              >
                {t('global.yes')}
              </Button>
            </>
          }
        >
          <div className="dialog__body">
            <h1
              style={{
                fontSize: '24px',
                fontWeight: '400',
                color: '#09090B',
              }}
            >
              {t('manifest.deleteUpdateQuestion')}
            </h1>
          </div>
        </Dialog>
      )}
      {updates && updates.length === 0 && (
        <Track direction="vertical" justify="center" align="center">
          <Lottie options={lottieDefaultOptions} height={300} width={200} />
          <label style={{ marginTop: '30px' }}>
            {t('manifest.noNewUpdates')}
          </label>
        </Track>
      )}
    </>
  );
};
export default ManifestsUpdatesPage;
