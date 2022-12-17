# Yoga-Server
This is the server-side component of a Yoga application. It is a RESTful API built using Node.js and Express. The API enables clients to perform various operations such as creating, reading, updating, and deleting Yoga classes and appointments.

Prerequisites
Before you begin, make sure you have the following installed on your local machine:

-Node.js
-npm

Installation
Clone the repository to your local machine:
Copy code
```
git clone https://github.com/batman005/yoga-server.git
```
Navigate to the project directory:
Copy code
```
cd yoga-server

```
Install the project dependencies:
Copy code
```
npm install
```
Start the server:
Copy code
```
npm start 
nodemon index.js
```

This Entity Relationship (ER) diagram shows the relationships between several entities in a Yoga class  Registration form.

![ERDiagram](https://user-images.githubusercontent.com/51878340/208255937-22a0a463-f376-491b-8c3a-cdc2a310aef5.png)


I have implemented the database for this application using PostgreSQL and the backend using Node.js and Express. To serve the database, I have used the render and to host the server, I have used cyclic. These technologies enable me to create a robust and scalable RESTful API for the Yoga class scheduling system.

About my Yogatable Schema
This schema defines a table called yoga in a PostgreSQL database. The table has the following columns:

- yoga_id: A unique serial identifier for each row in the table.
* batch: A string representing the batch in which the student is enrolled.
+ dob: A date representing the student's date of birth.
-email: A string representing the student's email address, which is also used as the primary key for the table.
-gender: A string representing the student's gender.
-name: A string representing the student's name.
-status: A string representing the student's enrollment status.
-number: A unique big integer representing the student's phone number.
-date_of_joining: A date representing the date on which the student joined the program.
-date_of_expiry: A date representing the date on which the student's enrollment expires.
This table is used to store information about Yoga students, including their personal details, enrollment information, and contact details. The yoga_id column is used as a unique identifier for each student, and the email column is used as the primary key for the table. The date_of_joining and date_of_expiry columns are used to track the student's enrollment period.


