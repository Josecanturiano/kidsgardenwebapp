import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-par-colors',
  templateUrl: './par-colors.component.html',
  styleUrls: ['./par-colors.component.scss'],
})
export class ParColorsComponent implements OnInit {

  constructor() { }

  colors = ['Azul', 'Rojo', 'Verde', 'Morado', 'Naranja', 'Verde', 'Amarillo', 'Negro', 'Blanco'];
  tags = ['#3a86ff', '#f94144', '#43aa8b', '#8338ec', '#f3722c', '#43aa8b', '#ffd500', '#0b090a', '#ffffff'];

  ngOnInit() {}

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.colors, event.previousIndex, event.currentIndex);
  }

}
