# 🏏 Cricket Board 
**A Comprehensive Cricket Information Application**  

Manage cricket matches, players, teams, and series effortlessly with the **Cricket Dashboard Application**. This Node.js-based application integrates MongoDB and Express.js to provide a seamless experience for cricket enthusiasts, coaches, and analysts.  

---

## 🚀 Features  
- **Dynamic Dashboard**: View and manage cricket series, teams, players, and scoreboards.  
- **Player and Team Management**: Add, update, and retrieve details for players and teams.  
- **Scoreboard Updates**: Manage and display scoreboards in real-time.  
- **Advanced Search**: Search for players with ease.  
- **Series Insights**: Access details about cricket series and tournaments.  
- **Responsive Views**: Interactive EJS templates for a smooth user experience.  

---

## 🛠️ Tech Stack  
- **Node.js**: Application runtime.  
- **Express.js**: Backend framework.  
- **MongoDB**: NoSQL database for storing data.  
- **EJS**: Template engine for dynamic views.  
- **Body-Parser**: Middleware for parsing incoming request bodies.  
- **Mongoose**: MongoDB object modeling for Node.js.  

---

## 📂 Project Structure (MVC Architecture)  
The project follows the **Model-View-Controller (MVC)** design pattern for better modularity and maintainability:  
```plaintext
cricket_dashboard_application/
├── controllers/           # Handles business logic and request processing  
│   ├── homeController.js         # Home-related logic  
│   ├── playerController.js       # Player management  
│   ├── scoreBoardController.js   # Scoreboard updates and retrieval  
│   ├── searchPlayerController.js # Advanced player search  
│   ├── seriesController.js       # Cricket series management  
│   └── teamsController.js        # Team-related functionality  
├── models/                # Defines MongoDB schemas and models  
│   ├── playersModel.js          # Schema for players  
│   ├── scoreModel.js            # Schema for scoreboards  
│   ├── seriesModel.js           # Schema for cricket series  
│   └── teamsModel.js            # Schema for teams  
├── routes/                # Defines application routes  
│   ├── home.js                  # Routes for home dashboard  
│   ├── player.js                # Routes for player operations  
│   ├── scoreBoard.js            # Routes for scoreboard updates  
│   ├── searchPlayer.js          # Routes for player search  
│   ├── seriesInfo.js            # Routes for series operations  
│   └── teams.js                 # Routes for team operations  
├── views/                 # EJS templates for rendering pages  
│   ├── home.ejs                 # Home dashboard  
│   ├── player.ejs               # Player management view  
│   ├── scoreBoard.ejs           # Scoreboard management view  
│   ├── searchPlayer.ejs         # Player search page  
│   └── seriesInfo.ejs           # Cricket series page  
├── public/                # Static files (images, styles, scripts)  
├── app.js                 # Main application file  
├── package.json           # Project metadata and dependencies  
├── .env                   # Environment variables for configuration  
```

## 🌐 Routes  
Here’s an overview of the routes available in the application:  

### Home  
- `GET /`: Displays recent events.  
- `GET /info`: Retrieves detailed information about recent events.  

### Player  
- `GET /player/:playerName`: Retrieves details for a specific player.  
- `POST /store`: Inserts player details.  

### Scoreboard  
- `GET /`: Displays the scoreboard.  
- `GET /store-score`: Stores a new scoreboard.  
- `GET /info`: Retrieves scoreboard details.  

### Player Search  
- `GET /players/search`: Renders the search player page.  
- `POST /players/search`: Processes the player search query.  

### Series  
- `GET /`: Retrieves series details.  
- `GET /store-series`: Stores new series data.  
- `GET /info`: Fetches series information.  

### Teams  
- `GET /`: Displays team details.  
- `POST /store`: Inserts team details.  

---

## 📋 Prerequisites  
1. **Node.js**: Install the latest version from the [Node.js official site](https://nodejs.org/).  
2. **MongoDB**: Ensure MongoDB is installed and running on your machine.  
3. **Dependencies**: Install the required packages using the following command:  
   ```bash
   npm install
   
## 🌟 Getting Started  
1. Clone the repository:  
   ```bash
   git clone https://github.com/your-username/cricket-dashboard-application.git
   cd cricket-dashboard-application
2. Set Up Environment Variables
   ```bash

   PORT=3000
   MONGO_DB_URL=your_mongodb_connection_url

3. Start the Application
   ```bash
   npm start
