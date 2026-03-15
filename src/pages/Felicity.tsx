import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { useTranslation } from "react-i18next";
import {
  ArrowRight,
  Award,
  Battery,
  CheckCircle2,
  Cpu,
  Gauge,
  RefreshCcw,
  Shield,
  Thermometer,
  Zap,
} from "lucide-react";
import batteryImage from "@/assets/battery-felicity.jpg";
import battery5kwImage from "@/assets/5kw acc.png";
import battery10kwImage from "@/assets/10kw acc.png";
import battery16kwImage from "@/assets/16kw acc.png";
import battery23kwImage from "@/assets/23kw acc.png";
import felicityInverterImage from "@/assets/felicity invertor 12kw.png";
import deyeInverterImage from "@/assets/deye 15kw.webp";
import { absoluteUrl } from "@/lib/seo";

const Felicity = () => {
  const { t } = useTranslation();

  const batteries = [
    {
      key: "5_5",
      capacity: "5.5",
      unit: "kWh",
      name: "Felicity ESS 5.5",
      voltage: "51.2V",
      popular: false,
      image: battery5kwImage,
    },
    {
      key: "11_7",
      capacity: "11.7",
      unit: "kWh",
      name: "Felicity ESS 11.7",
      voltage: "51.2V",
      popular: true,
      image: battery10kwImage,
    },
    {
      key: "16",
      capacity: "16",
      unit: "kWh",
      name: "Felicity ESS 16",
      voltage: "51.2V",
      popular: false,
      image: battery16kwImage,
    },
    {
      key: "23_5",
      capacity: "23.5",
      unit: "kWh",
      name: "Felicity ESS 23.5",
      voltage: "51.2V",
      popular: false,
      image: battery23kwImage,
    },
  ].map((battery) => {
    const featuresRaw = t(`felicityPage.batteries.${battery.key}.features`, {
      returnObjects: true,
    }) as unknown;
    const features = Array.isArray(featuresRaw) ? (featuresRaw as string[]) : [];

    return {
      ...battery,
      idealFor: t(`felicityPage.batteries.${battery.key}.idealFor`),
      warranty: t("felicityPage.batteries.warrantyValue"),
      features,
    };
  });

  const inverters = [
    {
      key: "felicity",
      name: "Felicity",
      image: felicityInverterImage,
    },
    {
      key: "deye",
      name: "Deye",
      image: deyeInverterImage,
    },
  ].map((inverter) => {
    const featuresRaw = t(`felicityPage.inverters.${inverter.key}.features`, {
      returnObjects: true,
    }) as unknown;
    const features = Array.isArray(featuresRaw) ? (featuresRaw as string[]) : [];

    return {
      ...inverter,
      description: t(`felicityPage.inverters.${inverter.key}.description`),
      features,
    };
  });

  const benefits = [
    { icon: Battery, key: "lifepo4" },
    { icon: RefreshCcw, key: "modular" },
    { icon: Shield, key: "warranty" },
    { icon: Thermometer, key: "temperature" },
    { icon: Cpu, key: "bms" },
    { icon: Gauge, key: "efficiency" },
  ].map((benefit) => ({
    icon: benefit.icon,
    title: t(`felicityPage.benefits.items.${benefit.key}.title`),
    description: t(`felicityPage.benefits.items.${benefit.key}.description`),
  }));

  return (
    <Layout>
      <Helmet>
        <title>{t("felicityPage.seo.title")}</title>
        <meta
          name="description"
          content={t("felicityPage.seo.description")}
        />
        <link rel="canonical" href={absoluteUrl("/felicity")} />
        <meta property="og:title" content={t("felicityPage.seo.ogTitle")} />
        <meta
          property="og:description"
          content={t("felicityPage.seo.ogDescription")}
        />
        <meta property="og:url" content={absoluteUrl("/felicity")} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={absoluteUrl("/og-image.png")} />
      </Helmet>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center hero-bg overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/90" />
          <div className="absolute top-1/4 right-0 w-[800px] h-[800px] bg-accent/10 rounded-full blur-[200px]" />
          <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px]" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-6 inline-flex items-center gap-4 rounded-2xl border border-border/60 bg-background/75 px-5 py-4 shadow-xl backdrop-blur border-l-4 border-l-[#F97316]"
              >
                <div className="shrink-0 rounded-xl bg-white p-2 shadow-sm ring-1 ring-black/10">
                  <img
                    src="/felicity-logo.png"
                    onError={(e) => {
                      e.currentTarget.src = "/felicity-logo.svg";
                    }}
                    alt="FelicitySolar"
                    className="h-12 w-auto object-contain md:h-14 [filter:drop-shadow(0_10px_24px_rgba(0,0,0,0.20))]"
                    loading="lazy"
                  />
                </div>

                <div className="flex min-w-0 flex-col">
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-[#F97316]" />
                    <span className="text-sm font-semibold text-foreground">{t("felicityPage.hero.badgeTitle")}</span>
                  </div>
                  <span className="mt-1 text-xs text-muted-foreground">
                    {t("felicityPage.hero.badgeSubtitle")}
                  </span>
                </div>
              </motion.div>

              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="text-gradient-accent">Felicity</span>
                <br />
                <span className="text-foreground">{t("felicityPage.hero.title")}</span>
              </h1>

              <p className="text-xl text-muted-foreground mb-10 max-w-lg">
                {t("felicityPage.hero.subtitle")}
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/contact" className="btn-premium-accent flex items-center gap-2 group">
                  {t("felicityPage.hero.ctaPrimary")}
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <a href="#baterii" className="btn-premium-outline flex items-center gap-2">
                  {t("felicityPage.hero.ctaSecondary")}
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <div className="relative">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 6, repeat: Infinity }}
                  className="relative z-10"
                >
                  <img
                    src={batteryImage}
                    alt="Felicity Battery System"
                    className="w-full rounded-3xl shadow-2xl"
                  />
                </motion.div>
                
                {/* Glow effect behind image */}
                <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-primary/20 rounded-3xl blur-3xl transform scale-110" />
              </div>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute -top-6 -left-6 glass-card p-4 z-10"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-energy/20 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-energy" />
                  </div>
                  <div>
                    <p className="font-bold text-lg">{t("felicityPage.hero.floatingBadge.title")}</p>
                    <p className="text-sm text-muted-foreground">{t("felicityPage.hero.floatingBadge.subtitle")}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-32 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <SectionTitle
            badge={t("felicityPage.benefits.badge")}
            title={
              <>
                {t("felicityPage.benefits.title")} <span className="text-gradient-accent">{t("felicityPage.benefits.titleHighlight")}</span>
              </>
            }
            description={t("felicityPage.benefits.description")}
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="floating-card group"
              >
                <div className="w-14 h-14 rounded-2xl bg-accent/10 text-accent flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110">
                  <benefit.icon className="w-7 h-7" />
                </div>
                <h3 className="font-display text-xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BATTERIES */}
      <section id="baterii" className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />
        <div className="container mx-auto px-6 relative z-10">
          <SectionTitle
            badge={t("felicityPage.batteries.badge")}
            title={
              <>
                {t("felicityPage.batteries.title")} <span className="text-gradient-accent">ESS</span>
              </>
            }
            description={t("felicityPage.batteries.description")}
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {batteries.map((battery, index) => (
              <motion.div
                key={battery.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative glass-card overflow-visible rounded-3xl pt-10 pb-6 px-6 transition-all duration-500 hover:-translate-y-2 ${
                  battery.popular ? "ring-2 ring-accent/50" : ""
                }`}
              >
                {battery.popular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-accent text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg whitespace-nowrap">
                    {t("felicityPage.batteries.popular")}
                  </div>
                )}

                <div className="text-center mb-6">
                  <div className="flex items-baseline justify-center gap-1 mb-2">
                    <span className="font-display text-5xl font-bold text-foreground">
                      {battery.capacity}
                    </span>
                    <span className="text-xl text-muted-foreground">{battery.unit}</span>
                  </div>
                  <h3 className="font-semibold text-foreground">{battery.name}</h3>
                  <p className="text-sm text-muted-foreground">{battery.idealFor}</p>
                </div>

                {battery.image && (
                  <div className="mb-6 rounded-2xl overflow-hidden h-64">
                    <img
                      src={battery.image}
                      alt={battery.name}
                      className="w-full h-full object-contain bg-gradient-to-br from-secondary/50 to-secondary/30 p-4"
                    />
                  </div>
                )}

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{t("felicityPage.batteries.labels.voltage")}</span>
                    <span className="font-medium text-foreground">{battery.voltage}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{t("felicityPage.batteries.labels.technology")}</span>
                    <span className="font-medium text-foreground">LiFePO4</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{t("felicityPage.batteries.labels.warranty")}</span>
                    <span className="font-medium text-foreground">{battery.warranty}</span>
                  </div>
                </div>

                <div className="border-t border-border pt-6 mb-6">
                  <ul className="space-y-2">
                    {battery.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  to="/contact"
                  className={`w-full py-3 rounded-xl font-semibold text-center transition-all duration-300 block ${
                    battery.popular
                      ? "bg-accent text-accent-foreground hover:opacity-90"
                      : "bg-secondary text-foreground hover:bg-secondary/80"
                  }`}
                >
                  {t("felicityPage.batteries.requestQuote")}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HIGH VOLTAGE BATTERIES */}
      <section id="tensiune-inalta" className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        <div className="container mx-auto px-6 relative z-10">
          <SectionTitle
            badge={t("felicityPage.highVoltage.badge")}
            title={t("felicityPage.highVoltage.title")}
            description={t("felicityPage.highVoltage.description")}
          />

          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              {(
                t("felicityPage.highVoltage.items", { returnObjects: true }) as unknown
              )
                .filter((item): item is { title: string; description: string } => typeof item === "object" && item !== null)
                .map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <span className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent">
                      <CheckCircle2 className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="font-semibold text-foreground">{item.title}</p>
                      <p className="text-muted-foreground text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
            </div>

            <div className="rounded-3xl overflow-hidden shadow-lg">
              <img
                src="https://via.placeholder.com/800x500?text=High+Voltage+Battery"
                alt={t("felicityPage.highVoltage.imageAlt")}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* INVERTERS */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[150px]" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <SectionTitle
            badge={t("felicityPage.inverters.badge")}
            title={
              <>
                {t("felicityPage.inverters.title")} <span className="text-gradient-primary">{t("felicityPage.inverters.titleHighlight")}</span> {t("felicityPage.inverters.titleSuffix")}
              </>
            }
            description={t("felicityPage.inverters.description")}
          />

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {inverters.map((inverter, index) => (
              <motion.div
                key={inverter.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="floating-card"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Cpu className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold">{inverter.name}</h3>
                    <p className="text-sm text-muted-foreground">{t("felicityPage.inverters.premiumLabel")}</p>
                  </div>
                </div>

                {inverter.image && (
                  <div className="mb-6 rounded-2xl overflow-hidden bg-gradient-to-br from-secondary/60 to-secondary/30 p-6">
                    <img
                      src={inverter.image}
                      alt={`${inverter.name} invertor`}
                      className="w-full h-56 object-contain"
                      loading="lazy"
                    />
                  </div>
                )}

                <p className="text-muted-foreground mb-6">{inverter.description}</p>
                <div className="flex flex-wrap gap-2">
                  {inverter.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 hero-bg relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/10 rounded-full blur-[200px]" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="premium-badge mb-6 inline-flex">
              <Award className="w-4 h-4" />
              {t("felicityPage.cta.badge")}
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {t("felicityPage.cta.title")}{" "}
              <span className="text-gradient-accent">Felicity</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-10">
              {t("felicityPage.cta.subtitle")}
            </p>
            <Link
              to="/contact"
              className="btn-premium-accent inline-flex items-center gap-2 group"
            >
              {t("felicityPage.cta.button")}
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Felicity;
