import React, { useState } from "react";
import { Tour } from "react-tour";
import type { Step } from "../src/types";
import "react-tour/style.css";

function CustomStyling() {
  const [runTour, setRunTour] = useState(false);

  const steps: Step[] = [
    {
      target: ".custom-element",
      title: "Custom Styled Tour",
      content: "This tour uses custom styles for a unique look.",
    },
  ];

  return (
    <div>
      <button onClick={() => setRunTour(true)}>Start Custom Tour</button>
      <div className="custom-element">Custom Element</div>

      <Tour
        steps={steps}
        run={runTour}
        onComplete={() => setRunTour(false)}
        styles={{
          tooltip: {
            backgroundColor: "#1a1a1a",
            color: "#fff",
            borderRadius: "12px",
            padding: "20px",
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.8)",
          },
        }}
      />
    </div>
  );
}

export default CustomStyling;
