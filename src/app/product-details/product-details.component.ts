import { Component } from '@angular/core';
import { HomeService } from '../services/home.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {
  quantity:number = 1;
  productprice!:number;
  totalPrice!:number
  productId!:any;
  prodctDetails!:any
  loggedIn = false
  userData!:any
constructor(private toastr: ToastrService,private router:Router,private authService:AuthService,private homeSerivce:HomeService,private route:ActivatedRoute){}
ngOnInit()
{
  this.productId =this.route.snapshot.paramMap.get('id')
  console.log(this.productId);
  
  this.homeSerivce.getProductDetails(this.productId).subscribe(data=>{
    console.log(data);
    this.prodctDetails = data
    console.log(this.prodctDetails.price);
    
    this.productprice = this.prodctDetails.price
    this.totalPrice = this.productprice
  })

  this.authService.user.subscribe(data=>{
    this.userData = data
    console.log(this.userData);
    
  })

  this.authService.loggedIn.subscribe(data=>{
    this.loggedIn = data
    console.log(this.loggedIn);
    
  })
  
}



  add()
  {
    this.quantity++
    this.totalPrice = this.quantity * this.productprice
    
  }
  minus()
  {
    if(this.quantity>1)
    {
      this.quantity--
      this.totalPrice = this.quantity * this.productprice

    }
  }

  addToCart()
  {
  
    
    console.log(
      this.prodctDetails,
      {price:this.totalPrice}
    );
    this.prodctDetails['totalPrice'] = this.totalPrice
    this.prodctDetails['quantity'] = this.quantity

    console.log(this.userData);
    
    const userObject = {
      userInfo:{
        id: this.userData.id,
        name:this.userData.name,
        email:this.userData.email,
        token:this.userData.token

       
      },
      cart:[],
      orders:[]
    }
    console.log(userObject);
    
    this.homeSerivce.addProductToCart(  
     
      
      userObject,
      this.prodctDetails
      
      
      ).subscribe(res=>{
        console.log(res);
        // this.homeSerivce.getCart().subscribe(data=>{console.log(data);
        // })
        this.showSuccess()
      })


     
  }









  showSuccess() {
    this.toastr.success('product is added to cart !', 'success!',
    {
      timeOut: 1500,
      disableTimeOut:false,
      progressBar:true,
    
    }).onHidden.subscribe(() => {
      // Additional logic to execute after toast is hidden
    
      this.router.navigate(['/cart'])
      // Call another method or perform another action here
    });
  }
  showError() {
    this.toastr.error('An error occurred!');
  }
}
