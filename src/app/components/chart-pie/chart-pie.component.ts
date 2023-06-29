import { Component, Input, OnInit, ElementRef, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableConfig, jsPDF } from 'jspdf';
import { Chart, registerables } from 'chart.js';
import html2canvas from 'html2canvas';
// import  from 'html2canvas';
Chart.register(...registerables);

@Component({
  selector: 'app-chart-pie',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chart-pie.component.html',
  styleUrls: ['./chart-pie.component.scss'],
})
export class ChartPieComponent {
  chartRef!: Chart<'pie', number[], string>;
  @Input() labels!: string[];
  @Input() data!: number[];
  @Input() bgColors!: string[];

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {}

  createChart() {
    const ref = this.elementRef.nativeElement.querySelector(`#myChart`);
    this.chartRef = new Chart(ref, {
      type: 'pie',
      data: {
        labels: this.labels,
        datasets: [
          {
            data: this.data,
            backgroundColor: this.bgColors,
            hoverOffset: 4,
          },
        ],
      },
    });
  }

}
