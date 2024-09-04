fetch("../navbar.html")
.then(res=> res.text())
.then(data=> {
    document.getElementById("navbar").innerHTML = data
    const user_id = localStorage.getItem("user_id")
    let navbarElement = document.getElementById("navbar-element")
    if(user_id){
        navbarElement.innerHTML += `
                
        <li class="nav-item">
            <a class="nav-link t2 "  href="./add_project.html">Add Project</a>
        </li>

        <li class="nav-item">
        <a class="nav-link t2 "  href="./profile.html">Profile</a>
        </li>

        <li class="nav-item">
            <a class="nav-link t2" onclick="handleLogout()"  href="#" >Logout</a>
        </li>
        
        `
    }
    else{
        navbarElement.innerHTML += `
        <li class="nav-item">
            <a class="nav-link t2" href="./login.html">Login</a>
        </li>
        
        `
    }
   


   
})
