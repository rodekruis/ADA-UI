import { Component, Input } from '@angular/core';
import { addIcons } from 'ionicons';
import { earth } from 'ionicons/icons';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: false,
})
export class HeaderComponent {
    @Input() eventName: string;

    public title = $localize`AUTOMATED DAMAGE ASSESSMENT`;

    constructor() {
        addIcons({ earth });
    }
}
