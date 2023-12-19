import { Screening } from "./Screening";

export type Movie = {
	id:string;
	title: string;
	description: string;
	duration: string;
	screenings: Screening[];
	cover: string;
};

export enum MovieStatus {
	AVAILABLE = "AVAILABLE",
	ONGOING = "ONGOING",
	DONE = "DONE",
	CANCELED = "CANCELED",
}
