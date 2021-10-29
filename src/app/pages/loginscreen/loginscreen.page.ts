import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from 'src/app/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-loginscreen',
  templateUrl: './loginscreen.page.html',
  styleUrls: ['./loginscreen.page.scss'],
})
export class LoginscreenPage implements OnInit {

  validationUserMessage = {
    email: [
      {type: 'required', message: 'Donnez une addresse email'},
      {type: 'pattern', message: 'Entrez une addresse email valide'}
    ],
    password: [
      {type: 'required', message: 'Saisissez un mot de passe'},
      {type: 'minlength', message: 'Mot de passe doit être au moins 5 caracteres'}
    ]
  };
  validationUserUser: FormGroup;

  user: any;
  constructor(public formbuilder: FormBuilder, public authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.validationUserUser = this.formbuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ]))
    });
  }

  loginUser(data) {
    try {
      return this.authService.loginFireAuth(data.value.email, data.value.password).then(res => {
        console.log(res);

      });
    } catch (err) {
      console.log(err);
    }
  }

  login(data) {
    try {
      return this.authService.loginFireAuth(data.value.email, data.value.password).then(res => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        this.user = data,
          //localStorage.setItem('infoUser', JSON.stringify(this.user)),
          this.router.navigate(['/home']);
      });
    } catch (error) {
      console.log(error);
    }

  }
}
