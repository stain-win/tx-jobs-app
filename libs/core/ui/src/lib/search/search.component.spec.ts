import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchComponent } from '@tx/core/ui';
import { ReactiveFormsModule } from '@angular/forms';
import { DestroyService } from '@tx/core';
import { By } from '@angular/platform-browser';
import { ChangeDetectorRef } from '@angular/core';

describe('SearchComponent', () => {
    let component: SearchComponent;
    let fixture: ComponentFixture<SearchComponent>;
    let cdRef: ChangeDetectorRef;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, SearchComponent],
            providers: [DestroyService],
        }).compileComponents();

        fixture = TestBed.createComponent(SearchComponent);
        component = fixture.componentInstance;
        cdRef = fixture.componentRef.injector.get(ChangeDetectorRef);
        fixture.detectChanges();
        cdRef.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should emit search input value when input changes', (done) => {
        const searchTerm = 'test';
        component.searchInput.subscribe((value) => {
            expect(value).toBe(searchTerm);
            done();
        });
        component.searchControl.setValue(searchTerm);
    });

    it('should trim the search term before emitting', (done) => {
        const searchTerm = '  test  ';
        component.searchInput.subscribe((value) => {
            expect(value).toBe('test');
            done();
        });
        component.searchControl.setValue(searchTerm);
    });

    it('should debounce the search input', (done) => {
        jest.useFakeTimers();
        const searchTerm = 'test';
        component.searchInput.subscribe((value) => {
            expect(value).toBe(searchTerm);
            done();
        });
        component.searchControl.setValue(searchTerm);
        jest.advanceTimersByTime(300);
    });

    it('should not emit search term if it is less than 1 character', () => {
        const searchTerm = '';
        const spy = jest.spyOn(component.searchInput, 'emit');
        component.searchControl.setValue(searchTerm);
        expect(spy).not.toHaveBeenCalled();
    });

});
