import {useNavigation} from '@react-navigation/native';
import {
  PrincipleId,
  PrincipleValue,
  SettlementSelectors,
  settlementSlice,
} from '@settlement';
import {RootState} from '@store';
import R from 'ramda';
import {useEffect, useState} from 'react';
import FastImage from 'react-native-fast-image';
import {useDispatch, useSelector} from 'react-redux';

const useSettlement = () => {
  const [preview, setPreview] = useState<undefined | {imageUrl: string}>(
    undefined,
  );
  const [principleSelectedId, setPrincipleSelectedId] = useState<
    string | undefined
  >(undefined);
  const {navigate} = useNavigation();
  const state = useSelector<RootState, RootState>(res => res);
  const principles = SettlementSelectors.getPrinciples(state);
  const dispatch = useDispatch();

  useEffect(() => {
    preloadPrincipleImages(SettlementSelectors.allPrinciples);
    dispatch(settlementSlice.actions.load());
  }, [dispatch]);

  const props = {
    principles,
    principleSelectedId,
    preview,
  };

  const principleSelected = (id: string, item: any) => {
    setPreview(item);
    setPrincipleSelectedId(id);
  };

  const principleSet = () => {
    if (principleSelectedId) {
      navigate('PrincipleSelectScreen', {id: principleSelectedId});
      setPrincipleSelectedId(undefined);
      setPreview(undefined);
    }
  };

  const principleReset = () => {
    dispatch(settlementSlice.actions.principleReset());
    setPrincipleSelectedId(undefined);
    setPreview(undefined);
  };

  const principleRemove = () => {
    if (principleSelectedId) {
      dispatch(
        settlementSlice.actions.setPrinciple({
          id: principleSelectedId,
          item: undefined,
        }),
      );
      setPrincipleSelectedId(undefined);
      setPreview(undefined);
    }
  };

  const actions = {
    principleSelected,
    principleSet,
    principleReset,
    principleRemove,
  };

  return {props, actions};
};

export default useSettlement;

const preloadPrincipleImages = (
  data: {[key in PrincipleId]: PrincipleValue[]},
) => {
  const principles = R.pipe(R.values, R.flatten)(data);
  const sources = R.map((principle: PrincipleValue) => ({
    uri: principle.imageUrl,
  }))(principles);

  FastImage.preload(sources);
};
