import { Card, CardFooter, CardHeader } from 'components/Card';
import { Track } from 'components/Track';
import { Label } from 'components/Label';
import { Icon } from 'components/Icon';
import { TransLabel } from 'i18n/trans/label';
import { Button } from 'components/Button';
import { TransButton } from 'i18n/trans/button';
import { FormInput } from 'components/FormElements';
import { TransField } from 'i18n/trans/field';
import { formatDate } from 'utils/date';

export const Certificate = () => {
  return (
    <Card
      bordered={false}
      slots={{
        header: <CardHeader filled={false} bordered={false} />,
        footer: <CardFooter bordered={false} />,
      }}
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
          <FormInput
            name="id"
            label={<TransField i18nKey="id" />}
            value="cert-2025-03"
            readOnly
          />
          <FormInput
            name="validFrom"
            value={formatDate('2025-06-07T14:11:00.107Z')}
            label={<TransField i18nKey="validFrom" />}
            readOnly
          />
          <FormInput
            name="fingerprint"
            label={<TransField i18nKey="fingerprint" />}
            value="8A:D3:42:..."
            readOnly
          />
        </Track>
        <Track direction="vertical">
          <FormInput
            name="issuer"
            label={<TransField i18nKey="issuer" />}
            value="centops-root-ca"
            readOnly
          />
          <FormInput
            name="validTo"
            value={formatDate('2025-06-07T14:11:00.107Z')}
            label={<TransField i18nKey="validTo" />}
            type="text"
            readOnly
          />
        </Track>
      </Track>
    </Card>
  );
};
