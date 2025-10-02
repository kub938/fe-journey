"use client";

import { useEffect, useRef, useState } from "react";

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useInView(options: UseInViewOptions = {}) {
  const { threshold = 0.1, rootMargin = "0px", triggerOnce = false } = options;

  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    //기본 형태 :
    // const observer_basic = new IntersectionObserver(callback, options);

    //options 상세 설명
    // const options = {
    //   root: null, // 어느 영역과 비교할 것인가
    //   rootMargin: "0px", // 감지 영역 조정
    //   threshold: 0.5, // 얼마나 보여야 감지할 것인가
    // };

    const observer = new IntersectionObserver(
      (entries) => {
        //entries = 관찰 중인 요소들의 배열

        entries.forEach((entry) => {
          // entry 객체의 주요 속성
          // target: Element; // 관찰 중인 요소
          // isIntersecting: boolean; // 교차 중인가? (가장 많이 사용!)
          // intersectionRatio: number; // 0~1, 얼마나 보이는가
          // intersectionRect: DOMRect; // 보이는 영역의 크기/위치
          // boundingClientRect: DOMRect; // 요소의 크기/위치
          // rootBounds: DOMRect | null; // 루트(화면)의 크기/위치
          // time: number; // 교차가 발생한 시간
          console.log("요소 : ", entry.target);
          console.log("보이나요 ? ", entry.isIntersecting);
          console.log("얼마나 보이나요ㅛ?", entry.intersectionRatio);
          console.log("요소의 위치: ", entry.boundingClientRect);
          console.log("화면 크기:", entry.rootBounds);

          if (entry.isIntersecting) {
            setIsInView(true);

            if (triggerOnce) {
              observer.unobserve(element);
            }
          } else if (!triggerOnce) {
            setIsInView(false);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isInView };
}
