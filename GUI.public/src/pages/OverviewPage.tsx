import React from 'react';
import { useTranslation } from 'react-i18next';
import { Track } from '../components';
import CustomForm from '../components/CustomForm';

const OverviewPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Track justify="between">
        <h1>{t('overview.title')}</h1>
      </Track>
      <CustomForm formId='example-form-123' onSubmit={(data) => console.log(data)} />
    </>
  );
};

export default OverviewPage;
