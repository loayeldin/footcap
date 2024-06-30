import { Component } from '@angular/core';
import { CheckoutService } from '../checkout.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent {

    constructor(private checkoutService:CheckoutService){}
    payment!:any
    AddressData!:any
   
  ngOnInit()
  {
    this.getDataFromStorage()
    console.log(this.AddressData);
    console.log(this.payment);
    console.log(localStorage.getItem("id"));
    
 
    
  }


  getDataFromStorage()
  {
    let payment = localStorage.getItem('payment')
    let AddressData = localStorage.getItem('AddressData')
    if (payment && AddressData)
    {
      this.payment = JSON.parse(payment)
      this.AddressData = JSON.parse(AddressData)
    }

    this.checkoutService.FormValid.next(true)
  }

}
