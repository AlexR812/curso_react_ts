import { useState } from "react"

export default function useOrder() {
  const [order, setOrder] = useState([])

  return {
    order
  }
}