import axios from 'axios';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import { Button, FormInput, FormSelect, Track } from '../components';
import {
  deleteParticipant,
  updateParticipantDetails,
  updateParticipantStatus,
} from '../resources/api-constants';
import { Participant, ParticipantStatus, ParticipantType } from '../types';

const EditParticipantPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const participant = location.state as Participant;
  const isRequestPage = location.pathname.includes('requests');
  const capitalize = (input: string): string => {
    const value = input.toLowerCase();
    return value.charAt(0).toUpperCase() + value.slice(1);
  };
  const [organisationName, setOrganisationName] = useState(
    participant.name ?? ''
  );
  const [contactEmail, setContactEmail] = useState(
    participant.contactEmail ?? ''
  );
  const [host, setHost] = useState(participant.host ?? '');
  const [applicationStatus, setApplicationStatus] = useState(
    capitalize(participant.participantStatus) ?? ParticipantStatus.Inactive
  );
  const [participantType, setparticipantType] = useState(
    capitalize(participant.participantType) ?? ParticipantType.Unknown
  );
  const [detailsChangeEnabled, setDetailsChangeEnabled] = useState(false);
  const [statusChangeEnabled, setStatusChangeEnabled] = useState(false);

  const handleStatusChange = async () => {
    if (applicationStatus === participant.participantStatus) {
      return;
    } else if (applicationStatus === ParticipantStatus.Deleted) {
      await axios.delete(deleteParticipant(participant.uniqueIdentifier), {
        withCredentials: true,
      });
    }
    await axios.put(
      updateParticipantStatus(participant.uniqueIdentifier),
      {
        participantStatus: applicationStatus.toLowerCase(),
      },
      { withCredentials: true }
    );
    setStatusChangeEnabled(false);
  };

  const handleDetailsChange = async () => {
    await axios.put(
      updateParticipantDetails(participant.uniqueIdentifier),
      {
        id: participant.id,
        contactEmail,
        host,
        participantType: participantType.toLowerCase(),
        name: organisationName,
        institutionId: participant.institutionId,
      },
      { withCredentials: true }
    );
    setDetailsChangeEnabled(false);
  };

  const handleDetailsCancel = () => {
    setOrganisationName(participant.name ?? '');
    setContactEmail(participant.contactEmail ?? '');
    setHost(participant.host ?? '');
    setparticipantType(
      capitalize(participant.participantType) ?? ParticipantType.Unknown
    );
  };

  const getOptions = () => {
    const options = [
      {
        label: t('edit-participants.inactive'),
        value: ParticipantStatus.Inactive,
      },
      {
        label: t('edit-participants.active'),
        value: ParticipantStatus.Active,
      },
      {
        label: t('edit-participants.deactivated'),
        value: ParticipantStatus.Deactivated,
      },
      {
        label: t('edit-participants.deleted'),
        value: ParticipantStatus.Deleted,
      },
    ];
    if (isRequestPage) {
      options.unshift({
        label: t('edit-participants.unprocessed'),
        value: ParticipantStatus.Unprocessed,
      });
    }
    return options;
  };

  return (
    <>
      <Track justify="between">
        {isRequestPage && <h1>{t('edit-requests.title')}</h1>}
        {!isRequestPage && <h1>{t('edit-participants.title')}</h1>}
        <Button appearance="text" onClick={() => navigate(-1)}>
          {t('edit-participants.back')}
        </Button>
      </Track>
      <Track gap={32} direction="vertical" align="stretch">
        <Track gap={16} direction="vertical">
          <FormInput
            name="organisation-name"
            label={t('edit-participants.organisation-name')}
            value={organisationName}
            disabled={!detailsChangeEnabled}
            onChange={(e) => setOrganisationName(e.target.value)}
          />
          <FormInput
            name="contact-email"
            label={t('edit-participants.contact-email')}
            value={contactEmail}
            disabled={!detailsChangeEnabled}
            onChange={(e) => setContactEmail(e.target.value)}
          />
          <FormInput
            name="host"
            label={t('edit-participants.host')}
            value={host}
            disabled={!detailsChangeEnabled}
            onChange={(e) => setHost(e.target.value)}
          />
          <FormSelect
            label={t('edit-participants.participant-type')}
            name="participant-type"
            defaultValue={participantType}
            onSelectionChange={(value) => setparticipantType(value!.value)}
            disabled={!detailsChangeEnabled}
            options={[
              {
                label: t('edit-participants.unknown'),
                value: ParticipantType.Unknown,
              },
              {
                label: t('edit-participants.chatbot'),
                value: ParticipantType.Chatbot,
              },
              {
                label: t('edit-participants.classifier'),
                value: ParticipantType.Classifier,
              },
              {
                label: t('edit-participants.drm'),
                value: ParticipantType.Drm,
              },
            ]}
          />
        </Track>
        <Track gap={32}>
          {!detailsChangeEnabled && (
            <Button onClick={() => setDetailsChangeEnabled(true)}>
              {t('edit-participants.enable-details-change')}
            </Button>
          )}
          {detailsChangeEnabled && (
            <>
              <Button onClick={() => handleDetailsChange()}>
                {t('edit-participants.confirm-details-change')}
              </Button>
              <Button
                appearance="text"
                onClick={() => {
                  setDetailsChangeEnabled(false);
                  handleDetailsCancel();
                }}
              >
                {t('edit-participants.cancel-details-change')}
              </Button>
            </>
          )}
        </Track>
        <Track gap={16} direction="vertical" align="stretch">
          <h4>{t('edit-participants.change-application-status')}</h4>
          <FormSelect
            label={t('edit-participants.application-status')}
            name="application-status"
            defaultValue={applicationStatus}
            onSelectionChange={(value) => setApplicationStatus(value!.value)}
            disabled={!statusChangeEnabled}
            value={applicationStatus}
            options={getOptions()}
          />
          <Track gap={32}>
            {!statusChangeEnabled && (
              <Button onClick={() => setStatusChangeEnabled(true)}>
                {t('edit-participants.enable-status-change')}
              </Button>
            )}
            {statusChangeEnabled && (
              <>
                <Button onClick={() => handleStatusChange()}>
                  {t('edit-participants.confirm-status-change')}
                </Button>
                <Button
                  appearance="text"
                  onClick={() => {
                    setStatusChangeEnabled(false);
                    setApplicationStatus(participant.participantStatus);
                  }}
                >
                  {t('edit-participants.cancel-status-change')}
                </Button>
              </>
            )}
          </Track>
        </Track>
      </Track>
    </>
  );
};

export default EditParticipantPage;
