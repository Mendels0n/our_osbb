import { Directive, ElementRef, Input, AfterContentInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Directive({ 
	selector: '[name]' 
})
export class LoadNameDirective implements AfterContentInit {
    @Input() name: any;

    constructor(private el: ElementRef, private userService: UserService) {
    }
    ngAfterContentInit() {
        this.change();
    }
    private change() {
        this.userService.userById(this.name).subscribe(
            data => {
                this.el.nativeElement.innerHTML = `${data.first_name} ${data.last_name}`;
            },
            error =>{
                this.change();
            }
        )
    }

}
