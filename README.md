
# Email Marketing Platform for Reliance Digital

We have created a platform that enables targeted email marketing for a specific company, in this case, Reliance Digital. Our platform collects customer details through a feedback form and stores them in a MongoDB database. We then send personalized emails to each customer as part of our first campaign, providing them with a unique link that leads them to a page featuring their wishlisted and interested products, complete with customized specifications, brands, and price ranges selected through the feedback form. This approach allows users to easily explore their favorite products, reducing search time.

Additionally, we have the capability to automate email campaigns using MailChimp. For instance, we can send out exclusive offers related to wishlisted products in upcoming festival sales.

## Technology Stack

- **Frontend**: HTML, CSS, JavaScript, EJS templating
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Email Marketing Platform**: MailChimp

## Getting Started

Follow these steps to run the project:

1. Make sure you have Node.js, Express.js, and MongoDB installed on your system.

2. Install all the project dependencies.

   ```bash
   npm install
   ```

3. Start MongoDB by running `mongod` in your terminal.

4. Run the backend server.

   ```bash
   nodemon back.js
   ```

   This will host the application at `http://localhost:3000`.

5. After filling out the feedback form, the data will be stored in the database, and a unique link ID will be generated.

6. To access the user's personalized product page, use the following URL format:

   `http://localhost:3000/user-products/{unique_link_ID}`

7. To export new data from the MongoDB database to a CSV file for use in MailChimp, run:

   ```bash
   nodemon mailchimp2.js
   ```

   This CSV file can be imported into MailChimp to support multiple campaigns.

Feel free to explore and use this platform for your email marketing campaigns targeting Reliance Digital customers.
```

Remember to replace `{unique link_ID}` with the actual unique link ID generated for each user. This formatted README provides clear instructions for running the project and gives an overview of your email marketing platform.






![Screenshot (256)](https://github.com/Bhanu0301/Email-marketing/assets/106879319/b7075c15-5c4e-4e16-9201-c85643217eac)
![Screenshot (257)](https://github.com/Bhanu0301/Email-marketing/assets/106879319/fbb87b79-a3f1-479a-a3a2-e33e6867fdeb)
![Screenshot (258)](https://github.com/Bhanu0301/Email-marketing/assets/106879319/8c34cb5e-9ee8-486d-b65f-756d0578e58a)
![Screenshot (259)](https://github.com/Bhanu0301/Email-marketing/assets/106879319/3b3b54ca-0f1f-4638-a554-5bfc3ca40dbc)
![Screenshot (261)](https://github.com/Bhanu0301/Email-marketing/assets/106879319/e3561c86-12e0-4672-9fbd-c3bf918041df)
![Screenshot (262)](https://github.com/Bhanu0301/Email-marketing/assets/106879319/c55ef75a-863c-41ca-bc8b-0eb4a38b12a6)
![Screenshot (263)](https://github.com/Bhanu0301/Email-marketing/assets/106879319/5879eac5-88ea-4750-81e9-94928435b6dc)
![Screenshot (264)](https://github.com/Bhanu0301/Email-marketing/assets/106879319/c13359ff-af3e-446a-9b2a-30c1fe5573be)
![Screenshot (265)](https://github.com/Bhanu0301/Email-marketing/assets/106879319/e848cc32-89b4-4ce2-9762-e76a12e78f98)
![Screenshot (266)](https://github.com/Bhanu0301/Email-marketing/assets/106879319/dc693bc1-c3cf-4117-b23b-013f0444f78a)
![Screenshot (267)](https://github.com/Bhanu0301/Email-marketing/assets/106879319/a7ab79ea-7967-42f3-88da-bfe88272bab4)
![Screenshot (268)](https://github.com/Bhanu0301/Email-marketing/assets/106879319/3d5473a1-80c2-458d-8cc6-5e6bbdc9e690)
![Screenshot (270)](https://github.com/Bhanu0301/Email-marketing/assets/106879319/de356f84-7438-4e9f-b240-9f67497a31f4)
![Screenshot (269)](https://github.com/Bhanu0301/Email-marketing/assets/106879319/c02bb50d-452f-415c-8276-6f659e4087ec)










![Screenshot (271)](https://github.com/Bhanu0301/Email-marketing/assets/106879319/d8f85397-cf07-4b81-89e1-af9dc13171f8)
