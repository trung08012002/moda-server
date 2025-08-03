const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors()); // Không cần nếu dùng proxy từ frontend

app.get("/api/reverse", async (req, res) => {
  const { lat, lon } = req.query;

  try {
    const response = await axios.get("https://nominatim.openstreetmap.org/reverse", {
      params: {
        format: "json",
        lat,
        lon,
      },
      headers: {
        "User-Agent": "ModaApp/1.0 (hoaitrung.2k2@example.com)",
      },
    });

    res.json(response.data);
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ error: "Reverse geocoding failed" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
