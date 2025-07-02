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
import { Controller, useForm } from 'react-hook-form';
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

export const ClientSecretDetailsPage = () => {
  const { secretId } = useParams<{ secretId: 'create' | string }>();
  const isCreateMode = secretId === 'create';
  const { register, control } = useForm({
    defaultValues: {
      name: 'Super secret',
      environment: 'production',
      json: '{}',
      version: '1.0.0',
      createdAt: '2025-06-07T14:11:00.107Z',
      updatedAt: '2025-06-07T14:11:00.107Z',
    },
  });

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
            name="version"
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
};
