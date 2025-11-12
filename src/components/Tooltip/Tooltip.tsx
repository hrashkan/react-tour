import React, { useEffect, useRef, useState } from "react";
import {
  TooltipPosition,
  Position,
  TooltipPositionData,
  StepTarget,
} from "../../types";
import {
  calculateTooltipPosition,
  getArrowPosition,
} from "../../utils/positioning.utils";
import { getTargetElement } from "../../utils/dom.utils";
import "./Tooltip.css";

interface TooltipProps {
  targetPosition: Position | null;
  target?: StepTarget;
  title?: React.ReactNode;
  content: React.ReactNode;
  placement: TooltipPosition;
  offset?: number;
  onClose?: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  onSkip?: () => void;
  showPrevious?: boolean;
  showNext?: boolean;
  showSkip?: boolean;
  isFirst?: boolean;
  isLast?: boolean;
  stepIndex?: number;
  totalSteps?: number;
  showProgress?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const Tooltip: React.FC<TooltipProps> = ({
  targetPosition,
  target,
  title,
  content,
  placement,
  offset = 0,
  onClose,
  onNext,
  onPrevious,
  onSkip,
  showPrevious = true,
  showNext = true,
  showSkip = false,
  isFirst = false,
  isLast = false,
  stepIndex,
  totalSteps,
  showProgress = false,
  className = "",
  style,
}) => {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<TooltipPositionData | null>(null);
  const [arrowPosition, setArrowPosition] = useState<{
    top?: number;
    left?: number;
    right?: number;
    bottom?: number;
  }>({});

  useEffect(() => {
    if (!tooltipRef.current || !targetPosition) return;

    if (typeof window === "undefined") {
      console.error(
        "[React Tour Tooltip] Cannot calculate position: window object is not available"
      );
      return;
    }

    if (
      typeof window.scrollY === "undefined" ||
      typeof window.scrollX === "undefined"
    ) {
      console.error(
        "[React Tour Tooltip] Cannot calculate position: window scroll properties are not available",
        {
          hasScrollY: typeof window.scrollY !== "undefined",
          hasScrollX: typeof window.scrollX !== "undefined",
        }
      );
      return;
    }

    const updatePosition = () => {
      const tooltip = tooltipRef.current;
      if (!tooltip) return;

      const tooltipRect = tooltip.getBoundingClientRect();
      const tooltipWidth = tooltipRect.width;
      const tooltipHeight = tooltipRect.height;

      if (tooltipWidth === 0 || tooltipHeight === 0) {
        requestAnimationFrame(updatePosition);
        return;
      }

      requestAnimationFrame(() => {
        if (typeof window === "undefined") {
          console.error(
            "[React Tour Tooltip] Window not available during position calculation"
          );
          return;
        }

        let viewportTargetPosition: Position;

        if (target) {
          const element = getTargetElement(target);
          if (element) {
            const rect = element.getBoundingClientRect();
            viewportTargetPosition = {
              top: rect.top,
              left: rect.left,
              width: rect.width,
              height: rect.height,
            };
          } else {
            const scrollY = window.scrollY || 0;
            const scrollX = window.scrollX || 0;
            viewportTargetPosition = {
              top: targetPosition.top - scrollY,
              left: targetPosition.left - scrollX,
              width: targetPosition.width,
              height: targetPosition.height,
            };
          }
        } else {
          const scrollY = window.scrollY || 0;
          const scrollX = window.scrollX || 0;
          viewportTargetPosition = {
            top: targetPosition.top - scrollY,
            left: targetPosition.left - scrollX,
            width: targetPosition.width,
            height: targetPosition.height,
          };
        }

        const pos = calculateTooltipPosition(
          viewportTargetPosition,
          tooltipWidth,
          tooltipHeight,
          placement,
          offset
        );

        setPosition(pos);
        setArrowPosition(
          getArrowPosition(viewportTargetPosition, pos, pos.placement)
        );
      });
    };

    requestAnimationFrame(updatePosition);

    let scrollTimeout: ReturnType<typeof setTimeout> | null = null;
    const handleScroll = () => {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      scrollTimeout = setTimeout(() => {
        requestAnimationFrame(updatePosition);
      }, 16);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [targetPosition, target, placement, offset]);

  if (!targetPosition) return null;

  if (typeof window === "undefined") {
    console.error(
      "[React Tour Tooltip] Cannot render: window object is not available"
    );
    return null;
  }

  if (
    typeof window.scrollY === "undefined" ||
    typeof window.scrollX === "undefined"
  ) {
    console.error(
      "[React Tour Tooltip] Cannot render: window scroll properties are not available",
      {
        hasScrollY: typeof window.scrollY !== "undefined",
        hasScrollX: typeof window.scrollX !== "undefined",
      }
    );
    return null;
  }

  let viewportTarget: Position;

  if (target) {
    const element = getTargetElement(target);
    if (element) {
      const rect = element.getBoundingClientRect();
      viewportTarget = {
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      };
    } else {
      const scrollY = window.scrollY || 0;
      const scrollX = window.scrollX || 0;
      viewportTarget = {
        top: targetPosition.top - scrollY,
        left: targetPosition.left - scrollX,
        width: targetPosition.width,
        height: targetPosition.height,
      };
    }
  } else {
    const scrollY = window.scrollY || 0;
    const scrollX = window.scrollX || 0;
    viewportTarget = {
      top: targetPosition.top - scrollY,
      left: targetPosition.left - scrollX,
      width: targetPosition.width,
      height: targetPosition.height,
    };
  }

  const defaultPosition: TooltipPositionData = position || {
    top: viewportTarget.top + viewportTarget.height + 10,
    left: viewportTarget.left,
    placement: placement,
  };

  const arrowClass = `react-tour-tooltip-arrow react-tour-tooltip-arrow-${
    defaultPosition.placement.split("-")[0]
  }`;

  return (
    <div
      ref={tooltipRef}
      className={`react-tour-tooltip react-tour-tooltip-${
        defaultPosition.placement.split("-")[0]
      } ${className}`}
      style={{
        position: "fixed",
        top: `${(position || defaultPosition).top}px`,
        left: `${(position || defaultPosition).left}px`,
        zIndex: 9999,
        visibility: position ? "visible" : "hidden",
        ...style,
      }}
    >
      {position && <div className={arrowClass} style={arrowPosition} />}

      {onClose && (
        <button
          className="react-tour-tooltip-close"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
      )}

      {title && <div className="react-tour-tooltip-title">{title}</div>}

      <div className="react-tour-tooltip-content">{content}</div>

      <div className="react-tour-tooltip-footer">
        {showProgress &&
          stepIndex !== undefined &&
          totalSteps !== undefined && (
            <div className="react-tour-tooltip-progress">
              {stepIndex + 1} / {totalSteps}
            </div>
          )}
        {showSkip && onSkip && (
          <button
            className="react-tour-tooltip-button react-tour-tooltip-button-skip"
            onClick={onSkip}
          >
            Skip
          </button>
        )}
        <div className="react-tour-tooltip-buttons">
          {showPrevious && !isFirst && onPrevious && (
            <button
              className="react-tour-tooltip-button react-tour-tooltip-button-previous"
              onClick={onPrevious}
            >
              Previous
            </button>
          )}
          {showNext && onNext && (
            <button
              className="react-tour-tooltip-button react-tour-tooltip-button-next"
              onClick={onNext}
            >
              {isLast ? "Finish" : "Next"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
