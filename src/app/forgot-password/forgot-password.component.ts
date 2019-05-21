import { Component, OnInit } from '@angular/core';

import {Router, NavigationStart, NavigationEnd} from '@angular/router';
import { FormBuilder, Validators, FormControl, FormGroup, FormArray } from '@angular/forms';
import { ForgotPasswordService } from './forgot-password.service';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  loading = false;
  submitted = false;
  constructor(private formBuilder: FormBuilder,
    private router: Router,
  private forgotPasswordService:ForgotPasswordService) { }

  ngOnInit() {
    this.forgotPasswordForm = this.formBuilder.group({
      emailId: ['', Validators.required],
      
  });
  }

  forgotPassword() {
    this.forgotPasswordService.post(this.forgotPasswordForm.value).subscribe((response: any) => {
    if(response.response.responseCode==200){
      this.router.navigate(['/login']);
    }
     
    }, error => {
      console.log('error',JSON.stringify(error));
      
    });
    
  }

}
