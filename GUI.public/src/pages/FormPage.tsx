import type { FC } from 'react';
import { DynamicForm } from '@centopsmodule/shared';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const FormPage: FC = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const formId = searchParams.get('id');

  if (!formId) {
    return <span>{t('forms.id_missing')}</span>;
  }

  return <DynamicForm formId={formId} />;
};

export default FormPage;
