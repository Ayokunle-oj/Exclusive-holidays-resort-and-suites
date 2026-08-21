import { useEffect, useRef, useState } from "react";
import "./ScrollAnimation.css";

type AnimationVariant =
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "fade";

interface ScrollAnimationProps {
  children: React.ReactNode;
  animation?: AnimationVariant;
  delay?: number; // ms — use for staggered groups
  threshold?: number; // IntersectionObserver threshold, default 0.15
  className?: string; // extra classes merged onto the wrapper
}

function ScrollAnimation({
  children,
  animation = "fade-up",
  delay = 0,
  threshold = 0.15,
  className = "",
}: ScrollAnimationProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => setIsVisible(entry.isIntersecting));
      },
      { threshold },
    );

    observer.observe(node);

    return () => {
      observer.unobserve(node);
      observer.disconnect();
    };
  }, [threshold]);

  const classes = [
    "scroll-anim",
    `scroll-${animation}`,
    isVisible ? "scroll-show" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      ref={ref}
      className={classes}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

export default ScrollAnimation;
