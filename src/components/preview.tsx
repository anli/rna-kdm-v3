import React from 'react';
import NativeFastImage from 'react-native-fast-image';
import {ScrollView} from 'react-native-gesture-handler';
import styled from 'styled-components/native';

interface Props {
  uri?: string;
  testID: string;
  height?: string;
  imageHeight?: string;
}

const Preview = ({uri, testID, height = '160px', imageHeight}: Props) => {
  const scrollHeight = imageHeight
    ? Number(imageHeight.slice(0, -2))
    : Number(height.slice(0, -2));
  return (
    <ImageWrapper height={height} testID={testID}>
      <ScrollView contentContainerStyle={{height: scrollHeight}}>
        {uri && <Image uri={uri} />}
      </ScrollView>
    </ImageWrapper>
  );
};

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
