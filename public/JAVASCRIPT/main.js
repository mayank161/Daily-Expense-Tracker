async function take(e) {
    const data = await axios.get('http://localhost:3000/user');
    const target = e.target.parentElement.children
    const type = target[1].value;
    const input = target[3].value;
    const description = target[6].value;
    const value = document.getElementsByClassName('second')[0];
    if(input.length == 0 || input < 0) {
        alert('number is missing/negative');
        return;
    }
    else { 
        if(type == 1) { 
            const push = await axios.post('http://localhost:3000/expense', 
            {type: 'E', value: input, description: description, id: 1})

            const d = await axios.get('http://localhost:3000/expense')
            const change = value.children[3].children
            change[0].textContent = input;
            change[1].textContent = description; 
        }
        else if(type ==2){ 
            const change = value.children[1].children
            change[0].textContent = input;
            change[1].textContent = description; 
        }
    }
    // const data = await axios.get('http://localhost:3000/user')
    // console.log(data.data);
    // const push = await axios.post('http://localhost:3000/expensed', {id: data.data.id})
}
