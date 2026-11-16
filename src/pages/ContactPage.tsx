import React, { useState } from 'react';
import { CheckCircle2, Mail, MapPin, Send } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (trimmedName.length < 2) {
      setError('Please enter your full name.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (trimmedMessage.length < 10) {
      setError('Please provide a message of at least 10 characters.');
      return;
    }

    setError(null);
    setSubmitted(true);
  };

  return (
    <main className="mx-auto max-w-[1376px] bg-[#FFFFFF] px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Info Column */}
        <div className="lg:col-span-5">
          <p className="text-xs font-semibold tracking-wide text-[#1B5E20]">
            Contact &amp; Support
          </p>
          <h1
            className="font-display mt-2 font-bold text-[#1A1A1A] text-balance"
            style={{ fontSize: 'clamp(2.25rem, 3.8vw, 3.35rem)', lineHeight: 1.1 }}
          >
            Connect with the Fiqah Team
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-[#4A554C] sm:text-base">
            Have feedback on Quran typography, a Fiqh reference suggestion, or
            technical support questions ahead of our 1 December 2026 release?
            Reach out directly to our engineering and editorial team.
          </p>

          <div className="mt-8 space-y-4">
            <div className="rounded-[8px] border border-[#1B5E20]/20 bg-[#FFFFFF] p-5">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-[#1B5E20]" />
                <div>
                  <p className="text-xs font-semibold text-[#4A554C]">
                    Support Email
                  </p>
                  <a
                    href="mailto:support@fiqah.rustinnovations.com"
                    className="text-sm font-semibold text-[#1B5E20] hover:underline"
                  >
                    support@fiqah.rustinnovations.com
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-[8px] border border-[#1B5E20]/20 bg-[#FFFFFF] p-5">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-[#1B5E20]" />
                <div>
                  <p className="text-xs font-semibold text-[#4A554C]">
                    Engineering Division
                  </p>
                  <p className="text-sm font-semibold text-[#1A1A1A]">
                    Rust Innovations
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Validated Contact Form */}
        <div className="lg:col-span-7">
          <div className="rounded-[8px] border border-[#1B5E20]/20 bg-[#FFFFFF] p-6 sm:p-8">
            {submitted ? (
              <div className="py-10 text-center">
                <CheckCircle2 className="mx-auto h-12 w-12 text-[#1B5E20]" />
                <h2 className="font-display mt-4 text-3xl font-bold text-[#1A1A1A]">
                  Message Received
                </h2>
                <p className="mx-auto mt-2 max-w-md text-sm text-[#4A554C]">
                  Thank you, {name}. Your inquiry regarding{' '}
                  <span className="font-semibold text-[#1B5E20]">{topic}</span>{' '}
                  has been logged for review by the Rust Innovations IT
                  Department.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setName('');
                    setEmail('');
                    setMessage('');
                  }}
                  className="mt-6 rounded-[8px] border border-[#1B5E20] px-5 py-2.5 text-xs font-semibold text-[#1B5E20] transition-colors hover:bg-[#F7FAF7]"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <h2 className="font-display text-2xl font-bold text-[#1A1A1A]">
                  Send an Inquiry
                </h2>

                {error && (
                  <div
                    role="alert"
                    className="rounded-[8px] border border-red-300 bg-red-50 px-4 py-3 text-xs font-medium text-red-800"
                  >
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-semibold text-[#1A1A1A]"
                    >
                      Full Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g., Abdullah Rahman"
                      className="mt-1.5 w-full rounded-[8px] border border-[#1B5E20]/25 bg-[#FFFFFF] px-3.5 py-2.5 text-sm text-[#1A1A1A] placeholder:text-[#4A554C]/60"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-semibold text-[#1A1A1A]"
                    >
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="mt-1.5 w-full rounded-[8px] border border-[#1B5E20]/25 bg-[#FFFFFF] px-3.5 py-2.5 text-sm text-[#1A1A1A] placeholder:text-[#4A554C]/60"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-topic"
                    className="block text-xs font-semibold text-[#1A1A1A]"
                  >
                    Inquiry Topic
                  </label>
                  <select
                    id="contact-topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="mt-1.5 w-full rounded-[8px] border border-[#1B5E20]/25 bg-[#FFFFFF] px-3.5 py-2.5 text-sm text-[#1A1A1A]"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Scholarly & Fiqh Feedback">
                      Scholarly &amp; Fiqh Feedback
                    </option>
                    <option value="Technical Support">Technical Support</option>
                    <option value="Community Partnership">
                      Community Partnership
                    </option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-semibold text-[#1A1A1A]"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your question or feedback here..."
                    className="mt-1.5 w-full rounded-[8px] border border-[#1B5E20]/25 bg-[#FFFFFF] px-3.5 py-2.5 text-sm text-[#1A1A1A] placeholder:text-[#4A554C]/60"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-[8px] bg-[#1B5E20] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#2E7D32]"
                >
                  <Send className="h-4 w-4" />
                  <span>Submit Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
