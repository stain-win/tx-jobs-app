import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'tx-job-ad',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './job-ad.component.html',
    styles: ``,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobAdComponent {
    @Input() id: string = '';
}
