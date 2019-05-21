import { ToastrService } from 'ngx-toastr';
import { LoginService } from './login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: []
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  constructor(private _formBuilder: FormBuilder,
    private _router: Router,
    private _loginService: LoginService,
    private toastService: ToastrService,
    private ngxLoader: NgxUiLoaderService) { }

  ngOnInit() {
    this.buildLoginForm();
  }

  buildLoginForm() {
    this.loginForm = this._formBuilder.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    /**stop here if form is invalid */
    if (this.loginForm.invalid) {
      return;
    }
    this.ngxLoader.start()
    /**for calling service login function */
    this._loginService.login(this.loginForm.value).subscribe((response: any) => {
      this.ngxLoader.stop()
      //console.log(response.response)
      if (response.response.responseCode == 200) {
        this.toastService.success(response.response.responseMessage)
        localStorage.setItem('token', JSON.stringify(response.response.adminProfile.token))
        this._router.navigate(['/index']);
      } else {
        this.toastService.error(response.response.responseMessage)
      }
    }, error => {
      //console.log('error' + error);

    });
  }

  forgot() {
    this.toastService.info('Comming Soon')
  }


}
