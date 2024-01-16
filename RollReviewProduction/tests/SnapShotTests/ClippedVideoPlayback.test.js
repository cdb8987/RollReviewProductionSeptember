import React from "react";
import renderer from 'react-test-renderer';
import ClippedVideoPlayback from '../../Components/ClippedVideoPlayback';

test('renders ClippedVideoPlayback snapshot', () => {
    const timeStamp= new Date()
    const tree = renderer.create(<ClippedVideoPlayback 

  videoRecord={{"result": "Improved Position", "technique": "Escape", "thumbnailURI": "file:///data/user/0/host.exp.exponent/files/1695665429971.jpg", "timestamp": 998, "uri": "file:///data/user/0/host.exp.exponent/files/1695648599547.mp4"}}
  
  
  isFocused={true}
  duration={0}
  selectedVideoKey={0}
  onSelect={()=>{null}}
  />).toJSON();
  expect(tree).toMatchSnapshot();
});