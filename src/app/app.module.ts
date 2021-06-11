import { UyeCevaplarComponent } from './components/uye-cevaplar/uye-cevaplar.component';
import { UyeSorularComponent } from './components/uye-sorular/uye-sorular.component';
import { UyeDialogComponent } from './components/dialogs/uye-dialog/uye-dialog.component';
import { KayitComponent } from './components/kayit/kayit.component';
import { UyeComponent } from './components/uye/uye.component';
import { AuthGuard } from './services/AuthGuard';
import { AuthInterceptor } from './services/AuthInterceptor';
import { ApiService } from 'src/app/services/api.service';
import { SoruListeleComponent } from './components/soru-listele/soru-listele.component';
import { KategoriDialogComponent } from './components/dialogs/kategori-dialog/kategori-dialog.component';
import { CevapDetayComponent } from './components/cevap-detay/cevap-detay.component';
import { CevapDialogComponent } from './components/dialogs/cevap-dialog/cevap-dialog.component';
import { LoginComponent } from './components/login/login.component';
import { CevapListeleComponent } from './components/cevap-listele/cevap-listele.component';
import { SoruDialogComponent } from './components/dialogs/soru-dialog/soru-dialog.component';
import { KategoriComponent } from './components/kategori/kategori.component';
import { CevapComponent } from './components/cevap/cevap.component';
import { SoruComponent } from './components/soru/soru.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';
import { AlertDialogComponent } from './components/dialogs/alert-dialog/alert-dialog.component';
import { MyAlertService } from './services/myAlert.service';
import { MaterialModule } from './material.module';
import { HomeComponent } from './components/home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainNavComponent,
    SoruComponent,
    CevapComponent,
    KategoriComponent,
    CevapListeleComponent,
    LoginComponent,
    CevapDetayComponent,
    SoruListeleComponent,
    UyeComponent,
    KayitComponent,
    UyeSorularComponent,
    UyeCevaplarComponent,

    //Dialoglar
    AlertDialogComponent,
    ConfirmDialogComponent,
    SoruDialogComponent,
    CevapDialogComponent,
    KategoriDialogComponent,
    UyeDialogComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule

  ],
  entryComponents: [
    AlertDialogComponent,
    ConfirmDialogComponent,
    SoruDialogComponent,
    CevapDialogComponent,
    KategoriDialogComponent,
    UyeDialogComponent
  ],
  providers: [MyAlertService, ApiService, AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
