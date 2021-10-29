// import { Component, OnInit } from '@angular/core';
// import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore';
// import {Observable} from 'rxjs';

// @Component({
//   selector: 'app-search',
//   templateUrl: './search.page.html',
//   styleUrls: ['./search.page.scss'],
// })
// export class SearchPage implements OnInit {
//   itemsCollect: AngularFirestoreCollection; //la collection dans firestore
//   items: Observable<any[]>; //pour lire la collectio

//   constructor(public fire: AngularFirestore) { }

//   ngOnInit() {
//     this.getData();
//   }

//   async getData(){
//     this.itemsCollect = this.fire.collection('user'); //donnee la collection user à itemCollect
//     this.items = this.itemsCollect.valueChanges();
//     console.log(this.items);
//   }
// }


import { Component, OnInit } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import {Observable} from 'rxjs';
import {AuthService} from "../../services/auth.service";



@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  public donnee: any;
  public search: any;
  itemsCollect: AngularFirestoreCollection; //la collection dans firestore
  items: Observable<any[]>; //pour lire la collectio
  constructor(public fire: AngularFirestore, private authService: AuthService) { }

  ngOnInit() {
    this.authService.getUsers().subscribe(
      data=>{
        this.donnee=data
      }
    )
  }

  async getData(){
    this.itemsCollect = this.fire.collection('user'); //donnee la collection user à itemCollect
    this.items = this.itemsCollect.valueChanges();
    console.log(this.items);
  }


}
