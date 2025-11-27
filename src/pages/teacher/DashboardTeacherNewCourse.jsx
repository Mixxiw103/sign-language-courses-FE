import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { useAuth } from "../../auth/AuthContext";
import { useState } from "react";
import { api, URL_BASE } from "../../utils/api";
import { toast } from "react-toastify";
import { Eye, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const [previewItem, setPreviewItem] = useState(null);
  const TABS = [
    { key: "basic", label: "Thông tin khóa học", icon: IconLayers },
    { key: "curriculum", label: "Chương trình học", icon: IconPlaySquare },
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
  const [uploading, setUploading] = useState(false);
  const addDocumentToLecture = (lectureId, doc) => {
    setSections((prev) =>
      prev.map((sec) => ({
        ...sec,
        lectures: sec.lectures.map((lec) =>
          lec.id === lectureId
            ? { ...lec, documents: [...(lec.documents || []), doc] }
            : lec
        ),
      }))
    );
  };

  // Xóa document theo index
  const removeDocumentFromLecture = (lectureId, docIndex) => {
    setSections((prev) =>
      prev.map((sec) => ({
        ...sec,
        lectures: sec.lectures.map((lec) =>
          lec.id === lectureId
            ? {
                ...lec,
                documents: (lec.documents || []).filter(
                  (_, i) => i !== docIndex
                ),
              }
            : lec
        ),
      }))
    );
  };

  // Upload document file và thêm vào lecture.documents
  const handleDocumentUpload = async (lecId, file) => {
    if (!file) return;
    const fd = new FormData();
    // bạn có thể thêm folder theo user: `courses/docs/${user.id}`
    fd.append("folder", `courses/documents/${user?.id || ""}`);
    fd.append("file", file);

    try {
      setUploading(true);
      const res = await api.post("/api/uploads", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const { url } = res.data;
      console.log(url, file.name);
      // lưu tên gốc file và url
      const doc = { name: file.name, url };
      addDocumentToLecture(lecId, doc);
      toast.success("Upload tài liệu thành công");
    } catch (err) {
      console.error("Upload document failed", err);
      toast.error("Tải tài liệu thất bại");
    } finally {
      setUploading(false);
    }
  };
  // state để biết item nào đang xóa (lectureId hoặc doc key)
  const [deletingId, setDeletingId] = useState(null);

  // Xóa video của lecture -> gọi DELETE /api/uploads?url=...
  const deleteVideoFromLecture = async (lecId) => {
    if (!confirm("Bạn có chắc muốn xóa video này?")) return;

    const lec = sections.flatMap((s) => s.lectures).find((l) => l.id === lecId);
    const rawUrl = lec?.videoUrl;
    if (!rawUrl) {
      toast.error("Không tìm thấy video để xóa");
      return;
    }
    const fullUrl = rawUrl.startsWith("http") ? rawUrl : `${URL_BASE}${rawUrl}`;

    try {
      setDeletingId(`video-${lecId}`);
      setUploading(true);
      await api.delete("/api/uploads", { params: { url: fullUrl } });
      // xóa local state
      updateLectureVideoUrl(lecId, "");
      toast.success("Xóa video thành công");
    } catch (err) {
      const status = err?.response?.status;
      if (status === 404) {
        updateLectureVideoUrl(lecId, "");
        toast.warning("File không tồn tại trên server — đã xóa cục bộ");
      } else {
        console.error("deleteVideo error:", err);
        toast.error("Xóa video thất bại. Vui lòng thử lại.");
      }
    } finally {
      setUploading(false);
      setDeletingId(null);
    }
  };

  // Xóa document theo lectureId + index -> gọi DELETE /api/uploads?url=...
  const deleteDocumentFromLecture = async (lectureId, docIndex) => {
    if (!confirm("Bạn có chắc muốn xóa tài liệu này?")) return;

    const lec = sections
      .flatMap((s) => s.lectures)
      .find((l) => l.id === lectureId);
    const doc = lec?.documents?.[docIndex];
    if (!doc) {
      toast.error("Không tìm thấy tài liệu để xóa");
      return;
    }
    const fullUrl = doc.url?.startsWith("http")
      ? doc.url
      : `${URL_BASE}${doc.url}`;

    try {
      setDeletingId(`doc-${lectureId}-${docIndex}`);
      setUploading(true);
      await api.delete("/api/uploads", { params: { url: fullUrl } });
      // xóa local
      removeDocumentFromLecture(lectureId, docIndex);
      toast.success("Xóa tài liệu thành công");
    } catch (err) {
      const status = err?.response?.status;
      if (status === 404) {
        removeDocumentFromLecture(lectureId, docIndex);
        toast.warning("File không tồn tại trên server — đã xóa cục bộ");
      } else {
        console.error("deleteDocument error:", err);
        toast.error("Xóa tài liệu thất bại. Vui lòng thử lại.");
      }
    } finally {
      setUploading(false);
      setDeletingId(null);
    }
  };

  const handleVideoUpload = async (lecId, file, lecVideoUrl) => {
    if (!file) return;

    const fd = new FormData();
    fd.append(
      "folder",
      // `courses/videos/${user.id ? user.id : "690069af9308110a97d22027"}`
      `courses/videos/`
    );
    fd.append("file", file); // tên "video" trùng với field backend nhận

    try {
      setUploading(true);
      // const res = await fetch(`/api/lectures/${lecId}/video`, {
      //   method: "POST",
      //   body: fd,
      // });
      const res = await api.post("/api/uploads", fd);
      console.log("res", res);
      const { url } = res.data;
      updateLectureVideoUrl(lecId, url);
      toast.success("Tải video lên thành công!");

      // nếu muốn: cập nhật lại state sections ở đây
    } catch (err) {
      console.error(err);
      toast.error("Tải video thất bại!");
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
          lecturer_id: user.id,
          price: Number(price),
          status: "published",
          thumbnail_url: thumbUrl || "",
          demo_video_url: trailerUrl || "",
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
        toast.success("Tạo khóa học thành công!");
        console.log("Server trả về:", res.data);
      }
      // navigate('/teacher/my-courses');
    } catch (err) {
      console.error("Lỗi gửi khóa học:", err.response?.data || err.message);
      toast.error("Gửi dữ liệu thất bại!");
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
                className={`flex items-center cursor-pointer gap-2 border-b-2 px-2 py-3 text-sm font-medium ${
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
                  Tiêu đề <span className="text-red-600">*</span>
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
                  Giá <span className="text-red-600">*</span>
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
              {
                <div>
                  <h2 className="mt-12 mb-6 text-xl font-semibold text-slate-900">
                    Thông tin nâng cao
                  </h2>

                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <div className="rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#ff6e54] focus:border-[#ff6e54] p-4">
                      <div className="mb-2 text-sm font-medium">
                        Hình thu nhỏ của khóa học
                      </div>
                      <p className="text-xs text-slate-500">
                        Tải hình thu nhỏ của khóa học lên đây.{" "}
                        <span className="font-medium">
                          Hướng dẫn quan trọng:
                        </span>{" "}
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
                        Những sinh viên xem video quảng cáo được làm tốt có khả
                        năng đăng ký khóa học của bạn cao hơn 5 lần.
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
                    <div className="mb-1 text-sm font-medium">
                      Mô tả khóa học <span className="text-red-600">*</span>
                    </div>

                    {/* focus viền mảnh #ff6e54 */}
                    <div
                      className="rounded-md border border-slate-300 
                  focus-within:ring-1 focus-within:ring-[#ff6e54] 
                  focus-within:border-[#ff6e54]"
                    >
                      {/* Thanh toolbar */}
                      <div className="flex gap-1 border-b border-slate-200 px-2 py-1">
                        <Btn
                          onClick={() =>
                            editor.chain().focus().toggleBold().run()
                          }
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
                </div>
              }
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

          {/* CURRICULUM */}
          {tab === 1 && (
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

                    <div className="space-y-4">
                      {sec.lectures.map((lec) => (
                        <div
                          key={lec.id}
                          className="rounded-md bg-white ring-1 ring-slate-200"
                        >
                          {/* ---- ROW 1: Header lesson ---- */}
                          <div className="flex items-center gap-3 p-3">
                            <span className="text-slate-400">≡</span>

                            <input
                              value={lec.name}
                              onChange={(e) =>
                                renameLecture(sec.id, lec.id, e.target.value)
                              }
                              className="flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm
                     focus:outline-none focus:ring-1 focus:ring-orange-500"
                            />

                            {/* Add video button */}
                            <label
                              className="px-3 py-1 text-sm cursor-pointer rounded-md bg-orange-50 
                          ring-1 ring-orange-200 hover:bg-orange-100"
                            >
                              Add video
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

                            {/* Add document button */}
                            <label
                              className="px-3 py-1 text-sm cursor-pointer rounded-md bg-blue-50 
                          ring-1 ring-blue-200 hover:bg-blue-100"
                            >
                              Add tài liệu
                              <input
                                type="file"
                                accept=".pdf,.doc,.docx,.ppt,.pptx,.zip,.txt"
                                className="hidden"
                                onChange={(e) =>
                                  handleDocumentUpload(
                                    lec.id,
                                    e.target.files[0]
                                  )
                                }
                              />
                            </label>
                          </div>

                          {/* ---- ROW 2: Files list ---- */}
                          <div className="px-4 pb-3 space-y-2">
                            {/* VIDEO PREVIEW LIST */}
                            {lec.videoUrl && (
                              <div className="flex justify-between items-center bg-slate-50 px-3 py-2 rounded-md hover:bg-slate-100">
                                <div
                                  className="flex-1 cursor-pointer"
                                  onClick={() =>
                                    setPreviewItem({
                                      type: "video",
                                      url: URL_BASE + lec.videoUrl,
                                    })
                                  }
                                >
                                  <span className="text-sm">
                                    Video đã tải lên
                                  </span>
                                </div>

                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setPreviewItem({
                                        type: "video",
                                        url: URL_BASE + lec.videoUrl,
                                      });
                                    }}
                                    className="text-xs text-slate-500 hover:text-slate-700 cursor-pointer"
                                  >
                                    <Eye className="size-5" />
                                  </button>

                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      deleteVideoFromLecture(lec.id);
                                    }}
                                    disabled={deletingId === `video-${lec.id}`}
                                    className={`ml-2 rounded px-2 py-1 cursor-pointer text-xs ${
                                      deletingId === `video-${lec.id}`
                                        ? "bg-gray-100 text-slate-400"
                                        : "bg-red-50 text-red-600 ring-1 ring-red-100 hover:bg-red-100"
                                    }`}
                                    title="Xóa video"
                                  >
                                    {deletingId === `video-${lec.id}` ? (
                                      "Đang xóa…"
                                    ) : (
                                      <Trash className="size-4" />
                                    )}
                                  </button>
                                </div>
                              </div>
                            )}

                            {/* DOCUMENT LIST */}
                            {(lec.documents || []).map((d, idx) => (
                              <div
                                key={idx}
                                className="flex justify-between items-center bg-slate-50 px-3 py-2 rounded-md hover:bg-slate-100"
                              >
                                <div
                                  className="truncate max-w-[70%] text-sm cursor-pointer"
                                  onClick={() =>
                                    setPreviewItem({
                                      type: "doc",
                                      url: d.url,
                                      name: d.name,
                                    })
                                  }
                                >
                                  {d.name}
                                </div>

                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setPreviewItem({
                                        type: "doc",
                                        url: d.url,
                                        name: d.name,
                                      });
                                    }}
                                    className="text-xs cursor-pointer text-slate-500 hover:text-slate-700"
                                  >
                                    <Eye className="size-5" />
                                  </button>

                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      deleteDocumentFromLecture(lec.id, idx);
                                    }}
                                    disabled={
                                      deletingId === `doc-${lec.id}-${idx}`
                                    }
                                    className={`ml-2 rounded cursor-pointer px-2 py-1 text-xs ${
                                      deletingId === `doc-${lec.id}-${idx}`
                                        ? "bg-gray-100 text-slate-400"
                                        : "bg-red-50 text-red-600 ring-1 ring-red-100 hover:bg-red-100"
                                    }`}
                                    title="Xóa tài liệu"
                                  >
                                    {deletingId === `doc-${lec.id}-${idx}` ? (
                                      "Đang xóa…"
                                    ) : (
                                      <Trash className="size-4" />
                                    )}
                                  </button>
                                </div>
                              </div>
                            ))}

                            {(lec.documents || []).length === 0 &&
                              !lec.videoUrl && (
                                <div className="text-xs text-slate-400">
                                  Chưa có video/tài liệu.
                                </div>
                              )}
                          </div>
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
        </div>
      </div>
      {previewItem && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] p-4">
            {/* Nút đóng */}
            <button
              onClick={() => setPreviewItem(null)}
              aria-label="Close preview"
              className="absolute -top-3 -right-3 bg-white shadow-lg rounded-full w-8 h-8
                   flex items-center justify-center text-slate-600 hover:bg-slate-100 hover:text-black"
            >
              ✕
            </button>

            {/* Header (tên file + download) */}
            <div className="mb-3 flex items-center justify-between gap-3">
              <div className="truncate font-medium text-sm">
                {previewItem.name ||
                  decodeURIComponent(
                    (previewItem.url || "").split("/").pop() || ""
                  )}
              </div>
              <a
                href={previewItem.url}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-slate-500 hover:text-slate-700"
              >
                Tải về
              </a>
            </div>

            {/* Nội dung preview thông minh */}
            <div className="overflow-auto">
              {(() => {
                const ext = getFileExt(
                  previewItem.name || previewItem.url || ""
                );
                const fullUrl = previewItem.url?.startsWith("http")
                  ? previewItem.url
                  : `${URL_BASE}${previewItem.url}`;
                console.log("fullUrl: ", fullUrl);
                // VIDEO
                if (
                  previewItem.type === "video" ||
                  ["mp4", "webm", "ogg"].includes(ext)
                ) {
                  return (
                    <video
                      src={fullUrl}
                      controls
                      className="w-full max-h-[80vh] rounded-md bg-black"
                    />
                  );
                }

                // PDF: dùng iframe/object nếu có thể
                if (isPdf(ext)) {
                  // iframe sẽ hiển thị nếu server trả inline PDF & cho phép embedding
                  return (
                    <iframe
                      src={fullUrl}
                      className="w-full h-[80vh] rounded-md border"
                      title={previewItem.name || "PDF preview"}
                    />
                  );
                }

                // DOC / PPT / XLS: sử dụng Google Docs Viewer
                if (isDocLike(ext)) {
                  const gview = `https://docs.google.com/gview?url=${encodeURIComponent(
                    fullUrl
                  )}&embedded=true`;
                  return (
                    <iframe
                      src={gview}
                      className="w-full h-[80vh] rounded-md border"
                      title={previewItem.name || "Document preview"}
                    />
                  );
                }

                // Nếu không xác định: hiển thị message + link download
                return (
                  <div className="w-full h-[40vh] flex flex-col items-center justify-center gap-3 rounded-md border-dashed border-2 border-slate-200 p-6 text-center">
                    <div className="text-sm font-medium">
                      Không hỗ trợ hiển thị file này
                    </div>
                    <div className="text-xs text-slate-500">
                      Bạn có thể tải file về để xem bằng ứng dụng tương ứng.
                    </div>
                    <a
                      href={previewItem.url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 rounded-md px-3 py-1 text-sm bg-orange-50 text-orange-600 ring-1 ring-orange-100"
                    >
                      Tải về
                    </a>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
const getFileExt = (urlOrName = "") => {
  try {
    const last = (urlOrName || "").split("?")[0].split("/").pop() || "";
    const parts = last.split(".");
    return parts.length > 1 ? parts.pop().toLowerCase() : "";
  } catch {
    return "";
  }
};

const isPdf = (ext) => ext === "pdf";
const isDocLike = (ext) =>
  ["doc", "docx", "ppt", "pptx", "xls", "xlsx"].includes(ext);

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
