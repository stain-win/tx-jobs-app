import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'txc-not-found',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './not-found.component.html',
    styles: ``,
})
export class NotFoundComponent {}
