import {useNavigation, useRoute} from '@react-navigation/native';
import {SettlementSelectors, settlementSlice} from '@settlement';
import {useState} from 'react';
import {useDispatch} from 'react-redux';

const useInnovationSelect = () => {
  const {canGoBack, goBack} = useNavigation();
  const [selected, setSelected] = useState<any>();
  const {params} = useRoute<any>();
  const innovations: string[] = params.innovations;
  const dispatch = useDispatch();

  const props = {
    data: SettlementSelectors.allInnovations,
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
