import { ReactNode } from "react";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";
import { WhatsAppButton } from "../ui/WhatsAppButton";
import { ScrollProgress } from "../ui/ScrollProgress";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollProgress />
      <Navigation />
      <main className="flex-1 pt-[72px]">{children}</main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};
