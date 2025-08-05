import { useNavigate, useParams } from 'react-router-dom';
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
import { Link, replaceLinkParams } from 'components/Router/Link';
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

  const { data: secret } = useQuery<ApiClientSecret>({
    enabled: !isCreateMode,
    queryKey: [`admin/clients/secrets/get?clientId=${clientId}&id=${secretId}`],
  });
  const navigate = useNavigate();
  const toast = useToast();
  const { t } = useTranslation();
  const mutation = useMutation<ApiClientSecret, AxiosError, ApiClientSecret>({
    mutationFn: async (data) =>
      (
        await {
          post: async () =>
            api.post(`admin/clients/secrets/create?clientId=${clientId}`, data),
          put: async () =>
            api.put(`admin/clients/secrets/update?clientId=${clientId}`, data),
        }[data.id ? 'put' : 'post']()
      ).data,

    onSuccess: ({ id: secretId }) => {
      navigate(replaceLinkParams(ROUTES.CLIENT_SECRETS_ROUTE, { clientId }));
      toast.open({
        type: 'success',
        title: t('toast.notification'),
        message: {
          post: t('toast.secretCreated', {
            defaultValue: 'Secret Created Successfully',
          }),
          put: t('toast.secrettUpdated', {
            defaultValue: 'Secret Updated Successfully',
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
  const onSubmit: SubmitHandler<ApiClientSecret> = useCallback(
    async (secret) => {
      await mutation.mutateAsync({
        ...secret,
        data: JSON.parse(secret.data),
        clientId: clientId as string,
      });
    },
    [clientId]
  );

  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ApiClientSecret>();
  useEffect(() => {
    if (secret)
      reset({
        ...secret,
        data: JSON.stringify(secret.data),
      });
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
            <Button appearance="primary" type="submit" disabled={isSubmitting}>
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
            {...register('name', { required: true })}
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
                options={[
                  { label: 'Test', value: 'test' },
                  { label: 'Stage', value: 'stage' },
                  { label: 'Production', value: 'production' },
                ]}
              />
            )}
            rules={{ required: true }}
          />
          <Controller
            name="data"
            control={control}
            render={({ field }) => (
              <FormTextarea {...field} label={<TransField i18nKey="json" />} />
            )}
            rules={{ required: true }}
          />
          <FormElement label={null}>
            <Track>
              <Controller
                name="data"
                control={control}
                render={({ field }) =>
                  validate(field.value) ? (
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
                  )
                }
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
