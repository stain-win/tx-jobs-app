import {ChangeDetectionStrategy, Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {UnsavedChangesGuard} from '@tx/core';

@Component({
    selector: 'tx-client-dashboard',
    standalone: true,
    imports: [CommonModule, RouterOutlet],
    providers: [UnsavedChangesGuard],
    templateUrl: './client-dashboard.component.html',
    styles: ``,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientDashboardComponent {}
