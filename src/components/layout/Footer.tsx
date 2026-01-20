import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";
import logoXcBotnari from "@/assets/logo-xc-botnari.png";

export const Footer = () => {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <img 
                src={logoXcBotnari} 
                alt="X&C Botnari - Conectăm Soarele la Casa Ta" 
                className="h-12 w-auto object-contain"
              />
              <div className="flex flex-col">
                <span className="font-display font-bold text-lg leading-tight">
                  X&C Botnari
                </span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-widest">
                  Solar Energy
                </span>
              </div>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Liderul pieței fotovoltaice din Republica Moldova. 
              Construim sisteme energetice inteligente pentru viitorul tău.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-6">Navigare</h4>
            <ul className="space-y-3">
              {[
                { name: "Acasă", href: "/" },
                { name: "Tipuri de Sisteme", href: "/sisteme" },
                { name: "Felicity", href: "/felicity" },
                { name: "Proiecte Realizate", href: "/proiecte" },
                { name: "Contact", href: "/contact" },
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
            <h4 className="font-display font-semibold text-lg mb-6">Servicii</h4>
            <ul className="space-y-3">
              {[
                "Sisteme On-Grid",
                "Sisteme Off-Grid",
                "Sisteme Hybrid",
                "Baterii Felicity",
                "Invertoare Premium",
                "Consultanță Energetică",
              ].map((service) => (
                <li key={service}>
                  <span className="text-muted-foreground text-sm">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Telefon</p>
                  <a
                    href="tel:+378901362"
                    className="text-foreground hover:text-primary transition-colors"
                  >
                    078 901 362
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
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
                  <p className="text-sm text-muted-foreground">Adresă</p>
                  <span className="text-foreground">
                    Chișinău, Republica Moldova
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="section-divider my-12" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} X&C Botnari SRL. Toate drepturile rezervate.
          </p>
          <p className="text-sm text-muted-foreground">
            Importator oficial și exclusiv <span className="text-accent font-medium">Felicity</span> în Moldova
          </p>
        </div>
      </div>
    </footer>
  );
};
