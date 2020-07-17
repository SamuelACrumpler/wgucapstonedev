import React from 'react';
import { render, screen } from '@testing-library/react';
 
import App from './App';

import renderer from 'react-test-renderer';

// describe('Counter', () => {
//   test('snapshot renders', () => {
//     const component = renderer.create(<App />);
//     let tree = component.toJSON();
//     expect(tree).toMatchSnapshot();
//   });
// });

describe('Examining the syntax of Jest tests', () => {
   
  it('sums numbers', () => {
      expect(1 + 2).toEqual(3);
      expect(2 + 2).toEqual(4);
   });
});