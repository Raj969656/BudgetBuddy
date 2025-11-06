BudgetBuddy — Personal Finance Tracker (MERN Stack)

🪙 BudgetBuddy — Personal Finance Tracker (MERN Stack)

Live Demo: https://sweet-duckanoo-b3b3dc.netlify.app/
Frontend: React, Tailwind CSS
Backend: Node.js, Express.js
Database: MongoDB Atlas

📖 Overview
BudgetBuddy is a full-stack personal finance tracking web app built using the MERN (MongoDB, Express, React, Node.js) stack.
It helps users manage income, expenses, and savings in one place with a clean UI and intuitive experience.

Users can register, log in, add transactions, and view their total balance in real time.
Perfect for learning or demonstrating full-stack development skills.

✨ Features
- Authentication: Register & Login using JWT tokens
- Transaction Management: Add, edit, or delete income & expenses
- Dashboard Overview: View total balance, recent transactions, and statistics
- Category Tracking: Organize spending by category (Food, Rent, etc.)
- Date-wise Sorting: See spending patterns over time
- Persistent Storage: Data securely stored on MongoDB Atlas
- Responsive UI: Optimized for desktop and mobile devices

🧩 Tech Stack
Frontend: React.js, Tailwind CSS, Axios
Backend: Node.js, Express.js
Database: MongoDB (Mongoose ORM)
Authentication: JWT + bcrypt
Deployment: Vercel (Frontend), Render (Backend), MongoDB Atlas

⚙️ Installation & Setup

1️⃣ Clone Repositories
Frontend:  https://sweet-duckanoo-b3b3dc.netlify.app/
Backend:  https://budgetbuddy-backend-h5n6.onrender.com

2️⃣ Backend Setup
cd BudgetBuddy-backend
npm install

Create a .env file in the backend root directory with the following:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

Run the backend:
npm start

Server will run at http://localhost:5000

3️⃣ Frontend Setup
cd BudgetBuddy
npm install
npm run dev

Frontend runs by default on http://localhost:5173 (Vite) or http://localhost:3000 (CRA).

🧠 Folder Structure

Frontend
src/
├── components/
├── pages/
├── context/
├── utils/
├── App.js
└── index.js

Backend
src/
├── routes/
├── controllers/
├── models/
├── middleware/
├── config/
└── app.js

🚀 Deployment
Frontend: Deploy on Vercel or Netlify
Backend: Deploy on Render or Railway
Database: Hosted on MongoDB Atlas

📈 Future Improvements
- Add interactive data visualization (Pie/Bar charts)
- Add advanced filtering & sorting
- Integrate expense notes/comments
- Add monthly budget goals
- Export transactions to CSV or PDF

🧑‍💻 Author
Raj Yadav
LinkedIn: https://www.linkedin.com/in/raj-yadav-5b343128a
GitHub: https://github.com/Raj969656

📜 License
This project is licensed under the MIT License — feel free to use, modify, and share!

🌟 Support
If you find this project helpful, consider giving it a ⭐ on GitHub!
Your support motivates further development and improvements.

