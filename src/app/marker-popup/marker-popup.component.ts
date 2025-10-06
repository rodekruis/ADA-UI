import { formatDate } from '@angular/common';
import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { addIcons } from 'ionicons';
import { close, eye, eyeOff, warningOutline } from 'ionicons/icons';

import { ApiService } from '../api.service';
import { SESSION_STORAGE_TOKEN_KEY } from '../app.config';
import { Event, EventAccess } from '../event/event.type';

@Component({
    selector: 'app-marker-popup',
    templateUrl: './marker-popup.component.html',
    styleUrls: ['./marker-popup.component.scss'],
    standalone: false,
})
export class MarkerPopupComponent implements OnInit {
    @Input() event: Event;

    @HostBinding('class.recent') recent = false;

    public startDate: string;

    public restricted = false;
    public loading = false;

    public form = new FormGroup({
        password: new FormControl({ value: '', disabled: this.loading }),
    });

    constructor(
        private apiService: ApiService,
        private route: Router,
    ) {
        addIcons({
            close,
            'warning-outline': warningOutline,
            'eye-off': eyeOff,
            eye,
        });
    }

    ngOnInit() {
        this.recent = this.event.recent;
        this.restricted = this.event.access === EventAccess.restricted;
        this.startDate = formatDate(this.event.startDate, 'mediumDate', 'en');
    }

    onSubmit() {
        if (this.form.valid) {
            if (this.restricted) {
                this.loading = true;
                this.apiService
                    .getEventToken(
                        this.event.id,
                        this.form.get('password').value,
                    )
                    .pipe(finalize(() => (this.loading = false)))
                    .subscribe(
                        (response) => {
                            sessionStorage.setItem(
                                SESSION_STORAGE_TOKEN_KEY,
                                response.message,
                            );
                            this.closePopup(['/events', this.event.id]);
                        },
                        (response) =>
                            this.form
                                .get('password')
                                .setErrors({ error: response.error.message }),
                    );
            } else {
                this.closePopup(['/events', this.event.id]);
            }
        }
    }

    closePopup = (route: any[]) => {
        this.event.marker.closePopup();
        this.route.navigate(route);
    };
}
