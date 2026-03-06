let allCards = [];
//loading ALl
const loadAll = () =>{
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
    fetch(url)
    .then((res)=>res.json())
    .then((data)=>{
        allCards = data.data;
        displayAll(allCards);
    });
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
           <div class="card bg-base-100 h-full shadow-md ${borderCol} border-t-4">

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
}

//filter

const filterByStatus = (status)=>{
    if(status === 'all'){
        displayAll(allCards);
    }
    else{
        const filtered = allCards.filter(card => card.status === status);
        displayAll(filtered);
    }
}
loadAll();