const fs = require('fs');
const productData = require('./products.json'); // Adjust the path as needed

const { exec } = require('child_process');
const Mailchimp = require('mailchimp-api-v3');

const apiKey = '6046475b281b1d0ef79ea0bab0b051cb-us14'; // Replace with your Mailchimp API key
const listId = 'c7c4cee8ff'; // Replace with your Mailchimp audience (list) ID
const databaseName = 'reliance_db'; // Replace with your MongoDB database name
const collectionName = 'users'; // Replace with your MongoDB collection name
const jsonFilePath = '../products.json'; // Replace with the path to your JSON product data file
const csvFilePath = 'C:/Users/Admin/Epsilon_project/csvs/epsilon.csv';

// Initialize the Mailchimp API client
const mailchimp = new Mailchimp(apiKey);

// Step 1: Export data from MongoDB to CSV
const mongoExportCommand = `mongoexport --db ${databaseName} --collection ${collectionName} --type=csv --fields "name,email,selectedCategories,brands,priceRanges"  --out ${csvFilePath}`;

exec(mongoExportCommand, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error exporting data from MongoDB: ${error}`);
    return;
  }

  if (stderr) {
    console.error(`Mongoexport stderr: ${stderr}`);
  }

  console.log(`Data exported from MongoDB to ${csvFilePath}`);

  // Step 2: Read the CSV file and send personalized emails
  const usersData = fs.readFileSync(csvFilePath, 'utf8').trim().split('\n');
  const header = usersData.shift().split(',');
  // ... (previous code)


// Step 3: Send personalized emails
usersData.forEach((userData) => {
  const values = userData.split(',');
  const email = values[header.indexOf('email')];
  const name = values[header.indexOf('name')];
  const favoriteBrands = values[header.indexOf('brands')];
  const selectedCategories = values[header.indexOf('selectedCategories')];
  const priceRanges = values[header.indexOf('priceRanges')];

  // Split the comma-separated values into arrays
  const selectedCategoriesArray = selectedCategories ? selectedCategories.split(',') : [];
  const favoriteBrandsArray = favoriteBrands ? favoriteBrands.split(',') : [];
  const priceRangesArray = priceRanges ? priceRanges.split(',') : [];

  // Step 3: Send personalized emails
  mailchimp
    .post(`/lists/${listId}/members`, {
      email_address: email,
      first_name: name,
      status: 'subscribed',
      merge_fields: {
        FAVOURITE: favoriteBrandsArray.join(', '), // Join the array values with commas
        FNAME: name,
        SELECT_CAT: selectedCategoriesArray.join(', '), // Join the array values with commas
        BRANDS: favoriteBrandsArray.join(', '), // Join the array values with commas
        PRICERANGE: priceRangesArray.join(', '), // Join the array values with commas
        // Add other merge fields as needed
      },
    })
    .then((response) => {
      console.log(`Email sent to ${email}: ${response.id}`);
    })
    .catch((error) => {
      // Handle the error gracefully
      if (error.response && error.response.status === 400 && error.response.data.title === 'Member Exists') {
        console.log(`Email ${email} is already listed in Mailchimp.`);
      } else {
        console.error(`Error sending email to ${email}: ${error.message}`);
      }
    });
});
});