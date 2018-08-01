import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Spinner extends PureComponent {
  constructor(props) {
    super(props);
    this.setSVGParams();
  }

  setSVGParams() {
    const {
      circleAttributes: {
        radius,
        circleStrokeWidth,
      },
    } = this.props;

    this.circleLength = 2 * Math.PI * radius;
    this.svgSize = (radius * 2) + circleStrokeWidth;
    this.midPoint = radius + (circleStrokeWidth / 2);
    this.fontSize = this.svgSize / 3.75;
    this.textY = this.midPoint + (this.fontSize / 3);
  }

  isCompleted() {
    const { actualProgress, finalProgressValue } = this.props;
    return actualProgress >= finalProgressValue;
  }

  renderTextProgress() {
    const { actualProgress, finalProgressValue } = this.props;
    const { midPoint, fontSize, textY } = this;
    const percentageCompleted = Math.floor((actualProgress * 100) / finalProgressValue);
    return (
      <text x={midPoint} y={textY} textAnchor="middle" fontSize={fontSize}>
        {percentageCompleted}
      </text>
    );
  }

  renderCircleRotation() {
    const { circleAttributes: { rotationSpeed } } = this.props;
    const { midPoint } = this;

    return !this.isCompleted() && (
      <animateTransform
        attributeName="transform"
        attributeType="XML"
        type="rotate"
        from={`360 ${midPoint} ${midPoint}`}
        to={`0 ${midPoint} ${midPoint}`}
        dur={rotationSpeed}
        repeatCount="indefinite"
      />
    );
  }

  renderProgressCircle() {
    const {
      actualProgress,
      finalProgressValue,
      circleAttributes: {
        radius,
        circleStrokeWidth,
        circleProgressColor,
      },
    } = this.props;

    const {
      circleLength,
      midPoint,
    } = this;

    const offset = circleLength * (1 - (actualProgress / finalProgressValue));

    return actualProgress > 0 ? (
      <circle
        fill="none"
        cx={midPoint}
        cy={midPoint}
        r={radius}
        stroke={circleProgressColor}
        strokeWidth={circleStrokeWidth}
        strokeDasharray={circleLength}
        strokeDashoffset={offset}
      >
        { this.renderCircleRotation() }
      </circle>
    ) : null;
  }

  render() {
    const {
      circleAttributes: {
        radius,
        circleStrokeWidth,
        circleColor,
      },
    } = this.props;

    const { svgSize, midPoint } = this;

    return (
      <svg width={svgSize} height={svgSize}>
        <circle cx={midPoint} cy={midPoint} r={radius} fill="none" stroke={circleColor} strokeWidth={circleStrokeWidth} />
        { this.renderProgressCircle() }
        { this.renderTextProgress() }
      </svg>
    );
  }
}

Spinner.propTypes = {
  actualProgress: PropTypes.number.isRequired,
  finalProgressValue: PropTypes.number,
  circleAttributes: PropTypes.shape({
    radius: PropTypes.number,
    circleStrokeWidth: PropTypes.number,
    circleColor: PropTypes.string,
    circleProgressColor: PropTypes.string,
    rotationSpeed: PropTypes.string,
  }),
};

Spinner.defaultProps = {
  finalProgressValue: 100,
  circleAttributes: {
    radius: 250,
    circleStrokeWidth: 10,
    circleColor: '#e6e6e6',
    circleProgressColor: '#4169E1',
    rotationSpeed: '1s',
  },
};

export default Spinner;
