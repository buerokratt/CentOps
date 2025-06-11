## i18n usage example
### translations will be extracted automatically 
```bash
  npm run i18n:extract
```
then you will see auto-extracted translations in `GUI/src/i18n/resources`

### NOTE!
#### dont make changes directly to `GUI/src/i18n/resources/en.json`
#### By default all translations for `en` is in `development` mode, and updating always when extracting
#### For Production, in case you need to change specific translation for `en` language please make changes to `GUI/src/i18n/resources/en.override.json`
#### inside `en.override.json` change only the keys which you really need to override, you may not need to change em all
```json
{
  "dialog.confirmChanges.description": "Are you sure you want to save changes?"
}
```

### NOTE!

### there are two ways how to use translation 
* via `t` function, mostly needs when we need exactly a string type
as example for `<input placeholder={t('....')}` /> elements
```tsx
const { t } = useTranslation();
// `defaultValue` is mandatory, and will be extracted
t('common.on', { defaultValue: 'On' })
```
* in other ways, it's recommending to follow the next approach, see examples in `GUI/src/i18n/trans`
```tsx
// for repeatable translations
export const TransButton = createTrans({
  // `defaults` is mandatory, and will be extracted
  cancel: <Trans i18nKey="button.cancel" defaults="Cancel" />,
})
```

```tsx
// or just for custom translation somewhere in code
import { TransButton } from 'i18n/trans/button';
import { Trans } from 'react-i18next';

// then use keyof TransButton
<TransButton i18nKey="cancel" />
/* or custom translations */
<Trans 
  i18nKey="dialog.createSomething.title" 
  defaults="Create something?" 
/>
<Trans 
  i18nKey="dialog.createSomething.description" 
  defaults="Create something description" 
/>
```