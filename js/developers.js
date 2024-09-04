document.getElementById('devSearchForm').addEventListener('submit', function (e) {
    e.preventDefault();  
    performDevSearch();   
});

document.querySelector('input[name="dev_search_query"]').addEventListener('input', function () {
    performDevSearch();       
});

const loadDevelopers = () => {
    performDevSearch(); 
};

const performDevSearch = () => {
    const query = document.querySelector('input[name="dev_search_query"]').value;
    const url = `http://127.0.0.1:8000/users/?search=${encodeURIComponent(query)}`;
    
    fetch(url)
    .then(res => res.json())
    .then(data => displayDevelopers(data))
    .catch(error => console.error('Error:', error)); 
};


function displayDevelopers(data) {
    const developerList = document.getElementById('developer-list');
    developerList.innerHTML = '';  

    data.forEach(developer => {
        const div = document.createElement("div");
        div.classList.add('col');
        div.innerHTML = `
        <a class="text-decoration-none " href="developer_details.html?user_id=${developer.id}">
        <div class="card developer-card mb-3 h-100" style="max-width: 540px;">
        <div class="row g-0">
            <div class="col-md-4 d-flex justify-content-center align-items-center">
            <img src=${developer.profile.profile_image} class="img-fluid  rounded-circle" alt="...">
            </div>
            
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${developer.first_name} ${developer.last_name}</h5>
                    <h6>${developer.profile.domain}</h6>
                    <hr/>
                    
                    <p>${developer.profile.location}</p>
                    <p>${developer.email}</p>
                    
                </div>
            </div>
        </div>
        </div>
        </a>
       
            
        `;
        developerList.appendChild(div); 
    });
}

loadDevelopers();
