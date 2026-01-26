import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";
import { useTranslation } from "react-i18next";

export const Footer = () => {
  const { t } = useTranslation();
  const services = t("footer.servicesItems", { returnObjects: true }) as unknown;
  const servicesList = Array.isArray(services) ? (services as string[]) : [];
  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3">
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
            <p className="text-muted-foreground text-sm leading-relaxed">
              {t("footer.brandText")}
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/xcbotnari/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-6">{t("footer.navTitle")}</h4>
            <ul className="space-y-3">
              {[
                { name: t("nav.home"), href: "/" },
                { name: t("nav.systems"), href: "/sisteme" },
                { name: t("nav.felicity"), href: "/felicity" },
                { name: t("nav.projects"), href: "/proiecte" },
                { name: t("nav.prices"), href: "/preturi" },
                { name: t("nav.contact"), href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-6">{t("footer.servicesTitle")}</h4>
            <ul className="space-y-3">
              {servicesList.map((service) => (
                <li key={service}>
                  <span className="text-muted-foreground text-sm">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-6">{t("footer.contactTitle")}</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">{t("footer.phoneLabel")}</p>
                  <a
                    href="tel:+37378901362"
                    className="text-foreground hover:text-primary transition-colors"
                  >
                    078 901 362
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">{t("footer.emailLabel")}</p>
                  <a
                    href="mailto:contact@xcbotnari.md"
                    className="text-foreground hover:text-primary transition-colors"
                  >
                    contact@xcbotnari.md
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">{t("footer.addressLabel")}</p>
                  <span className="text-foreground">
                    {t("footer.addressValue")}
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="section-divider my-12" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} X&C Botnari SRL. {t("footer.copyright")}
          </p>
          <p className="text-sm text-muted-foreground">
            {t("footer.officialImporter")} <span className="text-accent font-medium">Felicity</span> {t("footer.importerSuffix")}
          </p>
        </div>
      </div>
    </footer>
  );
};
