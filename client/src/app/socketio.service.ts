import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  socket;
  constructor(private toastr: ToastrService,private router:Router,private appService: AppService) {
    this.socket = io(environment.SOCKET_ENDPOINT);
  }
  
  setupSocketConnection(data) {
    //console.log(this.socket);
    this.socket.on('notification', (data)=>{
      //console.log(data);
          //get issue by issueId
          this.appService.getIssueById(data.issueId).subscribe( (res) =>{
            console.log('res',res);
              if(!res.error){
                let fullName=this.appService.getUserInfoFromLocalstorage().fullName;
                if(res.data.assignee==fullName || res.data.reporter==fullName || res.data.watchers.indexOf(fullName)>-1)
                {
                console.log('notify eligible');
                 this.toastr.info(data.message)
                .onTap.subscribe(()=>this.router.navigate(['/issueDescription',data.issueId]));
                }
              }
          });
    })
  }
}
