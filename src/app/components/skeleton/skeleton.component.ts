import { Component, Input } from '@angular/core';
import { NgClass, NgStyle } from '@angular/common';

@Component({
  selector: 'app-skeleton',
  standalone: true,
  imports: [NgStyle, NgClass],
  templateUrl: './skeleton.component.html',
  styleUrl: './skeleton.component.scss',
})
export class SkeletonComponent {
  @Input() width: string;
  @Input() height: string = '1rem'; //16px default
  @Input() appearance: 'circle' | 'rectangle' = 'rectangle';
}
