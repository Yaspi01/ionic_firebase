import { Component, OnInit } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {AngularFireAuth} from '@angular/fire/compat/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  itemsCollect: AngularFirestoreCollection; //la collection dans firestore
  items: Observable<any[]>; //pour lire la collection

  user: any;
  constructor(
    private firestore: AngularFirestore,
    private auth: AngularFireAuth,
    private authService: AuthService,
    private router: Router
  ) {
    this.auth.authState.subscribe(auth =>{
      if(auth){
        this.firestore.collection('user').doc(auth.uid).valueChanges().subscribe(result => {
          this.user = result;
          console.log(this.user);
        });
      }
    });
  }

  ngOnInit() {
    this.getData();
  }
  async getData(){
    this.itemsCollect = this.firestore.collection('user'); //donnee la collection user à itemCollect
    this.items = this.itemsCollect.valueChanges();
    console.log(this.items);
  }

  signOut() {
    this.authService.signoutUser()
      .then(res => {
        this.router.navigateByUrl('login');
      })
      .catch(error => {
        console.log(error);
      });
  }
}
