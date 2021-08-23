const submit=document.querySelector("button");
const input=document.querySelector("input");
submit.addEventListener("click",(e)=>{
    e.preventDefault();
    let location=input.value;
    input.value="";
    fetch(`http://localhost:3000/weather?address=${location}`)
    .then((res)=>{
        return res.json();
    })
    .then((res)=>{
        console.log(res);
    })
})