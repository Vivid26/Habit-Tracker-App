# HabitTracker
### [Live Habit Tracker App](https://habit-tracker-app-qhb8.onrender.com)

A web application which help you to create, update, delete and track your habit on daily basis. 
It is user specific app, which mean a user can track their habit, and mark it as done , or not done. 
The project is built using a tech stack consisting of Node.js for the server-side scripting.
Express for handling HTTP requests and routing.
MongoDB for storing and managing the data and EJS for rendering the views and templates.

## Installation
To run this application on your local machine, please follow these steps:

Clone this repository using the following command:
```
$ git clone https://github.com/Vivid26/Habit-Tracker-App.git
```
Install the required dependencies using the following command:
```
$ npm install 
```
Add appropriate values to below environment variables in .env file
```
GOOGLE_CLIENT_ID=<Your google OAuth client application's client ID>
GOOGLE_CLIENT_SECRET=<Your google OAuth client application's client secret key>

SMPT_MAIL=<Registered mail id to send mails from your app using mail sending API's service>
SMPT_MAIL_PASSWORD=<Password associated with above mail id>

CAPTCHA_SITE_KEY=<Your applications Google reCAPTCHA site key>
CAPTCHA_SECRET_KEY=<Your applications Google reCAPTCHA secret key>
```
Start the application using the following command:
```
$ npm start 
```
Open the application in your web browser by visiting the following URL:
```
$ http://localhost:8000
```

## Usage
Once you have the application up and running, you can start using it by following these steps:
* Sing-up/Sign-in into your account.
* Click on the "Add Habit" button to create a new habit.
* Enter the name of the habit you want to track.
* Click on the "Save" button to save the habit.
* To mark a habit as complete/incomplete for the day, simply click on the corresponding icon.
* To delete a habit, click on the "Delete" icon next to it.
* To see today's habits, click on "Show Daily" button.
* To edit a habit, click on the "Edit" icon next to it.
* Sign In via Google
* Reset Password with the reset token and the reset link provided on mail id.


# Technologies

<div align="center">

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![PassportJS](https://img.shields.io/badge/passport-34E27A?style=for-the-badge&logo=passport&logoColor=white)
![GoogleCloud](https://img.shields.io/badge/googlecloud-4285F4?style=for-the-badge&logo=googlecloud&logoColor=white)
![VSCode](https://img.shields.io/badge/VSCode-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white)
![Postman](https://img.shields.io/badge/postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)

</div>
