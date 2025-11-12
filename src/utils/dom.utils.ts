import { StepTarget } from "../types";

export function getTargetElement(target: StepTarget): HTMLElement | null {
  if (typeof target === "string") {
    const element = document.querySelector<HTMLElement>(target);
    return element;
  } else if (target instanceof HTMLElement) {
    return target;
  } else if (typeof target === "function") {
    const element = target();
    return element instanceof HTMLElement ? element : null;
  }
  return null;
}

export function scrollToElement(
  element: HTMLElement,
  offset: number = 0,
  placement?: string
): void {
  const rect = element.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const viewportWidth = window.innerWidth;

  const padding = 50;
  const tooltipWidth = 400;
  const tooltipHeight = 200;
  const gap = 10;

  let needsScroll = false;
  let scrollTop = window.scrollY;
  let scrollLeft = window.scrollX;

  if (placement?.startsWith("left")) {
    const spaceNeeded = tooltipWidth + gap + padding;
    if (rect.left < spaceNeeded) {
      needsScroll = true;
      const targetLeft = rect.left + window.scrollX;
      scrollLeft = Math.max(0, targetLeft - spaceNeeded);
    }

    const centerY = rect.top + rect.height / 2;
    const idealTop = centerY - viewportHeight / 2 + window.scrollY;
    if (Math.abs(scrollTop - idealTop) > 50) {
      needsScroll = true;
      scrollTop = idealTop;
    }
  } else if (placement?.startsWith("right")) {
    const spaceNeeded = tooltipWidth + gap + padding;
    if (rect.right > viewportWidth - spaceNeeded) {
      needsScroll = true;
      const targetRight = rect.right + window.scrollX;
      scrollLeft = Math.max(0, targetRight - viewportWidth + spaceNeeded);
    }

    const centerY = rect.top + rect.height / 2;
    const idealTop = centerY - viewportHeight / 2 + window.scrollY;
    if (Math.abs(scrollTop - idealTop) > 50) {
      needsScroll = true;
      scrollTop = idealTop;
    }
  } else {
    const isVerticallyVisible =
      rect.top >= -padding && rect.bottom <= viewportHeight + padding;

    if (!isVerticallyVisible) {
      needsScroll = true;
      const elementPosition = rect.top + window.pageYOffset;
      scrollTop = elementPosition - offset;
    }
  }

  if (needsScroll) {
    window.scrollTo({
      top: scrollTop,
      left: scrollLeft,
      behavior: "smooth",
    });
  }
}
