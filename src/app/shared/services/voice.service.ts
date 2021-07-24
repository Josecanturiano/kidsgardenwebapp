import { Injectable } from '@angular/core';
import Speech from 'speak-tts'

@Injectable({
  providedIn: 'root'
})
export class VoiceService {

  private speech;
  private options = {
    'volume': 1,
        'lang': 'es-ES',
        'rate': 1,
        'pitch': 1,
        'voice':'Google español',
        'splitSentences': true,
  };

  constructor() {

    this.speech = new Speech();
    this.speech.init( this.options ).then((data) => {    
      console.log("Speech is ready, voices are available", data)
    }).catch(e => {
        console.error("An error occured while initializing : ", e)
    })

  }

  speak( message ){

    this.speech.speak({
      text: message,
    });

  }

  pause(){
    this.speech.pause();
  }

  resume(){
    this.speech.resume();
  }

}
