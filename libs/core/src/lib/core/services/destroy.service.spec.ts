import { TestBed } from '@angular/core/testing';
import { DestroyService } from '@tx/core';

describe('DestroyService', () => {
    let service: DestroyService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [DestroyService]
        });
        service = TestBed.inject(DestroyService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should call next on ngOnDestroy', () => {
        const nextSpy = jest.spyOn(service, 'next');
        service.ngOnDestroy();
        expect(nextSpy).toHaveBeenCalled();
    });
});
