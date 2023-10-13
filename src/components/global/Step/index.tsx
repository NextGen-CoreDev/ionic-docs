import React from 'react';
import clsx from 'clsx';

import './step.css';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  index: string;
  lines?: string;
  highlighted?: string;
}

export default function Step(props: Props): JSX.Element {
  const stepClasses = clsx({
    step: true,
    highlighted: props.highlighted === 'true',
  });

  return (
    <div className={stepClasses}>
      <p className="step-header">Step {props.index}</p>
      <p className="step-content">{props.children}</p>
    </div>
  );
}
