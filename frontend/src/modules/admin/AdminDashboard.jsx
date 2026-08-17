import { useNavigate } from "react-router-dom";

function AdminDashboard() {

  const navigate = useNavigate();

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        padding: "30px",
      }}
    >

      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >

        <div>

          <p
            style={{
              color: "#2563eb",
              fontWeight: "700",
              margin: 0,
            }}
          >
            ADMIN PORTAL
          </p>

          <h1>
            Admin Dashboard
          </h1>

        </div>

        <button
          onClick={() =>
            navigate("/admin-login")
          }
          style={{
            padding: "10px 18px",
            border: "none",
            borderRadius: "8px",
            background: "#ef4444",
            color: "white",
            cursor: "pointer",
          }}
        >
          Logout
        </button>

      </header>


      <section
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
        }}
      >

        <DashboardCard
          title="Total Customers"
          value="1,250"
        />

        <DashboardCard
          title="Active Plans"
          value="15"
        />

        <DashboardCard
          title="Recommended Plans"
          value="8"
        />

        <DashboardCard
          title="Average Usage"
          value="185 min"
        />

      </section>


      <section
        style={{
          marginTop: "25px",
          background: "white",
          padding: "25px",
          borderRadius: "14px",
        }}
      >

        <h2>
          Customer Analytics
        </h2>

        <p>
          Customer usage analytics and
          plan statistics will appear here.
        </p>

      </section>


      <section
        style={{
          marginTop: "25px",
          background: "white",
          padding: "25px",
          borderRadius: "14px",
        }}
      >

        <h2>
          Customer Details
        </h2>

        <p>
          Admin can view customer information,
          usage and recommended plans.
        </p>

      </section>

    </main>
  );
}


function DashboardCard({
  title,
  value,
}) {

  return (
    <div
      style={{
        background: "white",
        padding: "25px",
        borderRadius: "14px",
        boxShadow:
          "0 4px 15px rgba(0,0,0,0.06)",
      }}
    >

      <p
        style={{
          color: "#64748b",
          margin: 0,
        }}
      >
        {title}
      </p>

      <h2
        style={{
          marginTop: "10px",
        }}
      >
        {value}
      </h2>

    </div>
  );
}


export default AdminDashboard;