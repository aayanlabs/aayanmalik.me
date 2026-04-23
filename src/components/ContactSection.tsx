"use client";

import { motion } from "framer-motion";
import { Mail, Send, Globe } from "lucide-react";

export function ContactSection() {
  return (
    <section id="contact" className="py-32 px-6 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute -bottom-48 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-electric-blue/10 blur-[150px] rounded-full" />

      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="text-xs font-space tracking-[0.4em] text-white/30 uppercase mb-4 block">
              05 / Connect
            </span>
            <h2 className="text-6xl md:text-8xl font-bold mb-12">
              LET&apos;S BUILD <br />
              <span className="text-gradient">THE FUTURE.</span>
            </h2>
            
            <div className="space-y-8">
              <a 
                href="mailto:mdaayanmalik9291@gmail.com"
                className="group flex items-center gap-6 p-6 glass rounded-3xl hover:bg-white/5 transition-all"
              >
                <div className="p-4 bg-white/5 rounded-2xl group-hover:bg-electric-blue group-hover:text-black transition-colors">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-space tracking-widest text-white/30 uppercase mb-1">Email</p>
                  <p className="text-xl font-bold">mdaayanmalik9291@gmail.com</p>
                </div>
              </a>

              <div className="flex gap-6">
                <a 
                  href="https://github.com/aayanlabs"
                  target="_blank"
                  className="flex-1 group flex items-center gap-6 p-6 glass rounded-3xl hover:bg-white/5 transition-all"
                >
                  <div className="p-4 bg-white/5 rounded-2xl group-hover:bg-white group-hover:text-black transition-colors">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                  </div>
                  <span className="text-lg font-bold">GitHub</span>
                </a>
                
                <a 
                  href="https://www.linkedin.com/in/aayan-malik-153b87396/"
                  target="_blank"
                  className="flex-1 group flex items-center gap-6 p-6 glass rounded-3xl hover:bg-white/5 transition-all"
                >
                  <div className="p-4 bg-white/5 rounded-2xl group-hover:bg-[#0077b5] group-hover:text-white transition-colors">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                  </div>
                  <span className="text-lg font-bold">LinkedIn</span>
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glass p-10 md:p-16 rounded-[3rem] border-white/5"
          >
            <form className="space-y-8">
              <div className="space-y-2">
                <label className="text-[10px] font-space tracking-widest text-white/30 uppercase ml-4">Full Name</label>
                <input 
                  type="text" 
                  placeholder="John Doe"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-electric-blue/50 transition-colors"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] font-space tracking-widest text-white/30 uppercase ml-4">Email Address</label>
                <input 
                  type="email" 
                  placeholder="john@example.com"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-electric-blue/50 transition-colors"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] font-space tracking-widest text-white/30 uppercase ml-4">Message</label>
                <textarea 
                  placeholder="Tell me about your vision..."
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-electric-blue/50 transition-colors resize-none"
                />
              </div>

              <button className="w-full py-6 bg-electric-blue text-black font-bold rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3">
                Send Message <Send className="w-5 h-5" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
