import { Component } from '@angular/core';
import { HomeService } from '../services/home.service';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  userId!:any
  itemsCount!:any
  totalPrice = 0
  constructor(private toastr: ToastrService,private router:Router,private homeService:HomeService, private authService:AuthService){}

  cartData: any[] = [];  // Initialize as an empty array
  ngOnInit()
  {

    this.authService.user.subscribe(data=>{
      this.userId = data.id
      console.log(this.userId);
      this.getUserCart();
    })
    // this.homeService.getUserCart(this.userId).subscribe(data=>{
    //   console.log(data);
    //   this.cartData = data
    //   this.itemsCount = this.cartData.length
      
    // })
  }


  minus(index:number)
  {
    if( this.cartData[index].quantity >1)
    {
      this.cartData[index].quantity--

      this.cartData[index].totalPrice = this.cartData[index].price * this.cartData[index].quantity
    }
    this.calculateTotalPrice()
    console.log(index);
    console.log(this.cartData);
    
    
  }
  plus(index:number)
  {
    console.log(index);
    this.cartData[index].quantity++
    this.cartData[index].totalPrice = this.cartData[index].price * this.cartData[index].quantity
    this.calculateTotalPrice()
    
  }
  saveCart(userId:any,cartData:any)
  {
    this.homeService.saveUserCart(userId,cartData).subscribe(data=>{
      console.log(data);
      
    })
    console.log(userId,cartData);
    
  }
  remove(userId:any,itemIndex:any)
  {
    this.homeService.removeItemFromCart(userId,itemIndex).subscribe(data=>{
      console.log(data);
      this.getUserCart();
      this.showRemovedSuccess()
    })
  }
  calculateTotalPrice()
  {
   
    
    this.totalPrice = this.cartData.reduce((sum:any,item:any)=> sum + item.totalPrice, 0)
    this.totalPrice = parseFloat(this.totalPrice.toFixed(2))
   
  }

  getUserCart() {
    this.homeService.getUserCart(this.userId).subscribe(data => {
      console.log("User cart data:", data);
      this.cartData = data;
      if(this.cartData == undefined)
      {
        this.itemsCount = 0
        this.cartData= []
      }else
      {
        this.itemsCount = this.cartData.length;
        this.calculateTotalPrice()

      }
    });
  }


  showRemovedSuccess() {
    this.toastr.success('product is removed successfully!', 'success!',
    {
      timeOut: 1500,
      disableTimeOut:false,
      progressBar:true,
    
    }).onHidden.subscribe(() => {
      // Additional logic to execute after toast is hidden
    
     
    });
  }

  showError() {
    this.toastr.error('An error occurred!');
  }
}
