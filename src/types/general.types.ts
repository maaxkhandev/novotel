import { Timestamp } from "firebase/firestore";

export interface IDealModel {
  id?: string; 
  dealName: string;
  roomType: string;
  price: number;
  discount: number;
  roomFacility: string;
  startDate: Timestamp; 
  endDate: Timestamp;
}

export interface IRateModel {
  id?:string;
 roomType: string;
 cancellationPolicy: string;
 deal?: string | null;
 pricePerDay: number;
 totalCapacity: number;
}

export interface IRoomModel {
   id?: string; 
  roomNumber: string;
  bedType: string;
  floor: number;
  roomType: string;
  facilities: string[];
  status: "Available" | "Booked" | "Reserved"| "Waitlist"|"Blocked"; // Room status
}
export interface IGuestModel {
  id?: string;
  reservationId: string;
  name: string;
  contact: string; 
  roomNumber: string[];
  roomType: string; 
  pricePerDay: number,
  startDate: Timestamp; 
  endDate: Timestamp; 
  duration: number;
  totalAmount: number;
  amountPaid: number; 
  specialRequests?: string; 
  status: "Clean" | "Dirty" | "Inspected"; 
}



// ************************************************************************************************



export interface RoomType {
  id: number;
  name: string;
  currentBookings: number;
  totalCapacity: number;
  pricePerDay: number;
  dealsCount: number;
}

export interface Room {
  id: string; 
  roomNumber: string; 
  roomFloor: string; 
  roomFacility: string[];
  status: "Available" | "Booked" | "Reserved" | "Waitlist" | "Blocked"; 
  hotelId: string; 
}


export interface Deal {
  id: string;
  dealName: string;
  roomType: string[];
  reservationsLeft: number;
  endDate: string | null;
  status: "Ongoing" | "Full" | "Inactive" | "New";
}

export interface RoomDeal {
  roomType: string;
  deals: string;
  cancellationPolicy: string;
  dealPrice: number;
  rate: number;
  availability: string;
}

export interface Reservation {
  reservationId: string;
  name: string;
  roomNumber: string;
  totalAmount: number;
  amountPaid: number;
  status: "Clean" | "Dirty" | "Inspected";
}

