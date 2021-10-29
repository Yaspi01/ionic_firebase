// import { Component, OnInit } from '@angular/core';
// import {AuthService} from '../../services/auth.service';
// import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore';
// import {Observable} from 'rxjs';

// @Component({
//   selector: 'app-user',
//   templateUrl: './user.page.html',
//   styleUrls: ['./user.page.scss'],
// })
// export class UserPage implements OnInit {
// //donnee:any;
//   itemsCollect: AngularFirestoreCollection; //la collection dans firestore
//   items: Observable<any[]>; //pour lire la collectio

//   constructor(public fire: AngularFirestore, private authService: AuthService) { }

//   async getData() {
//     this.itemsCollect = this.fire.collection('user'); //donnee la collection user à itemCollect
//     this.items = this.itemsCollect.valueChanges();
//     console.log(this.items);
//   }
//   ngOnInit() {
//     //this.authService.getUsers().subscribe(
//      // data=>{
//        // this.donnee=data;
//      // }
//    // );
//   }

// }

import { Component, OnInit } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  itemsCollect: AngularFirestoreCollection; //la collection dans firestore
  items: Observable<any[]>; //pour lire la collectio

  constructor( public fire: AngularFirestore, public route: Router ) { }

  ngOnInit() {
    this.getData();
  }

  async getData(){
    this.itemsCollect = this.fire.collection('user'); //donnee la collection user à itemCollect
    this.items = this.itemsCollect.valueChanges();
    console.log(this.items);
  }

  profil(){
    this.route.navigate(['profile']);
  }



}
