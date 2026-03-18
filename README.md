# 🧩 Task: Fetch and Display Users

## 📌 Description
This project is a simple web page built using HTML, CSS, and JavaScript that fetches user data from [JSONPlaceholder Users API](https://jsonplaceholder.typicode.com/users) and displays it in a structured and styled way.

## 🎯 Requirements

### 1. Fetch Data
- Use the Fetch API (or Axios if preferred).
- Fetch users from the endpoint: `https://jsonplaceholder.typicode.com/users`.
- Handle loading and error states gracefully. ⏳❌

### 2. Display Users
For each user, display the following information:

- 👤 **Name**
- 📧 **Email**
- 📞 **Phone**
- 🌐 **Website**
- 🏢 **Company Name**

### 3. UI Layout
- Show users as **cards** 🃏
- Cards should be **responsive** (use grid layout) 📐
- Add **basic styling**: padding, shadows, spacing ✨

### 4. Controlled Data Display
- Initially, the page should display:
  - A title: **“Users Directory”** 🏷️
  - A button: **“Show Users”** ▶️
  - An input/select to choose how many users to display (default: all or 5) 🔢

- When the user clicks **“Show Users”**:
  - Fetch and render the selected number of users 🖥️
  - Show a **loading indicator** while fetching ⏳
  - Handle and display **error messages** if fetching fails ❌

## 💻 Usage
1. Open `index.html` in your browser 🌐
2. Choose the number of users to display from the dropdown 🔢
3. Click **“Show Users”** ▶️
4. Users will appear in styled cards 🃏. If there’s an error, an error message will be displayed ❌

## 🎨 Technologies
- HTML 🖼️
- CSS 🎨
- JavaScript (ES6+) 💻
- Fetch API 🌐

## ✨ Features
- Responsive card layout 📐
- Loading spinner while fetching ⏳
- Error handling for failed requests ❌
- Select to control the number of users displayed 🔢
