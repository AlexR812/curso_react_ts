import { formatCurrency } from '../helpers'
import type {  OrderItem } from '../types'


type OrderContentsProps = {
    order: OrderItem[],
    totalOrder: number
}


export default function OrderContents({ order, totalOrder }: OrderContentsProps)  {
  return (
    <div>
        <h2 className="text-4xl font-black">Consumo</h2>
        <div className="mt-10">
            {
                order.length === 0 ? (
                    <p className="text-center">La orden está vacía</p>
                ) : (   
                    order.map((item) => {
                        return (                        
                            <div key={item.id} className='flex justify-between items-center p-2 border-t border-gray-300 last-of-type:border-b'>
                                <div>
                                    <p>{item.name} - {formatCurrency(item.price)}</p>
                                    <p className='font-black'>Cantidad: {item.quantity} - {formatCurrency(item.price * item.quantity)}</p>
                                </div>
                                <div>
                                    <button className='bg-red-600 w-7 h-7 rounded-full font-black text-white text-base'>X</button>
                                </div>
                            </div>   
                        )
                    })
                )
            }
            {
                order.length === 0 ? (
                    ''
                ) : (
                    <div>
                        <p className='font-black'>Total: {formatCurrency(totalOrder)}</p>
                    </div>
                )
            }
        </div>
    </div>
  )
}
