import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DestroyService } from '@tx/core';
import { debounceTime, distinctUntilChanged, filter, map, takeUntil, tap } from 'rxjs';

@Component({
    selector: 'txc-search',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    providers: [DestroyService],
    templateUrl: './search.component.html',
    styles: ``,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit {
    searchControl: FormControl = new FormControl('');

    @Output() searchInput = new EventEmitter<string>();

    constructor(private destroyed$: DestroyService ) {
    }

    ngOnInit() {
        this.searchControl.valueChanges.pipe(
            distinctUntilChanged(),
            map(term => term.trim()),
            filter((term) => term.length >= 1 || term.length === 0),
            debounceTime(300),
            tap((term) => { this.searchInput.emit(term); }),
            takeUntil(this.destroyed$),
        ).subscribe();
    }
}
