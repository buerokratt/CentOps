import { Button, Card, FormInput, FormSelect, Track } from 'components';
import { Controller, useForm } from 'react-hook-form';
import { TransButton } from 'i18n/trans/button';
import { TransField } from 'i18n/trans/field';
import { TransTitle } from 'i18n/trans/title';
import { ROUTES } from 'resources/routes-constants';
import { Link } from 'components/Router/Link';
import { Trans } from 'react-i18next';
import { withAuthorization } from 'hoc/withAuthorization';

export const ClientDeploymentCreatePage = withAuthorization(() => {
  const { register, control } = useForm({
    defaultValues: {
      nameSpace: 'ppa-buerokratt',
      manifest: '',
    },
  });

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
            name="manifest"
            control={control}
            render={({ field }) => (
              <FormSelect
                {...field}
                placeholder="-"
                label={<TransField i18nKey="manifest" />}
                options={[{ label: 'manifest', value: '123' }]}
              />
            )}
          />
        </Track>
      </Card>
    </>
  );
});
