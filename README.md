# Full-Stack Coding Challenge

**Deadline**: Sunday, Feb 23th 11:59 pm PST

### Video submission link
[Demo Video](https://drive.google.com/file/d/1KvUeKPNRrH7iiZYz_wWiwZaJZ8e9ZgUi/view?usp=sharing)

### **1.1 Create the Database**
1. Open **PostgreSQL** and run:
   ```sh
   psql -U postgres
2. Run the database script:
    ```sh
    \i backend/database.sql
3. Verify the tables were created:
    ```sh
    \c task_management
    \dt

### **2.1 Start the Backend**
1.  Install dependencies
    ```sh
    cd backend
    npm install
2.  2.2 Configure Environment Variables
    ```sh
    touch .env
3. Add the following content (update credentials as needed):
    ```sh
    DB_USER=postgres
    DB_PASSWORD=6302
    DB_HOST=localhost
    DB_PORT=5432
    DB_NAME=task_management
    JWT_SECRET=supersecret
4. Run backend
    ```sh
    npm install -g nodemon
    nodemon index.js
### **2.1 Start the Frontend**
1.  Install dependencies
    ```sh
    cd ../frontend
    npm install
2.  Run the frontend
    ```sh
    npm start


## **Salary Expectations**

$2,240 - $2,400 monthly ($28-$30/hr)