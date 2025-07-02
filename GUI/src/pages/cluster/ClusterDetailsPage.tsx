import { useParams } from 'react-router-dom';
import { Button, Card, FormInput, Track } from 'components';
import { Controller, useForm } from 'react-hook-form';
import { TransButton } from 'i18n/trans/button';
import { TransField } from 'i18n/trans/field';
import { TransTitle } from 'i18n/trans/title';
import { formatDate } from 'utils/date';
import { TransNav } from 'i18n/trans/nav';

export const ClusterDetailsPage = () => {
  const { clusterId } = useParams<{ clusterId: 'create' | string }>();
  const isCreateMode = clusterId === 'create';
  const { register, control } = useForm({
    defaultValues: {
      clusterName: '',
      clusterIp: '',
      argoApiUrl: '',
      argoApiToken: '',
      createdAt: '2025-06-07T14:11:00.107Z',
      updatedAt: '2025-06-07T14:11:00.107Z',
    },
  });

  return (
    <>
      <Track direction="vertical" align="left">
        <h6>
          <TransNav i18nKey="settings" />
        </h6>
        <h1>
          <h2>
            {isCreateMode ? (
              <TransTitle i18nKey="clusterAdd" />
            ) : (
              <TransTitle i18nKey="cluster" values={{ cluster: 'A' }} />
            )}
          </h2>
        </h1>
      </Track>

      <Card
        footer={
          <Track justify="between">
            <Button appearance="primary" outlined>
              <TransButton i18nKey="cancel" />
            </Button>

            <Track gap={16}>
              <Button appearance="primary" outlined>
                <TransButton i18nKey="testConnection" />
              </Button>
              <Button appearance="primary">
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
            {...register('clusterName')}
            label={<TransField i18nKey="clusterName" />}
            type="text"
          />
          <FormInput
            {...register('clusterIp')}
            label={<TransField i18nKey="clusterIp" />}
            type="text"
          />
          <FormInput
            {...register('argoApiUrl')}
            label={<TransField i18nKey="argoApiUrl" />}
            type="text"
          />
          <FormInput
            {...register('argoApiToken')}
            label={<TransField i18nKey="argoApiToken" />}
            type="text"
          />

          <Controller
            name="createdAt"
            control={control}
            render={({ field }) => (
              <FormInput
                {...field}
                value={formatDate(field.value)}
                label={<TransField i18nKey="createdAt" />}
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
};
