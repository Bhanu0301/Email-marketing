const fs = require('fs');
const productData = require('./../public/products.json'); // Adjust the path as needed
const uuid = require('uuid');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const { ObjectID } = require('mongodb');
const app = express();
const ejs = require('ejs'); // Add this line to require EJS

// Middleware
app.set('view engine', 'ejs'); // Set EJS as the view engine
app.set('views', path.join(__dirname, 'views')); // Set the views directory

app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/reliance_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB database');
});

// Define schema and model for data

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^[0-9]{10}$/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(v) {
        return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(v);
      },
      message: props => `${props.value} is not a valid email address!`,
    },
  },
  demographicArea: {
    type: String,
    required: true,
  },
  selectedCategories:{
    type: [],
  },
  brands:{
    type:[],
  },
  priceRanges:{
    type:[],
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'others'],
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^[0-9]{6}$/.test(v);
      },
      message: props => `${props.value} is not a valid pincode!`,
    },
  },
  uniqueLink: {
    type: String,
    required: true,
    unique: true,
  },
});

// Call the filterProducts function with productsData

// const filterProducts = (selectedCategories, selectedBrands, productsData) => {
//   const matchingProducts = [];

//   // Iterate through each brand in the JSON data
//   productsData.forEach((brandData) => {
//     const brand = brandData.brand;
    
//     // Check if the brand matches the selected brands
//     if (selectedBrands.includes(brand)) {
//       // Iterate through products within the brand's price range
//       brandData.products.forEach((product) => {
//         const productCategories = product.specification;

//         // Check if the product's categories match the selected categories
//         const categoryMatch = productCategories.some(category =>
//           selectedCategories.includes(category)
//         );

//         console.log('Brand:', brand);
//         console.log('Selected Brands:', selectedBrands);
//         console.log('Product Categories:', productCategories);
//         console.log('Selected Categories:', selectedCategories);
//         console.log('Category Match:', categoryMatch);

//         if (categoryMatch) {
//           matchingProducts.push({
//             brand,
//             priceRange: brandData.price_range,
//             product: product.product_name,
//             price: product.price,
//             specifications: product.specification,
//             image: product.image,
//           });
//         }
//       });
//     }
//   });

//   return matchingProducts;
// };



const User = mongoose.model('User', userSchema);
module.exports = User;

app.post('/submit', (req, res) => {
  // Create a new user document from request body
  const newUser = new User(req.body);

  // Generate a unique link for the user when saving to the database
  newUser.uniqueLink = uuid.v4(); // Create a unique link

  newUser
    .save()
    .then(savedUser => {
      res.status(200).send('Data saved to database');
      console.log('User data saved with unique link:', savedUser.uniqueLink);
      
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Error saving data to database');
    });
});


// const filterProductsByBrand = (selectedBrand, productsData) => {
//   const matchingProducts = [];

//   // Iterate through each brand in the JSON data
//   productsData.forEach((brandData) => {
//     const brand = brandData.brand;

//     // Check if the brand matches the selected brand
//     if (selectedBrand === brand) {
//       // Iterate through products within the brand's price range
//       brandData.products.forEach((product) => {
//         matchingProducts.push({
//           brand,
//           priceRange: brandData.price_range,
//           product: product.product_name,
//           price: product.price,
//           specifications: product.specification,
//           image: product.image,
//         });
//       });
//     }
//   });

//   return matchingProducts;
// };

const filterProductsByBrand = (selectedBrands, productsData) => {
  const matchingProducts = [];

  // Iterate through each brand in the JSON data
  productsData.forEach((brandData) => {
    const brand = brandData.brand;

    // Check if the brand matches any of the selected brands
    if (selectedBrands.includes(brand)) {
      // Iterate through products within the brand's price range
      brandData.products.forEach((product) => {
        matchingProducts.push({
          brand,
          priceRange: brandData.price_range,
          product: product.product_name,
          price: product.price,
          specifications: product.specification,
          image: product.image,
        });
      });
    }
  });

  return matchingProducts;
};




// In back.js, define a new route for user-specific products
// app.get('/user-products/:uniqueLink', (req, res) => {
//   const uniqueLink = req.params.uniqueLink;

//   // Find the user in your MongoDB database based on the uniqueLink
//   User.findOne({ uniqueLink })
//     .then((user) => {
//       if (!user) {
//         return res.status(404).send('User not found');
//       }

//       const selectedCategories = user.selectedCategories;
//       const selectedBrands = user.brands;

//       // Use the filterProducts function to get matching products
//       const matchingProducts = filterProducts(
//         selectedCategories,
//         selectedBrands,
//         productData // Pass the productData from JSON
//       );

//       // Debugging: Log user data, selected categories/brands, and matching products
//       console.log('User Data:', user);
//       console.log('Selected Categories:', selectedCategories);
//       console.log('Selected Brands:', selectedBrands);
//       console.log('Matching Products:', matchingProducts);

//       // Render the "products.ejs" view with the matching products
//       res.render('products', { products: matchingProducts });
//     })
//     .catch((error) => {
//       console.error(error);
//       res.status(500).send('Internal Server Error');
//     });
// });

app.get('/user-products/:uniqueLink', (req, res) => {
  const uniqueLink = req.params.uniqueLink;

  // Find the user in your MongoDB database based on the uniqueLink
  User.findOne({ uniqueLink })
    .then((user) => {
      if (!user) {
        return res.status(404).send('User not found');
      }

      const selectedBrands = user.brands; // Get all selected brands

      // Initialize an empty array to store matching products for all selected brands
      const matchingProducts = [];

      // Loop through each selected brand
      selectedBrands.forEach((selectedBrand) => {
        // Use the filterProductsByBrand function to get matching products based on the brand
        const brandProducts = filterProductsByBrand(
          selectedBrand,
          productData // Pass the productData from JSON
        );

        // Add the matching products for this brand to the overall matchingProducts array
        matchingProducts.push(...brandProducts);
      });

      // Debugging: Log user data, selected brands, and matching products
      console.log('User Data:', user);
      console.log('Selected Brands:', selectedBrands);
      console.log('Matching Products:', matchingProducts);

      // Render the "products.ejs" view with the matching products
      res.render('products', { products: matchingProducts });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Internal Server Error');
    });
});




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
