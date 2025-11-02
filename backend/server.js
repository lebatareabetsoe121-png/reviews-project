const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const app = express();
app.use(cors());
app.use(express.json()); 


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

app.put("/reviews/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;
    await db.collection("reviews").doc(id).update({
      rating,
      comment,
    });
    res.json({ message: "Review updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/reviews/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection("reviews").doc(id).delete();
    res.json({ message: "Review deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend server running at http://localhost:${PORT}`);
});
