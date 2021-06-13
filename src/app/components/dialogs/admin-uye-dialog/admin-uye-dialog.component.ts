import { Uyeler } from '../../../models/Uyeler';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ApiService } from 'src/app/services/api.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-uye-dialog',
  templateUrl: './admin-uye-dialog.component.html',
  styleUrls: ['./admin-uye-dialog.component.scss']
})
export class AdminUyeDialogComponent implements OnInit {
  dialogBaslik: string;
  islem: string;
  frm: FormGroup;
  yeniUye: Uyeler;
  uye: Uyeler[];
  yetkiler: ["admin", "uye"];

  dataSource: any;
  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator
  katid: any;

  constructor(
    public apiServis: ApiService,
    public matDialog: MatDialog,
    public frmBuild: FormBuilder,
    public dialogRef: MatDialogRef<AdminUyeDialogComponent>,
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
      sifre: [this.yeniUye.sifre],
      yetki: [this.yeniUye.yetki]

    });
  }
  UyeListele() {
    this.apiServis.UyeListe().subscribe((d: Uyeler[]) => {
      this.uye = d;
      console.log(d);
    })
  }
}

