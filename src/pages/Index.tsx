import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { useTranslation } from "react-i18next";
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
import { absoluteUrl } from "@/lib/seo";

const Index = () => {
  const { t } = useTranslation();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const badges = [
    { icon: Award, text: t("homePage.badges.exclusiveImporter") },
    { icon: TrendingUp, text: t("homePage.badges.numberOne") },
    { icon: Shield, text: t("homePage.badges.extendedWarranty") },
  ];

  const solutions = [
    {
      key: "onGrid",
      icon: Grid3X3,
      color: "primary" as const,
      href: "/sisteme#on-grid",
    },
    {
      key: "offGrid",
      icon: Battery,
      color: "accent" as const,
      href: "/sisteme#off-grid",
    },
    {
      key: "hybrid",
      icon: Zap,
      color: "energy" as const,
      href: "/sisteme#hybrid",
    },
  ].map((solution) => ({
    ...solution,
    title: t(`homePage.solutions.${solution.key}.title`),
    subtitle: t(`homePage.solutions.${solution.key}.subtitle`),
    description: t(`homePage.solutions.${solution.key}.description`),
  }));

  const stats = [
    { value: 850, suffix: "+", label: t("homePage.stats.installedStations") },
    { value: 12, suffix: " MW", label: t("homePage.stats.totalPower") },
    { value: 8, suffix: ` ${t("homePage.stats.yearsSuffix")}`, label: t("homePage.stats.experience") },
    { value: 100, suffix: "%", label: t("homePage.stats.happyClients") },
  ];

  const whyUsReasonsRaw = t("homePage.whyUs.reasons", { returnObjects: true }) as unknown;
  const whyUsReasons = Array.isArray(whyUsReasonsRaw) ? (whyUsReasonsRaw as string[]) : [];

  return (
    <Layout>
      <Helmet>
        <title>{t("homePage.seo.title")}</title>
        <meta
          name="description"
          content={t("homePage.seo.description")}
        />
        <link rel="canonical" href={absoluteUrl("/")} />
        <meta property="og:title" content={t("homePage.seo.ogTitle")} />
        <meta
          property="og:description"
          content={t("homePage.seo.ogDescription")}
        />
        <meta property="og:url" content={absoluteUrl("/")} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={absoluteUrl("/og-image.png")} />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "X&C Botnari SRL",
            url: absoluteUrl("/"),
            email: "contact@xcbotnari.md",
            telephone: "+37378901362",
            address: {
              "@type": "PostalAddress",
              addressLocality: t("homePage.schema.addressLocality"),
              addressCountry: "MD",
            },
            areaServed: "Moldova",
            sameAs: ["https://wa.me/37378901362"],
            makesOffer: {
              "@type": "OfferCatalog",
              name: t("homePage.schema.offerCatalogName"),
              itemListElement: [
                { "@type": "Offer", itemOffered: { "@type": "Service", name: t("homePage.schema.offerOnGrid") } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: t("homePage.schema.offerOffGrid") } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: t("homePage.schema.offerHybrid") } },
              ],
            },
          })}
        </script>
      </Helmet>

      {/* HERO SECTION */}
      <section
        ref={heroRef}
        className="relative isolate min-h-screen flex items-center hero-bg overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        {/* Background (keep video untransformed for iOS/Safari stability) */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 overflow-hidden">
            <motion.img
              src={heroImage}
              alt=""
              aria-hidden="true"
              style={{ y: heroY, scale: heroScale }}
              className="absolute inset-0 h-full w-full object-cover opacity-95"
            />
            <video
              className="absolute inset-0 h-full w-full object-cover opacity-95"
              autoPlay
              muted
              playsInline
              loop
              preload="auto"
              poster={heroImage}
            >
              <source src="/hero-drone.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

        {/* Full-cover white overlays over entire hero background (no blur) */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div className="absolute inset-0 bg-white/30" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/30 to-white/70" />
        </div>

        {/* Animated Glow */}
        <div className="absolute z-5 top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute z-5 bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />

        <motion.div
          style={{ opacity: heroOpacity }}
          className="container mx-auto px-6 relative z-20"
        >
          <div className="max-w-4xl px-6 py-8 md:px-10 md:py-12">
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
                  className="premium-badge backdrop-blur-none bg-white/55 border-white/70 shadow-[0_8px_22px_rgba(15,23,42,0.08)]"
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
              className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.1] mb-6 text-foreground drop-shadow-[0_2px_18px_rgba(255,255,255,0.9)]"
            >
              {t("homePage.hero.title")}{" "}
              <span className="text-gradient-primary drop-shadow-[0_2px_18px_rgba(255,255,255,0.9)]">{t("homePage.hero.titleHighlight")}</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl drop-shadow-[0_2px_16px_rgba(255,255,255,0.85)]"
            >
              {t("homePage.hero.subtitleLine1")}
              <br />
              <span className="text-primary font-semibold">X&C Botnari SRL</span> {t("homePage.hero.subtitleLine2")}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/contact" className="btn-premium-accent flex items-center gap-2 group">
                {t("homePage.hero.ctaPrimary")}
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/contact" className="btn-premium-outline flex items-center gap-2">
                {t("homePage.hero.ctaSecondary")}
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
            badge={t("homePage.solutionsSection.badge")}
            title={
              <>
                {t("homePage.solutionsSection.title")} <span className="text-gradient-primary">{t("homePage.solutionsSection.titleHighlight")}</span>
              </>
            }
            description={t("homePage.solutionsSection.description")}
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
                      <span>{t("common.learnMore")}</span>
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
                {t("homePage.whyUs.badge")}
              </span>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {t("homePage.whyUs.title")}{" "}
                <span className="text-gradient-primary">{t("homePage.whyUs.titleHighlight")}</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                {t("homePage.whyUs.description")}
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
                <span>{t("homePage.whyUs.linkProjects")}</span>
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
                  alt={t("homePage.whyUs.imageAlt")}
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
                        <p className="text-foreground font-semibold">{t("homePage.whyUs.overlayTitle")}</p>
                        <p className="text-muted-foreground text-sm">{t("homePage.whyUs.overlaySubtitle")}</p>
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
                    <p className="text-sm text-muted-foreground">{t("homePage.whyUs.floatingStat")}</p>
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
              {t("homePage.finalCta.title")}{" "}
              <span className="text-gradient-accent">{t("homePage.finalCta.titleHighlight")}</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              {t("homePage.finalCta.subtitle")}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="btn-premium-accent flex items-center gap-2 group">
                {t("homePage.finalCta.primary")}
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/felicity" className="btn-premium-outline flex items-center gap-2">
                {t("homePage.finalCta.secondary")}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
