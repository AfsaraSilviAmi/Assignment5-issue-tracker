//loading ALl
const loadAll = () =>{
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
    fetch(url)
    .then((res)=>res.json())
    .then((data)=>displayAll(data.data));
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
     cards.forEach(card => {
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
        <div class="badge badge-secondary">${card.priority}</div>
     </div>
    <h2 class="card-title">
     ${card.title}
     
    </h2>
    <p class = "line-clamp-2 overflow-hidden max-h-10">${card.description}</p>
    <span class="card-actions justify-start">
      ${labelsHTML}
    </span>
    <hr>
    <p>#${card.id} ${card.author}</p>
    <p>${card.createdAt}</p>
  </div>
</div>
        `
        cardDiv.append(makeCard);
     });
}

loadAll();