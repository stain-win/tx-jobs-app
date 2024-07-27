import { JobAdDto } from './job';

export interface Invoice {
    id: string;
    jobId: string;
    amount: string; // up to you
    dueDate: string;
}

export interface InvoiceDto extends Invoice {
    // DTO properties that are not part of the model
    createdAt: string;
    updatedAt: string;
    job: JobAdDto | {};
}
