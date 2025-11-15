import React, { useState, useEffect, useCallback, useRef } from "react";
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
    } else {
      setTargetPosition(null);
    }
  }, []);

  const startTour = useCallback(() => {
    if (steps.length === 0) {
      return;
    }

    if (typeof window === "undefined") {
      return;
    }

    if (
      typeof window.scrollY === "undefined" ||
      typeof window.scrollX === "undefined"
    ) {
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
        scrollToElement(element, 100, currentStep.placement);
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

  const rafIdRef = useRef<number | null>(null);
  const scheduledRef = useRef(false);

  useEffect(() => {
    if (!isRunning || !currentStep) return;

    const scheduleUpdate = () => {
      if (scheduledRef.current) return;
      scheduledRef.current = true;
      rafIdRef.current = window.requestAnimationFrame(() => {
        scheduledRef.current = false;
        updateTargetPosition(currentStep);
      });
    };

    window.addEventListener("resize", scheduleUpdate, { passive: true });
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    document.addEventListener("scroll", scheduleUpdate, {
      passive: true,
      capture: true,
    });

    return () => {
      if (rafIdRef.current != null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      scheduledRef.current = false;
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("scroll", scheduleUpdate);
      document.removeEventListener("scroll", scheduleUpdate, true);
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
