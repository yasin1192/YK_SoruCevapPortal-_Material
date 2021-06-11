import { ConfirmDialogComponent } from './../dialogs/confirm-dialog/confirm-dialog.component';
import { MyAlertService } from './../../services/myAlert.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from './../../services/api.service';
import { Sorular } from './../../models/Sorular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { SoruDialogComponent } from '../dialogs/soru-dialog/soru-dialog.component';
import { Sonuc } from 'src/app/models/Sonuc';

@Component({
  selector: 'app-soru',
  templateUrl: './soru.component.html',
  styleUrls: ['./soru.component.scss']
})
export class SoruComponent implements OnInit {
  soru: Sorular[];
  displayedColumns = ['soru', 'sorukat_adi', 'soruhazirlayan_adi', 'verilencevapsay', 'islemler']
  dataSource: any;

  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator
  dialogRef: MatDialogRef<SoruDialogComponent>;
  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  constructor(
    public apiServis: ApiService,
    public matDialog: MatDialog,
    public alert: MyAlertService

  ) { }

  ngOnInit() {
    this.SoruListele();
  }

  SoruListele() {
    this.apiServis.SoruListe().subscribe((d: Sorular[]) => {

      this.soru = d;
      this.dataSource = new MatTableDataSource(this.soru);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

    });
  }
  Filtrele(e) {
    var deger = e.target.value;
    this.dataSource.filter = deger.trim().toLowerCase();
    this.dataSource.paginator.firstPage();
  }
  Ekle() {
    var yenisoru: Sorular = new Sorular();
    this.dialogRef = this.matDialog.open(SoruDialogComponent, {
      width: '300px',
      data: {
        kayit: yenisoru,
        islem: 'ekle'
        //yarım
      }
    });
    this.dialogRef.afterClosed().subscribe((d: Sorular) => {
      if (d) {
        d.soruhazirlayan_id = localStorage.getItem("uid");
        console.log(d);
        this.apiServis.SoruEkle(d).subscribe((s: Sonuc) => {

          this.alert.AlertUygula(s);
          if (s.islem) {
            this.SoruListele();
          }
        }
        )
      }
    })
  }
  Duzenle(kayit: Sorular) {
    this.dialogRef = this.matDialog.open(SoruDialogComponent, {
      width: '300px',
      data: {
        kayit: kayit,
        islem: 'duzenle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        //  d.soruhazirlayan_id = localStorage.getItem("uid");
        kayit.soru = d.soru;
        kayit.sorukat_id = d.sorukat_id;
        console.log(d);
        console.log(kayit);
        this.apiServis.SoruDuzenle(kayit).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          this.SoruListele();
        })
      }
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
            this.SoruListele();
          }
        })
      }
    })
  }
}

