import { useQuery } from '@tanstack/react-query';
import { createColumnHelper } from '@tanstack/react-table';

import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import { Button, DataTable, Track } from '../components';
import { Participant } from '../types';

const ParticipantsPage: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const isRequestPage = location.pathname.includes('requests');
  const { data: applicationRequests } = useQuery<Participant[]>({
    queryKey: [
      isRequestPage ? 'admin/participants/applications' : 'admin/participants',
    ],
  });
  const navigate = useNavigate();
  const appRequestColumnHelper = createColumnHelper<Participant>();
  const appRequestColumns = useMemo(
    () => [
      appRequestColumnHelper.accessor('uniqueIdentifier', {
        header: 'UUID',
        cell: (uniqueIdentifier) => uniqueIdentifier.getValue(),
      }),
      appRequestColumnHelper.accessor('info.name', {
        header: `${t('participants.name')}`,
        cell: (name) => name.getValue(),
      }),
      appRequestColumnHelper.accessor('info.nameAbbreviated', {
        header: `${t('participants.nameAbbreviated')}`,
        cell: (nameAbbreviated) => nameAbbreviated.getValue(),
      }),
      appRequestColumnHelper.accessor('info.emailEmail', {
        header: `${t('participants.contact-email')}`,
        cell: (contactEmail) => contactEmail.getValue(),
      }),
      appRequestColumnHelper.accessor('participantType', {
        header: `${t('participants.participant-type')}`,
        cell: (participantType) => participantType.getValue(),
      }),
      appRequestColumnHelper.accessor('info.host', {
        header: `${t('participants.host')}`,
        cell: (host) => host.getValue(),
      }),
      appRequestColumnHelper.accessor('info.ipAddress', {
        header: `${t('participants.ip-address')}`,
        cell: (ipAddress) => ipAddress.getValue(),
      }),
      appRequestColumnHelper.accessor('participantStatus', {
        header: isRequestPage
          ? `${t('requests.request-status')}`
          : `${t('participants.participant-status')}`,
        cell: (participantStatus) => participantStatus.getValue(),
      }),
      appRequestColumnHelper.display({
        header: '',
        cell: (props) => (
          <Button
            appearance="text"
            onClick={() =>
              navigate(
                isRequestPage
                  ? `/centops/requests/participants/edit/${props.row.original.uniqueIdentifier}`
                  : `/centops/participants/edit/${props.row.original.uniqueIdentifier}`,
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
        {isRequestPage && <h1>{t('requests.title')}</h1>}
        {!isRequestPage && <h1>{t('participants.title')}</h1>}
      </Track>
      <Track justify="between">
        {isRequestPage && <h4>{t('requests.description')}</h4>}
        {!isRequestPage && <h4>{t('participants.description')}</h4>}
      </Track>

      {applicationRequests && applicationRequests.length && (
        <DataTable data={applicationRequests} columns={appRequestColumns} />
      )}
    </>
  );
};

export default ParticipantsPage;
