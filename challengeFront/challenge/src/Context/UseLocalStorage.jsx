import React, { useEffect, useState } from 'react'

function useLocalStorage(itemName, initialValue) {
    const [item, setItem]= useState(initialValue);

    useEffect(()=>{
        const locaStorageUsers = localStorage.getItem(itemName);
        let parsedItem;

        if(!locaStorageUsers){
            localStorage.setItem(itemName,JSON.stringify(initialValue));
            setItem(initialValue);
        }
        else{
            parsedItem=JSON.parse(locaStorageUsers);
            setItem(parsedItem);
        }
    },[])

    const saveItem = (newItem) =>{
        localStorage.setItem(itemName, JSON.stringify(newItem));
        setItem(newItem);
    }
  return {item,saveItem}
}

export {useLocalStorage}