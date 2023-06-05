import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, FormInput, FormSelect, Track } from '../components';
import { useQuery } from '@tanstack/react-query';
import { ApplicationRequest } from '../types';
import { useLocation, useNavigate } from 'react-router-dom';

const EditRequestPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const applicationRequest = location.state as ApplicationRequest;
  const [organisationName, setOrganisationName] = useState(
    applicationRequest.name ?? ''
  );
  const [contactEmail, setContactEmail] = useState(
    applicationRequest.userEmail ?? ''
  );
  const [applicationStatus, setApplicationStatus] = useState(
    applicationRequest.status ?? 'SUBMITTED'
  );
  const [detailsChangeEnabled, setDetailsChangeEnabled] = useState(false);
  const [statusChangeEnabled, setStatusChangeEnabled] = useState(false);

  const handleStatusChange = () => {
    console.log(applicationStatus);
    setStatusChangeEnabled(false);
  };
  const handleDetailsChange = () => {
    console.log(applicationStatus);
    setDetailsChangeEnabled(false);
  };

  return (
    <>
      <Track justify="between">
        <h1>{t('edit-requests.title')}</h1>
        <Button appearance="text" onClick={() => navigate(-1)}>
          {t('edit-requests.back')}
        </Button>
      </Track>
      <Track gap={32} direction="vertical" align="stretch">
        <Track gap={16} direction="vertical">
          <FormInput
            name="organisation-name"
            label={t('edit-requests.organisation-name')}
            value={contactEmail}
            disabled={!detailsChangeEnabled}
            onChange={(e) => setContactEmail(e.target.value)}
          />
          <FormInput
            name="contact-email"
            label={t('edit-requests.contact-email')}
            value={organisationName}
            disabled={!detailsChangeEnabled}
            onChange={(e) => setOrganisationName(e.target.value)}
          />
        </Track>
        <Track gap={32}>
          {!detailsChangeEnabled && (
            <Button onClick={() => setDetailsChangeEnabled(true)}>
              {t('edit-requests.enable-details-change')}
            </Button>
          )}
          {detailsChangeEnabled && (
            <Button onClick={() => handleDetailsChange()}>
              {t('edit-requests.confirm-details-change')}
            </Button>
          )}
          {detailsChangeEnabled && (
            <Button
              appearance="text"
              onClick={() => {
                setDetailsChangeEnabled(false);
                setApplicationStatus(applicationRequest.status);
              }}
            >
              {t('edit-requests.cancel-details-change')}
            </Button>
          )}
        </Track>
        <Track gap={16} direction="vertical" align="stretch">
          <h4>{t('edit-requests.change-application-status')}</h4>
          <FormSelect
            label={t('edit-requests.application-status')}
            name="application-status"
            defaultValue={applicationStatus}
            onSelectionChange={(value) => setApplicationStatus(value!.value)}
            disabled={!statusChangeEnabled}
            value={applicationStatus}
            options={[
              { label: t('edit-requests.submitted'), value: 'SUBMITTED' },
              { label: t('edit-requests.processing'), value: 'PROCESSING' },
              { label: t('edit-requests.approved'), value: 'APPROVED' },
              { label: t('edit-requests.deleted'), value: 'DELETED' },
            ]}
          />
          <Track gap={32}>
            {!statusChangeEnabled && (
              <Button onClick={() => setStatusChangeEnabled(true)}>
                {t('edit-requests.enable-status-change')}
              </Button>
            )}
            {statusChangeEnabled && (
              <Button onClick={() => handleStatusChange()}>
                {t('edit-requests.confirm-status-change')}
              </Button>
            )}
            {statusChangeEnabled && (
              <Button
                appearance="text"
                onClick={() => {
                  setStatusChangeEnabled(false);
                  setApplicationStatus(applicationRequest.status);
                }}
              >
                {t('edit-requests.cancel-status-change')}
              </Button>
            )}
          </Track>
        </Track>
      </Track>
    </>
  );
};

export default EditRequestPage;
