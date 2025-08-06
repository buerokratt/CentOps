import { Button, Card, FormInput, Track } from 'components';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import { TransButton } from 'i18n/trans/button';
import { TransField } from 'i18n/trans/field';
import { formatDate } from 'utils/date';
import FormTextarea from 'components/FormElements/FormTextarea';
import { TransNav } from 'i18n/trans/nav';
import { withAuthorization } from 'hoc/withAuthorization';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  type MouseEventHandler,
  useCallback,
  useEffect,
  useState,
} from 'react';
import type { ApiDocumentation } from 'types/documentation';
import api from 'services/api';
import type { AxiosError } from 'axios';
import Markdown, { RuleType } from 'markdown-to-jsx';
import { useToast } from 'hooks';
import { useTranslation } from 'react-i18next';
import { Code } from 'pages/documentation/Code';

export const DocumentationPage = withAuthorization(() => {
  const [editMode, setEditMode] = useState(false);
  const toggleEditMode = useCallback<MouseEventHandler<HTMLButtonElement>>(
    (event) => {
      event.preventDefault();
      setEditMode((prev) => !prev);
    },
    []
  );
  const { data: documentation } = useQuery<ApiDocumentation | null>({
    queryKey: ['admin/documentations'],
    initialData: null,
  });
  const toast = useToast();
  const { t } = useTranslation();
  const mutation = useMutation<ApiDocumentation, AxiosError, ApiDocumentation>({
    mutationFn: async (data) =>
      await api.post(`admin/documentations`, { content: data.content }),
    onSuccess: () => {
      toast.open({
        type: 'success',
        title: t('toast.notification'),
        message: t('toast.documentationUpdated', {
          defaultValue: 'Documentation Updated Successfully',
        }),
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
  const onSubmit: SubmitHandler<ApiDocumentation> = useCallback(
    async (data) => {
      await mutation.mutateAsync(data);
      setEditMode(false);
    },
    []
  );

  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ApiDocumentation>({
    defaultValues: {},
  });
  useEffect(() => {
    if (documentation) reset(documentation);
  }, [documentation]);

  return (
    <>
      <Track align="left" justify="between">
        <h1>
          <TransNav i18nKey="documentation" />
        </h1>
        {!editMode && (
          <Button appearance="primary" onClick={toggleEditMode}>
            <TransButton i18nKey="edit" />
          </Button>
        )}
      </Track>

      <Card
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        footer={
          editMode && (
            <Track justify="between">
              <Button
                appearance="primary"
                outlined
                type="button"
                onClick={toggleEditMode}
              >
                <TransButton i18nKey="cancel" />
              </Button>
              <Button
                appearance="primary"
                type="submit"
                disabled={isSubmitting}
              >
                <TransButton i18nKey="save" />
              </Button>
            </Track>
          )
        }
      >
        {editMode ? (
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
        ) : (
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <Markdown
                children={field.value}
                options={{
                  renderRule(next, node, _renderChildren, state) {
                    if (node.type === RuleType.codeInline) {
                      console.log(node, state);
                      return (
                        <Code
                          key={state.key}
                          PreTag="span"
                        >{String.raw`${node.text}`}</Code>
                      );
                    }

                    return next();
                  },
                  overrides: { code: { component: Code } },
                }}
              />
            )}
          />
        )}
      </Card>
    </>
  );
});
