import {useState, useEffect, useMemo} from 'react'
import {db} from "../data/db"
import type { Guitar, CartItem, GuitarID } from "../types"

export const useCart = () => {
    const initialCart = () => {
        const localStorageCart = localStorage.getItem("cart")
        return localStorageCart ? JSON.parse(localStorageCart) : []
    }
    
    const [guitars] = useState(db)
    const [cart, setCart] = useState(initialCart)
    
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart))
    }, [cart])
    
    const MIN_QTY = 1
    const MAX_QTY = 5

    function addToCart(item: Guitar) {
        const itemExist = cart.findIndex((guitar: Guitar) => guitar.id === item.id)
        if (itemExist >= 0) {
            if (cart[itemExist].quantity >= MAX_QTY) return
            const newCart = [...cart]
            newCart[itemExist].quantity += 1
            setCart(newCart)
        } else {
            const newItem: CartItem = {...item, quantity: 1}
            setCart([...cart, newItem])
        }
    }
    
    function clearCart() {
        setCart([])
    }

     const cantItems = (id: GuitarID, action: string) => {
        const updatedCart = cart.map((guitar: CartItem) => {
            if (guitar.id === id) {
                if (action === "decrease" && guitar.quantity > MIN_QTY) {
                    return {
                        ...guitar,
                        quantity: guitar.quantity - 1
                    }
                } else if (action === "increase" && guitar.quantity < MAX_QTY) {
                    return {
                        ...guitar,
                        quantity: guitar.quantity + 1
                    }
                }
            }
            return guitar
        })        
        setCart(updatedCart)
    }

    function deleteItem(id: GuitarID) {
        const updatedCart = cart.filter((item: CartItem) => item.id !== id)
        setCart(updatedCart)
    }

        //State derivado
    const isEmpty = useMemo(() => {
        return cart.length === 0
    }, [cart]);

    const totalCart = useMemo(() => {
        return cart.reduce((total: number, item: CartItem) => total + (item.price * item.quantity), 0)
    }, [cart]);

    return {
        guitars,
        cart,
        addToCart,
        clearCart,
        cantItems,
        deleteItem,
        isEmpty,
        totalCart
    }
}
