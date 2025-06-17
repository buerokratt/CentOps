import { Button, Card, FormInput, Track } from 'components';
import { Controller, useForm } from 'react-hook-form';
import { TransButton } from 'i18n/trans/button';
import { TransField } from 'i18n/trans/field';
import { formatDate } from 'utils/date';
import FormTextarea from 'components/FormElements/FormTextarea';
import { TransNav } from 'i18n/trans/nav';

export const DocumentationEditPage = () => {
  const { register, control } = useForm({
    defaultValues: {
      content: `# Github is great
  
  [Read about everything on Github](https://github.com).
  `,
      createdAt: '2025-06-07T14:11:00.107Z',
      updatedAt: '2025-06-07T14:11:00.107Z',
    },
  });

  return (
    <>
      <Track direction="vertical" align="left">
        <h1>
          <TransNav i18nKey="documentation" />
        </h1>
      </Track>

      <Card
        footer={
          <Track justify="between">
            <Button appearance="primary" outlined>
              <TransButton i18nKey="cancel" />
            </Button>
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
          <FormTextarea
            {...register('content')}
            label={<TransField i18nKey="content" />}
            maxRows={24}
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
