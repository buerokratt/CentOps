import { forwardRef } from 'react';
import type { Diagnostic } from '@codemirror/lint';
import { linter, lintGutter } from '@codemirror/lint';
import CodeMirror, { type ReactCodeMirrorRef } from '@uiw/react-codemirror';
import * as yamlMode from '@codemirror/legacy-modes/mode/yaml';
import { StreamLanguage } from '@codemirror/language';
import parser from 'js-yaml';
import { githubLight } from '@uiw/codemirror-theme-github';
import type { ReactCodeMirrorProps } from '@uiw/react-codemirror/src';

const yaml = StreamLanguage.define(yamlMode.yaml);

export const yamlParser = (value: string) => {
  const diagnostics = [];

  try {
    parser.load(value);
  } catch (e) {
    const severity: Diagnostic['severity'] = 'error';
    if (e instanceof parser.YAMLException) {
      const loc = e.mark;
      const from = loc ? loc.position : 0;
      const to = from;

      diagnostics.push({
        from,
        to,
        message: e.message,
        severity,
      });
    } else if (e instanceof Error) {
      diagnostics.push({
        from: 0,
        to: 0,
        message: e.message,
        severity,
      });
    }
  }

  return diagnostics;
};
export const yamlLinter = linter((view) => {
  return yamlParser(view.state.doc.toString());
});

export interface YamlEditorProps extends ReactCodeMirrorProps {
  value?: string;
}

export const YamlEditor = forwardRef<ReactCodeMirrorRef, YamlEditorProps>(
  (props, ref) => {
    return (
      <CodeMirror
        ref={ref}
        theme={githubLight}
        extensions={[yaml, lintGutter(), yamlLinter]}
        {...props}
      />
    );
  }
);
