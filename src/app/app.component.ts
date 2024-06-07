import { Component, signal, WritableSignal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatFabButton } from '@angular/material/button';
import { FormComponent } from './components/form/form.component';
import { NgClass } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Country, TravelForm, TravelInput } from './models/models';
import { ResponseComponent } from './components/response/response.component';
import { DataService } from './services/data.service';
import { map, switchMap, tap } from 'rxjs';
import { LoaderComponent } from './components/loader/loader.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatIcon,
    MatFabButton,
    FormComponent,
    NgClass,
    MatButton,
    ResponseComponent,
    LoaderComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  isLoading: WritableSignal<boolean> = signal(false);
  data: Country[];

  title = 'travel-helper';
  form: FormGroup<TravelForm> = this._fb.group({
    budgetFrom: new FormControl(100, Validators.required),
    budgetTo: new FormControl(1000, Validators.required),
    climate: new FormControl(null, Validators.required),
    interests: new FormControl(null, Validators.required),
    travelDuration: new FormControl(null, Validators.required),
    accommodation: new FormControl(null, Validators.required),
    travelCompanions: new FormControl(null, Validators.required),
    languagePreferences: new FormControl(null, Validators.required),
    dietaryPreferences: new FormControl(null, Validators.required),
    mobilityRequirements: new FormControl(null, Validators.required),
    travelExperience: new FormControl(null, Validators.required),
    nationality: new FormControl('', Validators.required),
    notes: new FormControl(''),
  });

  isSearchTriggered: WritableSignal<boolean> = signal(false);
  submittedValue: TravelInput;

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _dataService: DataService,
  ) {}

  submit(): void {
    this.submittedValue=this.form.getRawValue();

    this.isSearchTriggered.set(true);
    this.isLoading.set(true);
    this._dataService
      .getOpenAIResponse(this.form.getRawValue())
      .pipe(
        switchMap((countries: Country[]) =>
          this._dataService
            .getImages(countries.map((c) => c.countryName))
            .pipe(
              map((imgs: string[]) =>
                countries.map((c, i) => ({ ...c, imageUrl: imgs[i] })),
              ),
            ),
        ),
        tap((data) => (this.data = data)),
      )
      .subscribe(() => this.isLoading.set(false));
  }
}
