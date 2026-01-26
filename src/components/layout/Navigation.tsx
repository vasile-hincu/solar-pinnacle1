import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";

const navLinks = [
  { key: "nav.home", href: "/" },
  { key: "nav.systems", href: "/sisteme" },
  { key: "nav.felicity", href: "/felicity" },
  { key: "nav.projects", href: "/proiecte" },
  { key: "nav.prices", href: "/preturi" },
  { key: "nav.contact", href: "/contact" },
];

export const Navigation = () => {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const currentLng = i18n.language?.startsWith("ru") ? "ru" : "ro";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`nav-glass transition-all duration-500 ${
          isScrolled ? "py-3" : "py-5"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src="/logo.png"
              alt={`X&C Botnari - ${t("common.brandTagline")}`}
              className="h-12 w-auto object-contain"
              onError={(e) => {
                e.currentTarget.src = "/logo.svg";
              }}
            />
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg leading-tight">
                X&C Botnari
              </span>
              <span className="text-[10px] text-muted-foreground tracking-wide">
                {t("common.brandTagline")}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`relative text-sm font-medium transition-colors duration-300 ${
                  location.pathname === link.href
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t(link.key)}
                {location.pathname === link.href && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-2 rounded-full border border-border/60 bg-secondary/30 px-2 py-1">
              <button
                type="button"
                onClick={() => i18n.changeLanguage("ro")}
                className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                  currentLng === "ro" ? "bg-background text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                RO
              </button>
              <button
                type="button"
                onClick={() => i18n.changeLanguage("ru")}
                className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                  currentLng === "ru" ? "bg-background text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                RU
              </button>
            </div>
            <Link
              to="/contact"
              className="btn-premium-primary text-sm px-6 py-3"
            >
              {t("nav.cta")}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-foreground"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-[72px] z-40 bg-background/95 backdrop-blur-xl border-b border-border lg:hidden"
          >
            <div className="container mx-auto px-6 py-8">
              <div className="flex flex-col gap-4">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={link.href}
                      className={`block text-lg font-medium py-3 border-b border-border/50 ${
                        location.pathname === link.href
                          ? "text-primary"
                          : "text-foreground"
                      }`}
                    >
                      {t(link.key)}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="pt-4"
                >
                  <Link
                    to="/contact"
                    className="btn-premium-primary w-full text-center block"
                  >
                    {t("nav.cta")}
                  </Link>
                </motion.div>

                <div className="pt-2 flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => i18n.changeLanguage("ro")}
                    className={`px-4 py-2 rounded-full border border-border/60 text-sm ${
                      currentLng === "ro" ? "bg-secondary" : "bg-transparent"
                    }`}
                  >
                    RO
                  </button>
                  <button
                    type="button"
                    onClick={() => i18n.changeLanguage("ru")}
                    className={`px-4 py-2 rounded-full border border-border/60 text-sm ${
                      currentLng === "ru" ? "bg-secondary" : "bg-transparent"
                    }`}
                  >
                    RU
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
