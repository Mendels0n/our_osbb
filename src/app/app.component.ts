import {Component, OnInit} from "@angular/core";

@Component({
    selector: "app",
    templateUrl: "app.html",
    styleUrls:['app.scss']
})
export class AppComponent implements OnInit {
	title:string;
    ngOnInit() {
		console.log("Application component initialized ...");
		this.title = "Hello world!"
    }
}
