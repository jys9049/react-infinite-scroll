import React, { useEffect, useRef } from 'react';

const useInfiniteObserverRef = (callback?: () => Promise<void>) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const current = ref.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && callback) {
            callback();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, [callback]);

  return ref;
};

export default useInfiniteObserverRef;
