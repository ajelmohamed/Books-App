import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '../../../../node_modules/@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  

  signupForm: FormGroup;
  errorMessage: string;
  onSubmit(){
   const email = this.signupForm.get("email").value;
   const password = this.signupForm.get("password").value;
   this.authService.createNewUser(email, password).then(res => {
    console.log(res);
    this.errorMessage = "";
    this.router.navigate(["/books"])
    //this.successMessage = "Your account has been created";
  }, err => {
    console.log(err);
    this.errorMessage = err.message;
    //this.successMessage = "";
  })

  }
  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }

}
