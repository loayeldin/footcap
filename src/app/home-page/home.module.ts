
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HomeServicesComponent } from "../home-services/home-services.component";
import { ProductDetailsComponent } from "../product-details/product-details.component";
import { HomeBestsellersComponent } from "./home-bestsellers/home-bestsellers.component";
import { HomeCollectionComponent } from "./home-collection/home-collection.component";
import { HomeHeaderComponent } from "./home-header/home-header.component";
import { HomeOffersComponent } from "./home-offers/home-offers.component";
import { HomePageComponent } from "./home-page.component";
import { HomeTrendingComponent } from "./home-trending/home-trending.component";
import { HttpClientModule } from "@angular/common/http";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { HomeFooterComponent } from "./home-footer/home-footer.component";
import { HomeRoutingModule } from "./home-routing.module";

@NgModule({
    declarations:[
        HomePageComponent,
        HomeHeaderComponent,
        HomeCollectionComponent,
        HomeBestsellersComponent,
        HomeOffersComponent,
        HomeTrendingComponent,
        HomeServicesComponent,
        HomeFooterComponent,
        
    ],
    imports:[
        FormsModule,
        HttpClientModule,
        FontAwesomeModule,
        CommonModule,
        HomeRoutingModule
     
    ]
})


export class HomeModule{}