import React from 'react';
import NativeFastImage from 'react-native-fast-image';
import styled from 'styled-components/native';

interface Props {
  uri?: string;
  testID: string;
  height?: string;
}

const Preview = ({uri, testID, height = '160px'}: Props) => (
  <ImageWrapper height={height} testID={testID}>
    {uri && <Image uri={uri} />}
  </ImageWrapper>
);

export default Preview;

const ImageWrapper = styled.View`
  height: ${props => props.height};
  width: 100%;
  background-color: rgba(0, 0, 0, 0.08);
`;

const Image = ({uri}: {uri: string}) => (
  <FastImage
    source={{
      uri,
    }}
    resizeMode={FastImage.resizeMode.contain}
  />
);

const FastImage = styled(NativeFastImage)`
  height: 100%;
  width: 100%;
`;
