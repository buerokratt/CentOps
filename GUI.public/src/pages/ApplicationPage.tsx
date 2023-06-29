import axios, { AxiosError } from 'axios';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { Button, FormInput, Track } from '../components';
import { validateInvitation } from '../resources/api-constants';
import postApplication from '../services/application';

const ApplicationPage: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [invitationId, setId] = useState(id ?? '');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [nameAbbreviated, setNameAbbreviated] = useState('');
  const [host, setHost] = useState('');
  const [ipAddress, setIpAddress] = useState('');
  const [invitationError, setInvitationError] = useState('');
  const [invitationValid, setInvitationValid] = useState(false);
  const [invitationSent, setInvitationSent] = useState(false);

  const handleCheckInv = async () => {
    try {
      setInvitationError('');
      await axios.post(
        validateInvitation(),
        {
          invitationId: invitationId,
        },
        { withCredentials: true }
      );
      setInvitationValid(true);
    } catch (err: any) {
      handleError(err);
    }
  };

  const handleSendInvitation = async () => {
    try {
      setInvitationError('');
      postApplication({
        email,
        invitationId: invitationId,
        organisationName: name,
        nameAbbreviated,
        host,
        ipAddress,
      });
      setInvitationSent(true);
    } catch (err: any) {
      handleError(err);
    }
  };

  const handleError = (err: AxiosError) => {
    if (err.response?.status === 404) {
      setInvitationError(
        `${t('application.invitation-error')}: ${t('application.invalid-id')}`
      );
    } else {
      setInvitationError(
        `${t('application.invitation-error')} ` + err.toString()
      );
    }
  };

  const getFormInvalid = () => {
    return (
      invitationId.length < 1 ||
      name.length < 1 ||
      email.length < 1 ||
      nameAbbreviated.length < 1 ||
      host.length < 1 ||
      ipAddress.length < 1
    );
  };

  return (
    <>
      <Track justify="between">
        <h1>{t('application.title')}</h1>
      </Track>
      <Track justify="between">
        {!invitationValid && <h4>{t('application.enter-invitation-id')}</h4>}
        {invitationValid && !invitationSent && (
          <h4>{t('application.insert-organisation-details')}</h4>
        )}
        {invitationSent && <h4>{t('application.submit-success')}</h4>}
      </Track>
      {!invitationValid && (
        <Track gap={20}>
          <FormInput
            label={t('application.invitation-id')}
            name="invitation-id"
            value={invitationId}
            onChange={(e) => setId(e.target.value)}
          />
          <Button disabled={invitationId.length < 1} onClick={handleCheckInv}>
            {t('application.validate-id')}
          </Button>
        </Track>
      )}
      {invitationValid && !invitationSent && (
        <>
          <Track gap={20}>
            <FormInput
              label={t('application.invitation-id')}
              name="invitation-id"
              value={invitationId}
              onChange={(e) => setId(e.target.value)}
            />
          </Track>
          <Track>
            <FormInput
              label={t('application.organisation-name')}
              name="organisation-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Track>
          <Track>
            <FormInput
              label={t('application.name-abbreviated')}
              name="abbreviated"
              value={nameAbbreviated}
              onChange={(e) => setNameAbbreviated(e.target.value)}
            />
          </Track>
          <Track>
            <FormInput
              label={t('application.contact-email')}
              name="e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Track>
          <Track>
            <FormInput
              label={t('application.ip-address')}
              name="ip-address"
              value={ipAddress}
              onChange={(e) => setIpAddress(e.target.value)}
            />
          </Track>
          <Track>
            <FormInput
              label={t('application.host')}
              name="host"
              value={host}
              onChange={(e) => setHost(e.target.value)}
            />
          </Track>
          <Button disabled={getFormInvalid()} onClick={handleSendInvitation}>
            {t('application.send-application')}
          </Button>
        </>
      )}
      <Track>{invitationError}</Track>
    </>
  );
};

export default ApplicationPage;
