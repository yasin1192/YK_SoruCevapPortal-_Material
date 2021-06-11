import { Sorular } from './../../models/Sorular';
import { ActivatedRoute } from '@angular/router';
import { MyAlertService } from './../../services/myAlert.service';
import { Cevaplar } from './../../models/Cevaplar';
import { Component, OnInit } from '@angular/core';
import { Kayit } from 'src/app/models/Kayit';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { ApiService } from 'src/app/services/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { Sonuc } from 'src/app/models/Sonuc';

@Component({
  selector: 'app-cevap-detay',
  templateUrl: './cevap-detay.component.html',
  styleUrls: ['./cevap-detay.component.scss']
})
export class CevapDetayComponent implements OnInit {
  kayitlar: Kayit[];
  secCevap: Cevaplar;
  cevapid: string;
  dataSource: any;
  displayedColumns = ['soru', 'cevap', 'sorucevaplayan_adi', 'islemler'];
  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  kayitid: string;
  secKayit: Kayit;
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
        this.cevapid = p.cevapid;
        this.CevapGetir();
        this.KayitListele();
      }
    })
  }
  CevapGetir() {
    this.apiServis.CevapByCevapId(this.cevapid).subscribe((d: Cevaplar) => {
      this.secCevap = d;
      console.log(d);
    })
  }

  KayitListele() {
    this.apiServis.CevapSoruListe(this.cevapid).subscribe((d: Kayit[]) => {
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
            }
          })
        })
      }
    });
  }
}
