const form = document.getElementById("signin");
form.addEventListener('submit',function (e) {
    // console.log(form)
    e.preventDefault()
    const payload = new FormData(form);
    // console.log(payload);
    const data = Object.fromEntries(payload)
    console.log(data);

    fetch('http://localhost:3000/api/v1/auth/signin', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))

    // fetch('127.0.0.1:3000/').then(res => res.json()).then(data => console.log(data)).catch(err => console.log(err))
    
})