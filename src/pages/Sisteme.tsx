import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { SectionTitle } from "@/components/ui/SectionTitle";
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
  const systems = [
    {
      id: "on-grid",
      icon: Grid3X3,
      title: "On-Grid",
      subtitle: "Conectat la rețea • Economii maxime",
      color: "primary",
      description:
        "Sistemele On-Grid sunt conectate direct la rețeaua electrică națională. Energia solară produsă este utilizată instant în casă, iar surplusul este livrat în rețea, reducând semnificativ facturile.",
      forWhom: [
        "Case și apartamente cu consum moderat-mare",
        "Afaceri și birouri",
        "Zone cu rețea electrică stabilă",
        "Cei care doresc ROI rapid",
      ],
      advantages: [
        "Cel mai mic cost de instalare",
        "Fără baterii = mai puține componente",
        "Facturi electrice reduse cu până la 90%",
        "Compensare net-metering disponibilă",
        "Întreținere minimă",
        "Amortizare în 4-6 ani",
      ],
      scenarios: [
        {
          icon: Home,
          title: "Casă familială",
          description: "Sistem 6-10kW pentru o familie de 4 persoane",
        },
        {
          icon: Factory,
          title: "Afacere mică",
          description: "Sistem 15-30kW pentru reducerea costurilor operaționale",
        },
      ],
    },
    {
      id: "off-grid",
      icon: WifiOff,
      title: "Off-Grid",
      subtitle: "Complet autonom • Independență totală",
      color: "accent",
      description:
        "Sistemele Off-Grid funcționează complet independent de rețeaua electrică. Toată energia este stocată în baterii performante, oferind autonomie 24/7, indiferent de condițiile externe.",
      forWhom: [
        "Case în zone rurale fără rețea",
        "Cabane de vacanță",
        "Ferme și gospodării agricole",
        "Cei care doresc independență totală",
      ],
      advantages: [
        "Zero dependență de rețea",
        "Imunitate la întreruperi",
        "Ideal pentru zone izolate",
        "Energie curată, non-stop",
        "Valoare adăugată proprietății",
        "Siguranță pe termen lung",
      ],
      scenarios: [
        {
          icon: Home,
          title: "Cabană montană",
          description: "Sistem 5-8kW cu stocare pentru 2-3 zile",
        },
        {
          icon: Factory,
          title: "Fermă agricolă",
          description: "Sistem 20-50kW pentru irigații și utilaje",
        },
      ],
    },
    {
      id: "hybrid",
      icon: Zap,
      title: "Hybrid",
      subtitle: "Best of both worlds • Control absolut",
      color: "energy",
      description:
        "Sistemele Hybrid combină avantajele On-Grid și Off-Grid. Sunt conectate la rețea pentru economii, dar au și baterii pentru backup. Oferă flexibilitate maximă și control total asupra energiei.",
      forWhom: [
        "Case cu consum variabil",
        "Zone cu întreruperi frecvente",
        "Clienți care doresc control maxim",
        "Investitori în energie verde",
      ],
      advantages: [
        "Economii + independență",
        "Backup automat în caz de pană",
        "Prioritizare inteligentă a consumului",
        "Compatibil cu tarife diferențiate",
        "Extensibil în timp",
        "Cel mai versatil sistem",
      ],
      scenarios: [
        {
          icon: Home,
          title: "Casă modernă",
          description: "Sistem 10kW + 10kWh stocare pentru familie premium",
        },
        {
          icon: Factory,
          title: "Business critic",
          description: "Sistem 25kW cu backup pentru continuitate operațională",
        },
      ],
    },
  ];

  return (
    <Layout>
      <Helmet>
        <title>Sisteme fotovoltaice On-Grid, Off-Grid și Hybrid în Moldova | X&amp;C Botnari</title>
        <meta
          name="description"
          content="Alege sistemul potrivit pentru casă sau afacere: On-Grid pentru economii, Off-Grid pentru autonomie, Hybrid pentru backup. Consultanță și instalare în Moldova."
        />
        <link rel="canonical" href={absoluteUrl("/sisteme")} />
        <meta property="og:title" content="Sisteme fotovoltaice în Moldova – X&C Botnari" />
        <meta
          property="og:description"
          content="On-Grid, Off-Grid și Hybrid: consultanță, proiectare și instalare sisteme fotovoltaice în Moldova."
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
            alt="Solar systems"
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
              Soluții Complete
            </span>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              Tipuri de{" "}
              <span className="text-gradient-primary">Sisteme Fotovoltaice</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Fiecare casă, fiecare afacere are nevoi unice. Descoperă soluția 
              perfectă pentru tine și transformă-ți acoperișul într-o sursă de venit.
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
                  <h4 className="font-semibold mb-4">Pentru cine este?</h4>
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
                  <span>Solicită consultare {system.title}</span>
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
                    Avantaje principale
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
              Nu știi ce sistem ți se potrivește?
            </h2>
            <p className="text-xl text-muted-foreground mb-10">
              Consultanții noștri îți vor analiza consumul și îți vor recomanda 
              soluția optimă pentru nevoile tale specifice.
            </p>
            <Link
              to="/contact"
              className="btn-premium-accent inline-flex items-center gap-2 group"
            >
              Programează o consultare gratuită
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Sisteme;
