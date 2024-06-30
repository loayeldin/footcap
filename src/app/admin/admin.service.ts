import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }
   Data = new BehaviorSubject<any>(null);


  getAllData():Observable<any>
  {
    return this.http.get('https://e-commerce-acec8-default-rtdb.firebaseio.com/users.json')
  }

  getOrderById(id: any): Observable<any> {
    return this.Data.pipe(
      map((orders: any[]) => {
        for (const order of orders) {
          if (order.orders) {
            const filteredOrders = order.orders.find((orderItem: any) => orderItem.id === id);
            if (filteredOrders) {
              return filteredOrders; // Return the found order
            }
          }
        }
        return null; // Return null if order with specified ID is not found
      })
    );
  }







  saveUpdatedOrder(userId:any,userOrder:any):Observable<any>
  {
    console.log(userId,userOrder);
    
    return this.http.get('https://e-commerce-acec8-default-rtdb.firebaseio.com/users.json').pipe(
      switchMap((userData:any)=>{
        const existingUsersArray = Object.values(userData);
      
        
        const existingUser = existingUsersArray.find((data:any)=> data.userInfo.id === userId)
        const existingUserIndex = existingUsersArray.findIndex((data: any) => data.userInfo.id === userId);
        if(existingUser)
        {
         
        
          const userToUpdate:any = existingUsersArray[existingUserIndex]
       
          
          let getOrder = userToUpdate.orders.find((data:any)=>data.id === userOrder.id)
          let getOrderIndex = userToUpdate.orders.findIndex((data:any)=>data.id === userOrder.id)
      
          userToUpdate.orders[getOrderIndex] = userOrder

          console.log(existingUsersArray);
          
      
         
        }
        return this.http.put(`https://e-commerce-acec8-default-rtdb.firebaseio.com/users.json`, existingUsersArray);
    
        
      
      })
    )
  }









}
