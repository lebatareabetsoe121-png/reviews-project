import express from "express";
import cors from "cors";
import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config(); // Load .env variables

// Build Firebase credentials from environment variables
const serviceAccount = {
  type: process.env.TYPE,
  project_id: process.env.PROJECT_ID,
  private_key_id: process.env.PRIVATE_KEY_ID,
  private_key: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'), // Important!
  client_email: process.env.CLIENT_EMAIL,
  client_id: process.env.CLIENT_ID,
  auth_uri: process.env.AUTH_URI,
  token_uri: process.env.TOKEN_URI,
  auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
  universe_domain: process.env.UNIVERSE_DOMAIN,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const app = express();
app.use(cors());
app.use(express.json());

// Get all restaurants
app.get("/resturants", async (req, res) => {
  try {
    const snapshot = await db.collection("resturants").get();
    const resturants = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.json(resturants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get reviews by restaurant
app.get("/reviews/:resturantid", async (req, res) => {
  const { resturantid } = req.params;
  try {
    const snapshot = await db
      .collection("reviews")
      .where("resturantid", "==", resturantid)
      .get();
    const reviews = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get reviews by username
app.get("/reviews/user/:username", async (req, res) => {
  const { username } = req.params;
  try {
    const snapshot = await db
      .collection("reviews")
      .where("username", "==", username)
      .get();

    const reviews = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a new review
app.post("/reviews", async (req, res) => {
  try {
    const { resturantid, username, rating, comment } = req.body;
    const newReview = {
      resturantid,
      username,
      rating,
      comment,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };
    const docRef = await db.collection("reviews").add(newReview);
    res.json({ id: docRef.id, ...newReview });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update review
app.put("/reviews/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;
    await db.collection("reviews").doc(id).update({ rating, comment });
    res.json({ message: "Review updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete review
app.delete("/reviews/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection("reviews").doc(id).delete();
    res.json({ message: "Review deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running at http://localhost:${PORT}`);
});