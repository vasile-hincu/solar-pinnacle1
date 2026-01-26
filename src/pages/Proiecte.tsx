import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { useTranslation } from "react-i18next";
import {
  ArrowRight,
  Battery,
  Grid3X3,
  MapPin,
  Quote,
  Zap,
} from "lucide-react";

import project1Fallback from "@/assets/project-1.jpg";
import project2Fallback from "@/assets/project-2.jpg";
import project3Fallback from "@/assets/project-3.jpg";
import project4Fallback from "@/assets/project-4.jpg";

import projectReal1 from "@/assets/projects/project-real-1.jpg";
import projectReal2 from "@/assets/projects/project-real-2.jpg";
import projectReal3 from "@/assets/projects/project-real-3.jpg";
import projectReal4 from "@/assets/projects/project-real-4.jpg";
import projectReal5 from "@/assets/projects/project-real-5.jpg";
import projectReal6 from "@/assets/projects/project-real-6.jpg";
import { absoluteUrl } from "@/lib/seo";

type FilterType = "all" | "6kw" | "10kw" | "15kw" | "on-grid" | "off-grid" | "hybrid";

const Proiecte = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const { t } = useTranslation();

  const filters: { key: FilterType; label: string }[] = [
    { key: "all", label: t("projectsPage.filters.all") },
    { key: "6kw", label: t("projectsPage.filters.6kw") },
    { key: "10kw", label: t("projectsPage.filters.10kw") },
    { key: "15kw", label: t("projectsPage.filters.15kw") },
    { key: "on-grid", label: t("projectsPage.filters.on-grid") },
    { key: "off-grid", label: t("projectsPage.filters.off-grid") },
    { key: "hybrid", label: t("projectsPage.filters.hybrid") },
  ];

  const projects = [
    {
      id: 1,
      imageSrc: projectReal1,
      fallbackImage: project1Fallback,
      imageAlt: t("projectsPage.projects.1.imageAlt"),
      location: t("projectsPage.projects.1.location"),
      power: "15kW",
      type: "hybrid" as const,
      powerFilter: "15kw" as const,
      result: t("projectsPage.projects.1.result"),
      testimonial: t("projectsPage.projects.1.testimonial"),
      client: t("projectsPage.projects.1.client"),
    },
    {
      id: 2,
      imageSrc: projectReal2,
      fallbackImage: project2Fallback,
      imageAlt: t("projectsPage.projects.2.imageAlt"),
      location: t("projectsPage.projects.2.location"),
      power: "6kW",
      type: "off-grid" as const,
      powerFilter: "6kw" as const,
      result: t("projectsPage.projects.2.result"),
      testimonial: t("projectsPage.projects.2.testimonial"),
      client: t("projectsPage.projects.2.client"),
    },
    {
      id: 3,
      imageSrc: projectReal3,
      fallbackImage: project3Fallback,
      imageAlt: t("projectsPage.projects.3.imageAlt"),
      location: t("projectsPage.projects.3.location"),
      power: "30kW",
      type: "on-grid" as const,
      powerFilter: "15kw" as const,
      result: t("projectsPage.projects.3.result"),
      testimonial: t("projectsPage.projects.3.testimonial"),
      client: t("projectsPage.projects.3.client"),
    },
    {
      id: 4,
      imageSrc: projectReal4,
      fallbackImage: project4Fallback,
      imageAlt: t("projectsPage.projects.4.imageAlt"),
      location: t("projectsPage.projects.4.location"),
      power: "10kW",
      type: "hybrid" as const,
      powerFilter: "10kw" as const,
      result: t("projectsPage.projects.4.result"),
      testimonial: t("projectsPage.projects.4.testimonial"),
      client: t("projectsPage.projects.4.client"),
    },
    {
      id: 5,
      imageSrc: projectReal5,
      fallbackImage: project1Fallback,
      imageAlt: t("projectsPage.projects.5.imageAlt"),
      location: t("projectsPage.projects.5.location"),
      power: "8kW",
      type: "on-grid" as const,
      powerFilter: "6kw" as const,
      result: t("projectsPage.projects.5.result"),
      testimonial: t("projectsPage.projects.5.testimonial"),
      client: t("projectsPage.projects.5.client"),
    },
    {
      id: 6,
      imageSrc: projectReal6,
      fallbackImage: project3Fallback,
      imageAlt: t("projectsPage.projects.6.imageAlt"),
      location: t("projectsPage.projects.6.location"),
      power: "25kW",
      type: "off-grid" as const,
      powerFilter: "15kw" as const,
      result: t("projectsPage.projects.6.result"),
      testimonial: t("projectsPage.projects.6.testimonial"),
      client: t("projectsPage.projects.6.client"),
    },
  ];

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === "all") return true;
    if (["6kw", "10kw", "15kw"].includes(activeFilter)) {
      return project.powerFilter === activeFilter;
    }
    return project.type === activeFilter;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "on-grid":
        return Grid3X3;
      case "off-grid":
        return Battery;
      case "hybrid":
        return Zap;
      default:
        return Zap;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "on-grid":
        return "text-primary bg-primary/10";
      case "off-grid":
        return "text-accent bg-accent/10";
      case "hybrid":
        return "text-energy bg-energy/10";
      default:
        return "text-primary bg-primary/10";
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>{t("projectsPage.seo.title")}</title>
        <meta
          name="description"
          content={t("projectsPage.seo.description")}
        />
        <link rel="canonical" href={absoluteUrl("/proiecte")} />
        <meta property="og:title" content={t("projectsPage.seo.ogTitle")} />
        <meta
          property="og:description"
          content={t("projectsPage.seo.ogDescription")}
        />
        <meta property="og:url" content={absoluteUrl("/proiecte")} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={absoluteUrl("/og-image.png")} />
      </Helmet>

      {/* HERO */}
      <section className="py-32 hero-bg relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[200px]" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="premium-badge mb-6 inline-flex">
              <Zap className="w-4 h-4" />
              {t("projectsPage.hero.badge")}
            </span>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              {t("projectsPage.hero.title")}{" "}
              <span className="text-gradient-primary">{t("projectsPage.hero.titleHighlight")}</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              {t("projectsPage.hero.subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* FILTERS */}
      <section className="py-12 border-b border-border sticky top-[72px] bg-background/80 backdrop-blur-xl z-30">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-3">
            {filters.map((filter) => (
              <motion.button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === filter.key
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {filter.label}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS GRID */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => {
                const TypeIcon = getTypeIcon(project.type);
                return (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="group"
                  >
                    <div className="glass-card overflow-hidden h-full flex flex-col">
                      {/* Image */}
                      <div className="relative overflow-hidden aspect-[4/3]">
                        <img
                          src={project.imageSrc}
                          alt={project.imageAlt}
                          loading="lazy"
                          decoding="async"
                          onError={(e) => {
                            e.currentTarget.src = project.fallbackImage;
                          }}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        
                        {/* Type Badge */}
                        <div className="absolute top-4 left-4">
                          <div
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-sm ${getTypeColor(
                              project.type
                            )}`}
                          >
                            <TypeIcon className="w-4 h-4" />
                            <span className="text-sm font-medium capitalize">
                              {t(`projectsPage.typeLabels.${project.type}`)}
                            </span>
                          </div>
                        </div>

                        {/* Power Badge */}
                        <div className="absolute top-4 right-4">
                          <div className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-bold">
                            {project.power}
                          </div>
                        </div>

                        {/* Location */}
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="flex items-center gap-2 text-white">
                            <MapPin className="w-4 h-4" />
                            <span className="font-medium">{project.location}</span>
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="mb-4">
                          <p className="text-energy font-semibold mb-1">{project.result}</p>
                        </div>

                        <div className="flex-1">
                          <div className="flex gap-2 mb-3">
                            <Quote className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                            <p className="text-muted-foreground text-sm italic">
                              {project.testimonial}
                            </p>
                          </div>
                          <p className="text-sm font-medium text-foreground">
                            — {project.client}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-muted-foreground text-lg">
                {t("projectsPage.empty")}
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {t("projectsPage.cta.title")}{" "}
              <span className="text-gradient-primary">{t("projectsPage.cta.titleHighlight")}</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-10">
              {t("projectsPage.cta.subtitle")}
            </p>
            <Link
              to="/contact"
              className="btn-premium-accent inline-flex items-center gap-2 group"
            >
              {t("projectsPage.cta.button")}
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Proiecte;
