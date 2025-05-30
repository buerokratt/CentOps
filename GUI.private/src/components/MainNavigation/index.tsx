import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { MainNavigation as SharedMainNavigation } from '@centopsmodule/shared';

import { menuIcons } from 'constants/menuIcons';
import { ROUTES } from 'resources/routes-constants';

export const MainNavigation: FC = () => {
  const { t } = useTranslation();
  const menuItems = [
    {
      id: 'conversations',
      label: 'Vestlus',
      path: '/vestlus',
      children: [],
    },
    {
      id: 'training',
      label: 'Treening',
      path: '/treening',
      children: [
        {
          label: 'Treening',
          path: '/treening/treening',
          children: [
            {
              label: 'Teemad',
              path: '/treening/treening/teemad',
            },
            {
              label: 'Avalikud teemad',
              path: '/treening/treening/avalikud-teemad',
            },
            {
              label: 'Teemade järeltreenimine',
              path: '/treening/treening/teemade-jareltreenimine',
            },
            {
              label: 'Vastused',
              path: '/treening/treening/vastused',
            },
            {
              label: 'Kasutuslood',
              path: '/treening/treening/kasutuslood',
            },
            {
              label: 'Konfiguratsioon',
              path: '/treening/treening/konfiguratsioon',
            },
            {
              label: 'Vormid',
              path: '/treening/treening/vormid',
            },
            {
              label: 'Mälukohad',
              path: '/treening/treening/malukohad',
            },
          ],
        },
        {
          label: 'Ajaloolised vestlused',
          path: '/treening/ajaloolised-vestlused',
          children: [
            {
              label: 'Ajalugu',
              path: '/treening/ajaloolised-vestlused/ajalugu',
            },
            {
              label: 'Pöördumised',
              path: '/treening/ajaloolised-vestlused/poordumised',
            },
          ],
        },
        {
          label: 'Mudelipank ja analüütika',
          path: '/treening/mudelipank-ja-analuutika',
          children: [
            {
              label: 'Teemade ülevaade',
              path: '/treening/mudelipank-ja-analuutika/teemade-ulevaade',
            },
            {
              label: 'Mudelite võrdlus',
              path: '/treening/mudelipank-ja-analuutika/mudelite-vordlus',
            },
            {
              label: 'Testlood',
              path: '/treening/mudelipank-ja-analuutika/testlood',
            },
          ],
        },
        {
          label: 'Treeni uus mudel',
          path: '/treening/treeni-uus-mudel',
        },
      ],
    },
    {
      id: 'analytics',
      label: 'Analüütika',
      path: '/analytics',
      children: [
        {
          label: 'Ülevaade',
          path: '/analytics/overview',
        },
        {
          label: 'Vestlused',
          path: '/analytics/chats',
        },
        {
          label: 'Bürokratt',
          path: '/analytics/burokratt',
        },
        {
          label: 'Tagasiside',
          path: '/analytics/feedbacks',
        },
        {
          label: 'Nõustajad',
          path: '/analytics/advisors',
        },
        {
          label: 'Avaandmed',
          path: '/analytics/reports',
        },
      ],
    },
    {
      id: 'centops',
      label: 'Centops',
      path: ROUTES.OVERVIEW_ROUTE,
      children: [
        { path: ROUTES.INVITATION_ROUTE, label: t('menu.invitation') },
        { path: ROUTES.PARTICIPANTS_REQUESTS_ROUTE, label: t('menu.requests') },
        { path: ROUTES.PARTICIPANTS_ROUTE, label: t('menu.participants') },
        { path: ROUTES.INSTITUTIONS_ROUTE, label: t('menu.institutions') },
        { path: ROUTES.MESSAGES_PAGE_ROUTE, label: t('menu.messages') },
        {
          label: t('menu.manifests'),
          path: ROUTES.MANIFESTS_ROUTE,
          children: [
            {
              label: t('menu.overview'),
              path: ROUTES.MANIFESTS_OVERVIEW_ROUTE,
            },
            {
              label: t('menu.newManifests'),
              path: ROUTES.MANIFESTS_NEW_MANIFESTS_ROUTE,
            },
            {
              label: t('menu.updates'),
              path: ROUTES.MANIFESTS_UPDATES_ROUTE,
            },
            {
              label: t('menu.history'),
              path: ROUTES.MANIFESTS_HISTORY_ROUTE,
            },
          ],
        },
      ],
    },
    {
      id: 'settings',
      label: 'Haldus',
      path: '/haldus',
      children: [],
    },
    {
      id: 'monitoring',
      label: 'Seire',
      path: '/seire',
      children: [],
    },
  ];

  return <SharedMainNavigation icons={menuIcons} items={menuItems} />;
};
