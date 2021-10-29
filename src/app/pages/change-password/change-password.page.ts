import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth} from '@angular/fire/compat/auth';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {

  user: any;
  constructor(private fire: AngularFirestore, private auth: AngularFireAuth) { }

  ngOnInit() {
  }

  updatePass(pass){
    if(pass.value.old_password !='' && pass.value.new_password!='' && pass.value.conf_new_password!='' ){
      this.auth.authState.subscribe(auth =>{
        if(auth){
          this.fire.collection('user').doc(auth.uid).valueChanges().subscribe(result => {
            this.user = result;
            if(this.user.userPassword == pass.value.old_password){
              if(pass.value.new_password == pass.value.conf_new_password ){
                auth.updatePassword(pass.value.new_password);
              }else{
                console.log('le nouveau mot de passe et l\'ancien sont different');
              }
            }else {
              console.log('Ancien mot de passe incorrecte');
            }
          });
        }else{
          console.log('non encore connecter');
        }
      });
    }else{
      console.log('vous n\'etes pas connecter');
    }
  }

}
