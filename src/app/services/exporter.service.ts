import { Injectable } from '@angular/core';
// import * as XLSX from 'xlsx';
// import {FileSaverService} from "ngx-filesaver";

@Injectable({
  providedIn: 'root',
})
export class ExporterService {
  private EXCEL_TYPE =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  private EXCEL_EXTENSION = '.xlsx';

  // constructor(private fileService : FileSaverService) { }
  constructor() {}

  // exportToExcel(json: any[], excelFileName: string) {
  //   const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
  //   const workbook: XLSX.WorkBook = {
  //     Sheets: { data: worksheet },
  //     SheetNames: ['data'],
  //   };

  //   const excelBuffer = XLSX.write(workbook, {
  //     bookType: 'xlsx',
  //     type: 'array',
  //   });
    // const blobData = new Blob([excelBuffer], { type: this.EXCEL_TYPE });
    // this.fileService.save(blobData, excelFileName + '_export_' + new Date().getTime() + this.EXCEL_EXTENSION);
  // }
}
