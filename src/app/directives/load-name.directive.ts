import { Directive, ElementRef, Input, AfterContentInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Directive({ 
	selector: '[loadNames]' 
})
export class LoadNameDirective implements AfterContentInit {
    @Input() loadNames: any;

    constructor(private el: ElementRef, private userService: UserService) {
    }
    ngAfterContentInit() {
            this.change();
    }
    private change() {
        if (this.loadNames !== undefined) {
            this.userService.userById(this.loadNames).subscribe(
                data => {
                    this.el.nativeElement.innerHTML = `${data.first_name} ${data.last_name}`;
                },
                error => {
                    this.change();
                }
            )
        }else{
           setTimeout(()=>{this.change()},500);
        }
    }

}
