import axios from 'axios';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, FormInput, Track } from '../components';
import { createInvitation } from '../resources/api-constants';

const CreateInvitationPage: React.FC = () => {
  const { t } = useTranslation();
  const [invitationResult, setInvResult] = useState('');
  const [invitationResultLink, setInvResultLink] = useState('');
  const [invitationError, setInvError] = useState('');
  const [email, setEmail] = useState<string>('');

  const getInvitationLink = (invitationCode: string): string => {
    const splitUrl = window.location.href.split('/');
    splitUrl[splitUrl.length - 1] = `application/${invitationCode}`;
    return splitUrl.join('/');
  };

  const handleCreateInv = async () => {
    try {
      setInvResult('');
      setInvResultLink('');
      const res = await axios.post(createInvitation(), {
        user_email: email,
      });
      const invitationRes = (res.data[0] as { invitationId: string })
        .invitationId;
      setInvResult(invitationRes);
      setInvResultLink(getInvitationLink(invitationRes));
    } catch (err: any) {
      setInvError('failed to send user e-mail: ' + err.toString());
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
        ></FormInput>
        <Button disabled={email.length < 1} onClick={handleCreateInv}>
          Create invitation
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
          <a href={invitationResultLink}>{invitationResultLink}</a>
        </span>
      )}
      {invitationError && <span>{invitationError}</span>}
    </>
  );
};

export default CreateInvitationPage;
