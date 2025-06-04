import type { FC } from 'react';
import { AiOutlineExclamation } from 'react-icons/ai';
import { Icon } from 'components';

import './ExclamationBadge.scss';

export const ExclamationBadge: FC = () => {
  return (
    <span className="badge__rounded">
      <Icon className="icon" icon={<AiOutlineExclamation />} size="medium" />
    </span>
  );
};
