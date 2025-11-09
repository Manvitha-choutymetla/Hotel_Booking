import { db } from "./firebase.js";
import { collection, addDoc } from "firebase/firestore";

// Create date arrays (next 7 days available)
function generateDates(days = 7) {
  const dates = [];
  const today = new Date();
  for (let i = 0; i < days; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    dates.push(d.toISOString().split("T")[0]); // "YYYY-MM-DD"
  }
  return dates;
}

const rooms = [
  {
    name: "Deluxe Suite",
    type: "Deluxe",
    price: 200,
    capacity: 3,
    image: "https://images.unsplash.com/photo-1501117716987-c8e1ecb210f0",
    availableDates: generateDates(7)
  },
  {
    name: "Standard Queen Room",
    type: "Standard",
    price: 120,
    capacity: 2,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
    availableDates: generateDates(4)
  },
  {
    name: "Family Suite",
    type: "Suite",
    price: 280,
    capacity: 4,
    image: "https://images.unsplash.com/photo-1582719471370-70ecf3abb1cd",
    availableDates: generateDates(10)
  },
  {
    name: "Executive Deluxe Room",
    type: "Deluxe",
    price: 240,
    capacity: 3,
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
    availableDates: generateDates(5)
  },
  {
    name: "Budget Single Room",
    type: "Standard",
    price: 90,
    capacity: 1,
    image: "https://images.unsplash.com/photo-1576675782867-33935e0b4fe3",
    availableDates: generateDates(3)
  },
  {
    name: "Luxury Penthouse Suite",
    type: "Suite",
    price: 400,
    capacity: 5,
    image: "https://images.unsplash.com/photo-1540525179284-328d1f229fb6",
    availableDates: generateDates(12)
  }
];

export async function seedRooms() {
  const roomsCollection = collection(db, "rooms");
  for (const room of rooms) {
    await addDoc(roomsCollection, room);
  }
  console.log("✅ Rooms added to Firestore with availability & images!");
}
