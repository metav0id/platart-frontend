export class Marcador {

  public lat: string;
  public lng: string;
  public category: string;
  public name: string;
  public address: string;
  public link: string;
  public id: number;

  constructor(lat: string, lng: string) {
    this.lat = lat;
    this.lng = lng;
  }
}
