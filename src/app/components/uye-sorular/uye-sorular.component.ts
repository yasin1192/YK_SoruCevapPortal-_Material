import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Sorular } from 'src/app/models/Sorular';
import { Uyeler } from 'src/app/models/Uyeler';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { Sonuc } from 'src/app/models/Sonuc';

@Component({
  selector: 'app-uye-sorular',
  templateUrl: './uye-sorular.component.html',
  styleUrls: ['./uye-sorular.component.css']
})
export class UyeSorularComponent implements OnInit {
  secUye: Uyeler;
  uyeid: string;
  dataSource: any;
  displayedColumns = ['soru', 'sorukat_adi', 'verilencevapsay', 'islemler'];
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
        this.uyeid = p.uyeid;
        this.UyeGetir();
        this.UyeListele();
      }
    })
  }
  UyeGetir() {
    this.apiServis.UyeById(this.uyeid).subscribe((d: Uyeler) => {
      this.secUye = d;
      console.log(d);
    })
  }
  UyeListele() {
    this.apiServis.SoruListeHazirlayanId(this.uyeid).subscribe((d: Sorular[]) => {
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
            this.UyeListele();
            this.UyeGetir();

          }
        })
      }
    })
  }
}

