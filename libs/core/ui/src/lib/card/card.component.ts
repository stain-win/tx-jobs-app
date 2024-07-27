import { ChangeDetectionStrategy, Component, Input, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'txc-card',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './card.component.html',
    styleUrl: './card.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent<T> {
    @Input() title: string = '';
    @Input() description: string = '';
    @Input() actionText: string = '';
    @Input() actionLink: any[] = [];
    @Input() imageUrl: string = '';
    @Input() footerTemplate: TemplateRef<any> | null = null;
    @Input() footerData: T | undefined;
    @Input() showActionFooter: boolean = true;
}
