import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobAdStore, JobAdVm } from './store/job-ad.store';
import { Observable } from 'rxjs';

@Component({
    selector: 'tx-job-ad',
    standalone: true,
    imports: [CommonModule],
    providers: [JobAdStore],
    templateUrl: './job-ad.component.html',
    styles: ``,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JobAdComponent implements OnInit {
    @Input() id: string = '';
    jobAdVm$!: Observable<JobAdVm>;
    jobAdIsLoading$!: Observable<boolean>;

    constructor(private jobAdStore$: JobAdStore) {
        this.jobAdVm$ = this.jobAdStore$.jobAdVm$;
        this.jobAdIsLoading$ = this.jobAdStore$.jobLoading$;
    }

    ngOnInit() {
        this.jobAdStore$.loadJobAd({ id: this.id });

    }
}
