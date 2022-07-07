import React from 'react'
import { addItemsDB } from '../firebase/firestore'
import { items } from '../firebase/itemTemplate'

export const ItemInjector = () => {

    const injectItems = () =>{
        addItemsDB(items)
    }

    return (
        <button onClick={injectItems}>inject items</button>
    )
}
