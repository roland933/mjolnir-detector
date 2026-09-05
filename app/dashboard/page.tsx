export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-[1800px] p-6">
        <h1 className="mb-6 text-2xl font-bold">
          Mjölnir Detector
        </h1>

        <div className="grid gap-6 lg:grid-cols-[280px_1fr_320px]">
          {/* Detector Status */}
          <section className="rounded-xl border border-slate-800 bg-slate-900 p-5">
            <h2 className="mb-4 font-semibold">
              Detector Status
            </h2>

            <p className="text-sm text-emerald-400">
              ● Online
            </p>
          </section>

          {/* Map */}
          <section className="min-h-[600px] rounded-xl border border-slate-800 bg-slate-900">
            <div className="flex h-full items-center justify-center">
              <span className="text-slate-500">
                Map
              </span>
            </div>
          </section>

          {/* Live Feed */}
          <section className="rounded-xl border border-slate-800 bg-slate-900 p-5">
            <h2 className="mb-4 font-semibold">
              Live Feed
            </h2>

            <p className="text-sm text-slate-400">
              No detections yet...
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}