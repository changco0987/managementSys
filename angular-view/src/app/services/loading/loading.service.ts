import { Injectable, Signal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loading = signal(false);

  setLoading(value: boolean) {
    this.loading.set(value);
  }

  get isLoading(): Signal<boolean> {
    return this.loading;
  }
}
