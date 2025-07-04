import {
  MdOutlineAdb,
  MdOutlineEqualizer,
  MdOutlineForum,
} from 'react-icons/md';

export const menuData = [
  {
    id: 'clients',
    icon: <MdOutlineForum className="menu-item-icon" />,
    url: '/clients',
  },
  {
    id: 'users',
    icon: <MdOutlineAdb className="menu-item-icon" />,
    url: '/users',
  },
  {
    id: 'clusters',
    icon: <MdOutlineEqualizer className="menu-item-icon" />,
    url: '/clusters',
  },
  {
    id: 'audit',
    icon: <MdOutlineForum className="menu-item-icon" />,
    url: '/audit',
  },
  {
    id: 'documentation',
    icon: <MdOutlineForum className="menu-item-icon" />,
    url: '/documentation',
  },
];
