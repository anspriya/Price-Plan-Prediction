import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/customer.css";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

import useCustomer from "../hooks/useCustomer";

import "../styles/customer.css";

// =====================================================
// ICON COMPONENT
// =====================================================

function Icon({ type }) {
  const icons = {
    dashboard: (
      <svg viewBox="0 0 24 24">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),

    usage: (
      <svg viewBox="0 0 24 24">
        <path d="M4 19V5" />
        <path d="M4 19h16" />
        <path d="M8 16v-5" />
        <path d="M12 16V8" />
        <path d="M16 16V4" />
      </svg>
    ),

    customer: (
      <svg viewBox="0 0 24 24">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c0-4 3.5-7 8-7s8 3 8 7" />
      </svg>
    ),

    plan: (
      <svg viewBox="0 0 24 24">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 10h18" />
        <path d="M7 15h4" />
      </svg>
    ),

    recommendation: (
      <svg viewBox="0 0 24 24">
        <path d="M9 18h6" />
        <path d="M10 22h4" />
        <path d="M8 14c-1.3-1.1-2-2.7-2-4.5A6 6 0 0 1 18 9.5c0 1.8-.7 3.4-2 4.5-.8.7-1 1.4-1 2H9c0-.6-.2-1.3-1-2Z" />
      </svg>
    ),

    support: (
      <svg viewBox="0 0 24 24">
        <path d="M4 13a8 8 0 0 1 16 0" />
        <path d="M4 13v4a2 2 0 0 0 2 2h1v-6H4Z" />
        <path d="M20 13v4a2 2 0 0 1-2 2h-1v-6h3Z" />
        <path d="M15 21h2" />
      </svg>
    ),

    logout: (
      <svg viewBox="0 0 24 24">
        <path d="M10 17l5-5-5-5" />
        <path d="M15 12H3" />
        <path d="M21 19V5a2 2 0 0 0-2-2h-6" />
      </svg>
    ),

    menu: (
      <svg viewBox="0 0 24 24">
        <path d="M4 6h16" />
        <path d="M4 12h16" />
        <path d="M4 18h16" />
      </svg>
    ),
  };

  return icons[type] || null;
}

// =====================================================
// USAGE PROGRESS BAR
// =====================================================

function UsageProgress({
  icon,
  title,
  subtitle,
  value,
  max,
  color,
}) {
  const numericValue = Number(value || 0);

  const percentage =
    max > 0
      ? Math.min((numericValue / max) * 100, 100)
      : 0;

  return (
    <div className="usage-progress-row">

      <div className="usage-period-icon">
        {icon}
      </div>

      <div className="usage-progress-content">

        <div className="usage-progress-header">

          <div>
            <strong>{title}</strong>

            <span>{subtitle}</span>
          </div>

          <b>
            {numericValue.toFixed(1)} mins
          </b>

        </div>

        <div className="usage-progress-track">

          <div
            className="usage-progress-fill"
            style={{
              width: `${percentage}%`,
              background: color,
            }}
          />

        </div>

      </div>
    </div>
  );
}

// =====================================================
// USAGE DISTRIBUTION DONUT
// =====================================================

function UsageDistribution({
  day,
  evening,
  night,
  international,
}) {
  const data = [
    {
      name: "Day",
      value: Number(day || 0),
    },
    {
      name: "Evening",
      value: Number(evening || 0),
    },
    {
      name: "Night",
      value: Number(night || 0),
    },
    {
      name: "International",
      value: Number(international || 0),
    },
  ];

  const COLORS = [
    "#6d28d9",
    "#2563eb",
    "#22c55e",
    "#f59e0b",
  ];

  const total = data.reduce(
    (sum, item) => sum + item.value,
    0
  );

  return (
    <div className="usage-distribution-card">

      <div className="chart-title">
        Usage Distribution
      </div>

      <div className="donut-container">

        <ResponsiveContainer
          width="100%"
          height={190}
        >
          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={52}
              outerRadius={78}
              paddingAngle={3}
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>

            <Tooltip
              formatter={(value) =>
                `${Number(value).toFixed(1)} mins`
              }
            />

          </PieChart>
        </ResponsiveContainer>

        <div className="donut-center-text">

          <strong>
            {total.toFixed(0)}
          </strong>

          <span>
            Total Minutes
          </span>

        </div>

      </div>

      <div className="distribution-legend">

        {data.map((item, index) => {

          const percentage =
            total > 0
              ? (
                  (item.value / total) *
                  100
                ).toFixed(0)
              : 0;

          return (
            <div
              className="distribution-item"
              key={item.name}
            >

              <span
                className="legend-color"
                style={{
                  background:
                    COLORS[index],
                }}
              />

              <span>
                {item.name}
              </span>

              <strong>
                {percentage}%
              </strong>

            </div>
          );
        })}

      </div>
    </div>
  );
}

// =====================================================
// CALL DISTRIBUTION BAR CHART
// =====================================================

function CallDistributionChart({
  dayCalls,
  eveningCalls,
  nightCalls,
  internationalCalls,
}) {
  const data = [
    {
      name: "Day",
      calls: Number(dayCalls || 0),
    },
    {
      name: "Evening",
      calls: Number(eveningCalls || 0),
    },
    {
      name: "Night",
      calls: Number(nightCalls || 0),
    },
    {
      name: "International",
      calls: Number(internationalCalls || 0),
    },
  ];

  return (
    <div className="call-chart-card">

      <div className="chart-title">
        Call Distribution
      </div>

      <p className="chart-subtitle">
        Number of calls by period
      </p>

      <ResponsiveContainer
        width="100%"
        height={230}
      >
        <BarChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: -15,
            bottom: 5,
          }}
        >

          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#eeeeF5"
          />

          <XAxis
            dataKey="name"
            tick={{
              fontSize: 9,
              fill: "#7d8398",
            }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            tick={{
              fontSize: 9,
              fill: "#7d8398",
            }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip />

          <Bar
            dataKey="calls"
            radius={[
              5,
              5,
              0,
              0,
            ]}
            fill="#6d28d9"
          />

        </BarChart>
      </ResponsiveContainer>

    </div>
  );
}

// =====================================================
// CUSTOMER SEGMENT
// =====================================================

function CustomerSegment({
  totalMinutes,
  internationalMinutes,
}) {
  let segment = "Moderate Voice User";

  if (totalMinutes > 650) {
    segment = "High Voice User";
  } else if (totalMinutes < 300) {
    segment = "Light Voice User";
  }

  return (
    <div className="segment-card">

      <div className="segment-card-heading">

        <div className="segment-icon">
          👥
        </div>

        <div>
          <h2>
            Your Customer Segment
          </h2>

          <p>
            Based on your usage
          </p>
        </div>

      </div>

      <div className="segment-highlight">

        <div className="segment-title">
          🟣 {segment}
        </div>

        <p>
          Your current usage pattern
          indicates a {segment.toLowerCase()}.
        </p>

        <p>
          You use approximately{" "}
          <strong>
            {totalMinutes.toFixed(1)}
          </strong>{" "}
          minutes overall, with{" "}
          <strong>
            {internationalMinutes.toFixed(1)}
          </strong>{" "}
          international minutes.
        </p>

        <button type="button">
          Learn more about your segment →
        </button>

      </div>

      <div className="segment-visual">
        📊
      </div>

    </div>
  );
}

// =====================================================
// RECOMMENDED PLANS
// =====================================================

function RecommendationCards({
  currentPlan,
}) {
  const plans = [
    {
      name: "Saver Plus",
      price: "₹399",
      color: "#6d28d9",
      medal: "🥇",
      features: [
        "200 mins Day",
        "400 mins Evening",
        "Unlimited Night",
        "10 mins International",
        "50 Voice Mail",
      ],
      estimated: "₹352.40",
    },

    {
      name: "Saver Lite",
      price: "₹299",
      color: "#2563eb",
      medal: "🥈",
      features: [
        "150 mins Day",
        "300 mins Evening",
        "Unlimited Night",
        "5 mins International",
        "25 Voice Mail",
      ],
      estimated: "₹368.10",
    },

    {
      name: "Standard Flex",
      price: "₹549",
      color: "#16a34a",
      medal: "🥉",
      features: [
        "250 mins Day",
        "500 mins Evening",
        "Unlimited Night",
        "15 mins International",
        "100 Voice Mail",
      ],
      estimated: "₹487.60",
    },
  ];

  return (
    <section
      className="recommendation-section"
      id="recommendation"
    >

      <div className="recommendation-header">

        <div>
          <h2>
            Top 3 Plans Recommended For You
          </h2>

          <span>
            Based on your usage
          </span>
        </div>

        <button
          type="button"
          onClick={() =>
            document
              .getElementById("recommendation")
              ?.scrollIntoView({
                behavior: "smooth",
              })
          }
        >
          View All Plans
        </button>

      </div>

      <div className="recommendation-grid">

        {plans.map((plan, index) => (
          <div
            className={
              index === 0
                ? "recommendation-plan recommended"
                : "recommendation-plan"
            }
            key={plan.name}
          >

            {index === 0 && (
              <div className="most-recommended">
                ⭐ Most Recommended
              </div>
            )}

            <div className="plan-card-top">

              <div>

                <h3>
                  {plan.name}
                </h3>

                <strong
                  style={{
                    color: plan.color,
                  }}
                >
                  {plan.price}
                </strong>

                <small>
                  /month
                </small>

              </div>

              <div className="plan-medal">
                {plan.medal}
              </div>

            </div>

            <div className="plan-features">

              {plan.features.map(
                (feature) => (
                  <div key={feature}>
                    <span>✓</span>
                    {feature}
                  </div>
                )
              )}

            </div>

            <div className="plan-card-bottom">

              <div>

                <small>
                  Est. Monthly Cost
                </small>

                <strong
                  style={{
                    color:
                      plan.color,
                  }}
                >
                  {plan.estimated}
                </strong>

              </div>

              <button
                type="button"
                style={{
                  color: plan.color,
                  borderColor: plan.color,
                }}
              >
                View Details
              </button>

            </div>

          </div>
        ))}

      </div>

      {currentPlan && (
        <div className="current-plan-note">
          Current plan:{" "}
          <strong>
            {currentPlan}
          </strong>
        </div>
      )}

    </section>
  );
}

// =====================================================
// MAIN CUSTOMER DASHBOARD
// =====================================================

function CustomerDashboard() {
  const navigate = useNavigate();

  // ===================================================
  // CUSTOMER NUMBER
  // ===================================================

  const savedCustomerNumber =
    localStorage.getItem("customerNumber") ||
    "327-6764";

  const [customerNumber, setCustomerNumber] =
    useState(savedCustomerNumber);

  const [searchNumber, setSearchNumber] =
    useState(savedCustomerNumber);

  // ===================================================
  // SIDEBAR
  // ===================================================

  const [activeMenu, setActiveMenu] =
    useState("overview");

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  // Floating chatbot open / close state
  const [chatOpen, setChatOpen] =
    useState(false);

  // ===================================================
  // CUSTOMER DATA
  // ===================================================

  const {
    customer,
    usage,
    loading,
    error,
  } = useCustomer(searchNumber);

  // ===================================================
  // SEARCH
  // ===================================================

  function handleSearch(event) {
    event.preventDefault();

    const number =
      customerNumber.trim();

    if (!number) {
      alert(
        "Please enter a customer number"
      );
      return;
    }

    localStorage.setItem(
      "customerNumber",
      number
    );

    setSearchNumber(number);

    setActiveMenu("overview");
  }

  // ===================================================
  // LOGOUT
  // ===================================================

  function handleLogout() {
    localStorage.removeItem(
      "customerNumber"
    );

    navigate("/customer-login");
  }

  // ===================================================
  // SIDEBAR NAVIGATION
  // ===================================================

  function handleMenuClick(menu) {
    setActiveMenu(menu);
    setSidebarOpen(false);

    // Support / Chatbot opens the floating assistant.
    if (menu === "support") {
      setChatOpen(true);
      return;
    }

    const element =
      document.getElementById(menu);

    if (element) {
      setTimeout(() => {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 50);
    }
  }

  // ===================================================
  // LOADING
  // ===================================================

  if (loading) {
    return (
      <div className="customer-app">

        <aside className="customer-sidebar">

          <div className="sidebar-brand">

            <div className="sidebar-logo">
              Tariff<span>IQ</span>
            </div>

            <p>
              CUSTOMER PORTAL
            </p>

          </div>

        </aside>

        <main className="customer-main">

          <div className="loading-screen">

            <div className="loading-spinner" />

            <h2>
              Loading Customer Dashboard
            </h2>

            <p>
              Fetching your customer
              information...
            </p>

          </div>

        </main>

      </div>
    );
  }

  // ===================================================
  // CALCULATIONS
  // ===================================================

  const dayMinutes = Number(
    usage?.total_day_minutes || 0
  );

  const eveningMinutes = Number(
    usage?.total_evening_minutes || 0
  );

  const nightMinutes = Number(
    usage?.total_night_minutes || 0
  );

  const internationalMinutes =
    Number(
      usage?.total_intl_minutes || 0
    );

  const dayCalls = Number(
    usage?.total_day_calls || 0
  );

  const eveningCalls = Number(
    usage?.total_evening_calls || 0
  );

  const nightCalls = Number(
    usage?.total_night_calls || 0
  );

  const internationalCalls =
    Number(
      usage?.total_intl_calls || 0
    );

  const customerServiceCalls =
    Number(
      usage?.customer_service_calls || 0
    );

  const totalMinutes =
    dayMinutes +
    eveningMinutes +
    nightMinutes +
    internationalMinutes;

  const totalCalls =
    dayCalls +
    eveningCalls +
    nightCalls +
    internationalCalls;

  // ===================================================
  // MAIN UI
  // ===================================================

  return (
    <div className="customer-app">

      {/* MOBILE OVERLAY */}

      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() =>
            setSidebarOpen(false)
          }
        />
      )}

      {/* =================================================
          SIDEBAR
      ================================================= */}

      <aside
        className={
          sidebarOpen
            ? "customer-sidebar sidebar-open"
            : "customer-sidebar"
        }
      >

        <div className="sidebar-brand">

          <div className="sidebar-logo">
            Tariff<span>IQ</span>
          </div>

          <p>
            SMART PLANS. MAXIMUM SAVINGS.
          </p>

        </div>

        <nav className="sidebar-navigation">

          <p className="sidebar-section-title">
            MAIN MENU
          </p>

          <button
            type="button"
            className={
              activeMenu === "overview"
                ? "sidebar-item active"
                : "sidebar-item"
            }
            onClick={() =>
              handleMenuClick("overview")
            }
          >
            <Icon type="dashboard" />

            <span>
              Dashboard
            </span>
          </button>

          <button
            type="button"
            className={
              activeMenu === "usage"
                ? "sidebar-item active"
                : "sidebar-item"
            }
            onClick={() =>
              handleMenuClick("usage")
            }
          >
            <Icon type="usage" />

            <span>
              My Usage
            </span>
          </button>

          <button
            type="button"
            className={
              activeMenu === "customer"
                ? "sidebar-item active"
                : "sidebar-item"
            }
            onClick={() =>
              handleMenuClick("customer")
            }
          >
            <Icon type="customer" />

            <span>
              My Profile
            </span>
          </button>

          <button
            type="button"
            className={
              activeMenu === "plan"
                ? "sidebar-item active"
                : "sidebar-item"
            }
            onClick={() =>
              handleMenuClick("plan")
            }
          >
            <Icon type="plan" />

            <span>
              Current Plan
            </span>
          </button>

          <button
            type="button"
            className={
              activeMenu === "recommendation"
                ? "sidebar-item active"
                : "sidebar-item"
            }
            onClick={() =>
              handleMenuClick(
                "recommendation"
              )
            }
          >
            <Icon type="recommendation" />

            <span>
              Plan Recommendation
            </span>
          </button>

          <button
            type="button"
            className={
              activeMenu === "support"
                ? "sidebar-item active"
                : "sidebar-item"
            }
            onClick={() =>
              handleMenuClick("support")
            }
          >
            <Icon type="support" />

            <span>
              Support / Chatbot
            </span>
          </button>

        </nav>

        {/* USER */}

        <div className="sidebar-bottom">

          <div className="sidebar-user">

            <div className="user-avatar">
              {customerNumber
                ? customerNumber.charAt(0)
                : "C"}
            </div>

            <div className="user-info">

              <strong>
                Customer
              </strong>

              <span>
                {customerNumber}
              </span>

            </div>

          </div>

          <button
            type="button"
            className="sidebar-logout"
            onClick={handleLogout}
          >
            <Icon type="logout" />

            <span>
              Logout
            </span>
          </button>

        </div>

      </aside>

      {/* =================================================
          MAIN
      ================================================= */}

      <main className="customer-main">

        {/* MOBILE HEADER */}

        <div className="mobile-header">

          <button
            type="button"
            className="mobile-menu-button"
            onClick={() =>
              setSidebarOpen(true)
            }
          >
            <Icon type="menu" />
          </button>

          <div className="mobile-logo">
            Tariff<span>IQ</span>
          </div>

        </div>

        {/* =================================================
            TOP HEADER
        ================================================= */}

        <header
          className="customer-topbar"
          id="overview"
        >

          <div>

            <p className="dashboard-label">
              CUSTOMER MODULE
            </p>

            <h1>
              Welcome back, Customer 👋
            </h1>

            <p className="dashboard-description">
              Here's your usage summary
              and the best plans for you.
            </p>

          </div>

          <button
            type="button"
            className="top-logout"
            onClick={handleLogout}
          >
            <Icon type="logout" />
            Logout
          </button>

        </header>

        {/* =================================================
            SEARCH
        ================================================= */}

        <section className="search-container">

          <form
            onSubmit={handleSearch}
            className="customer-search-form"
          >

            <div className="search-input-wrapper">

              <span className="search-icon">
                🔎
              </span>

              <input
                type="text"
                value={customerNumber}
                onChange={(event) =>
                  setCustomerNumber(
                    event.target.value
                  )
                }
                placeholder="Enter customer number"
                autoComplete="off"
              />

            </div>

            <button type="submit">
              Search
            </button>

          </form>

        </section>

        {/* ERROR */}

        {error && (
          <div className="customer-error">

            <strong>
              Unable to load customer data
            </strong>

            <span>
              {error}
            </span>

          </div>
        )}

        {/* =================================================
            DASHBOARD
        ================================================= */}

        {!error &&
          customer &&
          usage && (

            <div className="dashboard-content">

              {/* =================================================
                  KPI CARDS
              ================================================= */}

              <section className="kpi-grid">

                <div className="kpi-card">

                  <div className="kpi-icon purple">
                    👤
                  </div>

                  <div>
                    <span>
                      Customer ID
                    </span>

                    <strong>
                      {customer.phone_number}
                    </strong>
                  </div>

                </div>

                <div className="kpi-card">

                  <div className="kpi-icon blue">
                    📋
                  </div>

                  <div>
                    <span>
                      Current Plan
                    </span>

                    <strong>
                      {customer.plan ||
                        "No Active Plan"}
                    </strong>
                  </div>

                </div>

                <div className="kpi-card">

                  <div className="kpi-icon green">
                    ₹
                  </div>

                  <div>
                    <span>
                      Total Usage
                    </span>

                    <strong>
                      {totalMinutes.toFixed(1)}
                      {" "}mins
                    </strong>

                    <small>
                      Based on your usage
                    </small>
                  </div>

                </div>

                <div className="kpi-card">

                  <div className="kpi-icon yellow">
                    📞
                  </div>

                  <div>
                    <span>
                      Total Calls
                    </span>

                    <strong>
                      {totalCalls}
                    </strong>

                    <small>
                      Calling activity
                    </small>
                  </div>

                </div>

              </section>

              {/* =================================================
                  MAIN ANALYTICS
              ================================================= */}

              <section className="main-analysis-grid">

                {/* USAGE SUMMARY */}

                <div
                  className="usage-summary-card"
                  id="usage"
                >

                  <div className="card-heading">

                    <div>
                      <h2>
                        Your Usage Summary
                      </h2>

                      <span>
                        This Month
                      </span>
                    </div>

                    <span>
                      {totalMinutes.toFixed(1)}
                      {" "}mins
                    </span>

                  </div>

                  <UsageProgress
                    icon="☀️"
                    title="Day Minutes"
                    subtitle="6AM - 6PM"
                    value={dayMinutes}
                    max={400}
                    color="#6d28d9"
                  />

                  <UsageProgress
                    icon="🌆"
                    title="Evening Minutes"
                    subtitle="6PM - 12AM"
                    value={eveningMinutes}
                    max={500}
                    color="#2563eb"
                  />

                  <UsageProgress
                    icon="🌙"
                    title="Night Minutes"
                    subtitle="12AM - 6AM"
                    value={nightMinutes}
                    max={300}
                    color="#22c55e"
                  />

                  <UsageProgress
                    icon="🌎"
                    title="International Minutes"
                    subtitle="International"
                    value={
                      internationalMinutes
                    }
                    max={100}
                    color="#f59e0b"
                  />

                  <UsageProgress
                    icon="📞"
                    title="Customer Service"
                    subtitle="Support calls"
                    value={
                      customerServiceCalls
                    }
                    max={20}
                    color="#ec4899"
                  />

                </div>

                {/* PIE */}

                <UsageDistribution
                  day={dayMinutes}
                  evening={eveningMinutes}
                  night={nightMinutes}
                  international={
                    internationalMinutes
                  }
                />

                {/* CUSTOMER SEGMENT */}

                <div id="customer">
                  <CustomerSegment
                    totalMinutes={
                      totalMinutes
                    }
                    internationalMinutes={
                      internationalMinutes
                    }
                  />
                </div>

              </section>

              {/* =================================================
                  CALL BAR GRAPH
              ================================================= */}

              <section className="charts-section">

                <div className="charts-section-heading">

                  <div>
                    <h2>
                      Usage Analytics
                    </h2>

                    <p>
                      Compare your calling
                      activity by period
                    </p>
                  </div>

                  <div className="chart-total">
                    {totalCalls} calls
                  </div>

                </div>

                <CallDistributionChart
                  dayCalls={dayCalls}
                  eveningCalls={
                    eveningCalls
                  }
                  nightCalls={nightCalls}
                  internationalCalls={
                    internationalCalls
                  }
                />

              </section>

              {/* =================================================
                  RECOMMENDATION
              ================================================= */}

              <RecommendationCards
                currentPlan={
                  customer.plan
                }
              />

              {/* =================================================
                  WHY THESE PLANS
              ================================================= */}

              <section className="why-plans">

                <h2>
                  Why these plans?
                </h2>

                <div className="why-grid">

                  <div>
                    <span className="why-icon">
                      📊
                    </span>

                    <strong>
                      Based on actual usage
                    </strong>

                    <small>
                      Not random assumptions
                    </small>
                  </div>

                  <div>
                    <span className="why-icon">
                      🏷️
                    </span>

                    <strong>
                      Lower estimated cost
                    </strong>

                    <small>
                      More savings for you
                    </small>
                  </div>

                  <div>
                    <span className="why-icon">
                      🛡️
                    </span>

                    <strong>
                      Covers your usage
                    </strong>

                    <small>
                      Minimal overage charges
                    </small>
                  </div>

                  <div>
                    <span className="why-icon">
                      🔄
                    </span>

                    <strong>
                      Updated regularly
                    </strong>

                    <small>
                      Always the best option
                    </small>
                  </div>

                </div>

              </section>

            </div>
          )}

        {/* EMPTY */}

        {!loading &&
          !error &&
          !customer && (

            <div className="customer-empty">

              <div>
                🔍
              </div>

              <h2>
                Customer Not Found
              </h2>

              <p>
                Enter a valid customer
                number to view your
                dashboard.
              </p>

            </div>
          )}

      </main>

      {/* =================================================
          FLOATING CHATBOT
      ================================================= */}

      {!loading &&
        !error &&
        customer &&
        usage && (
          <Chatbot
            open={chatOpen}
            setOpen={setChatOpen}
          />
        )}

    </div>
  );
}
function Chatbot({ open, setOpen }) {
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi! 👋 I'm your TariffIQ Assistant. How can I help you?",
    },
  ]);

  function sendMessage(e) {
    e.preventDefault();

    if (!message.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: message,
      },
      {
        sender: "bot",
        text: "Thanks! I can help you with your tariff plan and usage.",
      },
    ]);

    setMessage("");
  }

  /* CLOSED */
  if (!open) {
    return (
      <button
        type="button"
        className="chatbot-button"
        onClick={() => setOpen(true)}
      >
        🤖
      </button>
    );
  }

  /* OPEN */
  return (
    <div className="chatbot-box">

      {/* HEADER */}
      <div className="chatbot-header">

        <div>
          <strong>TariffIQ Assistant</strong>

          <span>
            <i></i> Online
          </span>
        </div>

        <button
          type="button"
          className="chatbot-close"
          onClick={() => setOpen(false)}
        >
          ×
        </button>

      </div>


      {/* MESSAGES */}
      <div className="chatbot-messages">

        {messages.map((msg, index) => (
          <div
            key={index}
            className={
              msg.sender === "user"
                ? "chat-user"
                : "chat-bot"
            }
          >
            {msg.text}
          </div>
        ))}

      </div>


      {/* QUICK ACTIONS */}
      <div className="chatbot-quick-actions">
        <button
          type="button"
          onClick={() => {
            setMessages((prev) => [
              ...prev,
              { sender: "user", text: "Explain my plan" },
              {
                sender: "bot",
                text: "I can explain your current plan, usage limits and recommended plan options.",
              },
            ]);
          }}
        >
          Explain my plan
        </button>

        <button
          type="button"
          onClick={() => {
            setMessages((prev) => [
              ...prev,
              { sender: "user", text: "How can I save?" },
              {
                sender: "bot",
                text: "You can save by choosing a plan that closely matches your day, evening, night and international usage.",
              },
            ]);
          }}
        >
          How can I save?
        </button>

        <button
          type="button"
          onClick={() => {
            setMessages((prev) => [
              ...prev,
              { sender: "user", text: "Compare plans" },
              {
                sender: "bot",
                text: "I can help compare the recommended plans based on your usage and estimated monthly cost.",
              },
            ]);
          }}
        >
          Compare plans
        </button>
      </div>

      {/* INPUT */}
      <form
        className="chatbot-input"
        onSubmit={sendMessage}
      >

        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
        />

        <button type="submit">
          ➤
        </button>

      </form>

    </div>
  );
}
export default CustomerDashboard;