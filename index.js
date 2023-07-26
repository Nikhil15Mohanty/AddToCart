import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue,remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://todo-app-bd2b7-default-rtdb.asia-southeast1.firebasedatabase.app/"
}


//This steps is used to connect firebase to the js
const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")


//used to connect with html
const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEle = document.getElementById("shopping-list")


//adding the funcationality to the button 
addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    if(inputValue !== ""){
    push(shoppingListInDB, inputValue)   //push function invoked onvalue function
    
    clearInputFieldEl();
    }
})


//for clearing the input field after element are successfully added
const clearInputFieldEl = ()=>{
    inputFieldEl.value="";
}

//used to add list items in the list
const addItem = (value)=>{
    
    let itemID = value[0];    //contain id
    let itemValue = value[1];   //contain value

    const newEle = document.createElement("li");
    newEle.textContent = itemValue;
    shoppingListEle.append(newEle);

    newEle.addEventListener("click",()=>{
        
        let exactLocationOfItemInDB = ref(database,`shoppingList/${itemID}`);
        remove(exactLocationOfItemInDB);
    })

    
}

//to wipe out list item so that it doesn't appear again
const clearShoppingListEle = ()=>{
    shoppingListEle.innerHTML=""; 
}



//Fetch data from the database
onValue(shoppingListInDB,function(snapshot){   //anychanges in database trigger onValue
    if(snapshot.exists()){
        let currentItem = Object.entries(snapshot.val());
    //passing object so that we can get both id and value

    clearShoppingListEle()     //This is used here so that list item doesn't print again
    
    currentItem.forEach((item)=>{
        addItem(item);
    })
    }
    else{
        shoppingListEle.innerHTML=`<h3 style="color:#FFFDF8">No items here... yet</h3>`
    }
    
    
})

