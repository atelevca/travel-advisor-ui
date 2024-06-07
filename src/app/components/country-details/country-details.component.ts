import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from '@angular/material/dialog';
import { CountryDetailsPayload, Place } from '../../models/models';
import { DataService } from '../../services/data.service';
import {finalize, Observable} from 'rxjs';
import {SkeletonComponent} from "../skeleton/skeleton.component";
import {AsyncPipe, NgIf, NgOptimizedImage} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatFabButton} from "@angular/material/button";

@Component({
  selector: 'app-country-details',
  standalone: true,
  imports: [
    SkeletonComponent,
    NgOptimizedImage,
    AsyncPipe,
    NgIf,
    MatIcon,
    MatFabButton,
    MatDialogActions,
    MatDialogClose,
    MatButton,
    MatDialogTitle,
    MatDialogContent
  ],
  templateUrl: './country-details.component.html',
  styleUrl: './country-details.component.scss',
})
export class CountryDetailsComponent implements OnInit {
  places$: Observable<Place[]>;
  isLoading:boolean;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: CountryDetailsPayload,
    private readonly _dataService: DataService,
  ) {}

  ngOnInit(): void {
    this.isLoading=true;
    this.places$ = this._dataService.getCountryDetails(this.data).pipe(
      finalize(()=>this.isLoading=false)
    );
  }
}
