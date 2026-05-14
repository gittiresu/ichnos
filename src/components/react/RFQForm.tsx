import * as Label from '@radix-ui/react-label';
import * as Checkbox from '@radix-ui/react-checkbox';
import { Check, User, Building2, Briefcase, Calendar, Package } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import { RECAPTCHA } from '@config/site';
import type { AlertHandle } from '../../types/types';
import AlertBox from "./AlertBox";
import { POSITIONS } from '@customizations/positions/positions';
import { TIMELINES } from '@customizations/timelines';
import { INDUSTRIES } from '@customizations/industries';

const positions = POSITIONS;
const timelines = TIMELINES;
const industries = INDUSTRIES;

interface Props {
  siteKey?: string;
  secretKey?: string;
}

export default function RFQForm({ siteKey = RECAPTCHA.siteKey, secretKey = RECAPTCHA.secretKey, }: Props) {
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<string | number | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA | null>(null);
  const [mounted, setMounted] = useState(false);
  const alertRef = useRef<AlertHandle | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  function toggle(id: string | number) {
    setSelected(prev => (prev === id ? null : id));
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); // show overlay
    alertRef.current?.hide();
    const token = recaptchaRef.current?.getValue();
    
    if (!token) {
      alertRef.current?.show("Captcha missing.", "error");
      setLoading(false); // hide overlay
      return;
    }
        
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const mailSend =  await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, formData: data})
    });
    
    try {
      if(mailSend.ok) {
        // Show success message
        alertRef.current?.show("Thank you for your request! We will contact you within 24 hours.");
        recaptchaRef.current?.reset();
        form.reset();
      } else {      
        // Show failure message
        alertRef.current?.show("Your request fails! Please try again later.", "error");
      }
    } catch (error) {
      alertRef.current?.show("An error occurred while submitting your request. Please try again later.", "error");
    } finally {
      setLoading(false); // hide overlay
    }    
  };

  return (
    <>
      {loading && (
        <div className="overlay">
          <div className="spinner"></div>
        </div>
      )}
      <AlertBox ref={alertRef} />
      <form className="space-y-6" id="rfq-form" onSubmit={handleSubmit} name="rfq-form">
        {/* Contact Information */}
        <div>
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 rounded-lg bg-linear-to-br from-blue-600 to-teal-600 flex items-center justify-center mr-3">
              <User className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Contact Information
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label.Root
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                First Name <span className="text-red-500">*</span>
              </Label.Root>
              <input
                type="text"
                id="firstName"
                name="firstName"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
              />
            </div>
            <div>
              <Label.Root
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Last Name <span className="text-red-500">*</span>
              </Label.Root>
              <input
                type="text"
                id="lastName"
                name="lastName"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
              />
            </div>
            <div>
              <Label.Root
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address <span className="text-red-500">*</span>
              </Label.Root>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
              />
            </div>
            <div>
              <Label.Root
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Phone Number (with national prefix)<span className="text-red-500">*</span>
              </Label.Root>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
              />
            </div>
          </div>
        </div>

        {/* Company Information */}
        <div className="pt-6 border-t border-gray-200">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 rounded-lg bg-linear-to-br from-purple-600 to-pink-600 flex items-center justify-center mr-3">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Your Company Information
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label.Root
                htmlFor="company"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Company Name <span className="text-red-500"></span>
              </Label.Root>
              <input
                type="text"
                id="company"
                name="company"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
              />
            </div>
            <div>
              <Label.Root
                htmlFor="industry"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Field <span className="text-red-500"></span>
              </Label.Root>
              <select
                id="industry"
                name="industry"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
              >
                <option value="">Select one</option>
                  {industries.map((industry) => {
                    return (
                      <option key={industry.value} value={industry.value}>
                        {industry.label}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
        </div>

        {/* Service Requirements */}
        <div className="pt-6 border-t border-gray-200">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 rounded-lg bg-linear-to-br from-green-600 to-emerald-600 flex items-center justify-center mr-3">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Available applications
            </h2>
          </div>
          <div className="space-y-6">
            <div>
              <Label.Root className="block text-sm font-medium text-gray-700 mb-3">
                At the moment we are looking for <span className="text-red-500"></span>
              </Label.Root>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {positions.map((service) => {
                  const serviceID = service.image.split('.')[0].toLowerCase().replace(/\s+/g, '-');
                  return (
                    <div
                      key={serviceID}
                      className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all cursor-pointer group"
                    >
                      <Checkbox.Root
                        id={serviceID}
                        name="services"
                        value={serviceID}
                        checked={selected === serviceID}
                        onCheckedChange={() => toggle(serviceID)}            
                        style={{ cursor: 'pointer'}}
                        className="w-5 h-5 flex items-center justify-center border-2 border-gray-300 rounded data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 transition-colors shrink-0"
                      >
                        <Checkbox.Indicator>
                          <Check className="w-4 h-4 text-white" />
                        </Checkbox.Indicator>
                      </Checkbox.Root>
                      <Label.Root
                        htmlFor={serviceID}
                        className="text-sm font-medium text-gray-700 cursor-pointer flex-1 group-hover:text-gray-900 transition-colors"
                      >
                        {service.title}
                      </Label.Root>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label.Root
                  htmlFor="timeline"
                  className="flex items-center text-sm font-medium text-gray-700 mb-2"
                >
                  <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                  Available to start within <span className="text-red-500 ml-1">*</span>
                </Label.Root>
                <div className="relative">
                  <select
                    id="timeline"
                    name="timeline"
                    required
                    className="w-full px-4 py-2 pl-10 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition appearance-none bg-white"
                  >                    
                  {timelines.map((timeline) => {
                    return (
                      <option key={timeline.value} value={timeline.value}>
                        {timeline.label}
                      </option>
                    );
                  })}
                  </select>
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <div>
                <Label.Root
                  htmlFor="volume"
                  className="flex items-center text-sm font-medium text-gray-700 mb-2"
                >
                  <Package className="w-4 h-4 mr-2 text-gray-500" />
                  Expected salary in euro
                </Label.Root>
                <div className="relative">
                  <input
                    type="text"
                    id="volume"
                    name="volume"
                    placeholder="e.g., 40000"
                    className="w-full px-4 py-2 pl-10 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                  <Package className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            <div>
              <Label.Root
                htmlFor="details"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Tell us about yourself <span className="text-red-500">*</span>
              </Label.Root>
              <textarea
                id="details"
                name="details"
                rows={6}
                required
                placeholder="Please provide details about your skills, including experiences, expectations, dreams, or any other relevant information..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition resize-none"
              />
            </div>
          </div>
        </div>    
        
        <ReCAPTCHA
          sitekey={siteKey}
          ref={recaptchaRef}
        />

        {/* Submit Button */}
        <div className="pt-6">
          <button
            type="submit"
            style={{ cursor: 'pointer'}}
            className="w-full bg-linear-to-r from-blue-600 to-teal-600 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:from-blue-700 hover:to-teal-700 transition-all duration-200 hover:shadow-xl active:scale-95 flex items-center justify-center space-x-2"
          >
            <span>Submit Request</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
          <p className="text-sm text-gray-500 text-center mt-4">
            By submitting this form, you agree to our Privacy Policy and Terms of Service.
          </p>
        </div>
      </form>
    </>
  );
}

