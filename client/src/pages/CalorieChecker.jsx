import { useState } from "react";

function CalorieChecker() {
  const [food, setFood] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const getCalories = async () => {
    if (!food) return;

    setLoading(true);
    setResult("");

    try {
      const res = await fetch("http://localhost:3000/api/calorieChecker/calorieChecker", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ food }),
      });

      const data = await res.json();
      setResult(data.result);
    } catch {
      setResult("Error fetching calories");
    }

    setLoading(false);
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>🍔 Food Calorie Checker</h2>

        <input
          type="text"
          placeholder="  Enter food name"
          value={food}
          onChange={(e) => setFood(e.target.value)}
          style={styles.input}
        />

        <button
          onClick={getCalories}
          style={{
            ...styles.button,
            opacity: loading ? 0.7 : 1,
          }}
          disabled={loading}
        >
          {loading ? "Checking..." : "Get Calories"}
        </button>

        {result && (
          <div style={styles.resultBox}>
            <pre style={styles.result}>{result}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default CalorieChecker;

const YELLOW = "#FFD500";

const styles = {
  page: {
    minHeight: "100vh",
    background: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    width: "100%",
    maxWidth: "420px",
    background: "#fff",
    padding: "30px",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  },

  title: {
    marginBottom: "20px",
    textAlign: "center",
    color: "#000",
    fontWeight: "600",
  },

  input: {
    width: "100%",
    padding: "14px 0px 14px 0px",
    fontSize: "16px",
    borderRadius: "10px",
    border: "2px solid #eee",
    outline: "none",
    marginBottom: "15px",
  },

  button: {
    width: "100%",
    padding: "14px",
    fontSize: "16px",
    fontWeight: "600",
    borderRadius: "10px",
    border: "none",
    background: YELLOW,
    cursor: "pointer",
  },

  resultBox: {
    marginTop: "20px",
    borderRadius: "10px",
    background: "#fff",
    border: `2px solid ${YELLOW}`,
    padding: "12px",
  },

  result: {
    margin: 0,
    whiteSpace: "pre-wrap",
    color: "#000",
    fontSize: "14px",
  },
};