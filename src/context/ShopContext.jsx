import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { getProductById } from '../data/products'
import { FREE_SHIPPING_THRESHOLD, SHIPPING_COST } from '../lib/format'

const ShopContext = createContext(null)

const load = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

export function ShopProvider({ children }) {
  const [cart, setCart] = useState(() => load('sabzineh-cart', []))
  const [favorites, setFavorites] = useState(() =>
    load('sabzineh-favorites', []),
  )
  const [cartOpen, setCartOpen] = useState(false)
  const [toasts, setToasts] = useState([])
  const toastId = useRef(0)

  useEffect(() => {
    try {
      localStorage.setItem('sabzineh-cart', JSON.stringify(cart))
    } catch {}
  }, [cart])

  useEffect(() => {
    try {
      localStorage.setItem('sabzineh-favorites', JSON.stringify(favorites))
    } catch {}
  }, [favorites])

  const pushToast = useCallback((message, icon = 'check') => {
    const id = ++toastId.current
    setToasts((list) => [...list, { id, message, icon }])
    window.setTimeout(() => {
      setToasts((list) => list.filter((t) => t.id !== id))
    }, 2600)
  }, [])

  const addToCart = useCallback(
    (productId, qty = 1, { openDrawer = false } = {}) => {
      setCart((items) => {
        const existing = items.find((i) => i.id === productId)
        if (existing) {
          return items.map((i) =>
            i.id === productId
              ? { ...i, qty: Math.min(i.qty + qty, 10) }
              : i,
          )
        }
        return [...items, { id: productId, qty: Math.min(qty, 10) }]
      })
      pushToast('به سبد خرید اضافه شد')
      if (openDrawer) setCartOpen(true)
    },
    [pushToast],
  )

  const setQty = useCallback((productId, qty) => {
    setCart((items) =>
      qty <= 0
        ? items.filter((i) => i.id !== productId)
        : items.map((i) => (i.id === productId ? { ...i, qty } : i)),
    )
  }, [])

  const removeFromCart = useCallback((productId) => {
    setCart((items) => items.filter((i) => i.id !== productId))
  }, [])

  const clearCart = useCallback(() => setCart([]), [])

  const toggleFavorite = useCallback(
    (productId) => {
      const exists = favorites.includes(productId)
      setFavorites((favs) =>
        exists ? favs.filter((f) => f !== productId) : [...favs, productId],
      )
      pushToast(
        exists ? 'از علاقه‌مندی‌ها حذف شد' : 'به علاقه‌مندی‌ها اضافه شد',
        'heart',
      )
    },
    [favorites, pushToast],
  )

  const cartItems = useMemo(
    () =>
      cart
        .map(({ id, qty }) => ({ ...getProductById(id), qty }))
        .filter((p) => Boolean(p.id)),
    [cart],
  )
  const cartCount = useMemo(
    () => cart.reduce((sum, i) => sum + i.qty, 0),
    [cart],
  )
  const subtotal = useMemo(
    () => cartItems.reduce((sum, i) => sum + i.price * i.qty, 0),
    [cartItems],
  )
  const shipping =
    subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST

  const value = useMemo(
    () => ({
      cart,
      cartItems,
      cartCount,
      cartOpen,
      setCartOpen,
      subtotal,
      shipping,
      favorites,
      addToCart,
      setQty,
      removeFromCart,
      clearCart,
      toggleFavorite,
      toasts,
      pushToast,
    }),
    [
      cart,
      cartItems,
      cartCount,
      cartOpen,
      subtotal,
      shipping,
      favorites,
      addToCart,
      setQty,
      removeFromCart,
      clearCart,
      toggleFavorite,
      toasts,
      pushToast,
    ],
  )

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
}

export const useShop = () => {
  const ctx = useContext(ShopContext)
  if (!ctx) throw new Error('useShop must be used inside ShopProvider')
  return ctx
}
