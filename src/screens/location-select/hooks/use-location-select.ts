import {useNavigation} from '@react-navigation/native';
import {SettlementSelectors, settlementSlice} from '@settlement';
import {useState} from 'react';
import {useDispatch} from 'react-redux';

const useLocationSelect = () => {
  const {canGoBack, goBack} = useNavigation();
  const [selected, setSelected] = useState<any>();
  const dispatch = useDispatch();
  const data = SettlementSelectors.allLocations;

  const props = {
    data,
    selected,
  };

  const select = (item: any) => {
    setSelected(item);
  };

  const confirm = () => {
    if (selected) {
      dispatch(settlementSlice.actions.locationAdd(selected.id));
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

export default useLocationSelect;
