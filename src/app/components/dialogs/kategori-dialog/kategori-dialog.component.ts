import { Kategoriler } from './../../../models/Kategoriler';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ApiService } from 'src/app/services/api.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-kategori-dialog',
  templateUrl: './kategori-dialog.component.html',
  styleUrls: ['./kategori-dialog.component.scss']
})
export class KategoriDialogComponent implements OnInit {
  dialogBaslik: string;
  islem: string;
  frm: FormGroup;
  yenikayit: Kategoriler;
  kategori: Kategoriler[];
  dataSource: any;
  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator
  katid: any;

  constructor(
    public apiServis: ApiService,
    public matDialog: MatDialog,
    public frmBuild: FormBuilder,
    public dialogRef: MatDialogRef<KategoriDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.islem = data.islem;
    this.yenikayit = data.kayit;
    if (this.islem == 'ekle') {
      this.dialogBaslik = "Kategori Ekle";
    }
    if (this.islem == 'duzenle') {
      this.dialogBaslik = "Kategori Düzenle";
    }
    this.frm = this.FormOlustur();
  }

  ngOnInit() {
    this.KategoriListele();
  }
  FormOlustur() {
    return this.frmBuild.group({
      kategori_adi: [this.yenikayit.kategori_adi],
    });
  }
  KategoriListele() {
    this.apiServis.KategoriListe().subscribe((d: Kategoriler[]) => {
      this.kategori = d;
      console.log(d);
    })
  }

  KategoriIdSec(kat: Kategoriler) {
    this.katid = kat.kat_id;
    console.log(this.katid);

  }
}
