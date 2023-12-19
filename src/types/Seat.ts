import { Screening } from "./Screening";

export type Seat = {
	id?: string;
	state: SeatState;
	row: string;
	column: string;
	deleted: boolean;
	screening: Screening;
};

export enum SeatState {
	AVAILABLE = "AVAILABLE",
	RESERVED = "RESERVED",
	OCCUPIED = "OCCUPIED",
}
