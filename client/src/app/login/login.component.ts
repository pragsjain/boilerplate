import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../app.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { SocketioService } from '../socketio.service';
import { AuthService, SocialUser } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  createLoginForm: FormGroup;
  user: SocialUser;
  subscription;
  hide:boolean;

  constructor(
    private appService: AppService,
    private router: Router,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private socketService:SocketioService,
    private authService: AuthService
  ) {
  }
  ngOnInit() {
    console.log('ngoninit');
    this.resetForm();
    if(this.appService.getUserInfoFromLocalstorage()){
      this.router.navigate(['/dashboard']);
    }
    //subscribe here 
    this.subscription=this.authService.authState.subscribe((user) => {
      console.log('here',user);
      if(user){
      this.user = user;
      //this.appService.setTokenInLocalStorage(user.authToken)
      this.user['fullName']=`${user.name} (${user.email})`
      this.appService.fullNameSource.next( this.user['fullName'] );
      this.appService.setUserInfoInLocalStorage(this.user);
      this.socialSignupFunction(user);
      this.router.navigate(['/dashboard']);
      }
    });
  }


  resetForm(){
    this.createLoginForm = this.fb.group({
      emailOruserName:['',Validators.required],
      password:['',Validators.required]
    })
  }

  goToSignup(){
    this.router.navigate(['/register']);
   }
  
   
  signinFunction: any = () => {
    let loginFormValue=this.createLoginForm.value;
      let data = {
        emailOruserName: loginFormValue.emailOruserName,
        password: loginFormValue.password
      }
      this.appService.signinFunction(data)
        .subscribe((apiResponse) => {
          if (apiResponse.status === 200) {
            console.log(apiResponse)
             this.appService.setUserInfoInLocalStorage(apiResponse.data.userDetails)
             this.appService.setTokenInLocalStorage(apiResponse.data.token)
             this.appService.fullNameSource.next(apiResponse.data.userDetails.fullName);
              //socket connection
              this.socketService.setupSocketConnection({data:'used logged in ,socket established!'});
              //console.log(this.socketService.socket)
             this.router.navigate(['/dashboard']);
          } else {
            this.toastr.error(apiResponse.message)
          }
        }, (err) => {
          if(err.error.message)
          this.toastr.error(err.error.message)
          else
          this.toastr.error("Some error in Login.Try Again !")
        });
    } // end signinFunction

  signInWithGoogle(): void {
      this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(function(){
        console.log('Successful login with google');
      })
    }
   
  signInWithFB(): void {
      this.authService.signIn(FacebookLoginProvider.PROVIDER_ID)
      .then(function(){
        console.log('Successful login with fb');
      })
    } 
  
    //to register the user in BE, if not registered an to get token
  socialSignupFunction: any = (user) => {
    console.log('socialSignupFunction')
        let data = {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          socialSignup: true
        }
        console.log(data);
  
        this.appService.signupFunction(data)
          .subscribe((apiResponse) => {
            console.log(apiResponse);
            if (apiResponse.status === 200) {
              this.appService.setTokenInLocalStorage(apiResponse.data.token);
              let user=this.appService.getUserInfoFromLocalstorage();
              user.userId=apiResponse.data.userId;
              user.socialSignup=true;
              this.appService.setUserInfoInLocalStorage(user);
              this.toastr.success('Signup successful');
              setTimeout(() => {
                this.router.navigate(['/dashboard']);
              }, 2000);
            } else {
              this.toastr.error(apiResponse.message);
            }
          }, (err) => {
            this.toastr.error('some error occured');
          });
      } // end signupFunction
    
      ngOnDestroy() {
        this.subscription.unsubscribe();
      }

  } 

  

  

