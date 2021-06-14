import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Cevaplar } from 'src/app/models/Cevaplar';
import { Kayit } from 'src/app/models/Kayit';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { MatTableDataSource } from '@angular/material/table';
import { Sonuc } from 'src/app/models/Sonuc';

@Component({
  selector: 'app-kayit',
  templateUrl: './kayit.component.html',
  styleUrls: ['./kayit.component.scss']
})
export class KayitComponent implements OnInit {
  cevap: Cevaplar[];
  kayitlar: Kayit[];
  kayitid: string;

  displayedColumns = ['soru', 'kategori_adi', 'cevap', 'soruhazirlayan_adi', 'sorucevaplayan_adi', 'islemler']
  dataSource: any;

  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator
  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  constructor(
    public apiServis: ApiService,
    public matDialog: MatDialog,
    public alert: MyAlertService

  ) { }

  ngOnInit() {
    this.KayitListele();
  }

  KayitListele() {
    this.apiServis.KayitListe().subscribe((d: Kayit[]) => {

      this.kayitlar = d;
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