import { SimpleChanges } from '@angular/core';

const RECENT_WINDOW = 60;

export const isRecent = (date: string | number | Date) => {
    const today = new Date();
    const eventDate = new Date(date);

    const daysSince = Math.floor(
        (today.getTime() - eventDate.getTime()) / 1000 / 60 / 60 / 24,
    );

    return daysSince < RECENT_WINDOW;
};

export const hasEventChanged = (changes: SimpleChanges) => {
    const currentEventId = changes.event.currentValue.id;
    const previousEventId = changes.event.previousValue
        ? changes.event.previousValue.id
        : null;
    return currentEventId !== previousEventId;
};

export default { isRecent, hasEventChanged };
