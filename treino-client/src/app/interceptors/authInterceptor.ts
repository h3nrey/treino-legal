import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('🚦 Interceptor chamado para', req.url);

  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('user');

  let modifiedReq = req;

  if (token) {
    modifiedReq = modifiedReq.clone({
      headers: modifiedReq.headers.set('Authorization', `Bearer ${token}`)
    });
  }

  if (userId) {
    modifiedReq = modifiedReq.clone({
      setParams: {
        ...modifiedReq.params.keys().reduce((acc, key) => {
          acc[key] = modifiedReq.params.get(key) ?? '';
          return acc;
        }, {} as Record<string, string>),
        userId: JSON.parse(userId).id
      }
    });
  }

  return next(modifiedReq).pipe(
    catchError(err => throwError(() => err))
  );
};
