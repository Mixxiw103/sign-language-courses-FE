import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { useAuth } from "../../auth/AuthContext";
import { useState, useEffect } from "react";
import { api, URL_BASE } from "../../utils/api";
import { toast } from "react-toastify";
import { Eye, Trash } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

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
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [previewItem, setPreviewItem] = useState(null);
  const [loadingData, setLoadingData] = useState(false);

  const TABS = [
    { key: "basic", label: "Thông tin khóa học", icon: IconLayers },
    { key: "curriculum", label: "Chương trình học", icon: IconPlaySquare },
  ];

  const [tab, setTab] = useState(0);

  // BASIC
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState();
  const [category, setCategory] = useState("Chọn...");
  const [level, setLevel] = useState("Chọn...");

  // ADVANCE
  const [thumbUrl, setThumbUrl] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState(null);
  const [descHtml, setDescHtml] = useState("");

  // CURRICULUM
  const [sections, setSections] = useState([
    {
      id: 1,
      name: "Tên Chương học",
      lectures: [
        { id: 1, name: "Tên bài học 1", videoUrl: "", content: "" }, // [MOD] content default
        { id: 2, name: "Tên bài học 2", videoUrl: "", content: "" },
      ],
    },
  ]);

  // Editor
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

  // [MOD] --- EFFECT: FETCH DATA KHI EDIT ---
  useEffect(() => {
    if (!isEditMode || !id) return;

    const fetchCourseData = async () => {
      setLoadingData(true);
      try {
        const res = await api.get(`/api/courses/${id}`);
        const data = res.data;

        setTitle(data.title || "");
        setPrice(data.price || 0);
        setThumbUrl(data.thumbnail_url || "");
        setTrailerUrl(data.demo_video_url || "");
        if (data.category) setCategory(data.category);
        if (data.level) setLevel(data.level);

        if (editor && data.description) {
          editor.commands.setContent(data.description);
          setDescHtml(data.description);
        }

        // [MOD] Map Chapters -> Sections
        if (data.chapters && data.chapters.length > 0) {
          const mappedSections = data.chapters.map((chap) => ({
            id: chap._id,
            name: chap.title,
            lectures: (chap.lessons || []).map((les) => ({
              id: les._id,
              name: les.title,
              videoUrl: les.video_url || "",
              documents: les.documents || [],
              content: les.content || "", // [MOD] Lấy content từ DB
            })),
          }));
          setSections(mappedSections);
        }
      } catch (err) {
        console.error("Lỗi lấy thông tin khóa học:", err);
        toast.error("Không thể tải thông tin khóa học");
        navigate("/teacher/my-courses");
      } finally {
        setLoadingData(false);
      }
    };

    fetchCourseData();
  }, [id, isEditMode, editor]);

  // --- HELPERS ---

  const updateLectureVideoUrl = (lectureId, newUrl) => {
    setSections((prevSections) =>
      prevSections.map((section) => ({
        ...section,
        lectures: section.lectures.map((lec) =>
          lec.id === lectureId ? { ...lec, videoUrl: newUrl } : lec
        ),
      }))
    );
  };

  // [MOD] Helper update Content cho Lesson
  const updateLectureContent = (sid, lid, newContent) => {
    setSections((s) =>
      s.map((sec) =>
        sec.id === sid
          ? {
              ...sec,
              lectures: sec.lectures.map((l) =>
                l.id === lid ? { ...l, content: newContent } : l
              ),
            }
          : sec
      )
    );
  };

  const saveDraft = () => {
    // Lưu tạm vào localStorage (bao gồm content)
    const payload = {
      title,
      price,
      descHtml,
      sections,
      // ... các field khác
    };
    localStorage.setItem("create-course-draft", JSON.stringify(payload));
    alert("Saved ✔");
  };

  const savePreview = () => {
    saveDraft();
    alert("Save & Preview… (mock)");
  };
  const next = () => setTab((t) => Math.min(t + 1, 1)); // Chỉ có 2 tab (0, 1)
  const prev = () => setTab((t) => Math.max(t - 1, 0));

  const onPickThumb = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!/^image\/(png|jpe?g)$/i.test(file.type))
      return alert("Chỉ hỗ trợ ảnh JPG, JPEG, PNG");

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
      alert("Upload thất bại: " + err.message);
    }
  };

  const onPickTrailer = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!/^video\//i.test(file.type)) return alert("Chỉ hỗ trợ file video");

    const form = new FormData();
    form.append("folder", `courses/videos/${user.id}`);
    form.append("file", file);

    try {
      const { data } = await api.post("/api/uploads", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setTrailerUrl(data.url);
    } catch (err) {
      alert("Upload thất bại: " + err.message);
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

  // [MOD] Updated addLecture
  const addLecture = (sid) =>
    setSections((s) =>
      s.map((sec) =>
        sec.id === sid
          ? {
              ...sec,
              lectures: [
                ...sec.lectures,
                {
                  id: Date.now(),
                  name: "Tên bài học",
                  videoUrl: "",
                  content: "",
                },
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

  const handleDocumentUpload = async (lecId, file) => {
    if (!file) return;
    const fd = new FormData();
    fd.append("folder", `courses/documents/${user?.id || ""}`);
    fd.append("file", file);
    try {
      setUploading(true);
      const res = await api.post("/api/uploads", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      addDocumentToLecture(lecId, { name: file.name, url: res.data.url });
      toast.success("Upload tài liệu thành công");
    } catch (err) {
      toast.error("Tải tài liệu thất bại");
    } finally {
      setUploading(false);
    }
  };

  const [deletingId, setDeletingId] = useState(null);

  const deleteVideoFromLecture = async (lecId) => {
    if (!confirm("Bạn có chắc muốn xóa video này?")) return;
    const lec = sections.flatMap((s) => s.lectures).find((l) => l.id === lecId);
    if (!lec?.videoUrl) return;
    const fullUrl = lec.videoUrl.startsWith("http")
      ? lec.videoUrl
      : `${URL_BASE}${lec.videoUrl}`;

    try {
      setDeletingId(`video-${lecId}`);
      setUploading(true);
      await api.delete("/api/uploads", { params: { url: fullUrl } });
      updateLectureVideoUrl(lecId, "");
      toast.success("Xóa video thành công");
    } catch (err) {
      if (err?.response?.status === 404) {
        updateLectureVideoUrl(lecId, "");
        toast.warning("File không tồn tại trên server — đã xóa cục bộ");
      } else toast.error("Xóa video thất bại");
    } finally {
      setUploading(false);
      setDeletingId(null);
    }
  };

  const deleteDocumentFromLecture = async (lectureId, docIndex) => {
    if (!confirm("Bạn có chắc muốn xóa tài liệu này?")) return;
    const lec = sections
      .flatMap((s) => s.lectures)
      .find((l) => l.id === lectureId);
    const doc = lec?.documents?.[docIndex];
    if (!doc) return;
    const fullUrl = doc.url?.startsWith("http")
      ? doc.url
      : `${URL_BASE}${doc.url}`;

    try {
      setDeletingId(`doc-${lectureId}-${docIndex}`);
      setUploading(true);
      await api.delete("/api/uploads", { params: { url: fullUrl } });
      removeDocumentFromLecture(lectureId, docIndex);
      toast.success("Xóa tài liệu thành công");
    } catch (err) {
      if (err?.response?.status === 404) {
        removeDocumentFromLecture(lectureId, docIndex);
        toast.warning("File không tồn tại trên server — đã xóa cục bộ");
      } else toast.error("Xóa tài liệu thất bại");
    } finally {
      setUploading(false);
      setDeletingId(null);
    }
  };

  const handleVideoUpload = async (lecId, file) => {
    if (!file) return;
    const fd = new FormData();
    fd.append("folder", `courses/videos/${user.id || "anon"}`);
    fd.append("file", file);
    try {
      setUploading(true);
      const res = await api.post("/api/uploads", fd);
      updateLectureVideoUrl(lecId, res.data.url);
      toast.success("Tải video lên thành công!");
    } catch (err) {
      toast.error("Tải video thất bại!");
    } finally {
      setUploading(false);
    }
  };

  // [MOD] SUBMIT: Thêm content vào payload
  const handleSubmitCreate = async () => {
    try {
      const payload = {
        course: {
          title: title.trim(),
          description: descHtml,
          lecturer_id: user.id,
          price: Number(price),
          status: "published",
          thumbnail_url: thumbUrl || "",
          demo_video_url: trailerUrl || "",
          category: category === "Chọn..." ? "" : category,
        },
        chapters: sections.map((sec, secIdx) => ({
          title: sec.name,
          order_index: secIdx,
          lessons: sec.lectures.map((lec, lecIdx) => ({
            title: lec.name,
            order_index: lecIdx,
            video_url: lec.videoUrl || "",
            documents: lec.documents || [],
            content: lec.content || "", // [MOD] SEND CONTENT TO SERVER
          })),
        })),
      };

      console.log("Payload gửi lên server:", payload);

      let res;
      if (isEditMode) {
        res = await api.put(`/api/courses/${id}/structure`, payload);
        toast.success("Cập nhật khóa học thành công!");
      } else {
        res = await api.post("/api/courses/create-structure", payload);
        toast.success("Tạo khóa học thành công!");
      }

      if (res.status === 200 || res.status === 201) {
        navigate("/teacher/my-courses");
      }
    } catch (err) {
      console.error("Lỗi gửi khóa học:", err.response?.data || err.message);
      toast.error(
        "Gửi dữ liệu thất bại: " + (err.response?.data?.error || err.message)
      );
    }
  };

  if (!editor) return null;
  if (loadingData)
    return (
      <div className="p-10 text-center text-slate-500">
        Đang tải dữ liệu khóa học...
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-6xl">
        {/* Tabs header */}
        <div className="rounded-t-xl bg-white px-4 pt-3 shadow-sm ring-1 ring-slate-100">
          <div className="flex items-center gap-6 overflow-x-auto">
            <div className="mr-2 font-bold text-lg text-slate-700 whitespace-nowrap py-2">
              {isEditMode ? "Sửa khóa học" : "Tạo khóa học"}
            </div>

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
          {/* BASIC TAB */}
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
              </div>

              {/* Advance Info Section */}
              <h2 className="mt-12 mb-6 text-xl font-semibold text-slate-900">
                Thông tin nâng cao
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-lg border border-slate-300 p-4">
                  <div className="mb-2 text-sm font-medium">Hình thu nhỏ</div>
                  <label className="mt-3 block cursor-pointer rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-orange-600 hover:bg-slate-100">
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

                <div className="rounded-lg border border-slate-300 p-4">
                  <div className="mb-2 text-sm font-medium">
                    Video giới thiệu
                  </div>
                  <label className="mt-3 block cursor-pointer rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-orange-600 hover:bg-slate-100">
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

              {/* Description Editor */}
              <div className="mt-6">
                <div className="mb-1 text-sm font-medium">
                  Mô tả khóa học <span className="text-red-600">*</span>
                </div>
                <div className="rounded-md border border-slate-300 focus-within:ring-1 focus-within:ring-[#ff6e54]">
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
                  </div>
                  <EditorContent
                    editor={editor}
                    className="tiptap px-3 py-2 text-sm min-h-[100px] focus:outline-none"
                  />
                </div>
              </div>

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

          {/* CURRICULUM TAB */}
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
                        className="flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#ff6e54]"
                      />
                      <div className="flex items-center gap-2">
                        <IconPlus
                          onClick={() => addLecture(sec.id)}
                          className="h-8 w-8 cursor-pointer rounded-md bg-white p-1.5 hover:bg-slate-50"
                        />
                        <IconTrash
                          onClick={() => removeSection(sec.id)}
                          className="h-8 w-8 cursor-pointer rounded-md bg-white p-1.5 hover:bg-slate-50"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      {sec.lectures.map((lec) => (
                        <div
                          key={lec.id}
                          className="rounded-md bg-white ring-1 ring-slate-200"
                        >
                          {/* ROW 1: Header */}
                          <div className="flex items-center gap-3 p-3">
                            <span className="text-slate-400">≡</span>
                            <input
                              value={lec.name}
                              onChange={(e) =>
                                renameLecture(sec.id, lec.id, e.target.value)
                              }
                              className="flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
                            />
                            <label className="px-3 py-1 text-sm cursor-pointer rounded-md bg-orange-50 ring-1 ring-orange-200 hover:bg-orange-100">
                              Add video
                              <input
                                type="file"
                                accept="video/*"
                                className="hidden"
                                onChange={(e) =>
                                  handleVideoUpload(lec.id, e.target.files[0])
                                }
                              />
                            </label>
                            <label className="px-3 py-1 text-sm cursor-pointer rounded-md bg-blue-50 ring-1 ring-blue-200 hover:bg-blue-100">
                              Add tài liệu
                              <input
                                type="file"
                                accept=".pdf,.doc,.docx"
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

                          {/* [MOD] ROW 1.5: Content Textarea */}
                          <div className="px-3 pb-2">
                            <textarea
                              value={lec.content || ""}
                              onChange={(e) =>
                                updateLectureContent(
                                  sec.id,
                                  lec.id,
                                  e.target.value
                                )
                              }
                              placeholder="Nhập nội dung chi tiết bài học (Text/Markdown)..."
                              rows={2}
                              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
                            />
                          </div>

                          {/* ROW 2: Files */}
                          <div className="px-4 pb-3 space-y-2">
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
                                  <Eye
                                    className="size-5 cursor-pointer text-slate-500"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setPreviewItem({
                                        type: "video",
                                        url: URL_BASE + lec.videoUrl,
                                      });
                                    }}
                                  />
                                  <Trash
                                    className="size-4 cursor-pointer text-red-600"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      deleteVideoFromLecture(lec.id);
                                    }}
                                  />
                                </div>
                              </div>
                            )}
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
                                  <Eye
                                    className="size-5 cursor-pointer text-slate-500"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setPreviewItem({
                                        type: "doc",
                                        url: d.url,
                                        name: d.name,
                                      });
                                    }}
                                  />
                                  <Trash
                                    className="size-4 cursor-pointer text-red-600"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      deleteDocumentFromLecture(lec.id, idx);
                                    }}
                                  />
                                </div>
                              </div>
                            ))}
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
                  {isEditMode ? "Cập nhật" : "Đăng tải"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* PREVIEW MODAL */}
      {previewItem && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] p-4">
            <button
              onClick={() => setPreviewItem(null)}
              className="absolute -top-3 -right-3 bg-white shadow-lg rounded-full w-8 h-8 flex items-center justify-center"
            >
              ✕
            </button>
            <div className="mb-3 flex items-center justify-between gap-3">
              <div className="truncate font-medium text-sm">
                {previewItem.name || "Preview"}
              </div>
              <a
                href={previewItem.url}
                target="_blank"
                className="text-xs text-slate-500"
              >
                Tải về
              </a>
            </div>
            <div className="overflow-auto">
              {/* Logic hiển thị preview rút gọn */}
              {previewItem.type === "video" ? (
                <video
                  src={
                    previewItem.url.startsWith("http")
                      ? previewItem.url
                      : URL_BASE + previewItem.url
                  }
                  controls
                  className="w-full max-h-[80vh] bg-black"
                />
              ) : (
                <iframe
                  src={`https://docs.google.com/gview?url=${encodeURIComponent(
                    previewItem.url.startsWith("http")
                      ? previewItem.url
                      : URL_BASE + previewItem.url
                  )}&embedded=true`}
                  className="w-full h-[80vh] border"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const getFileExt = (urlOrName = "") => {
  try {
    return (urlOrName.split("?")[0].split("/").pop() || "")
      .split(".")
      .pop()
      .toLowerCase();
  } catch {
    return "";
  }
};
const isPdf = (ext) => ext === "pdf";
const isDocLike = (ext) =>
  ["doc", "docx", "ppt", "pptx", "xls", "xlsx"].includes(ext);

/* Icons */
function IconLayers({ className }) {
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
function IconPlaySquare({ className }) {
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
function IconUpload({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M12 3v12M7 8l5-5 5 5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4 21h16" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
function IconPlus({ className, ...p }) {
  return (
    <svg {...p} className={className} viewBox="0 0 24 24" fill="none">
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}
function IconTrash({ className, ...p }) {
  return (
    <svg {...p} className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}
