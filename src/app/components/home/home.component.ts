import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Sonuc } from './../../models/Sonuc';
import { MyAlertService } from './../../services/myAlert.service';
import { Component, OnInit } from '@angular/core';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  constructor(
    public alert: MyAlertService,
    public matDialog: MatDialog
  ) { }

  ngOnInit() {
  }
  AlertAc(p: boolean) {
    var s: Sonuc = new Sonuc();
    s.islem = p;
    s.mesaj = "Bu bir Alert mesajıdır...";
    this.alert.AlertUygula(s);
  }
  ConfirmAc() {
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '400px'
    });
    this.confirmDialogRef.componentInstance.dialogMesaj = "Kayıt Silinecektir Onaylıyor musunuz?";
    this.confirmDialogRef.afterClosed().subscribe(d => {
      if (d) {
        //SİLME RUTİNİ
      }
    });
  }
}
