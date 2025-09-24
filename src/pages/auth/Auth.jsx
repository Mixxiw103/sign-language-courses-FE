// src/AuthPage.jsx
import { useState } from "react";
import { IoMdEye,IoMdEyeOff,IoIosArrowRoundBack   } from "react-icons/io";

export default function Auth() {
  const [tab, setTab] = useState("login"); // 'login' | 'register'
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-white">
      {/* LEFT: Image (desktop) */}
      <div className="hidden md:flex w-1/2 items-center justify-center p-20">
        <div className="relative w-full h-full">
          <img
            src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=1600&auto=format&fit=crop"
            alt="Classroom"
            className="w-full h-full object-cover rounded-2xl"
          />
          {/* Overlay text */}
          <div className="absolute bottom-6 left-6 bg-black/40 p-6 rounded-2xl text-white max-w-md">
            <h2 className="text-2xl md:text-3xl font-bold">Lorem Ipsum is simply</h2>
            <p className="mt-2 text-sm text-slate-200">Lorem ipsum is simply</p>
          </div>
        </div>
      </div>

      {/* RIGHT: Form */}
      <div className="flex w-full md:w-1/2 items-start justify-center ">
        <div className="w-full max-w-md p-8 mt-24">
          {/* Tabs */}
          <div className="flex justify-center gap-2">
            <TabBtn active={tab === "login"} onClick={() => setTab("login")}>Login</TabBtn>
            <TabBtn active={tab === "register"} onClick={() => setTab("register")}>Register</TabBtn>
          </div>

          <p className="mt-6 text-center text-xs leading-5 text-slate-500">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              const data = Object.fromEntries(new FormData(e.currentTarget));
              alert(JSON.stringify({ tab, ...data }, null, 2));
            }}
            className="mt-6 space-y-4 text-left"
          >
            {/* Vùng thay đổi – cố định chiều cao để không “nhảy” khi đổi tab */}
            <div className="space-y-4">
              {tab === "register" && (
                <Field label="Email Address">
                  <Input name="email" type="email" placeholder="Enter your Email Address" />
                </Field>
              )}

              <Field label="User name">
                <Input name="username" placeholder="Enter your User name" />
              </Field>

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
                    aria-label="Toggle password"
                  >
                    {showPass ? <IoMdEyeOff /> : <IoMdEye />}
                  </button>
                </div>
              </Field>

              {tab === "register" ? (
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
                      <input type="radio" name="role" value="hocsinh" className="h-4 w-4 accent-slate-900" />
                      <span className="text-sm text-slate-700">Học sinh</span>
                    </label>
                  </div>
                </Field>
              ) : (
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <label className="inline-flex items-center gap-2">
                    <input type="checkbox" name="remember" className="h-4 w-4" />
                    <span>Remember me</span>
                  </label>
                  <a href="#" className="hover:text-slate-700">Forgot Password?</a>
                </div>
              )}
            </div>

            {/* Submit */}
            <button
              className="cursor-pointer w-full rounded-full bg-slate-900 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
              type="submit"
            >
              {tab === "login" ? "Login" : "Register"}
            </button>
            <div
      onClick={() => {
    // Ví dụ: quay lại trang trước
    window.history.back();
  }}
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

/* ————— Small components ————— */
function TabBtn({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={
        "cursor-pointer px-10 py-2 rounded-full text-sm font-medium transition-colors " +
        (active ? "bg-slate-900 text-white" : "bg-primary text-slate-700 hover:bg-slate-200")
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
