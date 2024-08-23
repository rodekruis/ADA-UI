import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
    @Input() eventName: string;

    public title = $localize`AUTOMATED DAMAGE ASSESSMENT`;

    constructor() {}
}
