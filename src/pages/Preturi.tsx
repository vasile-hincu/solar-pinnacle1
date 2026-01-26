import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { absoluteUrl } from "@/lib/seo";
import { useTranslation } from "react-i18next";
import heroSolar from "@/assets/hero-solar.jpg";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowRight,
  Battery,
  CheckCircle2,
  Gift,
  Grid3X3,
  Shield,
  Sparkles,
  Zap,
} from "lucide-react";

const formatEUR = (value: number, locale: string) =>
  new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(Math.round(value));

type SystemType = "hybrid" | "on-grid" | "off-grid";
type MountingType = "acoperis" | "carcasa";

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const pricingModel = {
  // NOTE: valori în EUR. On-Grid este calculat dintr-un preț de referință (10kW pe acoperiș = 8500€).
  onGrid: {
    minKw: 3,
    maxKw: 30,
  },
} as const;

const GROUND_MOUNT_SURCHARGE_EUR = 1000;

const PANEL_WATTS = 640;
const PANEL_KW = PANEL_WATTS / 1000;

const getPanelsForKw = (kw: number) => {
  // Regula: rotunjim în sus la panou întreg, ca să atingem cel puțin cât a cerut clientul.
  // Astfel, diferența față de cerere nu depășește puterea unui singur panou.
  return Math.max(1, Math.ceil(kw / PANEL_KW));
};

const ONGRID_REFERENCE_KW = 10;
const ONGRID_REFERENCE_PRICE_EUR = 8500;
const ONGRID_REFERENCE_PANELS = getPanelsForKw(ONGRID_REFERENCE_KW); // 10kW => 16 panouri
const ONGRID_PANEL_PRICE_EUR = ONGRID_REFERENCE_PRICE_EUR / ONGRID_REFERENCE_PANELS;

const roundToNearest10 = (value: number) => Math.round(value / 10) * 10;

const getOnGridPriceEur = (kw: number) => {
  const panels = getPanelsForKw(kw);
  return roundToNearest10(panels * ONGRID_PANEL_PRICE_EUR);
};

const batteryPriceEur: Record<string, number> = {
  // Felicity (orientativ) – ajustabil
  "5": 1500,
  "10.5": 3000,
  "16": 3500,
  "23.5": 4300,
};

const getHybridBaseEur = (kw: number) => {
  // Calibrat după exemplele tale:
  // 6kW + 5kWh = 6000€  => baza(6)=4500€
  // 10kW + 10.5kWh = 11500€ => baza(10)=8500€
  return 1000 * kw - 1500;
};

const OFFGRID_PREMIUM_EUR = 0;

const hybridFixedPrices: Array<{ kw: number; batteryKwh: number; priceEur: number }> = [
  { kw: 6, batteryKwh: 5, priceEur: 6000 },
  { kw: 10, batteryKwh: 10.5, priceEur: 11500 },
  { kw: 10, batteryKwh: 16, priceEur: 12000 },
];

const Preturi = () => {
  const { t, i18n } = useTranslation();

  const numberLocale = i18n.language?.startsWith("ru") ? "ru-RU" : "ro-RO";

  const getTierLabel = (k: number) => (k < 20 ? t("pricing.tierResidential") : t("pricing.tierBusiness"));

  const [system, setSystem] = useState<SystemType>("hybrid");
  const [kw, setKw] = useState<number>(8);
  const [mounting, setMounting] = useState<MountingType>("acoperis");
  const [batteryKwh, setBatteryKwh] = useState<string>("10.5");

  const kwLimits = useMemo(() => {
    if (system === "on-grid") return { min: pricingModel.onGrid.minKw, max: pricingModel.onGrid.maxKw };
    if (system === "off-grid") return { min: 2, max: 20 };
    return { min: 3, max: 20 };
  }, [system]);

  const safeKw = clamp(kw, kwLimits.min, kwLimits.max);

  const panels = useMemo(() => getPanelsForKw(safeKw), [safeKw]);
  const realKwp = useMemo(() => panels * PANEL_KW, [panels]);

  const onGridBasePrice = useMemo(() => getOnGridPriceEur(safeKw), [safeKw]);
  const tier = getTierLabel(safeKw);

  const showGift380 = safeKw >= 10;

  const systemCopy = useMemo(() => {
    const onGridBullets = t("pricing.systems.onGrid.bullets", { returnObjects: true }) as unknown;
    const hybridBullets = t("pricing.systems.hybrid.bullets", { returnObjects: true }) as unknown;
    const offGridBullets = t("pricing.systems.offGrid.bullets", { returnObjects: true }) as unknown;

    return {
      "on-grid": {
        title: t("pricing.systems.onGrid.title"),
        badge: t("pricing.systems.onGrid.badge"),
        icon: Grid3X3,
        accent: "primary",
        description: t("pricing.systems.onGrid.description"),
        bullets: Array.isArray(onGridBullets) ? (onGridBullets as string[]) : [],
        note: t("pricing.systems.onGrid.note"),
      },
      hybrid: {
        title: t("pricing.systems.hybrid.title"),
        badge: t("pricing.systems.hybrid.badge"),
        icon: Zap,
        accent: "energy",
        description: t("pricing.systems.hybrid.description"),
        bullets: Array.isArray(hybridBullets) ? (hybridBullets as string[]) : [],
        note: t("pricing.systems.hybrid.note"),
      },
      "off-grid": {
        title: t("pricing.systems.offGrid.title"),
        badge: t("pricing.systems.offGrid.badge"),
        icon: Battery,
        accent: "accent",
        description: t("pricing.systems.offGrid.description"),
        bullets: Array.isArray(offGridBullets) ? (offGridBullets as string[]) : [],
        note: t("pricing.systems.offGrid.note"),
      },
    } as const;
  }, [t]);

  const active = systemCopy[system];
  const ActiveIcon = active.icon;

  return (
    <Layout>
      <Helmet>
        <title>{t("pricing.seo.title")}</title>
        <meta
          name="description"
          content={t("pricing.seo.description")}
        />
        <link rel="canonical" href={absoluteUrl("/preturi")} />
        <meta property="og:title" content={t("pricing.seo.ogTitle")} />
        <meta
          property="og:description"
          content={t("pricing.seo.ogDescription")}
        />
      </Helmet>

      {/* Hero */}
      <section className="hero-bg relative overflow-hidden pt-16 pb-20">
        <div className="absolute inset-0 -z-10">
          <img
            src={heroSolar}
            alt=""
            aria-hidden="true"
            loading="eager"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-background/75" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/70 to-background" />
        </div>
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <span className="premium-badge mb-6 inline-flex bg-white/55 border-white/70 shadow-[0_8px_22px_rgba(15,23,42,0.08)] backdrop-blur-none">
              <Sparkles className="w-4 h-4" />
              {t("pricing.badge")}
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight text-foreground">
              {t("pricing.title")}
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl">
              {t("pricing.subtitle")}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="btn-premium-primary inline-flex items-center justify-center gap-2">
                {t("pricing.cta24h")} <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/sisteme" className="btn-premium-outline inline-flex items-center justify-center gap-2">
                {t("pricing.ctaCompare")}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Configurator */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <SectionTitle
            badge={t("pricing.configBadge")}
            title={
              <>
                {t("pricing.configTitle")}
              </>
            }
            description={t("pricing.configDesc")}
            align="left"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7">
              <Tabs
                value={system}
                onValueChange={(v) => {
                  const next = v as SystemType;
                  setSystem(next);

                  // menținem kW în limitele sistemului selectat
                  if (next === "on-grid") setKw((prev) => clamp(prev, pricingModel.onGrid.minKw, pricingModel.onGrid.maxKw));
                  if (next === "hybrid") {
                    setKw((prev) => clamp(prev, 3, 20));
                    setBatteryKwh((prev) => prev || "10.5");
                  }
                  if (next === "off-grid") {
                    setKw((prev) => clamp(prev, 2, 20));
                    setBatteryKwh((prev) => prev || "16");
                  }
                }}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="on-grid" className="gap-2">
                    <Grid3X3 className="w-4 h-4" />
                    {t("pricing.onGrid")}
                  </TabsTrigger>
                  <TabsTrigger value="hybrid" className="gap-2">
                    <Zap className="w-4 h-4" />
                    {t("pricing.hybrid")}
                    <Badge className="ml-2 bg-primary/10 text-primary border border-primary/20">{t("pricing.hybridPopular")}</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="off-grid" className="gap-2">
                    <Battery className="w-4 h-4" />
                    {t("pricing.offGrid")}
                  </TabsTrigger>
                </TabsList>

                <div className="mt-6">
                  <div className="floating-card">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 rounded-2xl bg-secondary flex items-center justify-center">
                            <ActiveIcon className="w-5 h-5 text-foreground" />
                          </div>
                          <div>
                            <h3 className="font-display text-2xl font-bold">{active.title}</h3>
                            <p className="text-sm text-muted-foreground">{active.badge}</p>
                          </div>
                        </div>
                        <p className="mt-4 text-muted-foreground leading-relaxed">{active.description}</p>
                      </div>
                    </div>

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">{t("pricing.systemPower")}</p>
                          <Badge variant="secondary" className="rounded-full">{safeKw} kW</Badge>
                        </div>
                        <div className="mt-4">
                          <Slider
                            value={[safeKw]}
                            min={kwLimits.min}
                            max={kwLimits.max}
                            step={1}
                            onValueChange={(v) => setKw(v[0] ?? safeKw)}
                          />
                          <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                            <span>{kwLimits.min} kW</span>
                            <span>{kwLimits.max} kW</span>
                          </div>
                        </div>

                        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-medium mb-3">{t("pricing.mounting")}</p>
                            <RadioGroup
                              value={mounting}
                              onValueChange={(v) => setMounting(v as MountingType)}
                              className="grid gap-2"
                            >
                              <div className="flex items-center space-x-3 rounded-2xl border border-border/60 bg-secondary/30 px-4 py-3">
                                <RadioGroupItem value="acoperis" id="mount-acoperis" />
                                <Label htmlFor="mount-acoperis" className="cursor-pointer">
                                  {t("pricing.mountRoof")}
                                </Label>
                              </div>
                              <div className="flex items-center space-x-3 rounded-2xl border border-border/60 bg-secondary/30 px-4 py-3">
                                <RadioGroupItem value="carcasa" id="mount-carcasa" />
                                <Label htmlFor="mount-carcasa" className="cursor-pointer">
                                  {t("pricing.mountGround")} • +{formatEUR(GROUND_MOUNT_SURCHARGE_EUR, numberLocale)}
                                </Label>
                              </div>
                            </RadioGroup>
                          </div>

                          <div>
                            <p className="text-sm font-medium mb-3">{t("pricing.battery")}</p>
                            <Select
                              value={batteryKwh}
                              onValueChange={setBatteryKwh}
                              disabled={system === "on-grid"}
                            >
                              <SelectTrigger className="w-full rounded-xl bg-secondary/30 border-border/60">
                                <SelectValue placeholder={system === "on-grid" ? t("pricing.batteryNone") : t("common.choose")} />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="5">5 kWh</SelectItem>
                                <SelectItem value="10.5">10.5 kWh</SelectItem>
                                <SelectItem value="16">16 kWh</SelectItem>
                                <SelectItem value="23.5">23.5 kWh</SelectItem>
                              </SelectContent>
                            </Select>
                            <p className="mt-2 text-xs text-muted-foreground">
                              {system === "on-grid" ? t("pricing.batteryNoteOnGrid") : t("pricing.batteryNoteHybrid")}
                            </p>
                          </div>
                        </div>

                        {mounting === "carcasa" && (
                          <p className="mt-3 text-xs text-muted-foreground">
                            {t("pricing.mountGroundHint")}
                          </p>
                        )}
                      </div>

                      <div className="rounded-2xl bg-secondary/40 border border-border/60 p-5">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">{t("pricing.estimate")}</p>
                          <Badge className="rounded-full bg-accent/10 text-accent border border-accent/20">{tier}</Badge>
                        </div>
                        {(() => {
                          const mountExtra = mounting === "carcasa" ? GROUND_MOUNT_SURCHARGE_EUR : 0;

                          if (system === "on-grid") {
                            return (
                              <div className="mt-3">
                                <p className="font-display text-2xl md:text-3xl font-bold">
                                  {formatEUR(onGridBasePrice + mountExtra, numberLocale)}
                                </p>
                                {showGift380 && (
                                  <div className="mt-3 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3">
                                    <div className="flex items-center gap-2 text-sm font-medium">
                                      <Gift className="h-4 w-4" />
                                      {t("pricing.bonusTitle")}
                                    </div>
                                    <p className="mt-1 text-xs text-muted-foreground">
                                      {t("pricing.bonusDesc")}
                                    </p>
                                  </div>
                                )}
                                <p className="mt-2 text-xs text-muted-foreground">
                                  {t("pricing.panelsLine", {
                                    panels,
                                    kwp: realKwp.toFixed(2),
                                  })}
                                </p>
                                <p className="mt-2 text-xs text-muted-foreground">
                                  {t("pricing.reference", {
                                    price: formatEUR(ONGRID_REFERENCE_PRICE_EUR, numberLocale),
                                  })}
                                </p>
                              </div>
                            );
                          }

                          const battCost = batteryPriceEur[batteryKwh] ?? 0;
                          const base = getHybridBaseEur(safeKw);
                          const systemExtra = system === "off-grid" ? OFFGRID_PREMIUM_EUR : 0;
                          const total = base + battCost + systemExtra + mountExtra;

                          return (
                            <div className="mt-3">
                              <p className="font-display text-2xl md:text-3xl font-bold">{formatEUR(total, numberLocale)}</p>
                              {showGift380 && safeKw >= 10 && (
                                <div className="mt-3 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3">
                                  <div className="flex items-center gap-2 text-sm font-medium">
                                    <Gift className="h-4 w-4" />
                                    {t("pricing.bonusTitle")}
                                  </div>
                                  <p className="mt-1 text-xs text-muted-foreground">
                                    {t("pricing.bonusDesc")}
                                  </p>
                                </div>
                              )}
                              <div className="mt-2 space-y-1 text-xs text-muted-foreground">
                                <p>
                                  {t("pricing.panelsLine", {
                                    panels,
                                    kwp: realKwp.toFixed(2),
                                  })}
                                </p>
                                <p>
                                  {t("pricing.batteryLine", { battery: batteryKwh })}
                                </p>
                                {system === "off-grid" && (
                                  <p>{t("pricing.offGridHint")}</p>
                                )}
                                {mountExtra > 0 && (
                                  <p>
                                    {t("pricing.mountGroundLine", {
                                      extra: formatEUR(GROUND_MOUNT_SURCHARGE_EUR, numberLocale),
                                    })}
                                  </p>
                                )}
                              </div>
                            </div>
                          );
                        })()}
                        <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{active.note}</p>
                      </div>
                    </div>

                    <div className="mt-8 flex flex-col sm:flex-row gap-3">
                      {(() => {
                        const mountExtra = mounting === "carcasa" ? GROUND_MOUNT_SURCHARGE_EUR : 0;
                        const battCost = batteryPriceEur[batteryKwh] ?? 0;

                        const priceParam = (() => {
                          if (system === "on-grid") return String(Math.round(onGridBasePrice + mountExtra));
                          const base = getHybridBaseEur(safeKw);
                          const systemExtra = system === "off-grid" ? OFFGRID_PREMIUM_EUR : 0;
                          return String(Math.round(base + battCost + systemExtra + mountExtra));
                        })();

                        const query = new URLSearchParams({
                          systemType: system,
                          kw: String(safeKw),
                          mount: mounting === "carcasa" ? "carcasa" : "acoperis",
                        });
                        if (system !== "on-grid") query.set("battery_kwh", String(batteryKwh));
                        if (priceParam) query.set("price", priceParam);
                        query.set("panels", String(panels));
                        query.set("real_kwp", realKwp.toFixed(2));

                        return (
                          <Link
                            to={`/contact?${query.toString()}`}
                            className="btn-premium-primary inline-flex items-center justify-center gap-2"
                          >
                            {t("pricing.ctaExact")} <ArrowRight className="w-4 h-4" />
                          </Link>
                        );
                      })()}
                      <Link
                        to="/contact"
                        className="btn-premium-outline inline-flex items-center justify-center"
                      >
                        {t("pricing.ctaContact")}
                      </Link>
                    </div>
                  </div>
                </div>

                <TabsContent value="on-grid" />
                <TabsContent value="hybrid" />
                <TabsContent value="off-grid" />
              </Tabs>
            </div>

            <div className="lg:col-span-5">
              <Card className="border-border/60">
                <CardHeader>
                  <CardTitle className="font-display text-2xl">{t("pricing.includesTitle")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    ...active.bullets,
                    t("pricing.includesItems.consulting"),
                    t("pricing.includesItems.design"),
                    t("pricing.includesItems.fullSystem"),
                    system === "on-grid"
                      ? t("pricing.includesItems.gridIntegration")
                      : t("pricing.includesItems.batteries"),
                    t("pricing.includesItems.structure"),
                    t("pricing.includesItems.install"),
                    t("pricing.includesItems.commissioning"),
                  ].filter(Boolean).map(
                    (item) => (
                      <div key={item} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                        <p className="text-sm text-muted-foreground leading-relaxed">{item}</p>
                      </div>
                    ),
                  )}

                  {system === "hybrid" && (
                    <div className="pt-4">
                      <div className="rounded-2xl bg-accent/10 border border-accent/20 p-4">
                        <div className="flex items-center gap-2 font-medium">
                          <Battery className="w-4 h-4 text-accent" />
                          {t("pricing.felicityBoxTitle")}
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {t("pricing.felicityBoxDesc")}
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="mt-8">
                <Card className="border-border/60">
                  <CardHeader>
                    <CardTitle className="font-display text-2xl">{t("pricing.whyEstimatesTitle")}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm text-muted-foreground">
                    <p>{t("pricing.whyEstimatesP1")}</p>
                    <p>{t("pricing.whyEstimatesP2")}</p>
                    <div className="pt-3">
                      <Link to="/contact" className="inline-flex items-center gap-2 text-primary font-medium">
                        {t("pricing.talkToExpert")} <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-alt py-20">
        <div className="container mx-auto px-6">
          <SectionTitle
            badge={t("pricing.faq.badge")}
            title={<>{t("pricing.faq.title")}</>}
            description={t("pricing.faq.description")}
          />

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible>
              {(() => {
                const items = t("pricing.faq.items", { returnObjects: true }) as unknown;
                const list = Array.isArray(items)
                  ? (items as Array<{ q: string; a: string }>)
                  : [];

                return list.map((item, idx) => (
                  <AccordionItem key={idx} value={`item-${idx + 1}`}>
                    <AccordionTrigger>{item.q}</AccordionTrigger>
                    <AccordionContent>{item.a}</AccordionContent>
                  </AccordionItem>
                ));
              })()}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="floating-card">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <div className="max-w-2xl">
                <h3 className="font-display text-3xl md:text-4xl font-bold">
                  {t("pricing.finalCtaTitle", { kw: safeKw })}
                </h3>
                <p className="mt-3 text-muted-foreground">
                  {t("pricing.finalCtaDesc")}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                <Link to="/contact" className="btn-premium-primary inline-flex items-center justify-center gap-2">
                  {t("pricing.finalCtaButton")} <ArrowRight className="w-4 h-4" />
                </Link>
                <Button asChild variant="outline" className="rounded-full px-8 py-6">
                  <a href="tel:+37378901362" className="inline-flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    {t("common.callNow")}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Preturi;
