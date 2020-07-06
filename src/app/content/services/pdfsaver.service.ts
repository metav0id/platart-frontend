import { Injectable } from '@angular/core';
import html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf';

@Injectable({
  providedIn: 'root'
})

export class PdfsaverService {

  constructor() { }

  saveScreenToPDF(data: any, source: string) {
    html2canvas(data).then(canvas => {

      // Umrechnung Canvas-Daten auf Zentimeter

      const canvasWidth: number = (canvas.width / 96.0 * 2.54);
      const canvasHeight: number = (canvas.height / 96.0 * 2.54);
      const canvasAR: number = (canvasHeight / canvasWidth);

      // Berechnung der Werte zum Skalieren des Canvas auf A4 aufgrund der Canvasbreite

      let newCanvasWidth: number;
      let newCanvasHeight: number;
      let resizeMulti: number;

      if (canvasWidth > 20.0) {
        resizeMulti = canvasWidth / 20.0;
        newCanvasWidth = (canvasWidth / resizeMulti);
        newCanvasHeight = (canvasHeight / resizeMulti);
      } else {
        newCanvasWidth = canvasWidth;
        newCanvasHeight = canvasHeight;
      }

      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'cm', 'a4');
      pdf.addImage(contentDataURL, 'PNG', 0.5, 0.5, newCanvasWidth, newCanvasHeight);
      const fileName = 'Platart-' + source + '-' + new Date().toISOString() + '.pdf';
      pdf.save(fileName);
    });
  }
}
