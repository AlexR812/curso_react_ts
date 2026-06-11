import { useMemo, useState } from "react"
import type {   MenuItem,OrderItem } from "../types"

export default function useOrder() {
  const [order, setOrder] = useState<OrderItem[]>([])

  const addItem = (item: MenuItem) => {
    const itemExist = order.find((orderItem) => orderItem.id === item.id)
    if(itemExist) {
      const newOrder = order.map((orderItem) => {
        // if(orderItem.id === item.id) {
        //   const updatedItem = {...orderItem, quantity: orderItem.quantity + 1}
        //   return updatedItem
        // } else {
        //   return orderItem
        // }
        
        return orderItem.id === item.id ? {...orderItem, quantity: orderItem.quantity + 1} : orderItem

      }) 
      setOrder(newOrder)
    } else {
      const newItem = {...item, quantity: 1}
      setOrder([...order,  newItem ])
    }
  }

  const totalOrder = useMemo(() => {
    return order.reduce((all, item) => all + (item.price * item.quantity), 0)
  }, [order])

  return {
    addItem,
    order,
    totalOrder
  }
}