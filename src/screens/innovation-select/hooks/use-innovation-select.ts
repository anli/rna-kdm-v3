import {useNavigation, useRoute} from '@react-navigation/native';
import {SettlementSelectors, settlementSlice} from '@settlement';
import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';

const useInnovationSelect = () => {
  const {canGoBack, goBack} = useNavigation();
  const [selected, setSelected] = useState<any>();
  const [data, setData] = useState<any>();
  const {params} = useRoute<any>();
  const innovations: string[] = params.innovations;
  const isDraw: string[] = params.isDraw || false;
  const dispatch = useDispatch();

  useEffect(() => {
    if (isDraw) {
      setData(SettlementSelectors.drawInnovation(innovations));
      return;
    }

    setData(SettlementSelectors.allInnovations);
    return;
  }, [isDraw, innovations]);

  const props = {
    data,
    selected,
  };

  const select = (item: any) => {
    setSelected(item);
  };

  const confirm = () => {
    if (selected) {
      const updatedInnovation = [...innovations, selected.id];
      dispatch(settlementSlice.actions.innovationSet(updatedInnovation));
      canGoBack() && goBack();
    }
  };

  /* istanbul ignore next */
  const cancel = () => {
    canGoBack() && goBack();
  };

  const actions = {
    select,
    confirm,
    cancel,
  };

  return {props, actions};
};

export default useInnovationSelect;
