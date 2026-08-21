import standardRoomImg from "../../assets/Standard .jpg";
import premiumRoomImg from "../../assets/deluxe .jpg";
import deluxeRoomImg from "../../assets/permium.jpg";

export interface Room {
  name: string;
  slug: string;
  image: string;
  price: string;
  guests: string;
  bed: string;
  size: string;
  description: string;
}

// Room data — edit prices, sizes, or descriptions here without touching the
// swipe stack or detail components.
export const rooms: Room[] = [
  {
    name: "Standard Room",
    slug: "standard",
    image: standardRoomImg,
    price: "₦50,000",
    guests: "2 Guests",
    bed: "1 King Bed",
    size: "25 m²",
    description:
      "A comfortable and welcoming room designed for a relaxing stay.",
  },
  {
    name: "Premium Room",
    slug: "premium",
    image: premiumRoomImg,
    price: "₦70,000",
    guests: "2 Guests",
    bed: "1 King Bed",
    size: "30 m²",
    description:
      "A refined room offering extra comfort and space for a memorable stay.",
  },
  {
    name: "Deluxe Room",
    slug: "deluxe",
    image: deluxeRoomImg,
    price: "₦90,000",
    guests: "2–3 Guests",
    bed: "1 King Bed",
    size: "35 m²",
    description:
      "Our spacious Deluxe Room combines comfort, style and a little extra room to relax.",
  },
];

// Amenities shown in the expanded room detail view. Sourced from the same
// hotel benefits already listed further down the Rooms page — nothing new
// is invented here.
export const roomAmenities: string[] = [
  "Complimentary breakfast",
  "Free high-speed Wi-Fi",
  "Swimming pool access",
  "Mini zoo experience",
  "Bar & lounge access",
];
