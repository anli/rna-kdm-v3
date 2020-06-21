import {useNavigation, useRoute} from '@react-navigation/native';
import {RootState} from '@store';
import {SurvivorSelectors, survivorSlices} from '@survivor';
import R from 'ramda';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

type SliceProps = 'survivor1' | 'survivor2' | 'survivor3' | 'survivor4';

interface Gear {
  name: string;
  imageUrl: string;
}

const useSurvivor = () => {
  const [preview, setPreview] = useState<undefined | Gear>(undefined);
  const [gearSelectedIndex, setGearSelectedIndex] = useState<
    undefined | number
  >(undefined);
  const state = useSelector<RootState, RootState>(res => res);
  const {navigate} = useNavigation();
  const dispatch = useDispatch();
  const {params} = useRoute<any>();
  const slice: SliceProps = params.slice;

  const data = {
    gears: SurvivorSelectors.getGears(state[slice]),
    preview,
    gearSelectedIndex,
    slice,
  };

  const gearAdd = () => {
    if (!R.isNil(gearSelectedIndex)) {
      navigate('GearSelectScreen', {index: gearSelectedIndex, slice});
      setGearSelectedIndex(undefined);
    }
  };

  const gearSelect = (index: number, item: undefined | Gear) => {
    setGearSelectedIndex(index);
    setPreview(item);
  };

  const gearRemove = () => {
    if (!R.isNil(gearSelectedIndex)) {
      dispatch(
        survivorSlices[slice].actions.setGear({
          item: undefined,
          index: gearSelectedIndex,
        }),
      );
      setGearSelectedIndex(undefined);
    }
  };

  const actions = {
    gearSelect,
    gearAdd,
    gearRemove,
  };

  return {data, actions};
};

export default useSurvivor;
