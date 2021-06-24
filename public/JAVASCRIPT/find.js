async function findDate(e) {
    try {
        const target = e.target.parentElement.children[0].value;
        console.log(target);
        if(!target) { return alert('please enter the date');}
        const token = localStorage.getItem('token');
        const date = await axios.get(`http://localhost:3000/day/${target}`,{headers: {"Authorization": token} });
        const data = date.data.date;
        console.log(data);
        const d = document.getElementsByClassName('inner');
        if(data != 'not') {
            d[0].innerHTML = '';
            data.forEach(value=> {
                const div = document.createElement('div');
                div.className = 'monthData';
                const exp = document.createElement('p');
                exp.innerHTML += `
                catagory: ${value.catagory} <br>
                type: ${value.type =='E'? 'Expense':'Income'}<br> 
                value: ${value.value}<br>
                description: ${value.description}<br> 
                ********************`
                div.append(exp);
                // d[0].append(document.createElement('br'));
                // b.children[1].appendChild(div); 
                d[0].appendChild(div);
            });
            }
            else if(data == 'not') { d[0].innerHTML = 'you did not enter any data on this day';}
    } catch (error) {  
        alert('you are not a premium member');
    }
    
}

async function maxExp(e) {
    try {
        const d = document.getElementsByClassName("inner");
        const token = localStorage.getItem('token');
        const max = await axios.get(`http://localhost:3000/max/user`,{headers: {"Authorization": token}});
        const data = max.data.max[0].max;
        d[0].innerHTML = '';
        const div = document.createElement('div');
        div.className = 'monthData';
        const exp = document.createElement('p');
        exp.innerHTML += `
        your Highest Income is : ${data} `
        div.append(exp);
        // d[0].append(document.createElement('br'));
        // b.children[1].appendChild(div); 
        d[0].appendChild(div);
        
    } catch (error) {
        console.log(error)
    }
}