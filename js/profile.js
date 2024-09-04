const displayProfile = async () => {
    const user_id = localStorage.getItem("user_id");
    const parent = document.getElementById("profile-section");

    try {
        // Fetch user profile
        const userResponse = await fetch(`http://127.0.0.1:8000/users/${user_id}/`);
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
                </div>
                <div class="col-md-9 px-3 border rounded">
                    <h3>ABOUT</h3>
                    <hr>
                    <p>${user.profile.bio}</p>
                    <hr>
                    <h3>SKILL</h3>
                    <hr>
                    <h3>PROJECTS</h3>
                    <div id="projects-list " class="row row-cols-1 row-cols-md-2 g-4">
                        ${projects.map(project => `
                            <a class="text-decoration-none" href="http://127.0.0.1:8000/projects/${project.id}/">
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
        const response = await fetch('http://127.0.0.1:8000/projects/');
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
