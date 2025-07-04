import { Button, Card, Track } from 'components';
import { TransNav } from 'i18n/trans/nav';
import { Link } from 'components/Router/Link';
import { ROUTES } from 'resources/routes-constants';
import { TransButton } from 'i18n/trans/button';
import Markdown from 'markdown-to-jsx';
import { withAuthorization } from 'hoc/withAuthorization';

export const DocumentationPage = withAuthorization(() => {
  const markdown = `# Github is great
  
  [Read about everything on Github](https://github.com).
  `;

  return (
    <>
      <Track justify="between">
        <h1>
          <TransNav i18nKey="documentation" />
        </h1>
        <Link to={ROUTES.DOCUMENTATION_EDIT_ROUTE}>
          <Button appearance="primary">
            <TransButton i18nKey="edit" />
          </Button>
        </Link>
      </Track>

      <Card>
        <Markdown children={markdown} />
      </Card>
    </>
  );
});
