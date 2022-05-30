let currentPage = 1;
let totalPages;

function getUsers(page) {
    let request = new XMLHttpRequest();
    request.addEventListener('load', render);
    request.addEventListener('error', errorRender);

    request.open('GET', 'https://reqres.in/api/users?page=' + page);

    request.send();
};


function render() {
    let response = this.responseText;
    let responseData = JSON.parse(response);
    let fragment = document.createDocumentFragment();

    responseData.data.forEach(item => {
        let li = document.createElement('li');
        
        let pEmail = document.createElement('p');
        pEmail.textContent = item.email;
        
        let img = document.createElement('img');
        img.src = item.avatar;

        li.appendChild(img);
        li.appendChild(pEmail);

        fragment.appendChild(li);
    });

    document.getElementById('list').innerHTML = ' ';
    document.getElementById('list').appendChild(fragment);

    totalPages = responseData.total_pages;

    console.log(responseData);
}

function errorRender () {
    let p = document.createElement('p');
    p.innerText = 'Server Error';

    document.getElementById('api-user-emails').appendChild(p)
}


document.getElementById('loadnext').addEventListener('click', function() {
    if(currentPage == totalPages) {
        return;
    };
    currentPage += 1;
    getUsers(currentPage);
})

document.getElementById('loadprevious').addEventListener('click', function() {
    if(currentPage == 1) {
        return;
    };
    currentPage -= 1;
    getUsers(currentPage);
})



getUsers(currentPage);