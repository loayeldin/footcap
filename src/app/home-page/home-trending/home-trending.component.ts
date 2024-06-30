import { Component, ElementRef, Renderer2 } from '@angular/core';

declare var $:any
@Component({
  selector: 'app-home-trending',
  templateUrl: './home-trending.component.html',
  styleUrls: ['./home-trending.component.scss']
})
export class HomeTrendingComponent {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
 
  }
  products = [

    {
      category: "electronics" ,
      description: "USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity; Compatibility Formatted NTFS for Windows 10, Windows 8.1, Windows 7; Reformatting may be required for other operating systems; Compatibility may vary depending on user’s hardware configuration and operating system",
      id: "9",
      image: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
      price:64,
      rating: {rate: 3.3, count: 203},
      title: "WD 2TB Elements Portable External Hard Drive - USB 3.0 "
    },
    {
      category: "electronics" ,
      description: "USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity; Compatibility Formatted NTFS for Windows 10, Windows 8.1, Windows 7; Reformatting may be required for other operating systems; Compatibility may vary depending on user’s hardware configuration and operating system",
      id: "9",
      image: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
      price:64,
      rating: {rate: 3.3, count: 203},
      title: "WD 2TB Elements Portable External Hard Drive - USB 3.0 "
    },
    {
      category: "electronics" ,
      description: "USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity; Compatibility Formatted NTFS for Windows 10, Windows 8.1, Windows 7; Reformatting may be required for other operating systems; Compatibility may vary depending on user’s hardware configuration and operating system",
      id: "9",
      image: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
      price:64,
      rating: {rate: 3.3, count: 203},
      title: "WD 2TB Elements Portable External Hard Drive - USB 3.0 "
    }
  ]





}
