import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle
} from '@angular/material/dialog';

@Component({
    selector: 'tx-confirm-dialog',
    standalone: true,
    imports: [ MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
    templateUrl: './confirm-dialog.component.html',
    styles: ``,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDialogComponent {
    readonly dialogRef = inject(MatDialogRef<ConfirmDialogComponent>);
}
