import { BarChart3 } from "lucide-react";

function UsageChart({ usage }) {
  const data = usage || {
    day: 180.5,
    evening: 200.2,
    night: 150.8,
    international: 12.4,
  };

  const chartData = [
    {
      label: "Day",
      value: Number(data.day) || 0,
    },
    {
      label: "Evening",
      value: Number(data.evening) || 0,
    },
    {
      label: "Night",
      value: Number(data.night) || 0,
    },
    {
      label: "International",
      value: Number(data.international) || 0,
    },
  ];

  const maxValue = Math.max(...chartData.map((item) => item.value), 1);

  return (
    <section className="usage-chart">
      <div className="section-heading">
        <div className="section-heading-title">
          <BarChart3 size={22} />
          <h2>Usage Analysis</h2>
        </div>

        <p>Customer usage by call period</p>
      </div>

      <div className="chart-container">
        {chartData.map((item) => {
          const height = `${(item.value / maxValue) * 100}%`;

          return (
            <div className="chart-column" key={item.label}>
              <div className="chart-value">
                {item.value.toFixed(1)}
              </div>

              <div className="chart-bar-wrapper">
                <div
                  className="chart-bar"
                  style={{ height }}
                  title={`${item.label}: ${item.value} minutes`}
                ></div>
              </div>

              <span className="chart-label">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>

      <div className="chart-footer">
        <span>Usage measured in minutes</span>
      </div>
    </section>
  );
}

export default UsageChart;