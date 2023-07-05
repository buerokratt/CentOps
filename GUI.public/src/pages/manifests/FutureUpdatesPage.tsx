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
import animationData from '../../lottie/noUpdates.json';
import Lottie from 'react-lottie';

const FutureUpdatesPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const lottieDefaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  const { data: updates } = useQuery<Manifest[]>({
    queryKey: ['manifest/future-updates'],
  });

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
    ],
    [updates, appRequestColumnHelper, t]
  );

  return (
    <>
      <h2>{t('manifests.futureUpdates')}</h2>
      {updates && updates.length > 0 && (
        <DataTable data={updates} columns={appRequestColumns} />
      )}
      {updates && updates.length === 0 && (
        <Track direction="vertical" justify="center" align="center">
          <Lottie options={lottieDefaultOptions} height={300} width={200} />
          <label style={{ marginTop: '30px' }}>
            {t('manifests.noFutureUpdates')}
          </label>
        </Track>
      )}
    </>
  );
};
export default FutureUpdatesPage;
