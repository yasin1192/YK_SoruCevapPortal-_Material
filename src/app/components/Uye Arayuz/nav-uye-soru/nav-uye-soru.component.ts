import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Sonuc } from 'src/app/models/Sonuc';
import { Sorular } from 'src/app/models/Sorular';
import { Uyeler } from 'src/app/models/Uyeler';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { SoruDialogComponent } from '../../dialogs/soru-dialog/soru-dialog.component';

@Component({
  selector: 'app-nav-uye-soru',
  templateUrl: './nav-uye-soru.component.html',
  styleUrls: ['./nav-uye-soru.component.css']
})
export class NavUyeSoruComponent implements OnInit {
  secUye: Uyeler;
  soru: Sorular[];
  displayedColumns = ['soru', 'sorukat_adi', 'soruhazirlayan_adi', 'verilencevapsay', 'islemler']
  dataSource: any;
  hazirlayanid: string;
  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator
  dialogRef: MatDialogRef<SoruDialogComponent>;
  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  constructor(
    public apiServis: ApiService,
    public matDialog: MatDialog,
    public alert: MyAlertService,
    public route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.hazirlayanid = localStorage.getItem("uid");
    this.UyeGetir();
    this.SoruListele();

  }
  UyeGetir() {
    this.apiServis.UyeById(this.hazirlayanid).subscribe((d: Uyeler) => {
      this.secUye = d;
      console.log(d);
    })
  }
  SoruListele() {
    this.apiServis.SoruListeHazirlayanId(this.hazirlayanid).subscribe((d: Sorular[]) => {
      this.soru = d;
      console.log(d);

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

