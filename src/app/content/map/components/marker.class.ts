export class Marcador{

  public lat: number;
  public lng: number;
  public titulo = 'sin titulo';
  public desc = 'no description';
  public link = 'empty';

  constructor(lat: number, lng: number) {
    this.lat = lat;
    this.lng = lng;
  }
}
