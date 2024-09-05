const handleLogout = () => {
    const token = localStorage.getItem('token')

    fetch("https://search-coders.onrender.com/users/logout/", {
        method : "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization : `Token ${token}`,
        }
    })
    .then((res)=> res.json())
    .then((data)=> {
        console.log(data);
       
        localStorage.removeItem("token")
        localStorage.removeItem("user_id")

        window.location.href ="./login.html"
    })
    .catch((err)=> console.log("logout error:: ",err))

}