import * as dateFns from 'date-fns';

import et from 'date-fns/locale/et';
import en from 'date-fns/locale/en-US';
import i18n from 'i18n';

export const locales = { et, en };
export const localesMap = new Map([
  ['et', locales.et],
  ['en', locales.en],
]);

const formatPatterns = {
  dateTime: `dd-MM-yyyy hh:mm a`,
  default: 'dd.MM.yyyy',
} as const;
type DateFormatPattern = keyof typeof formatPatterns;

export const formatDate = (
  date: Date | string,
  formatStyle: keyof typeof formatPatterns | string = formatPatterns.default
) =>
  dateFns.format(
    typeof date === 'string' ? dateFns.parseISO(date) : date,
    formatStyle in formatPatterns
      ? formatPatterns[formatStyle as DateFormatPattern]
      : formatStyle,
    {
      locale: localesMap.get(i18n.language!),
    }
  );
