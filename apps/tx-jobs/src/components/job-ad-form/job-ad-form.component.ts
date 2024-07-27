import { ChangeDetectionStrategy, Component, HostListener, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { distinctUntilChanged, map, Observable, takeUntil, tap } from 'rxjs';
import { ComponentCanDeactivate, DestroyService, ObjectUtil, UnsavedChangesGuard } from '@tx/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JobAdFormStore, JobAdFormVm } from './store/job-ad-form.store';
import { Router } from '@angular/router';
import { JobAdStatus } from '../../models/job';
import { jobSkillsTransform, statusChangeRules } from '../../helpers/job';
import { isEqual } from 'lodash';

export const JobAdFormMode = {
    CREATE: 'create',
    EDIT: 'edit'
};

export type JobAdFormModeType = typeof JobAdFormMode[keyof typeof JobAdFormMode];

@Component({
    selector: 'tx-job-ad-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    providers: [DestroyService, JobAdFormStore, UnsavedChangesGuard],
    templateUrl: './job-ad-form.component.html',
    styles: ``,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JobAdFormComponent implements ComponentCanDeactivate, OnInit {
    @Input() id: string = '';

    mode: string = JobAdFormMode.CREATE;
    jobAdForm!: FormGroup;
    jobAdDataVm$: Observable<JobAdFormVm>;
    jobAdStatuses = Object.values(JobAdStatus);
    isEmpty = ObjectUtil.isEmpty;
    formSubmitted = false;
    disabledStatuses: JobAdStatus[] = [];

    formValid = false;

    canDeactivate(): Observable<boolean> | boolean {
        return this.jobAdForm.pristine || this.formSubmitted;
    }

    @HostListener('window:beforeunload', ['$event'])
    unloadNotification($event: BeforeUnloadEvent) {
        if (!this.canDeactivate()) {
            // TODO fix this
            $event.returnValue = true;
        }
    }

    constructor(
        protected _router: Router,
        protected formBuilder: FormBuilder,
        protected destroy$: DestroyService,
        private jobAdFormStore$: JobAdFormStore
    ) {
        if (this._router.routerState.snapshot.url.match(/edit/)) {
            this.mode = JobAdFormMode.EDIT;
        }
        this.jobAdFormStore$.setFormMode(this.mode as JobAdFormModeType);
        this.jobAdDataVm$ = this.jobAdFormStore$.jobAdVm$;

        this.jobAdForm = this.formBuilder.group({
            id: [''],
            title: ['', [Validators.required]],
            description: ['', [Validators.required]],
            skills: [''],
            status: ['DRAFT'],
        });

    }

    ngOnInit() {
        if (this.mode === JobAdFormMode.EDIT && !!this.jobAdDataVm$) {
            this.jobAdFormStore$.loadJobAdData({ id: this.id });
            this.jobAdDataVm$.pipe(
                distinctUntilChanged(isEqual),
                map((jobAdData) => jobAdData.jobAdData),
                tap(jobAdData => this.disabledStatuses = statusChangeRules(jobAdData.status)),
                tap((jobAdData) => {
                    this.jobAdForm.patchValue(jobAdData);
                }),

                takeUntil(this.destroy$),
            ).subscribe();
        }

        this.jobAdForm.statusChanges.pipe(
            distinctUntilChanged(isEqual),
            tap((status) => {
                this.formValid = status === 'VALID';
            }),
            takeUntil(this.destroy$)
        ).subscribe();
    }

    onSubmit() {
        if (this.formValid) {
            this.formSubmitted = true;
            const skills =
                Array.isArray(this.jobAdForm.value.skills) ?
                    this.jobAdForm.value.skills : jobSkillsTransform(this.jobAdForm.value.skills);

            this.jobAdFormStore$.saveJobAd({ ...this.jobAdForm.value, skills });
        }
    }

    protected readonly JobAdStatus = JobAdStatus;
}
