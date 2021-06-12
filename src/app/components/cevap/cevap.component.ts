import { CevapListeleComponent } from './../cevap-listele/cevap-listele.component';
import { CevapDialogComponent } from './../dialogs/cevap-dialog/cevap-dialog.component';
import { Cevaplar } from './../../models/Cevaplar';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { MatTableDataSource } from '@angular/material/table';
import { Sonuc } from 'src/app/models/Sonuc';
import { Kayit } from 'src/app/models/Kayit';

@Component({
  selector: 'app-cevap',
  templateUrl: './cevap.component.html',
  styleUrls: ['./cevap.component.scss']
})
export class CevapComponent implements OnInit {
  cevap: Cevaplar[];
  kayitlar: Kayit[];
  cevapid: string;

  displayedColumns = ['soru', 'cevap', 'sorucevaplayan_adi', 'islemler']
  dataSource: any;

  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator
  dialogRef: MatDialogRef<CevapDialogComponent>;
  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  constructor(
    public apiServis: ApiService,
    public matDialog: MatDialog,
    public alert: MyAlertService

  ) { }

  ngOnInit() {
    this.CevapListele();
  }

  CevapListele() {
    this.apiServis.CevapListe().subscribe((d: Cevaplar[]) => {

      this.cevap = d;
      this.dataSource = new MatTableDataSource(this.cevap);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

    });
  }
  KayitListele() {
    this.apiServis.CevapSoruListe(this.cevapid).subscribe((d: Kayit[]) => {
      this.kayitlar = d;
      this.dataSource = new MatTableDataSource(this.kayitlar);
      console.log(d);
    })
  }
  Filtrele(e) {
    var deger = e.target.value;
    this.dataSource.filter = deger.trim().toLowerCase();
    this.dataSource.paginator.firstPage();
  }
  Ekle() {
    var yenicevap: Cevaplar = new Cevaplar();
    this.dialogRef = this.matDialog.open(CevapDialogComponent, {
      width: '300px',
      data: {
        kayit: yenicevap,
        islem: 'ekle'
        //yarım
      }
    });
    this.dialogRef.afterClosed().subscribe((d: Cevaplar) => {
      if (d) {
        d.sorucevaplayan_id = localStorage.getItem("uid");
        d.sorucevaplayan_adi = localStorage.getItem("kadi");
        console.log(d);
        this.apiServis.CevapEkle(d).subscribe((s: Sonuc) => {

          this.alert.AlertUygula(s);
          if (s.islem) {
            this.CevapListele();
          }
        }
        )
      }
    })
  }
  Duzenle(kayit: Cevaplar) {
    this.dialogRef = this.matDialog.open(CevapDialogComponent, {
      width: '300px',
      data: {
        kayit: kayit,
        islem: 'duzenle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        //  d.soruhazirlayan_id = localStorage.getItem("uid");
        kayit.cevap = d.cevap;
        kayit.soru_id = d.soru_id;
        console.log(d);
        console.log(kayit);
        this.apiServis.CevapDuzenle(kayit).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          this.CevapListele();
        })
      }
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
            this.CevapListele();
          }
          this.apiServis.CevapSil(kayit.CevapBilgi.cevap_id).subscribe((s: Sonuc) => {
            if (s.islem) {
              this.CevapListele();
            }
          })
        })
      }
    });
  }
}
