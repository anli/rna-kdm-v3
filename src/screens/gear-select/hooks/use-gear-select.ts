import {useNavigation, useRoute} from '@react-navigation/native';
import {SurvivorSelectors, survivorSlices} from '@survivor';
import R from 'ramda';
import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useDebounce} from 'use-debounce';

type SliceProps = 'survivor1' | 'survivor2' | 'survivor3' | 'survivor4';

const useGearSelect = () => {
  const {canGoBack, goBack} = useNavigation();
  const [selected, setSelected] = useState<any>();
  const [searchText, setSearchText] = useState<string>('');
  const [gears, setGears] = useState<any[]>([]);
  const {params} = useRoute<any>();
  const slice: SliceProps = params.slice;
  const dispatch = useDispatch();
  const [debouncedSearchText] = useDebounce(searchText, 1000);

  useEffect(() => {
    if (debouncedSearchText === '') {
      return setGears(SurvivorSelectors.allGears);
    }
    const filtered = SurvivorSelectors.allGears.filter(location => {
      const data = location.data;
      const names = R.pluck('name')(data);
      const isMatch = R.any((name: string) => {
        const result = R.includes(
          debouncedSearchText.toLowerCase(),
          name.toLowerCase(),
        );
        return result;
      })(names);

      return isMatch;
    });

    return setGears(filtered);
  }, [debouncedSearchText]);

  const data = {
    gears,
    selected,
    searchText,
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

  const search = (text: string) => {
    setSearchText(text);
  };

  const actions = {
    select,
    confirm,
    cancel,
    search,
  };

  return {data, actions};
};

export default useGearSelect;
