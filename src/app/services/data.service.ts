import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { combineLatest, map, Observable } from 'rxjs';
import {
  Country, CountryDetailsPayload,
  GPTResponse,
  ImageResponse,
  ParsedData, ParsedDetails, Place,
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

  getCountryDetails(data: CountryDetailsPayload):Observable<Place[]>{
  return this._http.post<GPTResponse[]>(`${this._baseUrl}/details`, data)
    .pipe(
      map((res) => res[0].message.content),
      map((res) => (JSON.parse(res) as ParsedDetails).places),
    );
  }

  getImages(countries: string[]): Observable<string[]> {
    const requests: Observable<string>[] = countries.map((countryName) =>
      this._http
        .post<any>(`${this._baseUrl}/image`, { countryName })
        .pipe(map((res: ImageResponse) => res?.data[0]?.url)),
    );

    return combineLatest<string[]>(requests).pipe(
      map((res) => res),
    );
  }

  getCountries(): Observable<string[]> {
    return this._http
      .get<{countries:string[]}>(`${this._baseUrl}/countries`)
      .pipe(map((res: {countries:string[]}) => res?.countries));
  }
}
