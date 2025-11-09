// src/reducers/BookingReducer.js
export function bookingReducer(state, action) {
  switch(action.type) {
    case "SET_BOOKINGS":
      return action.payload; // payload = array of booking docs
    case "ADD_BOOKING":
      return [...state, action.payload];
    case "REMOVE_BOOKING":
      return state.filter(b => b.id !== action.payload);
    default:
      return state;
  }
}
