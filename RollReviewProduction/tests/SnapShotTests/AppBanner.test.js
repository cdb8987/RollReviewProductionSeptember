import React from 'react';
import renderer from 'react-test-renderer';
import AppBanner from '../../Components/AppBanner';

test('renders AppBanner snapshot', () => {
  const tree = renderer.create(<AppBanner />).toJSON();
  expect(tree).toMatchSnapshot();
});
