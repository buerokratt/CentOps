import { useParams } from 'react-router-dom';
import {
  Button,
  Card,
  FormInput,
  Icon,
  Label,
  Switch,
  Track,
} from 'components';
import { Controller, useForm } from 'react-hook-form';
import { TransButton } from 'i18n/trans/button';
import { TransField } from 'i18n/trans/field';
import { TransTitle } from 'i18n/trans/title';
import { CardFooter, CardHeader } from 'components/Card';
import { formatDate } from 'utils/date';
import { FormElement } from 'components/FormElements';
import { TransLabel } from 'i18n/trans/label';
import { GenerateCertificateDialog } from 'pages/client/details/GenerateCertificateDialog';
import { DeleteCertificateDialog } from 'pages/client/details/DeleteCertificateDialog';
import { ConfirmChangesDialog } from 'pages/client/details/ConfirmChangesDialog';
import { ROUTES } from 'resources/routes-constants';
import { Link } from 'components/Router/Link';

export const ClientDetailsPage = () => {
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
      certificate: {
        id: 'cert-2025-03',
        issuer: 'centops-root-ca',
        validFrom: '2025-06-07T14:11:00.107Z',
        validTo: '2025-06-07T14:11:00.107Z',
        fingerprint: '8A:D3:42:...',
      },
    },
  });

  return (
    <>
      <GenerateCertificateDialog />
      <DeleteCertificateDialog />
      <ConfirmChangesDialog />
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
              <TransButton i18nKey="generateCertificate" />
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
          <FormElement label={null}>
            <Card
              slots={{
                header: <CardHeader filled={false} bordered={false} />,
                footer: <CardFooter bordered={false} />,
              }}
              shadow
              header={<TransTitle i18nKey="certificate" />}
              footer={
                <Track justify="between">
                  <Track gap={8}>
                    <Label type="success">
                      <Icon name="check" size="small" />
                      <TransLabel i18nKey="valid" />
                    </Label>
                    <Label type="error">
                      <Icon name="danger" size="small" />
                      <TransLabel i18nKey="revoked" />
                    </Label>
                    <Label type="warning">
                      <Icon name="warning" size="small" />
                      <TransLabel i18nKey="expiring" />
                    </Label>
                  </Track>
                  <Button appearance="error">
                    <TransButton i18nKey="delete" />
                  </Button>
                </Track>
              }
            >
              <Track justify="around" align="left">
                <Track direction="vertical">
                  <Controller
                    name="certificate.id"
                    control={control}
                    render={({ field }) => (
                      <FormInput
                        {...field}
                        label={<TransField i18nKey="id" />}
                        type="text"
                        readOnly
                      />
                    )}
                  />
                  <Controller
                    name="certificate.validFrom"
                    control={control}
                    render={({ field }) => (
                      <FormInput
                        {...field}
                        value={formatDate(field.value)}
                        label={<TransField i18nKey="validFrom" />}
                        type="text"
                        readOnly
                      />
                    )}
                  />
                  <Controller
                    name="certificate.fingerprint"
                    control={control}
                    render={({ field }) => (
                      <FormInput
                        {...field}
                        label={<TransField i18nKey="fingerprint" />}
                        type="text"
                        readOnly
                      />
                    )}
                  />
                </Track>
                <Track direction="vertical">
                  <Controller
                    name="certificate.issuer"
                    control={control}
                    render={({ field }) => (
                      <FormInput
                        {...field}
                        label={<TransField i18nKey="issuer" />}
                        type="text"
                        readOnly
                      />
                    )}
                  />
                  <Controller
                    name="certificate.validTo"
                    control={control}
                    render={({ field }) => (
                      <FormInput
                        {...field}
                        value={formatDate(field.value)}
                        label={<TransField i18nKey="validTo" />}
                        type="text"
                        readOnly
                      />
                    )}
                  />
                </Track>
              </Track>
            </Card>
          </FormElement>
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
};
