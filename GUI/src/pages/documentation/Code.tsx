import type { FC } from 'react';
import {
  PrismLight as SyntaxHighlighter,
  type SyntaxHighlighterProps,
} from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const Code: FC<SyntaxHighlighterProps> = ({
  className = '',
  children,
  ...props
}) => {
  const language = className.replace('lang-', '');
  return (
    <SyntaxHighlighter
      language={language.toLowerCase()}
      style={materialDark}
      customStyle={{
        fontSize: 14,
        padding: '4px 6px',
      }}
      {...props}
    >
      {children}
    </SyntaxHighlighter>
  );
};
