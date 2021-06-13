import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Uyeler } from 'src/app/models/Uyeler';
import { Sorular } from 'src/app/models/Sorular';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {
  kadi: string;
  yetki: string;
  soru: Sorular[];
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public apiServis: ApiService

  ) { }
  ngOnInit(): void {
    if (this.apiServis.oturumKontrol()) {
      this.kadi = localStorage.getItem("kadi");
      this.yetki = localStorage.getItem("uyeYetkileri");

    }
  }
  OturumKapat() {
    localStorage.clear();
    location.href = "/";
  }

}
