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
import { Badge } from '@/components/ui/badge';
import { Star, Code, Smartphone, Globe, Users, TrendingUp, Award, CheckCircle, ArrowRight, Sparkles, Zap, Target } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Toaster />
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-200" data-testid="main-navigation">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-6 w-6 text-emerald-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Or!gem
              </span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#services" className="text-slate-700 hover:text-emerald-600 transition">Services</a>
              <a href="#portfolio" className="text-slate-700 hover:text-emerald-600 transition">Portfolio</a>
              <a href="#testimonials" className="text-slate-700 hover:text-emerald-600 transition">Testimonials</a>
              <a href="#faq" className="text-slate-700 hover:text-emerald-600 transition">FAQ</a>
            </div>
            <Button onClick={scrollToContact} className="bg-gradient-to-r from-emerald-600 to-teal-600" data-testid="nav-contact-button">
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8" data-testid="hero-section">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-4 bg-emerald-100 text-emerald-700 hover:bg-emerald-200" data-testid="hero-badge">
            <Zap className="h-3 w-3 mr-1" />
            Transforming Ideas into Reality
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-emerald-800 to-teal-600 bg-clip-text text-transparent leading-tight" data-testid="hero-title">
            Your Partner in
            <br />
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Salesforce, Web & Mobile
            </span>
            <br />
            Solutions
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto" data-testid="hero-description">
            We deliver end-to-end technology solutions that transform your business. 
            From Salesforce customization to stunning web and mobile experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={scrollToContact} className="bg-gradient-to-r from-emerald-600 to-teal-600 text-lg" data-testid="hero-cta-primary">
              Get Free Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg border-2" data-testid="hero-cta-secondary">
              View Our Work
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-emerald-600 to-teal-600" data-testid="stats-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div data-testid="stat-projects">
              <div className="text-4xl font-bold mb-2">150+</div>
              <div className="text-emerald-100">Projects Delivered</div>
            </div>
            <div data-testid="stat-clients">
              <div className="text-4xl font-bold mb-2">80+</div>
              <div className="text-emerald-100">Happy Clients</div>
            </div>
            <div data-testid="stat-years">
              <div className="text-4xl font-bold mb-2">8+</div>
              <div className="text-emerald-100">Years Experience</div>
            </div>
            <div data-testid="stat-rating">
              <div className="text-4xl font-bold mb-2">4.9/5</div>
              <div className="text-emerald-100">Client Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 sm:px-6 lg:px-8" data-testid="services-section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-slate-900" data-testid="services-title">What We Do</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              End-to-end technology solutions tailored to your unique business needs
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-emerald-200" data-testid="service-salesforce">
              <CardHeader>
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center mb-4">
                  <Code className="h-7 w-7 text-white" />
                </div>
                <CardTitle>Salesforce Services</CardTitle>
                <CardDescription>
                  Expert customization, technical solutions, and development work
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    Custom Salesforce Development
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    Integration & Migration
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    Workflow Automation
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    Technical Consulting
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-emerald-200" data-testid="service-mobile">
              <CardHeader>
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center mb-4">
                  <Smartphone className="h-7 w-7 text-white" />
                </div>
                <CardTitle>Mobile App Development</CardTitle>
                <CardDescription>
                  Creating innovative mobile applications for iOS and Android
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    Native & Cross-Platform Apps
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    UI/UX Design
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    App Store Optimization
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    Maintenance & Support
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-emerald-200" data-testid="service-web">
              <CardHeader>
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="h-7 w-7 text-white" />
                </div>
                <CardTitle>Web Development</CardTitle>
                <CardDescription>
                  Website creation, digital presence, and web solutions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    Custom Web Applications
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    E-commerce Solutions
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    Progressive Web Apps
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    Performance Optimization
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-slate-50 px-4 sm:px-6 lg:px-8" data-testid="why-choose-section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-slate-900" data-testid="why-choose-title">Why Choose Origem</h2>
            <p className="text-xl text-slate-600">What sets us apart from the rest</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center" data-testid="feature-customized">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Customized Solutions</h3>
              <p className="text-slate-600">No one-size-fits-all—everything we deliver is tailored to your business</p>
            </div>
            <div className="text-center" data-testid="feature-team">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Team</h3>
              <p className="text-slate-600">Certified professionals with years of experience in their domains</p>
            </div>
            <div className="text-center" data-testid="feature-support">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">End-to-End Support</h3>
              <p className="text-slate-600">From ideation to launch and beyond, we're with you every step</p>
            </div>
            <div className="text-center" data-testid="feature-impact">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Business Impact</h3>
              <p className="text-slate-600">Solutions designed to deliver measurable growth and efficiency</p>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 px-4 sm:px-6 lg:px-8" data-testid="portfolio-section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-slate-900" data-testid="portfolio-title">Our Recent Work</h2>
            <p className="text-xl text-slate-600">Showcasing projects that made an impact</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="overflow-hidden hover:shadow-xl transition-all duration-300" data-testid="portfolio-item-1">
              <div className="h-48 bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
                <Code className="h-20 w-20 text-white opacity-50" />
              </div>
              <CardHeader>
                <CardTitle>E-Commerce Platform</CardTitle>
                <CardDescription>Custom Salesforce integration for online retail</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 mb-4">
                  Built a comprehensive e-commerce solution with Salesforce backend, handling 10K+ daily transactions.
                </p>
                <div className="flex gap-2 flex-wrap">
                  <Badge variant="secondary">Salesforce</Badge>
                  <Badge variant="secondary">React</Badge>
                  <Badge variant="secondary">API Integration</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-xl transition-all duration-300" data-testid="portfolio-item-2">
              <div className="h-48 bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center">
                <Smartphone className="h-20 w-20 text-white opacity-50" />
              </div>
              <CardHeader>
                <CardTitle>Healthcare Mobile App</CardTitle>
                <CardDescription>Patient management system for iOS & Android</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 mb-4">
                  Developed a secure mobile app for patient records, appointments, and telemedicine consultations.
                </p>
                <div className="flex gap-2 flex-wrap">
                  <Badge variant="secondary">React Native</Badge>
                  <Badge variant="secondary">Healthcare</Badge>
                  <Badge variant="secondary">HIPAA Compliant</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-xl transition-all duration-300" data-testid="portfolio-item-3">
              <div className="h-48 bg-gradient-to-br from-green-400 to-emerald-400 flex items-center justify-center">
                <Globe className="h-20 w-20 text-white opacity-50" />
              </div>
              <CardHeader>
                <CardTitle>Corporate Website</CardTitle>
                <CardDescription>Modern web presence for Fortune 500 company</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 mb-4">
                  Redesigned corporate website with focus on performance, accessibility, and user experience.
                </p>
                <div className="flex gap-2 flex-wrap">
                  <Badge variant="secondary">Next.js</Badge>
                  <Badge variant="secondary">SEO</Badge>
                  <Badge variant="secondary">Analytics</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-slate-50 px-4 sm:px-6 lg:px-8" data-testid="testimonials-section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-slate-900" data-testid="testimonials-title">What Our Clients Say</h2>
            <p className="text-xl text-slate-600">Don't just take our word for it</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="hover:shadow-xl transition-all duration-300" data-testid={`testimonial-${testimonial.id}`}>
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                      <CardDescription>{testimonial.role}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-slate-600">{testimonial.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" data-testid="tech-stack-section">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4 text-slate-900" data-testid="tech-stack-title">Technologies We Work With</h2>
          <p className="text-xl text-slate-600 mb-12">Cutting-edge tools and frameworks</p>
          <div className="flex flex-wrap justify-center gap-4">
            {['Salesforce', 'React', 'React Native', 'Node.js', 'Python', 'MongoDB', 'AWS', 'TypeScript', 'GraphQL', 'Docker', 'Kubernetes', 'Next.js'].map((tech) => (
              <Badge key={tech} variant="outline" className="text-lg py-2 px-4" data-testid={`tech-${tech.toLowerCase().replace(/\./g, '-')}`}>
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-slate-50 px-4 sm:px-6 lg:px-8" data-testid="faq-section">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-slate-900" data-testid="faq-title">Frequently Asked Questions</h2>
            <p className="text-xl text-slate-600">Got questions? We've got answers</p>
          </div>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" data-testid="faq-item-1">
              <AccordionTrigger className="text-left">What services does Origem provide?</AccordionTrigger>
              <AccordionContent>
                We specialize in three main areas: Salesforce services (customization, integration, and consulting), 
                Mobile App Development (iOS and Android), and Web Development (custom websites and web applications). 
                We provide end-to-end solutions tailored to your business needs.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" data-testid="faq-item-2">
              <AccordionTrigger className="text-left">How long does a typical project take?</AccordionTrigger>
              <AccordionContent>
                Project timelines vary depending on complexity and scope. A simple website might take 4-6 weeks, 
                while a complex Salesforce implementation or mobile app could take 3-6 months. We provide detailed 
                timelines during our consultation phase.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" data-testid="faq-item-3">
              <AccordionTrigger className="text-left">Do you provide post-launch support?</AccordionTrigger>
              <AccordionContent>
                Yes! We offer comprehensive post-launch support and maintenance packages. This includes bug fixes, 
                updates, performance monitoring, and feature enhancements. We're committed to your long-term success.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" data-testid="faq-item-4">
              <AccordionTrigger className="text-left">What is your pricing model?</AccordionTrigger>
              <AccordionContent>
                We offer flexible pricing models including fixed-price projects, time and materials, and retainer arrangements. 
                The best approach depends on your project scope and requirements. Contact us for a customized quote.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5" data-testid="faq-item-5">
              <AccordionTrigger className="text-left">Can you work with our existing systems?</AccordionTrigger>
              <AccordionContent>
                Absolutely! We specialize in integrating with existing systems, whether it's connecting to your current 
                Salesforce setup, legacy databases, or third-party APIs. We ensure seamless integration without disrupting 
                your operations.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8" data-testid="contact-section">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-slate-900" data-testid="contact-title">Let's Start a Conversation</h2>
            <p className="text-xl text-slate-600">Your success starts here. Tell us about your project</p>
          </div>
          <Card className="border-2" data-testid="contact-form-card">
            <CardHeader>
              <CardTitle>Get in Touch</CardTitle>
              <CardDescription>Fill out the form below and we'll get back to you within 24 hours</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      required
                      data-testid="contact-name-input"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      required
                      data-testid="contact-email-input"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="country_code">Code</Label>
                    <Select
                      value={contactForm.country_code}
                      onValueChange={(value) => setContactForm({ ...contactForm, country_code: value })}
                    >
                      <SelectTrigger id="country_code" data-testid="contact-country-code-select">
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
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      placeholder="1234567890"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      required
                      data-testid="contact-phone-input"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Your Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your project..."
                    rows={5}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    required
                    data-testid="contact-message-textarea"
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600"
                  disabled={isSubmitting}
                  data-testid="contact-submit-button"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </CardContent>
          </Card>
          <div className="text-center mt-8">
            <p className="text-slate-600 mb-2">Or call us directly:</p>
            <a href="tel:+918983609962" className="text-2xl font-semibold text-emerald-600 hover:text-emerald-700" data-testid="contact-phone-link">
              (+91) 89836 09962
            </a>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-emerald-600 to-teal-600" data-testid="newsletter-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4" data-testid="newsletter-title">Stay Updated</h2>
          <p className="text-emerald-100 mb-8">Subscribe to our newsletter for the latest insights and updates</p>
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              required
              className="bg-white"
              data-testid="newsletter-email-input"
            />
            <Button type="submit" variant="secondary" data-testid="newsletter-submit-button">
              Subscribe
            </Button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8" data-testid="footer">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Sparkles className="h-6 w-6 text-emerald-400" />
                <span className="text-2xl font-bold">Or!gem</span>
              </div>
              <p className="text-slate-400">Transforming ideas into reality through innovative technology solutions.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#services" className="hover:text-emerald-400 transition">Salesforce Services</a></li>
                <li><a href="#services" className="hover:text-emerald-400 transition">Mobile Development</a></li>
                <li><a href="#services" className="hover:text-emerald-400 transition">Web Development</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#portfolio" className="hover:text-emerald-400 transition">Portfolio</a></li>
                <li><a href="#testimonials" className="hover:text-emerald-400 transition">Testimonials</a></li>
                <li><a href="#faq" className="hover:text-emerald-400 transition">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Connect</h3>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-emerald-400 transition">LinkedIn</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition">Twitter</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition">Facebook</a></li>
                <li><a href="#contact" className="hover:text-emerald-400 transition">Contact Us</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-slate-400">
            <p>&copy; 2025 Origem Consulting. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;