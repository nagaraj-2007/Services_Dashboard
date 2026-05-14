# Database Schema - Services Dashboard

This document outlines the MySQL table structures required for the Services Dashboard project. You can run these SQL commands in your Hostinger phpMyAdmin or MySQL terminal.

## 1. Employees Table
Stores staff details, roles, and project assignments.

```sql
CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    role ENUM('Super Admin', 'Manager', 'Employee') DEFAULT 'Employee',
    dept VARCHAR(50),
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(20),
    assigned_project VARCHAR(100),
    status ENUM('Present', 'Absent', 'Late', 'On Leave') DEFAULT 'Present',
    join_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 2. Clients Table
Manages client company information.

```sql
CREATE TABLE clients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    client_name VARCHAR(150) NOT NULL,
    industry VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(20),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 3. Applications Table
Tracks software products/apps associated with clients.

```sql
CREATE TABLE applications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    client_id INT,
    app_name VARCHAR(150) NOT NULL,
    platform ENUM('Android / iOS', 'Android', 'iOS', 'Web') DEFAULT 'Android / iOS',
    delivery_timeline VARCHAR(100),
    description TEXT,
    status ENUM('Development', 'Staging', 'Production', 'Maintenance') DEFAULT 'Development',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE SET NULL
);
```

## 4. Financial Ledger Table
Stores revenue and maintenance cost data for the "Accounts" page.

```sql
CREATE TABLE financial_ledger (
    id INT AUTO_INCREMENT PRIMARY KEY,
    app_id INT,
    revenue DECIMAL(15, 2) DEFAULT 0.00,
    maintenance_cost DECIMAL(15, 2) DEFAULT 0.00,
    billing_period VARCHAR(50), -- e.g., 'Q1 2026', 'March 2026'
    transaction_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (app_id) REFERENCES applications(id) ON DELETE CASCADE
);
```


## 6. Admin Users Table
For dashboard authentication.

```sql
CREATE TABLE admin_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    role VARCHAR(20) DEFAULT 'Admin',
    last_login TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 7. Notifications Table
Stores system alerts, crashes, and broadcast messages.

```sql
CREATE TABLE notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type ENUM('CRASH', 'UPDATE', 'USER', 'ALERT', 'BROADCAST') NOT NULL,
    title VARCHAR(150) NOT NULL,
    message TEXT,
    severity ENUM('info', 'warning', 'danger', 'success') DEFAULT 'info',
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 8. Announcements Table
Tracks sent email broadcasts and announcements.

```sql
CREATE TABLE announcements (
    id INT AUTO_INCREMENT PRIMARY KEY,
    subject VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    recipient_type ENUM('all_employees', 'all_clients', 'specific') DEFAULT 'all_employees',
    specific_recipient VARCHAR(100) NULL, -- Stores name or ID of specific person
    sent_by INT, -- Admin user ID
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sent_by) REFERENCES admin_users(id) ON DELETE SET NULL
);
```

---

### Setup Instructions for Hostinger:
1.  **Login** to your Hostinger Control Panel.
2.  Go to **Databases** -> **phpMyAdmin**.
3.  Select your database and click the **SQL** tab.
4.  Copy and paste the code above and click **Go**.
