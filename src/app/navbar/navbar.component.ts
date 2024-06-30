import { Component, ElementRef, Renderer2 } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {


  constructor(private router:Router,private authService:AuthService,private renderer: Renderer2, private el: ElementRef) { }
  loggedIn!:any
ngOnInit()
{
  this.authService.loggedIn.subscribe(data=>{
    console.log(data);
    this.loggedIn = data
    
  })
}

  openNav() {
    // Get the navbar-responsive element
    const navbarResponsive = this.el.nativeElement.querySelector('.navbar-responsive');
    const overlay = this.el.nativeElement.querySelector('.overlay')
    // Check if the element exists
    if (navbarResponsive) {
      // Update the left position
      this.renderer.setStyle(overlay,'left','0')
      this.renderer.setStyle(navbarResponsive, 'left', '0'); // You can set it to any value you want
     

    }
  }
  close() {
    const navbarResponsive = this.el.nativeElement.querySelector('.navbar-responsive');
    const overlay = this.el.nativeElement.querySelector('.overlay');

    if (navbarResponsive) {
        this.renderer.setStyle(navbarResponsive, 'left', '-100%');

        const transitionEndHandler = () => {
            // This code will run after the transition of the navbar is completed
            this.renderer.setStyle(overlay, 'left', '-100%');
            overlay.removeEventListener('transitionend', transitionEndHandler);
        };

        // Add an event listener to the overlay for the 'transitionend' event
        overlay.addEventListener('transitionend', transitionEndHandler);
    }
}

logOut()
{
  this.authService.LogOut()
  this.router.navigate(['/auth'])
}

}
