import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
    selector: 'news',
    templateUrl: 'news.component.html',
    styleUrls: ['news.component.scss']
})
export class NewsComponent implements OnInit {
    form:FormGroup;
    private config: any;
    news:any = {};
    
    constructor(private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,) { 
        this.form = this.fb.group({
            title: ['', Validators.compose([Validators.required])],
            content: ['',Validators.compose([Validators.required])]
        });
        this.config = {
            toolbarGroups: [
                { 'name': 'basicstyles', 'groups': ['basicstyles'] },
                { 'name': 'links', 'groups': ['links'] },
                { 'name': 'paragraph', 'groups': ['list', 'blocks'] },
                { 'name': 'insert', 'groups': ['insert'] },
                { 'name': 'styles', 'groups': ['styles'] }
            ],
            // Remove the redundant buttons from toolbar groups defined above.
            removeButtons: 'Underline,Strike,Subscript,Superscript,Anchor,Styles,Specialchar',
            extraPlugins: 'divarea'
        };
    }

    ngOnInit() { }
    create(){
        console.log(this.news)
    }
}