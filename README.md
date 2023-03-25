# Library Application

This project is a web-based library application that allows users to log in, view available books, and check them out. The front-end of this application is built using React and the back-end is built using Spring Boot. The application uses MySQL as its database, which is run in a Docker container. Okta is used for authentication purposes in both the front-end and back-end.

## Prerequisites

- [Node.js](https://nodejs.org/)
- [Java 17 or later](https://www.java.com/en/download/)
- [Docker](https://www.docker.com/products/docker-desktop)

## Installation

1. Clone the repository using `git clone https://github.com/username/library-app.git`.
2. Navigate to the project directory using `cd library-app`.
3. Start the MySQL Docker container using the following command:

    ```
    docker run --name mysql-db -p 3306:3306 -e MYSQL_ROOT_PASSWORD=password -d mysql:latest
    ```

4. Navigate to the `backend` directory and run the Spring Boot application using `./mvnw spring-boot:run`.
5. Navigate to the `frontend` directory and install the dependencies using `npm install`.
6. Start the React application using `npm start`.

## Configuration

### MySQL

The MySQL container is configured using the command in step 3 of the installation instructions. The default credentials for the root user are:

- Username: root
- Password: password

### Okta

The Okta credentials are stored in the `application.properties` file in the `backend/src/main/resources` directory. Replace the `client-id` and `client-secret` values with your own Okta application credentials.

## Usage

1. Navigate to `http://localhost:3000` in your web browser.
2. Log in using your Okta credentials.
3. Browse the list of available books.
4. Click the "Checkout" button next to a book to check it out.
5. Click the "Return" button next to a checked-out book to return it.

## Contributing

Contributions are welcome. Please open an issue or submit a pull request if you have any suggestions or improvements.
