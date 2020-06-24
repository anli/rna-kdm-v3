/* istanbul ignore file */

import firestore from '@react-native-firebase/firestore';
import {firestoreDoc$} from '@utils';
import {StateObservable} from 'redux-observable';
import {filter, map, switchMap} from 'rxjs/operators';
import settlementSlice from './slice';

const getDoc$ = (key: string, tenant: string = '12032016') =>
  firestore()
    .collection(key)
    .doc(tenant);

const load = (action$: any) =>
  action$.pipe(
    filter((action: any) => action.type === settlementSlice.actions.load.type),
    switchMap(() => firestoreDoc$<any>('settlement/12032016')),
    map(data => settlementSlice.actions.loadSuccess(data)),
  );

const setPrinciple = (action$: any, state$: StateObservable<any>) =>
  action$.pipe(
    filter(
      (action: any) =>
        action.type === settlementSlice.actions.setPrinciple.type,
    ),
    switchMap(async (action: any) => {
      const principles = {
        ...state$.value.settlement.principles,
        [action.payload.id]: action.payload.item,
      };

      const {exists} = await getDoc$('settlement').get();

      if (exists) {
        await getDoc$('settlement').update({
          principles,
        });
        return settlementSlice.actions.setPrincipleSuccess();
      }

      await getDoc$('settlement').set({
        principles,
      });
      return settlementSlice.actions.setPrincipleSuccess();
    }),
  );

const principleReset = (action$: any, _: StateObservable<any>) =>
  action$.pipe(
    filter(
      (action: any) =>
        action.type === settlementSlice.actions.principleReset.type,
    ),
    switchMap(async () => {
      const principles = {
        newLife: null,
        death: null,
        conviction: null,
        society: null,
      };

      const {exists} = await getDoc$('settlement').get();

      if (exists) {
        await getDoc$('settlement').update({
          principles,
        });
        return settlementSlice.actions.principleResetSuccess();
      }

      await getDoc$('settlement').set({
        principles,
      });
      return settlementSlice.actions.principleResetSuccess();
    }),
  );

export default [load, setPrinciple, principleReset];
