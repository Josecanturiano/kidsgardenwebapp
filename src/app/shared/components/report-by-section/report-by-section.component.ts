import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import autoTable from 'jspdf-autotable';
import jsPDF from 'jspdf';
import {SchoolService} from '../../services/school.service';

@Component({
  selector: 'app-report-by-section',
  templateUrl: './report-by-section.component.html',
  styleUrls: ['./report-by-section.component.scss'],
})
export class ReportBySectionComponent implements OnInit {

  header: string;
  subheader: string;
  type: string;
  cols: any;
  list: any;

  constructor(
    private schoolService: SchoolService,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<ReportBySectionComponent>) {
    if (data) {
      this.list = data.list;
      this.setType(data.type);
    }
  }

  setType(type) {
    this.type = type;
    switch (type) {
      case 'SectionMechanics':
        this.header = 'Reporte de actividades por sección';
        this.cols = this.getReportColsBySeccion();
        break;
      case 'ReportByStudent':
        this.header = 'Reporte por estudiante';
        this.subheader = this.data.studentName;
        this.cols = this.getReportColsByStudent();
        break;
      case 'ReportByStudentEvaluation':
        this.header = 'Reporte por estudiante';
        this.subheader = this.data.studentName;
        this.cols = this.getReportColsByStudentEvaluation();
        break;
    }
  }

  getReportColsBySeccion() {
    return [
      {header: 'Estudiante', field: 'estudiante'},
      {header: 'Cantidad de actividades asignadas', field: 'a'},
      {header: 'Cantidad de actividades completadas', field: 'b'},
      {header: 'Cantidad de actividades corregidas', field: 'c'},
      {header: 'Cantidad de actividades superadas', field: 'd'},
    ];
  }

  getReportColsByStudent() {
    return [
      {header: 'Actividad', field: 'actividad'},
      {header: 'Mecánica', field: 'mecanica'},
      {header: 'Competencia', field: 'competencia'},
      {header: 'Objetivos', field: 'objetivos'},
      {header: 'Comentarios', field: 'comentarios'},
      {header: 'Logrado', field: 'logrado'},
    ];
  }

  getReportColsByStudentEvaluation() {
    return [
      {header: 'Evaluación', field: 'evaluacion'},
      {header: 'Mecánica', field: 'mecanica'},
      {header: 'Competencia', field: 'competencia'},
      {header: 'Objetivos', field: 'objetivos'},
      {header: 'Comentarios', field: 'comentarios'},
      {header: 'Logrado', field: 'logrado'}
    ];
  }

  exportPdf() {
    // @ts-ignore
    const doc = new jsPDF('p', 'pt', 'a4');

    this.addHeader(doc);
    // FOOTER
    const str = 'Page ';
    doc.setFontSize(10);

    autoTable(doc, {
      startY: 140,
      columns: this.cols.map(col => ({title: col.header, dataKey: col.field})),
      body: this.list,
      didDrawPage: (dataArg) => {
        // doc.text(this.header, dataArg.settings.margin.left, 10);
      }
    });
    doc.save('reporte_estudiante.pdf');
  }

  addHeader(doc) {
    switch (this.type) {
      case 'SectionMechanics':
        break;
      case 'ReportByStudent':
      case 'ReportByStudentEvaluation':
        this.addStudentHeader(doc);
        break;
    }
  }

  addStudentHeader(doc: jsPDF) {
    doc.setFontSize(10);
    doc.text('Institución de prueba', 50, 22);
    doc.text('Periodo escolar: SEP - DIC (2021)', 50, 42);
    doc.text('Estudiante : Estudiante de prueba', 50, 62);
    doc.text('Docente : Docente de prueba', 50, 82);
    doc.text('Fecha : ' + new Date().getDay() + '/' + new Date().getMonth() + '/' + new Date().getFullYear(), 50, 102);
  }

  ngOnInit() {
  }

}
