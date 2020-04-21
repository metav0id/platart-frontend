export class Marcador{

  public lat: string;
  public lng: string;
  public category: string;
  public name = 'sin titulo';
  public address = 'no description';
  public link = 'empty';

  constructor(lat: string, lng: string) {
    this.lat = lat;
    this.lng = lng;
  }
}
