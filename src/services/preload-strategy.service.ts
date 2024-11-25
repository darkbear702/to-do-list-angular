import { Injectable } from "@angular/core";
import { PreloadingStrategy, Route } from "@angular/router";
import { Observable, of } from "rxjs";

@Injectable({ providedIn: 'root' })
export class PreloadStrategy extends PreloadingStrategy {

  public override preload(route: Route, fn: () => Observable<unknown>): Observable<unknown> {

    return route.data?.["preload"] ? fn() : of(null);
  }
}
