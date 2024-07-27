async function getMenu(){
    const response=await fetch('https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json');
    const menu=await response.json();
    showMenu(menu);
}
function showMenu(menu){
    let parent=document.querySelector('.menu');
    for(let i=0;i<menu.length;i++){
        let child=`<div class="card">
                <img src='https://s3-alpha-sig.figma.com/img/25d6/cb93/f7841f10f589d812f29695ad4fde3fa2?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qrWL~LfiPPSkc0Wp03oCAw9ULVxGWIRp2uHf2xltPE8zgqA-9j2fQWnbiVInIhrGyGkF-O8oDc9PqVXuQFhtqlbd-M4~n~r9ndn4qOKnJfGr1OoU~m9melcH1VBABbl4cwXh4LMzzVBv4HSlV5ajmmYWxm9JVO-tndICxN0is0WBXBUZBqxkxSKUilyhSQ6vlLXGLj18BrkJ0xWV1cADsHWVqDMDqxfUtdxgd1unDHGbgShNZas4A3eMIqgLLrCf2GzQgG-aaULLm5px7PG7GAPdXhM6Soh2aVWwIWTO2x9zD8pqGKdjY4rCUebgeG2SsWSqu7zQOISL3gR99mabSw__' alt="card">
                <div class="details">
                    <div>                                         
                        <h3>${menu[i].name}</h3>
                        <p>${menu[i].price}</p>
                    </div>  
                    <button class="cartBtn"><i class="fa fa-plus"></i></button>
                </div>
            </div> `
            parent.innerHTML+=child;
    }
}
function takeOrder(){
    return new Promise(resolve =>{
        setTimeout(()=>{
            const menuItems=['burger','Pizza','Tacos','cheeseburger','cheesepizza'];
            const randomItem=menuItems.sort(()=>0.5 - Math.random()).slice(0,3);
            const obj={
                items : randomItem
            }
            resolve(obj);
        },2500);
    })
}
function orderPrep(){
    return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ order_status: true, paid: false });
        }, 1500);
    });
}

function payOrder(){
    return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ order_status: true, paid: true });
        }, 1000);
    });
}
function thankyouFnc(paid){  
    return new Promise((resolve,reject)=>{
        if(paid){
            resolve(alert('thankyou for eating with us today!'));
         }
         else{
            reject('not paid');
        }
    })             
}

takeOrder().then(res=>{
    console.log('order item placed =',res.items)    
    return orderPrep();
}).then(res=>{
    console.log('order status : ',res);
    return thankyouFnc(res.paid);
})
.catch(err=>console.log('paid status : ',err))
.then(()=>{
    return payOrder();
}).then((res)=>{
    console.log('paid status : ',res);
    return thankyouFnc(res.paid);
})
.catch(err=>console.log(err))