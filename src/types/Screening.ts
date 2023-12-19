import { Seat } from "./Seat";

export type Screening = {
    id: string;
    date: Date;
    seats?: Seat[];
    movieId: string;
}

