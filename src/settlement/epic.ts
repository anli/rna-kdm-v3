/* istanbul ignore file */

import firestore from '@react-native-firebase/firestore';
import {firestoreDoc$, shuffle} from '@utils';
import R from 'ramda';
import config from 'react-native-ultimate-config';
import {StateObservable} from 'redux-observable';
import {filter, map, switchMap} from 'rxjs/operators';
import selectors from './selectors';
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

const innovationReset = (action$: any, _: StateObservable<any>) =>
  action$.pipe(
    filter(
      (action: any) =>
        action.type === settlementSlice.actions.innovationReset.type,
    ),
    switchMap(async () => {
      const innovations: any[] = [];

      const {exists} = await getDoc$('settlement').get();

      if (exists) {
        await getDoc$('settlement').update({
          innovations,
        });
        return settlementSlice.actions.innovationResetSuccess();
      }

      await getDoc$('settlement').set({
        innovations,
      });
      return settlementSlice.actions.innovationResetSuccess();
    }),
  );

const innovationSet = (action$: any, _: StateObservable<any>) =>
  action$.pipe(
    filter(
      (action: any) =>
        action.type === settlementSlice.actions.innovationSet.type,
    ),
    switchMap(async (action: any) => {
      const innovations: any[] = action.payload;

      const {exists} = await getDoc$('settlement').get();

      if (exists) {
        await getDoc$('settlement').update({
          innovations,
        });
        return settlementSlice.actions.innovationSetSuccess();
      }

      await getDoc$('settlement').set({
        innovations,
      });
      return settlementSlice.actions.innovationSetSuccess();
    }),
  );

const innovationRemove = (action$: any, state$: StateObservable<any>) =>
  action$.pipe(
    filter(
      (action: any) =>
        action.type === settlementSlice.actions.innovationRemove.type,
    ),
    switchMap(async (action: any) => {
      const idToRemove: string = action.payload;
      const innovations = R.reject((n: string) => n === idToRemove)(
        state$.value.settlement.innovations,
      );

      await getDoc$('settlement').update({
        innovations,
      });
      return settlementSlice.actions.innovationSetSuccess();
    }),
  );

const settlementEventDraw = (action$: any, _: StateObservable<any>) =>
  action$.pipe(
    filter(
      (action: any) =>
        action.type === settlementSlice.actions.settlementEventDraw.type,
    ),
    switchMap(async () => {
      const event = shuffle(selectors.allEvents)[0];

      await getDoc$('settlement').update({
        event,
      });
      return settlementSlice.actions.settlementEventDrawSuccess();
    }),
  );

const locationAdd = (action$: any, state$: StateObservable<any>) =>
  action$.pipe(
    filter(
      (action: any) => action.type === settlementSlice.actions.locationAdd.type,
    ),
    switchMap(async (action: any) => {
      const locations = [
        ...(state$.value.settlement?.locations || []),
        action.payload,
      ];

      const {exists} = await getDoc$('settlement').get();

      if (exists) {
        await getDoc$('settlement').update({
          locations,
        });
        return settlementSlice.actions.locationAddSuccess();
      }

      await getDoc$('settlement').set({
        locations,
      });
      return settlementSlice.actions.locationAddSuccess();
    }),
  );

const locationReset = (action$: any, _: StateObservable<any>) =>
  action$.pipe(
    filter(
      (action: any) =>
        action.type === settlementSlice.actions.locationReset.type,
    ),
    switchMap(async () => {
      const locations: any[] = [];

      await getDoc$('settlement').update({
        locations,
      });

      return settlementSlice.actions.locationResetSuccess();
    }),
  );

export default [
  load,
  setPrinciple,
  principleReset,
  innovationReset,
  innovationSet,
  innovationRemove,
  settlementEventDraw,
  locationAdd,
  locationReset,
];
