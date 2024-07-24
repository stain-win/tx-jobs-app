import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, EventType, Router, RouterLink, RouterOutlet} from '@angular/router';
import {BehaviorSubject, filter, takeUntil, tap} from 'rxjs';
import {coerceStringArray} from '@angular/cdk/coercion';
import {DestroyService} from '@tx/core';

@Component({
    selector: 'tx-home',
    standalone: true,
    imports: [CommonModule, RouterOutlet, RouterLink],
    providers: [DestroyService],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
    showHeader = new BehaviorSubject<boolean>(true);
    constructor(private _router: Router, private destroy$: DestroyService) {
    }


    ngOnInit() {
        this.showHeader.next(this._router.routerState.snapshot.url !== '/home/login');
        // in case of auth guard redirection
        this._router.events
            .pipe(
                filter((data) => data.type === EventType.NavigationEnd),
                tap( data =>  this.showHeader.next(data.url !== '/home/login')),
                takeUntil(this.destroy$),
            )
            .subscribe();
    }
}
