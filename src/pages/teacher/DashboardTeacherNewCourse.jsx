import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { useAuth } from "../../auth/AuthContext";
import React, { useState } from "react";
import { api, URL_BASE } from "../../utils/api";
function Btn({ children, onClick, active }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded px-2 py-1 text-xs
        ${active ? "bg-slate-100 font-semibold" : "hover:bg-slate-50"}`}
    >
      {children}
    </button>
  );
}
export default function DashboardTeacherNewCourse() {
  const { user } = useAuth();
  const TABS = [
    { key: "basic", label: "Thông tin cơ bản", icon: IconLayers },
    { key: "advance", label: "Thông tin nâng cao", icon: IconChecklist },
    { key: "curriculum", label: "Chương trình học", icon: IconPlaySquare },
    { key: "publish", label: "Đăng tải khóa học", icon: IconRocket },
  ];
  const LANGS = [
    "Chọn...",
    "Tiếng Anh",
    "Tiếng Việt",
    "Tiếng Trung",
    "Tiếng Nhật",
  ];
  const LEVELS = ["Chọn...", "Người mới bắt đầu", "Trung cấp", "Nâng cao"];
  const DURATION_UNITS = ["Ngày", "Tháng", "Năm"];

  const [tab, setTab] = useState(0);

  // BASIC
  const [title, setTitle] = useState("");

  const [price, setPrice] = useState();
  const [subtitle, setSubtitle] = useState("");
  const [category, setCategory] = useState("Chọn...");
  const [subcategory, setSubcategory] = useState("Chọn...");
  const [topic, setTopic] = useState("");
  const [courseLang, setCourseLang] = useState("Chọn...");
  const [subLang, setSubLang] = useState("Chọn...");
  const [level, setLevel] = useState("Chọn...");
  const [durationVal, setDurationVal] = useState("");
  const [durationUnit, setDurationUnit] = useState("Day");

  // ADVANCE
  const [thumbUrl, setThumbUrl] = useState(null);
  console.log("thumb", thumbUrl);
  const [trailerUrl, setTrailerUrl] = useState(null);
  console.log("trailerUrl", trailerUrl);
  const [descHtml, setDescHtml] = useState("");
  const [teaches, setTeaches] = useState(["", "", "", ""]);
  const [audience, setAudience] = useState(["", "", "", ""]);
  const [requirements, setRequirements] = useState(["", "", "", ""]);

  // CURRICULUM
  const [sections, setSections] = useState([
    {
      id: 1,
      name: "Tên Chương học",
      lectures: [
        { id: 1, name: "Tên bài học 1", videoUrl: "" },
        { id: 2, name: "Tên bài học 2", videoUrl: "" },
      ],
    },
  ]);
  console.log("sections: ", sections);
  const updateLectureVideoUrl = (lectureId, newUrl) => {
    setSections((prevSections) =>
      prevSections.map((section) => ({
        ...section,
        lectures: section.lectures.map((lec) =>
          lec.id === lectureId
            ? { ...lec, videoUrl: newUrl } // cập nhật lecture này
            : lec
        ),
      }))
    );
  };

  // PUBLISH
  const [welcomeMsg, setWelcomeMsg] = useState("");
  const [congratsMsg, setCongratsMsg] = useState("");
  const [instructors, setInstructors] = useState([
    {
      id: 1,
      name: "Username",
      role: "UI/UX Designer",
      avatar: "https://i.pravatar.cc/48?img=14",
    },
    {
      id: 2,
      name: "Username",
      role: "UI/UX Designer",
      avatar: "https://i.pravatar.cc/48?img=25",
    },
  ]);

  // helpers
  const saveDraft = () => {
    const payload = {
      title,
      subtitle,
      category,
      subcategory,
      topic,
      courseLang,
      subLang,
      level,
      durationVal,
      durationUnit,
      thumbUrl,
      trailerUrl,
      desc,
      teaches,
      audience,
      requirements,
      sections,
      welcomeMsg,
      congratsMsg,
      instructors,
    };
    localStorage.setItem("create-course-draft", JSON.stringify(payload));
    alert("Saved ✔");
  };
  const savePreview = () => {
    saveDraft();
    alert("Save & Preview… (mock)");
  };
  const next = () => setTab((t) => Math.min(t + 1, 3));
  const prev = () => setTab((t) => Math.max(t - 1, 0));

  const basicValid =
    title.trim().length > 0 &&
    category !== "Chọn..." &&
    courseLang !== "Chọn..." &&
    level !== "Chọn..." &&
    durationVal !== "";

  const onPickThumb = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!/^image\/(png|jpe?g)$/i.test(file.type)) {
      return alert("Chỉ hỗ trợ ảnh JPG, JPEG, PNG");
    }

    const form = new FormData();
    form.append("folder", `courses/images/${user.id}`);
    form.append("model", "Course");
    form.append("field", "cover_image_url");
    form.append("file", file);

    try {
      const { data } = await api.post("/api/uploads", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setThumbUrl(data.url);
    } catch (err) {
      console.error(err);
      alert("Upload thất bại: " + err.message);
    } finally {
    }
  };
  const onPickTrailer = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!/^video\//i.test(file.type)) {
      return alert("Chỉ hỗ trợ file video");
    }

    const form = new FormData();
    form.append("folder", `courses/videos/${user.id}`);
    // form.append("model", "Course");
    // form.append("field", "promo_video_url");
    form.append("file", file);

    try {
      const { data } = await api.post("/api/uploads", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("data: ", data);

      setTrailerUrl(data.url);
    } catch (err) {
      console.error(err);
      alert("Upload thất bại: " + err.message);
    } finally {
    }
  };

  const addListItem = (which) => {
    const map = { teaches, audience, requirements };
    if (map[which].length >= 8) return;
    const n = [...map[which], ""];
    ({
      teaches: setTeaches,
      audience: setAudience,
      requirements: setRequirements,
    })[which](n);
  };
  const updateListItem = (which, idx, v) => {
    const map = { teaches, audience, requirements };
    const n = [...map[which]];
    n[idx] = v;
    ({
      teaches: setTeaches,
      audience: setAudience,
      requirements: setRequirements,
    })[which](n);
  };

  const addSection = () =>
    setSections((s) => [
      ...s,
      { id: Date.now(), name: "Section name", lectures: [] },
    ]);
  const removeSection = (sid) =>
    setSections((s) => s.filter((x) => x.id !== sid));
  const renameSection = (sid, name) =>
    setSections((s) => s.map((x) => (x.id === sid ? { ...x, name } : x)));
  const addLecture = (sid) =>
    setSections((s) =>
      s.map((sec) =>
        sec.id === sid
          ? {
              ...sec,
              lectures: [
                ...sec.lectures,
                { id: Date.now(), name: "Tên bài học", videoUrl: "" },
              ],
            }
          : sec
      )
    );
  const renameLecture = (sid, lid, name) =>
    setSections((s) =>
      s.map((sec) =>
        sec.id === sid
          ? {
              ...sec,
              lectures: sec.lectures.map((l) =>
                l.id === lid ? { ...l, name } : l
              ),
            }
          : sec
      )
    );
  const removeLecture = (sid, lid) =>
    setSections((s) =>
      s.map((sec) =>
        sec.id === sid
          ? { ...sec, lectures: sec.lectures.filter((l) => l.id !== lid) }
          : sec
      )
    );
  const toggleLectureMenu = (sid, lid) =>
    setSections((s) =>
      s.map((sec) =>
        sec.id === sid
          ? {
              ...sec,
              lectures: sec.lectures.map((l) =>
                l.id === lid ? { ...l, menuOpen: !l.menuOpen } : l
              ),
            }
          : sec
      )
    );

  const removeInstructor = (id) =>
    setInstructors((arr) => arr.filter((x) => x.id !== id));

  // Khởi tạo editor
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false }),
      Placeholder.configure({
        placeholder: "Nhập mô tả khóa học...",
      }),
    ],
    content: "",
    onUpdate: ({ editor }) => {
      setDescHtml(editor.getHTML());
    },
  });
  const [uploading, setUploading] = React.useState(false);

  const handleVideoUpload = async (lecId, file, lecVideoUrl) => {
    if (!file) return;

    const fd = new FormData();
    fd.append("folder", `courses/videos/${user.id}`);
    fd.append("file", file); // tên "video" trùng với field backend nhận

    try {
      setUploading(true);
      // const res = await fetch(`/api/lectures/${lecId}/video`, {
      //   method: "POST",
      //   body: fd,
      // });
      const res = await api.post("/api/uploads", fd);

      const { url } = res.data;
      updateLectureVideoUrl(lecId, url);
      alert("upload successfully!");

      // nếu muốn: cập nhật lại state sections ở đây
    } catch (err) {
      console.error(err);
      alert("Tải video thất bại!");
    } finally {
      setUploading(false);
    }
  };
  const handleSubmitCreate = async () => {
    try {
      // ======= B1: Chuẩn bị object =======
      const payload = {
        course: {
          title: title.trim(),
          description: descHtml,
          lecturer_id: user.id, // hoặc lấy từ context
          price: Number(price),
          status: "published",
        },
        chapters: sections.map((sec, secIdx) => ({
          title: sec.name,
          order_index: secIdx,
          lessons: sec.lectures.map((lec, lecIdx) => ({
            title: lec.name,
            order_index: lecIdx,
            video_url: lec.videoUrl || "",
            documents: lec.documents || [],
          })),
        })),
      };

      console.log("Payload gửi lên server:", payload);

      // ======= B2: Gửi lên server =======
      const res = await api.post("/api/courses/create-structure", payload);

      if (res.status === 200 || res.status === 201) {
        alert("Tạo khóa học thành công!");
        console.log("Server trả về:", res.data);
      }
    } catch (err) {
      console.error("Lỗi gửi khóa học:", err.response?.data || err.message);
      alert("Gửi dữ liệu thất bại!");
    }
  };

  if (!editor) return null;
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-6xl">
        {/* Tabs header */}
        <div className="rounded-t-xl bg-white px-4 pt-3 shadow-sm ring-1 ring-slate-100">
          <div className="flex items-center gap-6 overflow-x-auto">
            {TABS.map((t, i) => (
              <button
                key={t.key}
                onClick={() => setTab(i)}
                className={`flex items-center gap-2 border-b-2 px-2 py-3 text-sm font-medium ${
                  tab === i
                    ? "border-orange-500 text-slate-900"
                    : "border-transparent text-slate-500 hover:text-slate-700"
                }`}
              >
                <t.icon className="h-4 w-4 text-slate-600" />
                {t.label}
                {/* {tab === i && (
                  <span className="ml-2 rounded-full bg-emerald-50 px-1.5 py-0.5 text-[11px] font-semibold text-emerald-600">
                    {completed}/{totalSteps}
                  </span>
                )} */}
              </button>
            ))}
            <div className="ml-auto flex items-center gap-3 pl-3">
              <button
                onClick={saveDraft}
                className="rounded-md bg-orange-50 px-3 py-1.5 text-sm font-medium text-orange-600 ring-1 ring-orange-100"
              >
                Save
              </button>
              <button
                onClick={savePreview}
                className="text-sm font-medium text-orange-600"
              >
                Save & Preview
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="rounded-b-xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
          {/* BASIC */}
          {tab === 0 && (
            <div>
              <h2 className="mb-6 text-xl font-semibold text-slate-900">
                Thông tin cơ bản
              </h2>

              <div className="mb-5">
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Tiêu đề
                </label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value.slice(0, 80))}
                  placeholder="Tên khóa học của bạn"
                  className="w-full rounded-md border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#ff6e54] focus:border-[#ff6e54] px-3 py-2 text-sm"
                />
                <div className="mt-1 text-right text-xs text-slate-400">
                  {title.length}/80
                </div>
              </div>
              <div className="mb-5">
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Giá
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  placeholder="Nhập giá khóa học (VNĐ)"
                  className="w-full rounded-md border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#ff6e54] focus:border-[#ff6e54] px-3 py-2 text-sm"
                />
                {/* <div className="mt-1 text-right text-xs text-slate-400">
                  {subtitle.length}/120
                </div> */}
              </div>
              {/* 
              <div className="mb-5">
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Tiêu đề phụ
                </label>
                <input
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value.slice(0, 120))}
                  placeholder="Tiêu đề phụ khóa học"
                  className="w-full rounded-md border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#ff6e54] focus:border-[#ff6e54] px-3 py-2 text-sm"
                />
                <div className="mt-1 text-right text-xs text-slate-400">
                  {subtitle.length}/120
                </div>
              </div>

              <div className="mb-5 grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Danh mục
                  </label>
                  <div className="relative">
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full appearance-none rounded-md border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#ff6e54] focus:border-[#ff6e54] bg-white px-3 py-2 text-sm"
                    >
                      <option>Chọn...</option>
                      <option>Thiết kế</option>
                      <option>Lập trình</option>
                      <option>Nâng cao</option>
                      <option>Quảng cáo</option>
                    </select>
                    <IconChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Danh mục phụ
                  </label>
                  <div className="relative">
                    <select
                      value={subcategory}
                      onChange={(e) => setSubcategory(e.target.value)}
                      className="w-full appearance-none rounded-md border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#ff6e54] focus:border-[#ff6e54] bg-white px-3 py-2 text-sm"
                    >
                      <option>Chọn...</option>
                      <option>UI/UX</option>
                      <option>Frontend</option>
                      <option>Backend</option>
                    </select>
                    <IconChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  </div>
                </div>
              </div>

              <div className="mb-5">
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Tiêu đề khóa học
                </label>
                <input
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Khóa học của bạn chủ yếu dạy những gì?"
                  className="w-full rounded-md border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#ff6e54] focus:border-[#ff6e54] px-3 py-2 text-sm"
                />
              </div>

              <div className="grid gap-5 md:grid-cols-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Ngôn ngữ của khóa học
                  </label>
                  <div className="relative">
                    <select
                      value={courseLang}
                      onChange={(e) => setCourseLang(e.target.value)}
                      className="w-full appearance-none rounded-md border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#ff6e54] focus:border-[#ff6e54] bg-white px-3 py-2 text-sm"
                    >
                      {LANGS.map((l) => (
                        <option key={l}>{l}</option>
                      ))}
                    </select>
                    <IconChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Phụ đề (Tùy chọn)
                  </label>
                  <div className="relative">
                    <select
                      value={subLang}
                      onChange={(e) => setSubLang(e.target.value)}
                      className="w-full appearance-none rounded-md border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#ff6e54] focus:border-[#ff6e54] bg-white px-3 py-2 text-sm"
                    >
                      {LANGS.map((l) => (
                        <option key={l}>{l}</option>
                      ))}
                    </select>
                    <IconChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Mức độ yêu cầu
                  </label>
                  <div className="relative">
                    <select
                      value={level}
                      onChange={(e) => setLevel(e.target.value)}
                      className="w-full appearance-none rounded-md border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#ff6e54] focus:border-[#ff6e54] bg-white px-3 py-2 text-sm"
                    >
                      {LEVELS.map((l) => (
                        <option key={l}>{l}</option>
                      ))}
                    </select>
                    <IconChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Khoảng thời gian khóa học
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      min={0}
                      value={durationVal}
                      onChange={(e) => setDurationVal(e.target.value)}
                      placeholder="Thời gian"
                      className="w-full rounded-md border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#ff6e54] focus:border-[#ff6e54] px-3 py-2 text-sm"
                    />
                    <div className="relative px-1">
                      <select
                        value={durationUnit}
                        onChange={(e) => setDurationUnit(e.target.value)}
                        className="appearance-none rounded-md border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#ff6e54] focus:border-[#ff6e54] bg-white px-3 py-2 text-sm"
                      >
                        {DURATION_UNITS.map((u) => (
                          <option key={u}>{u}</option>
                        ))}
                      </select>
                      <IconChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    </div>
                  </div>
                </div>
              </div>
*/}
              <div className="mt-8 flex items-center justify-between">
                <button className="rounded-md px-4 py-2 text-sm text-slate-600 hover:bg-slate-50">
                  Hủy bỏ
                </button>
                <button
                  onClick={next}
                  className="rounded-md bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600"
                >
                  Lưu và tiếp tục
                </button>
              </div>
            </div>
          )}

          {/* ADVANCE */}
          {tab === 1 && (
            <div>
              <h2 className="mb-6 text-xl font-semibold text-slate-900">
                Thông tin nâng cao
              </h2>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#ff6e54] focus:border-[#ff6e54] p-4">
                  <div className="mb-2 text-sm font-medium">
                    Hình thu nhỏ của khóa học
                  </div>
                  <p className="text-xs text-slate-500">
                    Tải hình thu nhỏ của khóa học lên đây.{" "}
                    <span className="font-medium">Hướng dẫn quan trọng:</span>{" "}
                    1200×800 pixel hoặc Tỷ lệ 12:8. Định dạng được hỗ trợ:{" "}
                    <b>jpg, jpeg, or png</b>.
                  </p>
                  <label className="mt-3 block cursor-pointer rounded-md border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#ff6e54] focus:border-[#ff6e54] bg-slate-50 px-3 py-2 text-sm text-orange-600 hover:bg-slate-100">
                    <span className="inline-flex items-center gap-2">
                      <IconUpload className="h-4 w-4" /> Tải hình ảnh lên
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={onPickThumb}
                      className="hidden"
                    />
                  </label>
                  {thumbUrl && (
                    <img
                      src={URL_BASE + thumbUrl}
                      className="mt-3 h-28 rounded-md object-cover"
                    />
                  )}
                </div>

                <div className="rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#ff6e54] focus:border-[#ff6e54] p-4">
                  <div className="mb-2 text-sm font-medium">
                    Đoạn giới thiệu khóa học
                  </div>
                  <p className="text-xs text-slate-500">
                    Những sinh viên xem video quảng cáo được làm tốt có khả năng
                    đăng ký khóa học của bạn cao hơn 5 lần.
                  </p>
                  <label className="mt-3 block cursor-pointer rounded-md border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#ff6e54] focus:border-[#ff6e54] bg-slate-50 px-3 py-2 text-sm text-orange-600 hover:bg-slate-100">
                    <span className="inline-flex items-center gap-2">
                      <IconUpload className="h-4 w-4" /> Tải video lên
                    </span>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={onPickTrailer}
                      className="hidden"
                    />
                  </label>
                  {trailerUrl && (
                    <video
                      src={URL_BASE + trailerUrl}
                      controls
                      className="mt-3 h-28 rounded-md"
                    />
                  )}
                </div>
              </div>

              <div className="mt-6">
                <div className="mb-1 text-sm font-medium">Mô tả khóa học</div>

                {/* focus viền mảnh #ff6e54 */}
                <div
                  className="rounded-md border border-slate-300 
                  focus-within:ring-1 focus-within:ring-[#ff6e54] 
                  focus-within:border-[#ff6e54]"
                >
                  {/* Thanh toolbar */}
                  <div className="flex gap-1 border-b border-slate-200 px-2 py-1">
                    <Btn
                      onClick={() => editor.chain().focus().toggleBold().run()}
                      active={editor.isActive("bold")}
                    >
                      B
                    </Btn>
                    <Btn
                      onClick={() =>
                        editor.chain().focus().toggleItalic().run()
                      }
                      active={editor.isActive("italic")}
                    >
                      I
                    </Btn>
                    <Btn
                      onClick={() =>
                        editor.chain().focus().toggleUnderline().run()
                      }
                      active={editor.isActive("underline")}
                    >
                      U
                    </Btn>
                    <div className="mx-1 h-5 w-px bg-slate-200" />
                    <Btn
                      onClick={() =>
                        editor.chain().focus().toggleBulletList().run()
                      }
                      active={editor.isActive("bulletList")}
                    >
                      •
                    </Btn>
                    <Btn
                      onClick={() =>
                        editor.chain().focus().toggleOrderedList().run()
                      }
                      active={editor.isActive("orderedList")}
                    >
                      1.
                    </Btn>
                    <div className="mx-1 h-5 w-px bg-slate-200" />
                    <Btn
                      onClick={() =>
                        editor.chain().focus().toggleBlockquote().run()
                      }
                      active={editor.isActive("blockquote")}
                    >
                      “ ”
                    </Btn>
                  </div>

                  {/* Khu vực soạn thảo */}
                  <EditorContent
                    editor={editor}
                    className="tiptap px-3 py-2 text-sm min-h-[100px] 
               focus:outline-none focus-visible:outline-0 focus:ring-0"
                  />
                </div>
              </div>
              {/* 
              <div className="mt-8 space-y-8">
                {[
                  {
                    title: "Những gì bạn sẽ dạy trong khóa học này (4/8)",
                    key: "teaches",
                    list: teaches,
                  },
                  {
                    title: "Đối tượng mục tiêu (4/8)",
                    key: "audience",
                    list: audience,
                  },
                  {
                    title: "Yêu cầu khóa học (4/8)",
                    key: "requirements",
                    list: requirements,
                  },
                ].map(({ title, key, list }) => (
                  <div key={key}>
                    <div className="mb-2 flex items-center justify-between">
                      <div className="text-sm font-semibold text-slate-800">
                        {title}
                      </div>
                      <button
                        onClick={() => addListItem(key)}
                        className="text-sm font-medium text-orange-600"
                      >
                        + Thêm mới
                      </button>
                    </div>
                    <div className="space-y-2">
                      {list.map((v, idx) => (
                        <div key={idx} className="relative">
                          <input
                            value={v}
                            onChange={(e) =>
                              updateListItem(
                                key,
                                idx,
                                e.target.value.slice(0, 120)
                              )
                            }
                            placeholder={`${String(idx + 1).padStart(
                              2,
                              "0"
                            )}   Những gì bạn sẽ dạy trong khóa học này...`}
                            className="w-full rounded-md border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#ff6e54] focus:border-[#ff6e54] px-3 py-2 text-sm"
                          />
                          <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                            {v.length}/120
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
*/}
              <div className="mt-8 flex items-center justify-between">
                <button
                  onClick={prev}
                  className="rounded-md px-4 py-2 text-sm text-slate-600 hover:bg-slate-50"
                >
                  Previous
                </button>
                <button
                  onClick={next}
                  className="rounded-md bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600"
                >
                  Lưu và tiếp tục
                </button>
              </div>
            </div>
          )}

          {/* CURRICULUM */}
          {tab === 2 && (
            <div>
              <h2 className="mb-6 text-xl font-semibold text-slate-900">
                Chương trình học
              </h2>

              <div className="space-y-6">
                {sections.map((sec, sIdx) => (
                  <div
                    key={sec.id}
                    className="rounded-lg bg-slate-50 p-4 ring-1 ring-slate-100"
                  >
                    <div className="mb-3 flex items-center gap-3">
                      <span className="text-slate-400">≡</span>
                      <span className="text-sm text-slate-500">
                        Chương học {String(sIdx + 1).padStart(2, "0")}:
                      </span>
                      <input
                        value={sec.name}
                        onChange={(e) => renameSection(sec.id, e.target.value)}
                        className="flex-1 rounded-md border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#ff6e54] focus:border-[#ff6e54] px-3 py-2 text-sm"
                      />
                      <div className="flex items-center gap-2">
                        <IconPlus
                          onClick={() => addLecture(sec.id)}
                          className="h-8 w-8 cursor-pointer rounded-md bg-white p-1.5 text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50"
                          title="Add lecture"
                        />
                        <IconTrash
                          onClick={() => removeSection(sec.id)}
                          className="h-8 w-8 cursor-pointer rounded-md bg-white p-1.5 text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50"
                          title="Delete section"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      {sec.lectures.map((lec) => (
                        <div
                          key={lec.id}
                          className="flex items-center gap-3 rounded-md bg-white p-3 ring-1 ring-slate-200"
                        >
                          <span className="text-slate-400">≡</span>
                          <input
                            value={lec.name}
                            onChange={(e) =>
                              renameLecture(sec.id, lec.id, e.target.value)
                            }
                            className="flex-1 rounded-md border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#ff6e54] focus:border-[#ff6e54] px-3 py-2 text-sm"
                          />
                          <div className="relative flex items-center justify-center gap-4 h-24">
                            <button
                              onClick={() => toggleLectureMenu(sec.id, lec.id)}
                              className="rounded-md bg-white px-3 h-20 text-sm ring-1 ring-slate-200"
                            >
                              Contents{" "}
                              <IconChevronDown className="ml-1 inline h-4 w-4" />
                            </button>
                            {/* {lec.menuOpen && (
                              <div className="absolute right-0 z-10 mt-2 w-44 rounded-md bg-white p-1 shadow-lg ring-1 ring-slate-200">
                                {[
                                  "Video",
                                  "Attach File",
                                  "Captions",
                                  "Description",
                                  "Lecture Notes",
                                ].map((m) => (
                                  <button
                                    key={m}
                                    className="block w-full rounded px-2 py-1 text-left text-sm hover:bg-slate-50"
                                  >
                                    {m}
                                  </button>
                                ))}
                              </div>
                            )} */}

                            {lec.videoUrl ? (
                              <video
                                src={URL_BASE + lec.videoUrl}
                                controls
                                className=" h-20 rounded-md"
                              />
                            ) : (
                              <label
                                className={`rounded-md bg-white h-20 px-3 flex items-center text-sm ring-1 ring-slate-200 cursor-pointer hover:bg-slate-50 ${
                                  uploading
                                    ? "opacity-50 pointer-events-none"
                                    : ""
                                }`}
                              >
                                {uploading ? "Đang tải..." : "Add video"}
                                <input
                                  type="file"
                                  accept="video/*"
                                  className="hidden"
                                  onChange={(e) =>
                                    handleVideoUpload(
                                      lec.id,
                                      e.target.files[0],
                                      lec.videoUrl
                                    )
                                  }
                                />
                              </label>
                            )}
                          </div>
                          <IconTrash
                            onClick={() => removeLecture(sec.id, lec.id)}
                            className="h-8 w-8 cursor-pointer rounded-md bg-white p-1.5 text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                <button
                  onClick={addSection}
                  className="w-full rounded-md bg-orange-50 py-3 text-sm font-medium text-orange-600 ring-1 ring-orange-100"
                >
                  Add Sections
                </button>
              </div>

              <div className="mt-8 flex items-center justify-between">
                <button
                  onClick={prev}
                  className="rounded-md px-4 py-2 text-sm text-slate-600 hover:bg-slate-50"
                >
                  Previous
                </button>
                <button
                  onClick={handleSubmitCreate}
                  className="rounded-md bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600"
                >
                  Đăng tải
                </button>
              </div>
            </div>
          )}

          {/* PUBLISH */}
          {tab === 3 && (
            <div>
              <h2 className="mb-6 text-xl font-semibold text-slate-900">
                Publish Course
              </h2>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <div className="mb-1 text-sm font-medium">
                    Welcome Message
                  </div>
                  <textarea
                    rows={5}
                    value={welcomeMsg}
                    onChange={(e) => setWelcomeMsg(e.target.value)}
                    placeholder="Enter course starting message here..."
                    className="w-full rounded-md border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#ff6e54] focus:border-[#ff6e54] px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <div className="mb-1 text-sm font-medium">
                    Congratulations Message
                  </div>
                  <textarea
                    rows={5}
                    value={congratsMsg}
                    onChange={(e) => setCongratsMsg(e.target.value)}
                    placeholder="Enter your course completed message here..."
                    className="w-full rounded-md border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#ff6e54] focus:border-[#ff6e54] px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div className="mt-8">
                <div className="mb-1 text-sm font-medium">
                  Add Instructor (02)
                </div>
                <div className="relative mb-4">
                  <IconSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    placeholder="Search by username"
                    className="w-full rounded-md border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#ff6e54] focus:border-[#ff6e54] pl-8 pr-3 py-2 text-sm"
                  />
                </div>

                <div className="flex flex-wrap gap-3">
                  {instructors.map((ins) => (
                    <div
                      key={ins.id}
                      className="flex items-center gap-3 rounded-md border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#ff6e54] focus:border-[#ff6e54] px-3 py-2"
                    >
                      <img src={ins.avatar} className="h-8 w-8 rounded-full" />
                      <div>
                        <div className="text-sm font-medium">{ins.name}</div>
                        <div className="text-xs text-slate-500">{ins.role}</div>
                      </div>
                      <button
                        onClick={() => removeInstructor(ins.id)}
                        className="ml-1 text-slate-400 hover:text-slate-600"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-10 flex items-center justify-between">
                <button
                  onClick={prev}
                  className="rounded-md px-4 py-2 text-sm text-slate-600 hover:bg-slate-50"
                >
                  Prev Step
                </button>
                <button
                  onClick={() => alert("Submit for review!")}
                  className="rounded-md bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600"
                >
                  Submit For Review
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------ Inline SVG Icons (JSX) ------------ */
function IconLayers({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3l9 5-9 5-9-5 9-5Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path d="M3 12l9 5 9-5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3 16.5l9 5 9-5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
function IconChecklist({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect
        x="4"
        y="4"
        width="16"
        height="16"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M8 8h8M8 12h8M8 16h5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
function IconPlaySquare({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path d="M10 8l6 4-6 4V8Z" fill="currentColor" />
    </svg>
  );
}
function IconRocket({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M14 3c4 1 7 4 7 8 0 4-3 8-7 10-1-3-3-5-6-6 1-4 3-9 6-12Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M5 19c1-2 3-3 5-3-1 2-3 3-5 3Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="15" cy="10" r="2" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
function IconChevronDown({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
function IconUpload({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3v12M7 8l5-5 5 5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M4 21h16"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
function IconSearch({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M20 20l-3-3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
function IconPlus({ className = "", ...p }) {
  return (
    <svg {...p} className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 5v14M5 12h14"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
function IconTrash({ className = "", ...p }) {
  return (
    <svg {...p} className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
function ToolbarBtn({ children }) {
  return (
    <button
      type="button"
      className="rounded-md px-2 py-1 text-xs text-slate-600 hover:bg-slate-50"
      title="UI only"
    >
      {children}
    </button>
  );
}
