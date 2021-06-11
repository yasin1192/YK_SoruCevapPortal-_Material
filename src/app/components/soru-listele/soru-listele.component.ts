import { Sorular } from './../../models/Sorular';
import { Kategoriler } from './../../models/Kategoriler';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { MatTableDataSource } from '@angular/material/table';
import { Sonuc } from 'src/app/models/Sonuc';

@Component({
  selector: 'app-soru-listele',
  templateUrl: './soru-listele.component.html',
  styleUrls: ['./soru-listele.component.scss']
})
export class SoruListeleComponent implements OnInit {
  secKat: Kategoriler;
  katid: string;
  dataSource: any;
  displayedColumns = ['sorukat_adi', 'soru', 'soruhazirlayan_adi', 'islemler'];
  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  kayitlar: Sorular[];
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
        this.katid = p.katid;
        this.KategoriGetir();
        this.KategoriListele();
      }
    })
  }
  KategoriGetir() {
    this.apiServis.KategoriById(this.katid).subscribe((d: Kategoriler) => {
      this.secKat = d;
      console.log(d);
    })
  }
  KategoriListele() {
    this.apiServis.SorularByKatId(this.katid).subscribe((d: Sorular[]) => {
      this.kayitlar = d;
      this.dataSource = new MatTableDataSource(this.kayitlar);
      console.log(d);
    })
  }
  Sil(kayit: Sorular) {
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '300px'
    });

    this.confirmDialogRef.componentInstance.dialogMesaj = kayit.soru + " kayıtlı soru silinecektir onaylıyor musunuz?";
    this.confirmDialogRef.afterClosed().subscribe(d => {

      if (d) {
        this.apiServis.SoruSil(kayit.soru_id).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.KategoriListele();
          }
        })
      }
    })
  }
}
