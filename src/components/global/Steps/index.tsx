import React, { useEffect, useState } from 'react';

import { UsageTarget } from './steps.types';

import './steps.css';

type MdxContent = () => {};

/**
 * The advanced configuration of options when creating a
 * sample app with multiple files for a single usage target
 */
interface UsageTargetOptions {
  /**
   * The list of the file names to use in the StackBlitz example
   * and their associated MDX content.
   *
   * ```ts
   * files: {
   *   'src/app/app.component.html': app_component_html,
   *   'src/app/app.component.ts': app_component_ts,
   * }
   * ```
   */
  files: {
    [key: string]: MdxContent;
  };
}

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  code: { [key in UsageTarget]?: MdxContent | UsageTargetOptions };
}

/**
 * @param code The code snippet to display alongside the steps.
 */
export default function Steps(props: Props): JSX.Element {
  const { code, children } = props;

  if (!props.code || Object.keys(code).length === 0) {
    console.warn('No code usage examples provided for this Sample app.');
    return;
  }

  useEffect(() => {
    const codeSnippets = {};
    Object.keys(code).forEach((key) => {
      if (typeof code[key] === 'function') {
        /**
         * Instantiates the React component from the MDX content for
         * single-file playground examples.
         */
        codeSnippets[key] = code[key]({});
      } else if (typeof code[key] === 'object') {
        /**
         * Instantiates the list of React components from the MDX content for
         * multi-file playground examples.
         */
        const fileSnippets = {};
        for (const fileName of Object.keys(code[key].files)) {
          fileSnippets[`${fileName}`] = code[key].files[fileName]({});
        }
        codeSnippets[key] = fileSnippets;
      }
    });
    setCodeSnippets(codeSnippets);
  }, []);

  const getDefaultUsageTarget = () => {
    // If defined, Angular target should be the default
    if (code[UsageTarget.Angular] !== undefined) {
      return UsageTarget.Angular;
    }

    // Otherwise, default to the first target passed.
    return Object.keys(code)[0];
  };

  const [usageTarget, setUsageTarget] = useState(getDefaultUsageTarget());
  const [codeSnippets, setCodeSnippets] = useState({});

  const hasUsageTargetOptions = (code[usageTarget] as UsageTargetOptions)?.files !== undefined;

  function getCodeSnippetId(usageTarget: string, fileName: string) {
    let fileNameId = fileName;
    // replace all non-alphanumeric characters with underscores
    fileNameId = fileNameId.replace(/[^a-zA-Z0-9]/g, '_');
    return `playground_${usageTarget}_${fileNameId}`;
  }

  function renderCode() {
    if (code[usageTarget]) {
      if (!hasUsageTargetOptions) {
        return codeSnippets[usageTarget];
      }
      if (codeSnippets[usageTarget] == null) {
        return null;
      }
      return (
        <div>
          {Object.keys(codeSnippets[usageTarget]).map((fileName) => (
            <div id={getCodeSnippetId(usageTarget, fileName)}>{codeSnippets[usageTarget][fileName]}</div>
          ))}
        </div>
      );
    }
  }

  return (
    <div className="steps">
      <div className="steps-container">{children}</div>
      <div className="code-container">{renderCode()}</div>
    </div>
  );
}
