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
import { useToast } from '../../hooks/useToast';
import api from '../../services/api';
import { AxiosError } from 'axios';
import animationData from '../../lottie/noData.json';
import Lottie from 'react-lottie';

const NewManifestsPage: React.FC = () => {
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

  const { data: newManifests } = useQuery<Manifest[]>({
    queryKey: ['manifest/new-manifests'],
  });

  const approveManifestMutation = useMutation({
    mutationFn: (manifestId: string | number | null) =>
      api.post('manifest/approve-manifest', {
        manifest_id: manifestId,
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries(['manifest/new-manifests']);
      toast.open({
        type: 'success',
        title: t('global.notification'),
        message: t('manifest.manifestApproveSuccess'),
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

  const rejectManifestMutation = useMutation({
    mutationFn: (manifestId: string | number | null) =>
      api.post('manifest/reject-manifest', {
        manifest_id: manifestId,
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries(['manifest/new-manifests']);
      toast.open({
        type: 'success',
        title: t('global.notification'),
        message: t('manifest.manifestRejectSuccess'),
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

  const deleteManifestMutation = useMutation({
    mutationFn: (manifestId: string | number | null) =>
      api.post('manifest/delete-manifest', {
        manifest_id: manifestId,
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries(['manifest/new-manifests']);
      toast.open({
        type: 'success',
        title: t('global.notification'),
        message: t('manifest.manifestDeleteSuccess'),
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

  const appRequestColumnHelper = createColumnHelper<Manifest>();
  const appRequestColumns = useMemo(
    () => [
      appRequestColumnHelper.accessor('manifestId', {
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
                    `/centops/manifests/details/${props.row.original.manifestId}`,
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
        cell: (props) => (
          <Icon
            icon={
              <AiFillCheckCircle
                fontSize={22}
                color="rgba(34,139,34, 1)"
                onClick={() =>
                  approveManifestMutation.mutate(
                    props.row.original.manifestId ?? ''
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
        cell: (props) => (
          <Icon
            icon={
              <AiFillCloseCircle
                fontSize={22}
                color="rgba(210, 4, 45, 1)"
                onClick={() =>
                  rejectManifestMutation.mutate(
                    props.row.original.manifestId ?? ''
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
        cell: (props) => (
          <Icon
            icon={
              <AiFillDelete
                fontSize={22}
                color="rgba(210, 4, 45, 1)"
                onClick={() => {
                  setCurrentRow(props.row.original.manifestId ?? '');
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
    [newManifests, appRequestColumnHelper, t]
  );

  return (
    <>
      <h2>{t('menu.newManifests')}</h2>
      {newManifests && newManifests.length > 0 && (
        <DataTable data={newManifests} columns={appRequestColumns} />
      )}
      {showDeleteConfirmationModal && (
        <Dialog
          title={t('manifest.deleteManifest')}
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
                  deleteManifestMutation.mutate(currentRow);
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
              {t('manifest.deleteManifestQuestion')}
            </h1>
          </div>
        </Dialog>
      )}
      {newManifests && newManifests.length === 0 && (
        <Track direction="vertical">
          <Lottie options={lottieDefaultOptions} height={320} width={400} />
          <label>{t('manifest.noNewManifests')}</label>
        </Track>
      )}
    </>
  );
};
export default NewManifestsPage;
