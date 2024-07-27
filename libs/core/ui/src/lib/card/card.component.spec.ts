import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from '@tx/core/ui';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { ChangeDetectorRef } from '@angular/core';

describe('CardComponent', () => {
    let component: CardComponent<any>;
    let fixture: ComponentFixture<CardComponent<any>>;
    let cdRef: ChangeDetectorRef;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CardComponent, RouterTestingModule],
        }).compileComponents();

        fixture = TestBed.createComponent(CardComponent);
        component = fixture.componentInstance;
        cdRef = fixture.componentRef.injector.get(ChangeDetectorRef);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display title', () => {
        component.title = 'Test Title';
        cdRef.detectChanges();
        const titleElement = fixture.debugElement.query(By.css('.card-title')).nativeElement;
        expect(titleElement.textContent).toContain('Test Title');
    });

    it('should display description', () => {
        component.description = 'Test Description';
        cdRef.detectChanges();
        const descriptionElement = fixture.debugElement.query(By.css('.card-body p')).nativeElement;
        expect(descriptionElement.textContent).toContain('Test Description');
    });

    it('should display action text and link', () => {
        component.actionText = 'Click Here';
        component.actionLink = ['/test'];
        cdRef.detectChanges();
        const actionElement = fixture.debugElement.query(By.css('.card-actions a')).nativeElement;
        expect(actionElement.textContent).toContain('Click Here');
        expect(actionElement.getAttribute('href')).toBe('/test');
    });

    it('should not display footer when showActionFooter is false', () => {
        component.showActionFooter = false;
        cdRef.detectChanges();
        const footerElement = fixture.debugElement.query(By.css('.card-actions'));
        expect(footerElement).toBeNull();
    });
});
