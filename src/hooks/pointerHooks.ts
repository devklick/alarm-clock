import React, { useEffect, useRef } from "react";
import logging from "../utils/logging";

type MouseButton = "left" | "right";
const mouseButtonMap: Record<number, MouseButton> = {
  0: "left",
  2: "right",
};

export function useClick<E extends HTMLElement>(
  elementRef: React.RefObject<E>,
  onClick: (() => void) | undefined,
  {
    requireHoldFor = 0,
    buttons = ["left"],
    disabled = false,
  }: {
    requireHoldFor?: number;
    buttons?: Array<MouseButton>;
    disabled?: boolean;
  }
) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    if (!elementRef.current) return;
    const holdRequired = requireHoldFor > 0;

    function handleDown(e: MouseEvent) {
      if (disabled) return;
      logging.log("info", "down", e.button);
      if (!buttons.includes(mouseButtonMap[e.button])) {
        return;
      }
      if (!holdRequired) {
        return onClick?.();
      }

      timeoutRef.current = setTimeout(() => {
        onClick?.();
      }, requireHoldFor);
    }

    function handleUp(e: MouseEvent) {
      if (disabled) return;
      logging.log("info", "up", e.button);
      if (!buttons.includes(mouseButtonMap[e.button])) {
        return;
      }
      if (!holdRequired || !timeoutRef) {
        return;
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      e.stopImmediatePropagation();
    }

    const element = elementRef.current;
    const timeout = timeoutRef.current;

    if (!disabled) {
      element.addEventListener("mousedown", handleDown);
      document.addEventListener("mouseup", handleUp);
    }

    return () => {
      if (!disabled) {
        element.removeEventListener("mousedown", handleDown);
        document.removeEventListener("mouseup", handleUp);
      }

      if (timeout) clearTimeout(timeout);
    };
  }, [buttons, disabled, elementRef, onClick, requireHoldFor]);
}
