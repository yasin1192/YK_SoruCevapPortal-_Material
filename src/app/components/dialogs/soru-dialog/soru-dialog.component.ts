import { Kategoriler } from './../../../models/Kategoriler';
import { Sorular } from './../../../models/Sorular';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from './../../../services/api.service';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-soru-dialog',
  templateUrl: './soru-dialog.component.html',
  styleUrls: ['./soru-dialog.component.scss']
})
export class SoruDialogComponent implements OnInit {
  dialogBaslik: string;
  islem: string;
  frm: FormGroup;
  yenikayit: Sorular;
  sorular: Sorular[];
  kategori: Kategoriler[];
  katid: string;
  dataSource: any;
  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator

  constructor(
    public apiServis: ApiService,
    public matDialog: MatDialog,
    public frmBuild: FormBuilder,
    public dialogRef: MatDialogRef<SoruDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.islem = data.islem;
    this.yenikayit = data.kayit;
    if (this.islem == 'ekle') {
      this.dialogBaslik = "Soru Ekle";
    }
    if (this.islem == 'duzenle') {
      this.dialogBaslik = "Soru Düzenle";
    }
    this.frm = this.FormOlustur();
  }

  ngOnInit() {
    this.KategoriListele();
  }
  FormOlustur() {
    return this.frmBuild.group({
      soru: [this.yenikayit.soru],
      sorukat_id: [this.yenikayit.sorukat_id]

    });
  }
  KategoriListele() {
    this.apiServis.KategoriListe().subscribe((d: Kategoriler[]) => {
      this.kategori = d;
      console.log(d);
    })
  }

  KategoriIdSec(kate: Kategoriler) {
    this.katid = kate.kat_id;
    console.log(this.katid);

  }



}
