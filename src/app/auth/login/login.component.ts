import { Component, LOCALE_ID } from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { HomeService } from 'src/app/services/home.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private homeService:HomeService,private authService:AuthService){}
  
  err:any
  loginForm:FormGroup = new FormGroup({

    email:new FormControl(null, [Validators.required, Validators.email]),
    
    password:new FormControl(null, Validators.required),

  })


  submit()
  {
    console.log(this.loginForm.value);

   


  
    this.authService.login(this.loginForm.value).subscribe(res=>{
      console.log(res);

     
      
   
    },
    (error)=>{

      this.err = error.error.error.message
      
    }
    
    )

   
    



}




}


