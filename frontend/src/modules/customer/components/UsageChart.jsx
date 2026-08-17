import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import "./UsageChart.css";


function UsageChart({ usage }) {

  const usageData = [
    {
      name: "Day",
      value: Number(usage?.day) || 0,
    },
    {
      name: "Evening",
      value: Number(usage?.evening) || 0,
    },
    {
      name: "Night",
      value: Number(usage?.night) || 0,
    },
    {
      name: "International",
      value: Number(usage?.international) || 0,
    },
  ];


  const callData = [
    {
      name: "Day",
      value: Number(usage?.dayCalls) || 0,
    },
    {
      name: "Evening",
      value: Number(usage?.eveningCalls) || 0,
    },
    {
      name: "Night",
      value: Number(usage?.nightCalls) || 0,
    },
    {
      name: "International",
      value: Number(usage?.internationalCalls) || 0,
    },
  ];


  const usageTotal = usageData.reduce(
    (total, item) => total + item.value,
    0
  );


  const callTotal = callData.reduce(
    (total, item) => total + item.value,
    0
  );


  const COLORS = [
    "#2563eb",
    "#7c3aed",
    "#06b6d4",
    "#f59e0b",
  ];


  return (

    <div className="usage-chart-container">


      {/* HEADER */}

      <div className="usage-chart-header">

        <div>

          <span className="chart-label">
            ANALYTICS
          </span>

          <h2>
            Usage Analysis
          </h2>

          <p>
            Understand how your calling usage
            is distributed across different periods.
          </p>

        </div>


        <div className="total-usage">

          <span>
            Total Usage
          </span>

          <strong>
            {usageTotal.toFixed(1)} min
          </strong>

        </div>

      </div>


      {/* CHARTS */}

      <div className="charts-grid">


        {/* =========================================
            USAGE MINUTES PIE CHART
        ========================================= */}

        <div className="chart-box">

          <div className="chart-title">

            <span className="chart-icon">
              📊
            </span>

            <div>

              <h3>
                Usage Minutes
              </h3>

              <p>
                Calling time by period
              </p>

            </div>

          </div>


          <div className="pie-wrapper">

            <ResponsiveContainer
              width="100%"
              height={320}
            >

              <PieChart>

                <Pie
                  data={usageData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={115}
                  paddingAngle={3}
                  dataKey="value"
                  nameKey="name"
                >

                  {usageData.map(
                    (entry, index) => (

                      <Cell
                        key={`usage-${index}`}
                        fill={
                          COLORS[index % COLORS.length]
                        }
                      />

                    )
                  )}

                </Pie>


                <Tooltip
                  formatter={(value) =>
                    `${Number(value).toFixed(1)} min`
                  }
                />


                <Legend />

              </PieChart>

            </ResponsiveContainer>


            <div className="chart-center">

              <strong>
                {usageTotal.toFixed(1)}
              </strong>

              <span>
                Minutes
              </span>

            </div>

          </div>


          {/* USAGE VALUES */}

          <div className="chart-details">

            {usageData.map(
              (item, index) => {

                const percentage =
                  usageTotal > 0
                    ? (
                        (item.value /
                          usageTotal) *
                        100
                      ).toFixed(1)
                    : "0.0";


                return (

                  <div
                    className="detail-row"
                    key={item.name}
                  >

                    <div className="detail-name">

                      <span
                        className="color-dot"
                        style={{
                          backgroundColor:
                            COLORS[
                              index %
                              COLORS.length
                            ],
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


        {/* =========================================
            CALL DISTRIBUTION PIE CHART
        ========================================= */}

        <div className="chart-box">

          <div className="chart-title">

            <span className="chart-icon">
              📞
            </span>

            <div>

              <h3>
                Call Distribution
              </h3>

              <p>
                Number of calls by period
              </p>

            </div>

          </div>


          <div className="pie-wrapper">

            <ResponsiveContainer
              width="100%"
              height={320}
            >

              <PieChart>

                <Pie
                  data={callData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={115}
                  paddingAngle={3}
                  dataKey="value"
                  nameKey="name"
                >

                  {callData.map(
                    (entry, index) => (

                      <Cell
                        key={`calls-${index}`}
                        fill={
                          COLORS[index % COLORS.length]
                        }
                      />

                    )
                  )}

                </Pie>


                <Tooltip
                  formatter={(value) =>
                    `${value} calls`
                  }
                />


                <Legend />

              </PieChart>

            </ResponsiveContainer>


            <div className="chart-center">

              <strong>
                {callTotal}
              </strong>

              <span>
                Calls
              </span>

            </div>

          </div>


          {/* CALL VALUES */}

          <div className="chart-details">

            {callData.map(
              (item, index) => {

                const percentage =
                  callTotal > 0
                    ? (
                        (item.value /
                          callTotal) *
                        100
                      ).toFixed(1)
                    : "0.0";


                return (

                  <div
                    className="detail-row"
                    key={item.name}
                  >

                    <div className="detail-name">

                      <span
                        className="color-dot"
                        style={{
                          backgroundColor:
                            COLORS[
                              index %
                              COLORS.length
                            ],
                        }}
                      />

                      {item.name}

                    </div>


                    <strong>
                      {item.value}
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


      </div>


      <div className="chart-footer">

        📈 Usage measured in minutes

      </div>


    </div>

  );
}


export default UsageChart;  