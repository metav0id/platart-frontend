import {
  Component,
  Injectable,
  OnInit
} from '@angular/core';

@Component({
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.css']
})

@Injectable({
  providedIn: 'root'
})
export class ElementComponent implements OnInit {
  imagesBasic = [
    {
      src: "assets/images/sw1.jpg",
      thumb: "assets/images/sw1.jpg",
      description: "Image 1"
    },
    {
      src: "assets/images/sw2.jpg",
      thumb: "assets/images/sw2.jpg",
      description: "Image 2"
    },
    {
      src: "assets/images/ndts1.jpg",
      thumb: "assets/images/ndts1.jpg",
      description: "Image 3"
    },
    {
      src: "assets/images/ndts2.jpg",
      thumb: "assets/images/ndts2.jpg",
      description: "Image 4"
    },
    {
      src: "assets/images/ndts3.jpg",
      thumb: "assets/images/ndts3.jpg",
      description: 'Image 5'
    },
    {
      src: "assets/images/ndtw1.jpg",
      thumb: "assets/images/ndtw1.jpg",
      description: 'Image 6'
    },
    {
      src: "assets/images/ndtw2.jpg",
      thumb: "assets/images/ndtw2.jpg",
      description: 'Image 7'
    },
    {
      src: "assets/images/m1.jpg",
      thumb: "assets/images/m1.jpg",
      description: 'Image 8'
    },
    {
      src: "assets/images/m2.jpg",
      thumb: "assets/images/m2.jpg",
      description: 'Image 9'
    },
    {
      src: "assets/images/m3.jpg",
      thumb: "assets/images/m3.jpg",
      description: 'Image 10'
    },
    {
      src: "assets/images/msi1.jpg",
      thumb: "assets/images/msi1.jpg",
      description: 'Image 11'
    },
    {
      src: "assets/images/bi1.jpg",
      thumb: "assets/images/bi1.jpg",
      description: 'Image 12'
    },
    {
      src: "assets/images/co.jpg",
      thumb: "assets/images/co.jpg",
      description: 'Image 13'
    },
    {
      src: "assets/images/hbar.jpg",
      thumb: "assets/images/hbar.jpg",
      description: 'Image 14'
    },
    {
      src: "assets/images/ru1.jpg",
      thumb: "assets/images/ru1.jpg",
      description: 'Image 15'
    },
    {
      src: "assets/images/wc1.jpg",
      thumb: "assets/images/wc1.jpg",
      description: 'Image 16'
    },
    {
      src: "assets/images/nc1.jpg",
      thumb: "assets/images/nc1.jpg",
      description: 'Image 17'
    },
    {
      src: "assets/images/nc2.jpg",
      thumb: "assets/images/nc2.jpg",
      description: 'Image 18'
    },
    {
      src: "assets/images/csoi1.jpg",
      thumb: "assets/images/csoi1.jpg",
      description: 'Image 19'
    },
    {
      src: "assets/images/csoi2.jpg",
      thumb: "assets/images/csoi2.jpg",
      description: 'Image 20'
    },
    {
      src: "assets/images/csoi3.jpg",
      thumb: "assets/images/csoi3.jpg",
      description: 'Image 21'
    },
    {
      src: "assets/images/csoi4.jpg",
      thumb: "assets/images/csoi4.jpg",
      description: 'Image 22'
    },
    {
      src: "assets/images/ndfw1.jpg",
      thumb: "assets/images/ndfw1.jpg",
      description: 'Image 23'
    },
    {
      src: "assets/images/ndfw2.jpg",
      thumb: "assets/images/ndfw2.jpg",
      description: 'Image 24'
    },
    {
      src: "assets/images/si1.jpg",
      thumb: "assets/images/si1.jpg",
      description: 'Image 25'
    },
    {
      src: "assets/images/cii.jpg",
      thumb: "assets/images/cii.jpg",
      description: 'Image 26'
    },
    {
      src: "assets/images/ss1.jpg",
      thumb: "assets/images/ss1.jpg",
      description: 'Image 27'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
