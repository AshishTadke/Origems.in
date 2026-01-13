import { useState, useEffect, useRef } from 'react';
import '@/App.css';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Code, Smartphone, Globe, ChevronRight } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

function App() {
  const { toast } = useToast();
  const [testimonials, setTestimonials] = useState([]);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    country_code: '+91',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Scroll animation hook
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('scroll-reveal-active');
        }
      });
    }, observerOptions);

    // Observe all elements with scroll-reveal class
    const revealElements = document.querySelectorAll('.scroll-reveal');
    revealElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [testimonials]); // Re-run when testimonials load

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await axios.get(`${API}/testimonials`);
      setTestimonials(response.data);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.post(`${API}/contact`, contactForm);
      toast({
        title: 'Success!',
        description: 'Thank you for contacting us. We\'ll get back to you soon!',
      });
      setContactForm({ name: '', email: '', phone: '', country_code: '+91', message: '' });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToContact = () => {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Toaster />
      
      {/* Apple-style Navigation */}
      <nav className="fixed top-0 w-full bg-gray-900/95 backdrop-blur-xl z-50 border-b border-gray-800" data-testid="main-navigation">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-12">
            <div className="flex items-center">
              <span className="text-xl font-semibold text-white">Origem</span>
            </div>
            <div className="hidden md:flex space-x-10 text-sm">
              <a href="#services" className="text-gray-400 hover:text-white transition">Services</a>
              <a href="#portfolio" className="text-gray-400 hover:text-white transition">Portfolio</a>
              <a href="#testimonials" className="text-gray-400 hover:text-white transition">Testimonials</a>
              <a href="#faq" className="text-gray-400 hover:text-white transition">FAQ</a>
            </div>
            <button onClick={scrollToContact} className="text-sm text-blue-500 hover:text-blue-400" data-testid="nav-contact-button">
              Contact
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-6" data-testid="hero-section">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-6xl md:text-8xl font-semibold mb-6 text-white tracking-tight" data-testid="hero-title">
            Your Partner in<br />Salesforce, Web<br />& Mobile Solutions
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-8 font-normal" data-testid="hero-description">
            End-to-end technology solutions that transform your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button onClick={scrollToContact} className="apple-button-primary ripple" data-testid="hero-cta-primary">
              Get started
            </button>
            <button className="apple-button-secondary-dark" data-testid="hero-cta-secondary">
              Learn more
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-800 scroll-reveal" data-testid="stats-section">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center stagger-children">
            <div data-testid="stat-projects" className="scroll-reveal scroll-reveal-scale">
              <div className="text-5xl font-semibold mb-2 text-white stat-number">150+</div>
              <div className="text-sm text-gray-400">Projects Delivered</div>
            </div>
            <div data-testid="stat-clients" className="scroll-reveal scroll-reveal-scale">
              <div className="text-5xl font-semibold mb-2 text-white stat-number">80+</div>
              <div className="text-sm text-gray-400">Happy Clients</div>
            </div>
            <div data-testid="stat-years" className="scroll-reveal scroll-reveal-scale">
              <div className="text-5xl font-semibold mb-2 text-white stat-number">8+</div>
              <div className="text-sm text-gray-400">Years Experience</div>
            </div>
            <div data-testid="stat-rating" className="scroll-reveal scroll-reveal-scale">
              <div className="text-5xl font-semibold mb-2 text-white stat-number">4.9</div>
              <div className="text-sm text-gray-400">Client Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-6 bg-gray-900" data-testid="services-section">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 scroll-reveal">
            <h2 className="text-5xl md:text-6xl font-semibold mb-4 text-white" data-testid="services-title">What we do.</h2>
            <p className="text-xl text-gray-400">Tailored solutions for your unique needs</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="apple-card-dark scroll-reveal scroll-reveal-left" data-testid="service-salesforce">
              <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 icon-rotate">
                <Code className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-white">Salesforce Services</h3>
              <p className="text-gray-400 mb-6">
                Expert customization, technical solutions, and development work
              </p>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="hover:text-white transition-colors">Custom Salesforce Development</li>
                <li className="hover:text-white transition-colors">Integration & Migration</li>
                <li className="hover:text-white transition-colors">Workflow Automation</li>
                <li className="hover:text-white transition-colors">Technical Consulting</li>
              </ul>
            </div>

            <div className="apple-card-dark scroll-reveal" data-testid="service-mobile">
              <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 icon-rotate">
                <Smartphone className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-white">Mobile App Development</h3>
              <p className="text-gray-400 mb-6">
                Creating innovative mobile applications for iOS and Android
              </p>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="hover:text-white transition-colors">Native & Cross-Platform Apps</li>
                <li className="hover:text-white transition-colors">UI/UX Design</li>
                <li className="hover:text-white transition-colors">App Store Optimization</li>
                <li className="hover:text-white transition-colors">Maintenance & Support</li>
              </ul>
            </div>

            <div className="apple-card-dark scroll-reveal scroll-reveal-right" data-testid="service-web">
              <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 icon-rotate">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-white">Web Development</h3>
              <p className="text-gray-400 mb-6">
                Website creation, digital presence, and web solutions
              </p>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="hover:text-white transition-colors">Custom Web Applications</li>
                <li className="hover:text-white transition-colors">E-commerce Solutions</li>
                <li className="hover:text-white transition-colors">Progressive Web Apps</li>
                <li className="hover:text-white transition-colors">Performance Optimization</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-gray-800 px-6 scroll-reveal" data-testid="why-choose-section">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 scroll-reveal">
            <h2 className="text-5xl md:text-6xl font-semibold mb-4 text-white" data-testid="why-choose-title">Why Origem.</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 stagger-children">
            <div className="text-center hover-lift scroll-reveal scroll-reveal-bottom" data-testid="feature-customized">
              <h3 className="text-xl font-semibold mb-3 text-white">Customized Solutions</h3>
              <p className="text-gray-400">Everything we deliver is tailored to your business</p>
            </div>
            <div className="text-center hover-lift" data-testid="feature-team">
              <h3 className="text-xl font-semibold mb-3 text-white">Expert Team</h3>
              <p className="text-gray-400">Certified professionals with years of experience</p>
            </div>
            <div className="text-center hover-lift" data-testid="feature-support">
              <h3 className="text-xl font-semibold mb-3 text-white">End-to-End Support</h3>
              <p className="text-gray-400">We're with you every step of the way</p>
            </div>
            <div className="text-center hover-lift" data-testid="feature-impact">
              <h3 className="text-xl font-semibold mb-3 text-white">Business Impact</h3>
              <p className="text-gray-400">Measurable growth and efficiency</p>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-24 px-6 bg-gray-900" data-testid="portfolio-section">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-semibold mb-4 text-white" data-testid="portfolio-title">Our work.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="apple-card-dark portfolio-item" data-testid="portfolio-item-1">
              <div className="h-64 bg-gradient-to-br from-blue-900/30 to-blue-800/30 rounded-2xl mb-6 flex items-center justify-center overflow-hidden">
                <Code className="h-20 w-20 text-blue-400 opacity-30" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">E-Commerce Platform</h3>
              <p className="text-gray-400 mb-4">Custom Salesforce integration for online retail</p>
              <a href="#" className="text-blue-500 text-sm inline-flex items-center hover:underline group">
                Learn more <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            <div className="apple-card-dark portfolio-item" data-testid="portfolio-item-2">
              <div className="h-64 bg-gradient-to-br from-gray-800/50 to-gray-700/50 rounded-2xl mb-6 flex items-center justify-center overflow-hidden">
                <Smartphone className="h-20 w-20 text-gray-500 opacity-30" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Healthcare Mobile App</h3>
              <p className="text-gray-400 mb-4">Patient management system for iOS & Android</p>
              <a href="#" className="text-blue-500 text-sm inline-flex items-center hover:underline group">
                Learn more <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            <div className="apple-card-dark portfolio-item" data-testid="portfolio-item-3">
              <div className="h-64 bg-gradient-to-br from-blue-900/30 to-blue-800/30 rounded-2xl mb-6 flex items-center justify-center overflow-hidden">
                <Globe className="h-20 w-20 text-blue-400 opacity-30" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Corporate Website</h3>
              <p className="text-gray-400 mb-4">Modern web presence for Fortune 500 company</p>
              <a href="#" className="text-blue-500 text-sm inline-flex items-center hover:underline group">
                Learn more <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-gray-800 px-6" data-testid="testimonials-section">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-semibold mb-4 text-white" data-testid="testimonials-title">What clients say.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={testimonial.id} className="bg-gray-700/50 rounded-3xl p-8 shadow-sm testimonial-card" style={{animationDelay: `${index * 0.1}s`}} data-testid={`testimonial-${testimonial.id}`}>
                <p className="text-white mb-6 text-lg">"{testimonial.content}"</p>
                <div className="flex items-center space-x-3">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full animate-pulse"
                  />
                  <div>
                    <div className="font-semibold text-white text-sm">{testimonial.name}</div>
                    <div className="text-gray-400 text-xs">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-24 px-6 bg-gray-900" data-testid="tech-stack-section">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-semibold mb-4 text-white" data-testid="tech-stack-title">Technologies.</h2>
          <p className="text-xl text-gray-400 mb-12">Cutting-edge tools and frameworks</p>
          <div className="flex flex-wrap justify-center gap-4">
            {['Salesforce', 'React', 'React Native', 'Node.js', 'Python', 'MongoDB', 'AWS', 'TypeScript', 'GraphQL', 'Docker', 'Kubernetes', 'Next.js'].map((tech, index) => (
              <span key={tech} className="px-6 py-2 bg-gray-800 rounded-full text-sm text-white tech-badge" style={{animationDelay: `${index * 0.05}s`}} data-testid={`tech-${tech.toLowerCase().replace(/\./g, '-')}`}>
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-gray-800 px-6" data-testid="faq-section">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-semibold mb-4 text-white" data-testid="faq-title">Questions.</h2>
          </div>
          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="item-1" className="border-b border-gray-700" data-testid="faq-item-1">
              <AccordionTrigger className="text-left text-lg font-medium text-white hover:text-gray-300 accordion-trigger">What services does Origem provide?</AccordionTrigger>
              <AccordionContent className="text-gray-400">
                We specialize in three main areas: Salesforce services (customization, integration, and consulting), 
                Mobile App Development (iOS and Android), and Web Development (custom websites and web applications).
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border-b border-gray-700" data-testid="faq-item-2">
              <AccordionTrigger className="text-left text-lg font-medium text-white hover:text-gray-300 accordion-trigger">How long does a typical project take?</AccordionTrigger>
              <AccordionContent className="text-gray-400">
                Project timelines vary depending on complexity and scope. A simple website might take 4-6 weeks, 
                while a complex Salesforce implementation or mobile app could take 3-6 months.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border-b border-gray-700" data-testid="faq-item-3">
              <AccordionTrigger className="text-left text-lg font-medium text-white hover:text-gray-300 accordion-trigger">Do you provide post-launch support?</AccordionTrigger>
              <AccordionContent className="text-gray-400">
                Yes! We offer comprehensive post-launch support and maintenance packages. This includes bug fixes, 
                updates, performance monitoring, and feature enhancements.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="border-b border-gray-700" data-testid="faq-item-4">
              <AccordionTrigger className="text-left text-lg font-medium text-white hover:text-gray-300 accordion-trigger">What is your pricing model?</AccordionTrigger>
              <AccordionContent className="text-gray-400">
                We offer flexible pricing models including fixed-price projects, time and materials, and retainer arrangements. 
                The best approach depends on your project scope and requirements.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5" className="border-b border-gray-700" data-testid="faq-item-5">
              <AccordionTrigger className="text-left text-lg font-medium text-white hover:text-gray-300 accordion-trigger">Can you work with our existing systems?</AccordionTrigger>
              <AccordionContent className="text-gray-400">
                Absolutely! We specialize in integrating with existing systems, whether it's connecting to your current 
                Salesforce setup, legacy databases, or third-party APIs.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 bg-gray-900" data-testid="contact-section">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-5xl md:text-6xl font-semibold mb-4 text-white" data-testid="contact-title">Get in touch.</h2>
            <p className="text-xl text-gray-400">Tell us about your project</p>
          </div>
          <div className="bg-gray-800/50 rounded-3xl p-8 md:p-12 shadow-sm border border-gray-700 animate-scale-in" data-testid="contact-form-card">
            <form onSubmit={handleContactSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm text-white">Name</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    required
                    className="apple-input-dark"
                    data-testid="contact-name-input"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm text-white">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    required
                    className="apple-input-dark"
                    data-testid="contact-email-input"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="country_code" className="text-sm text-white">Code</Label>
                  <Select
                    value={contactForm.country_code}
                    onValueChange={(value) => setContactForm({ ...contactForm, country_code: value })}
                  >
                    <SelectTrigger id="country_code" className="apple-input-dark" data-testid="contact-country-code-select">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="+1">🇺🇸 +1</SelectItem>
                      <SelectItem value="+91">🇮🇳 +91</SelectItem>
                      <SelectItem value="+44">🇬🇧 +44</SelectItem>
                      <SelectItem value="+61">🇦🇺 +61</SelectItem>
                      <SelectItem value="+81">🇯🇵 +81</SelectItem>
                      <SelectItem value="+86">🇨🇳 +86</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 md:col-span-3">
                  <Label htmlFor="phone" className="text-sm text-white">Phone</Label>
                  <Input
                    id="phone"
                    placeholder="1234567890"
                    value={contactForm.phone}
                    onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                    required
                    className="apple-input-dark"
                    data-testid="contact-phone-input"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm text-white">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Tell us about your project..."
                  rows={5}
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  required
                  className="apple-input-dark"
                  data-testid="contact-message-textarea"
                />
              </div>
              <button
                type="submit"
                className="apple-button-primary w-full ripple"
                disabled={isSubmitting}
                data-testid="contact-submit-button"
              >
                {isSubmitting ? 'Sending...' : 'Submit'}
              </button>
            </form>
          </div>
          <div className="text-center mt-8 animate-fade-in-up">
            <p className="text-gray-400 mb-2">Or call</p>
            <a href="tel:+918983609962" className="text-2xl font-semibold text-blue-500 hover:underline" data-testid="contact-phone-link">
              (+91) 89836 09962
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 py-12 px-6 border-t border-gray-700" data-testid="footer">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-semibold mb-4 text-white text-sm">Services</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#services" className="hover:text-white">Salesforce Services</a></li>
                <li><a href="#services" className="hover:text-white">Mobile Development</a></li>
                <li><a href="#services" className="hover:text-white">Web Development</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-white text-sm">Company</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#portfolio" className="hover:text-white">Portfolio</a></li>
                <li><a href="#testimonials" className="hover:text-white">Testimonials</a></li>
                <li><a href="#faq" className="hover:text-white">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-white text-sm">Connect</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">LinkedIn</a></li>
                <li><a href="#" className="hover:text-white">Twitter</a></li>
                <li><a href="#" className="hover:text-white">Facebook</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-white text-sm">Contact</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#contact" className="hover:text-white">Get in Touch</a></li>
                <li><a href="tel:+918983609962" className="hover:text-white">(+91) 89836 09962</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
            <p>© 2025 Origem Consulting. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;