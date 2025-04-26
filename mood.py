from flask import Flask, request, jsonify, render_template
import pandas as pd
import matplotlib.pyplot as plt
from io import BytesIO
import base64
from sklearn.linear_model import LinearRegression

app = Flask(__name__)

# In a real application, you'd use a database
data = []

@app.route('/record_mood', methods=['POST'])
def record_mood():
    mood_data = request.get_json()
    data.append(mood_data)
    print("Received mood data:", mood_data)  # For debugging
    return jsonify({"status": "success"}), 200

@app.route('/mood_analysis')
def mood_analysis():
    if not data:
        return "No data available yet.", 200

    df = pd.DataFrame(data)
    df['mood_change'] = df['mood_after'] - df['mood_before']

    # Visualization (simplified - in-memory plot)
    plt.figure(figsize=(8, 6))
    plt.hist(df['mood_change'], bins=5, edgecolor='black')
    plt.xlabel('Mood Change')
    plt.ylabel('Frequency')
    plt.title('Distribution of Mood Changes')
    buffer = BytesIO()
    plt.savefig(buffer, format='png')
    buffer.seek(0)
    plot_data = base64.b64encode(buffer.read()).decode('utf-8')
    plt.close()

    # Simple Regression (Example)
    model = LinearRegression()
    model.fit(df[['mood_before']], df[['mood_change']])
    regression_score = model.score(df[['mood_before']], df[['mood_change']])

    return render_template('analysis.html', plot_data=plot_data, regression_score=regression_score)

if __name__ == '__main__':
    app.run(debug=True)
