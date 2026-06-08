import {useState, useEffect, useMemo} from 'react'
import {db} from "../data/db"

const useCart = () => {
    const initialCart = () => {
        const localStorageCart = localStorage.getItem("cart")
        return localStorageCart ? JSON.parse(localStorageCart) : []
    }
    
    const [guitars, setGuitars] = useState(db)
    const [cart, setCart] = useState(initialCart)
    
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart))
    }, [cart])
    
    const MIN_QTY = 1
    const MAX_QTY = 5

    function addToCart(item) {
        const itemExist = cart.findIndex(guitar => guitar.id === item.id)
        if (itemExist >= 0) {
            if (cart[itemExist].quantity >= MAX_QTY) return
            const newCart = [...cart]
            newCart[itemExist].quantity += 1
            setCart(newCart)
        } else {
            item.quantity = 1
            setCart([...cart, item])
        }
    }
    
    function clearCart() {
        setCart([])
    }

     const cantItems = (e, id) => {
        const updatedCart = cart.map(guitar => {
            if (guitar.id === id) {
                if (e.target.innerText === "-" && guitar.quantity > MIN_QTY) {
                    return {
                        ...guitar,
                        quantity: guitar.quantity - 1
                    }
                } else if (e.target.innerText === "+" && guitar.quantity < MAX_QTY) {
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

    function deleteItem(id) {
        const updatedCart = cart.filter(item => item.id !== id)
        setCart(updatedCart)
    }

        //State derivado
    const isEmpty = useMemo(() => {
        return cart.length === 0
    }, [cart]);

    const totalCart = useMemo(() => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
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

export default useCart