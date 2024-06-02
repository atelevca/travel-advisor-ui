import { Component, Input } from '@angular/core';
import { Country } from '../../models/models';
import { SkeletonComponent } from '../skeleton/skeleton.component';

@Component({
  selector: 'app-response',
  standalone: true,
  imports: [SkeletonComponent],
  templateUrl: './response.component.html',
  styleUrl: './response.component.scss',
})
export class ResponseComponent {
  @Input() isLoading: boolean;
  @Input() data!: Country[];
}
