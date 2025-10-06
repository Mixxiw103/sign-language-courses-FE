import { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";

export default function CourseDescriptionQuil() {
  const [descHtml, setDescHtml] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit,      // bold, italic, strike, heading, blockquote, ordered/bullet list, ...
      Underline,
      Link.configure({ openOnClick: false }),
    ],
    content: "",
    onUpdate: ({ editor }) => setDescHtml(editor.getHTML()), // <- HTML string bạn lưu DB
  });

  if (!editor) return null;

  return (
    <div className="mt-6">
      <div className="mb-1 text-sm font-medium">Mô tả khóa học</div>

      {/* focus viền mỏng #ff6e54 */}
      <div className="rounded-md border border-slate-300 focus-within:ring-1 focus-within:ring-[#ff6e54] focus-within:border-[#ff6e54]">
        {/* Toolbar */}
        <div className="flex gap-1 border-b border-slate-200 px-2 py-1">
          <Btn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')}>B</Btn>
          <Btn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')}>I</Btn>
          <Btn onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive('underline')}>U</Btn>
          <div className="mx-1 h-5 w-px bg-slate-200" />
          <Btn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')}>•</Btn>
          <Btn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')}>1.</Btn>
          <div className="mx-1 h-5 w-px bg-slate-200" />
          <Btn onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')}>“ ”</Btn>
        </div>

        {/* Editor area */}
        <EditorContent editor={editor} className="prose max-w-none px-3 py-2 text-sm" />
      </div>

      {/* Debug xem HTML (tắt khi xong) */}
      {/* <pre className="mt-2 text-xs text-slate-500 whitespace-pre-wrap">{descHtml}</pre> */}
    </div>
  );
}

function Btn({ children, onClick, active }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded px-2 py-1 text-xs ${active ? "bg-slate-100 font-semibold" : "hover:bg-slate-50"}`}
    >
      {children}
    </button>
  );
}
