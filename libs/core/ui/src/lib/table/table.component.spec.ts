import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableComponent } from '@tx/core/ui';
import { By } from '@angular/platform-browser';
import { HighlightPipe, ObjectUtil } from '@tx/core';
import { CommonModule } from '@angular/common';
import { MatColumnDef, MatHeaderCell, MatCell, MatHeaderRow, MatRow, MatHeaderRowDef, MatRowDef, MatHeaderCellDef, MatTable, MatCellDef } from '@angular/material/table';
import { ChangeDetectorRef, TemplateRef } from '@angular/core';

describe('TableComponent', () => {
    let component: TableComponent<any>;
    let fixture: ComponentFixture<TableComponent<any>>;
    let cdRef: ChangeDetectorRef;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TableComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TableComponent);
        component = fixture.componentInstance;
        cdRef = fixture.componentRef.injector.get(ChangeDetectorRef);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize displayedColumns with ActionColumns', () => {
        component.ActionColumns = ['action1', 'action2'];
        component.ngOnInit();
        expect(component.displayedColumns).toContain('action1');
        expect(component.displayedColumns).toContain('action2');
    });

    it('should render data rows', () => {
        component.dataSource = [{ id: 1, name: 'Test' }];
        component.displayedColumns = ['id', 'name'];
        cdRef.detectChanges();
        const rows = fixture.debugElement.queryAll(By.css('.mat-mdc-row'));
        expect(rows.length).toBe(1);
    });

    it('should apply highlight pipe to search term', () => {
        component.highlightSearchTerm = 'Test';
        fixture.detectChanges();
        const pipe = new HighlightPipe();
        const result = pipe.transform('This is a Test string', 'Test');
        expect(result).toBe('This is a <span class="font-highlight">Test</span> string');
    });

    it('should transform customColTemplates input to Map', () => {
        const templateRef = {} as TemplateRef<any>;
        const customColTemplates = new Map<string, TemplateRef<any>>();
        customColTemplates.set('col1', templateRef);
        component.customColTemplates = customColTemplates;
        fixture.detectChanges();
        expect(component.customColTemplates instanceof Map).toBe(true);
        expect(component.customColTemplates.get('col1')).toBe(templateRef);
    });

    it('should not add duplicate ActionColumns', () => {
        component.displayedColumns = ['col1'];
        component.ActionColumns = ['col1', 'col2'];
        component.ngOnInit();
        expect(component.displayedColumns).toEqual(['col1', 'col2']);
    });
});
