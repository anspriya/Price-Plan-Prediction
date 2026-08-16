import CustomerCard from "../components/CustomerCard";
import UsageSummary from "../components/UsageSummary";
import UsageChart from "../components/UsageChart";
import UsageTable from "../components/UsageTable";
import "../styles/customer.css";

function CustomerDashboard() {
  const customer = {
    customerId: "CUST001",
    accountLength: 128,
    plan: "Premium",
    status: "Active",
  };

  const usage = {
    totalCalls: 296,

    totalDayMinutes: 180.5,
    totalDayCalls: 95,

    totalEveningMinutes: 200.2,
    totalEveningCalls: 110,

    totalNightMinutes: 150.8,
    totalNightCalls: 85,

    totalIntlMinutes: 12.4,
    totalIntlCalls: 6,

    customerServiceCalls: 2,

    // Data used by UsageChart
    day: 180.5,
    evening: 200.2,
    night: 150.8,
    international: 12.4,
  };

  return (
    <main className="customer-dashboard">
      <div className="customer-dashboard-header">
        <div>
          <p className="dashboard-label">CUSTOMER MODULE</p>

          <h1>Customer Usage Dashboard</h1>

          <p className="dashboard-description">
            View customer information, calling activity,
            and usage patterns.
          </p>
        </div>
      </div>

      <div className="customer-dashboard-content">
        <CustomerCard customer={customer} />

        <UsageSummary usage={usage} />

        <UsageChart
          usage={{
            day: usage.day,
            evening: usage.evening,
            night: usage.night,
            international: usage.international,
          }}
        />

        <UsageTable usage={usage} />
      </div>
    </main>
  );
}

export default CustomerDashboard;