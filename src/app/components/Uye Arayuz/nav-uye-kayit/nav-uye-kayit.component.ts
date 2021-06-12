import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Cevaplar } from 'src/app/models/Cevaplar';
import { Kayit } from 'src/app/models/Kayit';
import { Sonuc } from 'src/app/models/Sonuc';
import { Uyeler } from 'src/app/models/Uyeler';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { KayitDialogComponent } from '../../dialogs/kayit-dialog/kayit-dialog.component';

@Component({
  selector: 'app-nav-uye-kayit',
  templateUrl: './nav-uye-kayit.component.html',
  styleUrls: ['./nav-uye-kayit.component.css']
})
export class NavUyeKayitComponent implements OnInit {
  cevap: Cevaplar[];
  kayitlar: Kayit[];
  kayitid: string;
  cevaplayanid: string;
  secUye: Uyeler;
  displayedColumns = ['soru', 'kategori_adi', 'cevap', 'soruhazirlayan_adi', 'sorucevaplayan_adi', 'islemler']
  dataSource: any;

  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator
  dialogRef: MatDialogRef<KayitDialogComponent>;
  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  constructor(
    public apiServis: ApiService,
    public matDialog: MatDialog,
    public alert: MyAlertService

  ) { }

  ngOnInit() {
    this.cevaplayanid = localStorage.getItem("uid");
    this.UyeGetir();
    this.KayitListele();
  }
  UyeGetir() {
    this.apiServis.UyeById(this.cevaplayanid).subscribe((d: Uyeler) => {
      this.secUye = d;
      console.log(d);
    })
  }
  KayitListele() {
    this.apiServis.KayitListeCevaplayanId(this.cevaplayanid).subscribe((d: Kayit[]) => {

      this.kayitlar = d;
      console.log(d);

      this.dataSource = new MatTableDataSource(this.kayitlar);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

    });
  }
  Filtrele(e) {
    var deger = e.target.value;
    this.dataSource.filter = deger.trim().toLowerCase();
    this.dataSource.paginator.firstPage();
  }

  Sil(kayit: Kayit) {
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '400px'
    });
    this.confirmDialogRef.componentInstance.dialogMesaj = kayit.SoruBilgi.soru + "  Sorusuna Verilen Cevap  " + kayit.CevapBilgi.cevap + "  Kaydı Silinecektir Onaylıyor musunuz?";
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