import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  createSignupForm:FormGroup;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
    constructor(  
      private appService: AppService,
      private router: Router,
      private toastr: ToastrService,
      private fb: FormBuilder){}
     
    ngOnInit() {
      this.resetForm()
    }

    goToLogin(){
      this.router.navigate(['/']);
    }

    resetForm(){
      this.createSignupForm = this.fb.group({
        userId:['',],
        firstName:['',Validators.required],
        lastName:[''],
        email:['',[Validators.required,Validators.pattern(this.emailPattern)]],
        userName:['',Validators.required],
        password:['',[Validators.required,Validators.minLength(4)]],
        createdOn:[''],
      })
    }
  
    signupFunction: any = () => {
      let signUpFormValue=this.createSignupForm.value;
        let data = {
          firstName: signUpFormValue.firstName,
          lastName: signUpFormValue.lastName,
          userName: signUpFormValue.userName,
          email: signUpFormValue.email,
          password: signUpFormValue.password,
          createdOn: signUpFormValue.createdOn
        }
        console.log(data);
  
        this.appService.signupFunction(data)
          .subscribe((apiResponse) => {
            console.log(apiResponse);
            if (apiResponse.status === 200) {
              this.toastr.success('Signup successful');
              setTimeout(() => {
                this.goToLogin();
              }, 2000);
            } else {
              this.toastr.error(apiResponse.message);
            }
          }, (err) => {
            this.toastr.error('some error occured');
          });
      } // end signupFunction

    } 
  

  