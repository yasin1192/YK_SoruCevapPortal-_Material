import { Uyeler } from './../../../models/Uyeler';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ApiService } from 'src/app/services/api.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-uye-dialog',
  templateUrl: './uye-dialog.component.html',
  styleUrls: ['./uye-dialog.component.scss']
})
export class UyeDialogComponent implements OnInit {
  dialogBaslik: string;
  islem: string;
  frm: FormGroup;
  yeniUye: Uyeler;
  uye: Uyeler[];
  dataSource: any;
  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator
  katid: any;

  constructor(
    public apiServis: ApiService,
    public matDialog: MatDialog,
    public frmBuild: FormBuilder,
    public dialogRef: MatDialogRef<UyeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.islem = data.islem;
    this.yeniUye = data.kayit;
    if (this.islem == 'ekle') {
      this.dialogBaslik = "Üye Ekle";
    }
    if (this.islem == 'duzenle') {
      this.dialogBaslik = "Üye Düzenle";
    }
    this.frm = this.FormOlustur();
  }

  ngOnInit() {
    this.UyeListele();
  }
  FormOlustur() {
    return this.frmBuild.group({
      kuladi: [this.yeniUye.kuladi],
      yetki: [this.yeniUye.yetki],
      sifre: [this.yeniUye.sifre]

    });
  }
  UyeListele() {
    this.apiServis.UyeListe().subscribe((d: Uyeler[]) => {
      this.uye = d;
      console.log(d);
    })
  }
}

