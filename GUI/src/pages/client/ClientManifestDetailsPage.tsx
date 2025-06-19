import { useParams } from 'react-router-dom';
import {
  Button,
  Card,
  FormInput,
  FormSelect,
  FormYamlEditor,
  Track,
} from 'components';
import { Controller, useForm } from 'react-hook-form';
import { TransButton } from 'i18n/trans/button';
import { TransField } from 'i18n/trans/field';
import { TransTitle } from 'i18n/trans/title';
import { formatDate } from 'utils/date';
import { ROUTES } from 'resources/routes-constants';
import { Link } from 'components/Router/Link';

export const ClientManifestDetailsPage = () => {
  const { manifestId } = useParams<{ manifestId: 'create' | string }>();
  const isCreateMode = manifestId === 'create';
  const { register, control } = useForm({
    defaultValues: {
      name: '',
      helm: '123',
      yaml: `---
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
            <TransTitle i18nKey="manifestAdd" />
          ) : (
            <TransTitle i18nKey="manifestEdit" />
          )}
        </h1>
      </Track>

      <Card
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
            name="helm"
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
            name="yaml"
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
