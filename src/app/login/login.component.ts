import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Headers, Http} from "@angular/http";
import 'rxjs/Rx';
import {ModalDirective} from "ngx-bootstrap";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formModel: FormGroup;
  @ViewChild(ModalDirective) public lgModal: ModalDirective;
  constructor(fb: FormBuilder,
              private http: Http) {
    this.formModel = fb.group({
      userName: ['', [Validators.minLength(3)]],
      password: ['', this.passwordValidator],
      defaults: ['true']
    });
  }


  passwordValidator(control: FormControl): any {
    if (!control.value) {
      return null;
    }
    let passreg = /^[\w]{6,8}$/;
    let valid = passreg.test(control.value);
    return valid ? null : {password: true};
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.formModel.value.userName && this.formModel.value.password) {
      let myHeaders: Headers = new Headers();
      myHeaders.append('Authorization', 'Basic 123456');
      this.http.post('api/login', JSON.stringify(this.formModel.value), {headers: myHeaders})
        .map(res => res.json()).subscribe(
        data => console.log(data),
        error => console.log(error),
        () => console.log('Register Complete'));
    } else {
      this.lgModal.show();
    }
  }
}
