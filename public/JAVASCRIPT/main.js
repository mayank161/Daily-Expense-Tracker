
async function take(e) {
    // const data = await axios.get('http://localhost:3000/user');
    const token = localStorage.getItem('token');
    const target = e.target.parentElement.children
    const type = target[1].value;
    const cat = target[2].value;
    console.log(cat)
    const input = target[4].value;
    const description = target[7].value;
    const value = document.getElementsByClassName('second')[0];
    if(input.length == 0 || input < 0) {
        alert('number is missing/negative');
        return;
    }
    else { 
        if(type == 1) { 
            console.log(input,description)
            //  const d = await axios.get('http://localhost:3000/expense')
            const change = value.children[3].children
            change[0].textContent = input;
            change[1].textContent = description; 
            const push = await axios.post('http://localhost:3000/expense', 
            {type: 'E', value: parseInt(input), description: description, id: 1,cat: cat},
            {headers: {"Authorization": token}})
        }
        else if(type ==2){ 
            const change = value.children[1].children
            change[0].textContent = input;
            change[1].textContent = description; 
            const push = await axios.post('http://localhost:3000/expense', 
            {type: 'I', value: parseInt(input), description: description, id: 1,cat: cat},
            {headers: {"Authorization": token}})
        }
    }
    // const data = await axios.get('http://localhost:3000/user')
    // console.log(data.data);
    // const push = await axios.post('http://localhost:3000/expensed', {id: data.data.id})
}

const a = document.getElementsByClassName("today")[0];
const b = document.getElementsByClassName("month")[0];
const c = document.getElementsByClassName("year")[0];
const d = document.getElementsByClassName("inner");

document.getElementById('1').addEventListener('click', () => {
    a.style.display = 'flex';
    b.style.display = 'none';
    c.style.display = 'none';
})

function month() {
    a.style.display = 'none';
    b.style.display = 'flex';
    c.style.display = 'none';
    d[1].innerHTML = '';
}

function year() {
    a.style.display = 'none';
    b.style.display = 'none';
    c.style.display = 'flex';
    d[0].innerHTML = '';
}

async function getMonth() {
    const month = b.children[0].value;
    console.log(month);
    if(month) {
        const mData = await axios.get(`http://localhost:3000/${month}`);
         console.log(mData.data.month);
         const data = mData.data.month
        if(data != 'not') {
        d[0].innerHTML = '';
        data.forEach(value=> {
            const div = document.createElement('div');
            div.className = 'monthData';
            const exp = document.createElement('p');
            exp.innerHTML += `
            date: ${value.pp} <br>
            Income: ${value.TotalIncome}<br> 
            Expense: ${value.TotalExpense}<br> 
            ********************`
            div.append(exp);
            // d[0].append(document.createElement('br'));
            // b.children[1].appendChild(div); 
            d[0].appendChild(div);
        });
        }
         else { d[0].innerHTML = 'no data available'; }
    }
}


async function getYear() {
    const year = c.children[0].value;
    console.log(year);
    
    const mData = await axios.get(`http://localhost:3000/last/${year}`);

    const data = mData.data.year
    console.log(data);
    if(data != 'not') {
        d[1].innerHTML = '';
        data.forEach(value => {
            const div = document.createElement('p');
            div.className = 'monthData';
            div.innerHTML += `| month = <B>${value.month}</B> |<br>| Total Expense = <B>${value.Expense}</B> |<br>| Total Income = <B>${value.Income}</B> |`;
           
            d[1].appendChild(div);
            console.log(d[1].childElementCount)
        })
    }
    else { d[1].innerHTML = 'data not available'; }
    
}