import React from 'react';
import renderer from 'react-test-renderer';

import Spinner from '../src/components/Spinner';

describe('Spinner Component', () => {
  const createSpinnerComponent = props => renderer.create(<Spinner {...props} />);
  const assertComponentSnapshot = component => expect(component.toJSON()).toMatchSnapshot();

  const createComponentsAndAssert = (propsList) => {
    propsList.forEach((props) => {
      const c = createSpinnerComponent(props);
      assertComponentSnapshot(c);
    });
  };

  describe('without optional parameters', () => {
    it('should render without the progress circle and animation tags for no progress', () => {
      const component = createSpinnerComponent({ actualProgress: 0 });
      assertComponentSnapshot(component);
    });

    it('should render with the progress circle and animation tags till completed', () => {
      const progressValues = [
        { actualProgress: 25 },
        { actualProgress: 50 },
        { actualProgress: 75 },
        { actualProgress: 75 },
        { actualProgress: 100 },
        { actualProgress: 105 },
      ];
      createComponentsAndAssert(progressValues);
    });
  });

  describe('with all parameters', () => {
    const props = {
      circleAttributes: {
        radius: 25,
        circleStrokeWidth: 5,
        circleColor: '#ff0000',
        circleProgressColor: '#000',
        rotationSpeed: '0.5s',
      },
      finalProgressValue: 312,
    };

    it('should render without the progress circle and animation tags for no progress', () => {
      const component = createSpinnerComponent({ ...props, actualProgress: 0 });
      assertComponentSnapshot(component);
    });

    it('should render with the progress circle and animation tags till completed', () => {
      const progressProps = [
        { props, actualProgress: 25 },
        { props, actualProgress: 50 },
        { props, actualProgress: 200 },
        { props, actualProgress: 200 },
        { props, actualProgress: 312 },
        { props, actualProgress: 322 },
      ];
      createComponentsAndAssert(progressProps);
    });
  });
});
