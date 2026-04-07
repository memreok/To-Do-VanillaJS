let itemsId = 0

let taskStr = "Default Text";

const searchBtn = document.getElementById("searchBtn");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("list");

addBtn.addEventListener("click" , e => {

    
  console.log("görev ekleniyor...");
  const item = document.createElement("li");
  const input = document.createElement("input");
  
  
  item.appendChild(input);
  list.appendChild(item);
  addEventListener("keydown", e => {
    if(e.key === "Enter" && (input.value !== "")){


      let task = document.createElement("p");
      taskStr = input.value;
      task = taskStr;
      


      
      item.removeChild(input);
      

      item.append(task);
      
      itemsId += 1; 
      console.log(task + " " + itemsId);


    }



  })
  


})



searchBtn.addEventListener("click", e => {
  console.log("görev aranıyor...");
})

function AddTask(){
  itemsId += 1
  alert("çalıştım aga");

}

function DeleteTask(){
  itemsId -=1
}

function EditTask(){

}

function SearchTask(){
  console.log("aradım aga");
}