export default function InstructorCard({ i }) {
  return (
    <div className="flex flex-col items-center">
      <img
        src={i.image}
        alt={i.name}
        className="h-40 w-40 rounded-md object-cover shadow"
      />
      <div className="-mt-8 w-full max-w-md rounded-md bg-white px-6 pb-8 pt-10 text-center shadow-md ring-1 ring-slate-100">
        <h4 className="text-lg font-semibold text-slate-800">{i.name}</h4>
        <p className="mt-2 text-sm leading-6 text-slate-500">{i.bio}</p>
      </div>
    </div>
  );
}
