import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
    selector: 'welcome',
    templateUrl: 'welcome-page.component.html',
    styleUrls: ['welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {
    constructor(private route: ActivatedRoute) {}

    ngOnInit() {}
    onAnchorClick() {
//         this.route.fragment.subscribe(f => {
//             const element = document.querySelector("#" + f)
//             if (element) element.scrollIntoView(element)
//         });
    }
}
