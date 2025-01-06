# GARI CHAI

## Overview

The project aims to develop a comprehensive online platform, exclusively web-based, focused on assisting users in purchasing cars tailored to their needs in Bangladesh.

Through a centralized admin panel, the platform will manage all aspects of car listings, user inquiries, and dealer interactions. Users will access a user-friendly website to explore rich automotive content, with detailed specifications, pricing information, as well as multimedia resources such as videos and images for all available car brands and models in the region.

Strategic partnerships with auto manufacturers and car dealers will streamline the vehicle purchasing process for users. Additionally, users will have the capability to sell their used cars on the platform, access various services offered by the company, and engage in interactive features such as reviews and comments. Interaction between users and dealers will be mediated through the admin panel, ensuring a smooth and transparent transaction process.

## Objectives

### Centralized Management through Admin Panel

- Develop a robust admin panel to manage all aspects of the platform, including car listings, user inquiries, and dealer interactions.
- Implement user authentication and authorization mechanisms to ensure secure access to the admin functionalities.

### User-Friendly Web Platform

- Create an intuitive and responsive website for users to explore rich automotive content, including detailed specifications, pricing, reviews, and multimedia resources.
- Ensure seamless integration with the admin panel to facilitate user interactions and inquiries.

### Streamlined Dealer Interactions

- Establish a streamlined process for dealers to list their cars on the platform, requiring approval and oversight from the admin panel.

### Enhanced User Experience and Engagement

- Implement interactive features such as user reviews and comments to foster community engagement and facilitate knowledge sharing among users.

### Technology Integration and Optimization

- Utilize **Next.js** for frontend development and **Express.js** for backend/API development to ensure a robust and efficient web platform.
- Integrate **MongoDB Atlas** as the database solution for scalability and reliability of data storage.

### Deployment and Hosting

- Host the UI and Admin dashboard on **Vercel** for seamless deployment and high availability, with optimized hosting resources to accommodate increasing user traffic.
- Host the API on **Render** to ensure reliable performance and scalability, facilitating seamless communication between the frontend and backend components.

---

## Features

### User Interface

#### Register Account

- Users can register using phone or email for account creation.

#### Car Exploration

- Cars are divided into sections such as latest cars, popular cars, upcoming cars, etc., for easy exploration.
- Quick search functionality enables users to find cars efficiently.

#### Global Search

- Users can perform a global search by name, brand, model, etc., to find specific cars.

#### Detailed Car Information

- View detailed information about each car, including specifications, features, and pricing.
- Car images are displayed in a gallery format, allowing users to browse through multiple images.
- Users can view car images categorized by colors and watch videos directly within the website from external platforms like YouTube and Facebook.

#### Wishlist

- Users can add cars to their wishlist for future reference.

#### Advanced Filtering and Sorting

- Advanced filtering options allow users to find cars by budget, brand, model, etc.
- Pagination feature enables smooth navigation through multiple car listings.

#### User Interaction

- Users can make reviews and comments on car listings.
- Nested comments functionality allows for deeper engagement and discussions.

#### User Account Management

- Users can update their account information and choose to delete or deactivate their accounts.

---

### Admin Dashboard

#### Vendor/Dealer Management

- Admin can add different vendors/dealers to the platform.
- Admin can associate cars with specific dealers for better inventory management.

#### Dynamic Forms

- Admin can create dynamic forms to store any type of information regarding cars.

#### Car Listing Management

- Admin can add, edit, and remove car listings with comprehensive details and multimedia resources.
- Complete control over adding brands, models, body types, etc., and managing them.

#### User Inquiry Management

- Admin can monitor and respond to user inquiries, requests, and feedback through a centralized interface.
- Facilitate communication between users and dealers for car inquiries.

#### Customizable Homepage

- Admin can customize the homepage layout, content, and featured car listings dynamically.
- Control over sections like latest cars, upcoming cars, popular brands, sliders, etc.
- Separate sliders for mobile and desktop devices, with fully customizable slider functionality.

#### Advanced Data Table

- Utilize advanced data tables to display data in a tabular form with features like sorting and filtering.

---

## Backend

### RESTful APIs

- Design and develop RESTful APIs using **Express.js** to handle client-server communication.
- Define routes and endpoints to enable CRUD (Create, Read, Update, Delete) operations for various resources such as users, cars, and inquiries.

### Authentication and Authorization

- Implement **JWT** (JSON Web Tokens) authentication using **Passport.js** to secure API endpoints.
- Authenticate users and generate tokens upon successful login, ensuring secure access to protected routes.
- Authorize user actions based on roles and permissions to restrict unauthorized access to sensitive data and functionalities.

### Data Modeling and Management

- Define data models using **TypeScript** and **Mongoose** to structure and organize data in MongoDB.
- Create schemas for entities such as users, cars, vendors, and inquiries, specifying data types, validations, and relationships.

### Validation and Error Handling

- Utilize **Zod** for schema validation to ensure incoming request data meets specified requirements.
- Implement error handling middleware to gracefully handle exceptions and provide informative error responses to clients.

---

## Technologies

### Frontend

- **Next.js**, **Tailwind CSS**, **Shadcn UI**, **Next UI**, **TypeScript**

### Backend

- **Express.js**, **TypeScript**, **Passport.js**, **JWT**, **Zod**

### Database

- **MongoDB** with **Mongoose**

### Cloud Services

- **Edgestore** for image storage

### Hosting

- **Vercel** for frontend
- **Render** for API backend
