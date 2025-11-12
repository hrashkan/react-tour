import React, { useState } from "react";
import { Tour } from "react-tour";
import type { Step } from "../src/types";
import "react-tour/style.css";

function BasicUsage() {
  const [runTour, setRunTour] = useState(false);

  const steps: Step[] = [
    {
      target: ".step-1",
      content: "This is the first step of the tour.",
    },
    {
      target: ".step-2",
      content: "This is the second step.",
    },
    {
      target: ".step-3",
      content: "This is the third and final step.",
    },
  ];

  return (
    <div>
      <button onClick={() => setRunTour(true)}>Start Tour</button>

      <div className="step-1">Step 1 Target</div>
      <div className="step-2">Step 2 Target</div>
      <div className="step-3">Step 3 Target</div>

      <Tour steps={steps} run={runTour} onComplete={() => setRunTour(false)} />
    </div>
  );
}

export default BasicUsage;
