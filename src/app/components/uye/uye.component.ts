import { ConfirmDialogComponent } from './../dialogs/confirm-dialog/confirm-dialog.component';
import { UyeDialogComponent } from './../dialogs/uye-dialog/uye-dialog.component';
import { Uyeler } from './../../models/Uyeler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { MatTableDataSource } from '@angular/material/table';
import { Sonuc } from 'src/app/models/Sonuc';

@Component({
  selector: 'app-uye',
  templateUrl: './uye.component.html',
  styleUrls: ['./uye.component.scss']
})
export class UyeComponent implements OnInit {
  uye: Uyeler[];
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
    this.UyeListele();
  }

  UyeListele() {
    this.apiServis.UyeListe().subscribe((d: Uyeler[]) => {

      this.uye = d;
      this.dataSource = new MatTableDataSource(this.uye);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

    });
  }
  Ekle() {
    var yeniuye: Uyeler = new Uyeler();
    this.dialogRef = this.matDialog.open(UyeDialogComponent, {
      width: '300px',
      data: {
        kayit: yeniuye,
        islem: 'ekle'
        //yarım
      }
    });
    this.dialogRef.afterClosed().subscribe((d: Uyeler) => {
      if (d) {
        console.log(d);
        this.apiServis.UyeEkle(d).subscribe((s: Sonuc) => {

          this.alert.AlertUygula(s);
          if (s.islem) {
            this.UyeListele();
          }
        }
        )
      }
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
        //  d.soruhazirlayan_id = localStorage.getItem("uid");
        kayit.kuladi = d.kuladi;
        console.log(d);
        console.log(kayit);
        this.apiServis.UyeDuzenle(kayit).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          this.UyeListele();
        })
      }
    })

  }
  Sil(kayit: Uyeler) {
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '300px'
    });
    this.confirmDialogRef.componentInstance.dialogMesaj = kayit.kuladi + " kayıtlı üye silinecektir onaylıyor musunuz?";
    this.confirmDialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.UyeSil(kayit.uye_id).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.UyeListele();
          }
        })
      }
    })
  }
}

