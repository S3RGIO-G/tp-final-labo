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
  @ViewChild('canvas') canvas !: ElementRef;
  @ViewChild('textError') textError !: ElementRef;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {}

  createChart() {
    let counter = 0;
    this.data.forEach(d=>{
      if(!d) counter++;
    })

    if(counter === this.data.length) {
      this.canvas.nativeElement.classList.add('hidden');
      this.textError.nativeElement.classList.add('show');
    }
    else{
      this.textError.nativeElement.classList.remove('show');
      this.canvas.nativeElement.classList.remove('hidden');

    }

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
