import { Component, Injectable } from '@angular/core';
import { Renderer2, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AddressComponent } from './address/address.component';
import { BehaviorSubject } from 'rxjs';
import { CheckoutService } from './checkout.service';
import { AuthService } from '../auth/auth.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  constructor(private toastr: ToastrService, private authService:AuthService,private checkoutService:CheckoutService,private router:Router,private renderer: Renderer2, private elementRef: ElementRef) {}
  formValid!:boolean
    state: number = 0;
  stateMax: number = 3;
  isBackButtonEnabled: boolean = false;
  isNextButtonEnabled: boolean = true;
  userId!:any

  ngOnInit(){

    this.checkoutService.FormValid.subscribe(data=>{
      this.formValid = data
      console.log(this.formValid);
    })
    this.updateProgressBar()
  
    this.authService.user.subscribe(userData=>{
      this.userId = userData.id
      
    })

    
    
    
  }
  showSuccess() {
    this.toastr.success('order submitted successfully!', 'success!',
    {
      timeOut: 1500,
      disableTimeOut:false,
      progressBar:true
      
      
    }).onHidden.subscribe(() => {
      // Additional logic to execute after toast is hidden
      this.formValid = false
      this.router.navigate(['/home'])
      // Call another method or perform another action here
    });
  }
  showError() {
    this.toastr.error('An error occurred!');
  }
  next() {
    console.log("Next", this.state);
    // Angular side functions here
  }

  back() {
    console.log("Back", this.state);
    // Angular side functions here
  }

  onNextClick() {
    if (this.state < this.stateMax) {
    
      this.state += 1;
      this.next();
      this.enableBackButton();
      this.addClassToNodes();
      this.updateProgressBar();
     
      if (this.state === this.stateMax) {
        this.disableNextButton();
      }

      if (this.state == 1){
        // this.addressComponent.submit()
        this.router.navigate(['checkout/delivery'])
      }
      if (this.state == 2){
        // this.addressComponent.submit()
        this.router.navigate(['checkout/review'])
      }
      if (this.state == 3){
       
        this.checkoutService.submitOrder(this.userId)

        this.showSuccess()
       
        
        
      }
      this.formValid = false
    }
  }
  onBackClick() {
    if (this.state > 0) {
      
   
      this.back();
      this.enableNextButton();
      this.removeClassFromNodes();
      this.state -= 1;
      this.updateProgressBar();
      
      if (this.state === 0) {
        this.disableBackButton();
        this.router.navigate(['checkout'])
      }

      if (this.state == 1){
        this.router.navigate(['checkout/delivery'])
      }
    }
  }

  disableNextButton() {
    this.isNextButtonEnabled = false;
  }
  
  disableBackButton() {
    this.isBackButtonEnabled = false;
  }
  enableBackButton() {
    this.isBackButtonEnabled = true;
  }
  
  enableNextButton() {
    this.isNextButtonEnabled = true;
  }

  updateProgressBar() {
    const pBar = (this.state / (this.stateMax-1)) * 100;
    document.documentElement.style.setProperty('--pBarWidth', `${pBar}%`);
  }
  getProgressBarWidth() {
    
    return `var(--pBarWidth, 0%)`;
  }



  addClassToNodes() {
    const state = this.state; // Assuming state is accessible within this method
    const nodeElements = this.elementRef.nativeElement.querySelectorAll(`.nConfirm${state}`);
    nodeElements.forEach((node: HTMLElement) => {
      this.renderer.addClass(node, 'done');
    });
  }
  
  removeClassFromNodes() {
    const state = this.state; // Assuming state is accessible within this method
    const nodeElements = this.elementRef.nativeElement.querySelectorAll(`.nConfirm${state}`);
    if (state == 0) {
			// this.disableBackButton()
		}
    nodeElements.forEach((node: HTMLElement) => {
      this.renderer.removeClass(node, 'done');
    });
  }
}
