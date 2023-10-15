export class Leagues {
  id: number;
  name: string;
  season: string;
  constructor(
    id: number,
    name: string,
    season: string
  ) {
    this.id = id;
    this.name = name;
    this.season = season;
  }
}
