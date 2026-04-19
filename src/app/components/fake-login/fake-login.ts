import { Component, inject } from '@angular/core';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { AuthStore } from '@/core/stores/auth-store';

@Component({
  selector: 'app-fake-login',
  imports: [HlmSelectImports],
  templateUrl: './fake-login.html',
  styleUrl: './fake-login.scss',
})
export class FakeLogin {
  protected readonly arr = Array.from({ length: 10 }, (_, i) => i + 1);
  private readonly authStore = inject(AuthStore);

  protected onUserSelect(id: number): void {
    this.authStore.fakeLogin(id);
  }
}
