import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card, FormCheckbox, FormInput, Icon, Track } from 'components';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import { TransButton } from 'i18n/trans/button';
import { TransField } from 'i18n/trans/field';
import { TransTitle } from 'i18n/trans/title';
import { CardHeader } from 'components/Card';
import { formatDate } from 'utils/date';
import { ROUTES } from 'resources/routes-constants';
import { Link } from 'components/Router/Link';
import { withAuthorization } from 'hoc/withAuthorization';
import { useMutation, useQuery } from '@tanstack/react-query';
import type { ApiClient } from 'types/client';
import { useCallback, useEffect } from 'react';
import { useToast } from 'hooks';
import { useTranslation } from 'react-i18next';
import type { AxiosError } from 'axios';
import api from 'services/api';

export const ClientDetailsPage = withAuthorization(() => {
  const { clientId } = useParams<{ clientId: 'create' | string }>();
  const isCreateMode = clientId === 'create';

  const { data: client } = useQuery<ApiClient | object>({
    enabled: !isCreateMode,
    queryKey: [`admin/client-by-id?clientId=${clientId}`],
    initialData: {},
  });
  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ApiClient>({
    defaultValues: client,
  });
  useEffect(() => {
    if (client) reset(client);
  }, [client]);

  const navigate = useNavigate();
  const toast = useToast();
  const { t } = useTranslation();
  const clusterMutation = useMutation<
    ApiClient,
    AxiosError,
    {
      method: 'post' | 'put';
      data: ApiClient;
    }
  >({
    mutationFn: async ({ method, data: { clientId, ...data } }) =>
      (
        await {
          post: async () => api.post('admin/clients', data),
          put: async () => api.put(`admin/clients?clientId=${clientId}`, data),
        }[method]()
      ).data,
    onSuccess: (_, { method }) => {
      navigate(ROUTES.CLIENT_LIST_ROUTE);
      toast.open({
        type: 'success',
        title: t('toast.notification'),
        message: {
          post: t('toast.clientCreated', {
            defaultValue: 'Client Created Successfully',
          }),
          put: t('toast.clientUpdated', {
            defaultValue: 'Client Updated Successfully',
          }),
        }[method],
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
  const onSubmit: SubmitHandler<ApiClient> = useCallback(async (data) => {
    await clusterMutation.mutateAsync({
      method: data.clientId ? 'put' : 'post',
      data,
    });
  }, []);

  return (
    <>
      <Track justify="between">
        <h2>
          {isCreateMode ? (
            <TransTitle i18nKey="clientAdd" />
          ) : (
            <TransTitle i18nKey="client" values={{ client: 'A' }} />
          )}
        </h2>
      </Track>

      <Card
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        slots={{ header: <CardHeader filled={false} bordered={false} /> }}
        header={
          <Track justify="end" gap={8}>
            <Button
              component={Link}
              to={ROUTES.CLIENT_CERTIFICATES_ROUTE}
              appearance="text"
              disabled={isCreateMode}
            >
              <Icon name="certificate-add" />
              <TransButton i18nKey="certificates" />
            </Button>
            <Button
              component={Link}
              to={ROUTES.CLIENT_SECRETS_ROUTE}
              appearance="text"
              disabled={isCreateMode}
            >
              <Icon name="key" />
              <TransButton i18nKey="secrets" />
            </Button>
            <Button
              component={Link}
              to={ROUTES.CLIENT_MANIFESTS_ROUTE}
              appearance="text"
              disabled={isCreateMode}
            >
              <Icon name="manifest" />
              <TransButton i18nKey="manifests" />
            </Button>
            <Button
              component={Link}
              to={ROUTES.CLIENT_DEPLOYMENTS_ROUTE}
              appearance="text"
              disabled={isCreateMode}
            >
              <Icon name="flag" />
              <TransButton i18nKey="deployment" />
            </Button>
          </Track>
        }
        footer={
          <Track justify="between">
            <Button
              component={Link}
              to={ROUTES.CLIENT_LIST_ROUTE}
              appearance="primary"
              outlined
            >
              <TransButton i18nKey="cancel" />
            </Button>
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
            label={<TransField i18nKey="clientName" />}
            type="text"
          />
          <FormInput
            {...register('kubernetesClusterAddress', { required: true })}
            label={<TransField i18nKey="clusterAddress" />}
          />
          <FormInput
            {...register('kubernetesClusterNamespace', { required: true })}
            label={<TransField i18nKey="nameSpace" />}
          />
          <FormInput
            {...register('argoAppDeploymentName', { required: true })}
            label={<TransField i18nKey="argoApplicationName" />}
          />
          <FormCheckbox
            {...register('partOfNetwork')}
            label={<TransField i18nKey="burokrattNetwork" />}
          />
          {!isCreateMode && (
            <>
              <Controller
                name="createdAt"
                control={control}
                render={({ field }) => (
                  <FormInput
                    {...field}
                    value={formatDate(field.value)}
                    label={<TransField i18nKey="createdAt" />}
                    readOnly
                  />
                )}
              />
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
            </>
          )}
        </Track>
      </Card>
    </>
  );
});
