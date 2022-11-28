import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { Event, EventAccess } from '../event/event.type';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { SESSION_STORAGE_TOKEN_KEY } from '../app.config';

@Component({
  selector: 'app-marker-popup',
  templateUrl: './marker-popup.component.html',
  styleUrls: ['./marker-popup.component.scss'],
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

  constructor(private apiService: ApiService, private route: Router) {}

  ngOnInit() {
    this.recent = this.event.recent;
    this.restricted = this.event.access === EventAccess.private;
    this.startDate = formatDate(this.event.startDate, 'mediumDate', 'en');
  }

  onSubmit() {
    if (this.form.valid) {
      if (this.restricted) {
        this.loading = true;
        this.apiService
          .getEventToken(this.event.id, this.form.get('password').value)
          .pipe(finalize(() => (this.loading = false)))
          .subscribe(
            (token) => {
              sessionStorage.setItem(SESSION_STORAGE_TOKEN_KEY, token);
              this.event.marker.closePopup();
              this.route.navigate(['/events', this.event.id]);
            },
            (error) => this.form.get('password').setErrors({ error })
          );
      } else {
        this.event.marker.closePopup();
        this.route.navigate(['/events', this.event.id]);
      }
    }
  }
}
