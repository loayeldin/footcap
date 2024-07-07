import { NgModule } from '@angular/core';
import { PreloadAllModules,RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'',redirectTo:'/home',pathMatch:'full'},

  {path:'home',
  loadChildren:()=> import('./home-page/home.module')
  .then(m=>m.HomeModule)},



  { 
    path: 'product', 
    loadChildren: () => import('./product-details/product-details.module').then(m => m.ProductDetailsModule) 
  },


  {path:'auth',
  loadChildren:()=> import('./auth/auth.module')
  .then(m=>m.AuthModule)},





    {path:'admin',
    loadChildren:()=> import('./admin/admin.module')
    .then(m=>m.AdminModule)},


 
  {path:'cart',
    loadChildren:()=> import('./cart/cart.module')
    .then(m=>m.CartModule)},

    {path:'orders',
    loadChildren:()=> import('./user-orders/user-orders.module')
    .then(m=>m.UserOrdersModule)},



  { path: 'checkout',
   loadChildren: () => import('./checkout/checkout.module')
   .then(m => m.CheckoutModule) },
  




];

@NgModule({
  imports: [RouterModule.forRoot(routes,{preloadingStrategy:PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
