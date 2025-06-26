import { Button, Card, FormInput, FormSelect, Track } from 'components';
import { Controller, useForm } from 'react-hook-form';
import { TransButton } from 'i18n/trans/button';
import { TransField } from 'i18n/trans/field';
import { TransTitle } from 'i18n/trans/title';
import { ROUTES } from 'resources/routes-constants';
import { Link } from 'components/Router/Link';
import { Trans } from 'react-i18next';

export const ClientCertificateCreatePage = () => {
  const { register, control } = useForm({
    defaultValues: {
      name: 'Kana',
      organization: '',
      organizationUnit: '',
      country: '',
      stateOfProvince: '',
      locality: '',
    },
  });

  return (
    <>
      <Track direction="vertical" align="left">
        <h6>
          <TransTitle i18nKey="client" values={{ client: 'A' }} />
        </h6>
        <h1>
          <Trans
            i18nKey="title.clientCertificateAdd"
            defaults="Add certificate"
          />
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
              <TransButton i18nKey="generate" />
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
            label={<TransField i18nKey="commonName" />}
            type="text"
          />
          <Controller
            name="organization"
            control={control}
            render={({ field }) => (
              <FormSelect
                {...field}
                placeholder="-"
                label={<TransField i18nKey="organization" />}
                options={[
                  { label: 'Some organization', value: 'organization' },
                ]}
              />
            )}
          />
          <FormInput
            {...register('organizationUnit')}
            label={<TransField i18nKey="organizationUnit" />}
            type="text"
          />
          <FormInput
            {...register('country')}
            label={<TransField i18nKey="country" />}
            type="text"
          />
          <FormInput
            {...register('stateOfProvince')}
            label={<TransField i18nKey="stateOfProvince" />}
            type="text"
          />
          <FormInput
            {...register('locality')}
            label={<TransField i18nKey="locality" />}
            type="text"
          />
        </Track>
      </Card>
    </>
  );
};
