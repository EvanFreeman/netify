import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {FormArray, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-compose-field-body',
  templateUrl: './compose-field-body.component.html',
  styleUrls: ['./compose-field-body.component.css'],
	encapsulation: ViewEncapsulation.ShadowDom
})
export class ComposeFieldBody implements OnInit {

	@Input() fieldSet: FormArray;

  constructor() { }

  ngOnInit() {
  }

  private addHeaders() {
		this.fieldSet.push(new FormGroup({
			name: new FormControl(''),
			value: new FormControl(''),
		}));
	}
  private removeHeaders(index: number) {
		this.fieldSet.removeAt(index);
	}
}
