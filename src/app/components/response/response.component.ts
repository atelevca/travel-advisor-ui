import { Component, Input } from '@angular/core';
import { Country } from '../../models/models';
import { SkeletonComponent } from '../skeleton/skeleton.component';
import {NgOptimizedImage} from "@angular/common";

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
}
