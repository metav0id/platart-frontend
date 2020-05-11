import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-arch-gauge-card',
  templateUrl: './arch-gauge-card.component.html',
  styleUrls: ['./arch-gauge-card.component.css']
})
export class ArchGaugeCardComponent implements OnInit {

  @Input() label: string;
  @Input() total: string;
  @Input() unit: string;
  @Input() gaugeValue: number;
  @Input() gaugeLabel: string;
  @Input() gaugeAppendText: string;
  @Input() gaugeType: string;
  @Input() gaugeMin: number;
  @Input() gaugeMax: number;
  @Input() threshMin: number;
  @Input() threshMid: number;
  @Input() threshMax: number;

  gaugeCap: 'round';

  // todo: find way to implement variable threshold-values and inverted threshold-values for percentage gauge

  thresholdConfig = {
    '0': {color: 'red'},
    // threshMid: {color: 'orange'},
    // threshMax: {color: 'green'}
  };

  constructor() { }

  ngOnInit(): void {
  }

}
