export type ConfirmationState = 'confirmed' | 'pending' | 'cancelled';

export interface Booking {
  id: string;
  dateFrom: string;
  dateTo: string;
  city: string;
  country: string;
  name: string;
  confirmationState: ConfirmationState;
}
