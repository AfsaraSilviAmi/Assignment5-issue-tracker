//loading ALl
const loadAll = () =>{
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
    fetch(url)
    .then((res)=>res.json())
    .then((data)=>console.log(data.data));
}

loadAll();