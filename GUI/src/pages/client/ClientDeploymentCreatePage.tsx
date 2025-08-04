import { Button, Card, FormInput, FormSelect, Track } from 'components';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import { TransButton } from 'i18n/trans/button';
import { TransField } from 'i18n/trans/field';
import { TransTitle } from 'i18n/trans/title';
import { ROUTES } from 'resources/routes-constants';
import { Link } from 'components/Router/Link';
import { Trans } from 'react-i18next';
import { withAuthorization } from 'hoc/withAuthorization';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { initialPaginationData, type Pagination } from 'types/pagination';
import type { ApiClientManifest, ClientDeployment } from 'types/client';
import { usePagination } from 'hooks/usePagination';
import { useCallback } from 'react';
import api from 'services/api';

export const ClientDeploymentCreatePage = withAuthorization(() => {
  const { clientId } = useParams<{ clientId: string }>();
  const [pagination] = usePagination({
    pageIndex: 0,
    pageSize: 100,
  });
  const {
    data: { items: manifests },
  } = useQuery<Pagination<ApiClientManifest>>({
    meta: { pagination },
    queryKey: [
      `admin/clients/manifests/all?clientId=${clientId}`,
      ...Object.values(pagination),
    ],
    initialData: initialPaginationData<ApiClientManifest>(),
  });
  console.log(manifests);

  const { register, control, handleSubmit } = useForm<ClientDeployment>({
    defaultValues: {
      nameSpace: 'ppa-buerokratt',
    },
  });

  const onSubmit: SubmitHandler<ClientDeployment> = useCallback(
    async ({ manifestId }) => {
      await api.post(`admin/clients/deployments/run`, {
        clientId,
        manifestId: parseInt(manifestId),
      });
    },
    []
  );

  return (
    <>
      <Track direction="vertical" align="left">
        <h6>
          <TransTitle i18nKey="client" values={{ client: 'A' }} />
        </h6>
        <h1>
          <Trans i18nKey="title.clientDeploymentAdd" defaults="Deployment" />
        </h1>
      </Track>

      <Card
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        footer={
          <Track justify="between">
            <Link to={ROUTES.CLIENT_DETAILS_ROUTE}>
              <Button appearance="primary" outlined>
                <TransButton i18nKey="cancel" />
              </Button>
            </Link>
            <Button appearance="primary">
              <TransButton i18nKey="deploy" />
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
            {...register('nameSpace')}
            label={<TransField i18nKey="nameSpace" />}
            readOnly
          />
          <Controller
            name="manifestId"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <FormSelect
                {...field}
                placeholder="-"
                label={<TransField i18nKey="manifest" />}
                options={manifests.map(
                  ({ manifestId: value, name: label }) => ({ value, label })
                )}
              />
            )}
          />
        </Track>
      </Card>
    </>
  );
});
