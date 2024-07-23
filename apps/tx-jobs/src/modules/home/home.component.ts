import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet} from '@angular/router';
import {BehaviorSubject} from 'rxjs';

@Component({
    selector: 'tx-home',
    standalone: true,
    imports: [CommonModule, RouterOutlet, RouterLink],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
    showHeader = new BehaviorSubject<boolean>(true);
    constructor(private _router: Router,) {
    }

    
    ngOnInit() {
        this.showHeader.next(this._router.routerState.snapshot.url !== '/home/login');
    }
}
