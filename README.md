
# Spinner
A react component that reflects the progress of a process with a beautiful SVG Animated Circle.

# Setup & Run
1. `npm install`
1. `npm run start`

**Run tests** with `npm run test`

# Usage
Render the component `<Spinner actualProgress={value} />` with the single required parameter `actualProgress`.

*Note: `actualProgress` value should be updated externally. It can be the state of a parent component or connected to a Store.*

## Other options
Spinner styles can be configured by passing a `circleAttributes` property.

```
circleAttributes = {
  radius: 250, // Circle radius
  circleStrokeWidth: 10, // stroke width
  circleColor: '#e6e6e6', // static circle stroke color
  circleProgressColor: '#4169E1', // rotating circle stroke color
  rotationSpeed: '1s', // rotation animation speed
}
```
*Note: The font size of the inner text is adjusted based on the circle radius.*
