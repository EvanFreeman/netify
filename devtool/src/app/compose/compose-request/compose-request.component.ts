import {Component, Input, ViewEncapsulation} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
	selector: 'app-compose-request',
	templateUrl: './compose-request.component.html',
	styleUrls: ['./compose-request.component.css'],
	encapsulation: ViewEncapsulation.ShadowDom
})
export class ComposeRequestComponent {

	@Input() fieldSet: FormGroup;

	constructor() {
	}
}
