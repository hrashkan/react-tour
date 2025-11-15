# React Tour

A lightweight, dependency-free React tour library for creating guided tours in your applications. Built from scratch with zero dependencies (except React as a peer dependency).

## Features

**Zero Dependencies** - Only React as a peer dependency
**Customizable** - Full control over styling and behavior
**Responsive** - Automatically adjusts tooltip position
**Keyboard Support** - ESC key to close (optional)
**Flexible** - Support for custom targets, placements, and content
**TypeScript** - Full TypeScript support
**Lightweight** - Minimal bundle size

## Installation

```bash
npm install react-tour

yarn add react-tour
```

## Quick Start

```tsx
import React, { useState } from "react";
import { Tour } from "react-tour";
import "react-tour/style.css";

function App() {
  const [runTour, setRunTour] = useState(false);

  const steps = [
    {
      target: ".my-first-step",
      content: "This is my awesome feature!",
      title: "Welcome",
    },
    {
      target: ".my-second-step",
      content: "This is another awesome feature!",
      title: "Feature 2",
    },
  ];

  return (
    <div className="app">
      <button onClick={() => setRunTour(true)}>Start Tour</button>

      <Tour steps={steps} run={runTour} onComplete={() => setRunTour(false)} />

      <div className="my-first-step">First Step</div>
      <div className="my-second-step">Second Step</div>
    </div>
  );
}
```

### CommonJS usage

```js
const { Tour } = require("react-tour");
require("react-tour/style.css");
```

## API Reference

### Tour Props

| Prop                  | Type                          | Default      | Description                           |
| --------------------- | ----------------------------- | ------------ | ------------------------------------- |
| `steps`               | `Step[]`                      | **required** | Array of tour steps                   |
| `run`                 | `boolean`                     | `true`       | Whether the tour should run           |
| `continuous`          | `boolean`                     | `true`       | Show previous button on all steps     |
| `showProgress`        | `boolean`                     | `false`      | Show step progress (e.g., "1 / 3")    |
| `showSkipButton`      | `boolean`                     | `false`      | Show skip button                      |
| `disableCloseOnEsc`   | `boolean`                     | `false`      | Disable closing on ESC key            |
| `disableOverlayClose` | `boolean`                     | `false`      | Disable closing on overlay click      |
| `onStart`             | `() => void`                  | -            | Callback when tour starts             |
| `onStop`              | `() => void`                  | -            | Callback when tour stops              |
| `onSkip`              | `() => void`                  | -            | Callback when tour is skipped         |
| `onStepChange`        | `(stepIndex: number) => void` | -            | Callback when step changes            |
| `onComplete`          | `() => void`                  | -            | Callback when tour completes          |
| `className`           | `string`                      | -            | Custom class name for tooltip         |
| `styles`              | `object`                      | -            | Custom styles for tooltip and overlay |

### Step Object

| Property         | Type                                         | Default      | Description                                          |
| ---------------- | -------------------------------------------- | ------------ | ---------------------------------------------------- |
| `target`         | `string \| HTMLElement \| () => HTMLElement` | **required** | CSS selector, element, or function returning element |
| `content`        | `ReactNode`                                  | **required** | Content to display in tooltip                        |
| `title`          | `ReactNode`                                  | -            | Optional title for the step                          |
| `placement`      | `TooltipPosition`                            | `"bottom"`   | Tooltip placement relative to target                 |
| `disableBeacon`  | `boolean`                                    | `false`      | Disable beacon (not implemented yet)                 |
| `disableOverlay` | `boolean`                                    | `false`      | Disable overlay for this step                        |
| `offset`         | `number`                                     | `0`          | Offset in pixels from target                         |

### TooltipPosition

```typescript
type TooltipPosition =
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
```

## Examples

### Basic Tour

```tsx
<Tour
  steps={[
    { target: ".step1", content: "First step" },
    { target: ".step2", content: "Second step" },
  ]}
  run={true}
/>
```

### Controlled Tour

```tsx
const [isRunning, setIsRunning] = useState(false);

<Tour
  steps={steps}
  run={isRunning}
  onComplete={() => setIsRunning(false)}
  onStop={() => setIsRunning(false)}
/>;
```

### Custom Styling

```tsx
<Tour
  steps={steps}
  styles={{
    tooltip: {
      backgroundColor: "#333",
      color: "#fff",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.7)",
    },
  }}
/>
```

### Dynamic Targets

```tsx
const steps = [
  {
    target: () => document.getElementById("dynamic-element"),
    content: "This element might not exist yet",
  },
];
```

### Custom Placements

```tsx
const steps = [
  {
    target: ".element",
    content: "Tooltip on top",
    placement: "top",
  },
  {
    target: ".element",
    content: "Tooltip on right",
    placement: "right",
  },
];
```

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Type check
npm run type-check

# Watch mode
npm run dev

# Run demo
npm run demo
```

## Demo

A live demo is available in the `demo/` directory. To run it:

```bash
npm run demo
```

The demo showcases all features of React Tour including:

- Basic tour functionality
- Progress indicators
- Skip buttons
- Custom styling
- Different placements
- Dynamic targets

## Examples

See the `examples/` directory for more usage examples:

- `BasicUsage.tsx` - Basic tour setup
- `AdvantageUsage.tsx` - Advanced features with progress and skip
- `CustomStyling.tsx` - Custom styling example
- `DynamicTarget.tsx` - Using dynamic targets

## License

MIT
