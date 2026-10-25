import { useState } from "react";
import { FaFacebookF } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

const inp =
  "w-full p-[15px] border border-[#e0e0e0] rounded-lg text-[0.9rem] outline-none text-[#333] transition placeholder:text-[#aaa] focus:border-[#9c27b0] focus:shadow-[0_0_0_3px_rgba(156,39,176,0.1)]";

const soc =
  "w-[50px] h-[50px] border border-[#e0e0e0] rounded-lg bg-white cursor-pointer flex justify-center items-center transition-all duration-300 hover:bg-[#f5f5f5] hover:border-[#ccc] hover:-translate-y-0.5";

const flink = "transition-colors duration-300 hover:text-[#333]";

export default function SignUP({ onLogin }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [agree, setAgree] = useState(false);
  const [err, setErr] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function validate() {
    const errors = {};
    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanPhone = phone.trim();

    // Name: letters, spaces, apostrophes, and hyphens
    const nameRegex = /^[\p{L}\p{M}]+(?:[ '\u2019-][\p{L}\p{M}]+)*$/u;

    // Email: valid basic email format
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)+$/;

    // Phone: optional international prefix, digits, spaces, hyphens, parentheses
    const phoneRegex = /^\+?[0-9\s()-]+$/;

    if (!cleanName) {
      errors.name = "Please enter your full name.";
    } else if (cleanName.length < 2 || cleanName.length > 70) {
      errors.name = "Name must be between 2 and 70 characters.";
    } else if (!nameRegex.test(cleanName)) {
      errors.name = "Enter a valid name using letters only.";
    }

    if (!cleanEmail) {
      errors.email = "Please enter your email address.";
    } else if (
      cleanEmail.length > 254 ||
      !emailRegex.test(cleanEmail) ||
      cleanEmail.split("@")[0].length > 64
    ) {
      errors.email = "Please enter a valid email address.";
    }

    if (cleanPhone) {
      const digits = cleanPhone.replace(/\D/g, "");

      if (
        !phoneRegex.test(cleanPhone) ||
        digits.length < 7 ||
        digits.length > 15
      ) {
        errors.phone = "Enter a valid phone number (7–15 digits).";
      }
    }

    if (!pass) {
      errors.pass = "Please create a password.";
    } else if (pass.length < 8) {
      errors.pass = "Password must contain at least 8 characters.";
    } else if (pass.length > 128) {
      errors.pass = "Password must not exceed 128 characters.";
    } else if (!/[a-z]/i.test(pass) || !/[0-9]/.test(pass)) {
      errors.pass = "Use at least one letter and one number.";
    }

    if (!agree) {
      errors.agree = "Please agree to the Terms of Use and Privacy Policy.";
    }

    return errors;
  }

  function submit(e) {
    e.preventDefault();

    const errors = validate();
    setErr(errors);
    setSubmitted(true);

    if (Object.keys(errors).length > 0) {
      return;
    }

    // Replace this with your actual account-creation API.
    // onLogin should not be used to register unless your app
    // specifically implements registration through that function.
    console.log("Signup form passed client-side validation.");
  }

  function clearError(field) {
    if (submitted) {
      setErr((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  return (
    <div className="bg-[#f8f9fa] min-h-screen flex flex-col items-center overflow-x-hidden">
      {/* Header */}
      <div
        className="w-full h-[380px] flex justify-center items-center text-center text-white p-5 relative"
        style={{
          background:
            "radial-gradient(circle at 15% 50%, rgba(138,43,226,0.4), transparent 45%), radial-gradient(circle at 85% 30%, rgba(0,191,255,0.3), transparent 45%), linear-gradient(135deg, #2b1b3d, #1f3a5f, #4b2c6b, #d76d77)",
        }}
      >
        <div>
          <h1 className="text-[2.5rem] max-[480px]:text-[1.8rem] font-bold mb-2.5 [text-shadow:0_2px_4px_rgba(0,0,0,0.3)]">
            Welcome to MyPatientHUB!
          </h1>
          <p className="text-base max-[480px]:text-[0.9rem] opacity-95">
            We provide smart healthcare services in your hands.
          </p>
        </div>
      </div>

      {/* Signup Card */}
      <div className="w-full flex justify-center -mt-[180px] z-10 pt-[100px] max-[480px]:px-[15px]">
        <div className="bg-white w-full max-w-[400px] rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] py-10 px-[30px] max-[480px]:py-[30px] max-[480px]:px-5 text-center">
          <h2 className="text-2xl text-[#333] font-semibold mb-[25px]">
            <i>Create your Account</i>
          </h2>

          {/* Social Buttons */}
          <div className="flex justify-center gap-[15px] mb-[25px]">
            <button
              type="button"
              className={soc}
              aria-label="Sign up with Facebook"
            >
              <FaFacebookF size={18} color="#1877f2" />
            </button>

            <button
              type="button"
              className={soc}
              aria-label="Sign up with Google"
            >
              <FcGoogle size={20} />
            </button>
          </div>

          <form
            className="flex flex-col gap-[15px]"
            onSubmit={submit}
            noValidate
          >
            {/* Name */}
            <div className="text-left">
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  clearError("name");
                }}
                placeholder="Your full name"
                className={`${inp} ${err.name ? "border-red-500" : ""}`}
                autoComplete="name"
                aria-invalid={!!err.name}
                aria-describedby={err.name ? "name-error" : undefined}
              />
              {err.name && (
                <p
                  id="name-error"
                  className="text-red-500 text-sm mt-1"
                  role="alert"
                >
                  {err.name}
                </p>
              )}
            </div>

            {/* Optional Phone */}
            <div className="text-left">
              <input
                type="tel"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  clearError("phone");
                }}
                placeholder="Phone number (optional)"
                className={`${inp} ${err.phone ? "border-red-500" : ""}`}
                autoComplete="tel"
                aria-invalid={!!err.phone}
                aria-describedby={err.phone ? "phone-error" : undefined}
              />
              {err.phone && (
                <p
                  id="phone-error"
                  className="text-red-500 text-sm mt-1"
                  role="alert"
                >
                  {err.phone}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="text-left">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  clearError("email");
                }}
                placeholder="Email address"
                className={`${inp} ${err.email ? "border-red-500" : ""}`}
                autoComplete="email"
                aria-invalid={!!err.email}
                aria-describedby={err.email ? "email-error" : undefined}
              />
              {err.email && (
                <p
                  id="email-error"
                  className="text-red-500 text-sm mt-1"
                  role="alert"
                >
                  {err.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="text-left">
              <input
                type="password"
                value={pass}
                onChange={(e) => {
                  setPass(e.target.value);
                  clearError("pass");
                }}
                placeholder="Create a password"
                className={`${inp} ${err.pass ? "border-red-500" : ""}`}
                autoComplete="new-password"
                aria-invalid={!!err.pass}
                aria-describedby={err.pass ? "pass-error" : undefined}
              />
              {err.pass && (
                <p
                  id="pass-error"
                  className="text-red-500 text-sm mt-1"
                  role="alert"
                >
                  {err.pass}
                </p>
              )}
              <p className="text-xs text-gray-500 mt-1 text-left">
                At least 8 characters, including a letter and a number.
              </p>
            </div>

            {/* Terms */}
            <div className="text-left mt-2">
              <label className="flex items-start gap-2 text-[0.8rem] text-[#777] cursor-pointer">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => {
                    setAgree(e.target.checked);
                    clearError("agree");
                  }}
                  className="mt-1 cursor-pointer accent-[#9c27b0]"
                  aria-invalid={!!err.agree}
                />
                <span>
                  I agree to MyPatientHUB Terms of Use and Privacy Policy.
                </span>
              </label>
              {err.agree && (
                <p className="text-red-500 text-sm mt-1" role="alert">
                  {err.agree}
                </p>
              )}
            </div>

            {/* General Error Summary */}
            {err.form && (
              <p className="text-red-500 text-sm" role="alert">
                {err.form}
              </p>
            )}

            <button
              type="submit"
              className="bg-gradient-to-r from-[#42a5f5] to-[#1e88e5] text-white p-[15px] rounded-lg font-bold text-[0.95rem] cursor-pointer w-full tracking-[0.5px] transition hover:opacity-90 hover:scale-[1.02]"
            >
              CREATE ACCOUNT
            </button>
          </form>

          <h2 className="text-[#777] mt-6 text-sm">
            Already have an account?{" "}
            <Link
              to="/"
              className="text-blue-700 font-semibold hover:underline"
            >
              SIGN IN
            </Link>
          </h2>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-[50px] mb-[30px] flex flex-wrap justify-center gap-[25px] max-[480px]:gap-[15px] max-[480px]:px-2.5 text-[0.85rem] text-[#888]">
        <a href="#" className={flink}>
          Google Play Store APP
        </a>
        <a href="#" className={flink}>
          App Store APP
        </a>
        <a href="#" className={flink}>
          About MyPatientHUB
        </a>
        <a href="#" className={flink}>
          About Us
        </a>
        <a href="#" className={flink}>
          Our Blog
        </a>
      </footer>
    </div>
  );
}
