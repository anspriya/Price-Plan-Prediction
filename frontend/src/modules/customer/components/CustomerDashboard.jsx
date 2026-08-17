import { useState } from "react";
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

import CustomerCard from "../components/CustomerCard";
import UsageTable from "../components/UsageTable";
import useCustomer from "../hooks/useCustomer";

import "../styles/customer.css";

/* =====================================================
   ICON
===================================================== */

function Icon({ type }) {
  const icons = {
    dashboard: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),

    usage: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 19V5" />
        <path d="M4 19h16" />
        <path d="M8 16v-5" />
        <path d="M12 16V8" />
        <path d="M16 16V4" />
      </svg>
    ),

    customer: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c0-4 3.5-7 8-7s8 3 8 7" />
      </svg>
    ),

    plan: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 10h18" />
        <path d="M7 15h4" />
      </svg>
    ),

    recommendation: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M9 18h6" />
        <path d="M10 22h4" />
        <path d="M8 14c-1.3-1.1-2-2.7-2-4.5A6 6 0 0 1 18 9.5c0 1.8-.7 3.4-2 4.5-.8.7-1 1.4-1 2H9c0-.6-.2-1.3-1-2Z" />
      </svg>
    ),

    support: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 13a8 8 0 0 1 16 0" />
        <path d="M4 13v4a2 2 0 0 0 2 2h1v-6H4Z" />
        <path d="M20 13v4a2 2 0 0 1-2 2h-1v-6h3Z" />
        <path d="M15 21h2" />
      </svg>
    ),

    logout: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M10 17l5-5-5-5" />
        <path d="M15 12H3" />
        <path d="M21 19V5a2 2 0 0 0-2-2h-6" />
      </svg>
    ),

    menu: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 6h16" />
        <path d="M4 12h16" />
        <path d="M4 18h16" />
      </svg>
    ),
  };

  return icons[type] || null;
}

/* =====================================================
   USAGE SUMMARY CHARTS
===================================================== */

function UsageSummaryCharts({ usage }) {
  const day = Number(usage?.total_day_minutes || 0);
  const evening = Number(usage?.total_evening_minutes || 0);
  const night = Number(usage?.total_night_minutes || 0);
  const international = Number(
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

  const internationalCalls = Number(
    usage?.total_intl_calls || 0
  );

  const totalMinutes =
    day +
    evening +
    night +
    international;

  const totalCalls =
    dayCalls +
    eveningCalls +
    nightCalls +
    internationalCalls;

  const usagePieData = [
    {
      name: "Day",
      value: day,
    },
    {
      name: "Evening",
      value: evening,
    },
    {
      name: "Night",
      value: night,
    },
    {
      name: "International",
      value: international,
    },
  ];

  const callsPieData = [
    {
      name: "Day",
      value: dayCalls,
    },
    {
      name: "Evening",
      value: eveningCalls,
    },
    {
      name: "Night",
      value: nightCalls,
    },
    {
      name: "International",
      value: internationalCalls,
    },
  ];

  const usageBarData = [
    {
      name: "Day",
      minutes: day,
    },
    {
      name: "Evening",
      minutes: evening,
    },
    {
      name: "Night",
      minutes: night,
    },
    {
      name: "International",
      minutes: international,
    },
  ];

  const callBarData = [
    {
      name: "Day",
      calls: dayCalls,
    },
    {
      name: "Evening",
      calls: eveningCalls,
    },
    {
      name: "Night",
      calls: nightCalls,
    },
    {
      name: "International",
      calls: internationalCalls,
    },
  ];

  const COLORS = [
    "#2563eb",
    "#7c3aed",
    "#22c55e",
    "#f59e0b",
  ];

  return (
    <div
      id="usage"
      style={{
        width: "100%",
        marginTop: "25px",
        scrollMarginTop: "30px",
      }}
    >
      {/* =================================================
          SUMMARY CARDS
      ================================================= */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "16px",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "16px",
            padding: "20px",
          }}
        >
          <div
            style={{
              color: "#64748b",
              fontSize: "13px",
              marginBottom: "5px",
            }}
          >
            Total Usage
          </div>

          <strong
            style={{
              display: "block",
              fontSize: "28px",
              color: "#2563eb",
            }}
          >
            {totalMinutes.toFixed(1)}
          </strong>

          <span
            style={{
              color: "#94a3b8",
              fontSize: "12px",
            }}
          >
            minutes
          </span>
        </div>

        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "16px",
            padding: "20px",
          }}
        >
          <div
            style={{
              color: "#64748b",
              fontSize: "13px",
              marginBottom: "5px",
            }}
          >
            Total Calls
          </div>

          <strong
            style={{
              display: "block",
              fontSize: "28px",
              color: "#7c3aed",
            }}
          >
            {totalCalls}
          </strong>

          <span
            style={{
              color: "#94a3b8",
              fontSize: "12px",
            }}
          >
            calls
          </span>
        </div>
      </div>

      {/* =================================================
          PIE CHARTS
      ================================================= */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
          marginBottom: "20px",
        }}
      >
        {/* USAGE DISTRIBUTION */}

        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "18px",
            padding: "20px",
          }}
        >
          <h3
            style={{
              margin: "0 0 5px",
              color: "#0f2342",
              fontSize: "18px",
            }}
          >
            Usage Distribution
          </h3>

          <p
            style={{
              margin: "0",
              color: "#64748b",
              fontSize: "13px",
            }}
          >
            Calling minutes by period
          </p>

          <div
            style={{
              width: "100%",
              height: "270px",
            }}
          >
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <PieChart>
                <Pie
                  data={usagePieData}
                  cx="50%"
                  cy="45%"
                  outerRadius={90}
                  innerRadius={48}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {usagePieData.map(
                    (entry, index) => (
                      <Cell
                        key={`usage-${index}`}
                        fill={COLORS[index]}
                      />
                    )
                  )}
                </Pie>

                <Tooltip
                  formatter={(value) =>
                    `${Number(value).toFixed(
                      1
                    )} min`
                  }
                />

                <Legend
                  verticalAlign="bottom"
                  height={35}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CALL DISTRIBUTION */}

        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "18px",
            padding: "20px",
          }}
        >
          <h3
            style={{
              margin: "0 0 5px",
              color: "#0f2342",
              fontSize: "18px",
            }}
          >
            Call Distribution
          </h3>

          <p
            style={{
              margin: "0",
              color: "#64748b",
              fontSize: "13px",
            }}
          >
            Number of calls by period
          </p>

          <div
            style={{
              width: "100%",
              height: "270px",
            }}
          >
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <PieChart>
                <Pie
                  data={callsPieData}
                  cx="50%"
                  cy="45%"
                  outerRadius={90}
                  innerRadius={48}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {callsPieData.map(
                    (entry, index) => (
                      <Cell
                        key={`calls-${index}`}
                        fill={COLORS[index]}
                      />
                    )
                  )}
                </Pie>

                <Tooltip
                  formatter={(value) =>
                    `${value} calls`
                  }
                />

                <Legend
                  verticalAlign="bottom"
                  height={35}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* =================================================
          BAR CHART - MINUTES
      ================================================= */}

      <div
        style={{
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "18px",
          padding: "20px",
          marginBottom: "20px",
        }}
      >
        <h3
          style={{
            margin: "0",
            color: "#0f2342",
            fontSize: "19px",
          }}
        >
          Usage Minutes by Period
        </h3>

        <p
          style={{
            margin: "5px 0 15px",
            color: "#64748b",
            fontSize: "13px",
          }}
        >
          Compare your calling usage during
          each period of the day.
        </p>

        <div
          style={{
            width: "100%",
            height: "300px",
          }}
        >
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <BarChart
              data={usageBarData}
              margin={{
                top: 10,
                right: 20,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e2e8f0"
              />

              <XAxis
                dataKey="name"
                stroke="#64748b"
              />

              <YAxis
                stroke="#64748b"
              />

              <Tooltip
                formatter={(value) =>
                  `${Number(value).toFixed(
                    1
                  )} minutes`
                }
              />

              <Bar
                dataKey="minutes"
                radius={[8, 8, 0, 0]}
                barSize={55}
              >
                {usageBarData.map(
                  (entry, index) => (
                    <Cell
                      key={`usage-bar-${index}`}
                      fill={COLORS[index]}
                    />
                  )
                )}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* =================================================
          BAR CHART - CALLS
      ================================================= */}

      <div
        style={{
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "18px",
          padding: "20px",
          marginBottom: "20px",
        }}
      >
        <h3
          style={{
            margin: "0",
            color: "#0f2342",
            fontSize: "19px",
          }}
        >
          Calls by Period
        </h3>

        <p
          style={{
            margin: "5px 0 15px",
            color: "#64748b",
            fontSize: "13px",
          }}
        >
          Compare the number of calls made
          during each period.
        </p>

        <div
          style={{
            width: "100%",
            height: "300px",
          }}
        >
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <BarChart
              data={callBarData}
              margin={{
                top: 10,
                right: 20,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e2e8f0"
              />

              <XAxis
                dataKey="name"
                stroke="#64748b"
              />

              <YAxis
                stroke="#64748b"
              />

              <Tooltip
                formatter={(value) =>
                  `${value} calls`
                }
              />

              <Bar
                dataKey="calls"
                radius={[8, 8, 0, 0]}
                barSize={55}
              >
                {callBarData.map(
                  (entry, index) => (
                    <Cell
                      key={`call-bar-${index}`}
                      fill={COLORS[index]}
                    />
                  )
                )}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* =================================================
          QUICK USAGE CARDS
      ================================================= */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(160px, 1fr))",
          gap: "12px",
        }}
      >
        {[
          {
            name: "Day",
            value: day,
            icon: "☀️",
            color: "#2563eb",
          },
          {
            name: "Evening",
            value: evening,
            icon: "🌆",
            color: "#7c3aed",
          },
          {
            name: "Night",
            value: night,
            icon: "🌙",
            color: "#22c55e",
          },
          {
            name: "International",
            value: international,
            icon: "🌎",
            color: "#f59e0b",
          },
        ].map((item) => (
          <div
            key={item.name}
            style={{
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "14px",
              padding: "15px",
            }}
          >
            <div
              style={{
                fontSize: "20px",
              }}
            >
              {item.icon}
            </div>

            <div
              style={{
                color: "#64748b",
                fontSize: "12px",
                marginTop: "6px",
              }}
            >
              {item.name}
            </div>

            <strong
              style={{
                display: "block",
                color: item.color,
                fontSize: "19px",
                marginTop: "3px",
              }}
            >
              {item.value.toFixed(1)}
            </strong>

            <span
              style={{
                color: "#94a3b8",
                fontSize: "11px",
              }}
            >
              minutes
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =====================================================
   CUSTOMER SEGMENT
===================================================== */

function CustomerSegment({ usage }) {
  const totalMinutes =
    Number(usage?.total_day_minutes || 0) +
    Number(usage?.total_evening_minutes || 0) +
    Number(usage?.total_night_minutes || 0) +
    Number(usage?.total_intl_minutes || 0);

  const international = Number(
    usage?.total_intl_minutes || 0
  );

  let segment = "Moderate Voice User";

  if (totalMinutes >= 700) {
    segment = "Heavy Voice User";
  } else if (totalMinutes < 300) {
    segment = "Light Voice User";
  }

  return (
    <section
      className="dashboard-section"
      id="segment"
      style={{
        scrollMarginTop: "30px",
        marginTop: "20px",
      }}
    >
      <div
        style={{
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "18px",
          padding: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "16px",
          }}
        >
          <div
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "12px",
              background: "#f1eaff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "21px",
            }}
          >
            👥
          </div>

          <div>
            <h2
              style={{
                margin: 0,
                fontSize: "18px",
                color: "#0f2342",
              }}
            >
              Your Customer Segment
            </h2>

            <p
              style={{
                margin: "3px 0 0",
                color: "#64748b",
                fontSize: "12px",
              }}
            >
              Based on your usage
            </p>
          </div>
        </div>

        <div
          style={{
            background:
              "linear-gradient(135deg, #f8f3ff, #ffffff)",
            border: "1px solid #ddd6fe",
            borderRadius: "14px",
            padding: "18px",
          }}
        >
          <h3
            style={{
              margin: "0 0 10px",
              color: "#6335c7",
              fontSize: "17px",
            }}
          >
            🟣 {segment}
          </h3>

          <p
            style={{
              margin: "0 0 8px",
              color: "#475569",
              fontSize: "13px",
            }}
          >
            Your current usage pattern indicates
            a {segment.toLowerCase()}.
          </p>

          <p
            style={{
              margin: 0,
              color: "#475569",
              fontSize: "13px",
            }}
          >
            You use approximately{" "}
            <strong>
              {totalMinutes.toFixed(1)}
            </strong>{" "}
            minutes overall, with{" "}
            <strong>
              {international.toFixed(1)}
            </strong>{" "}
            international minutes.
          </p>

          <button
            type="button"
            style={{
              marginTop: "15px",
              border: "none",
              background: "transparent",
              color: "#6335c7",
              fontWeight: "700",
              padding: 0,
              cursor: "pointer",
            }}
          >
            Learn more about your segment →
          </button>
        </div>
      </div>
    </section>
  );
}

/* =====================================================
   FLOATING TARIFF ASSISTANT
===================================================== */

function TariffAssistant() {
  const [open, setOpen] = useState(false);

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text:
        "Hi there! 👋 I'm your Tariff Assistant. I can help you with plan explanations, plan comparisons, usage questions and saving tips.",
    },
  ]);

  const [input, setInput] = useState("");

  function sendMessage(text = input) {
    const message = text.trim();

    if (!message) return;

    setMessages((previous) => [
      ...previous,
      {
        sender: "user",
        text: message,
      },
      {
        sender: "bot",
        text:
          "Sure! I can help you understand your usage and tariff plans. Your question has been received.",
      },
    ]);

    setInput("");
  }

  return (
    <>
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open Tariff Assistant"
          style={{
            position: "fixed",
            right: "25px",
            bottom: "25px",
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            border: "none",
            background:
              "linear-gradient(135deg, #6335c7, #2563eb)",
            color: "#ffffff",
            fontSize: "26px",
            cursor: "pointer",
            boxShadow:
              "0 12px 30px rgba(37, 99, 235, 0.30)",
            zIndex: 9999,
          }}
        >
          🤖
        </button>
      )}

      {open && (
        <div
          style={{
            position: "fixed",
            right: "25px",
            bottom: "25px",
            width: "350px",
            maxWidth: "calc(100vw - 40px)",
            height: "500px",
            background: "#ffffff",
            borderRadius: "20px",
            border: "1px solid #e2e8f0",
            boxShadow:
              "0 20px 60px rgba(15, 35, 66, 0.20)",
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* CHAT HEADER */}

          <div
            style={{
              padding: "16px",
              background:
                "linear-gradient(135deg, #6335c7, #2563eb)",
              color: "#ffffff",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  background: "#ffffff",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "22px",
                }}
              >
                🤖
              </div>

              <div>
                <strong
                  style={{
                    display: "block",
                    fontSize: "15px",
                  }}
                >
                  Tariff Assistant
                </strong>

                <span
                  style={{
                    fontSize: "11px",
                    opacity: 0.9,
                  }}
                >
                  🟢 Online
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              style={{
                background: "transparent",
                border: "none",
                color: "#ffffff",
                fontSize: "22px",
                cursor: "pointer",
              }}
            >
              ×
            </button>
          </div>

          {/* MESSAGES */}

          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "15px",
              background: "#f8f7ff",
            }}
          >
            {messages.map((message, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent:
                    message.sender === "user"
                      ? "flex-end"
                      : "flex-start",
                  marginBottom: "10px",
                }}
              >
                <div
                  style={{
                    maxWidth: "82%",
                    padding: "11px 13px",
                    borderRadius: "13px",
                    background:
                      message.sender === "user"
                        ? "#6335c7"
                        : "#ffffff",
                    color:
                      message.sender === "user"
                        ? "#ffffff"
                        : "#475569",
                    fontSize: "12px",
                    lineHeight: 1.5,
                    boxShadow:
                      message.sender === "bot"
                        ? "0 2px 8px rgba(0,0,0,0.05)"
                        : "none",
                  }}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          {/* QUICK BUTTONS */}

          <div
            style={{
              padding: "8px 12px",
              display: "flex",
              gap: "6px",
              overflowX: "auto",
              background: "#ffffff",
            }}
          >
            <button
              type="button"
              onClick={() =>
                sendMessage("Explain my plan")
              }
              style={quickChatButton}
            >
              Explain my plan
            </button>

            <button
              type="button"
              onClick={() =>
                sendMessage("How can I save?")
              }
              style={quickChatButton}
            >
              How can I save?
            </button>

            <button
              type="button"
              onClick={() =>
                sendMessage("Compare plans")
              }
              style={quickChatButton}
            >
              Compare plans
            </button>
          </div>

          {/* INPUT */}

          <div
            style={{
              padding: "10px",
              borderTop: "1px solid #e2e8f0",
              display: "flex",
              gap: "8px",
              background: "#ffffff",
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(event) =>
                setInput(event.target.value)
              }
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  sendMessage();
                }
              }}
              placeholder="Type your message..."
              style={{
                flex: 1,
                border: "1px solid #dbe3ef",
                borderRadius: "12px",
                padding: "11px",
                outline: "none",
                fontSize: "12px",
              }}
            />

            <button
              type="button"
              onClick={() => sendMessage()}
              style={{
                width: "42px",
                border: "none",
                borderRadius: "12px",
                background: "#6335c7",
                color: "#ffffff",
                cursor: "pointer",
                fontSize: "17px",
              }}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}

const quickChatButton = {
  flexShrink: 0,
  background: "#ffffff",
  border: "1px solid #ddd6fe",
  color: "#6335c7",
  borderRadius: "10px",
  padding: "7px 9px",
  fontSize: "10px",
  cursor: "pointer",
};

/* =====================================================
   CUSTOMER DASHBOARD
===================================================== */

function CustomerDashboard() {
  const navigate = useNavigate();

  /* ===================================================
     CUSTOMER NUMBER
  =================================================== */

  const savedCustomerNumber =
    localStorage.getItem("customerNumber") || "";

  const [
    customerNumber,
    setCustomerNumber,
  ] = useState(savedCustomerNumber);

  const [
    searchNumber,
    setSearchNumber,
  ] = useState(savedCustomerNumber);

  /* ===================================================
     SIDEBAR
  =================================================== */

  const [
    activeMenu,
    setActiveMenu,
  ] = useState("overview");

  const [
    sidebarOpen,
    setSidebarOpen,
  ] = useState(false);

  /* ===================================================
     CUSTOMER API
  =================================================== */

  const {
    customer,
    usage,
    loading,
    error,
  } = useCustomer(searchNumber);

  /* ===================================================
     SEARCH
  =================================================== */

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
  }

  /* ===================================================
     LOGOUT
  =================================================== */

  function handleLogout() {
    localStorage.removeItem(
      "customerNumber"
    );

    navigate("/customer-login");
  }

  /* ===================================================
     SIDEBAR NAVIGATION
  =================================================== */

  function handleMenuClick(menu) {
    setActiveMenu(menu);
    setSidebarOpen(false);

    const sectionMap = {
      overview: "overview",
      usage: "usage",
      customer: "details",
      plan: "plan",
      recommendation: "recommendation",
      support: "support",
    };

    const targetId =
      sectionMap[menu];

    const element =
      document.getElementById(targetId);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }

  /* ===================================================
     LOADING
  =================================================== */

  if (loading) {
    return (
      <div className="customer-app">
        <aside className="customer-sidebar">
          <div className="sidebar-brand">
            <div className="sidebar-logo">
              Tariff<span>IQ</span>
            </div>

            <p>CUSTOMER PORTAL</p>
          </div>
        </aside>

        <main className="customer-main">
          <div className="loading-screen">
            <div className="loading-spinner"></div>

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

  /* ===================================================
     USAGE DATA
  =================================================== */

  const usageData = {
    day: Number(
      usage?.total_day_minutes || 0
    ),

    evening: Number(
      usage?.total_evening_minutes || 0
    ),

    night: Number(
      usage?.total_night_minutes || 0
    ),

    international: Number(
      usage?.total_intl_minutes || 0
    ),

    dayCalls: Number(
      usage?.total_day_calls || 0
    ),

    eveningCalls: Number(
      usage?.total_evening_calls || 0
    ),

    nightCalls: Number(
      usage?.total_night_calls || 0
    ),

    internationalCalls: Number(
      usage?.total_intl_calls || 0
    ),
  };

  const totalCalls =
    usageData.dayCalls +
    usageData.eveningCalls +
    usageData.nightCalls +
    usageData.internationalCalls;

  const totalUsage =
    usageData.day +
    usageData.evening +
    usageData.night +
    usageData.international;

  /* ===================================================
     MAIN
  =================================================== */

  return (
    <div className="customer-app">
      {/* =================================================
          MOBILE OVERLAY
      ================================================= */}

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

          <p>CUSTOMER PORTAL</p>
        </div>

        <nav className="sidebar-navigation">
          <p className="sidebar-section-title">
            MAIN MENU
          </p>

          {/* OVERVIEW */}

          <button
            type="button"
            className={
              activeMenu === "overview"
                ? "sidebar-item active"
                : "sidebar-item"
            }
            onClick={() =>
              handleMenuClick(
                "overview"
              )
            }
          >
            <Icon type="dashboard" />

            <span>Overview</span>
          </button>

          {/* USAGE */}

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
              Usage Analytics
            </span>
          </button>

          {/* CUSTOMER */}

          <button
            type="button"
            className={
              activeMenu === "customer"
                ? "sidebar-item active"
                : "sidebar-item"
            }
            onClick={() =>
              handleMenuClick(
                "customer"
              )
            }
          >
            <Icon type="customer" />

            <span>
              Customer Details
            </span>
          </button>

          {/* PLAN */}

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

          {/* RECOMMENDATION */}

          <button
            type="button"
            className={
              activeMenu ===
              "recommendation"
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

          <p className="sidebar-section-title support-title">
            SUPPORT
          </p>

          {/* SUPPORT */}

          <button
            type="button"
            className={
              activeMenu === "support"
                ? "sidebar-item active"
                : "sidebar-item"
            }
            onClick={() =>
              handleMenuClick(
                "support"
              )
            }
          >
            <Icon type="support" />

            <span>
              Help & Support
            </span>
          </button>
        </nav>

        {/* SIDEBAR USER */}

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
                {customerNumber ||
                  "Customer"}
              </span>
            </div>
          </div>

          <button
            type="button"
            className="sidebar-logout"
            onClick={handleLogout}
          >
            <Icon type="logout" />

            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* =================================================
          MAIN CONTENT
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
              Customer Usage Dashboard
            </h1>

            <p className="dashboard-description">
              View your customer information,
              calling activity, and usage
              patterns.
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
                aria-label="Customer number"
                autoComplete="off"
              />
            </div>

            <button type="submit">
              Search
            </button>
          </form>
        </section>

        {/* =================================================
            ERROR
        ================================================= */}

        {error && (
          <div className="customer-error">
            <strong>
              Unable to load customer data
            </strong>

            <span>{error}</span>
          </div>
        )}

        {/* =================================================
            DASHBOARD DATA
        ================================================= */}

        {!error &&
          customer &&
          usage && (
            <div className="dashboard-content">

              {/* =================================================
                  CUSTOMER + USAGE
              ================================================= */}

              <section
                className="top-dashboard-grid"
                style={{
                  alignItems: "start",
                }}
              >
                {/* CUSTOMER INFORMATION */}

                <div
                  className="customer-card-wrapper"
                  id="details"
                  style={{
                    alignSelf: "start",
                    height: "fit-content",
                  }}
                >
                  <div className="section-heading">
                    <span className="section-icon">
                      👤
                    </span>

                    <div>
                      <h2>
                        Customer Information
                      </h2>

                      <p>
                        Your customer profile
                      </p>
                    </div>
                  </div>

                  <CustomerCard
                    customer={{
                      ...customer,

                      customerId:
                        customer.phone_number,

                      accountLength:
                        customer.account_length,

                      plan:
                        customer.plan,

                      status:
                        customer.churn
                          ? "Inactive"
                          : "Active",
                    }}
                  />
                </div>

                {/* USAGE SUMMARY */}

                <div
                  className="summary-wrapper"
                  id="plan"
                  style={{
                    scrollMarginTop: "30px",
                  }}
                >
                  <div className="section-heading">
                    <span className="section-icon">
                      📊
                    </span>

                    <div>
                      <h2>
                        Usage Summary
                      </h2>

                      <p>
                        Overview of your
                        calling activity
                      </p>
                    </div>
                  </div>

                  {/* SMALL SUMMARY */}

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(2, 1fr)",
                      gap: "12px",
                      marginBottom: "15px",
                    }}
                  >
                    <div
                      style={{
                        background: "#eff6ff",
                        border:
                          "1px solid #dbeafe",
                        borderRadius: "14px",
                        padding: "15px",
                      }}
                    >
                      <span
                        style={{
                          color: "#64748b",
                          fontSize: "12px",
                        }}
                      >
                        Total Calls
                      </span>

                      <strong
                        style={{
                          display: "block",
                          color: "#2563eb",
                          fontSize: "24px",
                        }}
                      >
                        {totalCalls}
                      </strong>

                      <small>
                        calls
                      </small>
                    </div>

                    <div
                      style={{
                        background: "#f5f3ff",
                        border:
                          "1px solid #ddd6fe",
                        borderRadius: "14px",
                        padding: "15px",
                      }}
                    >
                      <span
                        style={{
                          color: "#64748b",
                          fontSize: "12px",
                        }}
                      >
                        Total Usage
                      </span>

                      <strong
                        style={{
                          display: "block",
                          color: "#7c3aed",
                          fontSize: "24px",
                        }}
                      >
                        {totalUsage.toFixed(
                          1
                        )}
                      </strong>

                      <small>
                        minutes
                      </small>
                    </div>
                  </div>

                  <UsageSummaryCharts
                    usage={usage}
                  />
                </div>
              </section>

              {/* =================================================
                  CUSTOMER SEGMENT
              ================================================= */}

              <CustomerSegment
                usage={usage}
              />

              {/* =================================================
                  DETAILED USAGE
              ================================================= */}

              <section
                className="dashboard-section"
                style={{
                  scrollMarginTop: "30px",
                }}
              >
                <div className="section-heading">
                  <span className="section-icon green-icon">
                    📋
                  </span>

                  <div>
                    <h2>
                      Detailed Usage
                    </h2>

                    <p>
                      Detailed customer calling
                      activity
                    </p>
                  </div>
                </div>

                <UsageTable
                  usage={{
                    ...usage,

                    totalDayMinutes:
                      usage.total_day_minutes,

                    totalDayCalls:
                      usage.total_day_calls,

                    totalEveningMinutes:
                      usage.total_evening_minutes,

                    totalEveningCalls:
                      usage.total_evening_calls,

                    totalNightMinutes:
                      usage.total_night_minutes,

                    totalNightCalls:
                      usage.total_night_calls,

                    totalIntlMinutes:
                      usage.total_intl_minutes,

                    totalIntlCalls:
                      usage.total_intl_calls,

                    customerServiceCalls:
                      usage.customer_service_calls,
                  }}
                />
              </section>

              {/* =================================================
                  PLAN RECOMMENDATION
              ================================================= */}

              <section
                className="recommendation-card"
                id="recommendation"
                style={{
                  scrollMarginTop: "30px",
                }}
              >
                <div className="recommendation-icon">
                  💡
                </div>

                <div className="recommendation-content">
                  <span>
                    PERSONALIZED
                    RECOMMENDATION
                  </span>

                  <h2>
                    Find the best plan
                    for your usage
                  </h2>

                  <p>
                    Our recommendation engine
                    can analyze your calling
                    patterns and suggest the
                    most suitable tariff plan.
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      alert(
                        "Plan recommendation will be connected next."
                      )
                    }
                  >
                    View Plan Recommendation →
                  </button>
                </div>
              </section>

              {/* =================================================
                  SUPPORT
              ================================================= */}

              <section
                className="support-card"
                id="support"
                style={{
                  scrollMarginTop: "30px",
                }}
              >
                <div className="support-icon">
                  🎧
                </div>

                <div>
                  <h2>
                    Need Help?
                  </h2>

                  <p>
                    Contact customer support
                    if you have questions about
                    your plan or usage.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    alert(
                      "Customer support will be connected next."
                    )
                  }
                >
                  Contact Support
                </button>
              </section>
            </div>
          )}

        {/* =================================================
            EMPTY STATE
        ================================================= */}

        {!loading &&
          !error &&
          !customer && (
            <div className="customer-empty">
              <div className="empty-icon">
                🔍
              </div>

              <h2>
                Customer Not Found
              </h2>

              <p>
                Enter a valid customer
                number to view customer
                information.
              </p>
            </div>
          )}
      </main>

      {/* =================================================
          TARIFF ASSISTANT
      ================================================= */}

      <TariffAssistant />
    </div>
  );
}

export default CustomerDashboard;