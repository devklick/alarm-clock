import { useEffect, useRef, useState } from "react";
import styles from "./Numbers.module.scss";

function Numbers() {
  const ref = useRef<HTMLDivElement>(null);
  const [{ c, r, fontSize }, setValues] = useState({
    c: { x: 0, y: 0 },
    r: 0,
    fontSize: 0,
  });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const resize = () => {
      const fontSize = element.clientWidth * 0.08;
      const r = element.clientWidth / 2 - fontSize;
      const x = element.clientLeft + r;
      const y = element.clientTop + r;
      setValues({ c: { x, y }, r, fontSize });
    };

    resize();

    const observer = new ResizeObserver(resize);
    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className={styles["numbers__container"]} ref={ref}>
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = i * 30;
        const rad = (angle - 90) * (Math.PI / 180);
        const x = c.x + r * Math.cos(rad);
        const y = c.y + r * Math.sin(rad);
        return (
          <div
            className={styles["number"]}
            style={{
              top: y,
              left: x,
              fontSize,
              width: fontSize * 2,
              height: fontSize * 2,
            }}
          >
            {i === 0 ? 12 : i}
          </div>
        );
      })}
    </div>
  );
}

export default Numbers;
