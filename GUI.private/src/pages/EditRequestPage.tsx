import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, FormInput, FormSelect, Track } from '../components';
import { ApplicationRequest } from '../types';
import { useLocation, useNavigate } from 'react-router-dom';
import { ParticipantState } from '../types/participantState';
import { ParticipantType } from '../types/participantType';

const EditRequestPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const applicationRequest = location.state as ApplicationRequest;
  const capitalize = (input: string): string => {
    const value = input.toLowerCase();
    return value.charAt(0).toUpperCase() + value.slice(1);
  };
  const [organisationName, setOrganisationName] = useState(
    applicationRequest.name ?? ''
  );
  const [contactEmail, setContactEmail] = useState(
    applicationRequest.contactEmail ?? ''
  );
  const [host, setHost] = useState(applicationRequest.host ?? '');
  const [applicationStatus, setApplicationStatus] = useState(
    capitalize(applicationRequest.participantStatus) ??
      ParticipantState.Inactive
  );
  const [applicantType, setApplicantType] = useState(
    capitalize(applicationRequest.participantType) ?? ParticipantType.Unknown
  );
  const [detailsChangeEnabled, setDetailsChangeEnabled] = useState(false);
  const [statusChangeEnabled, setStatusChangeEnabled] = useState(false);

  const handleStatusChange = () => {
    console.log(applicationRequest);
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
            value={organisationName}
            disabled={!detailsChangeEnabled}
            onChange={(e) => setContactEmail(e.target.value)}
          />
          <FormInput
            name="contact-email"
            label={t('edit-requests.contact-email')}
            value={contactEmail}
            disabled={!detailsChangeEnabled}
            onChange={(e) => setOrganisationName(e.target.value)}
          />
          <FormInput
            name="host"
            label={t('edit-requests.host')}
            value={host}
            disabled={!detailsChangeEnabled}
            onChange={(e) => setHost(e.target.value)}
          />
          <FormSelect
            label={t('edit-requests.applicant-type')}
            name="applicant-type"
            defaultValue={applicantType}
            onSelectionChange={(value) => setApplicantType(value!.value)}
            disabled={!detailsChangeEnabled}
            options={[
              {
                label: t('edit-requests.unknown'),
                value: ParticipantType.Unknown,
              },
              {
                label: t('edit-requests.chatbot'),
                value: ParticipantType.Chatbot,
              },
              {
                label: t('edit-requests.classifier'),
                value: ParticipantType.Classifier,
              },
              {
                label: t('edit-requests.drm'),
                value: ParticipantType.Drm,
              },
            ]}
          />
        </Track>
        <Track gap={32}>
          {!detailsChangeEnabled && (
            <Button onClick={() => setDetailsChangeEnabled(true)}>
              {t('edit-requests.enable-details-change')}
            </Button>
          )}
          {detailsChangeEnabled && (
            <>
              <Button onClick={() => handleDetailsChange()}>
                {t('edit-requests.confirm-details-change')}
              </Button>
              <Button
                appearance="text"
                onClick={() => {
                  setDetailsChangeEnabled(false);
                  // setApplicationStatus(applicationRequest.participantStatus);
                }}
              >
                {t('edit-requests.cancel-details-change')}
              </Button>
            </>
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
              {
                label: t('edit-requests.unprocessed'),
                value: ParticipantState.Unprocessed,
              },
              {
                label: t('edit-requests.inactive'),
                value: ParticipantState.Inactive,
              },
              {
                label: t('edit-requests.active'),
                value: ParticipantState.Active,
              },
              {
                label: t('edit-requests.deactivated'),
                value: ParticipantState.Deactivated,
              },
              {
                label: t('edit-requests.deleted'),
                value: ParticipantState.Deleted,
              },
            ]}
          />
          <Track gap={32}>
            {!statusChangeEnabled && (
              <Button onClick={() => setStatusChangeEnabled(true)}>
                {t('edit-requests.enable-status-change')}
              </Button>
            )}
            {statusChangeEnabled && (
              <>
                <Button onClick={() => handleStatusChange()}>
                  {t('edit-requests.confirm-status-change')}
                </Button>
                <Button
                  appearance="text"
                  onClick={() => {
                    setStatusChangeEnabled(false);
                    setApplicationStatus(applicationRequest.participantStatus);
                  }}
                >
                  {t('edit-requests.cancel-status-change')}
                </Button>
              </>
            )}
          </Track>
        </Track>
      </Track>
    </>
  );
};

export default EditRequestPage;
