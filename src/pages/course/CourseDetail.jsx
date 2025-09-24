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

import { useState } from 'react'

export default function CourseDetail() {
    const [open, setOpen] = useState({ s1: true, s2: true, s3: false, s4: false })

    return (
        <div className='grid grid-cols-24 gap-4'>
            <div className="col-span-1  p-1 "></div>
            <div className="col-span-18  p-1 ">
                <div className="p-12  rounded-2xl shadow-sm">
                    {/* Title */}
                    <h1 className="text-2xl text-left pl-10 font-bold text-slate-900">
                        How To Speak To Anyone Without Being Cringe
                        </h1>


                    {/* Meta info */}
                    <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-600">
                        <Meta icon="⭐" label={<><span className="font-semibold text-slate-900">4.5</span> <span className="ml-1">14,115 Ratings</span></>} />
                        <Meta icon="👥" label={<><span className="font-semibold text-slate-900">321,195</span> Students Enrolled</>} />
                        <Meta icon="⏱" label={<><span className="font-semibold text-slate-900">1.2h</span> Total Duration</>} />
                        <Meta icon="🕒" label={<>3d ago • Last Updated</>} />
                        <Meta icon="🌐" label={<><span className="font-semibold text-slate-900">8+</span> Languages</>} />
                    </div>


                    {/* Hero video */}
                    <div className="mt-6 aspect-video w-full overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-200 to-slate-100">
                        <button className="mx-auto my-24 block h-16 w-16 rounded-full bg-indigo-600 text-2xl text-white shadow-lg md:my-40">▶</button>
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
                </div>
            </div>
            <div className="col-span-5 bg-pink-100 p-1"></div>
        </div>
    )
}

function Crumb({ children, active }) {
    return (
        <div className="flex items-center gap-2">
            <span className={active ? 'font-medium text-slate-900' : ''}>{children}</span>
            {!active && <span className="text-slate-300">/</span>}
        </div>
    )
}

function Meta({ icon, label }) {
    return (
        <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5">
            <span>{icon}</span>
            <span className="text-slate-700">{label}</span>
        </div>
    )
}

function Ghost({ children, icon }) {
    return (
        <button className={`rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-slate-700 hover:bg-slate-50 ${icon ? 'text-base' : 'text-sm'}`}>{children}</button>
    )
}

function Tab({ children, active }) {
    return (
        <button className={`-mb-px border-b-2 px-1.5 py-3 text-sm ${active ? 'border-indigo-600 text-indigo-700' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>{children}</button>
    )
}

function Card({ title, children }) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
            {title && <div className="mb-3 text-sm font-semibold text-slate-700">{title}</div>}
            {children}
        </div>
    )
}

function SummaryItem({ label, value }) {
    return (
        <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm">
            <span className="text-slate-500">{label}</span>
            <span className="font-medium text-slate-800">{value}</span>
        </div>
    )
}

function ProgressBar({ value = 0 }) {
    return (
        <div>
            <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Overall Progress</span>
                <span className="font-medium text-slate-700">{value}%</span>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                <div className="h-full bg-gradient-to-r from-indigo-600 to-sky-500" style={{ width: `${value}%` }} />
            </div>
        </div>
    )
}

function AccordionSection({ title, total, open, onToggle, children }) {
    return (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <button onClick={onToggle} className="flex w-full items-center justify-between px-4 py-3 text-left">
                <div>
                    <div className="font-medium text-slate-800">{title}</div>
                    {total && <div className="text-xs text-slate-500">{total}</div>}
                </div>
                <span className="text-slate-400">{open ? '▾' : '▸'}</span>
            </button>
            {open && <div className="border-t border-slate-100 p-2">{children}</div>}
        </div>
    )
}

function Lesson({ title, duration, completed, locked }) {
    return (
        <div className="flex items-center gap-3 rounded-xl px-2 py-2 text-sm hover:bg-slate-50">
            <span className={`grid h-6 w-6 place-items-center rounded-full border ${completed ? 'border-emerald-300 bg-emerald-50 text-emerald-600' : 'border-slate-200 text-slate-400'}`}>
                {locked ? '⛔' : completed ? '✓' : '▶'}
            </span>
            <div className="flex-1">
                <div className="font-medium text-slate-700">{title}</div>
                <div className="text-xs text-slate-500">{duration}</div>
            </div>
            <span className="text-xs text-slate-400">{completed ? 'Completed' : locked ? 'Locked' : ''}</span>
        </div>
    )
}
