import { KategoriDialogComponent } from './../dialogs/kategori-dialog/kategori-dialog.component';
import { Kategoriler } from './../../models/Kategoriler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SoruDialogComponent } from '../dialogs/soru-dialog/soru-dialog.component';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { MatTableDataSource } from '@angular/material/table';
import { Sonuc } from 'src/app/models/Sonuc';

@Component({
  selector: 'app-kategori',
  templateUrl: './kategori.component.html',
  styleUrls: ['./kategori.component.scss']
})
export class KategoriComponent implements OnInit {
  kategori: Kategoriler[];
  displayedColumns = ['kat_id', 'kategori_adi', 'kategorisorusay', 'islemler']
  dataSource: any;

  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator
  dialogRef: MatDialogRef<KategoriDialogComponent>;
  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  constructor(
    public apiServis: ApiService,
    public matDialog: MatDialog,
    public alert: MyAlertService

  ) { }

  ngOnInit() {
    this.KategoriListele();
  }

  KategoriListele() {
    this.apiServis.KategoriListe().subscribe((d: Kategoriler[]) => {

      this.kategori = d;
      this.dataSource = new MatTableDataSource(this.kategori);
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
    var yenikategori: Kategoriler = new Kategoriler();
    this.dialogRef = this.matDialog.open(KategoriDialogComponent, {
      width: '300px',
      data: {
        kayit: yenikategori,
        islem: 'ekle'
        //yarım
      }
    });
    this.dialogRef.afterClosed().subscribe((d: Kategoriler) => {
      if (d) {
        console.log(d);
        this.apiServis.KategoriEkle(d).subscribe((s: Sonuc) => {

          this.alert.AlertUygula(s);
          if (s.islem) {
            this.KategoriListele();
          }
        }
        )
      }
    })
  }
  Duzenle(kayit: Kategoriler) {
    this.dialogRef = this.matDialog.open(KategoriDialogComponent, {
      width: '300px',
      data: {
        kayit: kayit,
        islem: 'duzenle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        //  d.soruhazirlayan_id = localStorage.getItem("uid");
        kayit.kategori_adi = d.kategori_adi;
        console.log(d);
        console.log(kayit);
        this.apiServis.KategoriDuzenle(kayit).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          this.KategoriListele();
        })
      }
    })

  }
  Sil(kayit: Kategoriler) {
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '300px'
    });
    this.confirmDialogRef.componentInstance.dialogMesaj = kayit.kategori_adi + " kayıtlı kategori silinecektir onaylıyor musunuz?";
    this.confirmDialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.KategoriSil(kayit.kat_id).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.KategoriListele();
          }
        })
      }
    })
  }
}

