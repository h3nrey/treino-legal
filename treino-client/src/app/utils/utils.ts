import { HttpParams } from '@angular/common/http';

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return function (...args: Parameters<T>) {
    if (timeoutId) clearTimeout(timeoutId);

    timeoutId = setTimeout(() => func(...args), delay);
  };
}

export function buildHttpParams(params: Record<string, any>): HttpParams {
  let httpParams = new HttpParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return;

    if (Array.isArray(value)) {
      value.forEach((val) => {
        httpParams = httpParams.append(key, val);
      });
    } else {
      httpParams = httpParams.set(key, value);
    }
  });

  return httpParams;
}
