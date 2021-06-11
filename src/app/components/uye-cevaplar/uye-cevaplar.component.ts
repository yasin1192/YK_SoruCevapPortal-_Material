import { MyAlertService } from 'src/app/services/myAlert.service';
import { Cevaplar } from './../../models/Cevaplar';
import { Component, OnInit } from '@angular/core';
import { Kayit } from 'src/app/models/Kayit';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Sonuc } from 'src/app/models/Sonuc';
import { Uyeler } from 'src/app/models/Uyeler';

@Component({
  selector: 'app-uye-cevaplar',
  templateUrl: './uye-cevaplar.component.html',
  styleUrls: ['./uye-cevaplar.component.css']
})
export class UyeCevaplarComponent implements OnInit {
  kayitlar: Kayit[];
  secUye: Uyeler;
  uyeid: string;
  dataSource: any;
  displayedColumns = ['soru', 'cevap', 'soruhazirlayan_adi', 'islemler'];
  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  constructor(
    public apiServis: ApiService,
    public alert: MyAlertService,
    public route: ActivatedRoute,
    public matDialog: MatDialog,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p => {
      if (p) {
        console.log(p);
        this.uyeid = p.uyeid;
        this.UyeGetir();
        this.KayitListele();
      }
    })
  }
  UyeGetir() {
    this.apiServis.UyeById(this.uyeid).subscribe((d: Uyeler) => {
      this.secUye = d;
      console.log(d);
    })
  }
  KayitListele() {
    this.apiServis.KayitListeCevaplayanId(this.uyeid).subscribe((d: Kayit[]) => {
      this.kayitlar = d;
      this.dataSource = new MatTableDataSource(this.kayitlar);
      console.log(d);
    })
  }
  Sil(kayit: Kayit) {
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '400px'
    });
    this.confirmDialogRef.componentInstance.dialogMesaj = kayit.CevapBilgi.cevap + " Cevabınız Silinecektir Onaylıyor musunuz?";
    this.confirmDialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.KayitSil(kayit.kayitid).subscribe((s: Sonuc) => {
          if (s.islem) {
            this.KayitListele();
          }
          this.apiServis.CevapSil(kayit.CevapBilgi.cevap_id).subscribe((s: Sonuc) => {
            if (s.islem) {
              this.KayitListele();
              this.UyeGetir();

            }
          })
        })
      }
    });
  }
}
