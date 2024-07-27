import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { DestroyService } from '@tx/core';
import { Store } from '@ngrx/store';

@Component({
    selector: 'tx-home',
    standalone: true,
    imports: [CommonModule, RouterOutlet, RouterLink],
    providers: [DestroyService],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent  {}
