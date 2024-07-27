import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'highlight',
    pure: true,
    standalone: true
})
export class HighlightPipe implements PipeTransform {
    transform (value: string, searchTerm: string): string {
        if (!searchTerm || !value.replace) {
            return value;
        }

        const regex = new RegExp(searchTerm.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'), 'mig');
        return value.replace(regex, '<span class="font-highlight">$&</span>');
    }
}
