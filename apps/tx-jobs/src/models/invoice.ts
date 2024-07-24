export interface Invoice {
    id: number;
    jobAdId: number;
    amount: unknown; // up to you
    dueDate: Date;
}

interface InvoiceDto extends Invoice {
    // DTO properties that are not part of the model
    createdAt: Date;
    updatedAt: Date;
    _embedded: unknown;
}
