import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdEye, IoMdEyeOff, IoIosArrowRoundBack } from "react-icons/io";
import { authApi } from "../../utils/apis/authService";
import { useAuth } from "../../auth/AuthContext";
import ReCAPTCHA from "react-google-recaptcha";

export default function AuthPage() {
  const { login } = useAuth();
  const [tab, setTab] = useState("login");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);
  const [otpStep, setOtpStep] = useState(false);
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const formRef = useRef(null);
  const navigate = useNavigate();
  const captchaRef = useRef(null); //  thêm ref cho reCAPTCHA

  // --- Đổi tab login/register ---
  const handleSwitchTab = (target) => {
    setTab(target);
    setCaptchaToken(null);
    captchaRef.current?.reset(); //  reset reCAPTCHA khi đổi tab
  };

  // --- Submit LOGIN / REGISTER ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(formRef.current));

    // Validate đơn giản trước khi gửi
    if (!formData.email || !formData.password) {
      alert("Vui lòng nhập đầy đủ Email và Mật khẩu!");
      return;
    }

    // Kiểm tra CAPTCHA
    if (!captchaToken) {
      alert("Vui lòng xác minh CAPTCHA trước khi tiếp tục.");
      return;
    }

    try {
      setLoading(true);

      if (tab === "login") {
        const res = await authApi.login({
          email: formData.email,
          password: formData.password,
          captchaToken,
        });

        // Nếu bước OTP
        if (res.data?.step === "VERIFY_OTP") {
          setEmail(res.data.email);
          setOtpStep(true);
          alert("OTP đã được gửi đến email của bạn!");
          return;
        }

        // ✅ Thành công
        alert("Đăng nhập thành công!");
        navigate("/");
      } else {
        // REGISTER
        await authApi.register({
          ...formData,
          captchaToken,
        });
        alert("Đăng ký thành công! Vui lòng đăng nhập.");
        setTab("login");
        captchaRef.current?.reset(); // reset CAPTCHA khi chuyển sang login
        setCaptchaToken(null);
      }

      // ✅ Sau khi xử lý xong, reset form và CAPTCHA
      formRef.current?.reset();
      captchaRef.current?.reset();
      setCaptchaToken(null);
    } catch (err) {
      console.error(err.response?.data || err.message);

      // ⚠️ Nếu backend trả lỗi validate hoặc CAPTCHA
      if (err.response?.data?.error?.includes("CAPTCHA")) {
        alert("CAPTCHA không hợp lệ! Vui lòng xác minh lại.");
        captchaRef.current?.reset(); // ✅ reset để người dùng tích lại
        setCaptchaToken(null);
      } else {
        alert(err.response?.data?.error || "Đã có lỗi xảy ra!");
        captchaRef.current?.reset(); // reset luôn để tránh token cũ
        setCaptchaToken(null);
      }
    } finally {
      setLoading(false);
    }
  };


  // --- Xác minh OTP ---
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await authApi.verifyOtp({ email, otp });

      const access = res.data.access_token;
      const refresh = res.data.refresh_token;

      //  Gọi hàm login của AuthContext để đồng bộ state toàn hệ thống
      login({
        email,
        password: null, // không cần, chỉ để giữ interface
        captchaToken: null, // không cần
        access_token: access,
        refresh_token: refresh,
      });

      alert("Xác minh OTP thành công!");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.error || "Mã OTP không hợp lệ hoặc đã hết hạn");
    } finally {
      setLoading(false);
    }
  };


  // --- Giao diện OTP Step ---
  // --- UI ---
  if (otpStep) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <form
          onSubmit={handleVerifyOtp}
          className="bg-white p-6 rounded-2xl shadow-md w-80 text-center"
        >
          <h2 className="text-xl font-semibold mb-4">Xác minh OTP</h2>
          <p className="text-sm text-gray-600 mb-3">
            Mã OTP đã được gửi đến email <b>{email}</b>
          </p>
          <input
            type="text"
            placeholder="Nhập mã OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength={6}
            className="w-full text-center border rounded-full px-3 py-2 mb-4 focus:border-slate-400 outline-none"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 text-white rounded-full py-2.5 font-semibold hover:bg-slate-800 disabled:opacity-60"
          >
            {loading ? "Đang xác minh..." : "Xác minh OTP"}
          </button>
          <button
            type="button"
            onClick={() => setOtpStep(false)}
            className="mt-3 text-sm text-gray-500 hover:underline"
          >
            Quay lại đăng nhập
          </button>
        </form>
      </div>
    );
  }

  // --- Giao diện Login/Register ---
  return (
    <div className="flex min-h-screen w-full bg-white">
      {/* LEFT IMAGE */}
      <div className="hidden md:flex w-1/2 items-center justify-center p-20">
        <div className="relative w-full h-full">
          <img
            src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=1600&auto=format&fit=crop"
            alt="Classroom"
            className="w-full h-full object-cover rounded-2xl"
          />
          <div className="absolute bottom-6 left-6 bg-black/40 p-6 rounded-2xl text-white max-w-md">
            <h2 className="text-2xl md:text-3xl font-bold">Welcome</h2>
            <p className="mt-2 text-sm text-slate-200">
              Login or register to continue
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT FORM */}
      <div className="flex w-full md:w-1/2 items-start justify-center">
        <div className="w-full max-w-md p-8 mt-24">
          {/* Tabs */}
          <div className="flex justify-center gap-2">
            <TabBtn active={tab === "login"} onClick={() => handleSwitchTab("login")}>
              Login
            </TabBtn>
            <TabBtn active={tab === "register"} onClick={() => handleSwitchTab("register")}>
              Register
            </TabBtn>
          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="mt-6 space-y-4 text-left">
            <Field label="Email Address">
              <Input name="email" type="email" placeholder="Enter your Email Address" required />
            </Field>

            {tab === "register" && (
              <Field label="Full name">
                <Input name="full_name" placeholder="Enter your Full name" required />
              </Field>
            )}

            <Field label="Password">
              <div className="relative">
                <Input
                  name="password"
                  type={showPass ? "text" : "password"}
                  placeholder="Enter your Password"
                  className="pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                >
                  {showPass ? <IoMdEyeOff /> : <IoMdEye />}
                </button>
              </div>
            </Field>

            {tab === "register" && (
              <Field label="Bạn là?">
                <div className="flex gap-3">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="role"
                      value="giaovien"
                      defaultChecked
                      className="h-4 w-4 accent-slate-900"
                    />
                    <span className="text-sm text-slate-700">Giáo viên</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="role"
                      value="hocsinh"
                      className="h-4 w-4 accent-slate-900"
                    />
                    <span className="text-sm text-slate-700">Học sinh</span>
                  </label>
                </div>
              </Field>
            )}

            {/* reCAPTCHA */}
            <div className="flex justify-start">
              <ReCAPTCHA
                ref={captchaRef}
                sitekey="6LcPxeorAAAAAKBLAgBjCzxolgNj-iLcqW-xuqsu"
                onChange={(token) => setCaptchaToken(token)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="cursor-pointer w-full rounded-full bg-slate-900 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-60"
            >
              {loading ? "Processing..." : tab === "login" ? "Login" : "Register"}
            </button>

            <div
              onClick={() => window.history.back()}
              className="cursor-pointer w-full flex items-center justify-center gap-2 rounded-full bg-slate-500 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
            >
              <IoIosArrowRoundBack className="text-xl" />
              Trở lại trang trước
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

/* Reusable Components */
function TabBtn({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      type="button"
      className={
        "cursor-pointer px-10 py-2 rounded-full text-sm font-medium transition-colors " +
        (active
          ? "bg-slate-900 text-white"
          : "bg-slate-200 text-slate-700 hover:bg-slate-300")
      }
    >
      {children}
    </button>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <div className="mb-1 text-xs font-medium text-slate-600">{label}</div>
      {children}
    </label>
  );
}

function Input({ className = "", ...props }) {
  return (
    <input
      {...props}
      className={
        "w-full rounded-full border border-slate-300 bg-white px-4 py-2 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-slate-400 " +
        className
      }
    />
  );
}
