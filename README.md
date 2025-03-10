# Resume

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.11.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
# Resume Builder - Frontend (Angular)

## 📌 Project Overview
This is the frontend application for the **Resume Builder**, built using **Angular**. It provides a user-friendly interface where users can enter their resume details, manage their information, and interact with the backend API.

## 🚀 Features
- **User Authentication (JWT-based login/logout)**
- **Resume Creation, Update, and Deletion**
- **Dynamic Forms for User Input**
- **Client-side Validation**
- **Responsive UI using Angular Material**

## 🛠️ Tech Stack
- **Angular**
- **TypeScript**
- **Angular Material (UI Components)**
- **RxJS for State Management**
- **Bootstrap for Styling**

## 🔧 Setup & Installation
### 1️⃣ Clone the Repository
```bash
git clone https://github.com/99khalid/Resume-ForntEnd.git
cd Resume-ForntEnd
```
### 2️⃣ Install Dependencies
```bash
npm install
```
### 3️⃣ Configure API URL
- Update `environment.ts` with the backend API URL:
```typescript
export const environment = {
  production: false,
  apiUrl: 'https://localhost:5024/api/'
};
```

### 4️⃣ Run the Application
```bash
ng serve --open
```
- The app will open in your browser at `http://localhost:4200/`

## 🔑 Authentication
- Users must log in to access resume management features.
- The app stores the JWT token for API requests.

## 📜 License
This project is for interview purposes and is not intended for production use.

## 📬 Contact
For any inquiries, please reach out via **GitHub Issues** or email me at **khalidhassan912999@gmail.com**.

