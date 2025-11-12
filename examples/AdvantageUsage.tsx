import { useState, useRef } from "react";
import { Tour } from "react-tour";
import type { Step } from "../src/types";
import "react-tour/style.css";

interface AdvancedUsageProps {
  onBack?: () => void;
}

function AdvancedUsage({ onBack }: AdvancedUsageProps = {}) {
  const [runTour, setRunTour] = useState(false);
  const [tourStats, setTourStats] = useState({
    started: false,
    currentStep: 0,
    completed: false,
    skipped: false,
  });

  const dynamicRef1 = useRef<HTMLDivElement>(null);
  const dynamicRef2 = useRef<HTMLDivElement>(null);
  const dynamicElementRef = useRef<HTMLButtonElement>(null);

  const steps: Step[] = [
    {
      target: ".header-title",
      title: "Welcome to the Comprehensive Tour!",
      content:
        "This tour demonstrates ALL features of react-tour: placements, dynamic targets, offsets, custom styles, and more!",
      placement: "bottom",
    },
    {
      target: ".selector-target",
      title: "CSS Selector Target",
      content:
        "This step uses a CSS selector ('.selector-target') to find the element. This is the simplest way to target elements.",
      placement: "top",
    },
    {
      target: () => dynamicRef1.current,
      title: "Dynamic Target (Function)",
      content:
        "This step uses a function that returns an element reference. The function is called each time the step is shown, so it always gets the current element.",
      placement: "right",
    },
    {
      target: () => dynamicRef2.current,
      title: "Dynamic Target (Element Ref)",
      content:
        "This step uses a function that returns an element reference. The ref is evaluated when the step is shown.",
      placement: "left",
    },
    {
      target: () => dynamicElementRef.current,
      title: "Element Reference Target",
      content:
        "This demonstrates targeting an element using a ref function. The element is found dynamically when needed.",
      placement: "bottom",
    },
    {
      target: ".top-center",
      title: "Top Placement",
      content: "This tooltip is placed at the top center of the element.",
      placement: "top",
    },
    {
      target: ".top-start",
      title: "Top Start",
      content: "This tooltip is placed at the top-left (start) of the element.",
      placement: "top-start",
    },
    {
      target: ".top-end",
      title: "Top End",
      content: "This tooltip is placed at the top-right (end) of the element.",
      placement: "top-end",
    },
    {
      target: ".right-center",
      title: "Right Placement",
      content: "This tooltip is placed on the right side, vertically centered.",
      placement: "right",
    },
    {
      target: ".right-start",
      title: "Right Start",
      content: "This tooltip is placed on the right, aligned to the top.",
      placement: "right-start",
    },
    {
      target: ".right-end",
      title: "Right End",
      content: "This tooltip is placed on the right, aligned to the bottom.",
      placement: "right-end",
    },
    {
      target: ".bottom-center",
      title: "Bottom Placement",
      content: "This tooltip is placed at the bottom center of the element.",
      placement: "bottom",
    },
    {
      target: ".bottom-start",
      title: "Bottom Start",
      content:
        "This tooltip is placed at the bottom-left (start) of the element.",
      placement: "bottom-start",
    },
    {
      target: ".bottom-end",
      title: "Bottom End",
      content:
        "This tooltip is placed at the bottom-right (end) of the element.",
      placement: "bottom-end",
    },
    {
      target: ".left-center",
      title: "Left Placement",
      content: "This tooltip is placed on the left side, vertically centered.",
      placement: "left",
    },
    {
      target: ".left-start",
      title: "Left Start",
      content: "This tooltip is placed on the left, aligned to the top.",
      placement: "left-start",
    },
    {
      target: ".left-end",
      title: "Left End",
      content: "This tooltip is placed on the left, aligned to the bottom.",
      placement: "left-end",
    },
    {
      target: ".center-placement",
      title: "Center Placement",
      content:
        "This tooltip is centered over the element. Perfect for modal-like tooltips.",
      placement: "center",
    },
    {
      target: ".offset-demo",
      title: "Custom Offset",
      content:
        "This tooltip has a custom offset of 30px, creating more space between the element and tooltip.",
      placement: "bottom",
      offset: 30,
    },
    {
      target: ".no-overlay-demo",
      title: "No Overlay",
      content:
        "This step has the overlay disabled. Notice there's no dark background - you can still interact with the page!",
      placement: "top",
      disableOverlay: true,
    },
    {
      target: ".footer-button",
      title: "Tour Complete!",
      content:
        "You've seen all features! This tour demonstrated: all placements, dynamic targets, offsets, and custom options.",
      placement: "top",
    },
  ];

  return (
    <div
      style={{
        minHeight: "200vh",
        padding: "20px",
        backgroundColor: "#f5f5f5",
      }}
    >
      <div
        style={{
          // position: "sticky",
          top: 0,
          backgroundColor: "#fff",
          padding: "20px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          zIndex: 1000,
          marginBottom: "40px",
        }}
      >
        <h1 className="header-title" style={{ margin: 0, textAlign: "center" }}>
          Advanced Tour Example
        </h1>
        <div
          style={{
            textAlign: "center",
            marginTop: "20px",
            display: "flex",
            gap: "10px",
            justifyContent: "center",
          }}
        >
          {onBack && (
            <button
              onClick={onBack}
              style={{
                padding: "12px 24px",
                fontSize: "16px",
                backgroundColor: "#6c757d",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              ← Back to Basic Demo
            </button>
          )}
          <button
            onClick={() => setRunTour(true)}
            style={{
              padding: "12px 24px",
              fontSize: "16px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Start Comprehensive Tour
          </button>
        </div>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "40px",
            marginBottom: "80px",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "30px",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              minHeight: "150px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              className="selector-target"
              style={{
                padding: "20px",
                backgroundColor: "#e1f5fe",
                borderRadius: "6px",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              CSS Selector Target
            </div>
          </div>

          <div
            style={{
              backgroundColor: "#fff",
              padding: "30px",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              minHeight: "150px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              ref={dynamicRef1}
              style={{
                padding: "20px",
                backgroundColor: "#f3e5f5",
                borderRadius: "6px",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Dynamic Target (Function)
            </div>
          </div>

          <div
            style={{
              backgroundColor: "#fff",
              padding: "30px",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              minHeight: "150px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              ref={dynamicRef2}
              style={{
                padding: "20px",
                backgroundColor: "#fff3e0",
                borderRadius: "6px",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Dynamic Target (Ref)
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "80px",
          }}
        >
          <button
            ref={dynamicElementRef}
            className="offset-demo"
            style={{
              padding: "15px 30px",
              fontSize: "16px",
              backgroundColor: "#4caf50",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Element with Offset & Custom Styles
          </button>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "80px",
          }}
        >
          <div
            className="no-overlay-demo"
            style={{
              padding: "30px",
              backgroundColor: "#fff",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              textAlign: "center",
              maxWidth: "400px",
            }}
          >
            <h3 style={{ margin: "0 0 10px 0" }}>No Overlay Demo</h3>
            <p style={{ margin: 0, color: "#666" }}>
              This element has overlay disabled. You can interact with the page
              while the tour is active!
            </p>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "40px",
            marginBottom: "100vh",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "30px",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              minHeight: "200px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              className="top-center"
              style={{
                padding: "20px",
                backgroundColor: "#e3f2fd",
                borderRadius: "6px",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Top Center
            </div>
          </div>

          <div
            style={{
              backgroundColor: "#fff",
              padding: "30px",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              minHeight: "200px",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "flex-start",
            }}
          >
            <div
              className="top-start"
              style={{
                padding: "20px",
                backgroundColor: "#f3e5f5",
                borderRadius: "6px",
                fontWeight: "bold",
              }}
            >
              Top Start
            </div>
          </div>

          <div
            style={{
              backgroundColor: "#fff",
              padding: "30px",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              minHeight: "200px",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "flex-end",
            }}
          >
            <div
              className="top-end"
              style={{
                padding: "20px",
                backgroundColor: "#fff3e0",
                borderRadius: "6px",
                fontWeight: "bold",
              }}
            >
              Top End
            </div>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 2fr",
            gap: "40px",
            marginBottom: "100vh",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "30px",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              minHeight: "300px",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <div
              className="right-center"
              style={{
                padding: "20px",
                backgroundColor: "#e0f2f1",
                borderRadius: "6px",
                fontWeight: "bold",
              }}
            >
              Right Center
            </div>
          </div>

          <div
            style={{
              backgroundColor: "#fff",
              padding: "30px",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              minHeight: "300px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              className="center-placement"
              style={{
                padding: "30px",
                backgroundColor: "#fce4ec",
                borderRadius: "6px",
                fontWeight: "bold",
                fontSize: "18px",
              }}
            >
              Center Placement
            </div>
          </div>

          <div
            style={{
              backgroundColor: "#fff",
              padding: "30px",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              minHeight: "300px",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <div
              className="left-center"
              style={{
                padding: "20px",
                backgroundColor: "#e8f5e9",
                borderRadius: "6px",
                fontWeight: "bold",
              }}
            >
              Left Center
            </div>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 2fr",
            gap: "40px",
            marginBottom: "100vh",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "30px",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              minHeight: "200px",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "flex-start",
            }}
          >
            <div
              className="right-start"
              style={{
                padding: "20px",
                backgroundColor: "#e1bee7",
                borderRadius: "6px",
                fontWeight: "bold",
              }}
            >
              Right Start
            </div>
          </div>

          <div
            style={{
              backgroundColor: "#fff",
              padding: "30px",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              minHeight: "200px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                padding: "20px",
                backgroundColor: "#f5f5f5",
                borderRadius: "6px",
                fontWeight: "bold",
                color: "#999",
              }}
            >
              Spacer
            </div>
          </div>

          <div
            style={{
              backgroundColor: "#fff",
              padding: "30px",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              minHeight: "200px",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "flex-end",
            }}
          >
            <div
              className="left-start"
              style={{
                padding: "20px",
                backgroundColor: "#fff9c4",
                borderRadius: "6px",
                fontWeight: "bold",
              }}
            >
              Left Start
            </div>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 2fr",
            gap: "40px",
            marginBottom: "100vh",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "30px",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              minHeight: "200px",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "flex-start",
            }}
          >
            <div
              className="right-end"
              style={{
                padding: "20px",
                backgroundColor: "#b2dfdb",
                borderRadius: "6px",
                fontWeight: "bold",
              }}
            >
              Right End
            </div>
          </div>

          <div
            style={{
              backgroundColor: "#fff",
              padding: "30px",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              minHeight: "200px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                padding: "20px",
                backgroundColor: "#f5f5f5",
                borderRadius: "6px",
                fontWeight: "bold",
                color: "#999",
              }}
            >
              Spacer
            </div>
          </div>

          <div
            style={{
              backgroundColor: "#fff",
              padding: "30px",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              minHeight: "200px",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "flex-end",
            }}
          >
            <div
              className="left-end"
              style={{
                padding: "20px",
                backgroundColor: "#f1f8e9",
                borderRadius: "6px",
                fontWeight: "bold",
              }}
            >
              Left End
            </div>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "40px",
            marginBottom: "100vh",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "30px",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              minHeight: "200px",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "flex-end",
            }}
          >
            <div
              className="right-end"
              style={{
                padding: "20px",
                backgroundColor: "#b2dfdb",
                borderRadius: "6px",
                fontWeight: "bold",
              }}
            >
              Right End
            </div>
          </div>

          <div
            style={{
              backgroundColor: "#fff",
              padding: "30px",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              minHeight: "200px",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
            }}
          >
            <div
              className="bottom-center"
              style={{
                padding: "20px",
                backgroundColor: "#c5cae9",
                borderRadius: "6px",
                fontWeight: "bold",
              }}
            >
              Bottom Center
            </div>
          </div>

          <div
            style={{
              backgroundColor: "#fff",
              padding: "30px",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              minHeight: "200px",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "flex-start",
            }}
          >
            <div
              className="bottom-start"
              style={{
                padding: "20px",
                backgroundColor: "#ffccbc",
                borderRadius: "6px",
                fontWeight: "bold",
              }}
            >
              Bottom Start
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "50vh",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "30px",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              minHeight: "200px",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "flex-end",
              width: "100%",
              maxWidth: "600px",
            }}
          >
            <div
              className="bottom-end"
              style={{
                padding: "20px",
                backgroundColor: "#d1c4e9",
                borderRadius: "6px",
                fontWeight: "bold",
              }}
            >
              Bottom End
            </div>
          </div>
        </div>

        <div
          style={{
            textAlign: "center",
            padding: "40px",
            backgroundColor: "#fff",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            marginBottom: "50px",
          }}
        >
          <button
            className="footer-button"
            onClick={() => setRunTour(false)}
            style={{
              padding: "12px 24px",
              fontSize: "16px",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Finish Tour
          </button>
        </div>

        {tourStats.started && (
          <div
            style={{
              position: "fixed",
              bottom: "20px",
              right: "20px",
              backgroundColor: "#fff",
              padding: "15px 20px",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              zIndex: 10000,
              fontSize: "14px",
              maxWidth: "250px",
            }}
          >
            <div style={{ fontWeight: "bold", marginBottom: "8px" }}>
              Tour Status
            </div>
            <div>Current Step: {tourStats.currentStep + 1}</div>
            {tourStats.completed && (
              <div style={{ color: "#28a745", marginTop: "5px" }}>
                ✓ Completed
              </div>
            )}
            {tourStats.skipped && (
              <div style={{ color: "#ff9800", marginTop: "5px" }}>
                ⏭ Skipped
              </div>
            )}
          </div>
        )}
      </div>

      <Tour
        steps={steps}
        run={runTour}
        showProgress={true}
        showSkipButton={true}
        continuous={true}
        onStart={() => {
          setTourStats({
            started: true,
            currentStep: 0,
            completed: false,
            skipped: false,
          });
        }}
        onStop={() => {
          setTourStats((prev) => ({ ...prev, started: false }));
          setRunTour(false);
        }}
        onSkip={() => {
          setTourStats((prev) => ({
            ...prev,
            skipped: true,
            started: false,
          }));
          setRunTour(false);
        }}
        onStepChange={(stepIndex) => {
          setTourStats((prev) => ({ ...prev, currentStep: stepIndex }));
        }}
        onComplete={() => {
          setTourStats((prev) => ({
            ...prev,
            completed: true,
            started: false,
          }));
          setRunTour(false);
        }}
        styles={{
          tooltip: {
            borderRadius: "12px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
          },
          button: {
            borderRadius: "6px",
            fontWeight: "600",
          },
        }}
      />
    </div>
  );
}

export default AdvancedUsage;
