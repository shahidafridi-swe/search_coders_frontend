
const handleRegister = async  (event) => {
    event.preventDefault()
    document.getElementById("register-loading-message").innerText= "Loading..."
    const form = document.getElementById("register-form");
    const formData  = new FormData(form);
    const password = formData.get("password");
    const confirm_password = formData.get("password2");
    if (password !== confirm_password) {
        alert('Passwords do not match!');
        return;
    }
    const imageFile = formData.get('image');
    let imageUrl = '';
    console.log('imgFile>>', imageFile);
    if (imageFile) {
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
    const registerData = {
        username: formData.get("username"),
        email: formData.get("email"),
        first_name: formData.get("first_name"),
        last_name: formData.get("last_name"),
        profile: {
            domain: formData.get("domain"),
            bio: formData.get("bio"),
            location: formData.get("location"),
            social_website: formData.get("social_website"),
            social_github: formData.get("social_github"),
            social_linkedin: formData.get("social_linkedin"),
            social_youtube: formData.get("social_youtube"),
            social_twitter: formData.get("social_twitter"),
            profile_image: imageUrl,
        },
        password: formData.get("password"),
    };
    console.log(registerData)
    // fetch("http://127.0.0.1:8000/users/register/", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(registerData),
    // })
    // .then((res) => res.json())
    // .then((data) => {

    //     console.log(data);
    //     document.getElementById("register-loading-message").innerText= ""
    //     document.getElementById("register-success-message").innerText = "Check Your Email For Activate Your account"
       
    //     if (data.error) {
           
    //     } else {
    //         setTimeout(() => {
    //             window.location.href = "login.html";
    //         }, 2000);
    //     }
    // })
    // .catch((err) => console.log("error::",err))
}

