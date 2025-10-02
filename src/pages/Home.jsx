// React aur zaroori hooks jaise useEffect, useMemo, useState ko import kar rahe hain.
import React, { useEffect, useMemo, useState } from "react";
// React Router se 'Link' component ko import kar rahe hain, page navigation ke liye.
import { Link } from "react-router";
// Framer Motion se 'motion' aur 'AnimatePresence' ko import kar rahe hain, animations ke liye.
import { motion, AnimatePresence } from "framer-motion";
// Lucide-react library se alag-alag icons import kar rahe hain.
import {
  Brain,
  Receipt,
  BarChart3,
  Shield,
  Link as LinkIcon,
  Tag,
  LineChart,
  Star,
  Linkedin,
  Twitter,
  Instagram,
} from "lucide-react";

// 'Home' naam ka ek functional component bana rahe hain.
function Home() {
  // 'useMemo' hook ka istemal karke 'features' array ko define kar rahe hain. Yeh tab tak re-create nahi hoga jab tak dependencies change na ho.
  const features = useMemo(
    () => [
      // Pehla feature object.
      {
        title: "AI Insights", // Feature ka title.
        desc: "Understand spending patterns and get personalized savings tips.", // Feature ka description.
        icon: Brain, // Feature ke liye icon.
      },
      // Dusra feature object.
      {
        title: "Smart Expense Tracking",
        desc: "Auto-import and categorize your transactions in real‑time.",
        icon: Receipt,
      },
      // Teesra feature object.
      {
        title: "Visual Dashboards",
        desc: "Beautiful charts to visualize budgets and cashflow at a glance.",
        icon: BarChart3,
      },
      // Chautha feature object.
      {
        title: "Secure & Private",
        desc: "Bank‑grade encryption and privacy by default.",
        icon: Shield,
      },
    ],
    [] // Empty dependency array ka matlab hai ki yeh array sirf ek baar component ke render hone par banega.
  );

  // 'useMemo' hook ka istemal karke 'steps' array ko define kar rahe hain.
  const steps = useMemo(
    () => [
      // Pehla step object.
      {
        title: "Connect Accounts",
        desc: "Securely link your bank and cards in seconds.",
        icon: LinkIcon,
      },
      // Dusra step object.
      {
        title: "AI Categorizes Expenses",
        desc: "Our models auto‑classify and detect recurring patterns.",
        icon: Tag,
      },
      // Teesra step object.
      {
        title: "Get Insights",
        desc: "Actionable recommendations to save more, faster.",
        icon: LineChart,
      },
    ],
    [] // Empty dependency array.
  );

  // 'useMemo' hook ka istemal karke 'testimonials' (customer reviews) array ko define kar rahe hain.
  const testimonials = useMemo(
    () => [
      // Pehla testimonial object.
      {
        quote:
          "This AI finally made my finances make sense. I cut monthly spending by 18% in the first month.",
        name: "Ava Thompson",
        role: "Freelance Designer",
        rating: 5,
      },
      // Dusra testimonial object.
      {
        quote:
          "The categorization is spot on and the dashboards are gorgeous. Budgeting feels effortless.",
        name: "Marcus Lee",
        role: "Product Manager",
        rating: 5,
      },
      // Teesra testimonial object.
      {
        quote:
          "I love the insights. It flagged duplicate subscriptions I forgot about — instant savings!",
        name: "Priya Patel",
        role: "Data Analyst",
        rating: 4,
      },
    ],
    [] // Empty dependency array.
  );

  // 'useState' hook ka istemal karke 'activeTestimonial' state variable bana rahe hain, jo current testimonial ka index store karega.
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // 'useEffect' hook ka istemal kar rahe hain, jo component ke render hone ke baad chalta hai.
  useEffect(() => {
    // 'setInterval' function har 5 second mein ek function ko call karega.
    const id = setInterval(() => {
      // 'setActiveTestimonial' ko call karke testimonial ka index change kar rahe hain.
      // Yeh agle testimonial par jaata hai aur agar aakhri par hai toh wapas pehle par aa jaata hai.
      setActiveTestimonial((i) => (i + 1) % testimonials.length);
    }, 5000); // Interval 5000 milliseconds (5 seconds) ka hai.
    // Cleanup function: Jab component unmount hoga, yeh interval ko clear kar dega taaki memory leak na ho.
    return () => clearInterval(id);
  }, [testimonials.length]); // Dependency array mein 'testimonials.length' hai, matlab yeh effect tab dobara chalega jab testimonials ki sankhya badlegi.

  // 'fadeInUp' naam ka ek animation variant object bana rahe hain.
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 }, // Animation shuru hone se pehle ki state (invisible aur thoda neeche).
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }, // Animation ke baad ki state (visible aur apni jagah par).
  };

  // Component ka JSX return kar rahe hain.
  return (
    // 'main' element, jo poore page ka container hai. Ismein styling classes hain.
    <main className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-white via-indigo-50 to-indigo-100">
      {/* Background mein halke animations ke liye div */}
      <div
        aria-hidden="true" // Screen readers isse ignore karenge.
        className="pointer-events-none absolute inset-0 -z-10" // Yeh div user interaction ko capture nahi karega.
      >
        {/* Background mein pehla gradient circle jo animate ho raha hai. */}
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-gradient-to-tr from-indigo-400/40 via-violet-400/30 to-fuchsia-400/30 blur-3xl animate-pulse" />
        {/* Background mein dusra gradient circle jo animate ho raha hai. */}
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-gradient-to-tr from-fuchsia-400/30 via-pink-400/20 to-orange-300/20 blur-3xl animate-pulse [animation-duration:5s]" />
        {/* Framer Motion se animate ho raha ek chhota sa div. */}
        <motion.div
          className="absolute top-1/3 left-10 h-24 w-24 rounded-2xl bg-white/20 backdrop-blur-md shadow-lg shadow-indigo-300/20"
          animate={{ y: [0, -12, 0], rotate: [0, 6, 0] }} // y-axis aur rotation mein animation.
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} // Animation ki properties.
        />
        {/* Framer Motion se animate ho raha ek aur chhota sa div. */}
        <motion.div
          className="absolute bottom-20 left-1/4 h-16 w-16 rounded-full bg-white/10 backdrop-blur-md shadow"
          animate={{ y: [0, 14, 0], rotate: [0, -12, 0] }} // y-axis aur rotation mein animation.
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} // Animation ki properties.
        />
      </div>

      {/* Hero Section: Website ka sabse upar wala hissa. */}
      <section className="relative">
        {/* Content ko center mein rakhne ke liye container. */}
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 px-6 py-24 md:flex-row md:py-28">
          {/* Text wala hissa. */}
          <motion.div
            className="w-full text-center md:w-1/2 md:text-left"
            initial="hidden" // Shuruaati animation state.
            whileInView="show" // Jab yeh view mein aayega tab 'show' state trigger hogi.
            viewport={{ once: true, amount: 0.4 }} // Animation sirf ek baar chalega.
            variants={fadeInUp} // Upar define kiya gaya 'fadeInUp' animation istemal hoga.
          >
            {/* Mukhya Heading. */}
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              Gain Complete Control Over Your Personal Finances.
            </h1>
            {/* Sub-heading ya paragraph. */}
            <p className="mt-6 text-lg leading-relaxed text-gray-600 md:max-w-xl">
              Track, analyze, and optimize your expenses effortlessly with smart
              AI insights.
            </p>
            {/* Buttons ke liye container. */}
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row md:justify-start">
              {/* 'Get Started' button jo '/signup' page par le jaayega. */}
              <Link
                to="/signup"
                className=" animate-bounce inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 px-7 py-3 text-base font-semibold text-white shadow-lg shadow-indigo-500/25 transition-transform duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Get Started
              </Link>
              {/* 'Watch Demo' button jo '/demo' page par le jaayega. */}
              <Link
                to="/demo"
                className="inline-flex items-center justify-center rounded-xl border border-indigo-300/60 bg-white/60 px-7 py-3 text-base font-semibold text-indigo-700 backdrop-blur-md transition-all hover:bg-white/80 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Watch Demo
              </Link>
            </div>
          </motion.div>

          {/* Illustration ya Image wala hissa. */}
          <motion.div
            className="w-full md:w-1/2"
            initial={{ opacity: 0, scale: 0.95, y: 20 }} // Shuruaati animation state.
            whileInView={{ opacity: 1, scale: 1, y: 0 }} // Jab view mein aayega tab animation.
            viewport={{ once: true, amount: 0.3 }} // Animation ek baar chalega.
            transition={{ duration: 0.7 }} // Animation ki duration.
          >
            {/* Dashboard jaisa dikhne wala UI ka container. */}
            <div className="relative mx-auto max-w-lg rounded-2xl bg-white/70 p-6 shadow-2xl ring-1 ring-black/5 backdrop-blur-xl">
              {/* 'Preview' label. */}
              <div className="absolute -top-3 -right-3 rounded-lg bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-3 py-1 text-xs font-semibold text-white shadow">
                Preview
              </div>
              {/* Fake dashboard UI banane ke liye divs. */}
              <div className="space-y-4">
                {/* Dashboard ka header jaisa hissa. */}
                <div className="flex items-center justify-between ">
                  <div className="h-3 w-24 rounded-full bg-indigo-200" />
                  <div className="h-3 w-12 rounded-full bg-violet-200" />
                </div>
                {/* Dashboard ka grid layout. */}
                <div className="grid grid-cols-3 gap-3">
                  {/* Pehla grid item (chart jaisa). */}
                  <div className="col-span-2 rounded-xl bg-gradient-to-tr from-indigo-50 to-white p-4 ring-1 ring-indigo-100">
                    <div className="mb-3 h-4 w-28 rounded bg-indigo-200/70" />
                    <div className="flex items-end gap-1">
                      {/* Alag-alag height ke bars. */}
                      <div className="h-16 w-4 rounded bg-indigo-400/60" />
                      <div className="h-10 w-4 rounded bg-indigo-300/60" />
                      <div className="h-20 w-4 rounded bg-indigo-500/60" />
                      <div className="h-12 w-4 rounded bg-indigo-300/60" />
                      <div className="h-8 w-4 rounded bg-indigo-200/60" />
                      <div className="h-14 w-4 rounded bg-indigo-400/60" />
                    </div>
                  </div>
                  {/* Dusra grid item (list jaisa). */}
                  <div className="rounded-xl bg-gradient-to-tr from-fuchsia-50 to-white p-4 ring-1 ring-fuchsia-100">
                    <div className="mb-3 h-4 w-20 rounded bg-fuchsia-200/70" />
                    <div className="space-y-2">
                      <div className="h-2 w-full rounded bg-fuchsia-200/70" />
                      <div className="h-2 w-5/6 rounded bg-fuchsia-200/70" />
                      <div className="h-2 w-4/6 rounded bg-fuchsia-200/70" />
                    </div>
                  </div>
                </div>
                {/* Teesra dashboard element (progress bar jaisa). */}
                <div className="rounded-xl bg-gradient-to-tr from-emerald-50 to-white p-4 ring-1 ring-emerald-100">
                  <div className="mb-3 h-4 w-24 rounded bg-emerald-200/70" />
                  <div className="flex h-2 w-full overflow-hidden rounded bg-emerald-100">
                    {/* Progress bar ke alag-alag hisse. */}
                    <div className="h-full w-1/3 bg-emerald-400" />
                    <div className="h-full w-1/4 bg-emerald-300" />
                    <div className="h-full w-1/6 bg-emerald-200" />
                    <div className="h-full flex-1 bg-emerald-100" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-6 py-16">
          {/* Section ki heading. */}
          <motion.h2
            className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeInUp}
          >
            Powerful features to master your money
          </motion.h2>

          {/* Features ko display karne ke liye grid layout. */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Upar define kiye gaye 'features' array par map function chala rahe hain. */}
            {features.map(({ title, desc, icon: Icon }, idx) => (
              // Har feature ke liye ek animated div.
              <motion.div
                key={title} // Unique key.
                className="group rounded-2xl bg-white/70 p-6 shadow-xl ring-1 ring-black/5 backdrop-blur-xl transition-transform hover:scale-[1.02]"
                initial={{ opacity: 0, y: 12 }} // Shuruaati animation state.
                whileInView={{ opacity: 1, y: 0 }} // View mein aane par animation.
                viewport={{ once: true, amount: 0.3 }} // Animation ek baar chalega.
                transition={{ delay: idx * 0.05 }} // Har feature thodi der se animate hoga.
              >
                {/* Icon ke liye container. */}
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 to-fuchsia-500 text-white shadow-lg">
                  <Icon className="h-6 w-6" />
                </div>
                {/* Feature ka title. */}
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  {title}
                </h3>
                {/* Feature ka description. */}
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-6 py-16">
          {/* Section ki heading. */}
          <motion.h2
            className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeInUp}
          >
            How it works
          </motion.h2>

          <div className="mt-12">
            {/* Timeline: mobile par vertical, badi screen par horizontal. */}
            <div className="relative mx-auto grid max-w-5xl gap-8 lg:grid-cols-3">
              {/* 'steps' array par map function chala rahe hain. */}
              {steps.map(({ title, desc, icon: Icon }, idx) => (
                // Har step ke liye ek animated div.
                <motion.div
                  key={title}
                  className="relative rounded-2xl bg-white/70 p-6 shadow-xl ring-1 ring-black/5 backdrop-blur-xl"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: idx * 0.08 }}
                >
                  {/* Step ke content ke liye container. */}
                  <div className="flex items-start gap-4">
                    {/* Icon ke liye container. */}
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 to-fuchsia-500 text-white shadow-lg">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      {/* Step ka title. */}
                      <h3 className="text-lg font-semibold text-gray-900">
                        {title}
                      </h3>
                      {/* Step ka description. */}
                      <p className="mt-2 text-sm text-gray-600">{desc}</p>
                    </div>
                  </div>

                  {/* Steps ko jodne wali lines (connectors). */}
                  {idx < steps.length - 1 && ( // Yeh sirf aakhri step ko chhodkar sabke liye dikhega.
                    <>
                      {/* Horizontal line (badi screen ke liye). */}
                      <div className="hidden lg:block">
                        <div className="absolute right-[-14px] top-1/2 hidden h-[2px] w-6 -translate-y-1/2 rounded bg-gradient-to-r from-indigo-300 to-fuchsia-300 lg:block" />
                      </div>
                      {/* Vertical line (mobile ke liye). */}
                      <div className="lg:hidden">
                        <div className="absolute bottom-[-14px] left-1/2 h-6 w-[2px] -translate-x-1/2 rounded bg-gradient-to-b from-indigo-300 to-fuchsia-300" />
                      </div>
                    </>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative">
        <div className="mx-auto max-w-6xl px-6 py-16">
          {/* Section ki heading. */}
          <motion.h2
            className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeInUp}
          >
            Loved by smart savers
          </motion.h2>

          {/* Testimonial slider ka container. */}
          <div className="relative mx-auto mt-10 max-w-3xl overflow-hidden rounded-2xl bg-white/70 p-8 text-center shadow-xl ring-1 ring-black/5 backdrop-blur-xl">
            {/* Testimonials ke beech transition ke liye AnimatePresence. */}
            <AnimatePresence mode="wait">
              {/* Har testimonial ke liye ek animated div. 'key' change hone par animation trigger hota hai. */}
              <motion.div
                key={activeTestimonial} // 'activeTestimonial' state par depend karta hai.
                initial={{ opacity: 0, x: 30 }} // Shuruaati state.
                animate={{ opacity: 1, x: 0 }} // Animation ke dauran state.
                exit={{ opacity: 0, x: -30 }} // Jab testimonial hataya jaata hai.
                transition={{ duration: 0.45 }} // Animation ki duration.
              >
                {/* Rating stars ko display karne ke liye. */}
                <div className="flex justify-center gap-1">
                  {/* 5 stars banane ke liye ek array banakar uspe map chala rahe hain. */}
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      // Star ko fill karne ya na karne ke liye conditional class.
                      className={`h-5 w-5 ${
                        i < testimonials[activeTestimonial].rating
                          ? "fill-yellow-400 stroke-yellow-400"
                          : "stroke-yellow-400"
                      }`}
                    />
                  ))}
                </div>
                {/* Testimonial ka quote. */}
                <p className="mt-5 text-lg text-gray-700">
                  “{testimonials[activeTestimonial].quote}”
                </p>
                {/* Testimonial dene wale ka naam. */}
                <div className="mt-6 text-sm font-medium text-gray-900">
                  {testimonials[activeTestimonial].name}
                </div>
                {/* Testimonial dene wale ka role. */}
                <div className="text-xs text-gray-500">
                  {testimonials[activeTestimonial].role}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slider ke controls (dots). */}
            <div className="mt-6 flex items-center justify-center gap-2">
              {/* Testimonials array ke length ke barabar dots banane ke liye map. */}
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to testimonial ${i + 1}`}
                  onClick={() => setActiveTestimonial(i)} // Dot par click karne se uss testimonial par jaayega.
                  // Active dot aur baaki dots ke liye conditional class.
                  className={`h-2.5 w-2.5 rounded-full transition-all ${
                    i === activeTestimonial
                      ? "bg-indigo-600"
                      : "bg-indigo-200 hover:bg-indigo-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final Call-to-Action (CTA) Section */}
      <section className="relative">
        <div className="mx-auto max-w-6xl px-6 py-20">
          {/* Ek sundar border effect ke liye nested divs. */}
          <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 p-[1px] shadow-2xl">
            <div className="rounded-3xl bg-white/60 p-10 text-center backdrop-blur-xl">
              {/* CTA ki heading. */}
              <motion.h3
                className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.4 }}
                variants={fadeInUp}
              >
                Start saving smarter today!
              </motion.h3>
              {/* CTA ka description. */}
              <p className="mx-auto mt-3 max-w-2xl text-gray-700">
                Join thousands using AI to track, analyze, and optimize spending.
              </p>
              {/* CTA button ke liye container. */}
              <div className="mt-8">
                {/* 'Sign Up' button jo '/signup' page par le jaayega. */}
                <Link
                  to="/signup"
                  className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 px-8 py-3 text-base font-semibold text-white shadow-lg shadow-indigo-500/25 transition-transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-white/60 focus:ring-offset-2 focus:ring-offset-indigo-500"
                >
                  Sign Up Free
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="relative border-t border-indigo-100/60 bg-white/70 backdrop-blur-xl">
        {/* Footer ke content ke liye container. */}
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-10 sm:flex-row">
          {/* Copyright text. */}
          <div className="text-sm text-gray-500">
            © {new Date().getFullYear()} BudgetBuddy {/* Javascript se current saal le rahe hain. */}
          </div>
          {/* Navigation links. */}
          <nav className="flex flex-wrap items-center justify-center gap-5 text-sm">
            <Link
              to="https://github.com/Raj969656"
              className="text-gray-600 hover:text-gray-900 hover:underline"
            >
              About
            </Link>
            <Link
              to="/pricing"
              className="text-gray-600 hover:text-gray-900 hover:underline"
            >
              Pricing
            </Link>
            <Link
              to="/contact"
              className="text-gray-600 hover:text-gray-900 hover:underline"
            >
              Contact
            </Link>
            <Link
              to="/privacy"
              className="text-gray-600 hover:text-gray-900 hover:underline"
            >
              Privacy Policy
            </Link>
          </nav>
          {/* Social media icons. */}
          <div className="flex items-center gap-4">
            {/* LinkedIn link. */}
            <a
              href="https://www.linkedin.com"
              target="_blank" // Link naye tab mein khulega.
              rel="noreferrer" // Security ke liye.
              aria-label="LinkedIn"
              className="text-gray-500 transition-colors hover:text-indigo-600"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            {/* Twitter link. */}
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter"
              className="text-gray-500 transition-colors hover:text-indigo-600"
            >
              <Twitter className="h-5 w-5" />
            </a>
            {/* Instagram link. */}
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="text-gray-500 transition-colors hover:text-indigo-600"
            >
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}

// 'Home' component ko export kar rahe hain taaki dusri files mein use ho sake.
export default Home;
