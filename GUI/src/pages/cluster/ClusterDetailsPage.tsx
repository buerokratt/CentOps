import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card, FormInput, Track } from 'components';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import { TransButton } from 'i18n/trans/button';
import { TransField } from 'i18n/trans/field';
import { TransTitle } from 'i18n/trans/title';
import { formatDate } from 'utils/date';
import { TransNav } from 'i18n/trans/nav';
import { withAuthorization } from 'hoc/withAuthorization';
import { useCallback, useEffect } from 'react';
import type { ApiCluster } from 'types/cluster';
import { useMutation, useQuery } from '@tanstack/react-query';
import api from 'services/api';
import type { AxiosError } from 'axios';
import { ROUTES } from 'resources/routes-constants';
import { Link } from 'components/Router/Link';
import { useToast } from 'hooks';
import { useTranslation } from 'react-i18next';

export const ClusterDetailsPage = withAuthorization(() => {
  const { clusterId } = useParams<{ clusterId: 'create' | string }>();
  const isCreateMode = clusterId === 'create';

  const { data: cluster } = useQuery<ApiCluster | object>({
    enabled: !isCreateMode,
    queryKey: [`admin/cluster-by-id?clusterId=${clusterId}`],
    initialData: {},
  });

  const { register, control, handleSubmit, reset } = useForm<ApiCluster>({
    defaultValues: cluster,
  });
  useEffect(() => {
    if (cluster) reset(cluster);
  }, [cluster]);

  const navigate = useNavigate();
  const toast = useToast();
  const { t } = useTranslation();
  const clusterMutation = useMutation<
    ApiCluster,
    AxiosError,
    {
      method: 'post' | 'put';
      data: ApiCluster;
    }
  >({
    mutationFn: async ({ method, data: { clusterId, ...data } }) =>
      (
        await {
          post: async () => api.post('admin/clusters', data),
          put: async () =>
            api.put(`admin/clusters?clusterId=${clusterId}`, data),
        }[method]()
      ).data,
    onSuccess: (_, { method }) => {
      navigate(-1);
      toast.open({
        type: 'success',
        title: t('toast.notification'),
        message: {
          post: t('toast.clusterCreated', {
            defaultValue: 'Cluster Created Successfully',
          }),
          put: t('toast.clusterUpdated', {
            defaultValue: 'Cluster Updated Successfully',
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
  const onSubmit: SubmitHandler<ApiCluster> = useCallback((data) => {
    clusterMutation.mutate({ method: data.id ? 'put' : 'post', data });
  }, []);

  return (
    <>
      <Track direction="vertical" align="left">
        <h6>
          <TransNav i18nKey="settings" />
        </h6>
        <h1>
          {isCreateMode ? (
            <TransTitle i18nKey="clusterAdd" />
          ) : (
            <TransTitle i18nKey="cluster" values={{ cluster: 'A' }} />
          )}
        </h1>
      </Track>

      <Card
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        footer={
          <Track justify="between">
            <Link to={ROUTES.CLUSTER_LIST_ROUTE}>
              <Button appearance="primary" type="button" outlined>
                <TransButton i18nKey="cancel" />
              </Button>
            </Link>

            <Track gap={16}>
              <Button appearance="primary" type="button" outlined>
                <TransButton i18nKey="testConnection" />
              </Button>
              <Button appearance="primary" type="submit">
                <TransButton i18nKey="save" />
              </Button>
            </Track>
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
            label={<TransField i18nKey="clusterName" />}
            type="text"
          />
          <FormInput
            {...register('ipAddress', { required: true })}
            label={<TransField i18nKey="clusterIp" />}
            type="text"
          />
          <FormInput
            {...register('argoApiUrl', { required: true })}
            label={<TransField i18nKey="argoApiUrl" />}
            type="text"
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
