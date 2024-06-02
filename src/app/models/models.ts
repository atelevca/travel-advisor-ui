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
} from './enums';
import { FormControl, Validators } from '@angular/forms';

export interface TravelInput {
  budgetFrom: number;
  budgetTo: number;
  climate: Climate;
  interests: Interests;
  travelDuration: TravelDuration;
  accommodation: Accommodation;
  travelCompanions: TravelCompanions;
  languagePreferences: LanguagePreferences;
  dietaryPreferences: DietaryPreferences;
  mobilityRequirements: MobilityRequirements;
  travelExperience: TravelExperience;
  nationality: string;
  notes: string;
}

export interface TravelForm {
  budgetFrom: FormControl;
  budgetTo: FormControl;
  climate: FormControl;
  interests: FormControl;
  travelDuration: FormControl;
  accommodation: FormControl;
  travelCompanions: FormControl;
  languagePreferences: FormControl;
  dietaryPreferences: FormControl;
  mobilityRequirements: FormControl;
  travelExperience: FormControl;
  nationality: FormControl;
  notes: FormControl;
}

export interface GPTResponse {
  index: number;
  message: {
    role: string;
    content: string;
  };
  logprobs: any;
  finish_reason: string;
}

export interface ParsedData {
  countries: Country[];
}

export interface Country {
  countryName: string;
  description: string;
  visaRequired: boolean;
  imageUrl: string;
}

export interface ImageResponse {
  data: ImageData[];
}

export interface ImageData {
  url: string;
}
