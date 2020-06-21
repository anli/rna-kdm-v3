import {useNavigation, useRoute} from '@react-navigation/native';
import {SurvivorSelectors, survivorSlices} from '@survivor';
import {useState} from 'react';
import {useDispatch} from 'react-redux';

type SliceProps = 'survivor1' | 'survivor2' | 'survivor3' | 'survivor4';

const useGearSelect = () => {
  const {canGoBack, goBack} = useNavigation();
  const [selected, setSelected] = useState<any>();
  const {params} = useRoute<any>();
  const slice: SliceProps = params.slice;
  const dispatch = useDispatch();

  const data = {
    gears: SurvivorSelectors.allGears,
    selected,
  };

  const select = (item: any) => {
    setSelected(item);
  };

  const confirm = () => {
    dispatch(
      survivorSlices[slice].actions.setGear({
        index: params.index,
        item: selected,
      }),
    );
    canGoBack() && goBack();
  };

  const cancel = () => {
    canGoBack() && goBack();
  };

  const actions = {
    select,
    confirm,
    cancel,
  };

  return {data, actions};
};

export default useGearSelect;
