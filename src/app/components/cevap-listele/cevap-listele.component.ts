import { Sonuc } from './../../models/Sonuc';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Sorular } from './../../models/Sorular';
import { ActivatedRoute, Routes } from '@angular/router';
import { MyAlertService } from './../../services/myAlert.service';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { Kayit } from 'src/app/models/Kayit';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-cevap-listele',
  templateUrl: './cevap-listele.component.html',
  styleUrls: ['./cevap-listele.component.scss']
})
export class CevapListeleComponent implements OnInit {
  kayitlar: Kayit[];
  secSoru: Sorular;
  soruid: string;
  dataSource: any;
  displayedColumns = ['sorukat_adi', 'cevap', 'sorucevaplayan_adi', 'islemler'];
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
        this.soruid = p.soruid;
        this.SoruGetir();
        this.KayitListele();
      }
    })
  }
  SoruGetir() {
    this.apiServis.SoruBySoruId(this.soruid).subscribe((d: Sorular) => {
      this.secSoru = d;
      console.log(d);
    })
  }
  KayitListele() {
    this.apiServis.SoruCevapListe(this.soruid).subscribe((d: Kayit[]) => {
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
