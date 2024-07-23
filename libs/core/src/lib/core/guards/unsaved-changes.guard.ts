import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanDeactivate, GuardResult, MaybeAsync, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';

export interface ComponentCanDeactivate {
    canDeactivate: () => boolean | Observable<boolean>;
}

@Injectable()
export class UnsavedChangesGuard implements CanDeactivate<ComponentCanDeactivate> {
    canDeactivate(component: ComponentCanDeactivate,): boolean | Observable<boolean> {
        return component.canDeactivate()
            ? true
            : // dialog when handled by angular router, other window unload events will be handled by the browser
            confirm('WARNING: You have unsaved changes. Press Cancel to go back and save these changes, ' +
                'or OK to lose these changes.');
    }

}
