import type { FC } from 'react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const Code: FC<{
  className: string;
  children: string | string[];
}> = ({ className, children }) => {
  const language = (className ?? '').replace('lang-', '');
  return (
    <div className="codeBlock">
      <SyntaxHighlighter
        language={language.toLowerCase()}
        style={materialDark}
        customStyle={{
          fontSize: 14,
          padding: '8px 16px',
        }}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
};
