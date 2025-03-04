const express = require('express');
const oracledb = require('oracledb');
const app = express();
const PORT = 3000;

// Oracle DB Configuration
const dbConfig = {
    user: 'system',
    password: 'your_password',
    connectString: 'localhost:1521/orcl'
};

// Unique Feature: Sentiment Analysis Route
app.post('/analyze-sentiment', async (req, res) => {
    // Integration with Aylien API or ML model
    const { text } = req.body;
    // Implement actual sentiment analysis here
    const polarity = Math.random() > 0.5 ? 'positive' : 'negative';
    res.json({ polarity, confidence: Math.random() });
});

// Feedback Submission
app.post('/submit-feedback', async (req, res) => {
    let connection;
    try {
        connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute(
            `INSERT INTO feedback 
            (user_id, feedback_text, sentiment, rating)
            VALUES (:userId, :text, :sentiment, :rating)`,
            {
                userId: req.body.userId,
                text: req.body.feedbackText,
                sentiment: req.body.sentiment,
                rating: req.body.rating
            }
        );
        await connection.commit();
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});