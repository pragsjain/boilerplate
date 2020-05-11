import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-response-reset',
  templateUrl: './response-reset.component.html',
  styleUrls: ['./response-reset.component.css']
})
export class ResponseResetComponent implements OnInit {
  ResponseResetForm: FormGroup;
  resetToken: null;
  CurrentState: any;
  IsResetFormValid = true;

  constructor( private appService: AppService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private toastr: ToastrService,) { 
      this.CurrentState = 'Wait';
      this.route.params.subscribe(params => {
      this.resetToken = params.token;
      console.log(this.resetToken);
      this.VerifyToken();
    });
    }

  ngOnInit(): void {
    this.Init();
  }
  VerifyToken() {
    this.appService.ValidPasswordToken({ resettoken: this.resetToken }).subscribe(
      data => {
        this.CurrentState = 'Verified';
      },
      err => {
        this.CurrentState = 'NotVerified';
      }
    );
  }

  Init() {
    this.ResponseResetForm = this.fb.group(
      {
        resettoken: [this.resetToken],
        newPassword: ['', [Validators.required, Validators.minLength(4)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(4)]]
      }
    );
  }

  Validate(passwordFormGroup: FormGroup) {
    const new_password = passwordFormGroup.controls.newPassword.value;
    const confirm_password = passwordFormGroup.controls.confirmPassword.value;

    if (confirm_password.length <= 0) {
      return null;
    }

    if (confirm_password !== new_password) {
      return {
        doesNotMatch: true
      };
    }

    return null;
  }


  ResetPassword(form) {
    console.log(form.get('confirmPassword'));
    if (form.valid) {
      this.IsResetFormValid = true;
      this.appService.newPassword(this.ResponseResetForm.value).subscribe(
        data => {
          this.ResponseResetForm.reset();
          this.toastr.success( data.message);
          setTimeout(() => {
            this.router.navigate(['sign-in']);
          }, 3000);
        },
        err => {
          if (err.error.message) {
            this.toastr.error( err.error.message);
          }
        }
      );
    } else { this.IsResetFormValid = false; }
  }
}