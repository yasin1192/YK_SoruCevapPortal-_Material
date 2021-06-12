import { NavUyeKayitComponent } from './components/Uye Arayuz/nav-uye-kayit/nav-uye-kayit.component';
import { NavUyeHesapComponent } from './components/Uye Arayuz/nav-uye-hesap/nav-uye-hesap.component';
import { NavUyeCevapComponent } from './components/Uye Arayuz/nav-uye-cevap/nav-uye-cevap.component';
import { NavUyeSoruComponent } from './components/Uye Arayuz/nav-uye-soru/nav-uye-soru.component';
import { UyeCevaplarComponent } from './components/uye-cevaplar/uye-cevaplar.component';
import { UyeSorularComponent } from './components/uye-sorular/uye-sorular.component';
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
    component: SoruListeleComponent,
    canActivate: [AuthGuard],
    data: {
      yetkiler: ['Admin'],
      gerigit: '/login'
    }
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
    component: CevapListeleComponent,
    canActivate: [AuthGuard],
    data: {
      yetkiler: ['Admin'],
      gerigit: '/login'
    }
  },
  {
    path: 'cevapdetay/:cevapid',
    component: CevapDetayComponent,
    canActivate: [AuthGuard],
    data: {
      yetkiler: ['Admin'],
      gerigit: '/login'
    }
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
    path: 'uyeninsorularilistele/:uyeid',
    component: UyeSorularComponent,
    canActivate: [AuthGuard],
    data: {
      yetkiler: ['Admin', 'Uye'],
      gerigit: '/login'
    }
  },
  {
    path: 'uyenincevaplarilistele/:uyeid',
    component: UyeCevaplarComponent,
    canActivate: [AuthGuard],
    data: {
      yetkiler: ['Admin', 'Uye'],
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
  },
  //ÜYE İÇİN ROUTE KISMI
  {
    path: 'uye-soru',
    component: NavUyeSoruComponent,
    canActivate: [AuthGuard],
    data: {
      yetkiler: ['Uye', 'Admin'],
      gerigit: '/login'
    }
  },
  {
    path: 'uye-cevap',
    component: NavUyeCevapComponent,
    canActivate: [AuthGuard],
    data: {
      yetkiler: ['Uye', 'Admin'],
      gerigit: '/login'
    }
  },
  {
    path: 'uye-hesap',
    component: NavUyeHesapComponent,
    canActivate: [AuthGuard],
    data: {
      yetkiler: ['Uye', 'Admin'],
      gerigit: '/login'
    }
  },
  {
    path: 'uye-kayit',
    component: NavUyeKayitComponent,
    canActivate: [AuthGuard],
    data: {
      yetkiler: ['Uye', 'Admin'],
      gerigit: '/login'
    }
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
