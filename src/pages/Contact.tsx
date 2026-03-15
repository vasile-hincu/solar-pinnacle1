import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
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
import { absoluteUrl } from "@/lib/seo";

const initialFormData = {
  name: "",
  phone: "",
  email: "",
  systemType: "",
  kw: "",
  batteryKwh: "",
  mounting: "",
  estimatedPriceEur: "",
  message: "",
};

const Contact = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [formData, setFormData] = useState(initialFormData);
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
        setSubmitError(t("contactPage.errors.requiredNamePhone"));
        setIsSubmitting(false);
        return;
      }

      // Send email
      const success = await sendContactEmail(formData);
      
      if (success) {
        setIsSubmitted(true);
        setFormData(initialFormData);
        toast.success(t("contactPage.toast.success"));
      } else {
        setSubmitError(t("contactPage.errors.generic"));
        toast.error(t("contactPage.toast.error"));
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitError(t("contactPage.errors.submitFailed"));
      toast.error(t("contactPage.toast.error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const systemRaw = params.get("systemType") || params.get("system") || "";
    const kwRaw = params.get("kw") || "";
    const batteryRaw = params.get("battery") || params.get("battery_kwh") || "";
    const mountRaw = params.get("mount") || params.get("mounting") || "";
    const priceRaw = params.get("price") || params.get("estimatedPriceEur") || "";
    const panelsRaw = params.get("panels") || "";
    const realKwpRaw = params.get("real_kwp") || "";

    const normalizedSystem = (() => {
      const v = systemRaw.trim().toLowerCase();
      if (v === "hybrid" || v === "hibrid") return "hybrid";
      if (v === "on-grid" || v === "ongrid" || v === "on grid") return "on-grid";
      if (v === "off-grid" || v === "offgrid" || v === "off grid") return "off-grid";
      return systemRaw;
    })();

    const normalizedMount = (() => {
      const v = mountRaw.trim().toLowerCase();
      if (v === "acoperis" || v === "acoperiș" || v === "roof") return "acoperiș";
      if (v === "carcasa" || v === "carcasă" || v === "sol" || v === "ground") return "carcasă (la sol)";
      return mountRaw;
    })();

    if (!systemRaw && !kwRaw && !batteryRaw && !mountRaw && !priceRaw && !panelsRaw && !realKwpRaw) return;

    setFormData((prev) => ({
      ...prev,
      systemType: prev.systemType || (normalizedSystem as string) || "",
      kw: prev.kw || kwRaw || "",
      batteryKwh: prev.batteryKwh || batteryRaw || "",
      mounting: prev.mounting || normalizedMount || "",
      estimatedPriceEur: prev.estimatedPriceEur || priceRaw || "",
    }));
  }, [location.search]);

  const contactInfo = [
    {
      icon: Phone,
      label: t("contactPage.contactInfo.phone.label"),
      value: "078 901 362",
      href: "tel:+37378901362",
      description: t("contactPage.contactInfo.phone.description"),
    },
    {
      icon: MessageCircle,
      label: t("contactPage.contactInfo.whatsapp.label"),
      value: "078 901 362",
      href: "https://wa.me/37378901362",
      description: t("contactPage.contactInfo.whatsapp.description"),
    },
    {
      icon: Mail,
      label: t("contactPage.contactInfo.email.label"),
      value: "contact@xcbotnari.md",
      href: "mailto:contact@xcbotnari.md",
      description: t("contactPage.contactInfo.email.description"),
    },
    {
      icon: MapPin,
      label: t("contactPage.contactInfo.address.label"),
      value: t("footer.addressValue"),
      href: "https://maps.google.com",
      description: t("contactPage.contactInfo.address.description"),
    },
  ];

  const benefitsRaw = t("contactPage.benefits", { returnObjects: true }) as unknown;
  const benefits = Array.isArray(benefitsRaw) ? (benefitsRaw as string[]) : [];

  const systemLabel = (value: string) => {
    const v = value.trim().toLowerCase();
    if (v === "on-grid" || v === "ongrid" || v === "on grid") return t("pricing.onGrid");
    if (v === "off-grid" || v === "offgrid" || v === "off grid") return t("pricing.offGrid");
    if (v === "hybrid" || v === "hibrid") return t("pricing.hybrid");
    if (v === "nu-stiu" || v === "nu știu" || v === "nu stiu") return t("contactPage.form.systemUnknown");
    return value;
  };

  return (
    <Layout>
      <Helmet>
        <title>{t("contactPage.seo.title")}</title>
        <meta
          name="description"
          content={t("contactPage.seo.description")}
        />
        <link rel="canonical" href={absoluteUrl("/contact")} />
        <meta property="og:title" content={t("contactPage.seo.ogTitle")} />
        <meta
          property="og:description"
          content={t("contactPage.seo.ogDescription")}
        />
        <meta property="og:url" content={absoluteUrl("/contact")} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={absoluteUrl("/og-image.png")} />
      </Helmet>

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
              {t("contactPage.heroBadge")}
            </span>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              {t("contactPage.heroTitle")}
            </h1>
            <p className="text-xl text-muted-foreground">
              {t("contactPage.heroSubtitle")}
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
                  {t("contactPage.infoTitle")}
                </h2>
                <p className="text-muted-foreground">
                  {t("contactPage.infoSubtitle")}
                </p>
              </div>

              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    target={item.icon === MapPin ? "_blank" : undefined}
                    rel={item.icon === MapPin ? "noopener noreferrer" : undefined}
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
                <h3 className="font-semibold mb-4">{t("contactPage.whyContact")}</h3>
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
                  {t("contactPage.formTitle")}
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
                      {t("contactPage.successTitle")}
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      {t("contactPage.successDesc")}
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="text-primary font-semibold hover:underline"
                    >
                      {t("contactPage.sendAnother")}
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
                          {t("contactPage.fullName")} *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="input-premium"
                          placeholder={t("contactPage.placeholders.fullName")}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          {t("contactPage.phone")} *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="input-premium"
                          placeholder={t("contactPage.placeholders.phone")}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {t("contactPage.email")}
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="input-premium"
                        placeholder={t("contactPage.placeholders.email")}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {t("contactPage.systemType")}
                      </label>
                      <select
                        name="systemType"
                        value={formData.systemType}
                        onChange={handleChange}
                        className="input-premium"
                      >
                        <option value="">{t("contactPage.form.systemPlaceholder")}</option>
                        <option value="on-grid">{t("pricing.onGrid")}</option>
                        <option value="off-grid">{t("pricing.offGrid")}</option>
                        <option value="hybrid">{t("pricing.hybrid")}</option>
                        <option value="nu-stiu">{t("contactPage.form.systemUnknown")}</option>
                      </select>
                    </div>

                    {(formData.systemType || formData.kw || formData.batteryKwh || formData.mounting || formData.estimatedPriceEur) && (
                      <div className="rounded-2xl border border-border/60 bg-secondary/30 p-4">
                        <p className="text-sm font-medium">{t("contactPage.summaryTitle")}</p>
                        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                          {formData.systemType && (
                            <div>
                              <span className="font-medium text-foreground">{t("contactPage.summarySystem")}:</span> {systemLabel(formData.systemType)}
                            </div>
                          )}
                          {formData.kw && (
                            <div>
                              <span className="font-medium text-foreground">{t("contactPage.summaryPower")}:</span> {formData.kw} kW
                            </div>
                          )}
                          {formData.mounting && (
                            <div>
                              <span className="font-medium text-foreground">{t("contactPage.summaryMount")}:</span> {formData.mounting}
                            </div>
                          )}
                          {(formData.systemType === "hybrid" || formData.systemType === "off-grid") && formData.batteryKwh && (
                            <div>
                              <span className="font-medium text-foreground">{t("contactPage.summaryBattery")}:</span> {formData.batteryKwh} kWh
                            </div>
                          )}
                          {formData.estimatedPriceEur && (
                            <div className="md:col-span-2">
                              <span className="font-medium text-foreground">{t("contactPage.summaryEstimate")}:</span>{" "}
                              {formData.estimatedPriceEur} EUR <span className="text-xs">({t("contactPage.summaryApprox")})</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">{t("contactPage.form.powerLabel")}</label>
                        <input
                          type="number"
                          name="kw"
                          value={formData.kw}
                          onChange={handleChange}
                          className="input-premium"
                          placeholder={t("contactPage.placeholders.power")}
                          min={1}
                          step={1}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">{t("contactPage.form.mountLabel")}</label>
                        <select
                          name="mounting"
                          value={formData.mounting}
                          onChange={handleChange}
                          className="input-premium"
                        >
                          <option value="">{t("common.choose")}</option>
                          <option value="acoperiș">{t("contactPage.form.mountRoof")}</option>
                          <option value="carcasă (la sol)">{t("contactPage.form.mountGround")}</option>
                        </select>
                        <p className="mt-2 text-xs text-muted-foreground">
                          {t("contactPage.mountHint")}
                        </p>
                      </div>
                    </div>

                    {(formData.systemType === "hybrid" || formData.systemType === "off-grid") && (
                      <div>
                        <label className="block text-sm font-medium mb-2">{t("contactPage.form.batteryLabel")}</label>
                        <select
                          name="batteryKwh"
                          value={formData.batteryKwh}
                          onChange={handleChange}
                          className="input-premium"
                        >
                          <option value="">{t("contactPage.form.batteryPlaceholder")}</option>
                          <option value="5">5</option>
                          <option value="11.7">11.7</option>
                          <option value="16">16</option>
                          <option value="23.5">23.5</option>
                          <option value="">{t("contactPage.form.batteryOther")}</option>
                        </select>
                        <p className="mt-2 text-xs text-muted-foreground">
                          {t("contactPage.batteryHint")}
                        </p>
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {t("contactPage.message")}
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        className="input-premium resize-none"
                        placeholder={t("contactPage.placeholders.message")}
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
                          {t("contactPage.submitting")}
                        </>
                      ) : (
                        <>
                          {t("contactPage.submit")}
                          <Send className="w-5 h-5" />
                        </>
                      )}
                    </button>

                    <p className="text-sm text-muted-foreground text-center">
                      {t("contactPage.privacy")}
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
              {t("contactPage.mapTitle")}
            </h2>
            <p className="text-muted-foreground">
              {t("contactPage.mapSubtitle")}
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
