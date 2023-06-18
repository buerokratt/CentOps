import { useQuery } from '@tanstack/react-query';

import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { getStatus } from '../services/status';
import { Track } from '../components';
import { ApplicationStatus } from '../types/applicationStatus';

const ApplicationStatusPage: React.FC = () => {
  const { uuid } = useParams();
  const { t } = useTranslation();

  const { data: result } = useQuery<{ response: string }>(
    ['participants/application'],
    async () => getStatus(uuid)
  );

  return (
    <>
      <Track justify="between">
        <h1>{t('application-status.title')}</h1>
      </Track>
      {result?.response && (
        <Track justify="between">
          {result.response == ApplicationStatus.Unprocessed && (
            <h4>{t('application-status.received')}</h4>
          )}
          {result.response == ApplicationStatus.Inactive && (
            <h4>{t('application-status.processing')}</h4>
          )}
          {result.response == ApplicationStatus.Active && (
            <h4>{t('application-status.processed')}</h4>
          )}
        </Track>
      )}
    </>
  );
};

export default ApplicationStatusPage;
