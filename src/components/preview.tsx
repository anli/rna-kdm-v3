import React from 'react';
import NativeFastImage from 'react-native-fast-image';
import styled from 'styled-components/native';

interface Props {
  uri?: string;
  testID: string;
}

const Preview = ({uri, testID}: Props) => (
  <ImageWrapper testID={testID}>{uri && <Image uri={uri} />}</ImageWrapper>
);

export default Preview;

const ImageWrapper = styled.View`
  height: 160px;
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
