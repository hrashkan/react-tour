import React, { useEffect, useRef, useState } from "react";
import { TooltipPosition, Position, TooltipPositionData } from "../types";
import {
  calculateTooltipPosition,
  getArrowPosition,
} from "../utils/positioning.utils";
import "./Tooltip.css";

interface TooltipProps {
  targetPosition: Position | null;
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

    const tooltip = tooltipRef.current;
    const tooltipRect = tooltip.getBoundingClientRect();
    const tooltipWidth = tooltipRect.width;
    const tooltipHeight = tooltipRect.height;

    const pos = calculateTooltipPosition(
      targetPosition,
      tooltipWidth,
      tooltipHeight,
      placement,
      offset
    );

    setPosition(pos);
    setArrowPosition(getArrowPosition(targetPosition, pos, pos.placement));
  }, [targetPosition, placement, offset]);

  if (!targetPosition || !position) return null;

  const arrowClass = `react-tour-tooltip-arrow react-tour-tooltip-arrow-${
    position.placement.split("-")[0]
  }`;

  return (
    <div
      ref={tooltipRef}
      className={`react-tour-tooltip react-tour-tooltip-${
        position.placement.split("-")[0]
      } ${className}`}
      style={{
        position: "absolute",
        top: `${position.top}px`,
        left: `${position.left}px`,
        zIndex: 9999,
        ...style,
      }}
    >
      <div className={arrowClass} style={arrowPosition} />

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

      {showProgress && stepIndex !== undefined && totalSteps !== undefined && (
        <div className="react-tour-tooltip-progress">
          {stepIndex + 1} / {totalSteps}
        </div>
      )}

      <div className="react-tour-tooltip-footer">
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
