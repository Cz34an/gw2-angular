import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HlmSidebarImports } from '@spartan-ng/helm/sidebar';

type SidebarItem = {
  label: string;
  path: string;
  exact?: boolean;
};

@Component({
  selector: 'app-sidebar',
  imports: [HlmSidebarImports, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  protected readonly items: SidebarItem[] = [
    { label: 'DashboardPage', path: '/', exact: true },
    { label: 'EventsPage', path: '/events' },
  ];
}
