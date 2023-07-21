import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { Button, FormInput, Track } from '../components';
import { validateInvitation } from '../resources/api-constants';
import DynamicForm from '../components/DynamicForm';
import { KeyValueMap } from '../components/DynamicForm/types';
import { formIds } from '../constants/forms';
import postApplication from '../services/application';

const ApplicationPage: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [invitationId, setId] = useState(id ?? '');
  const [invitationError, setInvitationError] = useState('');
  const [invitationValid, setInvitationValid] = useState(false);
  const [invitationSent, setInvitationSent] = useState(false);
  const [formValues, setFormValues] = useState<KeyValueMap>({});
  const [formValid, setFormValid] = useState(true);

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
        invitationId: invitationId,
        info: formValues,
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
          <DynamicForm
            formId={formIds.INVITATION_FORM}
            hideSubmitButton
            hideTitle
            onChange={(values: any, isValid: boolean) => {
              setFormValues(values);
              setFormValid(isValid);
            }}
          />
          <Button
            disabled={invitationId.length < 1 || !formValid}
            onClick={handleSendInvitation}
          >
            {t('application.send-application')}
          </Button>
        </>
      )}
      <Track>{invitationError}</Track>
    </>
  );
};

export default ApplicationPage;
