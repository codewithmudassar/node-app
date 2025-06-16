import { useState } from "react"
import { createContext } from "react"


export   const CartContext = createContext()


export const CartProvider =({children})=>{

    const [cart,setCart] = useState(0)
    return(
        <CartContext.Provider value={{cart,setCart}}>
            {children}
        </CartContext.Provider>
    )
}

