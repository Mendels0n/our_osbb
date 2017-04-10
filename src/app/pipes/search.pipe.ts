import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'search',
    pure: false
})
export class SearchPipe implements PipeTransform {
    transform(items: any, term: any): any {
        if (term === undefined) return items;
        return items.filter((item: any) =>
            (item.country.toLowerCase().includes(term.toLowerCase()) ||
                item.city.toLowerCase().includes(term.toLowerCase()) || item.street.toLowerCase().includes(term.toLowerCase())))
    }
}