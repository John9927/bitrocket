import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { reduce } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: Boolean = false;
  totaleCrediti: any;
  allData: any = [];
  showBouncer: Boolean = false;
  showAddedCart: Boolean = false;
  showPopupCartMobile: Boolean = false;
  indexBouncer: any = 0;
  totaleData: any= [];
  showPopupErrorTwoItems: Boolean = false;
  dataList: any = [];
  nomeCurrent: string;
  paymentAccepted: Boolean = true;
  idPayment: any;

  constructor(public firebaseAuth: AngularFireAuth, public router: Router, private firestore: AngularFirestore ) { }

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
    return this.firestore.collection('ordini').add(dato).then(() => {});
  }
}
