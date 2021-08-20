import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: Boolean = false;
  constructor(public firebaseAuth: AngularFireAuth, public router: Router ) { }

  // Sign In
  async signin(email: string, password: string) {
    await this.firebaseAuth.signInWithEmailAndPassword(email, password)
    .then(credential => {
      this.isLoggedIn = true;
      this.router.navigateByUrl('orders');
      localStorage.setItem('user', JSON.stringify(credential.user))
      }, error => {
          alert(error.message);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log('Code: ', errorCode + 'Message:', errorMessage);
        alert(error);
      });
  }
}
