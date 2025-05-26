import { ToastOptions } from '@ionic/angular';
import { environment } from 'src/environments/environment';

export const SESSION_STORAGE_TOKEN_KEY = '510adatoken';
export const API_ROOT_URL = environment.apiRootUrl;

export const LOADING_DEBOUNCE_WAIT = 500;

export const TOAST_DELAY = 500;

export const TOAST_OPTIONS: ToastOptions = {
    duration: 1500,
    buttons: ['Dismiss'],
    position: 'middle',
    icon: 'warning-outline',
    translucent: true,
    mode: 'ios',
};
