<h1>Eshop Spot - BACKEND</h1>

<h2>INTRODUCTION</h2>
<p>This is a backend application for an E-COMMERCE web application which contains numerous features in which helps the customer to reach the satisifcation he desires. In this ReadME file, I will elaborating each feature in which it is a part of the Eshop Spot.</p>

<h2>Database</h2>
<p>MongoDB has been used as the database for the Eshop Spot as it is more uncomplicated to use a NoSQL database. Moreover, mongoose, which is elegant mongodb object modeling for node.js, has been used to connect to the database. I will be providing the link of the documentation.</p>

<p>The db.js file is in the config folder, which provides the database connection code using mongoose.</p>

<h2>Middlewares</h2>
<p>This folder contains the middleware functions of the Eshop Spot. What the heck is a middleware function exactly? Middleware functions are functions that have access to the request object (req), the response object (res), and the next function in the application’s request-response cycle. The next function is a function in the Express router which, when invoked, executes the middleware succeeding the current middleware. </p>

<h3>errorMiddleware.js</h3>
<p>errorMiddlewar.js file is a global error function which executes as soon as an error occurs in the routing handlers. How does it actually work? We have created an apiError class which extends from the Error class, and it can be found in the utils folder. The class consists of two main properties which are: (1) Message (2) Status. We develop a new instance of the ApiError class in a certain service, such as the categoryService. The error of the categoryService heads to the errorHandler using the next() method. We can reach both properties using the error object.</p>

<h3>validatorMiddleware.js</h3>
<p>It is a middleware which is related to the express-validator in order to work. I will be providing the documentation</p>

<h2>Models</h2>
<p>Everything in Mongoose starts with a Schema. Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.</p>


<ul>
<li>https://mongoosejs.com/docs/guide.html</li>
<li>https://express-validator.github.io/docs/</li>
</ul>