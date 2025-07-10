import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card, FormInput, Track } from 'components';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import { TransButton } from 'i18n/trans/button';
import { TransField } from 'i18n/trans/field';
import { TransTitle } from 'i18n/trans/title';
import { formatDate } from 'utils/date';
import { TransNav } from 'i18n/trans/nav';
import { withAuthorization } from 'hoc/withAuthorization';
import { useMutation, useQuery } from '@tanstack/react-query';
import type { ApiUser } from 'types/user';
import { useCallback, useEffect } from 'react';
import { useToast } from 'hooks';
import { useTranslation } from 'react-i18next';
import type { AxiosError } from 'axios';
import api from 'services/api';
import { ROUTES } from 'resources/routes-constants';
import { Link } from 'components/Router/Link';

export const UserDetailsPage = withAuthorization(() => {
  const { userId } = useParams<{ userId: 'create' | string }>();
  const isCreateMode = userId === 'create';

  const {
    data: { response: user },
  } = useQuery<{ response: ApiUser | object }>({
    enabled: !isCreateMode,
    queryKey: [`admin/user-by-id?userId=${userId}`],
    initialData: { response: {} },
  });
  const { register, control, handleSubmit, reset } = useForm<ApiUser>({
    defaultValues: user,
  });
  useEffect(() => {
    if (user) reset(user);
  }, [user]);

  const navigate = useNavigate();
  const toast = useToast();
  const { t } = useTranslation();
  const clusterMutation = useMutation<
    ApiUser,
    AxiosError,
    {
      method: 'post' | 'put';
      data: ApiUser;
    }
  >({
    mutationFn: async ({ method, data: { userId, ...data } }) =>
      (
        await {
          post: async () => api.post('admin/users', data),
          put: async () => api.put(`admin/users?userId=${userId}`, data),
        }[method]()
      ).data,
    onSuccess: (_, { method }) => {
      navigate(-1);
      toast.open({
        type: 'success',
        title: t('toast.notification'),
        message: {
          post: t('toast.userCreated', {
            defaultValue: 'User Created Successfully',
          }),
          put: t('toast.userUpdated', {
            defaultValue: 'User Updated Successfully',
          }),
        }[method],
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
  const onSubmit: SubmitHandler<ApiUser> = useCallback((data) => {
    clusterMutation.mutate({ method: data.id ? 'put' : 'post', data });
  }, []);

  return (
    <>
      <Track direction="vertical" align="left">
        <h6>
          <TransNav i18nKey="settings" />
        </h6>
        <h1>
          {isCreateMode ? (
            <TransTitle i18nKey="userAdd" />
          ) : (
            <TransTitle i18nKey="user" values={{ user: 'A' }} />
          )}
        </h1>
      </Track>

      <Card
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        footer={
          <Track justify="between">
            <Link to={ROUTES.USER_LIST_ROUTE}>
              <Button appearance="primary" type="button" outlined>
                <TransButton i18nKey="cancel" />
              </Button>
            </Link>
            <Button appearance="primary" type="submit">
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
            {...register('firstName', { required: true })}
            label={<TransField i18nKey="firstName" />}
            type="text"
          />
          <FormInput
            {...register('lastName', { required: true })}
            label={<TransField i18nKey="lastName" />}
            type="text"
          />
          <FormInput
            {...register('idCode', { required: true })}
            label={<TransField i18nKey="identificationNo" />}
            type="text"
          />

          {!isCreateMode && (
            <>
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
            </>
          )}
        </Track>
      </Card>
    </>
  );
});
