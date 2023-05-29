import axios from 'axios';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, FormInput, Track } from '../components';
import { createInvitation } from '../resources/api-constants';
import { ROUTES } from '../resources/routes-constants';

const CreateInvitationPage: React.FC = () => {
  const { t } = useTranslation();
  const [invitationResult, setInvResult] = useState('');
  const [invitationResultLink, setInvResultLink] = useState('');
  const [invitationError, setInvError] = useState('');
  const [email, setEmail] = useState<string>('');

  // const getInvitationLink = (invitationCode: string): string => {
  //   return ROUTES.APPLICATION_ROUTE + '/' + invitationCode
  // };

  const handleCreateInv = async () => {
    try {
      setInvResult('');
      setInvResultLink('');
      setInvError('');
      const res = await axios.post(createInvitation(), {
        user_email: email,
      });
      const invitationRes = (res.data[0] as { invitationId: string })
        .invitationId;
      setInvResult(invitationRes);
      setInvResultLink(ROUTES.APPLICATION_ROUTE + '/' + invitationRes);
    } catch (err: any) {
      setInvError(`${t('invitation.error')} ` + err.toString());
    }
  };

  return (
    <>
      <Track justify="between">
        <h1>{t('invitation.title')}</h1>
      </Track>
      <Track justify="between">
        <h4>{t('invitation.description')}</h4>
      </Track>
      <Track gap={20}>
        <FormInput
          label="e-mail"
          name="e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button disabled={email.length < 1} onClick={handleCreateInv}>
          {t('invitation.create')}
        </Button>
      </Track>
      {invitationResult && (
        <span>
          {t('invitation.invitationId')}: {invitationResult}
        </span>
      )}
      {invitationResultLink && (
        <span>
          {t('invitation.link')}:{' '}
          <a target="_blank" href={invitationResultLink}>
            {invitationResultLink}
          </a>
        </span>
      )}
      {invitationError && <span>{invitationError}</span>}
    </>
  );
};

export default CreateInvitationPage;
