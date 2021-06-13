import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Sonuc } from 'src/app/models/Sonuc';
import { Uyeler } from 'src/app/models/Uyeler';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { UyeDialogComponent } from '../../dialogs/uye-dialog/uye-dialog.component';

@Component({
  selector: 'app-nav-uye-hesap',
  templateUrl: './nav-uye-hesap.component.html',
  styleUrls: ['./nav-uye-hesap.component.css']
})
export class NavUyeHesapComponent implements OnInit {
  secUye: Uyeler;
  uye: Uyeler[];
  uyeid: string;
  displayedColumns = ['kuladi', 'yetki', 'sordugusorusay', 'cevapladigisorusay', 'islemler']
  dataSource: any;

  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator
  dialogRef: MatDialogRef<UyeDialogComponent>;
  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  constructor(
    public apiServis: ApiService,
    public matDialog: MatDialog,
    public alert: MyAlertService

  ) { }

  ngOnInit() {
    this.uyeid = localStorage.getItem("uid");
    this.UyeGetir();
  }
  UyeGetir() {
    this.apiServis.UyeById(this.uyeid).subscribe((d: Uyeler) => {
      this.secUye = d;
      console.log(d);
    })
  }
  Duzenle(kayit: Uyeler) {
    this.dialogRef = this.matDialog.open(UyeDialogComponent, {
      width: '300px',
      data: {
        kayit: kayit,
        islem: 'duzenle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        kayit.kuladi = d.kuladi;
        kayit.sifre = d.sifre;
        kayit.yetki = this.secUye.yetki;
        console.log(d);
        console.log(kayit);
        this.apiServis.UyeDuzenle(kayit).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          this.UyeGetir();
        })
      }
    })

  }
}
