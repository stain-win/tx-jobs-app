import { ResolveFn } from '@angular/router';
import { StringUtil } from '../utils';
import LetterCase = StringUtil.LetterCase;

export const titleResolver: ResolveFn<string> = (route, state) => {
    let title = 'Home';
    if (route.routeConfig && route.routeConfig.path) {
        title = StringUtil.transform(route.routeConfig.path, LetterCase.capitalCase);
    }
    return title;
};
