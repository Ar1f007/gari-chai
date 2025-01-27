# GARI CHAI

## Links

- [**Visit Web View**](https://gari-chai-ar1f007s-projects.vercel.app)
- [**Visit Admin Dashboard**](https://gari-chai-admin-ar1f007s-projects.vercel.app)

### Admin Dashboard Credentials

> **Email/Phone**: `01633333333`
> **Password**: `admin123`

---

### ⚠️ **Important Note**

- The API is hosted on a Render free-tier plan, which enters sleep mode after 15 minutes of
  inactivity.
- As a result, the application may take **15-30 seconds, or at most 50 seconds** when accessed.
- **If the page doesn’t load immediately, please refresh it after 15-30 seconds.**

## Overview

The project aims to develop a comprehensive online platform, exclusively web-based, focused on
assisting users in purchasing cars tailored to their needs in Bangladesh.

Through a centralized admin panel, the platform will manage all aspects of car listings, user
inquiries, and dealer interactions. Users will access a user-friendly website to explore rich
automotive content, with detailed specifications, pricing information, as well as multimedia
resources such as videos and images for all available car brands and models in the region.

Strategic partnerships with auto manufacturers and car dealers will streamline the vehicle
purchasing process for users. Additionally, users will have the capability to sell their used cars
on the platform, access various services offered by the company, and engage in interactive features
such as reviews and comments. Interaction between users and dealers will be mediated through the
admin panel, ensuring a smooth and transparent transaction process.

## Features

### User Interface

#### Register Account

- Users can register their account using phone or email

#### Car Exploration

- Cars are categorized into sections like "Latest Cars," "Popular Cars," and "Upcoming Cars" for
  easy exploration.
- A quick search functionality on the homepage (on top of slider section) allows users to find cars
  efficiently.

#### Campaigns

- Admin can create campaigns by selecting cars to offer at discounted prices for a limited time.
- Users can place bids on the cars during the campaign period, within the specified offer price
  range.
- The highest three bidders for each car are pinned at the top, with other bids visible in the bid
  section.
- At the end of the campaign, the highest bidder wins the car.

#### Global Search

- Users can perform a global search by car name, brand, model, and more to find specific vehicles.

#### Detailed Car Information

- View detailed information for each car, including specifications, features, and pricing.
- Browse car images, videos in a gallery format, with multiple images/videos available for each
  listing.
- Explore car images categorized by color and watch videos from external platforms like YouTube and
  Facebook directly on the site.
- Read reviews left by other users.
- View comments made by others for further insights and discussions.

#### Advanced Filtering and Sorting

- Advanced filtering options help users find cars based on criteria such as budget, brand, model,
  seats, fuel type, and more.
- A pagination feature ensures smooth navigation through multiple car listings.

#### User Interaction

- Users can leave comments on the car details page to share their opinions or ask questions.
- Nested comments functionality allows users to reply to comments, fostering deeper engagement and
  meaningful discussions.
- Users also can write reviews, which are initially set to a pending state for admin approval,
  ensuring the platform remains clean and free from misuse or scams.

#### Wishlist

- Users can add cars to their wishlist for future reference.

#### User Account Management

- Users can update their account information from profile page
- The "Forgot Password" feature allows users to reset their password via a secure link sent to their
  email, containing a token for verification.
- Users have the option to delete or deactivate their accounts based on their preferences.

---

### Admin Dashboard

#### Vendor/Dealer Management

- Admin can add multiple vendors or dealers to the platform.
- Admin can assign cars to specific dealers for more efficient inventory management.

#### Dynamic Forms

- A highly dynamic form has been created for adding any type of car-related information.
- The form is highly extensive, allowing for maximum flexibility and customization.
- Admin can utilize the form to capture a wide range of car details, tailored to the platform's
  needs.

#### Car Listing Management

- Admin can add, edit, and remove car listings with detailed information and multimedia resources.
- Full control over managing brands, models, body types, and other car attributes.

#### User Inquiry Management

- Admin can monitor and respond to user inquiries, requests, and feedback via a centralized
  interface.
- Facilitates communication between users and dealers for car-related inquiries.

#### Customizable Homepage

- Admin can dynamically customize the homepage layout and featured car listings.

- Full control over sections like "Latest Cars," "Upcoming Cars," "Popular Brands," and more.
- Separate sliders for mobile and desktop devices with fully customizable functionality.
- Car listings in each section can be displayed in a sorted order based on a given sort number.

#### Customizable Homepage - Slider Management

- Admin can add separate sliders for desktop and mobile views, each with its unique customization
  options.
- Each slider can be customized individually, including adding or removing titles and linking to
  specific URLs.
- Sliders can have their own status, allowing admins to toggle between enabled or disabled, which
  will control whether the slider is visible on the web view.
- Sliders are sortable, with each slider having an associated sort number, allowing them to be
  displayed in a specific order based on the sort sequence.

#### Advanced Data Table

- Use advanced data tables to display information in a tabular format with features like sorting,
  filtering, and searching.
- Additional features for streamlined data management and user experience.

---

## Backend

### RESTful APIs

- Design and develop RESTful APIs using **Express.js** to handle client-server communication.
- Define routes and endpoints to enable CRUD (Create, Read, Update, Delete) operations for various
  resources such as users, cars, and inquiries.

### Authentication and Authorization

- Implement **JWT** (JSON Web Tokens) authentication using **Passport.js** to secure API endpoints.
- Authenticate users and generate tokens upon successful login, ensuring secure access to protected
  routes.
- Authorize user actions based on roles and permissions to restrict unauthorized access to sensitive
  data and functionalities.

### Data Modeling and Management

- Define data models using **TypeScript** and **Mongoose** to structure and organize data in
  MongoDB.
- Create schemas for entities such as users, cars, vendors, and inquiries, specifying data types,
  validations, and relationships.

### Validation and Error Handling

- Utilize **Zod** for schema validation to ensure incoming request data meets specified
  requirements.
- Implement error handling middleware to gracefully handle exceptions and provide informative error
  responses to clients.

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
