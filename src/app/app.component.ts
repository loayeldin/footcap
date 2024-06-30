import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'e-commerce-footcap';
  navbarVisible !:any;
  constructor(private authService:AuthService){}
  ngOnInit()
  {
    this.authService.autoLogin()

    this.authService.navbarVisible.subscribe(data=>{
      this.navbarVisible = data
    })
  }
}
