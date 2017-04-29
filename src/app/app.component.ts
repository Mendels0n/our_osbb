import {Component, OnInit} from "@angular/core";
import * as moment from 'moment';



@Component({
    selector: "app",
    templateUrl: "app.html",
    styleUrls:['app.scss']
})
export class AppComponent implements OnInit {
   
    ngOnInit() {
		console.log("Application component initialized ...");
    }
    
}
moment.locale('ru');