import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';

/**
 * 自定义预加载策略
 * ref => https://angular.cn/guide/router#custom-preloading-strategy
 */
@Injectable()
export class SelectivePreloadingStrategy implements PreloadingStrategy {

	preloadedModules: string[] = [];

	preload(route: Route, load: () => Observable<any>): Observable<any> {
		if (route.data && route.data['preload']) {
			// add the route path to the preloaded module array
			this.preloadedModules.push(route.path);

			// log the route path to the console
			console.log('Preloaded: ' + route.path);

			return load();
		} else {
			return of(null);
		}
	}
}
