import { User, CalendarDays, CreditCard, CircleCheck } from "lucide-react";

function CustomerCard({ customer }) {
  const data = customer || {
    customerId: "CUST001",
    accountLength: 128,
    plan: "Premium",
    status: "Active",
  };

  return (
    <div className="customer-card">
      <div className="customer-card-header">
        <div className="customer-avatar">
          <User size={24} />
        </div>

        <div>
          <h2>Customer Information</h2>
          <p>Customer usage profile</p>
        </div>
      </div>

      <div className="customer-card-details">
        <div className="customer-detail">
          <span className="detail-icon">
            <User size={18} />
          </span>

          <div>
            <p>Customer ID</p>
            <strong>{data.customerId}</strong>
          </div>
        </div>

        <div className="customer-detail">
          <span className="detail-icon">
            <CalendarDays size={18} />
          </span>

          <div>
            <p>Account Length</p>
            <strong>{data.accountLength} days</strong>
          </div>
        </div>

        <div className="customer-detail">
          <span className="detail-icon">
            <CreditCard size={18} />
          </span>

          <div>
            <p>Current Plan</p>
            <strong>{data.plan}</strong>
          </div>
        </div>

        <div className="customer-detail">
          <span className="detail-icon">
            <CircleCheck size={18} />
          </span>

          <div>
            <p>Status</p>
            <strong>{data.status}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerCard;