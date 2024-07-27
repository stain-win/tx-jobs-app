import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobAdStore, JobAdVm } from './store/job-ad.store';
import { Observable } from 'rxjs';
import { APPLICATION_CONTEXT, ApplicationContext } from '../../models/application';
import { ActivatedRoute } from '@angular/router';
import { CardComponent } from '@tx/core/ui';

@Component({
    selector: 'tx-job-ad',
    standalone: true,
    imports: [CommonModule, CardComponent],
    providers: [JobAdStore],
    templateUrl: './job-ad.component.html',
    styles: ``,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JobAdComponent implements OnInit {
    @Input() id: string = '';
    jobAdVm$!: Observable<JobAdVm>;
    jobAdIsLoading$!: Observable<boolean>;

    context: ApplicationContext | undefined;

    constructor(
        private jobAdStore$: JobAdStore,
        private activatedRoute: ActivatedRoute,
        )
    {
        this.jobAdVm$ = this.jobAdStore$.jobAdVm$;
        this.jobAdIsLoading$ = this.jobAdStore$.jobLoading$;
        this.context = this.activatedRoute.snapshot.parent?.data['mode'];
    }

    ngOnInit() {
        this.jobAdStore$.loadJobAd({
            id: this.id,
            published: (this.context === APPLICATION_CONTEXT.UNAUTHORIZED),
            embedded: (this.context === APPLICATION_CONTEXT.AUTHORIZED)
        });
    }

    protected readonly APPLICATION_CONTEXT = APPLICATION_CONTEXT;
}
