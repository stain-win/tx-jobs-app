import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotFoundComponent } from '@tx/core';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('NotFoundComponent', () => {
    let component: NotFoundComponent;
    let fixture: ComponentFixture<NotFoundComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NotFoundComponent, RouterTestingModule],
        }).compileComponents();

        fixture = TestBed.createComponent(NotFoundComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display not found message', () => {
        const messageElement = fixture.debugElement.query(By.css('h1.not-found')).nativeElement;
        expect(messageElement.textContent).toContain('Page not found');
    });

    it('should have a link to the home page', () => {
        const linkElement = fixture.debugElement.query(By.css('a')).nativeElement;
        expect(linkElement.getAttribute('href')).toBe('/');
    });

    it('should display a 404 error code', () => {
        const errorCodeElement = fixture.debugElement.query(By.css('.error-code')).nativeElement;
        expect(errorCodeElement.textContent).toBe('404');
    });
});
