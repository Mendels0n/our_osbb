import { Directive, ElementRef, Input, AfterContentInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';   


@Directive({ 
	selector: '[loadNames]' 
})
export class LoadNameDirective implements AfterContentInit {
    @Input("loadNames") id: any;

    constructor(private el: ElementRef, private userService: UserService, private router:Router) {
    }
    ngAfterContentInit() {
            this.change();
    }
    private change() {
        if (this.id !== undefined) {
            this.userService.userById(this.id).subscribe(
                data => {
                    this.el.nativeElement.innerHTML = `${data.first_name} ${data.last_name}`;
                },
                error => {
                }
            )
        }else{
           setTimeout(()=>{this.change()},1000);
        }
    }

    @HostListener('click') navigateProfile(){
        if(this.id !== undefined){
            this.router.navigate(['/profile', this.id]);
        }
    }
}
