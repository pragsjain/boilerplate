import { Component } from '@angular/core';
import { AppService } from './app.service';
import { Router } from '@angular/router';
import { ActivatedRoute} from '@angular/router';
import { SocketioService } from './socketio.service';
import { AuthService, SocialUser } from 'angularx-social-login';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
isUser:boolean=true;
fullName='';
isLogin:boolean;
isRegister:boolean;
constructor(private appService: AppService,
  private router: Router,
  private route: ActivatedRoute,
  private socketService: SocketioService,
  private authService: AuthService){
}
ngOnInit(){
    //if user is present in localstorage, get from there or else initialize 
    if(this.appService.getUserInfoFromLocalstorage()){
      this.appService.fullNameSource.next(this.appService.getUserInfoFromLocalstorage().fullName);
      //socket connection
        this.socketService.setupSocketConnection({data:'user logged in ,socket established!'});
    }
    this.appService.fullName.subscribe(result => {
      this.fullName = result; 
  });

}


logout(){
let userId=this.appService.getUserInfoFromLocalstorage()['userId']
console.log(userId);
this.appService.logout(userId).subscribe( (res) =>{
 console.log(res);
})
if(this.appService.getUserInfoFromLocalstorage()['socialSignup']){
  this.authService.signOut()
  .then(()=>{
    this.appService.setUserInfoInLocalStorage('')
    this.appService.setTokenInLocalStorage(null)
    this.appService.fullNameSource.next('');
    this.router.navigate(['/login']);
  }).catch((err)=>{
    console.log(err)
    this.appService.setUserInfoInLocalStorage('')
    this.appService.setTokenInLocalStorage(null)
    this.appService.fullNameSource.next('');
    this.router.navigate(['/login']);
  })
  }
  else{
    this.appService.setUserInfoInLocalStorage('')
    this.appService.setTokenInLocalStorage(null)
    this.router.navigate(['/login']);
  }
}

toasterClickedHandler() {
console.log('Toastr clicked');
}
}
