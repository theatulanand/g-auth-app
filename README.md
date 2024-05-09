# Auth App

Welcome to the Authentication System, built using Node.js and React!

## Installation

1. **Clone the Repository**: Begin by cloning the repository to your local machine:
    ```bash
    git clone https://github.com/theatulanand/g-auth-app
    ```
   
2. **Navigate to the Project Directory**: Move to the root directory of the project and install the necessary dependencies:
    ```bash
    npm install
    ```

3. **Install Client Dependencies**: Navigate to the client directory and install the required dependencies:
    ```bash
    cd client
    npm install
    ```

## Configuration

1. **Set Up Environment Variables**: Create a `.env` file in the root directory and add the following variables:
    ```plaintext
    JWT_SECRET="<Your JWT Secret>"
    DB_URI="<Your MongoDB URI>"
    ```

## Launch the Application

1. **Build Client**: Before starting the application, build the client:
    ```bash
    npm run build
    ```

2. **Start the Server**: Launch the application by running the following command in the root directory:
    ```bash
    npm start
    ```

3. **Access the Application**: Once the server is up and running, access the application through your browser.

## Live Demo

This project is live! You can access the [Live Demo here](https://authapp.aboutatul.in/).

## Features

- **Secure Authentication**: Utilizes JWT tokens for secure authentication.
- **MongoDB Integration**: Seamlessly integrates with MongoDB for efficient data storage.
- **Client-Server Architecture**: Built with a client-server architecture using React for the front end and Node.js for the backend.

Feel free to reach out if you have any questions or need further assistance!
