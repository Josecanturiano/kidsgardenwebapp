import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { VoiceService } from 'src/app/shared/services/voice.service';

@Component({
  selector: 'app-order-numbers',
  templateUrl: './order-numbers.component.html',
  styleUrls: ['./order-numbers.component.scss'],
})
export class OrderNumbersComponent implements OnInit {

  constructor( private voiceService: VoiceService ) { }

  ngOnInit() {}

  movies = ['1','2','3','4','5','6','7','8','9'].sort(function (a, b) { return 0.5 - Math.random() })

  sound( message ){
    this.voiceService.speak( message );
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }

}
