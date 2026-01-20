"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/button";
import { Mail, Phone, MapPin, CheckCircle, X, Star, Loader2, AlertCircle } from "lucide-react";
import { Suspense, useState } from "react";

function ContactForm() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const plan = searchParams.get("plan");
    const addonsParam = searchParams.get("addons");
    const addons = addonsParam ? addonsParam.split(",") : [];

    const [status, setStatus] = useState("idle"); // idle, submitting, success, error
    const [errorMessage, setErrorMessage] = useState("");

    const clearPlan = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete("plan");
        router.replace(`/contact?${params.toString()}`, { scroll: false });
    };

    const removeAddon = (addonToRemove) => {
        const newAddons = addons.filter(a => a !== addonToRemove);
        const params = new URLSearchParams(searchParams.toString());
        if (newAddons.length > 0) {
            params.set("addons", newAddons.join(","));
        } else {
            params.delete("addons");
        }
        router.replace(`/contact?${params.toString()}`, { scroll: false });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("submitting");
        setErrorMessage("");

        const formData = new FormData(e.target);
        const entries = Object.fromEntries(formData.entries());

        try {
            const response = await fetch("https://formsubmit.co/ajax/theclickcreateco@gmail.com", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    ...entries,
                    _subject: `New Contact Form Submission - ${entries.name}`
                })
            });

            if (response.ok) {
                setStatus("success");
                e.target.reset();
            } else {
                const data = await response.json();
                setStatus("error");
                setErrorMessage(data.error || "Something went wrong. Please try again later.");
            }
        } catch (error) {
            setStatus("error");
            setErrorMessage("Network error. Please check your connection.");
        }
    };

    const defaultMessage = `I'm interested in ${plan ? `the ${plan}` : 'working with you'}.${addons.length > 0 ? ` Also interested in: ${addons.join(", ")}.` : ''}`;

    return (
        <div className="p-8 md:p-12 bg-secondary/20">
            <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
            
            {/* Plan Selection Alert */}
            {plan && (
                <div className="mb-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-start justify-between gap-3 animate-in fade-in slide-in-from-top-2">
                    <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
                        <div>
                            <p className="text-sm font-medium text-blue-500">Selected Plan: <span className="font-bold">{plan}</span></p>
                        </div>
                    </div>
                    <button onClick={clearPlan} className="text-muted-foreground hover:text-red-500 transition-colors" title="Remove plan">
                        <X className="w-4 h-4" />
                    </button>
                </div>
            )}

            {/* Add-ons Selection Alert */}
            {addons.length > 0 && (
                <div className="mb-6 p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg animate-in fade-in slide-in-from-top-2">
                    <div className="flex items-center gap-2 mb-2">
                         <Star className="w-4 h-4 text-purple-500" />
                         <span className="text-sm font-bold text-purple-500">Selected Add-Ons:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {addons.map((addon, i) => (
                            <div key={i} className="flex items-center gap-1 bg-background px-3 py-1 rounded-full text-xs font-medium border border-purple-200">
                                {addon}
                                <button onClick={() => removeAddon(addon)} className="hover:text-red-500 ml-1">
                                    <X className="w-3 h-3" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {status === "success" && (
                <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <p className="text-sm font-medium text-green-500">Message sent successfully! We'll get back to you soon.</p>
                </div>
            )}

            {status === "error" && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                    <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                    <p className="text-sm font-medium text-red-500">{errorMessage}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6" key={`${plan || 'default'}-${addons.length}`}>
                <input type="hidden" name="plan" value={plan || ""} />
                <input type="hidden" name="addons" value={addons.join(", ")} />
                <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">Your Name</label>
                    <input type="text" id="name" name="name" className="w-full p-3 rounded-md border border-input bg-background focus:ring-2 focus:ring-blue-500 outline-none" placeholder="John Doe" required />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">Your Email</label>
                    <input type="email" id="email" name="email" className="w-full p-3 rounded-md border border-input bg-background focus:ring-2 focus:ring-blue-500 outline-none" placeholder="john@company.com" required />
                </div>
                <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">Your Message</label>
                    <textarea 
                        id="message" 
                        name="message" 
                        rows={5} 
                        className="w-full p-3 rounded-md border border-input bg-background focus:ring-2 focus:ring-blue-500 outline-none" 
                        placeholder={defaultMessage}
                        defaultValue={defaultMessage}
                    ></textarea>
                </div>
                <Button 
                    className="w-full" 
                    type="submit" 
                    disabled={status === "submitting"}
                >
                    {status === "submitting" ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Sending...
                        </>
                    ) : (
                        "Send Message"
                    )}
                </Button>
            </form>
        </div>
    );
}

export default function Contact() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">Contact Us</h1>
        <p className="text-lg text-muted-foreground">
           Have a question or want to work together? Fill out the form or reach us on social media.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
        <Suspense fallback={<div className="p-12 text-center">Loading form...</div>}>
            <ContactForm />
        </Suspense>

        <div className="p-8 md:p-12 flex flex-col justify-between relative bg-blue-500/5">

             <div>
                <h3 className="text-xl font-bold mb-6">Contact Info</h3>
                <div className="space-y-6">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-background rounded-full border border-border text-blue-500">
                             <Mail className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="font-medium">Email Us</p>
                            <p className="text-muted-foreground">theclickcreateco@gmail.com</p>
                        </div>
                    </div>
                     <div className="flex items-start gap-4">
                        <div className="p-3 bg-background rounded-full border border-border text-green-500">
                             <Phone className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="font-medium">Call Us</p>
                            <p className="text-muted-foreground">+92 317 2149342</p>
                        </div>
                    </div>
                     <div className="flex items-start gap-4">
                        <div className="p-3 bg-background rounded-full border border-border text-purple-500">
                             <MapPin className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="font-medium">Visit Us</p>
                            <p className="text-muted-foreground">Shop G13, Regal Trade Square, Saddar, Karachi</p>
                        </div>
                    </div>
                </div>
             </div>
             
             <div className="mt-12 h-48 bg-secondary/50 rounded-lg overflow-hidden border border-border">
                 <iframe 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    loading="lazy" 
                    allowFullScreen 
                    src="https://www.google.com/maps?q=Shop+G13,+Regal+Trade+Square,+Saddar,+Karachi&output=embed">
                 </iframe>
             </div>
        </div>
      </div>
    </div>
  );
}
