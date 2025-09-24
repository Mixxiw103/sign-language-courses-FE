/*
  Course Detail Page (TailwindCSS)
  - Header with breadcrumb & actions
  - Hero video
  - Action bar (Save/Download/Share)
  - Tabs (Overview/Notes/Announcements/Reviews)
  - Left content cards (Summary/Description/Instructor/CTA)
  - Right sidebar: My Progress + Course Content accordion

  Usage: import CourseDetail from './CourseDetail'
*/

import { useState } from "react";

const sections = [
  {
    id: "sec1",
    title: "Course Intro",
    lessons: [
      { id: "l1", title: "Welcome", durationMin: 12, status: "done" },
      { id: "l2", title: "How this course works", durationMin: 48, status: "idle" },
    ],
  },
  {
    id: "sec2",
    title: "01: Learn The Alphabets",
    lessons: [{ id: "l3", title: "Alphabet Basics", durationMin: 23, status: "done" }],
  },
  {
    id: "sec3",
    title: "02: Touch The Grass",
    lessons: [
      { id: "l4", title: "Go outside", durationMin: 10, status: "idle" },
      { id: "l5", title: "Talk to people", durationMin: 13, status: "locked" },
    ],
  },
  { id: "sec4", title: "Final Quiz & Transformation", lessons: [{ id: "l6", title: "Final Quiz", durationMin: 20, status: "locked" }] },
]




export default function CourseDetail() {
    const [activeLesson, setActiveLesson] = useState(null)
  const [open, setOpen] = useState({
    s1: true,
    s2: true,
    s3: false,
    s4: false,
  });

  return (
    <div className="grid grid-cols-24 bg-[#f7fafc] ">
      <div className="col-span-1 "></div>
      <div className="col-span-18 bg-white ">
        <div className="p-8 shadow-sm">
          {/* Title */}
          <h1 className="text-2xl ml-2 text-left font-bold text-textColor">
            How To Speak To Anyone Without Being Cringe
          </h1>

          {/* Meta info */}
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-600">
            <Meta
              icon="⭐"
              number="4.5"
              label={
                <>
                  {" "}
                  <span className="ml-1">14,115 Ratings</span>
                </>
              }
            />
            <Meta
              icon="👥"
              number="321,195"
              label={
                <>
                  {" "}
                  <span className="ml-1">Students Enrolled</span>
                </>
              }
            />
            <Meta
              icon="⏱"
              number="1.2h"
              label={
                <>
                  {" "}
                  <span className="ml-1">Total Duration</span>
                </>
              }
            />
            <Meta
              icon="🕒"
              number="3d ago"
              label={
                <>
                  {" "}
                  <span className="ml-1">Last Updated</span>
                </>
              }
            />
            <Meta
              icon="🌐"
              number="8+"
              label={
                <>
                  {" "}
                  <span className="ml-1">Languages</span>
                </>
              }
            />
          </div>

          {/* Hero video */}
          <div className="mt-6 aspect-video w-full overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-200 to-slate-100">
            {/* <button className="mx-auto my-24 block h-16 w-16 rounded-full bg-indigo-600 text-2xl text-white shadow-lg md:my-40">
              ▶
            </button> */}
          </div>

          {/* Actions */}
          <div className="mt-3 flex flex-wrap items-center justify-between border-t border-slate-200 pt-3 text-sm">
            <div className="flex gap-3">
              <Ghost>Save Note</Ghost>
              <Ghost>Download</Ghost>
            </div>
            <div className="flex items-center gap-3">
              <Ghost>Share</Ghost>
              <Ghost icon>👍</Ghost>
              <Ghost icon>👎</Ghost>
              <Ghost icon>💬</Ghost>
            </div>
          </div>
          {/* Tabs */}
          <div className="mt-4 border-b border-slate-200">
            <div className="flex items-center gap-6">
              <button className="-mb-px border-b-2 border-indigo-600 pb-3 text-sm font-medium text-indigo-700">
                Overview
              </button>
              <button className="-mb-px border-b-2 border-transparent pb-3 text-sm text-slate-500 hover:text-slate-700">
                Notes
              </button>
              <button className="-mb-px border-b-2 border-transparent pb-3 text-sm text-slate-500 hover:text-slate-700">
                Announcements
              </button>
              <button className="-mb-px border-b-2 border-transparent pb-3 text-sm text-slate-500 hover:text-slate-700">
                Reviews
              </button>
            </div>
          </div>

          {/* Summary */}
          <div className="mt-6">
            {/* tiêu đề hàng */}
            <div className="grid grid-cols-12 items-start gap-6 py-5 border-t border-slate-200 first:border-t-0">
              <div className="text-left font-bold col-span-12 sm:col-span-3 text-sm text-slate-600">
                Summary
              </div>

              <div className="col-span-12 sm:col-span-9">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <SummaryItem
                    icon="🧭"
                    label="Skill Level"
                    value="All Levels"
                  />
                  <SummaryItem icon="📚" label="Lectures" value="25" />
                  <SummaryItem icon="👥" label="Students" value="215,118" />
                  <SummaryItem icon="⏱" label="Duration" value="6h" />
                  <SummaryItem icon="🌐" label="Languages" value="EN, JP" />
                  <SummaryItem icon="🎓" label="Certification" value="Yes" />
                  <SummaryItem icon="🅲" label="Captions" value="Yes" />
                  <SummaryItem icon="📱" label="App Support" value="Yes" />
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="grid grid-cols-12 items-start gap-6 py-5 border-t border-slate-200">
              <div className="text-left font-bold col-span-12 sm:col-span-3 text-sm text-slate-600">
                Description
              </div>

              <div className="text-left col-span-12 sm:col-span-9 space-y-4 text-slate-700">
                <p>
                  Are you tired of awkward silences and cringe-worthy
                  conversations? Do you want to connect with people effortlessly
                  and leave a positive, lasting impression? Welcome to “How to
                  Speak to Anyone Without Being Cringe,” a transformative course
                  designed to equip you with the skills and confidence to engage
                  in meaningful, enjoyable conversations with anyone, anytime.
                </p>

                <p className="font-semibold text-slate-900">
                  What You'll Learn:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <span className="font-medium">
                      Build Genuine Connections:
                    </span>{" "}
                    Discover techniques for creating authentic connections that
                    go beyond surface-level interactions.
                  </li>
                  <li>
                    <span className="font-medium">
                      Improve Your Listening Skills:
                    </span>{" "}
                    Understand the importance of active listening and how to
                    make others feel heard and valued.
                  </li>
                </ul>
              </div>
            </div>
            {/* Course Instructor */}
            <div className="grid grid-cols-12 items-start gap-6 py-5 border-t border-slate-200">
              {/* Label bên trái */}
              <div className="col-span-12 sm:col-span-3 text-sm text-left font-bold text-slate-600">
                Course Instructor
              </div>

              {/* Nội dung bên phải */}
              <div className="col-span-12 sm:col-span-9 space-y-4">
                <div className="flex items-center gap-4">
                  <img
                    src="https://i.pravatar.cc/80?img=32" // thay bằng ảnh thật
                    alt="Instructor"
                    className="h-14 w-14 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-left font-semibold text-slate-900">
                      Mai Sakurajima Senpai
                    </p>
                    <p className="text-left text-sm text-slate-600">
                      Professional Sloth Girl, slothUI
                    </p>
                  </div>
                </div>

                {/* Social icons */}
                <div className="flex gap-4">
                  <a href="#" className="text-slate-600 hover:text-slate-900">
                    <i className="fa-brands fa-facebook text-xl"></i>
                    
                  </a>
                  <a href="#" className="text-slate-600 hover:text-slate-900">
                    <i className="fa-brands fa-x-twitter text-xl"></i>
                    
                  </a>
                  <a href="#" className="text-slate-600 hover:text-slate-900">
                    <i className="fa-brands fa-linkedin text-xl"></i>
                    
                  </a>
                  <a href="#" className="text-slate-600 hover:text-slate-900">
                    <i className="fa-brands fa-github text-xl"></i>
                    
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-5 pl-0.5">
  <CourseContentSidebar
    sections={sections}
    activeLessonId={activeLesson?.id}
    onSelectLesson={(lesson) => setActiveLesson(lesson)}
    defaultOpen={[sections[0]?.id, sections[1]?.id]}
  />
</div>
    </div>
  );
}
function Meta({ icon, number = 0, label }) {
  return (
    <div className="flex items-center gap-2 rounded-full bg-white px-4 py-1.5">
      <div className="flex flex-col items-start">
        <div className="flex items-center">
          <span>{icon}</span>
          <span className="ml-1 font-semibold text-slate-900">4.5</span>
        </div>
        <span className="text-slate-700 text-xs mt-1">{label}</span>
      </div>
    </div>
  );
}

function Ghost({ children, icon }) {
  return (
    <button
      className={`rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-slate-700 hover:bg-slate-50 ${
        icon ? "text-base" : "text-sm"
      }`}
    >
      {children}
    </button>
  );
}

function SummaryItem({ icon, label, value }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="font-medium text-slate-500">{icon}</span>
      <span className="font-medium text-slate-500">{label}:</span>
      <span className=" font-medium text-slate-500">{value}</span>
    </div>
  );
}

function CourseContentSidebar({ sections = [], activeLessonId, onSelectLesson = () => {}, defaultOpen = [] }) {
  const [open, setOpen] = useState(() => new Set(defaultOpen.length ? defaultOpen : sections.map(s => s.id)))
  const toggle = (id) => { const n = new Set(open); n.has(id) ? n.delete(id) : n.add(id); setOpen(n) }

  return (
    <aside className="">
      <div className="flex items-center justify-between p-4">
        <h3 className="text-lg font-semibold text-slate-900">Course Content</h3>
        <button className="text-slate-400 hover:text-slate-600">⋯</button>
      </div>

      <div className="divide-y divide-slate-200">
        {sections.map((sec) => {
          const totalDone = sec.lessons.filter(l => l.status === "done").length
          const totalMin = sec.lessons.reduce((a, b) => a + (b.durationMin || 0), 0)
          return (
            <div key={sec.id} className="px-2">
              <button onClick={() => toggle(sec.id)} className="flex w-full items-center justify-between py-3 px-2">
                <div>
                  <div className="text-[15px] font-semibold text-slate-800">{sec.title}</div>
                  <div className="text-xs text-slate-500">{totalDone}/{sec.lessons.length} • {formatMin(totalMin)} Total</div>
                </div>
                <Chevron open={open.has(sec.id)} />
              </button>

              {open.has(sec.id) && (
                <div className="pb-2">
                  {sec.lessons.map((l) => {
                    const isActive = l.id === activeLessonId
                    return (
                      <button
                        key={l.id}
                        onClick={() => onSelectLesson(l, sec)}
                        className={[
                          "w-full rounded-xl border px-3 py-2 text-left mb-2 flex items-center justify-between",
                          isActive ? "border-indigo-300 bg-indigo-50" : "border-slate-200 hover:bg-slate-50"
                        ].join(" ")}
                      >
                        <div className="flex items-center gap-3">
                          <StatusIcon status={l.status} active={isActive} />
                          <div>
                            <div className="text-sm font-medium text-slate-800">{l.title}</div>
                            <div className="text-xs text-slate-500">{formatMin(l.durationMin)}</div>
                          </div>
                        </div>
                        <RightBadge status={l.status} active={isActive} />
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </aside>
  )
}

function Chevron({ open }) {
  return (
    <svg className={"h-5 w-5 transition-transform text-slate-400 " + (open ? "rotate-180" : "")}
      viewBox="0 0 20 20" fill="currentColor">
      <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.17l3.71-2.94a.75.75 0 111.04 1.08l-4.24 3.36a.75.75 0 01-.94 0L5.21 8.31a.75.75 0 01.02-1.1z"/>
    </svg>
  )
}
function StatusIcon({ status, active }) {
  if (status === "done") return (
    <svg className="h-6 w-6 text-emerald-600" viewBox="0 0 24 24" fill="currentColor">
      <path d="M9 16.2l-3.5-3.5 1.4-1.4L9 13.4l7.7-7.7 1.4 1.4z"/>
    </svg>
  )
  if (status === "locked") return (
    <svg className="h-6 w-6 text-slate-400" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 1a5 5 0 00-5 5v3H6a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2v-8a2 2 0 00-2-2h-1V6a5 5 0 00-5-5zm-3 8V6a3 3 0 116 0v3H9z"/>
    </svg>
  )
  return (
    <svg className={"h-6 w-6 " + (active ? "text-indigo-600" : "text-slate-400")}
      viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z"/>
    </svg>
  )
}
function RightBadge({ status, active }) {
  if (status === "done")
    return <span className="grid h-6 w-6 place-items-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">✓</span>
  return (
    <span className={[
      "grid h-6 w-6 place-items-center rounded-full border",
      active ? "border-indigo-300 text-indigo-600 bg-indigo-50" : "border-slate-300 text-slate-400"
    ].join(" ")}>▶</span>
  )
}
function formatMin(min=0){ return min >= 60 ? `${Math.floor(min/60)}h ${min%60}m` : `${min} Minutes` }
