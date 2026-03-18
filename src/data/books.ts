import type { Book } from "../types/book";

export const books: Book[] = [
  {
    id: "clean-code",
    title: "Clean Code",
    author: "Robert C. Martin",
    category: "Programming",
    price: 299000,
    rating: 4.8,
    stock: 12,
    image:
      "https://images-na.ssl-images-amazon.com/images/I/41xShlnTZTL._SX374_BO1,204,203,200_.jpg",
    description:
      "A handbook of agile software craftsmanship and practical coding principles.",
  },
  {
    id: "pragmatic-programmer",
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt, David Thomas",
    category: "Programming",
    price: 349000,
    rating: 4.9,
    stock: 9,
    image:
      "https://images-na.ssl-images-amazon.com/images/I/518FqJvR9aL._SX380_BO1,204,203,200_.jpg",
    description:
      "Classic lessons and practices for becoming a better developer.",
  },
  {
    id: "atomic-habits",
    title: "Atomic Habits",
    author: "James Clear",
    category: "Self-help",
    price: 219000,
    rating: 4.7,
    stock: 20,
    image:
      "https://images-na.ssl-images-amazon.com/images/I/51-nXsSRfZL._SX329_BO1,204,203,200_.jpg",
    description:
      "A practical framework for improving every day with small habits.",
  },
  {
    id: "deep-work",
    title: "Deep Work",
    author: "Cal Newport",
    category: "Productivity",
    price: 199000,
    rating: 4.6,
    stock: 14,
    image:
      "https://images-na.ssl-images-amazon.com/images/I/41fM6KQ7WUL._SX331_BO1,204,203,200_.jpg",
    description: "Rules for focused success in a distracted world.",
  },
  {
    id: "harry-potter-1",
    title: "Harry Potter and the Sorcerer’s Stone",
    author: "J.K. Rowling",
    category: "Fantasy",
    price: 189000,
    rating: 4.8,
    stock: 17,
    image:
      "https://images-na.ssl-images-amazon.com/images/I/51UoqRAxwEL._SX331_BO1,204,203,200_.jpg",
    description: "The magical first adventure of Harry Potter.",
  },
];

export function formatVnd(price: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
}
