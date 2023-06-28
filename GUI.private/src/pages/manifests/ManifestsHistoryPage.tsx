import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Manifest } from '../../types/manifest';
import { useQuery } from '@tanstack/react-query';
import { Button, DataTable, Icon } from '../../components';
import { createColumnHelper } from '@tanstack/react-table';
import { format } from 'date-fns';
import { capitalizeFirst } from '../../utils/capatalizeFirst';
import { MdClose, MdPreview } from 'react-icons/md';
import { AiFillEye } from 'react-icons/ai';

const ManifestsHistoryPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { data: history } = useQuery<Manifest[]>({
    queryKey: ['manifest/history'],
  });

  const appRequestColumnHelper = createColumnHelper<Manifest>();
  const appRequestColumns = useMemo(
    () => [
      appRequestColumnHelper.accessor('historyId', {
        header: 'History ID',
        cell: (uniqueIdentifier) => uniqueIdentifier.getValue(),
      }),
      appRequestColumnHelper.accessor('parentManifestId', {
        header: 'Manifest ID',
        cell: (uniqueIdentifier) => uniqueIdentifier.getValue(),
      }),
      appRequestColumnHelper.accessor('updateId', {
        header: 'Update Id',
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
      appRequestColumnHelper.accessor('type', {
        header: 'Type',
        cell: (uniqueIdentifier) =>
          capitalizeFirst(uniqueIdentifier.getValue() ?? ''),
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
                fontSize={25}
                color="rgba(36, 89, 158, 1)"
                onClick={() =>
                  navigate(
                    `/centops/manifests/history/details/${props.row.original.historyId}`,
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
    ],
    [history, appRequestColumnHelper, t]
  );

  return (
    <>
      <h2>{t('menu.history')}</h2>
      {history && history.length > 0 && (
        <DataTable data={history} columns={appRequestColumns} />
      )}
    </>
  );
};
export default ManifestsHistoryPage;
