import { Pipe, PipeTransform } from '@angular/core';
import { filter } from 'rxjs';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], filters: { name: string, id: string,status:string , date:string}): any[] {
    if (!items) return [];
    // if (!filters.name && !filters.id) return items;

    if (filters.name) {
      items = items.filter(item =>
        (item.addressData.firstName.toLowerCase().includes(filters.name.toLowerCase()) ||
         item.addressData.lastName.toLowerCase().includes(filters.name.toLowerCase()))
      );
    }

    if (filters.id) {
      const trimmedId = filters.id.trim(); // Trim whitespace from filters.id
      items = items.filter(item =>
        item.id.toLowerCase() === trimmedId.toLowerCase()
      );
    }

    if (filters.status !=="All"){
      console.log("wwwww" , filters.status);
      
      items = items.filter(item =>
        item.status.toLowerCase() === filters.status.toLowerCase()
      );

    }

    if (filters.date) {
  
      
      items = items.filter(item =>
        item.createdAt.split(' ')[0] === filters.date // Assuming createdAt is in "YYYY-MM-DD HH:mm:ss" format
      );
    }
    console.log(items);
    

    return items;
  }

}





