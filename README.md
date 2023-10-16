# Email-marketing

We have created a platform to enable email marketing specifically to a particular company(say reliance-digital)   
Through this we collect customer details through a feedback form and store in our database(mongoDB)      
We send a mail to each customer as a part of our first campaing, where we have an unique link sent to each user, which when clicked ,heads him/her to a page with their wishlisted / intrested products choosen with customized specifications, brands and price ranges the selected through the feedback form. The user can explore his or her favourite products easily reducing the search time.   
Further we can automate the mail through mailChimp for further campaings accordingly , say for instance sending the whooping offers available on their wishlisted products in upcoming festival sale.   

Frontend : HTML,CSS,Javascript, EJS templating    
Backend : NodeJS, expressJS    
Database : MongoDB   
Email Marketing platform : MailChimp    

Steps to run the project       

Making sure nodejs, expressjs , mongoDB is already install
Install all the dependencies used and run mongod in the terminal

nodemon back.js  (in other terminal) -----> this will host to localhost:3000 (in your browser)   
after filling the feedback form the data will be stored into the database and unique link_ID will be generated
localhost:3000/user-products/{unique link_ID} --> This will head to the page which conatains the products wishlisted/selected out of intrest through the feedback form    

nodemon mailchimp2.js ------> This will export the new data from mongoDB database to a CSV file , this csv file is used to import the data into mailchimp where we can hold multiple campaings      







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
