import {ChangeDetectionStrategy, Component} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'tx-invoice',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './invoice.component.html',
    styles: ``,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoiceComponent {}
