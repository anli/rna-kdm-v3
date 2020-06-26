/* istanbul ignore file */

import firestore from '@react-native-firebase/firestore';
import {firestoreDoc$} from '@utils';
import config from 'react-native-ultimate-config';
import {StateObservable} from 'redux-observable';
import {filter, map, switchMap} from 'rxjs/operators';
import settlementSlice from './slice';

const TENANT = config?.TENANT;

const getDoc$ = (key: string) =>
  firestore()
    .collection(key)
    .doc(TENANT);

const load = (action$: any) =>
  action$.pipe(
    filter((action: any) => action.type === settlementSlice.actions.load.type),
    switchMap(() => firestoreDoc$<any>(`settlement/${TENANT}`)),
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
