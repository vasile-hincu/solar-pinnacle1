import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { 
  ArrowRight, 
  Award, 
  Battery, 
  CheckCircle2, 
  Grid3X3, 
  Leaf, 
  Shield, 
  Sun, 
  TrendingUp, 
  Zap 
} from "lucide-react";
import heroImage from "@/assets/hero-solar.jpg";
import pvSystemImage from "@/assets/installation-work.jpg";
import { SeamlessLoopVideo } from "@/components/SeamlessLoopVideo";

const Index = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const badges = [
    { icon: Award, text: "Importator exclusiv Felicity în Moldova" },
    { icon: TrendingUp, text: "#1 în 2025 – cele mai multe stații instalate" },
    { icon: Shield, text: "Garanție extinsă și suport premium" },
  ];

  const solutions = [
    {
      icon: Grid3X3,
      title: "On-Grid",
      subtitle: "Economii maxime",
      description: "Conectat la rețeaua electrică pentru economii semnificative la facturi.",
      color: "primary",
      href: "/sisteme#on-grid",
    },
    {
      icon: Battery,
      title: "Off-Grid",
      subtitle: "Independență totală",
      description: "Complet independent de rețea, ideal pentru zone izolate.",
      color: "accent",
      href: "/sisteme#off-grid",
    },
    {
      icon: Zap,
      title: "Hybrid",
      subtitle: "Control absolut",
      description: "Combinația perfectă între economii și independență energetică.",
      color: "energy",
      href: "/sisteme#hybrid",
    },
  ];

  const stats = [
    { value: 850, suffix: "+", label: "Stații instalate" },
    { value: 12, suffix: " MW", label: "Putere totală montată" },
    { value: 8, suffix: " ani", label: "Experiență în domeniu" },
    { value: 100, suffix: "%", label: "Clienți mulțumiți" },
  ];

  const whyUsReasons = [
    "Lider de piață în Moldova",
    "Echipamente premium certificate",
    "Echipă de instalatori experimentați",
    "Garanție extinsă pe toate produsele",
    "Suport tehnic 24/7",
    "Prețuri competitive fără compromis",
  ];

  return (
    <Layout>
      {/* HERO SECTION */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center hero-bg overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        {/* Background Image with Parallax */}
        <motion.div
          style={{ y: heroY, scale: heroScale }}
          className="absolute inset-0"
        >
          <SeamlessLoopVideo
            mp4Src="/hero-drone.mp4"
            posterSrc={heroImage}
            className="absolute inset-0 relative overflow-hidden hero-media-drift"
            mediaClassName="absolute inset-0 h-full w-full object-cover opacity-95 z-10"
            overlayClassName="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/55 z-20 pointer-events-none"
            fallbackImgClassName="absolute inset-0 h-full w-full object-cover opacity-95 z-0"
          />
        </motion.div>

        {/* Animated Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />

        <motion.div
          style={{ opacity: heroOpacity }}
          className="container mx-auto px-6 relative z-20"
        >
          <div className="max-w-4xl">
            {/* Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-wrap gap-3 mb-8"
            >
              {badges.map((badge, index) => (
                <motion.div
                  key={badge.text}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="premium-badge"
                >
                  <badge.icon className="w-4 h-4" />
                  <span>{badge.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.1] mb-6"
            >
              Energia viitorului,{" "}
              <span className="text-gradient-primary">instalată la perfecție.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl"
            >
              Stații fotovoltaice On-Grid, Off-Grid și Hybrid – 6kW, 10kW, 15kW+
              <br />
              <span className="text-foreground font-medium">X&C Botnari SRL</span> – Liderul pieței din Moldova.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/contact" className="btn-premium-accent flex items-center gap-2 group">
                Cere o ofertă personalizată
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/contact" className="btn-premium-outline flex items-center gap-2">
                Programează o consultare
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-muted-foreground/50 flex items-start justify-center pt-2"
          >
            <motion.div
              animate={{ y: [0, 10, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-2 rounded-full bg-primary"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* SOLUTIONS SECTION */}
      <section className="py-32 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <SectionTitle
            badge="Soluții Complete"
            title={
              <>
                Tipuri de <span className="text-gradient-primary">Sisteme</span>
              </>
            }
            description="Fiecare proiect este unic. Oferim soluții personalizate pentru nevoile tale energetice."
          />

          <div className="grid md:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <motion.div
                key={solution.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link to={solution.href}>
                  <div className="floating-card group h-full">
                    <div
                      className={`w-16 h-16 rounded-2xl mb-6 flex items-center justify-center transition-all duration-500 group-hover:scale-110 ${
                        solution.color === "primary"
                          ? "bg-primary/10 text-primary"
                          : solution.color === "accent"
                          ? "bg-accent/10 text-accent"
                          : "bg-energy/10 text-energy"
                      }`}
                    >
                      <solution.icon className="w-8 h-8" />
                    </div>
                    <h3 className="font-display text-2xl font-bold mb-2">
                      {solution.title}
                    </h3>
                    <p className={`text-sm font-medium mb-4 ${
                      solution.color === "primary"
                        ? "text-primary"
                        : solution.color === "accent"
                        ? "text-accent"
                        : "text-energy"
                    }`}>
                      {solution.subtitle}
                    </p>
                    <p className="text-muted-foreground">
                      {solution.description}
                    </p>
                    <div className="mt-6 flex items-center gap-2 text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                      <span>Află mai multe</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                <p className="mt-2 text-muted-foreground font-medium">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY X&C BOTNARI SECTION */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20 mb-6">
                <Leaf className="w-4 h-4" />
                De ce noi?
              </span>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Nu instalăm doar panouri.{" "}
                <span className="text-gradient-primary">Proiectăm și implementăm soluții complete.</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Cu peste 8 ani de experiență și sute de proiecte finalizate, 
                X&C Botnari SRL este alegerea clară pentru cei care doresc 
                calitate fără compromis.
              </p>

              <ul className="space-y-4 mb-8">
                {whyUsReasons.map((reason, index) => (
                  <motion.li
                    key={reason}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-muted-foreground font-medium">{reason}</span>
                  </motion.li>
                ))}
              </ul>

              <Link
                to="/proiecte"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
              >
                <span>Vezi proiectele noastre</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={pvSystemImage}
                  alt="Sistem fotovoltaic premium"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="glass-card p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                        <Battery className="w-6 h-6 text-accent-foreground" />
                      </div>
                      <div>
                        <p className="text-foreground font-semibold">Baterii Felicity</p>
                        <p className="text-muted-foreground text-sm">Importator exclusiv Moldova</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Stats Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="absolute -top-8 -right-8 glass-card p-6"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Sun className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-foreground">12 MW</p>
                    <p className="text-sm text-muted-foreground">Putere instalată</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 hero-bg" />
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px]" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Alege liderul.{" "}
              <span className="text-gradient-accent">Alege siguranța.</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Fiecare zi fără energie solară este o zi în care plătești mai mult. 
              Hai să schimbăm asta împreună.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="btn-premium-accent flex items-center gap-2 group">
                Începe acum
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/felicity" className="btn-premium-outline flex items-center gap-2">
                Descoperă Felicity
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
