import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL || "https://bulk-mail-app-backend-gf0s.onrender.com";

function App() {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [recipients, setRecipients] = useState("");
  const recipientCount = recipients
    .split(",")
    .map(email => email.trim())
    .filter(Boolean).length;
  const [history, setHistory] = useState([]);
  const [status, setStatus] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);
  const totalCampaigns = history.length;

  const totalRecipients = history.reduce(
    (total, mail) => total + mail.recipients.length, 0
  );

  const fetchHistory = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/mail/history`);
      setHistory(data);
    } catch {
      setStatus({ type: "error", text: "Could not load email history." });
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const sendMail = async (event) => {
    event.preventDefault();
    setStatus({ type: "", text: "" });

    const emailList = [...new Set(
      recipients.split(",").map(email => email.trim().toLowerCase()).filter(Boolean)
    )];

    if (!subject.trim() || !body.trim() || !emailList.length) {
      setStatus({ type: "error", text: "Please fill in all fields." });
      return;
    }

    setLoading(true);

    try {
      const { data } = await axios.post(`${API_URL}/api/mail/send`, {
        subject,
        body,
        recipients: emailList
      });

      setStatus({ type: "success", text: data.message });
      setSubject("");
      setBody("");
      setRecipients("");
      fetchHistory();
    } catch (error) {
      setStatus({
        type: "error",
        text: error.response?.data?.message || "Unable to connect to server."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <header className="topbar">
        <div>
          <div className="brand">✉ BulkMail</div>
          <p>Simple email campaign manager</p>
        </div>
        <div className="badge">MERN Stack</div>
      </header>

      <main className="container">
        <section className="card">
          <div className="section-title">
            <div>
              <h1>Send Bulk Email</h1>
              <p>Compose one message and send it to multiple recipients.</p>
            </div>
          </div>

          <form onSubmit={sendMail}>
            <label>Subject</label>
            <input
              value={subject}
              onChange={e => setSubject(e.target.value)}
              placeholder="Enter email subject"
              maxLength={150}
            />

            <label>Recipient Emails</label>
            <input
              value={recipients}
              onChange={e => setRecipients(e.target.value)}
              placeholder="user1@gmail.com, user2@gmail.com"
            />
            <small>Separate addresses with commas.</small>
            {recipientCount > 0 && (
              <small>
                {recipientCount} recipient{recipientCount > 1 ? "s" : ""} selected
              </small>
            )}

            <label>Email Body</label>
            <textarea
              value={body}
              onChange={e => setBody(e.target.value)}
              placeholder="Write your message..."
              rows="9"
              maxLength={5000}
            />

            {status.text && (
              <div className={`message ${status.type}`}>{status.text}</div>
            )}

            <button disabled={loading}>
              {loading ? "Sending..." : "Send Email →"}
            </button>
          </form>
        </section>

        <section className="card">
          <div className="history-head">
            <div>
              <h2>Email History</h2>
              <p>
                {totalCampaigns} campaign{totalCampaigns !== 1 ? "s" : ""} sent •{" "}
                {totalRecipients} recipient{totalRecipients !== 1 ? "s" : ""}
              </p>
            </div>
            <button className="secondary" onClick={fetchHistory}>↻ Refresh</button>
          </div>

          {history.length === 0 ? (
            <div className="empty">No emails sent yet.</div>
          ) : (
            <div className="history">
              {history.map(mail => (
                <article className="history-row" key={mail._id}>
                  <div>
                    <h3>{mail.subject}</h3>
                    <p>{mail.recipients.join(", ")}</p>
                    <small>{new Date(mail.createdAt).toLocaleString()}</small>
                  </div>
                  <span className={`status ${mail.status.toLowerCase()}`}>
                    {mail.status}
                  </span>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer>BulkMail • React + Express + MongoDB + Nodemailer</footer>
    </div>
  );
}

export default App;