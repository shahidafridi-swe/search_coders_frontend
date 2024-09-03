fetch("../navbar.html")
.then(res=> res.text())
.then(data=> {
    document.getElementById("navbar").innerHTML = data

    let navbarElement = document.getElementById("navbar-element")
    navbarElement.innerHTML += `
                
            <li class="nav-item">
                <a class="nav-link t2 "  href="./add_article.html">Add Project</a>
            </li>
            <li class="nav-item">
            <a class="nav-link t2 "  href="./profile.html">Profile</a>
            </li>

            <li class="nav-item">
            <a class="nav-link t2 "  href="./profile.html">Developers</a>
            </li>

            <li class="nav-item">
                <a class="nav-link t2" onclick="handleLogout()"  href="#" >Logout</a>
            </li>

            
            <li class="nav-item">
                <a class="nav-link t2" href="./login.html">Login</a>
            </li>
            

            <li class="nav-item">
                <a class="nav-link t2" href="./register.html">Register</a>
            </li>
            
            `


   
})
