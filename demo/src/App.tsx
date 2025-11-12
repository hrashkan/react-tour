import { useState } from "react";
import { Tour } from "react-tour";
import type { Step } from "react-tour";
import "react-tour/style.css";
import "./App.css";
import AdvancedUsage from "../../examples/AdvantageUsage";

function App() {
  const [view, setView] = useState<"basic" | "advanced">("basic");
  const [runTour, setRunTour] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [showSkip, setShowSkip] = useState(false);

  const steps: Step[] = [
    {
      target: ".demo-header",
      title: "Welcome to React Tour!",
      content:
        "This is a lightweight, dependency-free React tour library. Click Next to continue.",
      placement: "bottom",
    },
    {
      target: ".demo-button",
      title: "Start Tour Button",
      content:
        "This button starts the tour. You can control the tour programmatically.",
      placement: "right",
    },
    {
      target: ".demo-features",
      title: "Features",
      content:
        "React Tour supports many features like progress indicators, skip buttons, and custom placements.",
      placement: "top",
    },
    {
      target: ".demo-controls",
      title: "Tour Controls",
      content:
        "You can customize the tour behavior with various options like showing progress or skip button.",
      placement: "right",
    },
    {
      target: ".demo-card",
      title: "Customizable",
      content:
        "The tour is fully customizable with custom styles, placements, and content. You can even disable the overlay for specific steps.",
      placement: "bottom",
    },
  ];

  if (view === "advanced") {
    return <AdvancedUsage onBack={() => setView("basic")} />;
  }

  return (
    <div className="app">
      <header className="demo-header">
        <h1>React Tour Demo</h1>
        <p>A lightweight, dependency-free React tour library</p>
        <div style={{ marginTop: "20px" }}>
          <button
            onClick={() => setView("advanced")}
            style={{
              padding: "10px 20px",
              fontSize: "14px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              marginRight: "10px",
            }}
          >
            View Advanced Example
          </button>
        </div>
      </header>

      <div className="demo-container">
        <div className="demo-sidebar">
          <div className="demo-card">
            <h2>Tour Controls</h2>
            <div className="demo-controls">
              <button className="demo-button" onClick={() => setRunTour(true)}>
                Start Tour
              </button>
              <button onClick={() => setRunTour(false)}>Stop Tour</button>
              <label>
                <input
                  type="checkbox"
                  checked={showProgress}
                  onChange={(e) => setShowProgress(e.target.checked)}
                />
                Show Progress
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={showSkip}
                  onChange={(e) => setShowSkip(e.target.checked)}
                />
                Show Skip Button
              </label>
            </div>
          </div>

          <div className="demo-card">
            <h2>Features</h2>
            <ul className="demo-features">
              <li>Zero Dependencies</li>
              <li>Fully Customizable</li>
              <li>TypeScript Support</li>
              <li>Responsive Positioning</li>
              <li>Keyboard Support (ESC)</li>
              <li>Multiple Placements</li>
            </ul>
          </div>
        </div>

        <div className="demo-content">
          <div className="demo-card">
            <h2>Getting Started</h2>
            <p>
              Install the package and start creating guided tours in your
              application.
            </p>
            <pre>
              <code>{`npm install react-tour`}</code>
            </pre>
          </div>

          <div className="demo-card">
            <h2>Basic Usage</h2>
            <pre>
              <code>{`import { Tour } from "react-tour";
import "react-tour/style.css";

const steps = [
  {
    target: ".my-element",
    content: "This is my element",
  },
];

<Tour steps={steps} run={true} />`}</code>
            </pre>
          </div>

          <div className="demo-card">
            <h2>Customization</h2>
            <p>
              You can customize the tour with custom styles, placements, and
              behavior options.
            </p>
          </div>
        </div>
      </div>

      <Tour
        steps={steps}
        run={runTour}
        showProgress={showProgress}
        showSkipButton={showSkip}
        onComplete={() => setRunTour(false)}
        onStop={() => setRunTour(false)}
      />
    </div>
  );
}

export default App;
