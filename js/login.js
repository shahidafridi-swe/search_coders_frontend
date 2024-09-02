const handleLogin = async (event) => {
    event.preventDefault();
    document.getElementById("login-loading-message").innerText = "Loading...";

    const form = document.getElementById("login-form");
    const formData = new FormData(form);

    const loginData = {
        username: formData.get("username"),
        password: formData.get("password"),
    };

    try {
        const response = await fetch("http://127.0.0.1:8000/users/login/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginData),
        });

        const data = await response.json();
        document.getElementById("login-loading-message").innerText = "";

        if (response.ok) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("user_id", data.user_id);

            document.getElementById("login-success-message").innerText = "Login successful! Redirecting...";
            setTimeout(() => {
                window.location.href = "dashboard.html"; 
            }, 2000);
        } else {
            document.getElementById("login-error-message").innerText = data.non_field_errors || "Login failed!";
        }

    }
    catch (error) {
        console.error("Error during login:", error);
        document.getElementById("login-loading-message").innerText = "";
        document.getElementById("login-error-message").innerText = "An error occurred. Please try again.";
    }
};
