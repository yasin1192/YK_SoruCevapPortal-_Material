import { Sonuc } from './../../models/Sonuc';
import { MyAlertService } from './../../services/myAlert.service';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    public apiServis: ApiService,
    public alert: MyAlertService
  ) { }

  ngOnInit() {
  }
  OturumAc(kadi: string, parola: string) {
    this.apiServis.tokenAl(kadi, parola).subscribe((d: any) => {
      localStorage.setItem("token", d.access_token);
      localStorage.setItem("uid", d.uye_id);
      localStorage.setItem("kadi", d.kuladi);
      localStorage.setItem("uyeYetkileri", d.yetki);
      location.href = "/";
      console.log(d);
    }, err => {
      var s: Sonuc = new Sonuc();
      s.islem = false;
      s.mesaj = "Kullanıcı adı veya parola geçersizdir.";
      this.alert.AlertUygula(s);
    })
  }
}
