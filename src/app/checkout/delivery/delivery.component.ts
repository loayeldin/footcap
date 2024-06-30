import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CheckoutService } from '../checkout.service';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent {

    constructor(private checkoutService:CheckoutService){}

  cardForm:FormGroup = new FormGroup({
    cardNumber: new FormControl(null,[Validators.required, Validators.pattern(/^\d{16}$/)]),
    cardName: new FormControl(null,Validators.required),
    securityCode: new FormControl(null, [Validators.required, Validators.pattern(/^\d{3,4}$/)]),
    expireDate: new FormControl(null,[Validators.required, Validators.pattern(/^\d{2}\/\d{2}$/)]),
  })

  ngOnInit()
  {
    this.getStorageData()
  }

  submit()
  {
    console.log(this.cardForm.value);
    this.checkoutService.setSotrageData('payment',this.cardForm.value)
    
  }

  getStorageData()
  {
    let payment = localStorage.getItem('payment')
    console.log(payment);
    
    if(payment)
    {
      payment = JSON.parse(payment)
      console.log(payment);
      this.cardForm.patchValue(payment as unknown as { [key: string]: any });
      this.checkoutService.FormValid.next(true)
    }
    
    
  }
}
