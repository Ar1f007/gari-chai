"use client";

import "keen-slider/keen-slider.min.css";
import "@/styles/slider.css";

import { Slide } from "./slide";
import { Tab } from "@/types";
import { useSlider } from "@/hooks/useSlider";

type Items = {
  content: Tab["content"];
};

export const Slider = ({ content }: Items) => {
  const { sliderRef, loaded, instanceRef, currentSlide } = useSlider();

  return (
    <div className="navigation-wrapper">
      <div
        ref={sliderRef}
        className="keen-slider min-h-[375px]"
      >
        {content.map((item) => (
          <Slide
            {...item}
            key={item.id}
          />
        ))}
      </div>

      {loaded && instanceRef.current && (
        <>
          <Arrow
            left
            onClick={(e: any) =>
              e.stopPropagation() || instanceRef.current?.prev()
            }
            disabled={currentSlide === 0}
          />

          <Arrow
            onClick={(e: any) =>
              e.stopPropagation() || instanceRef.current?.next()
            }
            disabled={
              currentSlide ===
              instanceRef.current.track.details.slides.length - 1
            }
          />
        </>
      )}
    </div>
  );
};

function Arrow(props: {
  disabled: boolean;
  left?: boolean;
  onClick: (e: any) => void;
}) {
  const disabled = props.disabled ? " arrow--disabled" : "";
  return (
    <svg
      onClick={props.onClick}
      className={`arrow ${
        props.left ? "arrow--left" : "arrow--right"
      } ${disabled}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {props.left && (
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      )}
      {!props.left && (
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
      )}
    </svg>
  );
}
