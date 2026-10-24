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
  const [err, setErr] = useState("");

  const submit = (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name.trim()) {
      setErr("Please enter your name");
    } else if (!email.trim()) {
      setErr("Please enter your email address");
    } else if (!emailRegex.test(email.trim())) {
      setErr("Enter a valid email address");
    } else if (phone.trim() && !/^\+?[\d\s()-]{7,20}$/.test(phone.trim())) {
      setErr("Enter a valid phone number");
    } else if (!pass) {
      setErr("Please enter your password");
    } else if (pass.length < 6) {
      setErr("Password must be at least 6 characters");
    } else if (!agree) {
      setErr("Please agree to the Terms of Use and Privacy Policy");
    } else {
      setErr("");
      onLogin();
    }
  };

  return (
    <div className="bg-[#f8f9fa] min-h-screen flex flex-col items-center overflow-x-hidden">
      <div
        className="w-full h-[380px] flex justify-center items-center text-center text-white p-5 relative"
        style={{
          background:
            "radial-gradient(circle at 15% 50%, rgba(155,43,277,0.4), transparent 45%), radial-gradient(circle at 85% 30%, rgba(0,191,255,0.3), transparent 45%), linear-gradient(135deg, #2b1b3d, #1f3a5f, #4b2c6b, #d76d77)",
        }}
      >
        <div>
          <h1 className="text-[2.5rem] max-[480px]:text-[1.8rem] font-bold mb-2.5 [text-shadow:0_2px_4px_rgba(0,0,0,0.3)]">
            Welcome to MyPatientHUB!
          </h1>
          <p className="text-base max-[480px]:text-[0.9rem] opacity-95 [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
            We provide smart healthcare services in your hands.
          </p>
        </div>
      </div>

      <div className="w-full flex justify-center -mt-[180px] z-10 pt-[100px] max-[480px]:px-[15px]">
        <div className="bg-white w-full max-w-[400px] rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] py-10 px-[30px] max-[480px]:py-[30px] max-[480px]:px-5 text-center">
          <h2 className="text-2xl text-[#333] font-semibold mb-[25px]">
            <i> Create your Account</i>
          </h2>

          <div className="flex justify-center gap-[15px] mb-[25px]">
            <button
              type="button"
              className={soc}
              aria-label="Login with Facebook"
            >
              <FaFacebookF size={18} color="#1877f2" />
            </button>
            <button
              type="button"
              className={soc}
              aria-label="Login with Google"
            >
              <FcGoogle size={20} />
            </button>
          </div>

          <form className="flex flex-col gap-[15px]" onSubmit={submit}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="your name "
              className={inp}
            />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone number(Optional) "
              className={inp}
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className={inp}
            />
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="Please enter your password"
              className={inp}
            />

            {err && <p className="text-red-500 text-sm">{err}</p>}

            <div className="flex justify-between items-center text-[0.8rem] text-[#777] mt-[5px] p-5">
              <label className="flex items-center gap-[5px] cursor-pointer">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                  className="cursor-pointer accent-[#9c27b0]"
                />
                <i className="mt-3">
                  {" "}
                  I agree to MyPiHUB Terms of Use and Privacy Policy
                </i>
              </label>
            </div>
            <button
              type="submit"
              className="bg-gradient-to-r from-[#42a5f5] to-[#1e88e5] text-white p-[15px] rounded-lg font-bold text-[0.95rem] cursor-pointer w-full tracking-[0.5px] transition hover:opacity-90 hover:scale-[1.02]"
            >
              CREATE ACCOUNT
            </button>
          </form>

          <h1 className=" text-[#777] mt-6">
            Already have an account?
            <Link to="/">
              <span className="text-sm  text-blue-700">SIGN IN</span>
            </Link>{" "}
          </h1>
        </div>
      </div>

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
