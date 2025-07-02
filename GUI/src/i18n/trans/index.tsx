import type { FC, ReactElement } from 'react';
import { cloneElement } from 'react';
import {
  type Trans,
  type TransProps as I18nTransProps,
  useTranslation,
} from 'react-i18next';

type Translations = Record<string, ReactElement<typeof Trans>>;
export interface TransProps<T extends Translations>
  extends Omit<I18nTransProps<string>, 'i18nKey'> {
  i18nKey: keyof T;
}

export const createTrans =
  <T extends Translations>(translations: T): FC<TransProps<T>> =>
  ({ i18nKey, ...props }) => {
    const { t } = useTranslation();

    return cloneElement(translations[i18nKey], { t, ...props });
  };

export type TransKeys<C> = C extends FC<TransProps<infer P>> ? keyof P : never;
