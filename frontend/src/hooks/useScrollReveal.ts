import { useEffect, useRef } from "react";

/**
 * Attach to a container element. When it scrolls into view,
 * it gets the "revealed" class and all children with
 * ".scroll-card" also get "revealed" with staggered delays.
 */
export const useCardReveal = (threshold = 0.08) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("revealed");
          el.querySelectorAll(".scroll-card").forEach((child, i) => {
            setTimeout(() => {
              (child as HTMLElement).classList.add("revealed");
            }, i * 120); // 120ms stagger between each card
          });
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
};

/**
 * Attach to an individual element. When it scrolls into view,
 * it gets the "revealed" class.
 */
export const useSingleReveal = (threshold = 0.1, delay = 0) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.classList.add("revealed");
          }, delay);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, delay]);

  return ref;
};
