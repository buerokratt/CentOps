import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Manifest } from '../../types/manifest';
import { useQuery } from '@tanstack/react-query';
import { Button, DataTable, Icon, Track } from '../../components';
import { createColumnHelper } from '@tanstack/react-table';
import { format } from 'date-fns';
import { capitalizeFirst } from '../../utils/capatalizeFirst';
import {
  AiFillCheckCircle,
  AiFillCloseCircle,
  AiFillDelete,
  AiFillEdit,
  AiFillEye,
} from 'react-icons/ai';

const ManifestsOverviewPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { data: newManifests } = useQuery<Manifest[]>({
    queryKey: ['manifest/approved-manifests'],
  });

  const createNewUpdate = async () => {};
  const deleteManifest = async () => {};

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
      appRequestColumnHelper.accessor('updatedAt', {
        header: 'Updated At',
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
              <AiFillEdit
                fontSize={22}
                color="rgba(36, 89, 158, 1)"
                onClick={() =>
                  navigate(`/centops/manifests/create_edit`, {
                    state: props.row.original,
                  })
                }
              />
            }
            size="medium"
          />
        ),
        id: 'edit',
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
                onClick={() => deleteManifest()}
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
      <Track justify="between">
        <h2>{t('menu.overview')}</h2>
        <Button
          onClick={() =>
            navigate(`/centops/manifests/create_edit`, {
              state: null,
            })
          }
        >
          {t('menu.newManifest')}
        </Button>
      </Track>
      {newManifests && newManifests.length > 0 && (
        <DataTable data={newManifests} columns={appRequestColumns} />
      )}
    </>
  );
};
export default ManifestsOverviewPage;
