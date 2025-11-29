"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Turnstile } from "@marsidev/react-turnstile";
import { toast } from "sonner";
import { Send, Loader2, Check } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { createContactSchema, type ContactFormData } from "@/lib/schemas/contact";

export function ContactForm() {
  const t = useTranslations("contact.form");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const schema = createContactSchema((key) => t(`error.${key}`));

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      organization: "",
      message: "",
      acceptedPolicies: false,
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    // Basic validation for Turnstile
    if (!turnstileToken) {
      toast.error(t("error.turnstileRequired"));
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          turnstileToken,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Submission failed");
      }

      setIsSuccess(true);
      toast.success(t("success"));
      reset();
      setTurnstileToken(null);
      
      // Reset success state after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Submission error:", error);
      toast.error(t("error.generic"));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="name" className="block mb-2 text-white">
          {t("name")} *
        </label>
        <Input
          type="text"
          id="name"
          {...register("name")}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
          className={`bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-accent h-12 ${
            errors.name ? "border-red-500 focus-visible:ring-red-500" : ""
          }`}
          placeholder={t("placeholder.name")}
        />
        {errors.name && (
          <p id="name-error" className="mt-1 text-sm text-red-400">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block mb-2 text-white">
          {t("email")} *
        </label>
        <Input
          type="email"
          id="email"
          {...register("email")}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={`bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-accent h-12 ${
            errors.email ? "border-red-500 focus-visible:ring-red-500" : ""
          }`}
          placeholder={t("placeholder.email")}
        />
        {errors.email && (
          <p id="email-error" className="mt-1 text-sm text-red-400">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="block mb-2 text-white">
          {t("phone")}
        </label>
        <Input
          type="tel"
          id="phone"
          {...register("phone")}
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? "phone-error" : undefined}
          className={`bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-accent h-12 ${
            errors.phone ? "border-red-500 focus-visible:ring-red-500" : ""
          }`}
          placeholder={t("placeholder.phone")}
        />
        {errors.phone && (
          <p id="phone-error" className="mt-1 text-sm text-red-400">
            {errors.phone.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="organization" className="block mb-2 text-white">
          {t("organization")}
        </label>
        <Input
          type="text"
          id="organization"
          {...register("organization")}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-accent h-12"
          placeholder={t("placeholder.organization")}
        />
      </div>

      <div>
        <label htmlFor="message" className="block mb-2 text-white">
          {t("message")} *
        </label>
        <textarea
          id="message"
          {...register("message")}
          rows={5}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={`flex min-h-[80px] w-full rounded-md border bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none ${
            errors.message
              ? "border-red-500 focus-visible:ring-red-500"
              : "border-white/20"
          }`}
          placeholder={t("placeholder.message")}
        />
        {errors.message && (
          <p id="message-error" className="mt-1 text-sm text-red-400">
            {errors.message.message}
          </p>
        )}
      </div>

      <div>
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="acceptedPolicies"
            {...register("acceptedPolicies")}
            className="mt-1 h-4 w-4 rounded border-white/30 bg-white/10 text-accent focus:ring-accent"
          />
          <label htmlFor="acceptedPolicies" className="text-white/80 text-sm">
            {t("policies")} *
          </label>
        </div>
        {errors.acceptedPolicies && (
          <p className="mt-1 text-sm text-red-400">
            {errors.acceptedPolicies.message}
          </p>
        )}
      </div>

      <div className="flex justify-center sm:justify-start">
        <Turnstile
          siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ""}
          onSuccess={(token) => setTurnstileToken(token)}
          options={{
            theme: "dark",
          }}
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting || isSuccess}
        variant="accent"
        size="lg"
        className={`w-full rounded-full transition-all duration-300 ${
          isSuccess ? "bg-green-600 hover:bg-green-700" : "hover:scale-105 hover:shadow-2xl"
        }`}
      >
        {isSubmitting ? (
          <>
            {t("sending")}
            <Loader2 className="ml-2 h-4 w-4 animate-spin" />
          </>
        ) : isSuccess ? (
          <>
            {t("success")}
            <Check size={20} className="ml-2" />
          </>
        ) : (
          <>
            {t("submit")}
            <Send size={20} className="ml-2" />
          </>
        )}
      </Button>
    </form>
  );
}
