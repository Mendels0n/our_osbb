import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'sortForDate',
    pure: false
})
export class SortForDatePipe implements PipeTransform {
    transform(items: any, term: string): any {
        if (term === undefined) return items;
        if (term == 'all') {
            return items;
        } else if (term == 'new') {
            return items.filter((item: any) => (this.checkDate(item.end_date, 'new')))
        }else if ( term == 'old'){
            return items.filter((item: any) => (this.checkDate(item.end_date, 'old')))
        }else if (term == 'news') {
            return items.filter((item: any) => (this.checkDate(item.created_at, 'news')))
        }
    }
    checkDate(date: string, params:string) {
        let nowDate = new Date();
        let endDate = new Date(date);
        if(params == 'new'){
            return (nowDate >= endDate ) ? false : true;            
        }else if(params == 'old'){
            return (nowDate >= endDate ) ? true : false;
        }else if(params == 'news'){
            let nowDateMinutes = nowDate.getTime(),
            createDateMinutes = endDate.getTime();
            return ((nowDateMinutes - createDateMinutes) < 86400000) ? true : false;
        }
    }
}