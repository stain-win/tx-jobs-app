import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink, RouterOutlet} from '@angular/router';

@Component({
    selector: 'tx-layout',
    standalone: true,
    imports: [CommonModule, RouterOutlet, RouterLink],
    templateUrl: './layout.component.html',
    styles: ``,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {}
