export default function AdminPlaceholder({ title, description, endpoint }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
      <p className="mt-1 text-slate-500">{description}</p>

      <div className="mt-8 card-surface p-12 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary-50 text-3xl">🚧</div>
        <h3 className="mt-4 font-semibold text-slate-800">Module Connected</h3>
        <p className="mt-2 text-sm text-slate-500 max-w-md mx-auto">
          This section is wired to <code className="rounded bg-slate-100 px-1.5 py-0.5 text-primary-700">{endpoint}</code>.
          Full CRUD will activate as backend endpoints are implemented.
        </p>
      </div>
    </div>
  );
}
