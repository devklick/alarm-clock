import React, { useRef } from "react";
import { useClick } from "../../../hooks/pointerHooks";
import styles from "./Button.module.scss";
import clsx from "clsx";
import Tooltip from "../../Tooltip";

interface ButtonPropsBase {
  label?: string;
  onClick?(): void;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
}

interface ButtonProps extends ButtonPropsBase {
  type: "primary" | "secondary" | "danger" | "transparent";
  requireHoldFor?: number;
}

function Button({
  type,
  requireHoldFor,
  onClick,
  label,
  disabled,
  children,
  className,
}: ButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  // Use the useClick hook only if a hold is required
  useClick(buttonRef, onClick, { requireHoldFor, disabled: !requireHoldFor });

  return (
    <>
      {label && <Tooltip elementRef={buttonRef} value={label} />}
      <button
        disabled={disabled}
        ref={buttonRef}
        className={clsx(
          styles[`button`],
          styles[`button--${type}`],
          className,
          {
            [styles[`button--hold`]]: !!requireHoldFor,
          }
        )}
        onClick={() => !requireHoldFor && onClick?.()}
      >
        {children}
      </button>
    </>
  );
}

function Primary({
  onClick,
  label,
  children,
  disabled,
  className,
}: ButtonPropsBase) {
  return (
    <Button
      type="primary"
      onClick={onClick}
      label={label}
      children={children}
      disabled={disabled}
      className={className}
    />
  );
}
function Secondary({
  onClick,
  label,
  children,
  disabled,
  className,
}: ButtonPropsBase) {
  return (
    <Button
      type="secondary"
      onClick={onClick}
      label={label}
      children={children}
      disabled={disabled}
      className={className}
    />
  );
}

function Danger({
  onClick,
  label,
  children,
  disabled,
  className,
}: ButtonPropsBase) {
  return (
    <Button
      type="danger"
      onClick={onClick}
      label={label}
      requireHoldFor={1000}
      children={children}
      disabled={disabled}
      className={className}
    />
  );
}

function Transparent({
  onClick,
  label,
  children,
  disabled,
  className,
}: ButtonPropsBase) {
  return (
    <Button
      type="transparent"
      onClick={onClick}
      label={label}
      children={children}
      disabled={disabled}
      className={className}
    />
  );
}

Button.Primary = Primary;
Button.Secondary = Secondary;
Button.Danger = Danger;
Button.Transparent = Transparent;

export default Button;
