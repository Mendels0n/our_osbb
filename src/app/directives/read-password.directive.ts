import { Directive, ElementRef, Input, HostListener } from '@angular/core';

@Directive({ 
	selector: '[readPassword]' 
})
export class ReadPasswordDirective {
	@Input() readPassword: any;

	constructor(private el: ElementRef) {
	}

	@HostListener('mouseenter') onMouseEnter() {
		this.change('text');
	}

	@HostListener('mouseleave') onMouseLeave() {
		this.change('password');
	}

	private change(type: string) {
		this.readPassword.type = type;
	}

}
