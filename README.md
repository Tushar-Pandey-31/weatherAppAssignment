# 🌦️ Weather Dashboard Pro

A modern, high-performance Weather Dashboard built with **React**, **Redux Toolkit**, and **Recharts**. This application provides real-time weather updates, interactive forecast trends, and intelligent data management to ensure a seamless user experience.

## live link
https://weather-app-assignment-alpha.vercel.app/

## 🚀 Key Features

* **Real-time Weather & Search**: Instant weather updates for any city globally using the OpenWeatherMap API.
* **Dynamic Data Visualization**: Interactive temperature trend charts that switch between hourly and daily views.
* **Intelligent Caching (60s Rule)**: Custom Redux middleware logic prevents redundant API calls if data is less than 60 seconds old, optimizing performance and API credit usage.
* **Unit Synchronization**: A global toggle to switch between Metric (°C) and Imperial (°F). The system intelligently bypasses cache when units are toggled to ensure data accuracy.
* **Persistent Favorites**: Save your most-visited cities. Favorites are persisted across browser sessions using `localStorage`.
* **Responsive Design**: A fully responsive CSS Grid layout that adapts from mobile devices to large desktops.

## 🛠️ Tech Stack

* **Core**: React 18 (Vite)
* **State Management**: Redux Toolkit (Slices & Async Thunks)
* **Data Fetching**: Axios
* **Charts**: Recharts
* **Icons**: OpenWeatherMap Weather Conditions
* **Routing**: React Router DOM

## 📦 Installation & Setup

1.  **Clone the Repository**:
    ```bash
    git clone <your-repo-url>
    cd weather-app-assignment
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**:
    Create a `.env` file in the root directory and add your API Key:
    ```env
    VITE_OPENWEATHER_API_KEY=your_api_key_here
    ```

4.  **Run Development Server**:
    ```bash
    npm run dev
    ```

