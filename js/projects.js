document.getElementById('searchForm').addEventListener('submit', function (e) {
    e.preventDefault();  
    performSearch();    
});

document.querySelector('input[name="search_query"]').addEventListener('input', function () {
    performSearch();    
});

const performSearch = () => {
    const query = document.querySelector('input[name="search_query"]').value;
    const url = `http://127.0.0.1:8000/projects/?search=${encodeURIComponent(query)}`;
    
    fetch(url)
    .then(res => res.json())
    .then(data => displayProjects(data))
    .catch(error => console.error('Error:', error));
};

const loadProjects = () => {
    performSearch(); 
};

function displayProjects(data) {
    const projectList = document.getElementById('project-list');
    projectList.innerHTML = '';  

    data.forEach(project => {
        const div = document.createElement("div")
        div.classList.add('col');
        div.innerHTML = `
                <a class="text-decoration-none" href="http://127.0.0.1:8000/projects/${project.id}/">
                    <div class="card project-card h-100">
                        <img src="${project.featured_image || 'default-image.jpg'}" class="card-img-top" alt="${project.title}" />
                        <div class="card-body">
                            <h5 class="">${project.title}</h5>
                            
                        </div>
                    </div>
                </a>
                <a class="text-decoration-none" href="#">
                <div class="project-owner  p-2 rounded">
                    <h5 class="m-0">
                        Developed By: 
                        ${project.owner_name}
                        </h5>
                </div>
                </a>
        `;
        projectList.appendChild(div); // Append the project card to the container
    });
}
// Initialize by loading all projects or based on the initial search query
loadProjects();


