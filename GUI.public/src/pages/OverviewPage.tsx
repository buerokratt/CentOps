import React from 'react';
import { useTranslation } from 'react-i18next';
import { Track } from '../components';
import DynamicForm from '../components/DynamicForm';

const OverviewPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Track justify="between">
        <h1>{t('overview.title')}</h1>
      </Track>
      <DynamicForm formId='example-form-123' onSubmit={(data) => console.log(data)} />
    </>
  );
};

export default OverviewPage;
