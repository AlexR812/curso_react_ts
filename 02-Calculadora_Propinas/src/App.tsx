import { menuItems } from "./data/db"
import  MenuItem  from "./components/MenuItem"
import useOrder  from "./hooks/useOrder"
import OrderContents from "./components/OrderContents"

function App() {
  const { addItem, order, totalOrder } = useOrder()

  return (
    <>
      <header className="bg-teal-400 py-5">
        <h1 className="text-center text-4xl font-black">Calculadora de Propinas</h1>
      </header>
      <main className="max-w-7xl mx-auto py-5 grid md:grid-cols-2">
        <div className="p-5">
          <h2 className="text-4xl font-black">Menú</h2>
          <div className="space-y-3 mt-10">
            {
              menuItems.map((item) => (
                <MenuItem
                  key={item.id}
                  item={item}
                  addItem={addItem}
                />
              ))
            }
          </div>
        </div>
        <div className="border border-dashed border-slate-300 p-5 rounded-lg space-y-10">
          <OrderContents 
            key={order.length}
            order={order}
            totalOrder={totalOrder}
          />
        </div>
      </main>
    </>
  )
}

export default App
