
export interface Person {
  birth_year: number | null;
  death_year: number | null;
  name: string;
}

export interface Format {
  [mimeType: string]: string;
}

export interface Book {
  id: number;
  title: string;
  authors: Person[];
  translators: Person[];
  subjects: string[];
  bookshelves: string[];
  languages: string[];
  copyright: boolean | null;
  media_type: string;
  formats: Format;
  download_count: number;
  summaries?: string[];
}

export interface BookListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Book[];
}
