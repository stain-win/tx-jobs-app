import {ChangeDetectionStrategy, Component, HostListener} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Observable} from 'rxjs';
import {ComponentCanDeactivate} from '@tx/core';

@Component({
    selector: 'tx-job-ad-form',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './job-ad-form.component.html',
    styles: ``,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobAdFormComponent implements ComponentCanDeactivate{
    canDeactivate(): Observable<boolean> | boolean {
        return false;
    }

    @HostListener('window:beforeunload', ['$event'])
    unloadNotification($event: BeforeUnloadEvent) {
        if (!this.canDeactivate()) {
            // TODO fix this
            $event.returnValue = true;
        }
    }
}
