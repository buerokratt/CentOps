import { Button, Card, Track } from 'components';
import { TransTitle } from 'i18n/trans/title';
import { TransButton } from 'i18n/trans/button';
import ReactDiffViewer from 'react-diff-viewer';
import { ROUTES } from 'resources/routes-constants';
import { Link } from 'components/Router/Link';

export const ClientSecretDiffPage = () => {
  return (
    <>
      <Track direction="vertical" align="left">
        <h6>
          <TransTitle i18nKey="client" values={{ client: 'A' }} />
        </h6>
        <h1>
          <TransTitle i18nKey="secretDiff" />
        </h1>
      </Track>

      <Card
        footer={
          <Track justify="between">
            <Link to={ROUTES.CLIENT_SECRETS_DETAILS_ROUTE}>
              <Button appearance="primary" outlined>
                <TransButton i18nKey="backToSecrets" />
              </Button>
            </Link>
          </Track>
        }
      >
        <ReactDiffViewer
          oldValue={JSON.stringify('{}', null, 2)}
          newValue={JSON.stringify('{"key": "value"}', null, 2)}
          splitView={true}
          hideLineNumbers={true}
          extraLinesSurroundingDiff={30000}
        />
      </Card>
    </>
  );
};
