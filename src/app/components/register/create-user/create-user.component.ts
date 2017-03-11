import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import {OsbbService} from "../../../service/osbb.service";
import {OSBB} from "../../../models/osbb.model";

@Component({
	selector: 'create-user',
	templateUrl: 'create-user.component.html',
	styleUrls:['create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
	osbbID:number;
	data:OSBB;
	constructor(private route: ActivatedRoute, private service: OsbbService) {}

	ngOnInit() {
		this.osbbID = this.route.snapshot.params['id'];
		this.service.getOsbbb(this.osbbID).subscribe(
			data => {
				this.data = data;
			})
	}
}