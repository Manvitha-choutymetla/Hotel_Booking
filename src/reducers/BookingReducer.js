export function bookingReducer(state, action) {
  switch (action.type) {
    case 'ADD_BOOKING':
      return [...state, action.payload];
    case 'REMOVE_BOOKING':
      return state.filter(booking => booking.id !== action.payload);
    default:
      return state;
  }
}