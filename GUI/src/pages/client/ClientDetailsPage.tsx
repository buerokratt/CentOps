import { useParams } from 'react-router-dom';
import { Button, Card, FormInput, Icon, Switch, Track } from 'components';
import { Controller, useForm } from 'react-hook-form';
import { TransButton } from 'i18n/trans/button';
import { TransField } from 'i18n/trans/field';
import { TransTitle } from 'i18n/trans/title';
import { CardHeader } from 'components/Card';
import { formatDate } from 'utils/date';
import { ROUTES } from 'resources/routes-constants';
import { Link } from 'components/Router/Link';
import { withAuthorization } from 'hoc/withAuthorization';

export const ClientDetailsPage = withAuthorization(() => {
  const { clientId } = useParams<{ clientId: 'create' | string }>();
  const isCreateMode = clientId === 'create';
  const { register, control } = useForm({
    defaultValues: {
      name: '',
      clusterIp: '',
      nameSpace: '',
      vaultApiToken: '',
      burokrattNetwork: true,
      createdAt: '2025-06-07T14:11:00.107Z',
      updatedAt: '2025-06-07T14:11:00.107Z',
    },
  });

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
        slots={{ header: <CardHeader filled={false} bordered={false} /> }}
        header={
          <Track justify="end" gap={8}>
            <Button appearance="text" disabled={isCreateMode}>
              <Icon name="certificate-add" />
              <TransButton i18nKey="certificates" />
            </Button>
            <Button appearance="text" disabled={isCreateMode}>
              <Icon name="key" />
              <TransButton i18nKey="secrets" />
            </Button>
            <Button appearance="text" disabled={isCreateMode}>
              <Icon name="manifest" />
              <TransButton i18nKey="manifests" />
            </Button>
            <Button appearance="text" disabled={isCreateMode}>
              <Icon name="flag" />
              <TransButton i18nKey="deployment" />
            </Button>
          </Track>
        }
        footer={
          <Track justify="between">
            <Link to={ROUTES.CLIENT_LIST_ROUTE}>
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
            label={<TransField i18nKey="clientName" />}
            type="text"
          />
          <FormInput
            {...register('clusterIp')}
            label={<TransField i18nKey="clusterIp" />}
            type="text"
          />
          <FormInput
            {...register('nameSpace')}
            label={<TransField i18nKey="nameSpace" />}
            type="text"
          />
          <FormInput
            {...register('vaultApiToken')}
            label={<TransField i18nKey="vaultApiToken" />}
            type="text"
          />
          <Controller
            name="burokrattNetwork"
            control={control}
            render={({ field }) => (
              <Switch
                onCheckedChange={field.onChange}
                label={<TransField i18nKey="burokrattNetwork" />}
                checked={field.value}
                {...field}
              />
            )}
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
});
