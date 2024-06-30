import { Component } from '@angular/core';
import { FormBuilder, FormGroup,FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  

  constructor(private router:Router,private authService:AuthService){}



  // registerForm:FormGroup = new FormGroup({

  //   email:new FormControl(),
  //   username:new FormControl(),
  //   password:new FormControl(),
  //   name: new FormGroup({
  //     firstname: new FormControl(),
  //     lastname:new FormControl()
  //   }),
  //   address : new FormGroup({
  //     city: new FormControl(),
  //     street:new FormControl(),
  //     floar:new FormControl(),
  //     zipcode: new FormControl(),
  //   }),
  //   phone:new FormControl()
  // })


passwordmatcherr:any
  registerForm:FormGroup = new FormGroup({

    email:new FormControl(null,[Validators.required,Validators.email]),
    
    password:new FormControl(null, [Validators.required,Validators.minLength(8), Validators.maxLength(15),]),
    displayName:new FormControl(null,[ Validators.required,Validators.minLength(5),Validators.maxLength(10)]),
    confirmPassword: new FormControl(null,[Validators.required,])
  

  })


  submit()
    {
      console.log(this.registerForm.value);
      console.log(this.passwordmatcherr);
  
      if (this.registerForm.get('password')?.value !== this.registerForm.get('confirmPassword')?.value) {
        this.passwordmatcherr = 'password mismatch'
        console.log(this.passwordmatcherr);
        
      }else{
        const formData = { ...this.registerForm.value }; // Create a copy of the form data
        delete formData.confirmPassword;
        this.passwordmatcherr = undefined
        console.log(formData);
        this.authService.register(formData).subscribe(res=>{
          console.log(res);
          this.router.navigate(['/auth'])
          
        })
      }
      
    
      
    
      // this.authService.register(this.registerForm.value).subscribe(res=>{
      //   console.log(res);
      //   this.router.navigate(['/auth'])
        
      // })
      



  }
  passwordMatchValidator(control: FormControl): { [key: string]: any } | null {
    if (control.value !== this.registerForm.get('password')?.value) {
      return { 'passwordMismatch': true };
    }
    return null;
  }

}
