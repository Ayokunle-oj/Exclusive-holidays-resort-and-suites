import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import "./Booking.css";

// Replace with the hotel's real WhatsApp number in international format
// (no +, no spaces, no dashes). Example: 08012345678 -> 2348012345678
const WHATSAPP_NUMBER = "234XXXXXXXXXX";

const ROOM_OPTIONS = ["Standard Room", "Premium Room", "Deluxe Room"];

interface BookingFormState {
  fullName: string;
  phone: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  specialRequests: string;
}

interface FormErrors {
  fullName?: string;
  phone?: string;
  roomType?: string;
  checkIn?: string;
  checkOut?: string;
}

const emptyForm: BookingFormState = {
  fullName: "",
  phone: "",
  roomType: "",
  checkIn: "",
  checkOut: "",
  guests: 1,
  specialRequests: "",
};

function todayISO(): string {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  const local = new Date(now.getTime() - offset * 60 * 1000);
  return local.toISOString().split("T")[0];
}

function formatDisplayDate(iso: string): string {
  if (!iso) return "";
  const [year, month, day] = iso.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function dayAfter(iso: string): string {
  if (!iso) return "";
  const [year, month, day] = iso.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  date.setDate(date.getDate() + 1);
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export default function Booking() {
  const [form, setForm] = useState<BookingFormState>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const minCheckIn = useMemo(() => todayISO(), []);
  const minCheckOut = useMemo(
    () => (form.checkIn ? dayAfter(form.checkIn) : minCheckIn),
    [form.checkIn, minCheckIn],
  );

  function updateField<K extends keyof BookingFormState>(
    field: K,
    value: BookingFormState[K],
  ) {
    setForm((prev) => {
      const next = { ...prev, [field]: value };

      // Keep check-out valid whenever check-in changes
      if (field === "checkIn" && typeof value === "string") {
        const earliestCheckOut = dayAfter(value);
        if (prev.checkOut && prev.checkOut <= value) {
          next.checkOut = earliestCheckOut;
        }
      }
      return next;
    });

    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function validate(): boolean {
    const newErrors: FormErrors = {};

    if (!form.fullName.trim()) {
      newErrors.fullName = "Please enter your full name.";
    }
    if (!form.phone.trim()) {
      newErrors.phone = "Please enter your phone number.";
    }
    if (!form.roomType) {
      newErrors.roomType = "Please select a room.";
    }
    if (!form.checkIn) {
      newErrors.checkIn = "Please select your check-in date.";
    }
    if (!form.checkOut) {
      newErrors.checkOut = "Please select your check-out date.";
    } else if (form.checkIn && form.checkOut <= form.checkIn) {
      newErrors.checkOut = "Check-out must be after check-in.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function buildWhatsAppMessage(): string {
    const lines = [
      "Hello Exclusive Holiday & Suites, I would like to make a booking.",
      "",
      "BOOKING REQUEST",
      "",
      `Guest Name: ${form.fullName}`,
      `Phone Number: ${form.phone}`,
      "",
      `Room Type: ${form.roomType}`,
      "",
      `Check-in: ${formatDisplayDate(form.checkIn)}`,
      `Check-out: ${formatDisplayDate(form.checkOut)}`,
      "",
      `Number of Guests: ${form.guests}`,
      "",
      "Special Requests:",
      form.specialRequests.trim() ? form.specialRequests.trim() : "None",
      "",
      "Thank you.",
    ];
    return lines.join("\n");
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!validate()) return;

    const message = buildWhatsAppMessage();
    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message,
    )}`;

    window.open(whatsappURL, "_blank");
    setSubmitted(true);
  }

  function handleStartOver() {
    setForm(emptyForm);
    setErrors({});
    setSubmitted(false);
  }

  if (submitted) {
    return (
      <div className="booking-page">
        <div className="booking-confirmation">
          <div className="booking-confirmation-mark">&#10003;</div>
          <h1 className="booking-confirmation-title">Booking Request Ready</h1>
          <p className="booking-confirmation-text">
            Your booking details have been prepared in WhatsApp. Please press{" "}
            <strong>Send</strong> in WhatsApp to submit your booking request to
            Exclusive Holiday &amp; Suites.
          </p>
          <div className="booking-confirmation-actions">
            <button
              type="button"
              className="booking-secondary-btn"
              onClick={handleStartOver}
            >
              Make Another Booking
            </button>
            <Link to="/" className="booking-primary-btn booking-link-btn">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-page">
      <header className="booking-header">
        <p className="booking-eyebrow">Reservations</p>
        <h1 className="booking-title">Book Your Stay</h1>
        <p className="booking-subtitle">
          Plan your perfect stay at Exclusive Holiday &amp; Suites. Complete the
          form below and send your booking request directly to us on WhatsApp.
        </p>
      </header>

      <div className="booking-layout">
        <form className="booking-form-card" onSubmit={handleSubmit} noValidate>
          <h2 className="booking-card-heading">Guest Information</h2>

          <div className="booking-field">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Enter your full name"
              value={form.fullName}
              onChange={(e) => updateField("fullName", e.target.value)}
              aria-invalid={Boolean(errors.fullName)}
              aria-describedby={errors.fullName ? "fullName-error" : undefined}
            />
            {errors.fullName && (
              <span className="booking-error" id="fullName-error">
                {errors.fullName}
              </span>
            )}
          </div>

          <div className="booking-field">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Enter your phone number"
              value={form.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? "phone-error" : undefined}
            />
            {errors.phone && (
              <span className="booking-error" id="phone-error">
                {errors.phone}
              </span>
            )}
          </div>

          <h2 className="booking-card-heading booking-card-heading-spaced">
            Stay Information
          </h2>

          <div className="booking-field">
            <label htmlFor="roomType">Room Type</label>
            <select
              id="roomType"
              name="roomType"
              value={form.roomType}
              onChange={(e) => updateField("roomType", e.target.value)}
              aria-invalid={Boolean(errors.roomType)}
              aria-describedby={errors.roomType ? "roomType-error" : undefined}
            >
              <option value="">Select a room</option>
              {ROOM_OPTIONS.map((room) => (
                <option key={room} value={room}>
                  {room}
                </option>
              ))}
            </select>
            {errors.roomType && (
              <span className="booking-error" id="roomType-error">
                {errors.roomType}
              </span>
            )}
          </div>

          <div className="booking-field-row">
            <div className="booking-field">
              <label htmlFor="checkIn">Check-in Date</label>
              <input
                type="date"
                id="checkIn"
                name="checkIn"
                min={minCheckIn}
                value={form.checkIn}
                onChange={(e) => updateField("checkIn", e.target.value)}
                aria-invalid={Boolean(errors.checkIn)}
                aria-describedby={errors.checkIn ? "checkIn-error" : undefined}
              />
              {errors.checkIn && (
                <span className="booking-error" id="checkIn-error">
                  {errors.checkIn}
                </span>
              )}
            </div>

            <div className="booking-field">
              <label htmlFor="checkOut">Check-out Date</label>
              <input
                type="date"
                id="checkOut"
                name="checkOut"
                min={minCheckOut}
                value={form.checkOut}
                onChange={(e) => updateField("checkOut", e.target.value)}
                aria-invalid={Boolean(errors.checkOut)}
                aria-describedby={
                  errors.checkOut ? "checkOut-error" : undefined
                }
              />
              {errors.checkOut && (
                <span className="booking-error" id="checkOut-error">
                  {errors.checkOut}
                </span>
              )}
            </div>
          </div>

          <div className="booking-field">
            <label htmlFor="guests">Number of Guests</label>
            <input
              type="number"
              id="guests"
              name="guests"
              min={1}
              value={form.guests}
              onChange={(e) =>
                updateField("guests", Math.max(1, Number(e.target.value) || 1))
              }
            />
          </div>

          <div className="booking-field">
            <label htmlFor="specialRequests">Special Requests</label>
            <textarea
              id="specialRequests"
              name="specialRequests"
              placeholder="Anything you'd like us to know? (Optional)"
              rows={4}
              value={form.specialRequests}
              onChange={(e) => updateField("specialRequests", e.target.value)}
            />
          </div>

          <button type="submit" className="booking-primary-btn">
            Book &amp; Send via WhatsApp
          </button>
        </form>

        <aside className="booking-summary-card">
          <div className="booking-summary-tag">Reservation</div>
          <h2 className="booking-summary-heading">Your Reservation</h2>

          <dl className="booking-summary-list">
            <div className="booking-summary-row">
              <dt>Guest</dt>
              <dd className={form.fullName ? "" : "booking-summary-empty"}>
                {form.fullName || "Not provided"}
              </dd>
            </div>

            <div className="booking-summary-row">
              <dt>Room</dt>
              <dd className={form.roomType ? "" : "booking-summary-empty"}>
                {form.roomType || "Not selected"}
              </dd>
            </div>

            <div className="booking-summary-divider" />

            <div className="booking-summary-row">
              <dt>Check-in</dt>
              <dd className={form.checkIn ? "" : "booking-summary-empty"}>
                {form.checkIn ? formatDisplayDate(form.checkIn) : "Not set"}
              </dd>
            </div>

            <div className="booking-summary-row">
              <dt>Check-out</dt>
              <dd className={form.checkOut ? "" : "booking-summary-empty"}>
                {form.checkOut ? formatDisplayDate(form.checkOut) : "Not set"}
              </dd>
            </div>

            <div className="booking-summary-divider" />

            <div className="booking-summary-row">
              <dt>Guests</dt>
              <dd>{form.guests}</dd>
            </div>

            <div className="booking-summary-row booking-summary-row-block">
              <dt>Special Request</dt>
              <dd
                className={
                  form.specialRequests.trim() ? "" : "booking-summary-empty"
                }
              >
                {form.specialRequests.trim() || "None"}
              </dd>
            </div>
          </dl>

          <p className="booking-summary-note">
            Your details are sent to us directly on WhatsApp — nothing is
            charged or stored here.
          </p>
        </aside>
      </div>
    </div>
  );
}
