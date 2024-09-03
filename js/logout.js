const handleLogout = () => {
    const token = localStorage.getItem('token')

    fetch("http://127.0.0.1:8000/users/logout/", {
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