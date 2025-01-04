import clsx from "clsx";
import style from "./Modal.module.scss";
import React, { useCallback, useEffect } from "react";
import { IconXboxX } from "@tabler/icons-react";

interface ModalProps {
  size?: "full" | "small";
  type?: "opaque" | "solid";
  children?: React.ReactNode;
  className?: string;
  onEscKey?(): void;
  onCloseButtonClicked?(): void;
}

function Modal({
  size = "small",
  type = "solid",
  children,
  className,
  onEscKey,
  onCloseButtonClicked,
}: ModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      switch (e.code) {
        case "Escape":
          onEscKey?.();
      }
    },
    [onEscKey]
  );

  useEffect(() => {
    if (onEscKey) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      if (onEscKey) {
        document.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, [handleKeyDown, onEscKey]);

  return (
    <div className={clsx(style["blocker"])}>
      <div
        className={clsx(
          style["modal"],
          style[`modal--${size}`],
          style[`modal--${type}`]
        )}
      >
        {onCloseButtonClicked && (
          <IconXboxX
            className={style["close-button"]}
            onClick={onCloseButtonClicked}
          />
        )}
        <div className={clsx(style["modal__content"], className)}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
