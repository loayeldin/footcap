import { Component, ElementRef, Renderer2 } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {


  constructor(private homeService:HomeService,private router:Router,private authService:AuthService,private renderer: Renderer2, private el: ElementRef) { }
  loggedIn!:any
  userData!:any
  cartCount!:any
  cartData!:any
  ordersData!:any
ngOnInit()
{
  this.authService.loggedIn.subscribe(data=>{
    console.log(data);
    this.loggedIn = data
    
  })


  this.authService.user.subscribe(userdata=>{

    console.log(userdata);
    this.userData = userdata
    this.homeService.getUserCart(this.userData.id).subscribe(cartData=>{
      console.log(cartData);
      this.cartData = cartData
      this.cartCount = cartData.length
      console.log(this.cartCount);
      
      
    })


    this.homeService.getUserOrders(this.userData.id).subscribe(ordersdata=>{
      this.ordersData = ordersdata
      console.log(this.ordersData);
      
    })
    
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
