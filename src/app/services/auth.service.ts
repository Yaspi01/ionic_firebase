import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {AngularFirestore} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth: AngularFireAuth, private firestore: AngularFirestore) { }
  collections:any;
  loginFireAuth(email, password){
    return new Promise<any>((resolve, reject)=>{
      this.auth.signInWithEmailAndPassword(email, password).then(
        res => resolve(res),
        error => reject(error)
        );
    });
  }

  registerUser(email, password){
    return new Promise<any>((resolve,reject) =>{
      this.auth.createUserWithEmailAndPassword(email, password).then(
        res => resolve(res),
        error => reject(error)
      );
    });
  }
  getUsers() {
    this.collections=this.firestore.collection('user');
    return this.collections.valueChanges();

  }

  signoutUser() {
    return new Promise<void>((resolve, reject) => {
      if (this.auth.currentUser) {
        this.auth.signOut()
          .then(() => {
            console.log('Sign out');
            resolve();
          }).catch(() => {
          reject();
        });
      }
    })
  }
}
