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

const yamlLinter = linter((view) => {
  const diagnostics = [];

  try {
    parser.load(view.state.doc.toString());
  } catch (e) {
    if (e instanceof parser.YAMLException) {
      const loc = e.mark;
      const from = loc ? loc.position : 0;
      const to = from;
      const severity: Diagnostic['severity'] = 'error';

      diagnostics.push({
        from,
        to,
        message: e.message,
        severity,
      });
    }
  }

  return diagnostics;
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
