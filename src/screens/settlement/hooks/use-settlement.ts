import {useNavigation} from '@react-navigation/native';
import {SettlementSelectors, settlementSlice} from '@settlement';
import {RootState} from '@store';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

const useSettlement = () => {
  const [principleSelectedId, setPrincipleSelectedId] = useState<
    string | undefined
  >(undefined);
  const {navigate} = useNavigation();
  const state = useSelector<RootState, RootState>(res => res);
  const principles = SettlementSelectors.getPrinciples(state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(settlementSlice.actions.load());
  }, [dispatch]);

  const props = {
    principles,
    principleSelectedId,
  };

  const principleSelected = (id: string) => setPrincipleSelectedId(id);

  const principleSet = () => {
    if (principleSelectedId) {
      navigate('PrincipleSelectScreen', {id: principleSelectedId});
      setPrincipleSelectedId(undefined);
    }
  };

  const principleReset = () => {
    dispatch(settlementSlice.actions.principleReset());
  };

  const actions = {
    principleSelected,
    principleSet,
    principleReset,
  };

  return {props, actions};
};

export default useSettlement;
