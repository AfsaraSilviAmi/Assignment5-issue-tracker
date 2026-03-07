let allCards = [];
//loading ALl
const loadAll = () =>{
    manageSpinner(true);
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
    fetch(url)
    .then((res)=>res.json())
    .then((data)=>{
        allCards = data.data;
        displayAll(allCards);
    });
}

//load by Id
const loadById = (id) =>{
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
    fetch(url)
    .then((res)=>res.json())
    .then((data)=>{
        dispById(data.data);
    });
}

//load search
const loadSearch = (searchText) =>{
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchText}`;
    fetch(url)
    .then((res)=>res.json())
    .then((data)=>{
       displayAll(data.data)
    });
}
//search handler
const handleSearch = () =>{
    const searchText = document.getElementById("search-input").value.trim();
    loadSearch(searchText);
}

//badge object
const labelStyle ={
    "bug": {
        color: "badge-error",
    },
    "help wanted": {
        color: "badge-warning",

    },
    "enhancement": {
        color:"badge-success",
    },
    "documentation":{
        color:"badge-info",

    }


}
//display all
const displayAll = (cards) =>{
     let cardDiv = document.getElementById("card-container");
     //number of Issues
     document.getElementById("issueNum").innerText = cards.length;
     cardDiv.innerHTML = "";
     cards.forEach(card => {
      //date
       const newDate = card.createdAt.split('T')[0];

        //priority
        let priClass = "";
        let Priority = card.priority;
        if(Priority === "high"){
            priClass = "badge-error"
        }
        else if(Priority === "medium"){
            priClass = "badge-warning"
        }
        else if(Priority === "low"){
            priClass = "badge-ghost"
        }
        //image badge
         const statusBadge = card.status === "open" ? "./assets/Open-Status.png" : "./assets/Closed- Status .png";
        //border color
        const borderCol = card.status === "open" ? " border-t-green-500" : "border-t-purple-500"
        //badge
        const labelsHTML = card.labels.map(labelName =>{
            const styleLabel = labelStyle[labelName] || {color:"badge-primary"}
            return `<span class ="badge badge-outline badge-soft ${styleLabel.color}">
            ${labelName.toUpperCase()}
            </span>`

        }).join("");
        const makeCard = document.createElement("div");
        
        makeCard.innerHTML =`
           <div onclick="loadById(${card.id})" class="card bg-base-100 h-full shadow-md ${borderCol} border-t-4">

  <div class="card-body">
     <div class="flex justify-between">
        <img src="${statusBadge}" alt="">
        <div class="badge badge-soft ${priClass}">${card.priority.toUpperCase()}</div>
     </div>
    <h2 class="card-title">
     ${card.title}
     
    </h2>
    <p class = "line-clamp-2 overflow-hidden max-h-10 text-[#64748B]">${card.description}</p>
    <span class="card-actions justify-start">
      ${labelsHTML}
    </span>
    <div class="flex-grow border-t border-gray-200"></div>
    <p class="text-[#64748B]">#${card.id} by ${card.author}</p>
    <p class="text-[#64748B]">${newDate}</p>
  </div>
</div>
        `
        cardDiv.append(makeCard);
     });
      manageSpinner(false);
}
//display modal
const dispById = (card)=>{
   const modalDiv = document.getElementById("modal-div");
   modalDiv.innerHTML = "";
   
   const makeModalDiv = document.createElement("div");

        let priClass = "";
        let Priority = card.priority;
        if(Priority === "high"){
            priClass = "badge-error"
        }
        else if(Priority === "medium"){
            priClass = "badge-warning"
        }
        else if(Priority === "low"){
            priClass = "badge-ghost"
        }
//status
        const statusColor = card.status === "open" ? "bg-green-400": "bg-purple-500";
        const statusWord = card.status === "open" ? "Opened": "Closed";
        const PriorityLow = card.priority === "low" ? "text-black" : "text-white";

        //date
       const newDate = card.createdAt.split('T')[0];
       //label
        const labelsHTML = card.labels.map(labelName =>{
            const styleLabel = labelStyle[labelName] || {color:"badge-primary"}
            return `<span class ="badge badge-outline badge-soft ${styleLabel.color}">
            ${labelName.toUpperCase()}
            </span>`

        }).join("");

        //assignee
        const Assignee = card.assignee === "" ? "No Assignee" : `${card.assignee}`;

   makeModalDiv.innerHTML = `
   <h3 class="text-2xl font-bold mb-4">${card.title}</h3>
    <div class="mb-2">
    <p><div class="badge ${statusColor} text-white p-4 rounded-2xl text-[16px]">${statusWord}</div> <span class = "text-[#64748B] text-[15px]">• ${statusWord} by ${card.author} • ${newDate}<span></p>
    </div>
    <span>${labelsHTML}</span>
   <div class="mt-2"> <p class="text-[#64748B] text-[17px]">${card.description}</p></div>
    <div class="flex justify-around bg-base-200 mt-4 p-4">
        <div>
           <p class="text-[#64748B]">Assignee:</p>
           <p class="font-semibold">${Assignee}</p>
        </div>
        <div>
           <p class="text-[#64748B]">Priority</p>
           <span><div class="badge ${priClass} ${PriorityLow} p-3 rounded-xl"> ${Priority.toUpperCase()}</div></span>
          
        </div>
    </div>
   `
   modalDiv.appendChild(makeModalDiv);
    document.getElementById("myModal").showModal();

}
//filter

const filterByStatus = (status)=>{
    toggleBtn(`${status}-btn`);
    manageSpinner(true);
    if(status === 'all'){
        displayAll(allCards);
    }
    else{
        const filtered = allCards.filter(card => card.status === status);
        displayAll(filtered);
    }
}

//toggle buttons

const toggleBtn = (id) =>{
  const allBtns = document.querySelectorAll(".filter-btn");
  allBtns.forEach(btn=> {
    btn.classList.remove("btn-primary");
    btn.classList.add("btn-ghost");
  });
  const activeBtn = document.getElementById(id);
  if(activeBtn){
    activeBtn.classList.add("btn-primary");
    activeBtn.classList.remove("btn-ghost");
  }
}
//spinner
const manageSpinner = (status)=>{
    if(status == true){
       document.getElementById("spinner").classList.remove("hidden");
       document.getElementById("card-container").classList.add("hidden");
    }else{
          document.getElementById("spinner").classList.add("hidden");
         document.getElementById("card-container").classList.remove("hidden");
      
       
    }
}

loadAll(); 