const handleAddProject = async (e) => {
    e.preventDefault();

    const form = document.getElementById("project-form");
    const formData = new FormData(form);
    const token = localStorage.getItem("token")
    const user_id = localStorage.getItem("user_id")

    // Upload the image to Imgbb first
    const imageFile = formData.get('image');
    let imageUrl = '';
    console.log(formData)
    if (imageFile.name) {
        const imgFormData = new FormData();
        imgFormData.append('image', imageFile);
        console.log('imgFormData->>', imgFormData);
        const imgbbResponse = await fetch('https://api.imgbb.com/1/upload?key=e250b9a530635d7abaa21ba20c5bc38b', {
            method: 'POST',
            body: imgFormData
        });
        console.log("hello")
        const imgbbData = await imgbbResponse.json();
        if (imgbbData.status === 200) {
            imageUrl = imgbbData.data.url;
        } else {
            alert('Image upload failed!');
            return;
        }
    }
    const projectData = {
        title : formData.get("title"),
        description: formData.get("description"),
        demo_link: formData.get("demo_link"),
        source_link: formData.get("source_link"),
        featured_image: imageUrl,
        owner : parseInt(user_id)
    }
    console.log(projectData);
    fetch("https://search-coders.onrender.com/projects/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
        },
        body: JSON.stringify(projectData)
    })
    .then((res) => {
        if (!res.ok) {
            return res.json().then((data) => {
                throw new Error(data.detail || 'Failed to add project');
            });
        }
        return res.json();
    })
    .then((data) => {
        console.log('data->>', data);
        alert("Project added successfully!");
        window.location.href = "./index.html";
    })
    .catch(error => {
        console.error('Error:', error);
        alert("An error occurred while adding the project: " + error.message);
    });
}