import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: Boolean = false;
  showPopupFirst: Boolean = true;
  totaleCrediti: any;
  allData: any = [];
  showBouncer: Boolean = false;
  showAddedCart: Boolean = false;
  showPopupCartMobile: Boolean = false;
  indexBouncer: any = 0;
  totaleData: any = [];
  showPopupErrorTwoItems: Boolean = false;
  dataList: any = [];
  dataCheckValue: any = [];
  all: any = [];
  nomeCurrent: string;
  paymentAccepted: Boolean = true;
  buttonClicked: Boolean = false;
  idPayment: any;
  paymentSuccessAcceptedGuard: Boolean = false;
  url = 'ordini/';

  constructor(public firebaseAuth: AngularFireAuth, public router: Router, private firestore: AngularFirestore) { }

  // Sign In
  async signin(email: string, password: string) {
    await this.firebaseAuth.signInWithEmailAndPassword(email, password)
      .then(credential => {
        this.isLoggedIn = true;
        setTimeout(() => {
          this.router.navigateByUrl('orders');
        }, 1000)
      }, error => {
        alert(error.message);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(error);
      });
  }

  getData() {
    return this.firestore.collection('dati', ref => ref.orderBy('euro')).get();
  }

  getDataValues() {
    return this.firestore.collection('dati', ref => ref.orderBy('euro')).valueChanges();
  }

  getTotale() {
    return this.firestore.collection('magazzino', ref => ref.orderBy('totale')).valueChanges();
  }

  addData(dato: any) {
    return this.firestore.collection('ordini').add(dato).then(() => { });
  }

  getDataOrdini() {
    return this.firestore.collection('ordini', ref => ref.orderBy('time', 'desc')).get();
  }

  getOrdiniById(idPayPal: any) {
    return this.firestore.collection('ordini', ref => ref.where('idPayPal', '==', idPayPal)).valueChanges();
  }


  deleteDocument(url: string, id: string):
    Promise<any> {
    return this.getDocumentRef(`${url}${id}`).delete()
      .then(() => {
        return null;
      })
      .catch((error) => {
        return error;
      });
  }

  getDocumentRef(path: string): AngularFirestoreDocument {
    return this.firestore.doc(path);
  }

  getCollectionSnapshot(
    path: string,
    sortBy?: string
  ): Observable<any[]> {
    return this.getCollectionRef(path, sortBy).snapshotChanges();
  }

  getCollectionRef(path: string, sortBy?: string):
    AngularFirestoreCollection {
    if (sortBy === undefined) {
      return this.firestore.collection(path);
    } else {
      return this.firestore.collection(path, ref => ref.orderBy(sortBy));
    }
  }

  getDocumentSnapshot(
    path: string,
  ): Observable<any> {
    return this.getDocumentRef(path).snapshotChanges();
  }
}
