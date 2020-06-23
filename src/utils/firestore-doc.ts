/* istanbul ignore file */

import firestore from '@react-native-firebase/firestore';
import {Observable} from 'rxjs';

function firestoreDoc$<T>(path: string): Observable<T> {
  return new Observable((observer: any) => {
    firestore()
      .doc(path)
      .onSnapshot(documentSnapshot => {
        if (documentSnapshot.exists) {
          const record: any = {
            id: documentSnapshot.id,
            ...documentSnapshot.data(),
          };

          return observer.next(record);
        }
        return observer.next(undefined);
      });
  });
}
export default firestoreDoc$;
