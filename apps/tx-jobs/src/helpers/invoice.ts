import { InvoiceDto } from '../models/invoice';
import moment from 'moment';
import { createPostBody, randomNumber } from './api-helper';

export function invoiceBody(jobId: string, invoiceData: Partial<InvoiceDto>): string {
    invoiceData.jobId = jobId;
    invoiceData.amount =  `${randomNumber(100, 1000).toString()}$`;
    invoiceData.dueDate = moment().add(1, 'M').endOf("month").format();

    if(invoiceData.id === '' || invoiceData.id === undefined) {
        delete invoiceData.id;
    }

    return createPostBody<Partial<InvoiceDto>>(invoiceData);
}
