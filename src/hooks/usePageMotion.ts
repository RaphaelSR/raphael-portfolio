import { useEffect, useState } from "react";
export function useActiveSection() {
  const [activeSection, setActiveSection] = useState("home");
  useEffect(() => {
    const sections = [
      ...document.querySelectorAll<HTMLElement>("main section[id]"),
    ];
    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          )[0];
        if (current) setActiveSection(current.target.id);
      },
      { rootMargin: "-15% 0px -55% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return activeSection;
}
export function usePageMotion(motion: boolean) {
  useEffect(() => {
    if (!motion) return;
    const animations: Animation[] = [];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          animations.push(
            entry.target.animate(
              [
                { opacity: 1, transform: "translateY(10px)" },
                { opacity: 1, transform: "translateY(0)" },
              ],
              { duration: 480, easing: "cubic-bezier(.2,.7,.2,1)" },
            ),
          );
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12 },
    );
    document
      .querySelectorAll(".section-heading, .about-content, .focus-panel")
      .forEach((el) => observer.observe(el));
    return () => {
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
    };
  }, [motion]);
}
