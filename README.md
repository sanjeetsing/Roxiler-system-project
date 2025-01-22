# Roxiller Project

This project is a full-stack MERN application that integrates a backend API with a React frontend to display and analyze transaction data. The backend serves the React build files and provides APIs to fetch transaction details, statistics, bar chart data, and pie chart data. The frontend displays these details in an interactive user interface.

---

## Features

### Backend
- Fetch and seed transaction data from a third-party API.
- List transactions with search and pagination.
- Fetch statistics for total sales, sold items, and unsold items for a specific month.
- Provide bar chart data for transaction price ranges.
- Provide pie chart data for transaction categories.
- Serve the React frontend build files.

### Frontend
- Dropdown to select a month (January to December, default is March).
- Search bar to filter transactions by title, description, or price.
- Paginated table to display transactions.
- Statistics section for total sales, sold items, and unsold items.
- Bar chart to display price ranges.
- Pie chart to display category distribution.

---

## Technologies Used

### Backend
- **Node.js**: Runtime environment.
- **Express**: Framework for building APIs and serving frontend files.
- **MongoDB**: Database to store transaction data.
- **Mongoose**: ODM for MongoDB.
- **dotenv**: For environment variable management.
- **axios**: For fetching third-party API data.
- **cors**: To handle cross-origin requests.

### Frontend
- **React**: Frontend framework.
- **Recharts**: For visualizing data as bar and pie charts.
- **Axios**: For making API requests.
- **CSS**: For styling.

---

## Installation and Setup

### Prerequisites
- Node.js installed.
- MongoDB installed locally or hosted on a service like MongoDB Atlas.
- Vercel account for deployment.

### Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` directory with the following variables:
   ```env
   PORT=5000
   MONGO_URI="mongodb://127.0.0.1:27017/mern-stack"
   ```
4. Start the backend server locally:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build the React app:
   ```bash
   npm run build
   ```
4. Move the `build/` folder to the `backend` directory if merging frontend and backend.

---



### Deploy Frontend Separately (Optional)
1. If you want to deploy the frontend separately, build the React app:
   ```bash
   npm run build
   ```
2. Drag and drop the `build/` folder into Vercel.
3. Set the `REACT_APP_API_URL` in the frontend `.env` file to the deployed backend URL before building:
   ```env
   REACT_APP_API_URL=https://your-backend-url.vercel.app/api
   ```
4. Deploy the frontend.

---

## Running the Project Locally
1. Start the backend server:
   ```bash
   cd backend
   npm start
   ```
2. Open a browser and visit:
   ```
   http://localhost:5000
   ```

---

## API Endpoints

### `/api/initialize`
- Method: `GET`
- Initializes the database by fetching and seeding data from the third-party API.

### `/api/transactions`
- Method: `GET`
- Query Parameters:
  - `month`: Month for filtering transactions (e.g., "March").
  - `page`: Page number for pagination (default: 1).
  - `perPage`: Items per page (default: 10).
  - `search`: Search text for filtering transactions.

### `/api/statistics`
- Method: `GET`
- Query Parameters:
  - `month`: Month for fetching statistics.

### `/api/bar-chart`
- Method: `GET`
- Query Parameters:
  - `month`: Month for fetching price range data.

### `/api/pie-chart`
- Method: `GET`
- Query Parameters:
  - `month`: Month for fetching category data.

---

## Folder Structure

### Backend
```
backend/
├── controllers/
│   └── productController.js
├── models/
│   └── Product.js
├── routes/
│   └── index.js
├── build/                  # React frontend build files
├── server.js
├── package.json
├── .env
```

### Frontend
```
frontend/
├── src/
│   ├── components/
│   │   ├── BarChartComponent.js
│   │   ├── PieChartComponent.js
│   │   └── StatisticsBox.js
│   ├── pages/
│   │   └── Dashboard.js
│   ├── services/
│   │   └── api.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
├── public/
│   ├── index.html
│   ├── favicon.ico
```

---

## Troubleshooting

### Common Issues
1. **MongoDB Connection Error**:
   - Ensure MongoDB is running locally or the connection string in `.env` is correct.
2. **CORS Errors**:
   - Verify the `cors` middleware is correctly configured in `server.js`.
3. **Frontend Not Loading**:
   - Check if the `build/` folder is correctly placed in the backend directory or deployed separately on Vercel.

For additional support, please contact the project maintainer.

