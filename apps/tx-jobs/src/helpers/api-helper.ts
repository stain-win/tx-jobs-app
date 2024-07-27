import moment from 'moment';

interface Timestamped {
    createdAt?: string | null;
    updatedAt?: string | null;
}

export function createPostBody<T extends Timestamped>(bodyData: T): string {
    const now = moment().format();
    if (!bodyData.createdAt || bodyData.createdAt === '') {
        bodyData.createdAt = now;
    }

    bodyData.updatedAt = now;
    return JSON.stringify(bodyData);
}

export function randomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
