# Swag Labs Automation test with Cypress🚀

This automation sample project is created to test the Login Functionality of Swag Labs using Cypress as a framework for testing. It includes tests for Login features with flexibility to run them headless and headed modes.🌐


## Table of Contents 📚

- [Installation](#installation)
- [Running the Tests](#running-the-tests)
  - [Headless Mode](#headless-mode)
  - [Headed Mode](#headed-mode)
- [Features](#features)

---


## Installation 🛠️

### 1. Create project Folder
- Create a folder named "Cypress-project" on your prefered location
  
```bash
mkdir ~/Desktop/Cypress-project
```

### 2. Clone the Repository

```bash
cd  ~/Desktop/Cypress-project
git clone https://github.com/LFarparan/cypress_Trial.git
```
### 3. Install Dependencies

```bash
cd  cypress_Trial
git init
npm i cypress --save-dev
```
## Running the Tests 🏃‍♂️
- We have spec file (a Test Code/File) spec, and they can be run in both headless and headed modes.

### Headless Mode 🧑‍💻 (Without Browser UI)

1. Login Test (Headless)
- To run the login test in headless mode:

```bash
npm run login-test
```

### Headed Mode 🖥️ (With Browser UI)
- In headed mode, the browser runs with a visible UI. This mode is useful for debugging and visual verification of test actions.

1. Login Test (Headed)
- To run the login test in headed mode:

```bash
npm run login/test
```

## Features ✨

- **Login Test**: Automates the login functionality using valid and invalid credentials on the Swag Labs website.


