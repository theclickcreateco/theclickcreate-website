"use client";

import Image from "next/image";
import Link from "next/link";
import { Code, Palette, BarChart3, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/button";
import { AnimationWrapper } from "@/components/animation-wrapper";
import { AdPlaceholder } from "@/components/ad-placeholder";

export default function Services() {
  const services = [
    {
      title: "Web Development",
      icon: <Code className="w-8 h-8 text-blue-500" />,
      desc: "Custom, responsive, and performance-optimized websites built with modern technologies.",
      features: ["Next.js & React Apps", "E-commerce Solutions", "CMS Integration", "API Development"],
      img: "/images/service-web.png"
    },
    {
      title: "UI/UX Design",
      icon: <Palette className="w-8 h-8 text-purple-500" />,
      desc: "User-centric designs that look stunning and drive engagement.",
      features: ["User Research", "Wireframing & Prototyping", "Mobile App Design", "Design Systems"],
      img: "/images/service-ui.png"
    },
    {
      title: "Marketing & Strategy",
      icon: <BarChart3 className="w-8 h-8 text-green-500" />,
      desc: "Data-driven strategies to grow your audience and convert leads.",
      features: ["SEO Optimization", "Content Strategy", "Social Media Marketing", "Analytics & Reporting"],
      img: "/images/service-marketing.png"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <AnimationWrapper>
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">Our Services</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
             Comprehensive digital solutions tailored to your business needs. 
             We don't just build; we partner with you for growth.
          </p>
        </div>
      </AnimationWrapper>

      <div className="space-y-20">
        {services.map((service, index) => (
          <AnimationWrapper key={index} delay={index * 0.2}>
            <div className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 items-center`}>
              <div className="flex-1">
                 <div className="relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-lg border border-border">
                    <Image src={service.img} alt={service.title} fill className="object-cover" />
                 </div>
              </div>
              <div className="flex-1">
                 <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-secondary rounded-xl">
                        {service.icon}
                    </div>
                    <h2 className="text-3xl font-bold">{service.title}</h2>
                 </div>
                 <p className="text-lg text-muted-foreground mb-6">
                    {service.desc}
                 </p>
                 <ul className="space-y-3 mb-8">
                    {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-3">
                            <CheckCircle2 className="w-5 h-5 text-blue-500" />
                            <span>{feature}</span>
                        </li>
                    ))}
                 </ul>
                 <Link href="/pricing">
                    <Button as="span" variant="outline">View Plans <ArrowRight className="ml-2 w-4 h-4" /></Button>
                 </Link>
              </div>
            </div>
          </AnimationWrapper>
        ))}
      </div>

      <div className="mt-20">
          <AdPlaceholder slotId="services-bottom" />
      </div>
    </div>
  );
}
