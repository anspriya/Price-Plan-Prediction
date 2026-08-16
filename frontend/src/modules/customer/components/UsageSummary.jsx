import {
  Phone,
  Clock3,
  Moon,
  Globe,
  Headset,
} from "lucide-react";

function UsageSummary({ usage }) {
  const data = usage || {
    totalCalls: 320,
    totalDayMinutes: 180.5,
    totalEveningMinutes: 200.2,
    totalNightMinutes: 150.8,
    totalIntlMinutes: 12.4,
    customerServiceCalls: 2,
  };

  const usageItems = [
    {
      title: "Total Calls",
      value: data.totalCalls,
      unit: "calls",
      icon: Phone,
    },
    {
      title: "Day Usage",
      value: data.totalDayMinutes,
      unit: "minutes",
      icon: Clock3,
    },
    {
      title: "Evening Usage",
      value: data.totalEveningMinutes,
      unit: "minutes",
      icon: Clock3,
    },
    {
      title: "Night Usage",
      value: data.totalNightMinutes,
      unit: "minutes",
      icon: Moon,
    },
    {
      title: "International Usage",
      value: data.totalIntlMinutes,
      unit: "minutes",
      icon: Globe,
    },
    {
      title: "Customer Service",
      value: data.customerServiceCalls,
      unit: "calls",
      icon: Headset,
    },
  ];

  return (
    <section className="usage-summary">
      <div className="section-heading">
        <h2>Usage Summary</h2>
        <p>Overview of customer calling activity</p>
      </div>

      <div className="usage-summary-grid">
        {usageItems.map((item) => {
          const Icon = item.icon;

          return (
            <div className="usage-card" key={item.title}>
              <div className="usage-card-icon">
                <Icon size={22} />
              </div>

              <div className="usage-card-content">
                <p>{item.title}</p>

                <h3>
                  {item.value}{" "}
                  <span>{item.unit}</span>
                </h3>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default UsageSummary;