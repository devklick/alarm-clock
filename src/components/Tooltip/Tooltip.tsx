import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

import styles from "./Tooltip.module.scss";

interface TooltipProps {
  elementRef: React.RefObject<HTMLElement>;
  value: string;
  delay?: number; // Hover delay in ms
}

function Tooltip({ elementRef, value, delay = 500 }: TooltipProps) {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [visible, setVisible] = useState(false);
  const tooltipRef = useRef<HTMLLabelElement>(null);
  const timeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;

    const updatePosition = () => {
      if (!tooltipRef.current || !elementRef.current) return;

      const elementRect = element.getBoundingClientRect();
      const tooltipWidth = tooltipRef.current.offsetWidth;

      // Find the closest positioned ancestor
      const container = tooltipRef.current.offsetParent as HTMLElement | null;
      const containerRect = container?.getBoundingClientRect() || {
        top: 0,
        left: 0,
      };

      setPosition({
        top:
          elementRect.bottom -
          containerRect.top + // Adjust relative to container
          8, // Add spacing
        left:
          elementRect.left -
          containerRect.left + // Adjust relative to container
          (elementRect.width - tooltipWidth) / 2,
      });
    };

    const show = () => {
      timeout.current = setTimeout(() => setVisible(true), delay);
    };

    const hide = () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
        timeout.current = null;
      }
      setVisible(false);
    };

    element.addEventListener("mouseenter", show);
    element.addEventListener("mouseleave", hide);

    updatePosition(); // Update on mount
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition);

    return () => {
      element.removeEventListener("mouseenter", show);
      element.removeEventListener("mouseleave", hide);
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition);
    };
  }, [elementRef, delay]);

  return (
    <label
      ref={tooltipRef}
      className={clsx(styles.tooltip, {
        [styles["tooltip--visible"]]: visible,
      })}
      style={{ top: position.top, left: position.left }}
      role="tooltip"
    >
      {value}
    </label>
  );
}

export default Tooltip;
