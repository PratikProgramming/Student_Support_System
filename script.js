// Unique Feature: Real-time sentiment analysis using Aylien API
async function analyzeSentiment(text) {
    const response = await fetch('/analyze-sentiment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: text })
    });
    return await response.json();
}

document.getElementById('feedbackForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const feedbackText = document.getElementById('feedbackText').value;
    const sentiment = await analyzeSentiment(feedbackText);
    
    // Add sentiment class to feedback card
    const card = document.createElement('div');
    card.className = `card mb-3 sentiment-${sentiment.polarity}`;
    
    // Submit feedback to Oracle DB
    const response = await fetch('/submit-feedback', {
        method: 'POST',
        body: new FormData(e.target)
    });
    
    if(response.ok) {
        showToast('Feedback submitted successfully!');
    }
});

// Dynamic content loading
const loadContent = async (page) => {
    const response = await fetch(`/${page}`);
    document.getElementById('contentArea').innerHTML = await response.text();
};