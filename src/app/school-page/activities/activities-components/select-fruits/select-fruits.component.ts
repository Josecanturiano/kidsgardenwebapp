import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild, AfterContentInit } from '@angular/core';
import { NgxCaptureService } from 'ngx-capture';
import { tap } from 'rxjs/operators';

declare let html2canvas: any;

@Component({
  selector: 'select-fruits-colors',
  templateUrl: './select-fruits.component.html',
  styleUrls: ['./select-fruits.component.scss'],
})
export class SelectFruitsComponent implements OnInit {

  @ViewChild('screen', { static: true }) screen: any;

  constructor(private captureService:NgxCaptureService) { }

  ngOnInit() {}

  capture(){
    html2canvas(document.querySelector("#capture")).then(canvas => {

     canvas.toBlob(function (blob) {
       var reader = new FileReader();
       reader.readAsDataURL(blob);
       reader.onloadend = function () {
         let base64data = reader.result;
         console.log(base64data);
       }

     });


   });
  }

  todo = [
    { 
      label: 'Pera',
      img: 'data:image/png;base64,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', 
    },
    { 
      label: 'Fresas',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFGJZcds1Zd-qduFh_Sc2_wzOH3C6gmcDA-w&usqp=CAU', 
    },
    { 
      label: 'Mango',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgb8P7kzKFLrdXy3f1SzHzdVgSdiCRQP66qA&usqp=CAU', 
    },
    { 
      label: 'Pimiento',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFXEOkVAXSMW2CDdhT2Nkyga1g60xIB_vVcw&usqp=CAU', 
    },
    { 
      label: 'Lechuga',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxGxo0zCfxGKgqIMtOtwJZeVW1dESQh-zuZA&usqp=CAU', 
    },
    { 
      label: 'Zanahoria',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9q0RE9ESjaaikpbWqDdAjh0QsAipJIM08FA&usqp=CAU' 
    },
  ];

  done = [
  
  ];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

}
