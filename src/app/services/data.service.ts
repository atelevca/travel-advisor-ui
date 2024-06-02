import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { combineLatest, map, Observable, tap } from 'rxjs';
import {
  Country,
  GPTResponse,
  ImageResponse,
  ParsedData,
  TravelInput,
} from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private readonly _baseUrl = 'http://localhost:3000/openai';
  constructor(private readonly _http: HttpClient) {}

  getOpenAIResponse(data: TravelInput): Observable<Country[]> {
    return this._http
      .post<GPTResponse[]>(`${this._baseUrl}/message`, data)
      .pipe(
        map((res) => res[0].message.content),
        map((res) => (JSON.parse(res) as ParsedData).countries),
      );
  }

  getImages(countries: string[]): Observable<string[]> {
    const requests: Observable<string>[] = countries.map((countryName) =>
      this._http
        .post<any>(`${this._baseUrl}/image`, { countryName })
        .pipe(map((res: ImageResponse) => res?.data[0]?.url)),
    );

    return combineLatest<string[]>(requests).pipe(
      map((res) => res.slice(0, 5)),
    );
  }

  getCountries(): Observable<string[]> {
    return this._http
      .get<string[]>(`https://countriesnow.space/api/v0.1/countries`)
      .pipe(map((res: any) => res?.data.map((x: any) => x.country)));
  }
}
