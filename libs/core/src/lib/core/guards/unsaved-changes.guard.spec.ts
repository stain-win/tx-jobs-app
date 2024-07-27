import { TestBed } from '@angular/core/testing';

import { ComponentCanDeactivate, UnsavedChangesGuard } from './unsaved-changes.guard';
import { of } from 'rxjs';

describe('UnsavedChangesGuard', () => {
    let guard: UnsavedChangesGuard;
    let component: jest.Mocked<ComponentCanDeactivate>;

    beforeEach(() => {
        component = { canDeactivate: jest.fn() } as jest.Mocked<ComponentCanDeactivate>;
        TestBed.configureTestingModule({
            providers: [
                UnsavedChangesGuard,
            ]
        });

        guard = TestBed.inject(UnsavedChangesGuard);
    });

    it('should be created', () => {
        expect(guard).toBeTruthy();
    });

    it('should allow deactivation if component can deactivate returns true', () => {
        component.canDeactivate.mockReturnValue(true);
        expect(guard.canDeactivate(component)).toBe(true);
    });

    it('should allow deactivation if component can deactivate returns observable of true', () => {
        component.canDeactivate.mockReturnValue(of(true));
        const result = guard.canDeactivate(component)
            expect(result).toBe(true);
    });

    it('should deny deactivation if component can deactivate returns false', () => {
        jest.spyOn(window, 'confirm').mockReturnValue(false);
        component.canDeactivate.mockReturnValue(false);
        expect(guard.canDeactivate(component)).toBe(false);
    });

    it('should show confirmation dialog if component can deactivate returns false', () => {
        const confirmSpy = jest.spyOn(window, 'confirm').mockReturnValue(true);
        component.canDeactivate.mockReturnValue(false);
        guard.canDeactivate(component);
        expect(confirmSpy).toHaveBeenCalledWith('WARNING: You have unsaved changes. Press Cancel to go back and save these changes, or OK to lose these changes.');
    });

    it('should allow deactivation if user confirms dialog when component can deactivate returns false', () => {
        jest.spyOn(window, 'confirm').mockReturnValue(true);
        component.canDeactivate.mockReturnValue(false);
        expect(guard.canDeactivate(component)).toBe(true);
    });
});
