import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authController from './controllers/authController.js';
import propertyController from './controllers/propertyController.js';
import uploadController from './controllers/uploadController.js';
import users from './models/users.js';
import User from './models/User.js';
import Property from './models/Property.js';

import MongoStore from "connect-mongo";
import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import * as AdminJSMongoose from "@adminjs/mongoose";


const app = express();
const uri = process.env.MONGO_URI;
const PORT = process.env.PORT || 8000;
app.use(cors());
app.use(express.json());
dotenv.config();





// db connecting

    mongoose.set('strictQuery', false)
    mongoose.connect(process.env.MONGO_URL, () => console.log("Db is connected"));










// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/images', express.static('public/images'))

app.use("/auth", authController);
app.use("/property", propertyController);
app.use('/upload', uploadController)


//admin display

// AdminJS.registerAdapter({
//     Resource: AdminJSMongoose.Resource,
//     Database: AdminJSMongoose.Database,
//   });
  
//   const AdminJSOptions = {
//     resources: [
//       {
//         resource: Property,
//         options: {
//             properties: {
//                 title : {
//                     isVisible: {
//                         list: true,
//                         filter: true,
//                         show: true,
//                         edit: true
//                     }
//                 },
//                 type : {
//                     isVisible: {
//                         list: true,
//                         filter: true,
//                         show: true,
//                         edit: true
//                     }
//                 },
//                 featured : {
//                     isVisible: {
//                         list: true,
//                         filter: true,
//                         show: true,
//                         edit: true
//                     }
//                 },
//             }
//         }
//       },
//       {
//         resource: users,
//         options: {
//           properties: {
//             encryptedPassword: {
//               isVisible: false,
//               show: false,
//               edit: false,
//               filter: false,
//               list: false,
//             },
//           },
  
//           actions: {
//             new: {
//               before: async (request) => {
//                 if (request.payload?.password) {
//                   request.payload.password = hash(request.payload.password);
//                 }
//                 return request;
//               },
//             },
//             show: {
//               after: async (response) => {
//                 response.record.params.password = "";
//                 return response;
//               },
//             },
//             edit: {
//               before: async (request) => {
//                 // no need to hash on GET requests, we'll remove passwords there anyway
//                 if (request.method === "post") {
//                   // hash only if password is present, delete otherwise
//                   // so we don't overwrite it
//                   if (request.payload?.password) {
//                     request.payload.password = hash(request.payload.password);
//                   } else {
//                     delete request.payload?.password;
//                   }
//                 }
//                 return request;
//               },
//               after: async (response) => {
//                 response.record.params.password = "";
//                 return response;
//               },
//             },
//             list: {
//               after: async (response) => {
//                 response.records.forEach((record) => {
//                   record.params.password = "";
//                 });
//                 return response;
//               },
//             },
//           },
//         },
//       },
//     ],
//   };
  







// admin panel

// const start = async () => {
//     const app = express()
  
//     const admin = new AdminJS({
//         ...AdminJSOptions,
//         rootPath: "/admin",
//     })

  
//     const adminRouter = AdminJSExpress.buildRouter(admin)
//     app.use(admin.options.rootPath, adminRouter)
   
  
//     app.listen(PORT, () => {
//       console.log(`AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`)
//     })

//   };







// starting server

// start();
AdminJS.registerAdapter(AdminJSMongoose);

// Pass configuration settings  and models to AdminJS
const adminJS = new AdminJS({
    rootPath: "/admin",
    branding: {
      companyName: "Team84",
      //logo: ,
      logo: false,
      softwareBrothers: false,
    },
  resources: [Property, User],
  rootPath: '/admin'
});
// Build and use a router which will handle all AdminJS routes
const router = AdminJSExpress.buildRouter(adminJS);
app.use(adminJS.options.rootPath, router);


const port = process.env.PORT || 8000;
app.listen(port, () => console.log(" server is running on port " + port));