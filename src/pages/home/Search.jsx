import React, { useMemo, useState } from "react";
import CourseCard from "../../conponents/CourseCard";

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
        <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
  const items = ["Subject", "Partner", "Program", "Language", "Alailability", "Learning Type"];
  return (
    <div className="mt-4 flex flex-wrap items-center gap-3">
      {items.map((i) => (
        <TagButton key={i} label={i} />
      ))}
    </div>
  );
}

export default function Search() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query) return coursesSeed;
    const q = query.toLowerCase();
    return coursesSeed.filter(
      (c) => c.title.toLowerCase().includes(q) || c.category.toLowerCase().includes(q) || c.author.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero / Search */}
      <div
        className="relative h-48 w-full overflow-hidden bg-slate-200"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=1600&auto=format&fit=crop)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center justify-center px-6">
          <SearchBar value={query} onChange={setQuery} />
        </div>
      </div>

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
    </div>
  );
}
