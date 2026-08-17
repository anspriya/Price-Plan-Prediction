import { useState } from "react";

import {
  BrainCircuit,
  Phone,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  User,
  Shield,
  BarChart3,
  Target,
  UserPlus,
  Sun,
  Moon,
  Clock,
  Globe,
  LogIn,
  ArrowLeft,
} from "lucide-react";

import { getCustomer } from "../services/api";

// =========================================================
// PERMANENT ADMIN LOGIN
// =========================================================

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123";

// =========================================================
// LOGIN COMPONENT
// =========================================================

function Login({ onLogin, onRegister }) {
  const [role, setRole] = useState("customer");

  // Login state
  const [phone, setPhone] = useState("");
  const [adminUsername, setAdminUsername] = useState("");
  const [password, setPassword] = useState("");

  // Registration state
  const [showRegistration, setShowRegistration] = useState(false);

  const [registerPhone, setRegisterPhone] = useState("");
  const [dayMinutes, setDayMinutes] = useState("");
  const [eveningMinutes, setEveningMinutes] = useState("");
  const [nightMinutes, setNightMinutes] = useState("");
  const [internationalMinutes, setInternationalMinutes] = useState("");

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // =========================================================
  // OPEN REGISTRATION
  // =========================================================

  function openRegistration() {
    setShowRegistration(true);
    setError("");

    setRegisterPhone("");
    setDayMinutes("");
    setEveningMinutes("");
    setNightMinutes("");
    setInternationalMinutes("");
  }

  // =========================================================
  // BACK TO LOGIN
  // =========================================================

  function backToLogin() {
    setShowRegistration(false);
    setError("");
  }

  // =========================================================
  // HANDLE LOGIN
  // =========================================================

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");

    // =======================================================
    // CUSTOMER LOGIN
    // =======================================================

    if (role === "customer") {
      const cleanPhone = phone.trim().replace(/\s+/g, "");

      if (!cleanPhone) {
        setError("Please enter your phone number.");
        return;
      }

      console.log("Searching customer:", cleanPhone);

      try {
        setLoading(true);

        // ---------------------------------------------------
        // GET CUSTOMER FROM BACKEND
        // ---------------------------------------------------

        const customer = await getCustomer(cleanPhone);

        console.log("CUSTOMER FOUND:", customer);

        // ---------------------------------------------------
        // CUSTOMER LOGIN SUCCESS
        // ---------------------------------------------------

        onLogin({
          ...customer,

          role: "customer",

          phone_number:
            customer?.phone_number ||
            customer?.phone ||
            cleanPhone,
        });
      } catch (error) {
        console.error("CUSTOMER LOGIN ERROR:", error);

        const errorMessage = error?.message || "";

        if (
          errorMessage
            .toLowerCase()
            .includes("not found")
        ) {
          setError(
            "Phone number not found in the dataset."
          );
        } else {
          setError(
            "Unable to connect to the backend. Please make sure FastAPI is running."
          );
        }
      } finally {
        setLoading(false);
      }

      return;
    }

    // =======================================================
    // ADMIN LOGIN
    // =======================================================

    if (role === "admin") {
      if (!adminUsername.trim()) {
        setError("Please enter admin username.");
        return;
      }

      if (!password) {
        setError("Please enter admin password.");
        return;
      }

      const enteredUsername = adminUsername.trim();

      const validUsername =
        enteredUsername === ADMIN_USERNAME;

      const validPassword =
        password === ADMIN_PASSWORD;

      if (validUsername && validPassword) {
        console.log("ADMIN LOGIN SUCCESS");

        onLogin({
          role: "admin",
          username: ADMIN_USERNAME,
          isAdmin: true,
          admin: true,
        });
      } else {
        setError(
          "Invalid admin username or password."
        );
      }
    }
  }

  // =========================================================
  // HANDLE CUSTOMER REGISTRATION
  // =========================================================

  async function handleRegistration(event) {
    event.preventDefault();

    setError("");

    const cleanPhone = registerPhone
      .trim()
      .replace(/\s+/g, "");

    // -------------------------------------------------------
    // VALIDATE PHONE
    // -------------------------------------------------------

    if (!cleanPhone) {
      setError("Please enter your customer phone number.");
      return;
    }

    // -------------------------------------------------------
    // VALIDATE USAGE
    // -------------------------------------------------------

    if (
      dayMinutes === "" ||
      eveningMinutes === "" ||
      nightMinutes === "" ||
      internationalMinutes === ""
    ) {
      setError("Please enter all usage values.");
      return;
    }

    const day = Number(dayMinutes);
    const evening = Number(eveningMinutes);
    const night = Number(nightMinutes);
    const international = Number(
      internationalMinutes
    );

    if (
      Number.isNaN(day) ||
      Number.isNaN(evening) ||
      Number.isNaN(night) ||
      Number.isNaN(international)
    ) {
      setError("Please enter valid numeric usage values.");
      return;
    }

    if (
      day < 0 ||
      evening < 0 ||
      night < 0 ||
      international < 0
    ) {
      setError("Usage minutes cannot be negative.");
      return;
    }

    // -------------------------------------------------------
    // CREATE CUSTOMER OBJECT
    // -------------------------------------------------------

    const newCustomer = {
      role: "customer",

      phone_number: cleanPhone,

      total_day_minutes: day,

      total_evening_minutes: evening,

      total_night_minutes: night,

      total_intl_minutes: international,

      international_minutes: international,

      day_minutes: day,

      evening_minutes: evening,

      night_minutes: night,

      registered_customer: true,

      account_length: 0,

      total_day_calls: 0,

      total_evening_calls: 0,

      total_night_calls: 0,

      total_intl_calls: 0,

      customer_service_calls: 0,

      voice_mail: 0,

      vmail_message: 0,
    };

    console.log(
      "NEW CUSTOMER REGISTRATION:",
      newCustomer
    );

    try {
      setLoading(true);

      // -----------------------------------------------------
      // IF APP HAS REGISTRATION HANDLER
      // -----------------------------------------------------

      if (onRegister) {
        await onRegister(newCustomer);
      }

      // -----------------------------------------------------
      // SAVE TEMPORARILY IN LOCAL STORAGE
      // -----------------------------------------------------

      localStorage.setItem(
        "tariffsmart_registered_customer",
        JSON.stringify(newCustomer)
      );

      // -----------------------------------------------------
      // OPEN CUSTOMER DASHBOARD
      // -----------------------------------------------------

      if (onLogin) {
        onLogin(newCustomer);
      }
    } catch (error) {
      console.error(
        "REGISTRATION ERROR:",
        error
      );

      setError(
        error?.message ||
          "Unable to register customer."
      );
    } finally {
      setLoading(false);
    }
  }

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div
      className="
        login-background
        min-h-screen
        lg:grid
        lg:grid-cols-2
      "
    >
      {/* =====================================================
          LEFT SIDE
      ===================================================== */}

      <section
        className="
          login-brand
          hidden
          overflow-hidden
          p-12
          text-white
          lg:flex
          lg:flex-col
          lg:justify-between
          xl:p-14
        "
      >
        {/* BRAND */}

        <div className="flex items-center gap-3">
          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              bg-white/10
            "
          >
            <BrainCircuit size={25} />
          </div>

          <div>
            <h1 className="text-2xl font-extrabold">
              TariffSmart
            </h1>

            <p className="text-xs text-purple-200">
              Smart Plans • Maximum Savings
            </p>
          </div>
        </div>

        {/* HERO CONTENT */}

        <div className="max-w-4xl">
          <div className="premium-badge">
            <BrainCircuit size={13} />
            AI POWERED TELECOM ANALYTICS
          </div>

          <h2
            className="
              mt-7
              text-5xl
              font-extrabold
              leading-tight
            "
          >
            Your usage.

            <span className="block text-purple-300">
              Your best plan.
            </span>
          </h2>

          <p
            className="
              mt-6
              max-w-2xl
              text-sm
              leading-7
              text-purple-100/70
            "
          >
            Analyze actual customer usage
            and discover the most suitable
            tariff plans.
          </p>

          <div className="login-feature-area">
            <div className="login-feature-list">
              <Feature
                icon={<BarChart3 size={20} />}
                title="Usage Intelligence"
                text="Analyze actual customer usage."
              />

              <Feature
                icon={<Target size={20} />}
                title="Top 3 Recommendations"
                text="Find suitable tariff plans."
              />

              <Feature
                icon={<ShieldCheck size={20} />}
                title="Dataset Verification"
                text="Only existing customers are analyzed."
              />
            </div>

            {/* VISUAL CARDS */}

            <div className="login-visual-cards">
              {/* CARD 1 */}

              <div className="login-visual-card">
                <div className="recommendation-illustration">
                  <div className="recommendation-star">
                    ★
                  </div>

                  <div className="recommendation-lines">
                    <span></span>
                    <span></span>
                  </div>

                  <div className="recommendation-podium">
                    <div
                      className="
                        podium-column
                        podium-column-left
                      "
                    >
                      <span>2</span>
                    </div>

                    <div
                      className="
                        podium-column
                        podium-column-center
                      "
                    >
                      <span>1</span>
                    </div>

                    <div
                      className="
                        podium-column
                        podium-column-right
                      "
                    >
                      <span>3</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* CARD 2 */}

              <div className="login-visual-card">
                <div className="cloud-database-illustration">
                  <div className="cloud-shape">
                    <div
                      className="
                        cloud-circle
                        cloud-circle-one
                      "
                    ></div>

                    <div
                      className="
                        cloud-circle
                        cloud-circle-two
                      "
                    ></div>

                    <div className="cloud-base"></div>
                  </div>

                  <div className="database-shape">
                    <div className="database-top"></div>
                    <div className="database-middle"></div>
                    <div className="database-bottom"></div>
                  </div>

                  <div className="database-check">
                    <span>✓</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}

        <p className="text-xs text-purple-200/50">
          TariffSmart • Customer Intelligence Platform
        </p>
      </section>

      {/* =====================================================
          RIGHT SIDE
      ===================================================== */}

      <section
        className="
          flex
          min-h-screen
          items-center
          justify-center
          p-5
          sm:p-10
        "
      >
        <div
          className="
            login-panel
            w-full
            max-w-md
            p-8
          "
        >
          {/* =================================================
              REGISTRATION PAGE
          ================================================= */}

          {showRegistration ? (
            <>
              {/* REGISTRATION HEADER */}

              <div className="mb-7">
                <button
                  type="button"
                  onClick={backToLogin}
                  className="
                    mb-5
                    flex
                    items-center
                    gap-2
                    text-sm
                    font-semibold
                    text-purple-600
                    hover:text-purple-800
                  "
                >
                  <ArrowLeft size={17} />
                  Back to Login
                </button>

                <div className="icon-box mb-5">
                  <UserPlus size={23} />
                </div>

                <h2
                  className="
                    text-3xl
                    font-extrabold
                    text-slate-900
                  "
                >
                  Create an account
                </h2>

                <p
                  className="
                    mt-2
                    text-sm
                    text-slate-500
                  "
                >
                  Enter your details and usage
                  information to create your customer
                  profile.
                </p>
              </div>

              {/* REGISTRATION FORM */}

              <form
                onSubmit={handleRegistration}
                className="space-y-4"
              >
                {/* PHONE */}

                <div>
                  <label className="form-label">
                    Customer Phone Number
                  </label>

                  <div
                    className="
                      tariff-input
                      flex
                      h-13
                      items-center
                    "
                  >
                    <Phone
                      size={18}
                      className="
                        mr-3
                        text-slate-400
                      "
                    />

                    <input
                      type="text"
                      value={registerPhone}
                      onChange={(event) => {
                        setRegisterPhone(
                          event.target.value
                        );
                        setError("");
                      }}
                      placeholder="Enter phone number"
                      className="
                        w-full
                        bg-transparent
                        text-sm
                        outline-none
                      "
                    />
                  </div>
                </div>

                {/* DAY */}

                <UsageInput
                  icon={<Sun size={18} />}
                  label="Day Minutes"
                  value={dayMinutes}
                  onChange={setDayMinutes}
                  placeholder="Example: 150"
                />

                {/* EVENING */}

                <UsageInput
                  icon={<Clock size={18} />}
                  label="Evening Minutes"
                  value={eveningMinutes}
                  onChange={setEveningMinutes}
                  placeholder="Example: 200"
                />

                {/* NIGHT */}

                <UsageInput
                  icon={<Moon size={18} />}
                  label="Night Minutes"
                  value={nightMinutes}
                  onChange={setNightMinutes}
                  placeholder="Example: 180"
                />

                {/* INTERNATIONAL */}

                <UsageInput
                  icon={<Globe size={18} />}
                  label="International Minutes"
                  value={internationalMinutes}
                  onChange={setInternationalMinutes}
                  placeholder="Example: 10"
                />

                {/* ERROR */}

                {error && (
                  <div
                    className="
                      notification
                      notification-error
                    "
                  >
                    ⚠️ {error}
                  </div>
                )}

                {/* REGISTER BUTTON */}

                <button
                  type="submit"
                  disabled={loading}
                  className="
                    tariff-button
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-3
                  "
                >
                  <span>
                    {loading
                      ? "Creating Account..."
                      : "Register & Continue"}
                  </span>

                  {!loading && (
                    <ArrowRight size={18} />
                  )}
                </button>
              </form>

              {/* SECURITY */}

              <SecurityInformation />
            </>
          ) : (
            <>
              {/* =================================================
                  LOGIN HEADER
              ================================================= */}

              <div className="mb-7">
                <div className="icon-box mb-5">
                  <ShieldCheck size={23} />
                </div>

                <h2
                  className="
                    text-3xl
                    font-extrabold
                    text-slate-900
                  "
                >
                  Welcome back
                </h2>

                <p
                  className="
                    mt-2
                    text-sm
                    text-slate-500
                  "
                >
                  Sign in to continue to TariffSmart.
                </p>
              </div>

              {/* =================================================
                  ROLE SELECTION
              ================================================= */}

              <div
                className="
                  mb-7
                  grid
                  grid-cols-2
                  gap-3
                "
              >
                {/* CUSTOMER */}

                <button
                  type="button"
                  onClick={() => {
                    setRole("customer");
                    setError("");
                    setPassword("");
                  }}
                  className={`
                    role-button
                    ${
                      role === "customer"
                        ? "role-active"
                        : ""
                    }
                  `}
                >
                  <User size={18} />

                  <span>
                    <strong>Customer</strong>

                    <small>
                      No password required
                    </small>
                  </span>
                </button>

                {/* ADMIN */}

                <button
                  type="button"
                  onClick={() => {
                    setRole("admin");
                    setError("");
                  }}
                  className={`
                    role-button
                    ${
                      role === "admin"
                        ? "role-active"
                        : ""
                    }
                  `}
                >
                  <Shield size={18} />

                  <span>
                    <strong>Admin</strong>

                    <small>
                      Password required
                    </small>
                  </span>
                </button>
              </div>

              {/* =================================================
                  LOGIN FORM
              ================================================= */}

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                {/* CUSTOMER LOGIN */}

                {role === "customer" && (
                  <div>
                    <label className="form-label">
                      Customer Phone Number
                    </label>

                    <div
                      className="
                        tariff-input
                        flex
                        h-13
                        items-center
                      "
                    >
                      <Phone
                        size={18}
                        className="
                          mr-3
                          text-slate-400
                        "
                      />

                      <input
                        value={phone}
                        onChange={(event) => {
                          setPhone(
                            event.target.value
                          );
                          setError("");
                        }}
                        type="text"
                        placeholder="Enter phone number"
                        autoComplete="tel"
                        className="
                          w-full
                          bg-transparent
                          text-sm
                          outline-none
                        "
                      />
                    </div>

                    <p
                      className="
                        mt-2
                        text-xs
                        text-slate-400
                      "
                    >
                      Enter a phone number available
                      in the customer dataset.
                    </p>
                  </div>
                )}

                {/* ADMIN LOGIN */}

                {role === "admin" && (
                  <>
                    {/* ADMIN USERNAME */}

                    <div>
                      <label className="form-label">
                        Admin Username
                      </label>

                      <div
                        className="
                          tariff-input
                          flex
                          h-13
                          items-center
                        "
                      >
                        <User
                          size={18}
                          className="
                            mr-3
                            text-slate-400
                          "
                        />

                        <input
                          value={adminUsername}
                          onChange={(event) => {
                            setAdminUsername(
                              event.target.value
                            );
                            setError("");
                          }}
                          type="text"
                          placeholder="Enter admin username"
                          autoComplete="username"
                          className="
                            w-full
                            bg-transparent
                            text-sm
                            outline-none
                          "
                        />
                      </div>
                    </div>

                    {/* PASSWORD */}

                    <div>
                      <label className="form-label">
                        Admin Password
                      </label>

                      <div
                        className="
                          tariff-input
                          flex
                          h-13
                          items-center
                        "
                      >
                        <Lock
                          size={18}
                          className="
                            mr-3
                            text-slate-400
                          "
                        />

                        <input
                          value={password}
                          onChange={(event) => {
                            setPassword(
                              event.target.value
                            );
                            setError("");
                          }}
                          type={
                            showPassword
                              ? "text"
                              : "password"
                          }
                          placeholder="Enter password"
                          autoComplete="current-password"
                          className="
                            w-full
                            bg-transparent
                            text-sm
                            outline-none
                          "
                        />

                        <button
                          type="button"
                          onClick={() =>
                            setShowPassword(
                              !showPassword
                            )
                          }
                          className="
                            rounded-lg
                            p-1
                            text-slate-400
                            hover:text-purple-600
                          "
                        >
                          {showPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {/* ERROR */}

                {error && (
                  <div
                    className="
                      notification
                      notification-error
                    "
                  >
                    ⚠️ {error}
                  </div>
                )}

                {/* ANALYZE BUTTON */}

                <button
                  type="submit"
                  disabled={loading}
                  className="
                    tariff-button
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-3
                  "
                >
                  <span>
                    {loading
                      ? role === "customer"
                        ? "Finding Customer..."
                        : "Signing In..."
                      : role === "customer"
                      ? "Analyze My Usage"
                      : "Admin Sign In"}
                  </span>

                  {!loading && (
                    <ArrowRight size={18} />
                  )}
                </button>
              </form>

              {/* =================================================
                  CREATE ACCOUNT LINK
              ================================================= */}

              {role === "customer" && (
                <div
                  className="
                    mt-5
                    text-center
                  "
                >
                  <span
                    className="
                      text-sm
                      text-slate-500
                    "
                  >
                    Don't have an account?
                  </span>

                  <button
                    type="button"
                    onClick={openRegistration}
                    className="
                      ml-1
                      text-sm
                      font-bold
                      text-purple-600
                      hover:text-purple-800
                      hover:underline
                    "
                  >
                    Create an account
                  </button>
                </div>
              )}

              {/* SECURITY INFORMATION */}

              <SecurityInformation />
            </>
          )}
        </div>
      </section>
    </div>
  );
}

// =========================================================
// USAGE INPUT
// =========================================================

function UsageInput({
  icon,
  label,
  value,
  onChange,
  placeholder,
}) {
  return (
    <div>
      <label className="form-label">
        {label}
      </label>

      <div
        className="
          tariff-input
          flex
          h-13
          items-center
        "
      >
        <span
          className="
            mr-3
            text-purple-500
          "
        >
          {icon}
        </span>

        <input
          type="number"
          min="0"
          step="0.1"
          value={value}
          onChange={(event) =>
            onChange(event.target.value)
          }
          placeholder={placeholder}
          className="
            w-full
            bg-transparent
            text-sm
            outline-none
          "
        />
      </div>
    </div>
  );
}

// =========================================================
// SECURITY INFORMATION
// =========================================================

function SecurityInformation() {
  return (
    <div
      className="
        mt-6
        rounded-2xl
        bg-slate-50
        p-4
      "
    >
      <div className="flex gap-3">
        <ShieldCheck
          size={19}
          className="
            shrink-0
            text-emerald-500
          "
        />

        <div>
          <p className="text-xs font-bold">
            Secure Dataset Access
          </p>

          <p
            className="
              mt-1
              text-[10px]
              leading-5
              text-slate-400
            "
          >
            Customer information is retrieved
            directly from your backend dataset.
          </p>
        </div>
      </div>
    </div>
  );
}

// =========================================================
// FEATURE COMPONENT
// =========================================================

function Feature({
  icon,
  title,
  text,
}) {
  return (
    <div
      className="
        flex
        items-center
        gap-4
      "
    >
      <div
        className="
          flex
          h-11
          w-11
          shrink-0
          items-center
          justify-center
          rounded-xl
          bg-white/10
        "
      >
        {icon}
      </div>

      <div>
        <h3
          className="
            text-sm
            font-semibold
          "
        >
          {title}
        </h3>

        <p
          className="
            mt-1
            text-xs
            text-purple-200/60
          "
        >
          {text}
        </p>
      </div>
    </div>
  );
}

export default Login;