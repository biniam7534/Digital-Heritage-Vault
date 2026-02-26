# 🏛️ Digital Heritage Vault

A premium, immersive digital repository dedicated to the preservation and accessibility of global cultural heritage. Built with a "Historical Modern" aesthetic, the Digital Heritage Vault utilizes next-generation archival technologies to ensure that ancient wisdom and artifacts are preserved for future generations.

---

## ✨ Features

### 🏺 The Great Archive
An interactive discovery hub for exploring the vault's collection.
*   **Real-time Search**: Sieve through thousands of years of history instantly.
*   **Filtered Collections**: Categorized browsing for Artifacts, Documents, and Historical Audio.
*   **Deep Imagery**: High-fidelity visual representation of world treasures.

### 🛠️ Archivist's Workshop
A centralized management system for vault curators.
*   **Digital Ingestion**: Streamlined tools for adding new historical records to the registry.
*   **Registry Management**: Edit, verify, and archive existing assets with a professional interface.
*   **Quick Intake**: Fast-track ingestion for new discoveries.

### 📜 The Digital Legacy
Our mission statement and project background, detailing why we believe technology is the ultimate light for illuminating the stories of old.

### 📊 Vault Analytics
Real-time tracking of historical records, member curator activity, and data integrity metrics.

### 🛡️ Guardian Access
Secure authentication portal for archivists and curators to contribute to the global heritage registry.

---

## 🎨 Design Philosophy

The project features a unique **"Heritage Aesthetic"**:
*   **Typography**: Using `Cinzel` for authoritative historical headings and `Crimson Pro` for elegant body text.
*   **Color Palette**: A deep, rich palette of *Heritage Wood*, *Aged Parchment*, and *Antique Gold*.
*   **Interactivity**: Smooth, depth-based animations powered by **Framer Motion** to create a cinematic user experience.

---

## 🚀 Technical Stack

*   **Frontend**: React 19 + Vite + Framer Motion
*   **Backend**: Node.js + Express + MongoDB (Mongoose)
*   **Styling**: Tailwind CSS v4
*   **API Architecture**: RESTful with centralized configuration

---

## 🛠️ Getting Started

### Prerequisites

*   Node.js (v18 or higher)
*   MongoDB (Atlas or local instance)
*   npm or yarn

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/biniam7534/digital-heritage-vault.git
    cd digital-heritage-vault
    ```

2.  **Setup Backend**:
    ```bash
    cd Backend
    npm install
    # Create a .env file with MONGO_URI and PORT=5000
    npm run data:import  # Seed the database with heritage sites
    npm run dev
    ```

3.  **Setup Frontend**:
    ```bash
    cd ../Frontend
    npm install
    # Create a .env file with VITE_API_URL=http://localhost:5000/api/v1
    npm run dev
    ```

---

## 🚀 Deployment

For detailed instructions on how to deploy the Backend to Render and the Frontend to Vercel/Netlify, please refer to the **[DEPLOYMENT.md](./DEPLOYMENT.md)** file.

---

## 🗺️ Project Structure

*   **/Backend**: Express server, Mongoose models, and heritage API routes.
*   **/Frontend**: React application with Heritage Design System.
    *   **/src/config/api.js**: Centralized API endpoint configuration.
    *   **/public/images**: Local high-resolution heritage site assets.

---

## 🤝 Contributing

We welcome contributions from historians, developers, and designers. Please see our **Contribution Guide** in the `PROJECT_FLOW.md` for more details.

© 2026 Digital Heritage Vault. *Bound by time, preserved by code.*
