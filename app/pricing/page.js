"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, Star, Zap, Crown, FileText, Award, MessageSquare, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/button";
import { AnimationWrapper } from "@/components/animation-wrapper";

export default function Pricing() {
  const router = useRouter();
  const [selectedAddons, setSelectedAddons] = useState([]);

  const toggleAddon = (addonName) => {
    setSelectedAddons(prev => 
      prev.includes(addonName) 
        ? prev.filter(a => a !== addonName) 
        : [...prev, addonName]
    );
  };

  const handleProceed = () => {
    const params = new URLSearchParams();
    if (selectedAddons.length > 0) {
        params.set("addons", selectedAddons.join(","));
    }
    router.push(`/contact?${params.toString()}`);
  };

  const plans = [
    {
      name: "Starter Package",
      badge: "Digital Foundation",
      icon: <Star className="w-6 h-6 text-orange-500" />,
      price: "$1,200 – $1,500",
      period: "One-time",
      desc: "Best for: Establishing a strong B2B presence & fixing current gaps.",
      duration: "4–5 weeks",
      features: [
        "WordPress website rebuild (B2B focused)",
        "Clear value proposition & messaging",
        "Website structure optimization",
        "Product & service page restructuring",
        "Custom Request for Quote (RFQ) forms",
        "WhatsApp & contact integration",
        "Mobile & performance optimization",
        "Basic on-page SEO setup",
        "Google Analytics & Search Console"
      ],
      outcome: ["Professional B2B website", "Clear buyer journey", "Lead-ready platform"],
      cta: "Get Started",
      popular: false
    },
    {
      name: "Growth Package",
      badge: "SEO & Lead Generation",
      icon: <Zap className="w-6 h-6 text-blue-500" />,
      price: "$900",
      period: "/ month",
      desc: "Best for: Attracting global buyers through organic search.",
      duration: "2–3 months",
      features: [
        "Everything in Starter",
        "Advanced keyword research",
        "On-page SEO for all core pages",
        "Creation of 6–8 SEO landing pages",
        "Blog setup + 4 SEO articles per month",
        "Technical SEO improvements",
        "Internal linking & content clusters",
        "Conversion optimization for RFQ forms",
        "Monthly performance reports"
      ],
      outcome: ["Increased organic traffic", "Higher-quality inbound leads", "Improved Google rankings"],
      cta: "Start Growing",
      popular: true
    },
    {
      name: "Authority Package",
      badge: "Full Digital Partnership",
      icon: <Crown className="w-6 h-6 text-purple-500" />,
      price: "$1,400",
      period: "/ month",
      desc: "Best for: Long-term market leadership & consistent leads.",
      duration: "Min 6 months",
      features: [
        "Everything in Growth",
        "Ongoing SEO & content expansion",
        "8–10 SEO articles / landing pages monthly",
        "LinkedIn B2B content strategy",
        "Instagram branding & visual content",
        "Monthly content calendar",
        "Lead funnel optimization",
        "Trust & credibility enhancements",
        "Conversion tracking & optimization",
        "Dedicated growth & strategy support"
      ],
      outcome: ["Industry authority positioning", "Continuous lead flow", "Strong global brand credibility"],
      cta: "Partner With Us",
      popular: false
    }
  ];

  const addons = [
        { name: "Product catalog design (PDF)", price: "$200", icon: <FileText className="w-6 h-6" /> },
        { name: "Certification landing pages", price: "$150 / page", icon: <Award className="w-6 h-6" /> },
        { name: "WhatsApp automation & CRM setup", price: "$250", icon: <MessageSquare className="w-6 h-6" /> },
        { name: "Shopify catalog integration", price: "Custom Quote", icon: <ShoppingBag className="w-6 h-6" /> }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <AnimationWrapper>
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">Pricing & Engagement</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Flexible engagement tiers designed to match your current needs and future growth goals.
          </p>
        </div>
      </AnimationWrapper>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, i) => (
          <AnimationWrapper key={i} delay={i * 0.1} className={`relative flex flex-col bg-card border ${plan.popular ? 'border-blue-500 border-2 shadow-2xl shadow-blue-500/10' : 'border-border'} rounded-2xl p-8 hover:shadow-xl transition-shadow card-gradient-hover`}>
            {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
                    Most Popular
                </div>
            )}
            
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-secondary rounded-lg">{plan.icon}</div>
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{plan.badge}</span>
            </div>

            <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
            <div className="mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground">{plan.period}</span>
            </div>
            
            <p className="text-sm text-muted-foreground mb-4 font-medium italic">{plan.desc}</p>
            <p className="text-sm text-muted-foreground mb-8">Duration: <span className="text-foreground font-bold">{plan.duration}</span></p>

            <ul className="space-y-4 mb-8 flex-grow">
                {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm">
                        <Check className="w-5 h-5 text-green-500 shrink-0" />
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>

             <div className="bg-secondary/50 rounded-lg p-4 mb-8">
                <p className="text-xs font-bold uppercase text-muted-foreground mb-2">Outcome</p>
                <div className="space-y-1">
                    {plan.outcome.map((out, idx) => (
                         <div key={idx} className="flex items-center gap-2 text-sm font-medium">
                            <span className="text-blue-500">✔</span> {out}
                         </div>
                    ))}
                </div>
            </div>

            <Link href={`/contact?plan=${encodeURIComponent(plan.name)}`} className="w-full">
                <Button as="span" variant={plan.popular ? "primary" : "outline"} className="w-full py-6 text-lg">
                    {plan.cta}
                </Button>
            </Link>
          </AnimationWrapper>
        ))}
      </div>

       <div className="mt-20 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-8 text-center">Optional Add-Ons</h3>
            <p className="text-center text-muted-foreground mb-8">Select multiple add-ons to enhance your package.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {addons.map((addon, i) => {
                    const isSelected = selectedAddons.includes(addon.name);
                    return (
                        <div 
                            key={i} 
                            onClick={() => toggleAddon(addon.name)}
                            className={`flex items-center gap-4 p-6 bg-card border rounded-xl cursor-pointer transition-all hover:shadow-lg card-gradient-hover ${isSelected ? 'border-blue-500 bg-blue-500/5 ring-1 ring-blue-500' : 'border-border'}`}
                        >
                            <div className={`p-3 rounded-full ${isSelected ? 'bg-blue-500 text-white' : 'bg-secondary text-muted-foreground'}`}>
                                {addon.icon}
                            </div>
                            <div className="flex-grow">
                                <h4 className="font-bold text-lg">{addon.name}</h4>
                                <p className="text-blue-500 font-medium">{addon.price}</p>
                            </div>
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-blue-500 bg-blue-500' : 'border-muted-foreground'}`}>
                                {isSelected && <Check className="w-4 h-4 text-white" />}
                            </div>
                        </div>
                    );
                })}
            </div>

            {selectedAddons.length > 0 && (
                <div className="flex justify-center animate-in fade-in slide-in-from-bottom-4">
                    <Button onClick={handleProceed} variant="primary" className="px-8 py-4 text-lg">
                        Proceed with Selected Add-Ons ({selectedAddons.length}) <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                </div>
            )}
       </div>
    </div>
  );
}
