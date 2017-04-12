import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPipe } from './search.pipe';
import { ReversePipe } from './reverse.pipe';
import { SanitizeHtml } from './sanitize-html.pipe'

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        SearchPipe,
        ReversePipe,
        SanitizeHtml
    ],
    exports: [
        SearchPipe,
        ReversePipe,
        SanitizeHtml
    ]
})
export class PipesModule { }