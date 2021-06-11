import { Sorular } from './../../../models/Sorular';
import { Cevaplar } from './../../../models/Cevaplar';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ApiService } from 'src/app/services/api.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-cevap-dialog',
  templateUrl: './cevap-dialog.component.html',
  styleUrls: ['./cevap-dialog.component.scss']
})
export class CevapDialogComponent implements OnInit {
  dialogBaslik: string;
  islem: string;
  frm: FormGroup;
  yenikayit: Cevaplar;
  sorular: Sorular[];
  soruid: string;
  dataSource: any;
  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator

  constructor(
    public apiServis: ApiService,
    public matDialog: MatDialog,
    public frmBuild: FormBuilder,
    public dialogRef: MatDialogRef<CevapDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.islem = data.islem;
    this.yenikayit = data.kayit;
    if (this.islem == 'ekle') {
      this.dialogBaslik = "Cevap Ekle";
    }
    if (this.islem == 'duzenle') {
      this.dialogBaslik = "Cevap Düzenle";
    }
    this.frm = this.FormOlustur();
  }

  ngOnInit() {
    this.SoruListele();
  }
  FormOlustur() {
    return this.frmBuild.group({
      soru_id: [this.yenikayit.soru_id],
      cevap: [this.yenikayit.cevap]

    });
  }
  SoruListele() {
    this.apiServis.SoruListe().subscribe((d: Sorular[]) => {
      this.sorular = d;
      console.log(d);
    })
  }

  SoruIdSec(sor: Sorular) {
    this.soruid = sor.soru_id;
    console.log(this.soruid);

  }



}