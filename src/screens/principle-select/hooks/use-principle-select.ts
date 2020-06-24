import {useNavigation, useRoute} from '@react-navigation/native';
import {SettlementSelectors, settlementSlice} from '@settlement';
import {useState} from 'react';
import {useDispatch} from 'react-redux';

type Id = 'newLife' | 'death' | 'conviction' | 'society';

const usePrincipleSelect = () => {
  const {canGoBack, goBack} = useNavigation();
  const [selected, setSelected] = useState<any>();
  const {params} = useRoute<any>();
  const id: Id = params.id;
  const dispatch = useDispatch();

  const props = {
    data: SettlementSelectors.allPrinciples[id],
    selected,
  };

  const select = (item: any) => {
    setSelected(item);
  };

  const confirm = () => {
    if (selected) {
      dispatch(
        settlementSlice.actions.setPrinciple({
          id,
          item: selected,
        }),
      );
      canGoBack() && goBack();
    }
  };

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

export default usePrincipleSelect;
