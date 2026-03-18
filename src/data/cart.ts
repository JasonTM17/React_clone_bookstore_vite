import type { Book } from "../types/book";

const CART_STORAGE_KEY = "bookstore_cart";

export type CartItem = {
  book: Book;
  quantity: number;
};

export function getCartItems(): CartItem[] {
  const raw = localStorage.getItem(CART_STORAGE_KEY);

  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw) as CartItem[];

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter((item) => item?.book?.id && item.quantity > 0);
  } catch {
    return [];
  }
}

export function setCartItems(items: CartItem[]) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("bookstore-cart-updated"));
}

export function addBookToCart(book: Book, quantity: number = 1) {
  const cartItems = getCartItems();
  const existingItem = cartItems.find((item) => item.book.id === book.id);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cartItems.push({ book, quantity });
  }

  setCartItems(cartItems);
}

export function updateBookQuantity(bookId: string, quantity: number) {
  const cartItems = getCartItems();
  const nextItems = cartItems
    .map((item) => {
      if (item.book.id !== bookId) {
        return item;
      }

      return {
        ...item,
        quantity,
      };
    })
    .filter((item) => item.quantity > 0);

  setCartItems(nextItems);
}

export function removeBookFromCart(bookId: string) {
  const cartItems = getCartItems();
  const nextItems = cartItems.filter((item) => item.book.id !== bookId);

  setCartItems(nextItems);
}

export function clearCart() {
  setCartItems([]);
}

export function getCartCount() {
  return getCartItems().reduce((total, item) => total + item.quantity, 0);
}
