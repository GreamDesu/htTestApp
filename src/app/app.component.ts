import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder,  Validators } from '@angular/forms';
import {HelperService} from './services/helper.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private searchUrl = 'https://ht.kz/test/searchPartner1';
  ids = {
    10: ['Турция', 'Тайланд'],
    11: ['Турция', 'Чехия']
  };
  cities = {
    10: 'Алматы',
    11: 'Астана'
  };
  minDate: string;
  maxDate: string;
  reqResult: [{ hotelName: string; price: number; currency: string }];

  constructor(private http: HttpClient, public fb: FormBuilder, private helper: HelperService) {
    const tomorrow  = new Date();
    tomorrow.setDate(new Date().getDate() + 1);
    const nextNinety =  new Date();
    nextNinety.setDate(new Date().getDate() + 90);
    this.minDate = tomorrow.toISOString().split('T')[0];
    this.maxDate = nextNinety.toISOString().split('T')[0];
  }

  searchForm = this.fb.group({
    city: ['', Validators.required],
    datepick: ['', Validators.required],
    nights: ['', Validators.required],
    nightsTo: ['', Validators.required],
    country: ['', Validators.required]
  });


  async onSubmit() {
    console.log(this.searchForm.value);
    if (this.searchForm.invalid) {
      alert('Пожалуйста, заполните все поля');
      return;
    }
    (await this.helper.search(this.searchForm.value, this.searchUrl)).subscribe(
      (data) => {
        this.reqResult =  data;
      });
  }
}
