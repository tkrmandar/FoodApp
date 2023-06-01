import React, { createContext, useContext, useReducer } from 'react';

//context api is used to tranfer data to different components
//useReducer is same as useState but carry out multiple actions so no need to create different states

const CartStateContext = createContext();
const CartDispatchContext = createContext();

//cartDispatchContext is used to handle the action ex:"ADD" and tranfer added data,
//CartStateContext is used for current existing items in cart 

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            // ...state refers to keep the data and add {}
            return [...state, { id: action.id, name: action.name, aty: action.qty, size: action.size, price: action.price, img: action.img }]
    }
}

//provider component which manages the global state
export const CartProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, [])

    return (

        //here value refers to things to pass access to components
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    )
}


export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
