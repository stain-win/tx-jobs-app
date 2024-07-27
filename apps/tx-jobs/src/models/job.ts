import { Invoice } from './invoice';

export interface JobAd {
    id: string;
    /**
     * Title of a job ad. Required property.
     * It's not allowed to have two job ads with the same title.
     */
    title: string;
    /**
     * Description of a job ad. Required property.
     * Its length should not be less than 10 characters.
     */
    description: string;
    /**
     * List of skills required for a job ad.
     */
    skills: string[];
    /**
     * When a job ad has a "draft" status, it can be switched to "published" or "archived".
     * When a job ad has a "published" status, it can be only switched to "archived".
     * When a job ad has an "archived" status, it cannot be updated.
     */
    status: JobAdStatus;
}
export const JobAdStatus = {
    DRAFT: 'draft',
    PUBLISHED: 'published',
    ARCHIVED: 'archived'
}
export type JobAdStatus = typeof JobAdStatus[keyof typeof JobAdStatus];

export interface JobAdDto extends JobAd {
    // DTO properties that are not part of the model
    createdAt: string;
    updatedAt: string;
    invoices: Invoice[];
}
