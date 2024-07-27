import { JobAdDto, JobAdStatus } from '../models/job';
import { createPostBody } from './api-helper';

export function jobBody(jobData: Partial<JobAdDto>) {
    if(jobData.id === '' || jobData.id === undefined) {
        delete jobData.id;
    }

    jobData.skills = jobData.skills || [];
    return createPostBody<Partial<JobAdDto>>(jobData);
}

export function jobSkillsTransform(skills: string | string[]): string[] {
    return Array.isArray(skills) ? skills : skills.split(',').map(skill => skill.trim());
}

export function statusChangeRules(status: string): JobAdStatus[] {
    return status === JobAdStatus.PUBLISHED ?
        [JobAdStatus.DRAFT] : status === JobAdStatus.ARCHIVED ?
            [JobAdStatus.DRAFT, JobAdStatus.PUBLISHED] : [];

}
