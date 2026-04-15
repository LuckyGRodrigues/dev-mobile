import AsyncStorage from '@react-native-async-storage/async-storage';

export const BOOKINGS_STORAGE_KEY = '@sporthub:bookings';

export type Booking = {
  id: string;
  courtName: string;
  neighborhood: string;
  city: string;
  time: string;
  createdAt: string;
};

export type BookingInput = {
  courtName: string;
  neighborhood: string;
  city: string;
  time: string;
};

function isBookingArray(value: unknown): value is Booking[] {
  return Array.isArray(value);
}

export async function getBookings(): Promise<Booking[]> {
  const storedBookings = await AsyncStorage.getItem(BOOKINGS_STORAGE_KEY);

  if (!storedBookings) {
    return [];
  }

  try {
    const parsedBookings: unknown = JSON.parse(storedBookings);

    if (!isBookingArray(parsedBookings)) {
      return [];
    }

    return parsedBookings;
  } catch {
    return [];
  }
}

export async function saveBooking(bookingInput: BookingInput): Promise<Booking> {
  const existingBookings = await getBookings();
  const newBooking: Booking = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
    ...bookingInput,
  };

  await AsyncStorage.setItem(
    BOOKINGS_STORAGE_KEY,
    JSON.stringify([newBooking, ...existingBookings]),
  );

  return newBooking;
}