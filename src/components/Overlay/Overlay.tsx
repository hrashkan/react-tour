import React, { useEffect, useRef, useCallback } from "react";
import { Position } from "../../types";
import "./Overlay.css";

interface OverlayProps {
  targetPosition: Position | null;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export const Overlay: React.FC<OverlayProps> = ({
  targetPosition,
  onClick,
  className = "",
  style,
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  const updateHighlightPosition = useCallback(() => {
    if (!overlayRef.current || !targetPosition) return;

    const highlight = overlayRef.current.querySelector<HTMLElement>(
      ".react-tour-overlay-highlight"
    );

    if (highlight) {
      const viewportTop = targetPosition.top - window.scrollY;
      const viewportLeft = targetPosition.left - window.scrollX;

      highlight.style.top = `${viewportTop}px`;
      highlight.style.left = `${viewportLeft}px`;
      highlight.style.width = `${targetPosition.width}px`;
      highlight.style.height = `${targetPosition.height}px`;
    }
  }, [targetPosition]);

  useEffect(() => {
    if (!overlayRef.current || !targetPosition) return;

    updateHighlightPosition();

    window.addEventListener("scroll", updateHighlightPosition, {
      passive: true,
    });
    window.addEventListener("resize", updateHighlightPosition, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", updateHighlightPosition);
      window.removeEventListener("resize", updateHighlightPosition);
    };
  }, [targetPosition, updateHighlightPosition]);

  if (!targetPosition) return null;

  return (
    <div
      ref={overlayRef}
      className={`react-tour-overlay ${className}`}
      style={style}
      onClick={onClick}
    >
      <div className="react-tour-overlay-highlight" />
    </div>
  );
};
