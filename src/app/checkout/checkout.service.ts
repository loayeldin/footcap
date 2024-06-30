import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HomeService } from '../services/home.service';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private homeService:HomeService, private authService:AuthService) { }

  totalPrice !:any;
  FormValid = new BehaviorSubject<boolean>(false)
  orderData!:any
  setSotrageData(storageName:any,Data:any)
  {

    localStorage.setItem(storageName, JSON.stringify(Data))
    this.FormValid.next(true)

  }

  submitOrder(userId:any)
  {

    this.homeService.getUserCart(userId).subscribe(cartData=>{
      console.log(cartData);
      this.calculateTotalPrice(cartData)

     
      this.getDataFromStorage(cartData,userId)
      console.log(this.orderData);
      this.homeService.addUserOrder(this.orderData,userId).subscribe(data=>{
        console.log(data);
        
      })
      
     
      
    })

  
   

  }



  calculateTotalPrice(cartData:any)
  {
   
    
    this.totalPrice =cartData.reduce((sum:any,item:any)=> sum + item.totalPrice, 0)
    this.totalPrice = parseFloat(this.totalPrice.toFixed(2))
    console.log(this.totalPrice);
    
   
  }

  getDataFromStorage(cartData:any,userId:any)
  {
    let AddressData = localStorage.getItem('AddressData')
    let payment = localStorage.getItem('payment')
    const id = Date.now().toString();
      let createdAt = this.getCurrentDate()
      console.log(createdAt);
      
    if(AddressData && payment)
    {
      AddressData = JSON.parse(AddressData)
      payment = JSON.parse(payment)
    }    

    this.orderData = {
     userId:userId,
      id:id,
      products: cartData,
      addressData: AddressData,
      payment: payment,
      totalPrice: this.totalPrice,
      createdAt: createdAt,
      status:'pending'
    }

   return this.orderData
    
  }

  getCurrentDate()
  {
    const currentDate = new Date();

    
    const year = currentDate.getFullYear();
    const month = ('0' + (currentDate.getMonth() + 1)).slice(-2); // Adding 1 to month as it is zero-based
    const day = ('0' + currentDate.getDate()).slice(-2);

 
    const hours = ('0' + currentDate.getHours()).slice(-2);
    const minutes = ('0' + currentDate.getMinutes()).slice(-2);
    const seconds = ('0' + currentDate.getSeconds()).slice(-2);

    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

   
    return formattedDateTime;

  }
}
