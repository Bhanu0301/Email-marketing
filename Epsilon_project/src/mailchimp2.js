const fs = require('fs');
const { exec } = require('child_process');
const csv = require('csv-parser');
const Mailchimp = require('mailchimp-api-v3');

const apiKey = '6046475b281b1d0ef79ea0bab0b051cb-us14';
const listId = 'c7c4cee8ff';
const csvFilePath = 'C:/Users/Admin/Epsilon_project/csvs/epsilon.csv';

const mailchimp = new Mailchimp(apiKey);

// Step 1: Export data from MongoDB to CSV using mongoexport
const databaseName = 'reliance_db';
const collectionName = 'users';

const mongoExportCommand = `mongoexport --db ${databaseName} --collection ${collectionName} --type=csv --fields "name,email,selectedCategories,brands,priceRanges,uniqueLink" --out ${csvFilePath}`;
// Modify your MongoDB query
Users.find({ age: { $gt: 18 } })
  .then((users) => {
    // Process and export the filtered users to a CSV file
    exec(mongoExportCommand, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error exporting data from MongoDB: ${error}`);
        return;
      }
    
      if (stderr) {
        console.error(`Mongoexport stderr: ${stderr}`);
      }
    
      console.log(`Data exported from MongoDB to ${csvFilePath}`);
    
      // Step 2: Read and process the exported CSV data
      parseCSV(csvFilePath);
    });
  })
  .catch((error) => {
    console.error(error);
  });

// exec(mongoExportCommand, (error, stdout, stderr) => {
//   if (error) {
//     console.error(`Error exporting data from MongoDB: ${error}`);
//     return;
//   }

//   if (stderr) {
//     console.error(`Mongoexport stderr: ${stderr}`);
//   }

//   console.log(`Data exported from MongoDB to ${csvFilePath}`);

//   // Step 2: Read and process the exported CSV data
//   parseCSV(csvFilePath);
// });

// Create a function to handle CSV parsing
const parseCSV = (filePath) => {
  const results = [];
  
  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => {
      results.push(data);
    })
    .on('end', () => {
      // Process the parsed CSV data
      processCSVData(results);
    });
};

// Create a function to process the parsed CSV data
const processCSVData = (data) => {
  data.forEach((userData) => {
    const email = userData.email;
    const name = userData.name;
    const selectedCategories = JSON.parse(userData.selectedCategories);
    const favoriteBrands = JSON.parse(userData.brands);
    const priceRanges = JSON.parse(userData.priceRanges);
    const uniqueLink = userData.uniqueLink;

    // Step 3: Send personalized emails
    mailchimp
      .post(`/lists/${listId}/members`, {
        email_address: email,
        first_name: name,
        status: 'subscribed',
        merge_fields: {
          FAVOURITE: favoriteBrands.join(', '), // Join the array values with commas
          FNAME: name,
          SELECT_CAT: selectedCategories.join(', '), // Join the array values with commas
          BRANDS: favoriteBrands.join(', '), // Join the array values with commas
          PRICERANGE: priceRanges.join(', '),
          UNIQUELINK: uniqueLink, // Join the array values with commas
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
};
