const getParams = () => {
    const param = new URLSearchParams(window.location.search).get("projectId");
    console.log(param)
    fetch(`https://search-coders.onrender.com/projects/${param}`)
    .then((res)=> res.json())
    .then((data)=> displayProjectDetails(data))

}
getParams();

const displayProjectDetails = (project) => {
    const parent = document.getElementById("project-details");
    const user_id = localStorage.getItem("user_id")
    let updateDeleteButton = ''
    if(user_id == project.owner_id){
        updateDeleteButton = `
        
            <a class="btn btn-outline-dark fw-bold m-2 p-2 w-50" href="update_project.html?projectId=${project.id}">Update</a>
            <button onclick="handleDeleteProject(event)" class="btn btn-outline-dark fw-bold m-2 p-2 w-50">
                DELETE
            </button>
        `
     }
    parent.innerHTML = `

    <div class="row">
         <div class="col-md-6 border b2 p-2 rounded">
         <a class="btn btn-outline-light b1 t2 fw-bold rounded-circle" href="projects.html"><</a>
         <hr>
            <img class="w-100 rounded" src=${project.featured_image} alt="" srcset="">
            <hr>
           ${updateDeleteButton}
            
         </div>
         <div class="col-md-6 border rounded b1 t2 p-3 p-md-5 ">
            <h3>${project.title}</h3>
            <hr>
            <h6>Developed By: 
                <a class="text-decoration-none " href="developer_details.html?user_id=${project.owner_id}">
                    <span class="fst-italic text-white fw-bold">${project.owner_name}</span>
                </a>
            </h6>
            <hr>
            <a class="btn btn-outline-light mx-2" target="_blank" href="${project.source_link}">Code</a>
            <a class="btn btn-outline-light mx-2" target="_blank" href="${project.demo_link}">Demo</a>
            
            <hr>
            <p> ${project.description} </p>

         </div>
    </div>
    
    `
}

const loadReviews = () => {
    const param = new URLSearchParams(window.location.search).get("projectId");

    fetch('https://search-coders.onrender.com/projects/review/')
    .then(res => res.json())
    .then(data => {
        const reviewsContainer = document.getElementById("reviews");

        const filteredReviews = data.filter(review => review.project == param);
        
        if (filteredReviews.length === 0) {
            reviewsContainer.innerHTML = `<h4>No Reviews...</h4>`;
        } else {
            let reviewsHTML = `<h4>${filteredReviews.length} Review${filteredReviews.length > 1 ? 's' : ''}</h4><hr>`;

            filteredReviews.forEach(review => {
                reviewsHTML += `
                    <div class="comment b1 t2 border border-light rounded p-3">
                        <div class="row">
                            <div class="col-md-6">
                                <h5 class="text-white fst-italic">${review.reviewer_name}</h5>
                            </div>
                            <div class="col-md-6 text-end">
                                <small class="text-end">${new Date(review.created_at).toLocaleDateString()}</small>
                            </div>
                        </div>
                        <hr>
                        <p>${review.body}</p>
                    </div>
                `;
            });

            reviewsContainer.innerHTML = reviewsHTML;
        }
    })
    .catch(error => {
        console.error('Error fetching reviews:', error);
        const reviewsContainer = document.getElementById("reviews");
        reviewsContainer.innerHTML = `<h4>Error loading comments...</h4>`;
    });
};

loadReviews();



const handleAddReview = async (e) => {
    e.preventDefault();
    const param = new URLSearchParams(window.location.search).get("projectId");

    const form = document.getElementById("review-form");
    const formData = new FormData(form);
    const token = localStorage.getItem("token")
    const user_id = localStorage.getItem("user_id")

    const reviewData = {
        body: formData.get("review"),
        reviewer: parseInt(user_id),
        project: parseInt(param)
    }
    console.log(reviewData)
    fetch("https://search-coders.onrender.com/projects/review/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
        },
        body: JSON.stringify(reviewData)
    })
    .then((res) => {
        if (!res.ok) {
            return res.json().then((data) => {
                throw new Error(data.detail || 'Failed to add review');
            });
        }
        return res.json();
    })
    .then((data) => {
        console.log('data->>', data);
        alert("Review added successfully!");
        window.location.href = `./project_details.html?projectId=${param}`;

    })
    .catch(error => {
        console.error('Error:', error);
        alert("An error occurred while adding the project: " + error.message);
    });
}


const handleDeleteProject = async (e) => {
    e.preventDefault();
    const param = new URLSearchParams(window.location.search).get("projectId");
    const token = localStorage.getItem("token");

    const confirmDelete = confirm("Are you sure you want to delete this project?");
    if (!confirmDelete) {
        return;
    }

    try {
        const response = await fetch(`https://search-coders.onrender.com/projects/${param}/`, {
            method: "DELETE",
            headers: {
                Authorization: `Token ${token}`
            }
        });

        if (response.status === 204) {
            alert("Project deleted successfully!");
            window.location.href = "projects.html"; // Redirect to the projects list page after deletion
        } else {
            alert("Failed to delete the project.");
        }
    } catch (error) {
        console.error('Error deleting project:', error);
        alert("An error occurred while deleting the project.");
    }
};
