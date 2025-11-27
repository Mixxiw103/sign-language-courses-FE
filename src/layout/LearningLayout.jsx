export default function LearningLayout({ sidebar, content }) {
  return (
    <div className="flex w-full min-h-screen bg-[#f7fafc]">
      {/* SIDEBAR CỐ ĐỊNH */}
      <div className="w-[360px] border-r bg-white shadow-sm fixed left-0 top-0 bottom-0 overflow-y-auto">
        {sidebar}
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 ml-[360px] p-8">{content}</div>
    </div>
  );
}
