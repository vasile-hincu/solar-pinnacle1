import { useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import {
  ArrowRight,
  CheckCircle2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  AlertCircle,
} from "lucide-react";
import { sendContactEmail } from "@/lib/emailService";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    systemType: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      // Validate required fields
      if (!formData.name || !formData.phone) {
        setSubmitError("Te rugăm să completezi nume și telefon");
        setIsSubmitting(false);
        return;
      }

      // Send email
      const success = await sendContactEmail(formData);
      
      if (success) {
        setIsSubmitted(true);
        setFormData({ name: "", phone: "", email: "", systemType: "", message: "" });
        toast.success("Mesaj trimis cu succes! Te vom contacta în curând.");
      } else {
        setSubmitError("A apărut o eroare. Te rugăm să încerci din nou.");
        toast.error("Eroare la trimiterea mesajului");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitError("A apărut o eroare la trimiterea mesajului");
      toast.error("Eroare la trimiterea mesajului");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    {
      icon: Phone,
      label: "Telefon",
      value: "078 901 362",
      href: "tel:+378901362",
      description: "Luni - Vineri, 8:00 - 18:00",
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: "078 901 362",
      href: "https://wa.me/378901362",
      description: "Răspundem rapid",
    },
    {
      icon: Mail,
      label: "Email",
      value: "contact@xcbotnari.md",
      href: "mailto:contact@xcbotnari.md",
      description: "Răspuns în 24 ore",
    },
    {
      icon: MapPin,
      label: "Adresă",
      value: "Chișinău, Republica Moldova",
      href: "https://maps.google.com",
      description: "Vizite cu programare",
    },
  ];

  const benefits = [
    "Consultare gratuită și fără obligații",
    "Analiză personalizată a consumului",
    "Ofertă detaliată în 24 ore",
    "Instalare profesională rapidă",
  ];

  return (
    <Layout>
      {/* HERO */}
      <section className="py-32 hero-bg relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[200px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[150px]" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="premium-badge mb-6 inline-flex">
              <Mail className="w-4 h-4" />
              Contact
            </span>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              Hai să construim sistemul tău energetic{" "}
              <span className="text-gradient-accent">perfect</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Suntem aici să răspundem la toate întrebările tale și să îți oferim 
              cea mai bună soluție pentru nevoile tale energetice.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-2 space-y-8"
            >
              <div>
                <h2 className="font-display text-3xl font-bold mb-4">
                  Informații de Contact
                </h2>
                <p className="text-muted-foreground">
                  Alege modalitatea preferată de comunicare. Suntem mereu disponibili 
                  să te ajutăm.
                </p>
              </div>

              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    target={item.label === "Adresă" ? "_blank" : undefined}
                    rel={item.label === "Adresă" ? "noopener noreferrer" : undefined}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="floating-card flex items-start gap-4 group cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                      <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {item.value}
                      </p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Benefits */}
              <div className="glass-card p-6">
                <h3 className="font-semibold mb-4">De ce să ne contactezi?</h3>
                <ul className="space-y-3">
                  {benefits.map((benefit) => (
                    <li key={benefit} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-energy flex-shrink-0" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-3"
            >
              <div className="glass-card p-8 md:p-10">
                <h2 className="font-display text-2xl font-bold mb-6">
                  Solicită o Ofertă Personalizată
                </h2>

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 rounded-full bg-energy/20 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="w-10 h-10 text-energy" />
                    </div>
                    <h3 className="font-display text-2xl font-bold mb-3">
                      Mesaj trimis cu succes!
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Îți mulțumim pentru interes. Te vom contacta în cel mai scurt timp posibil.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="text-primary font-semibold hover:underline"
                    >
                      Trimite alt mesaj
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {submitError && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-start gap-3 p-4 bg-destructive/10 text-destructive rounded-xl border border-destructive/20"
                      >
                        <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        <p className="text-sm">{submitError}</p>
                      </motion.div>
                    )}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Nume complet *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="input-premium"
                          placeholder="Ion Popescu"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Telefon *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="input-premium"
                          placeholder="+373 60 000 000"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="input-premium"
                        placeholder="email@exemplu.md"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Tip sistem interesat
                      </label>
                      <select
                        name="systemType"
                        value={formData.systemType}
                        onChange={handleChange}
                        className="input-premium"
                      >
                        <option value="">Selectează tipul de sistem</option>
                        <option value="on-grid">On-Grid</option>
                        <option value="off-grid">Off-Grid</option>
                        <option value="hybrid">Hybrid</option>
                        <option value="nu-stiu">Nu știu încă</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Mesaj
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        className="input-premium resize-none"
                        placeholder="Descrie pe scurt nevoile tale sau întrebările pe care le ai..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-premium-accent w-full flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
                          Se trimite...
                        </>
                      ) : (
                        <>
                          Trimite solicitarea
                          <Send className="w-5 h-5" />
                        </>
                      )}
                    </button>

                    <p className="text-sm text-muted-foreground text-center">
                      Prin trimiterea formularului, ești de acord cu politica noastră de confidențialitate.
                    </p>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* MAP SECTION */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Ne găsești în Chișinău
            </h2>
            <p className="text-muted-foreground">
              Vizitează-ne la sediu pentru o consultare față în față
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-3xl overflow-hidden shadow-2xl h-[400px] glass-card"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d87144.45275899043!2d28.77353579643555!3d47.02343039288665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c97c3628b769a1%3A0x37d1d6305749dd3c!2sChi%C8%99in%C4%83u%2C%20Moldova!5e0!3m2!1sen!2s!4v1706000000000!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="X&C Botnari Location"
            />
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
