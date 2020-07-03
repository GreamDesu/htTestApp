import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})

export class HelperService {
  searchRes: Result;
  private sortedRes: [{ hotelName: string; price: number; currency: string }];
  constructor(private http: HttpClient) {
  }

  search = async (obj, searchUrl) => {
    const params = new HttpParams()
      .set('departCity', obj.city)
      .set('country', obj.country)
      .set('date', obj.datepick)
      .set('nights', obj.nights)
      .set('nightsTo', obj.nightsTo);
    return this.http.get(searchUrl, {
      params
    }).pipe(map(data => {
      this.searchRes =  data as Result;
      this.sortedRes = this.searchRes.tours.sort((a, b) => (a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0));
      return this.sortedRes;
    }));
  }
}
