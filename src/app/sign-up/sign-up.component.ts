import { SignUpService } from './sign-up.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  constructor( private formBuilder: FormBuilder,
    private router: Router,
   private toastService:ToastrService,
  private signupService:SignUpService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      emailId: ['', Validators.required],
      password: ['', Validators.required],
      Name: ['', [Validators.required, Validators.minLength(6)]]
  });
  }
  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }
 
  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }

      this.loading = true;
    }
onFileChange(event) {
  let reader = new FileReader();
 
  if(event.target.files && event.target.files.length) {
    const [file] = event.target.files;
    reader.readAsDataURL(file);
  
    reader.onload = () => {
      this.registerForm.patchValue({
        file: reader.result
      });
      
      
    };
  }
}

  signUp() {
    this.signupService.post(this.registerForm.value).subscribe((response: any) => {
     if(response.response.responseCode==201){
       this.toastService.success(response.response.responseMessage);
      this.router.navigate(['/login']);
     }
     else
       this.toastService.error(response.response.responseMessage);

     
    }, error => {
      //console.log('error',JSON.stringify(error));
      
    });
    
        
  }
}



 
 
   
    

