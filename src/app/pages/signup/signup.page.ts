import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {AuthService} from '../../services/auth.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  constructor(private serv: AuthService, private create: AngularFirestore) { }

  ngOnInit() {
  }

  register(data){
    try {
      this.serv.registerUser(data.value.email, data.value.password).then( response =>{
          console.log(response);
          this.create.collection('user').doc(response.user.uid).set({
            userName: data.value.names,
            phone: data.value.phone,
            userEmail: data.value.email,
            userPassword: data.value.password,
          });
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

}
