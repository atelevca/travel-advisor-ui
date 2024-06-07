import { Component, Input } from '@angular/core';
import { Country, TravelForm, TravelInput } from '../../models/models';
import { SkeletonComponent } from '../skeleton/skeleton.component';
import { NgOptimizedImage } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { CountryDetailsComponent } from '../country-details/country-details.component';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-response',
  standalone: true,
  imports: [SkeletonComponent, NgOptimizedImage],
  templateUrl: './response.component.html',
  styleUrl: './response.component.scss',
})
export class ResponseComponent {
  @Input() isLoading: boolean;
  @Input() data!: Country[];
  @Input()
  formValue: TravelInput;

  constructor(private readonly _dialog: MatDialog) {}

  openDetails(countryName: string): void {
    const { travelCompanions, interests, accommodation } = this.formValue;

    this._dialog.open(CountryDetailsComponent, {
      minWidth: '850px',
      maxHeight: '90vh',
      data: { countryName, travelCompanions, interests, accommodation },
    });
  }
}
