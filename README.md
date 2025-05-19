# 🏠 StayEase – Hotel/ Home Booking Platform

StayEase is a full-stack web application that allows users to discover, book, and manage hotels and homes. Guests can browse property details, add listings to their favourites, and book stays with custom dates and times. Hosts can sign up, list their properties, and manage bookings made by guests.

## 🚀 Features

### 👤 Guest Users
- 🔍 Browse available homes and hotels with full details  
- ❤️ Add homes to favourites  
- 🗓️ Book any available home/hotel with desired date and time  
- 🔐 Login and signup functionality  

### 🏡 Host Users
- 📝 Sign up as a host  
- 🏠 Add property listings with descriptions, location, and availability  
- 📋 View bookings made by guests on their listed properties  

## 🛠️ Tech Stack

- **Frontend:** HTML, CSS, JavaScript  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (with Mongoose ODM)  
- **Session Management:** connect-mongodb-session  
- **Deployment:** Render  



## 🔧 Installation & Setup

1. **Clone the repo:**
   ```bash
   git clone https://github.com/haribharadwaj3/StayEase.git
   cd StayEase
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Add `.env` file:**
   ```
   MONGO_URI=your_mongodb_connection_string
   ```

4. **Run locally:**
   ```bash
   node app.js
   ```


## 🧠 Future Enhancements

- Email confirmations for bookings  
- Rating & reviews for hosts and properties  
- Payment gateway integration (Razorpay/Stripe)  
- Google Maps for location previews  

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change or improve.


