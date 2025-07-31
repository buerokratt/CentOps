import { format, isValid, parseISO } from 'date-fns';
import et from 'date-fns/locale/et';
import en from 'date-fns/locale/en-US';
import i18n from 'i18n';

export const locales = { et, en } as const;
export const localesMap = new Map(Object.entries(locales));

const formatPatterns = {
  default: 'dd-MM-yyyy hh:mm:ss',
  dateTime: 'dd-MM-yyyy hh:mm a',
} as const;

type DateFormatPattern = keyof typeof formatPatterns;
type DateInput = Date | string;

const parseDate = (date: DateInput): Date | null => {
  if (date instanceof Date) {
    return isValid(date) ? date : null;
  }
  const parsedDate = parseISO(date);
  return isValid(parsedDate) ? parsedDate : null;
};

export const formatDate = (
  date: DateInput,
  formatStyle: DateFormatPattern | string = formatPatterns.default
): string => {
  const parsedDate = parseDate(date);
  if (!parsedDate) return '';

  const pattern =
    formatStyle in formatPatterns
      ? formatPatterns[formatStyle as DateFormatPattern]
      : formatStyle;

  const locale = localesMap.get(i18n.language!) ?? locales.en;

  return format(parsedDate, pattern, { locale });
};
