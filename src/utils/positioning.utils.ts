import { TooltipPosition, Position, TooltipPositionData } from "../types";

const GAP = 10;
const ARROW_SIZE = 8;

export function getElementPosition(element: HTMLElement): Position {
  if (typeof window === "undefined") {
    console.error(
      "[React Tour Positioning] Cannot get element position: window object is not available"
    );
    return { top: 0, left: 0, width: 0, height: 0 };
  }

  if (
    typeof window.scrollY === "undefined" ||
    typeof window.scrollX === "undefined"
  ) {
    console.error(
      "[React Tour Positioning] Cannot get element position: window scroll properties are not available",
      {
        hasScrollY: typeof window.scrollY !== "undefined",
        hasScrollX: typeof window.scrollX !== "undefined",
      }
    );
    return { top: 0, left: 0, width: 0, height: 0 };
  }

  const rect = element.getBoundingClientRect();
  return {
    top: rect.top + window.scrollY,
    left: rect.left + window.scrollX,
    width: rect.width,
    height: rect.height,
  };
}

export function calculateTooltipPosition(
  targetPosition: Position,
  tooltipWidth: number,
  tooltipHeight: number,
  placement: TooltipPosition,
  offset: number = 0
): TooltipPositionData {
  if (typeof window === "undefined") {
    console.error(
      "[React Tour Positioning] Cannot calculate position: window object is not available"
    );
    return { top: 0, left: 0, placement };
  }

  if (
    typeof window.innerWidth === "undefined" ||
    typeof window.innerHeight === "undefined"
  ) {
    console.error(
      "[React Tour Positioning] Cannot calculate position: window dimensions are not available",
      {
        hasInnerWidth: typeof window.innerWidth !== "undefined",
        hasInnerHeight: typeof window.innerHeight !== "undefined",
      }
    );
    return { top: 0, left: 0, placement };
  }

  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  const centerX = targetPosition.left + targetPosition.width / 2;
  const centerY = targetPosition.top + targetPosition.height / 2;

  let top = 0;
  let left = 0;
  let finalPlacement = placement;

  switch (placement) {
    case "top":
      top = targetPosition.top - tooltipHeight - GAP - offset;
      left = centerX - tooltipWidth / 2;
      break;
    case "top-start":
      top = targetPosition.top - tooltipHeight - GAP - offset;
      left = targetPosition.left;
      break;
    case "top-end":
      top = targetPosition.top - tooltipHeight - GAP - offset;
      left = targetPosition.left + targetPosition.width - tooltipWidth;
      break;
    case "bottom":
      top = targetPosition.top + targetPosition.height + GAP + offset;
      left = centerX - tooltipWidth / 2;
      break;
    case "bottom-start":
      top = targetPosition.top + targetPosition.height + GAP + offset;
      left = targetPosition.left;
      break;
    case "bottom-end":
      top = targetPosition.top + targetPosition.height + GAP + offset;
      left = targetPosition.left + targetPosition.width - tooltipWidth;
      break;
    case "left":
      top = centerY - tooltipHeight / 2;
      left = targetPosition.left - tooltipWidth - GAP - offset;
      break;
    case "left-start":
      top = targetPosition.top;
      left = targetPosition.left - tooltipWidth - GAP - offset;
      break;
    case "left-end":
      top = targetPosition.top + targetPosition.height - tooltipHeight;
      left = targetPosition.left - tooltipWidth - GAP - offset;
      break;
    case "right":
      top = centerY - tooltipHeight / 2;
      left = targetPosition.left + targetPosition.width + GAP + offset;
      break;
    case "right-start":
      top = targetPosition.top;
      left = targetPosition.left + targetPosition.width + GAP + offset;
      break;
    case "right-end":
      top = targetPosition.top + targetPosition.height - tooltipHeight;
      left = targetPosition.left + targetPosition.width + GAP + offset;
      break;
    case "center":
      top = centerY - tooltipHeight / 2;
      left = centerX - tooltipWidth / 2;
      break;
  }

  const padding = 10;
  const initialTop = top;
  const initialLeft = left;

  if (left < padding) {
    left = padding;
  } else if (left + tooltipWidth > viewportWidth - padding) {
    left = viewportWidth - tooltipWidth - padding;
  }

  if (top < padding) {
    if (placement.startsWith("top")) {
      const newPlacement = placement.replace("top", "bottom");
      if (
        newPlacement === "bottom" ||
        newPlacement === "bottom-start" ||
        newPlacement === "bottom-end"
      ) {
        finalPlacement = newPlacement;
      }
      top = targetPosition.top + targetPosition.height + GAP + offset;
    } else if (placement.startsWith("left") || placement.startsWith("right")) {
      const maxTop = viewportHeight - tooltipHeight - padding;
      const minTop = padding;
      const idealTop = centerY - tooltipHeight / 2;
      top = Math.max(minTop, Math.min(maxTop, idealTop));
    } else {
      top = padding;
    }
  } else if (top + tooltipHeight > viewportHeight - padding) {
    if (placement.startsWith("bottom")) {
      const newPlacement = placement.replace("bottom", "top");
      if (
        newPlacement === "top" ||
        newPlacement === "top-start" ||
        newPlacement === "top-end"
      ) {
        finalPlacement = newPlacement;
      }
      top = targetPosition.top - tooltipHeight - GAP - offset;
    } else if (placement.startsWith("left") || placement.startsWith("right")) {
      const maxTop = viewportHeight - tooltipHeight - padding;
      const minTop = padding;
      const idealTop = centerY - tooltipHeight / 2;
      top = Math.max(minTop, Math.min(maxTop, idealTop));
    } else {
      top = viewportHeight - tooltipHeight - padding;
    }
  }

  return { top, left, placement: finalPlacement };
}

export function getArrowPosition(
  targetPosition: Position,
  tooltipPosition: TooltipPositionData,
  placement: TooltipPosition
): { top?: number; left?: number; right?: number; bottom?: number } {
  const centerX = targetPosition.left + targetPosition.width / 2;
  const centerY = targetPosition.top + targetPosition.height / 2;

  switch (placement) {
    case "top":
    case "top-start":
    case "top-end":
      return {
        bottom: -ARROW_SIZE,
        left: centerX - tooltipPosition.left - ARROW_SIZE,
      };
    case "bottom":
    case "bottom-start":
    case "bottom-end":
      return {
        top: -ARROW_SIZE,
        left: centerX - tooltipPosition.left - ARROW_SIZE,
      };
    case "left":
    case "left-start":
    case "left-end":
      return {
        right: -ARROW_SIZE,
        top: centerY - tooltipPosition.top - ARROW_SIZE,
      };
    case "right":
    case "right-start":
    case "right-end":
      return {
        left: -ARROW_SIZE,
        top: centerY - tooltipPosition.top - ARROW_SIZE,
      };
    default:
      return {};
  }
}
