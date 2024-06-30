
import { NgModule } from "@angular/core";
import { AuthRoutingModule } from "./auth-routing-module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { AuthComponent } from "./auth/auth.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";

@NgModule({
    declarations:[
        LoginComponent,
        RegisterComponent,
        AuthComponent,
    ],
    imports:[
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        AuthRoutingModule
    ]
})


export class AuthModule{}