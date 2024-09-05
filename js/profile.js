const displayProfile = async () => {
    const user_id = localStorage.getItem("user_id");
    const parent = document.getElementById("profile-section");

    try {
        // Fetch user profile
        const userResponse = await fetch(`https://search-coders.onrender.com/users/${user_id}/`);
        const user = await userResponse.json();

        // Fetch user projects
        const projects = await loadUserProjects(user_id);

        // Build the profile HTML
        parent.innerHTML = `
            <div class="row">
                <div class="col-md-3 border p-3 rounded b1 t2">
                    <img class="w-100 rounded-circle" src="${user.profile.profile_image}" alt="">
                    <hr>
                    <h3>${user.first_name} ${user.last_name}</h3>
                    <h4>${user.profile.domain}</h4>
                    <p>${user.email}</p>
                    <p>${user.profile.location}</p>
                    <hr>
                    <a class="text-decoration-none social-icon" target="_blank" href="${user.profile.social_github}">
                        <i class="fa-brands fa-github fa-2x m-1"></i>
                    </a>
                    <a class="text-decoration-none social-icon" target="_blank" href="${user.profile.social_twitter}">
                        <i class="fa-brands fa-twitter fa-2x m-1"></i>
                    </a>
                    <a class="text-decoration-none social-icon" target="_blank" href="${user.profile.social_linkedin}">
                        <i class="fa-brands fa-linkedin fa-2x m-1"></i>
                    </a>
                    <a class="text-decoration-none social-icon" target="_blank" href="${user.profile.social_youtube}">
                    <i class="fa-brands fa-youtube fa-2x m-1"></i>
                    </a>
                    <a class="text-decoration-none social-icon" target="_blank" href="${user.profile.social_website}">
                        <i class="fa-solid fa-globe fa-2x m-1"></i>
                    </a>
                    <hr>
                    <a class="btn btn-outline-light t1 b2 fw-bold p-2 w-100" href="update_profile.html?projectId=${user.id}">UPDATE PROFILE</a>

                </div>
                <div class="col-md-9 p-3 p-md-5 b2 border rounded">
                    <h3>ABOUT</h3>
                    <hr>
                    <p>${user.profile.bio}</p>
                    <hr>
                    <h3>SKILL</h3>
                    <hr>
                    <h3>PROJECTS</h3>
                    <div id="projects-list " class="row row-cols-1 row-cols-md-2 g-4">
                        ${projects.map(project => `
                            <a class="text-decoration-none" href="project_details.html?projectId=${project.id}">
                                <div class="card project-card h-100">
                                    <img src="${project.featured_image || 'default-image.jpg'}" class="card-img-top" alt="${project.title}" />
                                    <div class="card-body">
                                        <h5 class="">${project.title}</h5>
                                        
                                    </div>
                                </div>
                            </a>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    } catch (error) {
        console.error('Error loading profile:', error);
    }
};

const loadUserProjects = async (user_id) => {
    try {
        const response = await fetch('https://search-coders.onrender.com/projects/');
        const data = await response.json();
        
        // Filter projects by user_id
        const userProjects = data.filter(project => project.owner_id === parseInt(user_id));
        return userProjects;
    } catch (error) {
        console.error('Error loading projects:', error);
        return [];
    }
};

displayProfile();
