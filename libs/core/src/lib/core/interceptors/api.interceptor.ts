import { HttpInterceptorFn } from '@angular/common/http';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
    if(req.method === 'GET') return next(req);

    const apiReq = req.clone({
        setHeaders: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    });
    return next(apiReq);
};
