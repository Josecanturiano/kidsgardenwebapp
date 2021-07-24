import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertService } from 'src/app/shared/services/alert.service';
import { SectionsService } from 'src/app/shared/services/sections.service';
import { SectionsFormComponent } from '../sections-form/sections-form.component';

@Component({
  selector: 'app-sections-list',
  templateUrl: './sections-list.component.html',
  styleUrls: ['./sections-list.component.scss'],
})
export class SectionsListComponent implements OnInit {
  
  sections: any;
  loading = true;
  cols: any;
  constructor(
    private service: SectionsService, 
    private alertService: AlertService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {

    this.cols = [
      { field: 'Nombre', header: 'Seccion' },
      { field: 'Grado', header: 'Grado' },
      { field: 'Capacidad', header: 'Capacidad maxima' },
      { field: 'Cantidad', header: 'Cantidad' },
      { field: 'Disponible', header: 'Cantidad Disponible' },
    ];

    this.service.getSections().subscribe( sections => {
      this.sections = sections;
      console.log(this.sections);
      this.loading = false;
    } )
  }

  abrirDialogo() {
    const dialogo1 = this.dialog.open((SectionsFormComponent), {
      data: {
        Grado_ID: null,
        Maestro: null,
        Asistente: null
      }
    });

    dialogo1.afterClosed().subscribe(art => {
      if (art != undefined)
        this.agregar(art);
    });
  }

  agregar( section ) {
    console.log(section);
    this.alertService.presentLoading();
    this.service.createSection( section ).subscribe( x => {
      this.alertService.dismissLoading();
      this.alertService.success( "la sección fue creada" );
    } )
  }

}
