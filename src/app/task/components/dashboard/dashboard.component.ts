import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EChartOption } from 'echarts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  chartBarOption: EChartOption;
  chartPieOption: EChartOption;

  constructor(private matDialogRef: MatDialogRef<DashboardComponent>, @Inject(MAT_DIALOG_DATA) public data: Array<any>) { }

  ngOnInit() {

    const category = [];
    const dataEntry = [];

    this.matDialogRef = this.matDialogRef.addPanelClass('mat');

    this.data.forEach(value => {
      category.push(value.title as never);
      dataEntry.push(value.size as never);
    });

    const textSty = {
      textStyle: {
        fontStyle: 'italic',
      }
    };

    this.chartBarOption = {
      title: {
        text: 'task Per List',
        textStyle: {
          fontStyle: 'italic'
        },
      },
      grid: {
        containLabel: true
      },
      legend: {
        type: 'scroll',
        orient: 'horizontal',
        bottom: 'bottom',
      },
      tooltip: {
        trigger: 'axis',
        // axisPointer: {
        // type: 'shadow'
        // }
      },
      xAxis: {
        type: 'category',
        data: category,
        boundaryGap: false,
        // position: 'top'
      },
      yAxis: {
        interval: 1,
        min: 0,
        max: (value) => {
          return value.max + 3;
        },
        type: 'value',
        name: 'Task count',
        nameLocation: 'middle',
        nameGap: 25
      },
      series: [
        {
          name: 'Task Count',
          data: dataEntry,
          barWidth: '30%',
          type: 'line',
          areaStyle: {}
        },
      ],
    };
    this.chartPieOption = {
      title: {
        text: 'Pie Chart',
        ...textSty,
      },
      legend: {
        type: 'scroll',
        orient: 'horizontal',
        bottom: 'bottom',
        data: ['Apple', 'Grapes', 'Pineapples', 'Oranges', 'Bananas']
      },
      tooltip: {
        trigger: 'item',
        axisPointer: {
          type: 'shadow'
        }
      },
      series: [{
        type: 'pie',
        data: [{
          value: 335,
          name: 'Apple'
        }, {
          value: 310,
          name: 'Grapes'
        }, {
          value: 234,
          name: 'Pineapples'
        }, {
          value: 135,
          name: 'Oranges'
        }, {
          value: 1548,
          name: 'Bananas'
        }]
      }]
    };

    setTimeout(() => {
      this.setLoading();
    }, 5000);
  }

  onChartEvent(event: any, type: string) {
    console.log('chart event:', type, event);
  }

  setLoading() {
    console.log('SetLoading');

  }
}
