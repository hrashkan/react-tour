import React, { useState, useRef } from "react";
import { Tour } from "react-tour";
import type { Step } from "../src/types";
import "react-tour/style.css";

function DynamicTargets() {
  const [runTour, setRunTour] = useState(false);
  const dynamicRef = useRef<HTMLDivElement>(null);

  const steps: Step[] = [
    {
      target: ".static-target",
      content: "This is a static target using a CSS selector.",
    },
    {
      target: () => dynamicRef.current,
      content:
        "This is a dynamic target using a function that returns an element.",
    },
    {
      target: () => dynamicRef.current,
      content: "This target uses a direct element reference (function).",
    },
  ];

  return (
    <div>
      <button onClick={() => setRunTour(true)}>Start Dynamic Tour</button>

      <div className="static-target">Static Target</div>
      <div ref={dynamicRef}>Dynamic Target</div>

      <Tour steps={steps} run={runTour} onComplete={() => setRunTour(false)} />
    </div>
  );
}

export default DynamicTargets;
