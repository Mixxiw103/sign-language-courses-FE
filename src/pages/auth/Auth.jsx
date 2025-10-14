import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdEye, IoMdEyeOff, IoIosArrowRoundBack } from "react-icons/io";
import { authApi } from "../../utils/apis/authService";
import { useAuth } from "../../auth/AuthContext";

export default function AuthPage() {
  const { login } = useAuth();
  const [tab, setTab] = useState("login"); // 'login' | 'register'
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(formRef.current));

    try {
      setLoading(true);

      if (tab === "login") {
        // const res = await authApi.login(formData);
        // localStorage.setItem("accessToken", res.data.access_token);
        // localStorage.setItem("refreshToken", res.data.refresh_token);
        await login({
          email: formData.email,
          password: formData.password,
        });
        // alert("Login success!");
        navigate("/");
      } else {
        await authApi.register(formData);
        alert("Register success! You can login now.");
        setTab("login");
      }

      formRef.current?.reset(); // reset form an toàn
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

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
            <TabBtn active={tab === "login"} onClick={() => setTab("login")}>
              Login
            </TabBtn>
            <TabBtn
              active={tab === "register"}
              onClick={() => setTab("register")}
            >
              Register
            </TabBtn>
          </div>

          <p className="mt-6 text-center text-xs leading-5 text-slate-500">
            Lorem Ipsum dummy text
          </p>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="mt-6 space-y-4 text-left"
          >
            <div className="space-y-4">
              {tab === "register" && (
                <Field label="Email Address">
                  <Input
                    name="email"
                    type="email"
                    placeholder="Enter your Email Address"
                  />
                </Field>
              )}

              {tab === "register" && (
                <Field label="Full name">
                  <Input name="full_name" placeholder="Enter your Full name" />
                </Field>
              )}

              {tab === "login" && (
                <Field label="Email Address">
                  <Input
                    name="email"
                    type="email"
                    placeholder="Enter your Email Address"
                  />
                </Field>
              )}

              <Field label="Password">
                <div className="relative">
                  <Input
                    name="password"
                    type={showPass ? "text" : "password"}
                    placeholder="Enter your Password"
                    className="pr-10"
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

              {tab === "login" && (
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="remember"
                      className="h-4 w-4"
                    />
                    <span>Remember me</span>
                  </label>
                  <a href="#" className="hover:text-slate-700">
                    Forgot Password?
                  </a>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="cursor-pointer w-full rounded-full bg-slate-900 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
            >
              {loading
                ? "Processing..."
                : tab === "login"
                ? "Login"
                : "Register"}
            </button>

            <div
              onClick={() => window.history.back()}
              className="cursor-pointer w-full flex items-center justify-center gap-2 rounded-full bg-slate-500 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
            >
              <IoIosArrowRoundBack className="text-xl" />
              Trở lại trang trước 😭
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

/* ——— Small components ——— */
function TabBtn({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={
        "cursor-pointer px-10 py-2 rounded-full text-sm font-medium transition-colors " +
        (active
          ? "bg-slate-900 text-white"
          : "bg-primary text-slate-700 hover:bg-slate-200")
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
