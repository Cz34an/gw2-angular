import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HlmSidebarImports } from '@spartan-ng/helm/sidebar';
import { FakeLogin } from '../fake-login/fake-login';
import { AuthStore } from '@/core/stores/auth-store';

type SidebarItem = {
  label: string;
  path: string;
  exact?: boolean;
};

@Component({
  selector: 'app-sidebar',
  imports: [HlmSidebarImports, RouterLink, RouterLinkActive, FakeLogin],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  protected readonly authStore = inject(AuthStore);

  protected readonly items: SidebarItem[] = [
    { label: 'DashboardPage', path: '/', exact: true },
    { label: 'EventsPage', path: '/events' },
  ];
}
