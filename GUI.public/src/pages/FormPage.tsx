import React from 'react';
import DynamicForm from '../components/DynamicForm';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const FormPage: React.FC = () => {
  const { t } = useTranslation();
  const [searchParams, _] = useSearchParams();
  const formId = searchParams.get('id');

  if (!formId) {
    return <span>{t('forms.id_missing')}</span>
  }

  return <DynamicForm formId={formId} />;
};

export default FormPage;
