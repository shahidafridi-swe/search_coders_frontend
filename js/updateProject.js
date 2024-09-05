document.addEventListener('DOMContentLoaded', async () => {
    const param = new URLSearchParams(window.location.search).get("projectId");
    const token = localStorage.getItem("token");

    const response = await fetch(`https://search-coders.onrender.com/projects/${param}/`, {
        method: "GET",
        headers: {
            Authorization: `Token ${token}`
        }
    });

    if (response.ok) {
        const projectData = await response.json();
        // Populate the form fields with the current data
        document.getElementById('title').value = projectData.title;
        document.getElementById('description').value = projectData.description;
        document.getElementById('demo_link').value = projectData.demo_link;
        document.getElementById('source_link').value = projectData.source_link;
        // You can show the existing cover image somewhere or handle accordingly
    } else {
        alert('Failed to fetch project data!');
    }
});

const handleUpdateProject = async (e) => {
    e.preventDefault();
    const param = new URLSearchParams(window.location.search).get("projectId");
    const form = document.getElementById("update-project-form");
    const formData = new FormData(form);
    const token = localStorage.getItem("token");
    const user_id = localStorage.getItem("user_id")
    const imageFile = formData.get('image');
    let imageUrl = '';

    if (imageFile && imageFile.name) {
        const imgFormData = new FormData();
        imgFormData.append('image', imageFile);
        const imgbbResponse = await fetch('https://api.imgbb.com/1/upload?key=e250b9a530635d7abaa21ba20c5bc38b', {
            method: 'POST',
            body: imgFormData
        });
        const imgbbData = await imgbbResponse.json();
        if (imgbbData.status === 200) {
            imageUrl = imgbbData.data.url;
        } else {
            alert('Image upload failed!');
            return;
        }
    }

    // Fetch the current project data to compare
    const response = await fetch(`https://search-coders.onrender.com/projects/${param}/`, {
        method: "GET",
        headers: {
            Authorization: `Token ${token}`
        }
    });
    const existingProjectData = await response.json();

    // Build the project data object
    const projectData = {
        title: formData.get("title") || existingProjectData.title,  // Use existing data if blank
        description: formData.get("description") || existingProjectData.description,
        demo_link: formData.get("demo_link") || existingProjectData.demo_link,
        source_link: formData.get("source_link") || existingProjectData.source_link,
        owner: parseInt(user_id),
        featured_image: imageUrl || existingProjectData.featured_image  // Keep existing image if none uploaded
    };

    fetch(`https://search-coders.onrender.com/projects/${param}/`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        },
        body: JSON.stringify(projectData),
    })
    .then((res) => res.json())
    .then((data) => {
        if (!data.error) {
            alert("Project updated successfully!");
            window.location.href = `project_details.html?projectId=${param}`;
        } else {
            console.error('Update failed:', data.error); 
        }
    })
    .catch(error => {
        console.error('Error updating project:', error);
    });
};
