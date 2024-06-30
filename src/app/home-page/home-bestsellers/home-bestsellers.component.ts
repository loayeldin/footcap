import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-home-bestsellers',
  templateUrl: './home-bestsellers.component.html',
  styleUrls: ['./home-bestsellers.component.scss']
})
export class HomeBestsellersComponent {
  constructor(private homeService:HomeService,private http:HttpClient,private router:Router){}

  categories!:any
  prodcuts!:any

  selectedCategory=''


  ngOnInit()
  {
   
   this.homeService.getCategories().subscribe(data=>{
    this.categories = data
    console.log(this.categories);
    
   }) 


   this.homeService.getProductsByCat().subscribe(data=>
    {
      this.prodcuts = data
      console.log(data[0].image);
      
    })
  }



  choosesCategory(cat:string)
  {
    
    this.selectedCategory = cat
    console.log(this.selectedCategory);
    
    this.homeService.getProductsByCat(this.selectedCategory).subscribe(data=>{
      this.prodcuts = data
      console.log(data);
      
    })
    
  }

  openDetails(index:number)
  {
    console.log(this.prodcuts[index]);
    let id = this.prodcuts[index].id 
    this.router.navigate(['product/details',id])
  }






}
