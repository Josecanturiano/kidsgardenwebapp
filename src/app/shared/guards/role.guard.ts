import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { AuthService } from '../services/auth.service';

import { Observable } from 'rxjs';
import * as _ from 'lodash';
import { User } from '../../modules/users/shared/user';
import { MenuService } from '../shared/services/menu.service';

@Injectable({
	providedIn: 'root'
})
export class RoleGuard implements CanActivate {
	currentUser: User;
	constructor(private auth: AuthService, private router: Router, private menuServ: MenuService) {}

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean> | Promise<boolean> | boolean {
		return this.can(state);
	}

	canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
		const state = {
			url: route.path
		};
		// console.log(this.auth.getUserRole());
		return this.can(state);
	}

	can(state) {
		const url = _.filter(state.url.split('/'), v => v !== '');
		// console.log(state.url);
		const role = this.auth.getUserRole();
		const links = this.menuServ.getMenuLinks();
		const menuLink = _.find(links, l => l.link === '/' + state.url);
		const roles = typeof menuLink !== 'undefined' ? menuLink.roles : [];

		if (role.slug === 'admin') {
			return true;
		}

		if (roles[0] === '*') {
			return true;
		}
		if (_.includes(roles, role.slug)) {
			return true;
		}

		this.router.navigate([ '/access-denied' ]);
		return false;
	}
}
