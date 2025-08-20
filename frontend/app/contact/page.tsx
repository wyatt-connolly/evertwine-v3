"use client";

import { useState, useEffect } from "react";
import { sendContactEmail } from "@/app/actions/send-contact-email";
import Footer from "@/components/layout/Footer";
import { ArrowRight, CheckCircle, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const subjectOptions = [
  {
    value: "general",
    label: "General Inquiry",
    instructions: "Please provide details about your question or comment.",
  },
  {
    value: "support",
    label: "Technical Support",
    instructions:
      "Please describe the issue you're experiencing, including your device type and any error messages.",
  },
  {
    value: "feedback",
    label: "App Feedback",
    instructions:
      "Share your thoughts, suggestions, or feature requests for improving Evertwine.",
  },
  {
    value: "business",
    label: "Business Inquiry",
    instructions:
      "Please describe your business proposal or partnership opportunity.",
  },
  {
    value: "delete-account",
    label: "Delete My Account/Data",
    instructions:
      "To delete your account, please provide: (1) Your registered email address, (2) Your account username, and (3) Reason for deletion. Note: This action is permanent and cannot be undone.",
  },
  {
    value: "privacy",
    label: "Privacy Concern",
    instructions:
      "Please describe your privacy concern or data-related question in detail.",
  },
  {
    value: "report",
    label: "Report User/Content",
    instructions:
      "Please provide: (1) Username or content to report, (2) Detailed description of the issue, and (3) Any relevant screenshots or evidence.",
  },
];

export default function ContactPage() {
  const [scrolled, setScrolled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const getSelectedSubjectData = () => {
    return subjectOptions.find((option) => option.value === selectedSubject);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    setError(null);

    try {
      const subjectValue = formData.get("subject") as string;
      const selectedOption = subjectOptions.find(
        (option) => option.value === subjectValue
      );
      const subjectLabel = selectedOption ? selectedOption.label : subjectValue;

      const result = await sendContactEmail({
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        subject: subjectLabel,
        message: formData.get("message") as string,
      });

      if (result.success) {
        setIsSuccess(true);
        setSelectedSubject("");
        // Reset form
        const form = document.getElementById("contact-form") as HTMLFormElement;
        if (form) form.reset();
      } else {
        setError(result.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again later.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  const formFieldVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
    focused: {
      scale: 1.02,
      boxShadow: "0 0 0 2px rgba(255, 255, 255, 0.3)",
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
  };

  const successVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const successItemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      {/* Header - using the legal navbar style */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-40 ${
          scrolled ? "bg-black/90 shadow-lg backdrop-blur-sm" : "bg-black"
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
      >
        <div className="container mx-auto px-6 py-4 md:px-8 md:py-8 h-[96px] md:h-[110px] flex items-center">
          <div className="flex items-center justify-between w-full">
            <motion.div
              className="flex items-center"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay: 0.2,
              }}
            >
              <Link href="/" className="flex items-center">
                <Image
                  src="/evertwine-logo.png"
                  alt="Evertwine logo"
                  width={32}
                  height={32}
                  className="w-8 h-8 md:w-10 md:h-10 mr-2 md:mr-3"
                />
                <span className="text-white text-2xl md:text-3xl font-bold tracking-tight">
                  Evertwine
                </span>
              </Link>
            </motion.div>
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay: 0.3,
              }}
            >
              <Link
                href="/"
                className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-sm font-medium border border-white/20 hover:scale-105 transform transition-transform"
              >
                Back to Home
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Contact Section */}
      <section className="pt-[110px] md:pt-[130px] pb-20 px-4 md:px-8">
        <motion.div
          className="container mx-auto max-w-3xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <motion.h1
              className="text-2xl md:text-3xl font-bold text-white mb-8 font-sora"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay: 0.4,
              }}
            >
              Contact Us
            </motion.h1>
            <motion.p
              className="text-white/70 max-w-2xl mx-auto font-dm-sans"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              Have questions, feedback or media inquiries? We&apos;d love to
              hear from you. Fill out the form below and our team will get back
              to you as soon as possible.
            </motion.p>
          </motion.div>

          <motion.div
            className="bg-blue-950/20 backdrop-blur-sm border border-blue-900/20 rounded-3xl p-8 md:p-10 transition-all duration-500 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-900/20"
            variants={itemVariants}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 15,
              delay: 0.7,
            }}
            whileHover={{ boxShadow: "0 0 30px rgba(255, 255, 255, 0.1)" }}
          >
            {isSuccess ? (
              <motion.div
                className="bg-green-500/10 border border-green-500/30 rounded-lg p-6 text-center"
                variants={successVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={successItemVariants}>
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                </motion.div>
                <motion.h3
                  className="text-xl font-semibold text-white mb-2"
                  variants={successItemVariants}
                >
                  Message Sent!
                </motion.h3>
                <motion.p
                  className="text-white/80 mb-4"
                  variants={successItemVariants}
                >
                  Thank you for reaching out. We&apos;ll get back to you as soon
                  as possible.
                </motion.p>
                <motion.div variants={successItemVariants}>
                  <Button
                    onClick={() => {
                      setIsSuccess(false);
                      setSelectedSubject("");
                    }}
                    className="bg-blue-900 hover:bg-blue-800 text-white px-6 py-2 rounded-full"
                    asChild
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Send another message
                    </motion.button>
                  </Button>
                </motion.div>
              </motion.div>
            ) : (
              <form
                id="contact-form"
                action={handleSubmit}
                className="space-y-6"
              >
                <motion.div
                  variants={formFieldVariants}
                  animate={focusedField === "name" ? "focused" : "visible"}
                  className="space-y-2"
                >
                  <Label
                    htmlFor="name"
                    className="block text-white font-medium font-dm-sans"
                  >
                    Name
                  </Label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="Your name"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-dm-sans transition-all duration-300 hover:bg-white/15"
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                  />
                </motion.div>
                <motion.div
                  variants={formFieldVariants}
                  animate={focusedField === "email" ? "focused" : "visible"}
                  className="space-y-2"
                >
                  <Label
                    htmlFor="email"
                    className="block text-white font-medium font-dm-sans"
                  >
                    Email
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-dm-sans transition-all duration-300 hover:bg-white/15"
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                  />
                </motion.div>
                <motion.div
                  variants={formFieldVariants}
                  animate={focusedField === "subject" ? "focused" : "visible"}
                  className="space-y-2"
                >
                  <Label
                    htmlFor="subject"
                    className="block text-white font-medium font-dm-sans"
                  >
                    Subject
                  </Label>
                  <Select
                    value={selectedSubject}
                    onValueChange={setSelectedSubject}
                    required
                  >
                    <SelectTrigger
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-dm-sans transition-all duration-300 hover:bg-white/15"
                      onFocus={() => setFocusedField("subject")}
                      onBlur={() => setFocusedField(null)}
                    >
                      <SelectValue
                        placeholder="Select a subject"
                        className="text-white placeholder:text-white/50"
                      />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-700">
                      {subjectOptions.map((option) => (
                        <SelectItem
                          key={option.value}
                          value={option.value}
                          className="text-white hover:bg-gray-800 focus:bg-gray-800 py-3"
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <input type="hidden" name="subject" value={selectedSubject} />
                  {selectedSubject && getSelectedSubjectData() && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg"
                    >
                      <p className="text-blue-200 font-dm-sans">
                        <strong>Instructions:</strong>{" "}
                        {getSelectedSubjectData()?.instructions}
                      </p>
                    </motion.div>
                  )}
                </motion.div>{" "}
                <motion.div
                  variants={formFieldVariants}
                  animate={focusedField === "message" ? "focused" : "visible"}
                  className="space-y-2"
                >
                  <Label
                    htmlFor="message"
                    className="block text-white font-medium font-dm-sans"
                  >
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    placeholder="Your message here..."
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-dm-sans resize-none transition-all duration-300 hover:bg-white/15"
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                  />
                </motion.div>
                {error && (
                  <motion.div
                    className="bg-red-500/10 border border-red-500/30 text-red-200 p-3 rounded-lg"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  >
                    {error}
                  </motion.div>
                )}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-500 hover:to-blue-300 text-white font-medium py-3 px-6 rounded-lg transition-all duration-500 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-600/30 font-dm-sans group"
                    asChild
                  >
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="animate-spin mr-2 h-5 w-5" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                        </>
                      )}
                    </motion.button>
                  </Button>
                </motion.div>
              </form>
            )}
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
