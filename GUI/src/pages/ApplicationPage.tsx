import axios from 'axios';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { Button, FormInput, Track } from '../components';
import { validateInvitation } from '../resources/api-constants';

const ApplicationPage: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [invitationId, setInvId] = useState(id ?? '');
  const [invitationCheckError, setInvValidationError] = useState('');

  const handleCheckInv = async () => {
    try {
      setInvValidationError('');
      const res = await axios.post(validateInvitation(), {
        invitation_id: invitationId,
      });
    } catch (err: any) {
      setInvValidationError(
        `${t('application.invitation-error')} ` + err.toString()
      );
    }
  };

  return (
    <>
      <Track justify="between">
        {/* <h1>{t('application.title')}</h1> */}
        <h1>Title</h1>
      </Track>
      <Track justify="between">
        {/* <h4>{t('application.description')}</h4> */}
        <h4>yada yada</h4>
      </Track>
      <Track gap={20}>
        <FormInput
          label="invitation-id"
          name="invitation-id"
          value={invitationId}
          onChange={(e) => setInvId(e.target.value)}
        />
        <Button disabled={invitationId.length < 1} onClick={handleCheckInv}>
          {t('application.validate-id')}
        </Button>
      </Track>
      <Track>{invitationCheckError}</Track>
    </>
  );
};

export default ApplicationPage;
