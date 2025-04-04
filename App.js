import React, { useState, useEffect } from "react";
import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import AddItem from './addItem';
import apiRequest from './apiRequest.js';

function App() {
  const API_URL="httpnpmnpm://localhost:3500/item";
  const [items, setItems] = useState([]);
  const [fetchError,setfetchError]=useState(null);
  const [isloading,setisloading]=useState(true);

  useEffect(() => {
    const fetchItems = async () =>{
        try{  
            const response=await fetch(API_URL);
            if(!response.ok){
              throw Error("Data not recieved");
            }
            const listItems = await response.json();
            setItems(listItems);
            setfetchError(null);
        }
        catch (err){
            setfetchError(err.message);

        }
        finally{
          setisloading(false)
        }
    }
    setTimeout(()=>{
      (async () => await fetchItems())();
    },0)
    
  }, []);

  const handleCheck = async (id) => {
    const listItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(listItems);
    const myItem=listItems.filter(item => item.id===id);

    const postOptions={
      method: "PATCH",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify({checked: myItem[0].checked})
    }
    const requestedURL=`${API_URL}/${id}`
    const result = await apiRequest(requestedURL,postOptions);
    if(!result){
      setfetchError(result)
    }
  };

  const handleDelete =async (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);

    
    const deleteOptions={method: "DELETE"};
    const requestedURL=`${API_URL}/${id}`
    const result = await apiRequest(requestedURL,deleteOptions);
    if(!result){
      setfetchError(result)
    }
  };

  const handleAddItem = async (newItem) => {
    const id = items.length ? items.length + 1 : 1;
    const myNewItem = { id, checked: false, item: newItem };
    const listItems = [...items, myNewItem];
    setItems(listItems);
    const postOptions={
      method: "POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify(myNewItem)
    }
    const result = await apiRequest(API_URL,postOptions);
    if(!result){
      setfetchError(result)
    }
  };

  return (
    <div className="App">
      <Header title=" To-Do List" />
      <AddItem handleAddItem={handleAddItem} />
      <main>
        {isloading && <p>Loading items...</p>}
        {fetchError && <p>{`Error : ${fetchError}`}</p>}
      {!isloading && !fetchError && <Content
        items={items}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
      />}
      </main>
      <Footer length={items.length} />
    </div>
  );
}

export default App;