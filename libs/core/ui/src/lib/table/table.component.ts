import {
    ChangeDetectionStrategy,
    Component,
    Input, OnInit,
    TemplateRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatCell, MatCellDef,
    MatColumnDef,
    MatHeaderCell, MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow, MatRowDef,
    MatTable
} from '@angular/material/table';
import { HighlightPipe, ObjectUtil } from '@tx/core';
import { union } from 'lodash';

@Component({
    selector: 'txc-table',
    standalone: true,
    imports: [CommonModule, MatColumnDef, MatHeaderCell, MatCell, MatHeaderRow, MatRow, MatHeaderRowDef, MatRowDef, MatHeaderCellDef, MatTable, MatCellDef, HighlightPipe],
    templateUrl: './table.component.html',
    styles: `.mat-mdc-row { @apply px-4 py-2 h-14; } .mat-mdc-header-row { @apply bg-gray-200; }`,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent<T> implements OnInit {
    @Input() dataSource: T[] = [];
    @Input() displayedColumns: string[] = [];
    @Input({ transform: (value: Record<string, TemplateRef<any>>): Map<string, TemplateRef<any>> =>
            ObjectUtil.objectToMap(value) as Map<string, TemplateRef<any>>}) customColTemplates: Map<string, TemplateRef<any>> = new Map<string, TemplateRef<any>>();
    @Input() ActionColumns: string[] = [];
    @Input() highlightSearchTerm: string = '';

    ngOnInit() {
        this.displayedColumns = union(this.displayedColumns, this.ActionColumns);
    }
}
