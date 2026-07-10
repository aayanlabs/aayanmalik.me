const services = [
  "Website Development",
  "AI Applications",
  "Management Systems",
  "Mobile Apps",
  "Automation",
  "Dashboards",
];

export default function ServicesPage() {
  return (
    <main className="mx-auto min-h-screen max-w-6xl px-6 py-24 text-white">
      <h1 className="text-4xl font-semibold">Services</h1>
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <article key={service} className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h2 className="text-xl font-medium">{service}</h2>
            <p className="mt-2 text-sm text-white/65">Starting from custom quote.</p>
          </article>
        ))}
      </div>
    </main>
  );
}
