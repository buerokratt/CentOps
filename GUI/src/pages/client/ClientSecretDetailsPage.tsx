import { useParams } from 'react-router-dom';
import {
  Button,
  Card,
  FormInput,
  FormSelect,
  Icon,
  Label,
  Track,
} from 'components';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import { TransButton } from 'i18n/trans/button';
import { TransField } from 'i18n/trans/field';
import { TransTitle } from 'i18n/trans/title';
import { formatDate } from 'utils/date';
import { FormElement } from 'components/FormElements';
import { TransLabel } from 'i18n/trans/label';
import FormTextarea from 'components/FormElements/FormTextarea';
import { validate } from 'utils/json';
import { ROUTES } from 'resources/routes-constants';
import { Link } from 'components/Router/Link';
import { withAuthorization } from 'hoc/withAuthorization';
import { useMutation, useQuery } from '@tanstack/react-query';
import type { ApiClientSecret } from 'types/client';
import { useToast } from 'hooks';
import { useTranslation } from 'react-i18next';
import type { AxiosError } from 'axios';
import api from 'services/api';
import { useCallback, useEffect } from 'react';

export const ClientSecretDetailsPage = withAuthorization(() => {
  const { clientId, secretId } = useParams<{
    clientId: string;
    secretId: 'create' | string;
  }>();
  const isCreateMode = secretId === 'create';

  const {
    data: { response: secret },
  } = useQuery<{ response: ApiClientSecret | object }>({
    enabled: !isCreateMode,
    queryKey: [
      `admin/clients/manifests/get?clientId=${clientId}&secretId=${secretId}`,
    ],
    initialData: { response: {} },
  });
  const toast = useToast();
  const { t } = useTranslation();
  const mutation = useMutation<ApiClientSecret, AxiosError, ApiClientSecret>({
    mutationFn: async (data) =>
      (
        await {
          post: async () =>
            api.post(
              `admin/clients/manifests/create?clientId=${clientId}`,
              data
            ),
          put: async () =>
            api.put(
              `admin/clients/manifests/update?clientId=${clientId}`,
              data
            ),
        }[data.secretId ? 'put' : 'post']()
      ).data,

    onSuccess: ({ secretId }) => {
      toast.open({
        type: 'success',
        title: t('toast.notification'),
        message: {
          post: t('toast.manifestCreated', {
            defaultValue: 'Manifest Created Successfully',
          }),
          put: t('toast.manifestUpdated', {
            defaultValue: 'Manifest Updated Successfully',
          }),
        }[secretId ? 'put' : 'post'],
      });
    },
    onError: (error) => {
      toast.open({
        type: 'error',
        title: t('toast.notificationError'),
        message: error.message,
      });
    },
  });
  const onSubmit: SubmitHandler<ApiClientSecret> = useCallback(async (data) => {
    await mutation.mutateAsync(data);
  }, []);

  const { register, control, reset, handleSubmit } = useForm<ApiClientSecret>({
    defaultValues: {
      name: 'Super secret',
      environment: 'production',
      json: '{}',
      createdAt: '2025-06-07T14:11:00.107Z',
      updatedAt: '2025-06-07T14:11:00.107Z',
    },
  });
  useEffect(() => {
    if (secret) reset(secret);
  }, [secret]);

  return (
    <>
      <Track direction="vertical" align="left">
        <h6>
          <TransTitle i18nKey="client" values={{ client: 'A' }} />
        </h6>
        <h1>
          {isCreateMode ? (
            <TransTitle i18nKey="secretAdd" />
          ) : (
            <TransTitle i18nKey="secretEdit" />
          )}
        </h1>
      </Track>

      <Card
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        footer={
          <Track justify="between">
            <Link to={ROUTES.CLIENT_SECRETS_ROUTE}>
              <Button appearance="primary" outlined>
                <TransButton i18nKey="cancel" />
              </Button>
            </Link>
            <Button appearance="primary">
              <TransButton i18nKey="save" />
            </Button>
          </Track>
        }
      >
        <Track
          gap={8}
          direction="vertical"
          isAlignItems={false}
          style={{ width: '90%', marginLeft: 'auto' }}
        >
          <FormInput
            {...register('name')}
            label={<TransField i18nKey="name" />}
            type="text"
          />
          <Controller
            name="environment"
            control={control}
            render={({ field }) => (
              <FormSelect
                {...field}
                placeholder="-"
                label={<TransField i18nKey="environment" />}
                options={[{ label: 'production', value: 'production' }]}
              />
            )}
          />
          <FormTextarea
            {...register('json')}
            label={<TransField i18nKey="json" />}
          />
          <FormElement label={null}>
            <Track>
              <Controller
                name="json"
                control={control}
                render={({ field }) => {
                  const isValid = validate(field.value);
                  return isValid ? (
                    <>
                      <Label type="success">
                        <Icon name="check" size="small" />
                        <TransLabel i18nKey="valid" />
                      </Label>
                    </>
                  ) : (
                    <Label type="error">
                      <Icon name="danger" size="small" />
                      <TransLabel i18nKey="invalid" />
                    </Label>
                  );
                }}
              />
            </Track>
          </FormElement>
          <Controller
            name="updatedAt"
            control={control}
            render={({ field }) => (
              <FormInput
                {...field}
                value={formatDate(field.value)}
                label={<TransField i18nKey="updatedAt" />}
                type="text"
                readOnly
              />
            )}
          />
        </Track>
      </Card>
    </>
  );
});
