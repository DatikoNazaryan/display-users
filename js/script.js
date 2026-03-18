const button = document.getElementById("loadBtn");
const usersContainer = document.getElementById("users");
const userCountSelect = document.getElementById("userCount");
const spinner = document.getElementById("spinner");

const statusText = document.createElement("div");
statusText.className = "status";

usersContainer.before(statusText);

button.addEventListener("click", fetchUsers);

 async function fetchUsers() {
      try {
        usersContainer.innerHTML = "";
        statusText.innerHTML = "";

        spinner.style.display = "flex";

        const response = await fetch("https://jsonplaceholder.typicode.com/users");

        if (!response) {
          console.log("Failed to fetch users");
        }

        let users = await response.json();

        const selectedValue = userCountSelect.value;

        if (selectedValue !== "all") {
          users = users.slice(0, Number(selectedValue));
        }

        statusText.innerHTML = "";
        renderUsers(users);

      } catch (error) {
        statusText.innerHTML = `<p class="error">${error.message}</p>`;
        statusText.classList.add("error");
        console.error(error);
      } finally {
       spinner.style.display = "none";
      }
    }


    function renderUsers(users) {
        
      if (users.length === 0) {
        statusText.innerHTML = `<p class="error">No users found</p>`;
        return;
      }

      usersContainer.innerHTML = users.map(user => `
        <div class="card">
          <h3><i class="fa-solid fa-user"></i> ${user.name}</h3>
          <p>
        <i class="fa-solid fa-envelope"></i>
        <a href="mailto:${user.email}">${user.email}</a>
      </p>

      <p>
        <i class="fa-solid fa-phone"></i>
        <a href="tel:${user.phone}">${user.phone}</a>
      </p>

      <p>
        <i class="fa-solid fa-globe"></i>
        <a href="http://${user.website}" target="_blank">
          ${user.website}
        </a>
      </p>

      <p>
        <i class="fa-solid fa-building"></i>
        ${user.company.name}
      </p>
        </div>
      `).join("");
    }