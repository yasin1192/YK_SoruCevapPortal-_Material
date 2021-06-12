import { Cevaplar } from './../models/Cevaplar';
import { Sorular } from './../models/Sorular';
import { Kategoriler } from './../models/Kategoriler';
import { Uyeler } from './../models/Uyeler';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl = "http://localhost:51652/api/";
  constructor(
    public http: HttpClient
  ) { }
  //UYELER APİ
  UyeListe() {
    return this.http.get(this.apiUrl + "uyeliste");
  }
  UyeCevapListe(uyeid: string) {
    return this.http.get(this.apiUrl + "uyecevapliste/" + uyeid)
  }
  UyeById(uyeid: string) {
    return this.http.get(this.apiUrl + "uyebyid/" + uyeid);
  }
  UyeEkle(uye: Uyeler) {
    return this.http.post(this.apiUrl + "uyeekle", uye);
  }
  UyeDuzenle(uye: Uyeler) {
    return this.http.put(this.apiUrl + "uyeduzenle", uye);
  }
  UyeSil(uyeid: string) {
    return this.http.delete(this.apiUrl + "uyesil/" + uyeid);
  }
  //KATEGORİLER APİ
  KategoriListe() {
    return this.http.get(this.apiUrl + "kategoriliste");
  }
  KategoriById(katid: string) {
    return this.http.get(this.apiUrl + "kategoribyid/" + katid);
  }
  SorularByKatId(katid: string) {
    return this.http.get(this.apiUrl + "sorubykatid/" + katid);
  }
  KategoriEkle(kategori: Kategoriler) {
    return this.http.post(this.apiUrl + "kategoriekle", kategori);
  }
  KategoriDuzenle(kategori: Kategoriler) {
    return this.http.put(this.apiUrl + "kategoriduzenle", kategori);
  }
  KategoriSil(katid: string) {
    return this.http.delete(this.apiUrl + "kategorisil/" + katid);
  }

  //SORULARAPİ

  SoruListe() {
    return this.http.get(this.apiUrl + "soruliste");
  }
  SoruCevapListe(soruid: string) {
    return this.http.get(this.apiUrl + "sorucevapliste/" + soruid)
  }
  SoruBySoruId(soruid: string) {
    return this.http.get(this.apiUrl + "sorubysoruid/" + soruid);
  }
  SoruByKatId(katid: string) {
    return this.http.get(this.apiUrl + "sorubykatid/" + katid);
  }
  SoruListeHazirlayanId(uyeid: string) {
    return this.http.get(this.apiUrl + "sorulistebysoruhazirlayanid/" + uyeid);
  }
  SoruEkle(soru: Sorular) {
    return this.http.post(this.apiUrl + "soruekle", soru);
  }
  SoruDuzenle(soru: Sorular) {
    return this.http.put(this.apiUrl + "soruduzenle", soru);
  }
  SoruSil(soruid: string) {
    return this.http.delete(this.apiUrl + "sorusil/" + soruid);
  }

  //CEVAPLARAPİ

  CevapListe() {
    return this.http.get(this.apiUrl + "cevapliste");
  }
  CevapSoruListe(cevapid: string) {
    return this.http.get(this.apiUrl + "cevapsoruliste/" + cevapid)

  }
  CevapByCevapId(cevapid: string) {
    return this.http.get(this.apiUrl + "cevapbycevapid/" + cevapid);
  }
  CevapBySoruId(soruid: string) {
    return this.http.get(this.apiUrl + "cevapbysoruid/" + soruid);
  }
  CevapListeCevaplayanId(uyeid: string) {
    return this.http.get(this.apiUrl + "cevaplistebysorucevaplayanid/" + uyeid);
  }
  KayitListeCevaplayanId(uyeid: string) {
    return this.http.get(this.apiUrl + "kayitlistebysorucevaplayanid/" + uyeid);
  }

  CevapEkle(cevap: Cevaplar) {
    return this.http.post(this.apiUrl + "cevapekle", cevap);
  }
  CevapDuzenle(cevap: Cevaplar) {
    return this.http.put(this.apiUrl + "cevapduzenle", cevap);
  }
  CevapSil(cevapid: string) {
    return this.http.delete(this.apiUrl + "cevapsil/" + cevapid);
  }

  //KAYİTLAR APİ

  KayitListe() {
    return this.http.get(this.apiUrl + "kayitliste");
  }
  KayitlarByUyeId(uyeid: string) {
    return this.http.get(this.apiUrl + "  kayitbyuyeid/" + uyeid);
  }
  KayitlarByKayitId(kayitid: string) {
    return this.http.get(this.apiUrl + "kayitlarbykayitid/" + kayitid);
  }
  KayitSil(kayitid: string) {
    return this.http.delete(this.apiUrl + "kayitsil/" + kayitid);
  }

  tokenAl(kadi: string, parola: string) {
    var data = "username=" + kadi + "&password=" + parola + "&grant_type=password";
    var reqHeader = new HttpHeaders({ "Content-Type": "application/x-www-form-urlencoded" });
    return this.http.post(this.apiUrl + "/token", data, { headers: reqHeader });
  }
  oturumKontrol() {
    if (localStorage.getItem("token")) {
      return true
    }
    else {
      return false
    }
  }
  yetkiKontrol(yetkiler) {
    var sonuc: boolean = false;
    var uyeYetkiler: string[] = JSON.parse(localStorage.getItem("uyeYetkileri"));
    if (uyeYetkiler) {
      yetkiler.forEach(element => {
        if (uyeYetkiler.indexOf(element) > -1) {
          sonuc = true;
          return false;
        }
      })
    }
    return sonuc;
  }

}
