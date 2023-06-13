import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { Button, Track } from '../components';
import { dummyApi, toggleDummyApi } from '../resources/api-constants';
import CustomForm from '../components/CustomForm';

const OverviewPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Track justify="between">
        <h1>{t('overview.title')}</h1>
      </Track>
      <CustomForm formId='1234' onSubmit={(data) => console.log(data)} />
    </>
  );
};

export default OverviewPage;
