import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, DataTable, Track } from '../components';
import { useQuery } from '@tanstack/react-query';
import { ApplicationRequest } from '../types';
import { createColumnHelper } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';

const RequestsPage: React.FC = () => {
  const { t } = useTranslation();
  const { data: applicationRequests } = useQuery<ApplicationRequest[]>({
    queryKey: ['admin/participants/applications'],
  });
  const navigate = useNavigate();

  const appRequestColumnHelper = createColumnHelper<ApplicationRequest>();

  const appRequestColumns = useMemo(
    () => [
      appRequestColumnHelper.accessor('uniqueIdentifier', {
        cell: (uniqueIdentifier) => uniqueIdentifier.getValue(),
      }),
      appRequestColumnHelper.accessor('name', {
        cell: (name) => name.getValue(),
      }),
      appRequestColumnHelper.accessor('contactEmail', {
        cell: (contactEmail) => contactEmail.getValue(),
      }),
      appRequestColumnHelper.display({
        header: '',
        cell: (props) => (
          <Button
            appearance="text"
            onClick={() =>
              navigate(
                `/centops/requests/edit/${props.row.original.uniqueIdentifier}`,
                {
                  state: props.row.original,
                }
              )
            }
          >
            {t('requests.edit')}
          </Button>
        ),
        id: 'edit',
        meta: {
          size: '1%',
        },
      }),
    ],
    [applicationRequests, appRequestColumnHelper, t]
  );

  return (
    <>
      <Track justify="between">
        <h1>{t('requests.title')}</h1>
      </Track>
      <Track justify="between">
        <h4>{t('requests.description')}</h4>
      </Track>

      {applicationRequests && applicationRequests.length && (
        <DataTable
          data={applicationRequests}
          columns={appRequestColumns}
          disableHead
        />
      )}
    </>
  );
};

export default RequestsPage;
