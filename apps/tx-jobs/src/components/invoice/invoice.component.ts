import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoicesService } from '../../services/invoices.service';
import { Observable, takeUntil, tap } from 'rxjs';
import { InvoiceDto } from '../../models/invoice';
import { TableComponent } from '@tx/core/ui';
import { DestroyService } from '@tx/core';

@Component({
    selector: 'tx-invoice',
    standalone: true,
    imports: [CommonModule, TableComponent],
    providers: [InvoicesService, DestroyService],
    templateUrl: './invoice.component.html',
    styles: ``,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoiceComponent implements OnInit {
    invoices$: Observable<InvoiceDto[]>;
    visibleHeaders: string[] = [];
    constructor(private invoicesService$: InvoicesService,
                private destroy$: DestroyService) {
        this.invoices$ = this.invoicesService$.getInvoices();
        this.invoices$.pipe(
            tap(invoices => {
                this.visibleHeaders = invoices.length ? Object.keys(invoices[0]) : [];
            }),
            takeUntil(this.destroy$)
        ).subscribe();
    }
    ngOnInit() {
    }
}
