import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.scss']
})
export class UserOrdersComponent {
  userData!:any
  orders!:any
  constructor(private authService:AuthService, private homeService:HomeService){}
  ngOnInit(){
    this.authService.user.subscribe(data=>{
      this.userData = data

      this.homeService.getUserOrders(this.userData.id).subscribe(orders=>{
        console.log(orders);
        this.orders =orders 
      })
    })
  }

}
