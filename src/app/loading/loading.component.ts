import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import debounce from 'lodash.debounce';
import { LOADING_DEBOUNCE_WAIT } from '../app.config';

@Component({
    selector: 'app-loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnChanges {
    @Input() loading = true;
    @Input() message = '';

    public debouncedLoading = this.loading;

    private setLoading = debounce(
        (loading) => (this.debouncedLoading = loading),
        LOADING_DEBOUNCE_WAIT,
    );

    constructor() {}

    ngOnChanges(changes: SimpleChanges) {
        if ('loading' in changes) {
            this.setLoading(changes.loading.currentValue);
        }
    }
}
