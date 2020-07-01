import {useNavigation} from '@react-navigation/native';
import {SettlementSelectors, settlementSlice} from '@settlement';
import {useState} from 'react';
import {useDispatch} from 'react-redux';

const useWeaponSpecializationSelect = () => {
  const {canGoBack, goBack} = useNavigation();
  const [selected, setSelected] = useState<any>();
  const dispatch = useDispatch();
  const data = SettlementSelectors.allWeaponSpecializations;

  const props = {
    data,
    selected,
  };

  const select = (item: any) => {
    setSelected(item);
  };

  const confirm = () => {
    if (selected) {
      dispatch(settlementSlice.actions.weaponSpecializationAdd(selected.id));
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

export default useWeaponSpecializationSelect;
