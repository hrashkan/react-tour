import React, { useState, useEffect, useCallback } from "react";
import { TourProps, Step, Position } from "../../types";
import { getTargetElement, scrollToElement } from "../../utils/dom.utils";
import { getElementPosition } from "../../utils/positioning.utils";
import { Overlay } from "../Overlay/Overlay";
import { Tooltip } from "../Tooltip/Tooltip";
import "../Overlay/Overlay.css";
import "../Tooltip/Tooltip.css";

export function Tour(props: TourProps): JSX.Element | null {
  const {
    steps,
    run = true,
    continuous = true,
    showProgress = false,
    showSkipButton = false,
    disableCloseOnEsc = false,
    disableOverlayClose = false,
    onStart,
    onStop,
    onSkip,
    onStepChange,
    onComplete,
    className = "",
    styles,
  } = props;
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(-1);
  const [targetPosition, setTargetPosition] = useState<Position | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const currentStep: Step | undefined = steps[currentStepIndex];

  const updateTargetPosition = useCallback((step: Step) => {
    if (typeof window === "undefined") {
      console.error(
        "[React Tour] Cannot update target position: window object is not available"
      );
      setTargetPosition(null);
      return;
    }

    const element = getTargetElement(step.target);
    if (element) {
      const position = getElementPosition(element);

      if (
        typeof position.top !== "number" ||
        typeof position.left !== "number"
      ) {
        console.error("[React Tour] Invalid position calculated", {
          position,
          element,
        });
        setTargetPosition(null);
        return;
      }

      setTargetPosition((prev) => {
        if (
          prev &&
          prev.top === position.top &&
          prev.left === position.left &&
          prev.width === position.width &&
          prev.height === position.height
        ) {
          return prev;
        }
        return position;
      });

      scrollToElement(element, 100, step.placement);
    } else {
      console.warn("[React Tour] Target element not found", {
        target: step.target,
      });
      setTargetPosition(null);
    }
  }, []);

  const startTour = useCallback(() => {
    if (steps.length === 0) {
      console.warn("[React Tour] Cannot start tour: no steps provided");
      return;
    }

    if (typeof window === "undefined") {
      console.error(
        "[React Tour] Cannot start tour: window object is not available"
      );
      return;
    }

    if (
      typeof window.scrollY === "undefined" ||
      typeof window.scrollX === "undefined"
    ) {
      console.error(
        "[React Tour] Cannot start tour: window scroll properties are not available",
        {
          hasScrollY: typeof window.scrollY !== "undefined",
          hasScrollX: typeof window.scrollX !== "undefined",
        }
      );
      return;
    }

    setIsRunning(true);
    setCurrentStepIndex(0);
    onStart?.();
  }, [steps.length, onStart, steps]);

  const stopTour = useCallback(() => {
    setIsRunning(false);
    setCurrentStepIndex(-1);
    setTargetPosition(null);
    onStop?.();
  }, [onStop]);

  const nextStep = useCallback(() => {
    if (currentStepIndex < steps.length - 1) {
      const nextIndex = currentStepIndex + 1;
      setCurrentStepIndex(nextIndex);
      onStepChange?.(nextIndex);
    } else {
      stopTour();
      onComplete?.();
    }
  }, [currentStepIndex, steps.length, onStepChange, onComplete, stopTour]);

  const previousStep = useCallback(() => {
    if (currentStepIndex > 0) {
      const prevIndex = currentStepIndex - 1;
      setCurrentStepIndex(prevIndex);
      onStepChange?.(prevIndex);
    }
  }, [currentStepIndex, onStepChange]);

  const skipTour = useCallback(() => {
    stopTour();
    onSkip?.();
  }, [stopTour, onSkip]);

  useEffect(() => {
    if (!isRunning || disableCloseOnEsc) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        stopTour();
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isRunning, disableCloseOnEsc, stopTour]);

  useEffect(() => {
    if (!currentStep) return;

    let retryCount = 0;
    const maxRetries = 10;
    let retryTimer: ReturnType<typeof setTimeout> | null = null;

    const findTarget = () => {
      const element = getTargetElement(currentStep.target);
      if (element) {
        updateTargetPosition(currentStep);
      } else if (retryCount < maxRetries) {
        retryCount++;
        retryTimer = setTimeout(findTarget, 100);
      }
    };

    const timer = setTimeout(findTarget, 100);

    return () => {
      clearTimeout(timer);
      if (retryTimer) {
        clearTimeout(retryTimer);
      }
    };
  }, [currentStep, updateTargetPosition]);

  useEffect(() => {
    if (!isRunning || !currentStep) return;

    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let lastUpdateTime = 0;
    const DEBOUNCE_MS = 100;
    const MIN_UPDATE_INTERVAL = 200;

    const updatePosition = () => {
      const now = Date.now();
      if (now - lastUpdateTime < MIN_UPDATE_INTERVAL) {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
          lastUpdateTime = Date.now();
          updateTargetPosition(currentStep);
        }, DEBOUNCE_MS);
        return;
      }

      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        lastUpdateTime = Date.now();
        updateTargetPosition(currentStep);
      }, DEBOUNCE_MS);
    };

    window.addEventListener("resize", updatePosition, { passive: true });
    window.addEventListener("scroll", updatePosition, {
      passive: true,
      capture: true,
    });

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [isRunning, currentStep, updateTargetPosition]);

  useEffect(() => {
    if (run && !isRunning) {
      startTour();
    } else if (!run && isRunning) {
      stopTour();
    }
  }, [run, isRunning, startTour, stopTour]);

  if (!isRunning || !currentStep || currentStepIndex === -1) {
    return null;
  }

  const isFirst = currentStepIndex === 0;
  const isLast = currentStepIndex === steps.length - 1;

  if (!targetPosition) {
    return null;
  }

  return (
    <>
      {!currentStep.disableOverlay && (
        <Overlay
          targetPosition={targetPosition}
          onClick={disableOverlayClose ? undefined : stopTour}
          style={styles?.overlay}
        />
      )}
      <Tooltip
        targetPosition={targetPosition}
        target={currentStep.target}
        title={currentStep.title}
        content={currentStep.content}
        placement={currentStep.placement || "bottom"}
        offset={currentStep.offset}
        onClose={stopTour}
        onNext={nextStep}
        onPrevious={previousStep}
        onSkip={showSkipButton ? skipTour : undefined}
        showPrevious={continuous}
        showNext={true}
        showSkip={showSkipButton}
        isFirst={isFirst}
        isLast={isLast}
        stepIndex={currentStepIndex}
        totalSteps={steps.length}
        showProgress={showProgress}
        className={className}
        style={styles?.tooltip}
      />
    </>
  );
}
