import { JSXInternal } from 'preact/src/jsx';
import TargetedEvent = JSXInternal.TargetedEvent;
import TargetedMouseEvent = JSXInternal.TargetedMouseEvent;

import { ComponentChildren, FunctionComponent, Ref } from 'preact';
import { forwardRef } from 'preact/compat';

const baseClass = `rounded px-4 py-1.75 font-bold text-sm fit-content`;

type ButtonType = 'normal' | 'primary' | 'danger';

const buttonClasses: { [type in ButtonType]: string } = {
  normal: `${baseClass} bg-default color-text border-solid border-main border-1 focus:bg-contrast hover:bg-contrast`,
  primary: `${baseClass} no-border bg-info color-info-contrast hover:brightness-130 focus:brightness-130`,
  danger: `${baseClass} bg-default color-danger border-solid border-main border-1 focus:bg-contrast hover:bg-contrast`,
};

const disabledClasses: { [type in ButtonType]: string } = {
  normal: 'color-grey-2',
  primary: 'bg-grey-2 focus:brightness-default hover:brightness-default',
  danger: 'color-grey-2',
};

type ButtonProps = {
  children?: ComponentChildren;
  className?: string;
  type: ButtonType;
  label?: string;
  onClick: (
    event:
      | TargetedEvent<HTMLFormElement>
      | TargetedMouseEvent<HTMLButtonElement>
  ) => void;
  onBlur?: (event: FocusEvent) => void;
  disabled?: boolean;
};

export const Button: FunctionComponent<ButtonProps> = forwardRef(
  (
    {
      type,
      label,
      className = '',
      onBlur,
      onClick,
      disabled = false,
      children,
    }: ButtonProps,
    ref: Ref<HTMLButtonElement>
  ) => {
    const buttonClass = buttonClasses[type];
    const cursorClass = disabled ? 'cursor-not-allowed' : 'cursor-pointer';
    const disabledClass = disabled ? disabledClasses[type] : '';

    return (
      <button
        className={`${buttonClass} ${cursorClass} ${disabledClass} ${className}`}
        onBlur={onBlur}
        onClick={(e) => {
          onClick(e);
          e.preventDefault();
        }}
        disabled={disabled}
        ref={ref}
      >
        {label ?? children}
      </button>
    );
  }
);
