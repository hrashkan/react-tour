import { ReactNode } from "react";

export type StepTarget = string | HTMLElement | (() => HTMLElement | null);

export type TooltipPosition =
  | "top"
  | "top-start"
  | "top-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "left"
  | "left-start"
  | "left-end"
  | "right"
  | "right-start"
  | "right-end"
  | "center";

export interface Step {
  target: StepTarget;
  content: ReactNode;
  title?: ReactNode;
  placement?: TooltipPosition;
  disableBeacon?: boolean;
  disableOverlay?: boolean;
  offset?: number;
}

export interface TourProps {
  steps: Step[];
  run?: boolean;
  continuous?: boolean;
  showProgress?: boolean;
  showSkipButton?: boolean;
  disableCloseOnEsc?: boolean;
  disableOverlayClose?: boolean;
  onStart?: () => void;
  onStop?: () => void;
  onSkip?: () => void;
  onStepChange?: (stepIndex: number) => void;
  onComplete?: () => void;
  className?: string;
  styles?: {
    tooltip?: React.CSSProperties;
    overlay?: React.CSSProperties;
    button?: React.CSSProperties;
  };
}

export interface Position {
  top: number;
  left: number;
  width: number;
  height: number;
}

export interface TooltipPositionData {
  top: number;
  left: number;
  placement: TooltipPosition;
}
