import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { useTranslation } from "react-i18next";
import {
  ArrowRight,
  Battery,
  CheckCircle2,
  Grid3X3,
  Home,
  Factory,
  Zap,
  Wifi,
  WifiOff,
  Sun,
} from "lucide-react";
import heroImage from "@/assets/hero-solar.jpg";
import { absoluteUrl } from "@/lib/seo";

const Sisteme = () => {
  const { t } = useTranslation();

  const systemDefs = [
    {
      id: "on-grid" as const,
      icon: Grid3X3,
      color: "primary" as const,
      scenarioDefs: [
        { key: "home" as const, icon: Home },
        { key: "business" as const, icon: Factory },
      ],
    },
    {
      id: "off-grid" as const,
      icon: WifiOff,
      color: "accent" as const,
      scenarioDefs: [
        { key: "cabin" as const, icon: Home },
        { key: "farm" as const, icon: Factory },
      ],
    },
    {
      id: "hybrid" as const,
      icon: Zap,
      color: "energy" as const,
      scenarioDefs: [
        { key: "modernHome" as const, icon: Home },
        { key: "criticalBusiness" as const, icon: Factory },
      ],
    },
  ];

  const systems = systemDefs.map((def) => {
    const content = t(`systemsPage.systems.${def.id}`, { returnObjects: true }) as unknown as {
      title?: string;
      subtitle?: string;
      description?: string;
      forWhom?: string[];
      advantages?: string[];
    };

    const forWhom = Array.isArray(content?.forWhom) ? content.forWhom : [];
    const advantages = Array.isArray(content?.advantages) ? content.advantages : [];

    const scenarios = def.scenarioDefs.map((scenarioDef) => {
      const scenarioContent = t(`systemsPage.systems.${def.id}.scenarios.${scenarioDef.key}`, {
        returnObjects: true,
      }) as unknown as { title?: string; description?: string };

      return {
        icon: scenarioDef.icon,
        title: scenarioContent?.title ?? "",
        description: scenarioContent?.description ?? "",
      };
    });

    return {
      id: def.id,
      icon: def.icon,
      color: def.color,
      title: content?.title ?? "",
      subtitle: content?.subtitle ?? "",
      description: content?.description ?? "",
      forWhom,
      advantages,
      scenarios,
    };
  });

  return (
    <Layout>
      <Helmet>
        <title>{t("systemsPage.seo.title")}</title>
        <meta
          name="description"
          content={t("systemsPage.seo.description")}
        />
        <link rel="canonical" href={absoluteUrl("/sisteme")} />
        <meta property="og:title" content={t("systemsPage.seo.ogTitle")} />
        <meta
          property="og:description"
          content={t("systemsPage.seo.ogDescription")}
        />
        <meta property="og:url" content={absoluteUrl("/sisteme")} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={absoluteUrl("/og-image.png")} />
      </Helmet>

      {/* HERO */}
      <section className="relative py-32 overflow-hidden hero-bg">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt={t("systemsPage.hero.imageAlt")}
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px]" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="premium-badge mb-6 inline-flex">
              <Sun className="w-4 h-4" />
              {t("systemsPage.hero.badge")}
            </span>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              {t("systemsPage.hero.title")}{" "}
              <span className="text-gradient-primary">{t("systemsPage.hero.titleHighlight")}</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              {t("systemsPage.hero.subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* SYSTEMS */}
      {systems.map((system, index) => (
        <section
          key={system.id}
          id={system.id}
          className="py-32 relative overflow-hidden"
        >
          <div className="absolute inset-0">
            <div
              className={`absolute top-1/2 ${
                index === 0 ? "left-0" : index === 1 ? "right-0" : "left-1/4"
              } w-[500px] h-[500px] rounded-full blur-[150px] ${
                system.color === "primary"
                  ? "bg-primary/10"
                  : system.color === "accent"
                  ? "bg-accent/10"
                  : "bg-primary/10"
              }`}
            />
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className={`grid lg:grid-cols-2 gap-16 items-start ${index % 2 === 1 ? "lg:grid-flow-dense" : ""}`}>
              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className={index % 2 === 1 ? "lg:col-start-2" : ""}
              >
                <div className="inline-flex items-center gap-3 mb-6">
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                      system.color === "primary"
                        ? "bg-primary/10 text-primary"
                        : system.color === "accent"
                        ? "bg-accent/10 text-accent"
                        : "bg-primary/10 text-primary"
                    }`}
                  >
                    <system.icon className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="font-display text-4xl md:text-5xl font-bold">
                      {system.title}
                    </h2>
                    <p
                      className={`text-sm font-medium ${
                        system.color === "primary"
                          ? "text-primary"
                          : system.color === "accent"
                          ? "text-accent"
                          : "text-primary"
                      }`}
                    >
                      {system.subtitle}
                    </p>
                  </div>
                </div>

                <p className="text-lg leading-relaxed mb-8 text-muted-foreground">
                  {system.description}
                </p>

                {/* For Whom */}
                <div className="mb-8">
                  <h4 className="font-semibold mb-4">{t("systemsPage.forWhomTitle")}</h4>
                  <ul className="space-y-2">
                    {system.forWhom.map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <CheckCircle2
                          className={`w-5 h-5 flex-shrink-0 ${
                            system.color === "primary"
                              ? "text-primary"
                              : system.color === "accent"
                              ? "text-accent"
                              : "text-primary"
                          }`}
                        />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  to="/contact"
                  className={`inline-flex items-center gap-2 font-semibold transition-all hover:gap-3 ${
                    system.color === "primary"
                      ? "text-primary"
                      : system.color === "accent"
                      ? "text-accent"
                      : "text-primary"
                  }`}
                >
                  <span>{t("systemsPage.requestConsultation", { system: system.title })}</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>

              {/* Cards */}
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? 40 : -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className={`space-y-6 ${index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}`}
              >
                {/* Advantages Card */}
                <div className="glass-card rounded-3xl p-8">
                  <h4 className="font-display font-semibold text-xl mb-6">
                    {t("systemsPage.advantagesTitle")}
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {system.advantages.map((advantage, i) => (
                      <motion.div
                        key={advantage}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-3 p-3 rounded-xl bg-white/5"
                      >
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                            system.color === "primary"
                              ? "bg-primary/20 text-primary"
                              : system.color === "accent"
                              ? "bg-accent/20 text-accent"
                              : "bg-primary/20 text-primary"
                          }`}
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                        <span className="text-sm text-foreground">{advantage}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Scenarios */}
                <div className="grid sm:grid-cols-2 gap-4">
                  {system.scenarios.map((scenario, i) => (
                    <motion.div
                      key={scenario.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="glass-card rounded-2xl p-6"
                    >
                      <div
                        className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center ${
                          system.color === "primary"
                            ? "bg-primary/10 text-primary"
                            : system.color === "accent"
                            ? "bg-accent/10 text-accent"
                            : "bg-primary/10 text-primary"
                        }`}
                      >
                        <scenario.icon className="w-6 h-6" />
                      </div>
                      <h5 className="font-semibold mb-2">{scenario.title}</h5>
                      <p className="text-sm text-muted-foreground">
                        {scenario.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="py-32 hero-bg relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[200px]" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {t("systemsPage.cta.title")}
            </h2>
            <p className="text-xl text-muted-foreground mb-10">
              {t("systemsPage.cta.subtitle")}
            </p>
            <Link
              to="/contact"
              className="btn-premium-accent inline-flex items-center gap-2 group"
            >
              {t("systemsPage.cta.button")}
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Sisteme;
