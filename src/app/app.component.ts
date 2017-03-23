import {Component, OnInit} from "@angular/core";

@Component({
    selector: "app",
    templateUrl: "app.html",
    styleUrls:['app.scss']
})
export class AppComponent implements OnInit {
    public isCollapsed:boolean = true;
	title:string;

    ngOnInit() {
		console.log("Application component initialized ...");
		this.title = "Твое ОСББ"
    }
    public collapsed(event:any):void {
    }
    public expanded(event:any):void {
    }
}
