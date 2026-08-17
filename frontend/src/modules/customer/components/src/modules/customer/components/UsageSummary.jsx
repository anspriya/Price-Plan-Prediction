import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

import "./UsageSummary.css";

function UsageSummary({ usage = {} }) {

  // Support both API naming styles
  const dayMinutes =
    Number(
      usage.totalDayMinutes ??
      usage.total_day_minutes ??
      0
    );

  const eveningMinutes =
    Number(
      usage.totalEveningMinutes ??
      usage.total_evening_minutes ??
      0
    );

  const nightMinutes =
    Number(
      usage.totalNightMinutes ??
      usage.total_night_minutes ??
      0
    );

  const internationalMinutes =
    Number(
      usage.totalIntlMinutes ??
      usage.total_intl_minutes ??
      usage.total_international_minutes ??
      0
    );


  const dayCalls =
    Number(
      usage.totalDayCalls ??
      usage.total_day_calls ??
      0
    );

  const eveningCalls =
    Number(
      usage.totalEveningCalls ??
      usage.total_evening_calls ??
      0
    );

  const nightCalls =
    Number(
      usage.totalNightCalls ??
      usage.total_night_calls ??
      0
    );

  const internationalCalls =
    Number(
      usage.totalIntlCalls ??
      usage.total_intl_calls ??
      usage.total_international_calls ??
      0
    );


  const customerServiceCalls =
    Number(
      usage.customerServiceCalls ??
      usage.customer_service_calls ??
      0
    );


  // Calculate totals
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


  // Usage data
  const usageData = [
    {
      name: "Day",
      value: dayMinutes,
    },
    {
      name: "Evening",
      value: eveningMinutes,
    },
    {
      name: "Night",
      value: nightMinutes,
    },
    {
      name: "International",
      value: internationalMinutes,
    },
  ];


  // Call data
  const callData = [
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


  const colors = [
    "#2563eb",
    "#7c3aed",
    "#06b6d4",
    "#f59e0b",
  ];


  return (
    <div className="usage-summary-card">

      {/* =========================
          HEADER
      ========================== */}

      <div className="usage-summary-title">

        <div className="usage-summary-icon">
          📊
        </div>

        <div>
          <h2>Usage Summary</h2>

          <p>
            Overview of your calling activity
          </p>
        </div>

      </div>


      {/* =========================
          TOTAL CALLS
      ========================== */}

      <div className="total-call-box">

        <div className="total-call-icon">
          📞
        </div>

        <div>
          <span>Total Calls</span>

          <strong>
            {totalCalls}
          </strong>

          <small>calls</small>
        </div>

      </div>


      {/* =========================
          USAGE MINUTES
      ========================== */}

      <div className="usage-chart-section">

        <div className="chart-header">

          <div>
            <h3>
              Usage Minutes
            </h3>

            <p>
              Calling time by period
            </p>
          </div>

          <div className="chart-total">
            <span>Total Usage</span>

            <strong>
              {totalMinutes.toFixed(1)} min
            </strong>
          </div>

        </div>


        <div className="bar-chart">

          <ResponsiveContainer
            width="100%"
            height={300}
          >

            <BarChart
              data={usageData}
              layout="vertical"
              margin={{
                top: 10,
                right: 30,
                left: 20,
                bottom: 10,
              }}
            >

              <CartesianGrid
                strokeDasharray="3 3"
                horizontal={false}
                stroke="#e2e8f0"
              />

              <XAxis
                type="number"
                stroke="#64748b"
              />

              <YAxis
                type="category"
                dataKey="name"
                width={90}
                stroke="#334155"
                tick={{
                  fontSize: 13,
                  fontWeight: 600,
                }}
              />

              <Tooltip
                formatter={(value) => [
                  `${Number(value).toFixed(1)} min`,
                  "Usage",
                ]}
              />

              <Bar
                dataKey="value"
                barSize={32}
                radius={[0, 8, 8, 0]}
              >

                {usageData.map(
                  (item, index) => (
                    <Cell
                      key={item.name}
                      fill={
                        colors[index]
                      }
                    />
                  )
                )}

              </Bar>

            </BarChart>

          </ResponsiveContainer>

        </div>


        {/* Usage percentage */}

        <div className="usage-values">

          {usageData.map(
            (item, index) => {

              const percentage =
                totalMinutes > 0
                  ? (
                      (item.value /
                        totalMinutes) *
                      100
                    ).toFixed(1)
                  : "0.0";

              return (
                <div
                  className="usage-value"
                  key={item.name}
                >

                  <div className="usage-name">

                    <span
                      className="usage-dot"
                      style={{
                        backgroundColor:
                          colors[index],
                      }}
                    />

                    {item.name}

                  </div>

                  <strong>
                    {item.value.toFixed(1)} min
                  </strong>

                  <span>
                    {percentage}%
                  </span>

                </div>
              );
            }
          )}

        </div>

      </div>


      {/* =========================
          CALL DISTRIBUTION
      ========================== */}

      <div className="usage-chart-section">

        <div className="chart-header">

          <div>
            <h3>
              Call Distribution
            </h3>

            <p>
              Number of calls by period
            </p>
          </div>

          <div className="chart-total">
            <span>Total Calls</span>

            <strong>
              {totalCalls} calls
            </strong>
          </div>

        </div>


        <div className="bar-chart">

          <ResponsiveContainer
            width="100%"
            height={300}
          >

            <BarChart
              data={callData}
              layout="vertical"
              margin={{
                top: 10,
                right: 30,
                left: 20,
                bottom: 10,
              }}
            >

              <CartesianGrid
                strokeDasharray="3 3"
                horizontal={false}
                stroke="#e2e8f0"
              />

              <XAxis
                type="number"
                stroke="#64748b"
              />

              <YAxis
                type="category"
                dataKey="name"
                width={90}
                stroke="#334155"
                tick={{
                  fontSize: 13,
                  fontWeight: 600,
                }}
              />

              <Tooltip
                formatter={(value) => [
                  `${value} calls`,
                  "Calls",
                ]}
              />

              <Bar
                dataKey="value"
                barSize={32}
                radius={[0, 8, 8, 0]}
              >

                {callData.map(
                  (item, index) => (
                    <Cell
                      key={item.name}
                      fill={
                        colors[index]
                      }
                    />
                  )
                )}

              </Bar>

            </BarChart>

          </ResponsiveContainer>

        </div>


        <div className="usage-values">

          {callData.map(
            (item, index) => {

              const percentage =
                totalCalls > 0
                  ? (
                      (item.value /
                        totalCalls) *
                      100
                    ).toFixed(1)
                  : "0.0";

              return (
                <div
                  className="usage-value"
                  key={item.name}
                >

                  <div className="usage-name">

                    <span
                      className="usage-dot"
                      style={{
                        backgroundColor:
                          colors[index],
                      }}
                    />

                    {item.name}

                  </div>

                  <strong>
                    {item.value} calls
                  </strong>

                  <span>
                    {percentage}%
                  </span>

                </div>
              );
            }
          )}

        </div>

      </div>


      {/* =========================
          CUSTOMER SERVICE
      ========================== */}

      <div className="customer-service-box">

        <div className="service-icon">
          🎧
        </div>

        <div>
          <strong>
            Customer Service
          </strong>

          <span>
            {customerServiceCalls} calls
          </span>
        </div>

      </div>

    </div>
  );
}

export default UsageSummary;