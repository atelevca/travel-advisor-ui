import {
  ChangeDetectionStrategy,
  Component,
  Input,
  input,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatError,
  MatFormField,
  MatFormFieldModule,
  MatLabel,
} from '@angular/material/form-field';
import { TravelForm } from '../../models/models';
import {
  AsyncPipe,
  KeyValuePipe,
  NgClass,
  NgTemplateOutlet,
} from '@angular/common';
import { MatInput } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import {
  Accommodation,
  Climate,
  DietaryPreferences,
  Interests,
  LanguagePreferences,
  MobilityRequirements,
  TravelCompanions,
  TravelDuration,
  TravelExperience,
} from '../../models/enums';
import { DataService } from '../../services/data.service';
import { map, Observable, startWith } from 'rxjs';
import {
  MatAutocomplete,
  MatAutocompleteTrigger,
} from '@angular/material/autocomplete';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatError,
    MatLabel,
    NgTemplateOutlet,
    MatInput,
    MatSelect,
    MatOption,
    KeyValuePipe,
    NgClass,
    AsyncPipe,
    MatAutocompleteTrigger,
    MatAutocomplete,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent implements OnInit {
  @Input()
  isSearchTriggered: boolean;

  @Input()
  form: FormGroup<TravelForm>;

  allCountries: string[];
  filteredOptions: Observable<string[]>;

  protected readonly Climate = Climate;
  protected readonly Interests = Interests;
  protected readonly TravelDuration = TravelDuration;
  protected readonly Accommodation = Accommodation;
  protected readonly TravelCompanions = TravelCompanions;
  protected readonly LanguagePreferences = LanguagePreferences;
  protected readonly DietaryPreferences = DietaryPreferences;
  protected readonly MobilityRequirements = MobilityRequirements;
  protected readonly TravelExperience = TravelExperience;

  constructor(private readonly _dataService: DataService) {}

  ngOnInit(): void {
    this._dataService.getCountries().subscribe((countries) => {
      this.allCountries = countries;
      this.filteredOptions = this.form.controls.nationality.valueChanges.pipe(
        startWith(''),
        map((value) => this._filter(value || '')),
      );
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allCountries?.filter((option) =>
      option.toLowerCase().includes(filterValue),
    );
  }
}
