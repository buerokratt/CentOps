import { useParams } from 'react-router-dom';
import {
  Button,
  Card,
  FormInput,
  FormSelect,
  FormYamlEditor,
  Track,
} from 'components';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import { TransButton } from 'i18n/trans/button';
import { TransField } from 'i18n/trans/field';
import { TransTitle } from 'i18n/trans/title';
import { formatDate } from 'utils/date';
import { ROUTES } from 'resources/routes-constants';
import { Link } from 'components/Router/Link';
import { withAuthorization } from 'hoc/withAuthorization';
import type { ApiClientManifest } from 'types/client';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useCallback, useEffect } from 'react';
import type { AxiosError } from 'axios';
import api from 'services/api';
import { useToast } from 'hooks';
import { useTranslation } from 'react-i18next';

export const ClientManifestDetailsPage = withAuthorization(() => {
  const { clientId, manifestId } = useParams<{
    clientId: string;
    manifestId: 'create' | string;
  }>();
  const isCreateMode = manifestId === 'create';

  const { data: manifest } = useQuery<ApiClientManifest | object>({
    enabled: !isCreateMode,
    queryKey: [
      `admin/clients/manifests/get?clientId=${clientId}&manifestId=${manifestId}`,
    ],
    initialData: {},
  });
  const toast = useToast();
  const { t } = useTranslation();
  const mutation = useMutation<
    ApiClientManifest,
    AxiosError,
    ApiClientManifest
  >({
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
        }[data.manifestId ? 'put' : 'post']()
      ).data,

    onSuccess: ({ manifestId }) => {
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
        }[manifestId ? 'put' : 'post'],
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
  const onSubmit: SubmitHandler<ApiClientManifest> = useCallback(
    async (data) => {
      await mutation.mutateAsync(data);
    },
    []
  );
  const { register, control, reset, handleSubmit } = useForm<ApiClientManifest>(
    {
      defaultValues: {
        name: 'Manifest_20250606',
        helmVersion: '123',
        helmValues: `---
doe: "a deer, a female deer"
>>,,,
ray: "a drop of golden sun"
pi: 3.14159
xmas: true
french-hens: 3
calling-birds:
  - huey
  - dewey
  - louie
  - fred
xmas-fifth-day:
  calling-birds: four
  french-hens: 3
  golden-rings: 5
  partridges:
    count: 1
    location: "a pear tree"
  turtle-doves: two`,
        createdAt: '2025-06-07T14:11:00.107Z',
        updatedAt: '2025-06-07T14:11:00.107Z',
      },
    }
  );
  useEffect(() => {
    if (manifest) reset(manifest);
  }, [manifest]);

  return (
    <>
      <Track direction="vertical" align="left">
        <h6>
          <TransTitle i18nKey="client" values={{ client: 'A' }} />
        </h6>
        <h1>
          {isCreateMode ? (
            <TransTitle i18nKey="manifestAdd" />
          ) : (
            <TransTitle i18nKey="manifestEdit" />
          )}
        </h1>
      </Track>

      <Card
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        footer={
          <Track justify="between">
            <Link to={ROUTES.CLIENT_MANIFESTS_ROUTE}>
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
            name="helmVersion"
            control={control}
            render={({ field }) => (
              <FormSelect
                {...field}
                placeholder="-"
                label={<TransField i18nKey="helm" />}
                options={[{ label: '123', value: '123' }]}
              />
            )}
          />
          <Controller
            name="helmValues"
            control={control}
            render={({ field }) => (
              <FormYamlEditor
                label={<TransField i18nKey="yaml" />}
                {...field}
                // TODO, tmp height
                maxHeight="640px"
              />
            )}
          />

          <Controller
            name="helmVersion"
            control={control}
            render={({ field }) => (
              <FormInput
                {...field}
                value={field.value}
                label={<TransField i18nKey="version" />}
                type="text"
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
        </Track>
      </Card>
    </>
  );
});
