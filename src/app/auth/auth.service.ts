import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from './user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  navbarVisible = new BehaviorSubject<boolean>(true);
  
  constructor(private http:HttpClient,private router:Router) { }
  user = new BehaviorSubject<User>({} as User);
  loggedIn = new BehaviorSubject<boolean>(false);


  register(form:any):Observable<any>
  {
    return this.http.post(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCd3qh9oq5KsrbGKGuKp1VGbVVZ5XdQ4LY',
    form)
  }
  login(form:any):Observable<any>
  {
    return this.http.post(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCd3qh9oq5KsrbGKGuKp1VGbVVZ5XdQ4LY',
      {
        email:form.email,
        password:form.password,
        returnSecureToken:true
      }).pipe(
        tap(
          resData=>{
            this.handleLogin(resData)
          }
        )
      )
  }

  handleLogin(resData:any)
  {
    console.log(resData);
    
    this.user.next(resData)
    const newUser = new User(resData.localId,resData.idToken,resData.displayName,resData.email)
      this.user.next(newUser)
    this.loggedIn.next(true)
    this.setLocalStorage(resData)
    if(resData.localId =='x7KfU2zJPtf3CHprvhuPP13lz3U2')
    {
      this.router.navigate(['/admin'])
    }else{
      this.router.navigate(['/home'])

    }

  }
  

  setLocalStorage(resData:any)
  {
    localStorage.setItem('id',resData.localId)
    localStorage.setItem('name',resData.displayName)
    localStorage.setItem('token',resData.idToken)
    localStorage.setItem('email',resData.email)
   
  }
  LogOut()
  {
    this.user.next(<User>({}));
    this.loggedIn.next(false)

    localStorage.clear()
    this.router.navigate(['/auth']) // auth
  }
  autoLogin()
  {

    let token = localStorage.getItem('token')
    let id = localStorage.getItem('id')

    let name = localStorage.getItem('name')
    let email = localStorage.getItem('email')


    if(!id || !token || !name || !email)
    {
      this.LogOut()

    }else
    {
      const newUser = new User(id,token,name,email)
      this.user.next(newUser)
      this.loggedIn.next(true)


    }


  }


}
