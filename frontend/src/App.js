import { useState, useEffect } from 'react';
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
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/newsletter`, { email: newsletterEmail });
      toast({
        title: 'Subscribed!',
        description: 'You\'ve been added to our newsletter.',
      });
      setNewsletterEmail('');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Could not subscribe. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const scrollToContact = () => {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Toaster />
      
      {/* Apple-style Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-xl z-50 border-b border-gray-100" data-testid="main-navigation">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-12">
            <div className="flex items-center">
              <span className="text-xl font-semibold text-gray-900">Origem</span>
            </div>
            <div className="hidden md:flex space-x-10 text-sm">
              <a href="#services" className="text-gray-600 hover:text-gray-900 transition">Services</a>
              <a href="#portfolio" className="text-gray-600 hover:text-gray-900 transition">Portfolio</a>
              <a href="#testimonials" className="text-gray-600 hover:text-gray-900 transition">Testimonials</a>
              <a href="#faq" className="text-gray-600 hover:text-gray-900 transition">FAQ</a>
            </div>
            <button onClick={scrollToContact} className="text-sm text-blue-600 hover:text-blue-700" data-testid="nav-contact-button">
              Contact
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section - Apple Style */}
      <section className="pt-32 pb-24 px-6" data-testid="hero-section">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-6xl md:text-8xl font-semibold mb-6 text-gray-900 tracking-tight" data-testid="hero-title">
            Your Partner in<br />Salesforce, Web<br />& Mobile Solutions
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 font-normal" data-testid="hero-description">
            End-to-end technology solutions that transform your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button onClick={scrollToContact} className="apple-button-primary" data-testid="hero-cta-primary">
              Get started
            </button>
            <button className="apple-button-secondary" data-testid="hero-cta-secondary">
              Learn more
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section - Minimal */}
      <section className="py-20 bg-gray-50" data-testid="stats-section">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            <div data-testid="stat-projects">
              <div className="text-5xl font-semibold mb-2 text-gray-900">150+</div>
              <div className="text-sm text-gray-600">Projects Delivered</div>
            </div>
            <div data-testid="stat-clients">
              <div className="text-5xl font-semibold mb-2 text-gray-900">80+</div>
              <div className="text-sm text-gray-600">Happy Clients</div>
            </div>
            <div data-testid="stat-years">
              <div className="text-5xl font-semibold mb-2 text-gray-900">8+</div>
              <div className="text-sm text-gray-600">Years Experience</div>
            </div>
            <div data-testid="stat-rating">
              <div className="text-5xl font-semibold mb-2 text-gray-900">4.9</div>
              <div className="text-sm text-gray-600">Client Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Apple Style */}
      <section id="services" className="py-24 px-6 bg-white" data-testid="services-section">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-semibold mb-4 text-gray-900" data-testid="services-title">What we do.</h2>
            <p className="text-xl text-gray-600">Tailored solutions for your unique needs</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="apple-card" data-testid="service-salesforce">
              <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <Code className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900">Salesforce Services</h3>
              <p className="text-gray-600 mb-6">
                Expert customization, technical solutions, and development work
              </p>
              <ul className="space-y-3 text-sm text-gray-600">
                <li>Custom Salesforce Development</li>
                <li>Integration & Migration</li>
                <li>Workflow Automation</li>
                <li>Technical Consulting</li>
              </ul>
            </div>

            <div className="apple-card" data-testid="service-mobile">
              <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <Smartphone className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900">Mobile App Development</h3>
              <p className="text-gray-600 mb-6">
                Creating innovative mobile applications for iOS and Android
              </p>
              <ul className="space-y-3 text-sm text-gray-600">
                <li>Native & Cross-Platform Apps</li>
                <li>UI/UX Design</li>
                <li>App Store Optimization</li>
                <li>Maintenance & Support</li>
              </ul>
            </div>

            <div className="apple-card" data-testid="service-web">
              <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900">Web Development</h3>
              <p className="text-gray-600 mb-6">
                Website creation, digital presence, and web solutions
              </p>
              <ul className="space-y-3 text-sm text-gray-600">
                <li>Custom Web Applications</li>
                <li>E-commerce Solutions</li>
                <li>Progressive Web Apps</li>
                <li>Performance Optimization</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Minimal */}
      <section className="py-24 bg-gray-50 px-6" data-testid="why-choose-section">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-semibold mb-4 text-gray-900" data-testid="why-choose-title">Why Origem.</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="text-center" data-testid="feature-customized">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Customized Solutions</h3>
              <p className="text-gray-600">Everything we deliver is tailored to your business</p>
            </div>
            <div className="text-center" data-testid="feature-team">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Expert Team</h3>
              <p className="text-gray-600">Certified professionals with years of experience</p>
            </div>
            <div className="text-center" data-testid="feature-support">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">End-to-End Support</h3>
              <p className="text-gray-600">We're with you every step of the way</p>
            </div>
            <div className="text-center" data-testid="feature-impact">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Business Impact</h3>
              <p className="text-gray-600">Measurable growth and efficiency</p>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-24 px-6 bg-white" data-testid="portfolio-section">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-semibold mb-4 text-gray-900" data-testid="portfolio-title">Our work.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="apple-card" data-testid="portfolio-item-1">
              <div className="h-64 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl mb-6 flex items-center justify-center">
                <Code className="h-20 w-20 text-blue-600 opacity-30" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">E-Commerce Platform</h3>
              <p className="text-gray-600 mb-4">Custom Salesforce integration for online retail</p>
              <a href="#" className="text-blue-600 text-sm inline-flex items-center hover:underline">
                Learn more <ChevronRight className="h-4 w-4 ml-1" />
              </a>
            </div>

            <div className="apple-card" data-testid="portfolio-item-2">
              <div className="h-64 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl mb-6 flex items-center justify-center">
                <Smartphone className="h-20 w-20 text-gray-600 opacity-30" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Healthcare Mobile App</h3>
              <p className="text-gray-600 mb-4">Patient management system for iOS & Android</p>
              <a href="#" className="text-blue-600 text-sm inline-flex items-center hover:underline">
                Learn more <ChevronRight className="h-4 w-4 ml-1" />
              </a>
            </div>

            <div className="apple-card" data-testid="portfolio-item-3">
              <div className="h-64 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl mb-6 flex items-center justify-center">
                <Globe className="h-20 w-20 text-blue-600 opacity-30" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Corporate Website</h3>
              <p className="text-gray-600 mb-4">Modern web presence for Fortune 500 company</p>
              <a href="#" className="text-blue-600 text-sm inline-flex items-center hover:underline">
                Learn more <ChevronRight className="h-4 w-4 ml-1" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-gray-50 px-6" data-testid="testimonials-section">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-semibold mb-4 text-gray-900" data-testid="testimonials-title">What clients say.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white rounded-3xl p-8 shadow-sm" data-testid={`testimonial-${testimonial.id}`}>
                <p className="text-gray-900 mb-6 text-lg">"{testimonial.content}"</p>
                <div className="flex items-center space-x-3">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{testimonial.name}</div>
                    <div className="text-gray-600 text-xs">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-24 px-6 bg-white" data-testid="tech-stack-section">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-semibold mb-4 text-gray-900" data-testid="tech-stack-title">Technologies.</h2>
          <p className="text-xl text-gray-600 mb-12">Cutting-edge tools and frameworks</p>
          <div className="flex flex-wrap justify-center gap-4">
            {['Salesforce', 'React', 'React Native', 'Node.js', 'Python', 'MongoDB', 'AWS', 'TypeScript', 'GraphQL', 'Docker', 'Kubernetes', 'Next.js'].map((tech) => (
              <span key={tech} className="px-6 py-2 bg-gray-100 rounded-full text-sm text-gray-900" data-testid={`tech-${tech.toLowerCase().replace(/\./g, '-')}`}>
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-gray-50 px-6" data-testid="faq-section">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-semibold mb-4 text-gray-900" data-testid="faq-title">Questions.</h2>
          </div>
          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="item-1" className="border-b border-gray-200" data-testid="faq-item-1">
              <AccordionTrigger className="text-left text-lg font-medium hover:text-gray-600">What services does Origem provide?</AccordionTrigger>
              <AccordionContent className="text-gray-600">
                We specialize in three main areas: Salesforce services (customization, integration, and consulting), 
                Mobile App Development (iOS and Android), and Web Development (custom websites and web applications).
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border-b border-gray-200" data-testid="faq-item-2">
              <AccordionTrigger className="text-left text-lg font-medium hover:text-gray-600">How long does a typical project take?</AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Project timelines vary depending on complexity and scope. A simple website might take 4-6 weeks, 
                while a complex Salesforce implementation or mobile app could take 3-6 months.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border-b border-gray-200" data-testid="faq-item-3">
              <AccordionTrigger className="text-left text-lg font-medium hover:text-gray-600">Do you provide post-launch support?</AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Yes! We offer comprehensive post-launch support and maintenance packages. This includes bug fixes, 
                updates, performance monitoring, and feature enhancements.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="border-b border-gray-200" data-testid="faq-item-4">
              <AccordionTrigger className="text-left text-lg font-medium hover:text-gray-600">What is your pricing model?</AccordionTrigger>
              <AccordionContent className="text-gray-600">
                We offer flexible pricing models including fixed-price projects, time and materials, and retainer arrangements. 
                The best approach depends on your project scope and requirements.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5" className="border-b border-gray-200" data-testid="faq-item-5">
              <AccordionTrigger className="text-left text-lg font-medium hover:text-gray-600">Can you work with our existing systems?</AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Absolutely! We specialize in integrating with existing systems, whether it's connecting to your current 
                Salesforce setup, legacy databases, or third-party APIs.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 bg-white" data-testid="contact-section">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-semibold mb-4 text-gray-900" data-testid="contact-title">Get in touch.</h2>
            <p className="text-xl text-gray-600">Tell us about your project</p>
          </div>
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100" data-testid="contact-form-card">
            <form onSubmit={handleContactSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm text-gray-900">Name</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    required
                    className="apple-input"
                    data-testid="contact-name-input"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm text-gray-900">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    required
                    className="apple-input"
                    data-testid="contact-email-input"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="country_code" className="text-sm text-gray-900">Code</Label>
                  <Select
                    value={contactForm.country_code}
                    onValueChange={(value) => setContactForm({ ...contactForm, country_code: value })}
                  >
                    <SelectTrigger id="country_code" className="apple-input" data-testid="contact-country-code-select">
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
                  <Label htmlFor="phone" className="text-sm text-gray-900">Phone</Label>
                  <Input
                    id="phone"
                    placeholder="1234567890"
                    value={contactForm.phone}
                    onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                    required
                    className="apple-input"
                    data-testid="contact-phone-input"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm text-gray-900">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Tell us about your project..."
                  rows={5}
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  required
                  className="apple-input"
                  data-testid="contact-message-textarea"
                />
              </div>
              <button
                type="submit"
                className="apple-button-primary w-full"
                disabled={isSubmitting}
                data-testid="contact-submit-button"
              >
                {isSubmitting ? 'Sending...' : 'Submit'}
              </button>
            </form>
          </div>
          <div className="text-center mt-8">
            <p className="text-gray-600 mb-2">Or call</p>
            <a href="tel:+918983609962" className="text-2xl font-semibold text-blue-600 hover:underline" data-testid="contact-phone-link">
              (+91) 89836 09962
            </a>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gray-900 text-white" data-testid="newsletter-section">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-semibold mb-4" data-testid="newsletter-title">Stay informed.</h2>
          <p className="text-gray-400 mb-8">Get updates and insights delivered to your inbox.</p>
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Email address"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              required
              className="apple-input bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
              data-testid="newsletter-email-input"
            />
            <button type="submit" className="apple-button-secondary-white" data-testid="newsletter-submit-button">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-12 px-6 border-t border-gray-200" data-testid="footer">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-semibold mb-4 text-gray-900 text-sm">Services</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#services" className="hover:text-gray-900">Salesforce Services</a></li>
                <li><a href="#services" className="hover:text-gray-900">Mobile Development</a></li>
                <li><a href="#services" className="hover:text-gray-900">Web Development</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-gray-900 text-sm">Company</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#portfolio" className="hover:text-gray-900">Portfolio</a></li>
                <li><a href="#testimonials" className="hover:text-gray-900">Testimonials</a></li>
                <li><a href="#faq" className="hover:text-gray-900">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-gray-900 text-sm">Connect</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">LinkedIn</a></li>
                <li><a href="#" className="hover:text-gray-900">Twitter</a></li>
                <li><a href="#" className="hover:text-gray-900">Facebook</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-gray-900 text-sm">Contact</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#contact" className="hover:text-gray-900">Get in Touch</a></li>
                <li><a href="tel:+918983609962" className="hover:text-gray-900">(+91) 89836 09962</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-8 text-center text-sm text-gray-600">
            <p>© 2025 Origem Consulting. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;