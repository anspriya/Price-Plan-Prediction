import {
  Phone,
  Clock3,
  Moon,
  Globe,
  Headset,
} from "lucide-react";

function UsageTable({ usage }) {
  const data = usage || {
    totalDayMinutes: 180.5,
    totalDayCalls: 95,
    totalEveningMinutes: 200.2,
    totalEveningCalls: 110,
    totalNightMinutes: 150.8,
    totalNightCalls: 85,
    totalIntlMinutes: 12.4,
    totalIntlCalls: 6,
    customerServiceCalls: 2,
  };

  const rows = [
    {
      category: "Day",
      icon: Clock3,
      minutes: data.totalDayMinutes,
      calls: data.totalDayCalls,
    },
    {
      category: "Evening",
      icon: Phone,
      minutes: data.totalEveningMinutes,
      calls: data.totalEveningCalls,
    },
    {
      category: "Night",
      icon: Moon,
      minutes: data.totalNightMinutes,
      calls: data.totalNightCalls,
    },
    {
      category: "International",
      icon: Globe,
      minutes: data.totalIntlMinutes,
      calls: data.totalIntlCalls,
    },
  ];

  return (
    <section className="usage-table-section">
      <div className="section-heading">
        <div className="section-heading-title">
          <Phone size={22} />
          <h2>Detailed Usage</h2>
        </div>

        <p>Detailed customer calling activity</p>
      </div>

      <div className="usage-table-wrapper">
        <table className="usage-table">
          <thead>
            <tr>
              <th>Usage Type</th>
              <th>Total Minutes</th>
              <th>Total Calls</th>
              <th>Average Minutes / Call</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row) => {
              const Icon = row.icon;

              const minutes = Number(row.minutes) || 0;
              const calls = Number(row.calls) || 0;

              const average =
                calls > 0 ? minutes / calls : 0;

              return (
                <tr key={row.category}>
                  <td>
                    <div className="usage-type">
                      <span className="table-icon">
                        <Icon size={18} />
                      </span>

                      <strong>{row.category}</strong>
                    </div>
                  </td>

                  <td>{minutes.toFixed(1)} min</td>

                  <td>{calls}</td>

                  <td>{average.toFixed(2)} min</td>
                </tr>
              );
            })}

            <tr className="service-row">
              <td>
                <div className="usage-type">
                  <span className="table-icon">
                    <Headset size={18} />
                  </span>

                  <strong>Customer Service</strong>
                </div>
              </td>

              <td>—</td>

              <td>{data.customerServiceCalls}</td>

              <td>—</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default UsageTable;