import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/dashboard',
    children: [
      {
        title: 'Overview',
        link: '/dashboard/overview',
        icon: 'home-outline',
        home: true,
      },
      {
        title: 'news',
        link: '/dashboard/news',
        icon: 'file-text-outline',
        badge: {
          text: 'NEW',
          status: 'success',
        },
      },
    ],
  },
  {
    title: 'FEATURES',
    group: true,
  },
  {
    title: 'Miscellaneous',
    icon: 'shuffle-2-outline',
    children: [
      {
        title: '404',
        link: '/dashboard/miscellaneous/404',
      },
    ],
  },
];
