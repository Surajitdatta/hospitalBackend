const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser")


dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser())


// Routes
const adminRoute = require("./routes/Admin.route");
const appoinmentRoute = require("./routes/Appoinment.route");
const contactRoute = require("./routes/Contact.route");
const departmentRoute = require("./routes/Department.route");
const doctorRoute = require("./routes/Doctor.route");
const jobRoute = require("./routes/Job.route");
const newsEventRoute = require("./routes/newsEvent.route");
const reviewRoute = require("./routes/Review.route");
const userRoute = require("./routes/User.route");
const termsRoute = require("./routes/T&C.route");
const emergency = require("./routes/emergency.route")
const healthPackage = require("./routes/HealthPackage.route")
const insuranceRoutes = require("./routes/Insurance.route");
const ambulance = require("./routes/Ambulance.route")
const review = require("./routes/Review.route")





// Use routes
app.use("/api/admin", adminRoute);
app.use("/api/appoinment", appoinmentRoute);
app.use("/api/contact", contactRoute);
app.use("/api/department", departmentRoute);
app.use("/api/doctor", doctorRoute);
app.use("/api/jobs", jobRoute);
app.use("/api/news-events", newsEventRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/users", userRoute);
app.use("/api/terms", termsRoute)
app.use("/api/emergency", emergency)
app.use("/api/healthpackage", healthPackage )
app.use("/api/insurance", insuranceRoutes);
app.use("/api/ambulance", ambulance)
app.use("/api/review", review)






// Default route
app.get("/", (req, res) => {
  res.send("Hello Hospital !!!");
});

// MongoDB connect and then start server
const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.mongodb_URL;

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("✅ DB Connected successfully!");
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
  });
