import { Component, ElementRef, Input, Renderer2 } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { AdminService } from './admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

   allData!:any
  
  constructor(private adminService:AdminService,private authService:AuthService,private renderer: Renderer2, private el: ElementRef){}
  ngOnInit()
  {
    this.authService.navbarVisible.next(false) // to hide default navbar
  
    this.adminService.getAllData().subscribe(data=>{
      this.adminService.Data.next(data)
      this.allData = data
      console.log(this.allData,'from admin');
      
      
    })
    
  }
  toggleNavBar()
  {

    const navbar = this.el.nativeElement.querySelector('nav');
    const rightSide = this.el.nativeElement.querySelector('.right-side');
    navbar.classList.toggle('nav-hidden');
    rightSide.classList.toggle('collapsed');

  }

  logout(){
    this.authService.LogOut()
  }
}
