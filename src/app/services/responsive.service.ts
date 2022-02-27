import { Injectable } from '@angular/core';
import {
  Breakpoints,
  BreakpointState,
  BreakpointObserver,
} from '@angular/cdk/layout';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResponsiveService {
  constructor(private breakpointObserver: BreakpointObserver) {}

  isMobile$ = this.breakpointObserver.observe(Breakpoints.Handset);
}
