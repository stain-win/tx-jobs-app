import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventType, Router, RouterLink, RouterOutlet } from '@angular/router';
import { BehaviorSubject, filter, takeUntil, tap } from 'rxjs';
import { DestroyService } from '@tx/core';
import { Store } from '@ngrx/store';
import { loadJobAds } from './store/home.action';

@Component({
    selector: 'tx-home',
    standalone: true,
    imports: [CommonModule, RouterOutlet, RouterLink],
    providers: [DestroyService],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
    showHeader = new BehaviorSubject<boolean>(true);

    constructor(private _store: Store) {
    }


    ngOnInit() {
        this._store.dispatch(loadJobAds());
    }
}
