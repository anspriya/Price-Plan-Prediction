import { useState } from "react";
import {
  UserPlus,
  Phone,
  ArrowLeft,
  ArrowRight,
  Sun,
  Sunset,
  Moon,
  Globe,
  ShieldCheck,
} from "lucide-react";

function RegistrationPage({ onRegistered, onBack }) {
  const [phone, setPhone] = useState("");
  const [dayMinutes, setDayMinutes] = useState("");
  const [eveningMinutes, setEveningMinutes] = useState("");
  const [nightMinutes, setNightMinutes] = useState("");
  const [internationalMinutes, setInternationalMinutes] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!phone.trim()) {
      alert("Please enter a customer number.");
      return;
    }

    if (
      dayMinutes === "" ||
      eveningMinutes === "" ||
      nightMinutes === "" ||
      internationalMinutes === ""
    ) {
      alert("Please enter all usage details.");
      return;
    }

    const customer = {
      phone_number: phone.trim(),
      total_day_minutes: Number(dayMinutes),
      total_evening_minutes: Number(eveningMinutes),
      total_night_minutes: Number(nightMinutes),
      total_intl_minutes: Number(internationalMinutes),
    };

    onRegistered(customer);
  };

  return (
    <div className="registration-page">

      {/* LEFT BRANDING */}
      <section className="registration-brand">

        <div className="registration-logo">
          <div className="registration-logo-icon">
            <UserPlus size={25} />
          </div>

          <div>
            <h1>TariffSmart</h1>
            <p>Smart Plans • Maximum Savings</p>
          </div>
        </div>

        <div className="registration-brand-content">

          <div className="premium-badge">
            <UserPlus size={14} />
            NEW CUSTOMER REGISTRATION
          </div>

          <h2>
            Build your
            <span> smarter plan.</span>
          </h2>

          <p>
            Tell us about your communication usage and
            we'll help you discover the most suitable
            telecom plans.
          </p>

          <div className="registration-features">

            <RegistrationFeature
              icon={<Sun size={20} />}
              title="Day Usage"
              text="Tell us your daytime calling usage."
            />

            <RegistrationFeature
              icon={<Moon size={20} />}
              title="Night Usage"
              text="Tell us your nighttime calling usage."
            />

            <RegistrationFeature
              icon={<Globe size={20} />}
              title="International Usage"
              text="Include your international calling needs."
            />

          </div>

        </div>

        <p className="registration-footer">
          TariffSmart • Customer Intelligence Platform
        </p>

      </section>


      {/* RIGHT FORM */}
      <section className="registration-form-section">

        <div className="registration-card">

          <button
            type="button"
            className="back-button"
            onClick={onBack}
          >
            <ArrowLeft size={17} />
            Back to Login
          </button>

          <div className="registration-icon">
            <UserPlus size={25} />
          </div>

          <h2>Create your account</h2>

          <p className="registration-subtitle">
            Enter your customer number and communication usage.
          </p>


          <form
            onSubmit={handleSubmit}
            className="registration-form"
          >

            {/* CUSTOMER NUMBER */}
            <div className="registration-field">

              <label>
                Customer Number
              </label>

              <div className="registration-input">

                <Phone size={18} />

                <input
                  type="text"
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value)
                  }
                  placeholder="Enter customer number"
                />

              </div>

              <small>
                Example: 327-6764
              </small>

            </div>


            <div className="usage-heading">
              <div>
                <h3>Communication Usage</h3>
                <p>
                  Enter your estimated monthly usage in minutes.
                </p>
              </div>
            </div>


            {/* DAY */}
            <UsageInput
              icon={<Sun size={18} />}
              label="Day Minutes"
              value={dayMinutes}
              setValue={setDayMinutes}
              placeholder="Example: 150"
            />


            {/* EVENING */}
            <UsageInput
              icon={<Sunset size={18} />}
              label="Evening Minutes"
              value={eveningMinutes}
              setValue={setEveningMinutes}
              placeholder="Example: 200"
            />


            {/* NIGHT */}
            <UsageInput
              icon={<Moon size={18} />}
              label="Night Minutes"
              value={nightMinutes}
              setValue={setNightMinutes}
              placeholder="Example: 180"
            />


            {/* INTERNATIONAL */}
            <UsageInput
              icon={<Globe size={18} />}
              label="International Minutes"
              value={internationalMinutes}
              setValue={setInternationalMinutes}
              placeholder="Example: 10"
            />


            {/* SECURITY */}
            <div className="registration-security">

              <ShieldCheck size={19} />

              <div>
                <strong>Secure Customer Registration</strong>

                <p>
                  Your usage information is used only
                  to generate personalized tariff recommendations.
                </p>
              </div>

            </div>


            {/* BUTTON */}
            <button
              type="submit"
              className="registration-submit"
            >
              Register & Analyze Usage
              <ArrowRight size={18} />
            </button>

          </form>

        </div>

      </section>

    </div>
  );
}


/* ============================= */
/* USAGE INPUT */
/* ============================= */

function UsageInput({
  icon,
  label,
  value,
  setValue,
  placeholder,
}) {
  return (
    <div className="registration-field">

      <label>
        {label}
      </label>

      <div className="registration-input">

        <span className="usage-input-icon">
          {icon}
        </span>

        <input
          type="number"
          min="0"
          value={value}
          onChange={(e) =>
            setValue(e.target.value)
          }
          placeholder={placeholder}
        />

        <span className="minutes-label">
          min
        </span>

      </div>

    </div>
  );
}


/* ============================= */
/* FEATURE */
/* ============================= */

function RegistrationFeature({
  icon,
  title,
  text,
}) {
  return (
    <div className="registration-feature">

      <div className="registration-feature-icon">
        {icon}
      </div>

      <div>
        <strong>{title}</strong>

        <p>{text}</p>
      </div>

    </div>
  );
}
function UsageInput({
  label,
  name,
  value,
  onChange,
  placeholder,
}) {
  return (
    <div>

      <label
        htmlFor={name}
        className="
          mb-2
          block
          text-sm
          font-bold
          text-slate-700
        "
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type="number"
        min="0"
        step="0.1"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
          w-full
          rounded-xl
          border
          border-slate-200
          bg-slate-50
          px-4
          py-3.5
          text-sm
          outline-none
          transition
          focus:border-purple-500
          focus:ring-2
          focus:ring-purple-100
        "
        required
      />

    </div>
  );
}
export default RegistrationPage;