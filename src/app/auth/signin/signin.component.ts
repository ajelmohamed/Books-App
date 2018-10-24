import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '../../../../node_modules/@angular/forms';
import { Router } from '../../../../node_modules/@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;
  errorMessage: string;
  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router) { }
  onSubmit(){
    const email =  this.signinForm.get("email").value;
    const password = this.signinForm.get("password").value;
    this.authService.signIn(email,password).then(res => {
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
  ngOnInit() {
    this.initForm();
  }
 
  initForm() {
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }
}
