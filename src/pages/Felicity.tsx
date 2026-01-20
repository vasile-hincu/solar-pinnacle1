import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SectionTitle } from "@/components/ui/SectionTitle";
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

const Felicity = () => {
  const batteries = [
    {
      capacity: "5.5",
      unit: "kWh",
      name: "Felicity ESS 5.5",
      idealFor: "Case mici, apartamente",
      voltage: "51.2V",
      cycles: "6000+",
      warranty: "10 ani",
      features: ["LiFePO4", "BMS integrat", "Montaj perete", "LCD display"],
      image: battery5kwImage,
    },
    {
      capacity: "10.5",
      unit: "kWh",
      name: "Felicity ESS 10.5",
      idealFor: "Case medii, birouri mici",
      voltage: "51.2V",
      cycles: "6000+",
      warranty: "10 ani",
      features: ["LiFePO4", "BMS avansat", "Scalabil", "Smart monitoring"],
      popular: true,
      image: battery10kwImage,
    },
    {
      capacity: "16",
      unit: "kWh",
      name: "Felicity ESS 16",
      idealFor: "Case mari, vile",
      voltage: "51.2V",
      cycles: "6000+",
      warranty: "10 ani",
      features: ["LiFePO4", "High power output", "Paralelizabil", "App control"],
      image: battery16kwImage,
    },
    {
      capacity: "23.5",
      unit: "kWh",
      name: "Felicity ESS 23.5",
      idealFor: "Rezidențial premium, comercial",
      voltage: "51.2V",
      cycles: "6000+",
      warranty: "10 ani",
      features: ["LiFePO4", "Max capacity", "Enterprise ready", "Remote management"],
      image: battery23kwImage,
    },
  ];

  const inverters = [
    {
      name: "Felicity",
      description: "Invertoare hibride de înaltă eficiență, perfect integrate cu bateriile Felicity.",
      features: ["Eficiență 98%+", "MPPT integrat", "Smart grid ready"],
      image: felicityInverterImage,
    },
    {
      name: "Deye",
      description: "Lider global în invertoare solare, cunoscut pentru fiabilitate și performanță.",
      features: ["Tehnologie germană", "10 ani garanție", "Compatibilitate universală"],
      image: deyeInverterImage,
    },
  ];

  const benefits = [
    {
      icon: Battery,
      title: "Tehnologie LiFePO4",
      description: "Cea mai sigură și durabilă chimie pentru baterii. Zero risc de incendiu.",
    },
    {
      icon: RefreshCcw,
      title: "6000+ Cicluri",
      description: "Durată de viață excepțională. Un ciclu/zi = 16+ ani de utilizare.",
    },
    {
      icon: Shield,
      title: "Garanție 10 Ani",
      description: "Investiție protejată pe termen lung, cu suport tehnic dedicat.",
    },
    {
      icon: Thermometer,
      title: "Funcționare -20°C până la 55°C",
      description: "Performanță stabilă în orice condiții climatice din Moldova.",
    },
    {
      icon: Cpu,
      title: "BMS Inteligent",
      description: "Sistem de management al bateriei care optimizează performanța.",
    },
    {
      icon: Gauge,
      title: "Eficiență 95%+",
      description: "Pierderi minime de energie la stocare și descărcare.",
    },
  ];

  return (
    <Layout>
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
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent border border-accent/20 mb-6"
              >
                <Award className="w-4 h-4" />
                <span className="font-medium text-sm">Importator Oficial & Exclusiv în Moldova</span>
              </motion.div>

              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="text-gradient-accent">Felicity</span>
                <br />
                <span className="text-foreground">Tehnologia care stochează viitorul.</span>
              </h1>

              <p className="text-xl text-muted-foreground mb-10 max-w-lg">
                Baterii premium LiFePO4 și invertoare de înaltă performanță. 
                X&C Botnari SRL – singura companie din Moldova cu acces direct la linia Felicity.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/contact" className="btn-premium-accent flex items-center gap-2 group">
                  Consultă un specialist
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <a href="#baterii" className="btn-premium-outline flex items-center gap-2">
                  Vezi produsele
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
                    <p className="font-bold text-lg">6000+ cicluri</p>
                    <p className="text-sm text-muted-foreground">Garanție 10 ani</p>
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
            badge="De ce Felicity?"
            title={
              <>
                Avantaje care fac <span className="text-gradient-accent">diferența</span>
              </>
            }
            description="Tehnologie de ultimă generație, validată global, acum disponibilă în Moldova."
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
            badge="Gama de Baterii"
            title={
              <>
                Baterii Felicity <span className="text-gradient-accent">ESS</span>
              </>
            }
            description="De la soluții compacte la sisteme industriale. Găsește capacitatea perfectă pentru nevoile tale."
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
                    Cel mai popular
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
                    <span className="text-muted-foreground">Voltaj</span>
                    <span className="font-medium text-foreground">{battery.voltage}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Cicluri</span>
                    <span className="font-medium text-foreground">{battery.cycles}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Garanție</span>
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
                  Solicită ofertă
                </Link>
              </motion.div>
            ))}
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
            badge="Invertoare Premium"
            title={
              <>
                Lucrăm cu cele mai <span className="text-gradient-primary">fiabile invertoare</span> din lume
              </>
            }
            description="Eficiență maximă și durabilitate dovedită. Parteneriate cu lideri globali."
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
                    <p className="text-sm text-muted-foreground">Invertor Premium</p>
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
              Exclusiv în Moldova
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Stochează energia soarelui cu{" "}
              <span className="text-gradient-accent">Felicity</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-10">
              Contactează-ne pentru o consultare gratuită și descoperă cum poți 
              beneficia de cele mai avansate baterii din piață.
            </p>
            <Link
              to="/contact"
              className="btn-premium-accent inline-flex items-center gap-2 group"
            >
              Consultă un specialist Felicity
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Felicity;
