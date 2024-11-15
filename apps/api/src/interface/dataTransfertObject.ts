export interface GenreDTO {
  label: string;
}

export interface GameDTO {
  name: string;
  genres?: GenreDTO[];
}
