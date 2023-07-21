import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Manifest } from '../../types/manifest';
import { useQuery } from '@tanstack/react-query';
import { DataTable, Icon, Track } from '../../components';
import { createColumnHelper } from '@tanstack/react-table';
import { format } from 'date-fns';
import { capitalizeFirst } from '../../utils/capatalizeFirst';
import { AiFillEye } from 'react-icons/ai';
import animationData from '../../lottie/noHistory.json';
import Lottie from 'react-lottie';

const PastUpdatesPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { data: history } = useQuery<Manifest[]>({
    queryKey: ['manifest/past-updates'],
  });

  const lottieDefaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

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
                    `/centops/manifests/details/${props.row.original.historyId}`,
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
      <h2>{t('manifests.pastUpdates')}</h2>
      {history && history.length > 0 && (
        <DataTable data={history} columns={appRequestColumns} />
      )}
      {history && history.length === 0 && (
        <Track direction="vertical">
          <Lottie options={lottieDefaultOptions} height={270} width={350} />
          <label>{t('manifest.noHistoryLogs')}</label>
        </Track>
      )}
    </>
  );
};
export default PastUpdatesPage;
