function getInputValue(id){
    const input = document.getElementById(id);
    const value = input.value;
    return value;
}
document.getElementById("sign-in-btn").addEventListener('click',() =>{
  const userName = getInputValue("userName");
  const password = getInputValue("pass");
  if(userName == "admin" && password == "admin123"){
    window.location.assign("home.html");
  }else{
    alert("Invalid Username and Password.");
    return;
  }

})