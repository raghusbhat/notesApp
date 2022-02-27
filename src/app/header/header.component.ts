import { Component, OnInit } from '@angular/core';
import { BreakpointState } from '@angular/cdk/layout';
import { ResponsiveService } from '../services/responsive.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isMobile$!: Observable<BreakpointState>;

  constructor(private responsive: ResponsiveService) {
    this.isMobile$ = this.responsive.isMobile$;
  }

  ngOnInit(): void {}
}
