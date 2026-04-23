export function Footer() {
  return (
    <footer className="py-20 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          <div>
            <h2 className="text-2xl font-bold font-space tracking-tighter mb-2">
              Aayan<span className="text-electric-blue">Labs</span>
            </h2>
            <p className="text-white/30 text-xs font-space tracking-widest uppercase">
              Engineering the future of intelligent products.
            </p>
          </div>

          <div className="flex flex-col md:items-end gap-4">
            <div className="flex gap-8">
              <a href="#" className="text-xs font-space tracking-widest uppercase text-white/30 hover:text-white transition-colors">Twitter</a>
              <a href="#" className="text-xs font-space tracking-widest uppercase text-white/30 hover:text-white transition-colors">GitHub</a>
              <a href="#" className="text-xs font-space tracking-widest uppercase text-white/30 hover:text-white transition-colors">LinkedIn</a>
            </div>
            <p className="text-[10px] font-space tracking-[0.2em] text-white/10 uppercase">
              &copy; 2026 AayanLabs. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
