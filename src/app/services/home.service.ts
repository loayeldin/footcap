import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http:HttpClient) { }
 
  userId!:any
  getCategories(): Observable<any>
  {
    return this.http.get("https://fakestoreapi.com/products/categories");
  }

  getProductsByCat(cat:string=""): Observable<any>
  {
    console.log(cat);
    if(cat !="")
    {
      return this.http.get(`https://fakestoreapi.com/products/category/${cat}`)
    }
    else
    {
      return this.http.get("https://fakestoreapi.com/products");

    }
  }

  getProductDetails(id:number):Observable<any>
  {
    return this.http.get(`https://fakestoreapi.com/products/${id}`)
  }

  addProductToCart(newUserData: any,productDetails:any): Observable<any> {


 return this.http.get(`https://e-commerce-acec8-default-rtdb.firebaseio.com/users.json`).pipe(
    switchMap((userData: any) => {
      // Ensure userData is not 'unknown' and is an object before proceeding
      if (typeof userData === 'object' && userData !== null) {
        const existingUserArray = Object.values(userData);
        const existingUser = existingUserArray.find((user: any) => user?.userInfo?.id === newUserData.userInfo.id);
        const userIndex = existingUserArray.findIndex((user: any) => user?.userInfo?.id === newUserData.userInfo.id);

        if (existingUser) {
          // Update the existing user's cart
        
          const userToUpdate: any = existingUserArray[userIndex];
          // Update the existing user's cart
          console.log(existingUserArray[userIndex]);
          userToUpdate.cart = Array.isArray(userToUpdate.cart) ? userToUpdate.cart : []; // to convert the cart proprty if he empty and string

          userToUpdate.cart.push(productDetails);
          
          
        } else {
          // Create a new user with the product
          newUserData.cart = [productDetails];
          console.log(newUserData);
          
          existingUserArray.push(newUserData);
        }

        // Update the Firebase data with the modified array
        return this.http.put(`https://e-commerce-acec8-default-rtdb.firebaseio.com/users.json`, existingUserArray);
      } else {
       
        const existingUserArray: any[] = [];
        newUserData.cart = [productDetails];
        existingUserArray.push(newUserData);

        // Update the Firebase data with the modified array
        return this.http.put(`https://e-commerce-acec8-default-rtdb.firebaseio.com/users.json`, existingUserArray);
      }
    })
  );








  }
  

  getUserCart(userId:any):Observable<any>
  {
    return this.http.get('https://e-commerce-acec8-default-rtdb.firebaseio.com/users.json').pipe(
      map((cartData:any )=>{
        const existingUserCart = cartData.find((data:any)=> data.userInfo.id === userId)
        
          return existingUserCart? existingUserCart.cart : []
       
      })
    )
  }
  saveUserCart(userId:any,userCart:any):Observable<any>
  {
    return this.http.get('https://e-commerce-acec8-default-rtdb.firebaseio.com/users.json').pipe(
      switchMap((userData:any)=>{
        const existingUsersArray = Object.values(userData);
        console.log(existingUsersArray);
        
        const existingUser = existingUsersArray.find((data:any)=> data.userInfo.id === userId)
        const existingUserIndex = existingUsersArray.findIndex((data: any) => data.userInfo.id === userId);
        if(existingUser)
        {
          console.log(existingUsersArray[existingUserIndex]);
          const userToUpdate:any = existingUsersArray[existingUserIndex]

         userToUpdate.cart = userCart
         console.log(existingUsersArray);
         
        }
        return this.http.put(`https://e-commerce-acec8-default-rtdb.firebaseio.com/users.json`, existingUsersArray);

      
      })
    )
  }


  removeItemFromCart(userId:any,itemIndex:any):Observable<any>
  {
    return this.http.get('https://e-commerce-acec8-default-rtdb.firebaseio.com/users.json').pipe(
      switchMap((userData:any)=>{
        const existingUsersArray = Object.values(userData);
        console.log(existingUsersArray);
        
        const existingUser = existingUsersArray.find((data:any)=> data.userInfo.id === userId)
        const existingUserIndex = existingUsersArray.findIndex((data: any) => data.userInfo.id === userId);
        if(existingUser)
        {
          console.log(existingUsersArray[existingUserIndex], existingUserIndex);
          const userToUpdate:any = existingUsersArray[existingUserIndex]
          console.log(userToUpdate.cart);
          userToUpdate.cart.splice(itemIndex,1)
          console.log(Array.isArray(userToUpdate.cart));
          console.log( userToUpdate.cart);
          if(userToUpdate.cart.length === 0 )
          {
            userToUpdate.cart = [];// to stay this proprty in firebase without removing if it empty
            existingUsersArray[existingUserIndex] = userToUpdate
          }
          
          
          console.log(existingUsersArray);
         
        }
        return this.http.put(`https://e-commerce-acec8-default-rtdb.firebaseio.com/users.json`, existingUsersArray);
      
      })
    )
  
    
  }


  addUserOrder(userOrder:any,userId:any):Observable<any>
  {




        
    return this.http.get(`https://e-commerce-acec8-default-rtdb.firebaseio.com/users.json`).pipe(
      switchMap((userData: any) => {
        // Ensure userData is not 'unknown' and is an object before proceeding
        if (typeof userData === 'object' && userData !== null) {
          const existingUserArray = Object.values(userData);
          const existingUser = existingUserArray.find((user: any) => user?.userInfo?.id === userId);
          const userIndex = existingUserArray.findIndex((user: any) => user?.userInfo?.id === userId);

            if (existingUser) {
          
            console.log(existingUserArray[userIndex]);
            const userToUpdate: any = existingUserArray[userIndex];

              
           
              console.log(existingUserArray[userIndex]);
              userToUpdate.orders = Array.isArray(userToUpdate.orders) ? userToUpdate.orders : [];
           
              userToUpdate.cart = []
            
              userToUpdate.orders.push(userOrder);
              
              
            } else {
            
              console.log("hello");
              
            }
            console.log(existingUserArray);
            
          // Update the Firebase data with the modified array
          return this.http.put(`https://e-commerce-acec8-default-rtdb.firebaseio.com/users.json`, existingUserArray);
        } else {
          
        
          return userData;
        }
      })
    );


  }


  getUserOrders(userId:any):Observable<any>
  {
    return this.http.get('https://e-commerce-acec8-default-rtdb.firebaseio.com/users.json').pipe(
      map((cartData:any )=>{
        const existingUserOrders = cartData.find((data:any)=> data.userInfo.id === userId)
        
          return existingUserOrders? existingUserOrders.orders : []
       
      })
    )
  }

}
