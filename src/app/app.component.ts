import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private searchUrl = 'https://ht.kz/test/searchPartner1';
  private departCity: string;
  private country: string;
  private date: string;
  private nights: string;
  private nightsTo: string;
  private ids = {
    Алматы: 10,
    Астана: 11,
    Турция: 552 ,
    Тайланд: 553,
    Чехия: 554,
  };
  countries = [ 'Турция', 'Тайланд', 'Чехия'];
  cities = ['Алматы', 'Астана'];
  theDate: any;
  private searchRes: any;
  private sortedRes: any;
  constructor(private http: HttpClient, public fb: FormBuilder) {
    this.theDate = new Date();
  }

  searchForm = this.fb.group({
    city: [''],
    date: [''],
    nights: [''],
    nightsTo: [''],
    country: ['']
  });

  search(obj) {
    const params = new HttpParams()
      .set('departCity', obj.city)
      .set('country', obj.country)
      .set('date', obj.date)
      .set('nights', obj.nights)
      .set('nightsTo', obj.nightsTo);
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    this.http.get(this.searchUrl, {
      headers,
      params
    })
      .subscribe(data => {
        console.log(data);
        this.searchRes = data;
        this.sortedRes = this.searchRes.tours.sort((a, b) => (a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0));
        console.log(this.sortedRes );
      });
  }

  onSubmit() {
   // this.search();
    console.log(this.searchForm.value);
    this.search(this.searchForm.value);
  }

  compare(a, b) {
    if ( a.last_nom < b.last_nom ){
      return -1;
    }
    if ( a.last_nom > b.last_nom ){
      return 1;
    }
    return 0;
  }


}
