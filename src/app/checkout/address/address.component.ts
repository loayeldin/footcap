import { Component, Injectable } from '@angular/core';
import{FormBuilder,FormControl,FormGroup,Validators} from '@angular/forms';
import { CheckoutComponent } from '../checkout.component';
import { CheckoutService } from '../checkout.service';
@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
@Injectable({
  providedIn: 'root'
})
export class AddressComponent {
  constructor(private checkoutService:CheckoutService,){}

  addressForm:FormGroup = new FormGroup({
    firstName: new FormControl(null, Validators.required),
    lastName: new FormControl(null,Validators.required),
    phoneNumber: new FormControl(null, [Validators.pattern(/^\+\d{2}\d{9,}$/),Validators.required] ),
    additionalPhoneNumber: new FormControl(null,[Validators.pattern(/^\+\d{2}\d{9,}$/)]),
    streetAdress: new FormControl(null, Validators.required),
    city: new FormControl(null,Validators.required),
    District: new FormControl(null,Validators.required),
  })

  ngOnInit()
  {
    this.getStorageData()
  }

  submit()
  {
    
    console.log(this.addressForm.value);
    // localStorage.setItem('AddressData', JSON.stringify(this.addressForm.value))
    this.checkoutService.setSotrageData('AddressData',this.addressForm.value)
    
  }

  getStorageData()
  {
    let addressData = localStorage.getItem('AddressData')
    console.log(addressData);
    
    if(addressData)
    {
      addressData = JSON.parse(addressData)
      console.log(addressData);
      this.addressForm.patchValue(addressData as unknown as { [key: string]: any });
      this.checkoutService.FormValid.next(true)
    }
    
    
  }
 
}
