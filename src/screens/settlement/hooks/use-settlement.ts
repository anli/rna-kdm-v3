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
  const dispatch = useDispatch();
  const state = useSelector<RootState, RootState>(res => res);
  const principles = SettlementSelectors.getPrinciples(state);
  const innovations = SettlementSelectors.getInnovations(state);
  const [innovationSelectedId, setInnovationSelectedId] = useState<
    string | undefined
  >(undefined);
  const event = SettlementSelectors.getEvent(state);

  useEffect(() => {
    const sources = [
      ...getPrincipleImageSources(SettlementSelectors.allPrinciples),
      ...getInnovationImageSources(SettlementSelectors.allInnovations),
    ];
    FastImage.preload(sources);
    dispatch(settlementSlice.actions.load());
  }, [dispatch]);

  const props = {
    principles,
    principleSelectedId,
    preview,
    innovations,
    innovationSelectedId,
    event,
  };

  const principleSelected = (id: string, item: any) => {
    setPreview(item);
    setPrincipleSelectedId(id);
    setInnovationSelectedId(undefined);
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

  const innovationAdd = () => {
    const innovationIds = R.pluck('id')(innovations);
    navigate('InnovationSelectScreen', {
      innovations: innovationIds,
    });
  };

  const innovationReset = () => {
    dispatch(settlementSlice.actions.innovationReset());
  };

  const innovationSelected = (id: string, item: any) => {
    setPreview(item);
    setPrincipleSelectedId(undefined);
    setInnovationSelectedId(id);
  };

  const innovationRemove = () => {
    if (innovationSelectedId) {
      dispatch(settlementSlice.actions.innovationRemove(innovationSelectedId));
      setInnovationSelectedId(undefined);
      setPreview(undefined);
    }
  };

  const innovationDraw = () => {
    const innovationIds = R.pluck('id')(innovations);
    navigate('InnovationSelectScreen', {
      innovations: innovationIds,
      isDraw: true,
    });
  };

  const settlementEventDraw = () => {
    dispatch(settlementSlice.actions.settlementEventDraw());
  };

  /* istanbul ignore next */
  const settlementEventView = () => {
    setPreview(props.event);
    setPrincipleSelectedId(undefined);
    setInnovationSelectedId(undefined);
  };

  const actions = {
    principleSelected,
    principleSet,
    principleReset,
    principleRemove,
    innovationAdd,
    innovationReset,
    innovationSelected,
    innovationRemove,
    innovationDraw,
    settlementEventDraw,
    settlementEventView,
  };

  return {props, actions};
};

export default useSettlement;

const getPrincipleImageSources = (
  data: {[key in PrincipleId]: PrincipleValue[]},
) => {
  const principles = R.pipe(R.values, R.flatten)(data);
  return R.map((principle: PrincipleValue) => ({
    uri: principle.imageUrl,
  }))(principles);
};

const getInnovationImageSources = (data: {imageUrl: string}[]) => {
  return data.map(item => ({uri: item.imageUrl}));
};
