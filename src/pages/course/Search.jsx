import React, { useMemo, useState } from "react";
import CourseCard from "../../components/CourseCard";
import InstructorCard from "../../components/InstructorCard";

// NOTE: This component assumes Tailwind CSS is available in your project.
// Drop it into a Vite/CRA/Next.js app with Tailwind configured.
// Images are from Unsplash placeholders.

const coursesSeed = [
  {
    id: 1,
    title: "AWS Certified solutions Architect",
    category: "Design",
    duration: "3 Month",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop",
    author: "Lina",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop",
    oldPrice: 100,
    price: 80,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
  },
  {
    id: 2,
    title: "AWS Certified solutions Architect",
    category: "Design",
    duration: "3 Month",
    image:
      "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?q=80&w=1200&auto=format&fit=crop",
    author: "Lina",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop",
    oldPrice: 100,
    price: 80,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
  },
  {
    id: 3,
    title: "AWS Certified solutions Architect",
    category: "Design",
    duration: "3 Month",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop",
    author: "Lina",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop",
    oldPrice: 100,
    price: 80,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
  },
  {
    id: 4,
    title: "AWS Certified solutions Architect",
    category: "Design",
    duration: "3 Month",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop",
    author: "Lina",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop",
    oldPrice: 100,
    price: 80,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
  },
  {
    id: 5,
    title: "AWS Certified solutions Architect",
    category: "Design",
    duration: "3 Month",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
    author: "Lina",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop",
    oldPrice: 100,
    price: 80,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
  },
  {
    id: 6,
    title: "AWS Certified solutions Architect",
    category: "Design",
    duration: "3 Month",
    image:
      "https://images.unsplash.com/photo-1514790193030-c89d266d5a9d?q=80&w=1200&auto=format&fit=crop",
    author: "Lina",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop",
    oldPrice: 100,
    price: 80,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
  },
  {
    id: 7,
    title: "AWS Certified solutions Architect",
    category: "Design",
    duration: "3 Month",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
    author: "Lina",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop",
    oldPrice: 100,
    price: 80,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
  },
  {
    id: 8,
    title: "AWS Certified solutions Architect",
    category: "Design",
    duration: "3 Month",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
    author: "Lina",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop",
    oldPrice: 100,
    price: 80,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
  },
];

function TagButton({ label }) {
  return (
    <button
      className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm hover:border-slate-300 hover:bg-slate-50"
      type="button"
    >
      {label}
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="opacity-70"
      >
        <path
          d="M7 10l5 5 5-5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

function SearchBar({ value, onChange, onSubmit }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.();
      }}
      className="relative mx-auto flex w-full max-w-3xl items-center rounded-full bg-white p-1 pl-4 shadow-xl ring-1 ring-slate-100"
    >
      <input
        type="text"
        placeholder="Search your favourite course"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-12 flex-1 rounded-full bg-transparent pl-2 text-base text-slate-700 placeholder:text-slate-400 focus:outline-none"
      />
      <button
        className="cursor-pointer mr-1 rounded-full bg-slate-900 px-8 py-3 text-sm font-semibold text-white hover:bg-slate-800"
        type="submit"
      >
        Search
      </button>
    </form>
  );
}

function Filters() {
  const items = [
    "Subject",
    "Partner",
    "Program",
    "Language",
    "Alailability",
    "Learning Type",
  ];
  return (
    <div className="mt-4 flex flex-wrap items-center gap-3">
      {items.map((i) => (
        <TagButton key={i} label={i} />
      ))}
    </div>
  );
}
const instructors = [
  {
    id: 1,
    name: "Jane Cooper",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
  },
  {
    id: 2,
    name: "Adam",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
  },
  {
    id: 3,
    name: "Tomara",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
  },
];

export default function Search() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query) return coursesSeed;
    const q = query.toLowerCase();
    return coursesSeed.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        c.author.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="min-h-screen bg-slate-50 ">
      

      {/* Filters */}
      <div className="mx-auto max-w-7xl px-6">
        <Filters />
      </div>

      {/* Grid */}
      <div className="mx-auto mt-8 max-w-7xl px-6 pb-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((c) => (
            <CourseCard key={c.id} c={c} />
          ))}
        </div>
      </div>
      {/* Instructors */}
      <div className="bg-[#ebf5ff] mx-auto  px-14 pt-6 pb-24">
        <div className="mb-10 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-slate-900">
            Classes taught by real creators
          </h2>
          <button className="text-sm font-medium text-slate-700 hover:text-slate-900">
            See all
          </button>
        </div>
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {[...instructors, ...instructors].map((i, idx) => (
            <InstructorCard key={`${i.id}-${idx}`} i={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
