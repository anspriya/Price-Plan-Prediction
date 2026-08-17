import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

import useCustomer from "../hooks/useCustomer";
import "../styles/customer.css";

const COLORS = ["#6d45e8", "#3478f6", "#45b96b", "#f3b63f", "#e96fb0"];

function Icon({ type }) {
  const icons = {
    dashboard: <span>⌂</span>,
    usage: <span>▥</span>,
    recommendation: <span>✦</span>,
    plans: <span>▣</span>,
    compare: <span>⇄</span>,
    profile: <span>♙</span>,
    support: <span>◉</span>,
    settings: <span>⚙</span>,
    logout: <span>↪</span>,
    bell: <span>♢</span>,
    menu: <span>☰</span>,
    close: <span>×</span>,
    send: <span>➤</span>,
  };
  return <span className="nav-icon">{icons[type] || "•"}</span>;
}

function getNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
}

function UsageCard({ icon, label, value, color, max }) {
  const percentage = max > 0 ? Math.min((value / max) * 100, 100) : 0;

  return (
    <div className="usage-row">
      <div className="usage-row-icon" style={{ background: `${color}18`, color }}>
        {icon}
      </div>
      <div className="usage-row-content">
        <div className="usage-row-title">
          <span>{label}</span>
          <strong>{value.toFixed(1)} mins</strong>
        </div>
        <div className="usage-progress">
          <span style={{ width: `${percentage}%`, background: color }} />
        </div>
      </div>
    </div>
  );
}

function UsageDistribution({ usage }) {
  const data = useMemo(
    () => [
      { name: "Day", value: getNumber(usage?.total_day_minutes) },
      { name: "Evening", value: getNumber(usage?.total_evening_minutes) },
      { name: "Night", value: getNumber(usage?.total_night_minutes) },
      { name: "International", value: getNumber(usage?.total_intl_minutes) },
    ],
    [usage]
  );

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="chart-card">
      <div className="card-title-row">
        <div>
          <h3>Usage Distribution</h3>
          <p>Calling minutes this month</p>
        </div>
      </div>

      <div className="donut-wrap">
        <ResponsiveContainer width="100%" height={230}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={62}
              outerRadius={92}
              paddingAngle={2}
            >
              {data.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`${Number(value).toFixed(1)} mins`, "Usage"]} />
          </PieChart>
        </ResponsiveContainer>

        <div className="donut-center">
          <strong>{total.toFixed(0)}</strong>
          <span>Total Minutes</span>
        </div>
      </div>

      <div className="chart-legend">
        {data.map((item, index) => {
          const percentage = total ? ((item.value / total) * 100).toFixed(0) : 0;
          return (
            <div className="legend-item" key={item.name}>
              <span className="legend-left">
                <i style={{ background: COLORS[index] }} />
                {item.name}
              </span>
              <strong>{percentage}%</strong>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CustomerSegment({ usage }) {
  const intl = getNumber(usage?.total_intl_minutes);
  const day = getNumber(usage?.total_day_minutes);
  const evening = getNumber(usage?.total_evening_minutes);

  let title = "Moderate Voice User";
  let description =
    "You have balanced calling activity across Day and Evening with relatively low international usage.";

  if (day + evening > 500) {
    title = "High Voice User";
    description =
      "Your calling activity is high. A plan with larger Day and Evening allowances may provide better value.";
  } else if (intl > 40) {
    title = "International User";
    description =
      "Your international calling is significant. Consider plans with a higher international allowance.";
  }

  return (
    <div className="segment-card">
      <div className="segment-header">
        <div className="segment-icon">♟</div>
        <div>
          <h3>{title}</h3>
          <span>You belong to a personalized usage segment</span>
        </div>
      </div>

      <p>{description}</p>
      <button className="text-link" type="button">
        Learn more about your segment →
      </button>

      <div className="segment-visual">
        <div className="segment-bars">
          <span style={{ height: "38%" }} />
          <span style={{ height: "72%" }} />
          <span style={{ height: "52%" }} />
          <span style={{ height: "88%" }} />
          <span style={{ height: "62%" }} />
        </div>
        <div className="segment-circle">%</div>
      </div>
    </div>
  );
}

function PlanCard({ plan, price, badge, accent, features, recommended }) {
  return (
    <div className={`plan-card ${recommended ? "recommended" : ""}`} style={{ "--plan-accent": accent }}>
      {badge && <span className="plan-badge">{badge}</span>}

      <div className="plan-card-top">
        <div>
          <h3>{plan}</h3>
          <div className="plan-price">
            ₹{price}<small>/month</small>
          </div>
        </div>
        <div className="medal">{recommended ? "🥇" : "◉"}</div>
      </div>

      <div className="plan-features">
        {features.map((feature) => (
          <div key={feature}>✓ {feature}</div>
        ))}
      </div>

      <div className="plan-cost">
        <span>Est. Monthly Cost</span>
        <strong>₹{price}</strong>
      </div>

      <button className="plan-button" type="button">
        View Details
      </button>
    </div>
  );
}

function Assistant({ open, onClose }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hi there! 👋 I'm your Tariff Assistant. I can help you with plan explanations, comparisons, usage questions and saving tips.",
    },
  ]);

  const sendMessage = () => {
    const value = message.trim();
    if (!value) return;

    setMessages((current) => [
      ...current,
      { from: "user", text: value },
      {
        from: "bot",
        text: "Thanks! I can help you compare plans based on your current usage. Try asking about a plan or your monthly savings.",
      },
    ]);
    setMessage("");
  };

  if (!open) return null;

  return (
    <aside className="assistant-panel">
      <div className="assistant-head">
        <div className="assistant-title">
          <div className="assistant-avatar">🤖</div>
          <div>
            <h3>Tariff Assistant</h3>
            <span><i /> Online</span>
          </div>
        </div>
        <button className="icon-button" onClick={onClose} type="button">
          <Icon type="close" />
        </button>
      </div>

      <div className="assistant-messages">
        {messages.map((item, index) => (
          <div key={index} className={`message ${item.from}`}>
            {item.text}
          </div>
        ))}

        <div className="assistant-suggestions">
          <button type="button" onClick={() => setMessage("Explain the Saver Plus plan")}>
            Explain a plan
          </button>
          <button type="button" onClick={() => setMessage("Compare plans")}>
            Compare plans
          </button>
          <button type="button" onClick={() => setMessage("How can I save more?")}>
            Saving tips
          </button>
        </div>
      </div>

      <div className="assistant-input">
        <input
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") sendMessage();
          }}
          placeholder="Type your message..."
        />
        <button type="button" onClick={sendMessage}>
          <Icon type="send" />
        </button>
      </div>
    </aside>
  );
}

function CustomerDashboard() {
  const navigate = useNavigate();

  const savedNumber = localStorage.getItem("customerNumber") || "";
  const [customerNumber, setCustomerNumber] = useState(savedNumber);
  const [searchNumber, setSearchNumber] = useState(savedNumber);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState("dashboard");

  const { customer, usage, loading, error } = useCustomer(searchNumber);

  const usageData = useMemo(
    () => ({
      day: getNumber(usage?.total_day_minutes),
      evening: getNumber(usage?.total_evening_minutes),
      night: getNumber(usage?.total_night_minutes),
      international: getNumber(usage?.total_intl_minutes),
    }),
    [usage]
  );

  const totalUsage =
    usageData.day +
    usageData.evening +
    usageData.night +
    usageData.international;

  const totalCalls =
    getNumber(usage?.total_day_calls) +
    getNumber(usage?.total_evening_calls) +
    getNumber(usage?.total_night_calls) +
    getNumber(usage?.total_intl_calls);

  const monthlyCost = totalUsage > 500 ? 487.6 : totalUsage > 350 ? 399 : 299;
  const potentialSavings = monthlyCost > 350 ? 162.4 : 96.5;

  const handleSearch = (event) => {
    event.preventDefault();
    const number = customerNumber.trim();

    if (!number) {
      alert("Please enter a customer number");
      return;
    }

    localStorage.setItem("customerNumber", number);
    setSearchNumber(number);
  };

  const handleLogout = () => {
    localStorage.removeItem("customerNumber");
    navigate("/customer-login");
  };

  const scrollTo = (id, menu) => {
    setActiveMenu(menu);
    setSidebarOpen(false);

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const customerId = customer?.phone_number || customerNumber || "CUST-1023";
  const plan = customer?.plan || "No Active Plan";

  if (loading) {
    return (
      <div className="tariff-loading">
        <div className="loading-logo">Tariff<span>Smart</span></div>
        <div className="loading-spinner" />
        <h2>Loading your dashboard...</h2>
        <p>Fetching your usage and personalized plan recommendations.</p>
      </div>
    );
  }

  return (
    <div className="tariff-app">
      {sidebarOpen && (
        <div className="mobile-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={`tariff-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="brand">
          <div className="brand-mark">⌁</div>
          <div>
            <strong>TariffSmart</strong>
            <span>Smart Plans. Maximum Savings.</span>
          </div>
        </div>

        <nav className="side-nav">
          <button
            className={activeMenu === "dashboard" ? "active" : ""}
            onClick={() => scrollTo("dashboard", "dashboard")}
            type="button"
          >
            <Icon type="dashboard" /> Dashboard
          </button>

          <button
            className={activeMenu === "usage" ? "active" : ""}
            onClick={() => scrollTo("usage", "usage")}
            type="button"
          >
            <Icon type="usage" /> My Usage
          </button>

          <button
            className={activeMenu === "recommendation" ? "active" : ""}
            onClick={() => scrollTo("recommendations", "recommendation")}
            type="button"
          >
            <Icon type="recommendation" /> My Plan Recommendation
          </button>

          <button type="button" onClick={() => scrollTo("recommendations", "plans")}>
            <Icon type="plans" /> All Plans
          </button>

          <button type="button" onClick={() => scrollTo("recommendations", "compare")}>
            <Icon type="compare" /> Plan Comparison
          </button>

          <button type="button" onClick={() => scrollTo("customer-profile", "profile")}>
            <Icon type="profile" /> My Profile
          </button>

          <button type="button" onClick={() => setAssistantOpen(true)}>
            <Icon type="support" /> Support / Chatbot
          </button>

          <button type="button">
            <Icon type="settings" /> Settings
          </button>

          <button className="logout-side" type="button" onClick={handleLogout}>
            <Icon type="logout" /> Logout
          </button>
        </nav>

        <div className="refer-card">
          <h3>Refer & Earn</h3>
          <p>Refer a friend and get ₹100 cashback!</p>
          <button type="button">Refer Now</button>
          <div className="refer-art">🎁</div>
        </div>
      </aside>

      <main className="tariff-main">
        <header className="top-header" id="dashboard">
          <button
            className="mobile-menu"
            type="button"
            onClick={() => setSidebarOpen(true)}
          >
            <Icon type="menu" />
          </button>

          <div className="welcome">
            <h1>Welcome back, {customer?.name || "Customer"} 👋</h1>
            <p>Here's your usage summary and the best plans for you.</p>
          </div>

          <div className="header-actions">
            <button className="notification-button" type="button">
              🔔 <b>3</b>
            </button>

            <div className="profile-mini" id="customer-profile">
              <div className="profile-avatar">👤</div>
              <div>
                <strong>{customerId}</strong>
                <span>{customer?.phone_number || customerNumber || "9876543210"}</span>
              </div>
              <span>⌄</span>
            </div>
          </div>
        </header>

        <div className="page-body">
          <form className="customer-search" onSubmit={handleSearch}>
            <span>🔎</span>
            <input
              value={customerNumber}
              onChange={(event) => setCustomerNumber(event.target.value)}
              placeholder="Enter customer number"
            />
            <button type="submit">Search</button>
          </form>

          {error && (
            <div className="error-box">
              <strong>Unable to load customer data.</strong> {error}
            </div>
          )}

          <section className="stat-grid">
            <div className="stat-card">
              <div className="stat-icon purple">👤</div>
              <div>
                <span>Customer ID</span>
                <strong>{customerId}</strong>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon blue">▣</div>
              <div>
                <span>Current Plan</span>
                <strong className={plan === "No Active Plan" ? "red-text" : ""}>{plan}</strong>
                <small>{plan === "No Active Plan" ? "Choose a plan to start saving" : "Active plan"}</small>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon green">$</div>
              <div>
                <span>Est. Monthly Cost</span>
                <strong>₹{monthlyCost.toFixed(2)}</strong>
                <small>Based on your usage</small>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon yellow">♨</div>
              <div>
                <span>Potential Savings</span>
                <strong>₹{potentialSavings.toFixed(2)}</strong>
                <small>Per month</small>
              </div>
            </div>
          </section>

          <section className="dashboard-grid">
            <div className="usage-card large" id="usage">
              <div className="section-head">
                <div>
                  <h2>Your Usage Summary <small>(This Month)</small></h2>
                </div>
                <span className="mini-label">{totalCalls} calls</span>
              </div>

              <UsageCard icon="☀️" label="Day Minutes (6AM - 6PM)" value={usageData.day} color="#6d45e8" max={300} />
              <UsageCard icon="🌇" label="Evening Minutes (6PM - 12AM)" value={usageData.evening} color="#3478f6" max={500} />
              <UsageCard icon="🌙" label="Night Minutes (12AM - 6AM)" value={usageData.night} color="#45b96b" max={300} />
              <UsageCard icon="🌐" label="International Minutes" value={usageData.international} color="#f3b63f" max={50} />
              <UsageCard icon="💬" label="Voice Mail" value={getNumber(usage?.voice_mail_messages || 0)} color="#e96fb0" max={50} />

              <div className="usage-total-note">
                ⓘ Your total usage is <strong>{totalUsage.toFixed(1)} minutes</strong>.
              </div>
            </div>

            <UsageDistribution usage={usage} />

            <CustomerSegment usage={usage} />
          </section>

          <section className="recommendation-section" id="recommendations">
            <div className="section-head recommendation-head">
              <div>
                <h2>Top 3 Plans Recommended For You</h2>
                <p>Based on your usage</p>
              </div>
              <button type="button" className="view-all-button">View All Plans</button>
            </div>

            <div className="plans-grid">
              <PlanCard
                plan="Saver Plus"
                price="399"
                badge="Most Recommended"
                accent="#6d45e8"
                recommended
                features={["200 mins (Day)", "400 mins (Evening)", "Unlimited (Night)", "10 mins (International)", "50 Voice Mail"]}
              />

              <PlanCard
                plan="Saver Lite"
                price="299"
                accent="#3478f6"
                features={["150 mins (Day)", "300 mins (Evening)", "Unlimited (Night)", "5 mins (International)", "25 Voice Mail"]}
              />

              <PlanCard
                plan="Standard Flex"
                price="549"
                accent="#45b96b"
                features={["250 mins (Day)", "500 mins (Evening)", "Unlimited (Night)", "15 mins (International)", "100 Voice Mail"]}
              />
            </div>

            <div className="why-plans">
              <div>
                <strong>▥</strong>
                <span><b>Based on your actual usage</b>Not on random assumptions</span>
              </div>
              <div>
                <strong>◇</strong>
                <span><b>Lower estimated monthly cost</b>More savings for you</span>
              </div>
              <div>
                <strong>⬡</strong>
                <span><b>Covers most of your usage</b>Minimal overage charges</span>
              </div>
              <div>
                <strong>⟳</strong>
                <span><b>Plans are updated regularly</b>Always the best for you</span>
              </div>
            </div>
          </section>

          <section className="bar-section">
            <div className="section-head">
              <div>
                <h2>Usage Comparison</h2>
                <p>See exactly where your calling minutes are being used.</p>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={[
                  { name: "Day", minutes: usageData.day },
                  { name: "Evening", minutes: usageData.evening },
                  { name: "Night", minutes: usageData.night },
                  { name: "International", minutes: usageData.international },
                ]}
                margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e8e8f3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`${Number(value).toFixed(1)} mins`, "Usage"]} />
                <Bar dataKey="minutes" radius={[8, 8, 0, 0]} fill="#6d45e8" />
              </BarChart>
            </ResponsiveContainer>
          </section>

          <section className="profile-summary">
            <div>
              <h2>Customer Profile</h2>
              <p>Account information used for personalized recommendations.</p>
            </div>
            <div className="profile-details">
              <div><span>Customer ID</span><strong>{customerId}</strong></div>
              <div><span>Account Length</span><strong>{customer?.account_length || 0} days</strong></div>
              <div><span>Current Plan</span><strong>{plan}</strong></div>
              <div><span>Status</span><strong>{customer?.churn ? "Inactive" : "Active"}</strong></div>
            </div>
          </section>
        </div>
      </main>

      <Assistant open={assistantOpen} onClose={() => setAssistantOpen(false)} />

      {!assistantOpen && (
        <button className="floating-assistant" type="button" onClick={() => setAssistantOpen(true)}>
          🤖
        </button>
      )}
    </div>
  );
}

export default CustomerDashboard;