import { KayitComponent } from './components/kayit/kayit.component';
import { UyeComponent } from './components/uye/uye.component';
import { AuthGuard } from './services/AuthGuard';
import { SoruListeleComponent } from './components/soru-listele/soru-listele.component';
import { CevapDetayComponent } from './components/cevap-detay/cevap-detay.component';
import { LoginComponent } from './components/login/login.component';
import { CevapListeleComponent } from './components/cevap-listele/cevap-listele.component';
import { SoruComponent } from './components/soru/soru.component';
import { KategoriComponent } from './components/kategori/kategori.component';
import { CevapComponent } from './components/cevap/cevap.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'soru',
    component: SoruComponent,
    canActivate: [AuthGuard],
    data: {
      yetkiler: ['Admin'],
      gerigit: '/login'
    }
  },
  {
    path: 'sorulistele/:katid',
    component: SoruListeleComponent
  },
  {
    path: 'cevap',
    component: CevapComponent,
    canActivate: [AuthGuard],
    data: {
      yetkiler: ['Admin'],
      gerigit: '/login'
    }
  },
  {
    path: 'cevaplistele/:soruid',
    component: CevapListeleComponent
  },
  {
    path: 'cevapdetay/:cevapid',
    component: CevapDetayComponent
  },

  {
    path: 'kategori',
    component: KategoriComponent
  },
  {
    path: 'uye',
    component: UyeComponent,
    canActivate: [AuthGuard],
    data: {
      yetkiler: ['Admin'],
      gerigit: '/login'
    }
  },
  {
    path: 'kayit',
    component: KayitComponent,
    canActivate: [AuthGuard],
    data: {
      yetkiler: ['Admin'],
      gerigit: '/login'
    }
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
