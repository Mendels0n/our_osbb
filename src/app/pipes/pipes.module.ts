import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPipe } from './search.pipe';
import { ReversePipe } from './reverse.pipe';
import { SanitizeHtml } from './sanitize-html.pipe'
import { SortForDatePipe } from './sort-for-date.pipe';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        SearchPipe,
        SortForDatePipe,
        ReversePipe,
        SanitizeHtml
    ],
    exports: [
        SearchPipe,
        SortForDatePipe,
        ReversePipe,
        SanitizeHtml
    ]
})
export class PipesModule { }