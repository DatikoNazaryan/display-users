const button = document.getElementById("loadBtn");
const usersContainer = document.getElementById("users");
const userCountSelect = document.getElementById("userCount");
const spinner = document.getElementById("spinner");
const controls = document.querySelector(".controls");
let companySelect = null;
let searchInput = null;
let users = [];

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
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    users = await response.json();

    const selectedValue = userCountSelect.value;
    if (selectedValue !== "all") {
      users = users.slice(0, Number(selectedValue));
    }

    statusText.innerHTML = "";

    populateCompanySelect(users);
    addUsersSearchInput();
    renderUsers(users);

  } catch (error) {
    statusText.innerHTML = `<p class="error">${error.message}</p>`;
    statusText.classList.add("error");
    console.error(error);
  } finally {
    spinner.style.display = "none";
  }
}

function populateCompanySelect(users) {
  if (!companySelect) {
    companySelect = document.createElement("select");
    const allOption = document.createElement("option");
    allOption.value = "";
    allOption.textContent = "All Companies";
    companySelect.appendChild(allOption);

    const companies = [...new Set(users.map(u => u.company.name))];
    companies.forEach(name => {
      const option = document.createElement("option");
      option.value = name;
      option.textContent = name;
      companySelect.appendChild(option);
    });

    companySelect.addEventListener("change", filterUsersByCompany);
    controls.appendChild(companySelect);
  }
}

function addUsersSearchInput(){
    if (!searchInput) {
      searchInput = document.createElement("input");
      searchInput.type = "text";
      searchInput.placeholder = "Search by name...";
      searchInput.addEventListener("input", applyFilters);
      controls.appendChild(searchInput);
    }
}

function applyFilters() {
  statusText.innerHTML = "";
  const searchValue = searchInput ? searchInput.value.toLowerCase() : "";
  const selectedCompany = companySelect ? companySelect.value : "";

  const filteredUsers = users.filter(u => {
    const matchesName = u.name.toLowerCase().includes(searchValue);
    const matchesCompany = selectedCompany ? u.company.name === selectedCompany : true;
    return matchesName && matchesCompany;
  });

  renderUsers(filteredUsers);
}

function filterUsersByCompany() {
  const selectedCompany = companySelect.value;
  const filteredUsers = selectedCompany 
    ? users.filter(u => u.company.name === selectedCompany) 
    : users;
  renderUsers(filteredUsers);
}

function renderUsers(usersArray) {
    usersContainer.innerHTML = "";
  if (usersArray.length === 0) {
    statusText.innerHTML = `<p class="error">No users found</p>`;
    return;
  }

  usersContainer.innerHTML = usersArray.map(user => `
    <div class="card">
      <h3><i class="fa-solid fa-user"></i> ${user.name}</h3>
      <p><i class="fa-solid fa-envelope"></i> <a href="mailto:${user.email}">${user.email}</a></p>
      <p><i class="fa-solid fa-phone"></i> <a href="tel:${user.phone}">${user.phone}</a></p>
      <p><i class="fa-solid fa-globe"></i> <a href="http://${user.website}" target="_blank">${user.website}</a></p>
      <p><i class="fa-solid fa-building"></i> ${user.company.name}</p>
    </div>
  `).join("");
}