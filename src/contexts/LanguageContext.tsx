"use client";

import React, { createContext, useContext, ReactNode } from 'react';
import { useLanguage, SupportedLanguage } from '@/hooks/use-language';

interface LanguageContextType {
  currentLanguage: SupportedLanguage;
  setLanguage: (language: SupportedLanguage) => void;
  showLanguagePopup: boolean;
  hideLanguagePopup: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation keys and their values for each language
const translations = {
  en: {
    // Navigation
    'nav.about': 'About',
    'nav.services': 'Services',
    'nav.testimonials': 'Testimonials',
    'nav.contact': 'Contact',
    'nav.getStarted': 'Get Started',
    'nav.aiChat': 'AI Chat',
    
    // Hero Section
    'hero.tagline': 'Empowering every business with intelligent AI automation for an efficient future.',
    'hero.getStarted': 'Get Started Today',
    
    // About Section
    'about.title': 'About Invelar',
    'about.mission.title': 'Our Mission',
    'about.mission.description': 'To democratize enterprise-grade AI automation, making cutting-edge technology accessible to businesses of all sizes. We believe every company deserves the competitive edge that comes from intelligent, self-optimizing systems that work tirelessly to drive growth and efficiency.',
    'about.vision.title': 'Our Vision',
    'about.vision.description': 'To create a world where businesses operate with unprecedented efficiency through AI-powered automation. We envision organizations that adapt, learn, and evolve autonomously, freeing human talent to focus on innovation, creativity, and strategic growth initiatives.',
    
    // What Sets Invelar Apart Section
    'about.whatSetsUsApart.title': 'What Sets Invelar Apart',
    'about.whatSetsUsApart.feature1.title': 'Lightning-Fast Implementation',
    'about.whatSetsUsApart.feature1.description': 'Our proprietary automation frameworks enable rapid deployment of complex AI systems. What traditionally takes months, we deliver in weeks, getting you to ROI faster than ever before.',
    'about.whatSetsUsApart.feature2.title': 'Enterprise-Grade Security',
    'about.whatSetsUsApart.feature2.description': 'Built with security-first architecture, our solutions meet the highest industry standards. Your data remains protected while our AI systems work seamlessly within your existing security protocols.',
    'about.whatSetsUsApart.feature3.title': 'Measurable Results',
    'about.whatSetsUsApart.feature3.description': 'Every automation we deploy comes with comprehensive analytics and KPI tracking. We don\'t just promise efficiency—we prove it with real-time data and transparent reporting.',
    
    // Why Choose Invelar Section
    'about.whyChoose.title': 'Why Leading Companies Choose Invelar',
    'about.whyChoose.feature1.title': 'Proven Track Record',
    'about.whyChoose.feature1.description': '500+ successful implementations across diverse industries',
    'about.whyChoose.feature2.title': 'Expert Team',
    'about.whyChoose.feature2.description': 'AI specialists, automation engineers, and industry veterans',
    'about.whyChoose.feature3.title': 'Rapid ROI',
    'about.whyChoose.feature3.description': 'Average 6-month payback period on automation investments',
    'about.whyChoose.feature4.title': '24/7 Support',
    'about.whyChoose.feature4.description': 'Continuous monitoring and optimization of your AI systems',
    'about.whyChoose.description': 'At Invelar, we\'re not just service providers—we\'re strategic partners in your digital transformation journey. Our team of AI specialists, automation engineers, and industry experts work collaboratively to understand your unique challenges and craft bespoke solutions that deliver measurable results. We combine cutting-edge technology with deep business acumen to create automation systems that don\'t just work—they excel, adapt, and continuously improve to keep you ahead of the competition.',
    
    // Power of Automation Section
    'power.title': 'The Power of Automation',
    'power.stat1.value': '30%',
    'power.stat1.label': 'Cost Reduction',
    'power.stat2.value': '50+',
    'power.stat2.label': 'Hours Saved Weekly',
    'power.stat3.value': '300%',
    'power.stat3.label': 'Productivity Increase',
    'power.description': 'Invelar leverages cutting-edge large language models and API integrations to create sophisticated automation pipelines. Our solutions don\'t just replace manual tasks—they intelligently optimize processes, predict bottlenecks, and continuously improve performance to scale your operations exponentially.',
    
    // Services Section
    'services.title': 'Our Services',
    'services.subtitle': 'From intelligent automation to custom AI solutions, we provide comprehensive services to transform your business operations and drive unprecedented growth.',
    'services.workflow.title': 'Workflow Automation',
    'services.workflow.description': 'We transform repetitive manual processes into intelligent, self-executing workflows. Our automation solutions reduce human error by 95% while freeing your team to focus on strategic initiatives that drive revenue growth.',
    'services.workflow.feature1': 'Process mapping & optimization',
    'services.workflow.feature2': 'Multi-platform integrations',
    'services.workflow.feature3': 'Real-time monitoring & alerts',
    'services.workflow.feature4': 'Scalable automation pipelines',
    'services.aiAgents.title': 'AI Agents & Assistants',
    'services.aiAgents.description': 'We deploy sophisticated AI agents that learn from your business patterns and make autonomous decisions. These intelligent systems work 24/7 to optimize operations, predict bottlenecks, and continuously improve performance.',
    'services.aiAgents.feature1': 'Custom AI model training',
    'services.aiAgents.feature2': 'Natural language processing',
    'services.aiAgents.feature3': 'Predictive analytics',
    'services.aiAgents.feature4': 'Autonomous decision making',
    'services.chatbot.title': 'AI Chatbot Implementation',
    'services.chatbot.description': 'We revolutionize customer service with intelligent chatbots that understand context, handle complex queries, and provide personalized responses. Reduce response times by 90% while improving customer satisfaction.',
    'services.chatbot.feature1': 'Multi-language support',
    'services.chatbot.feature2': 'CRM integration',
    'services.chatbot.feature3': 'Lead qualification',
    'services.chatbot.feature4': '24/7 customer support',
    'services.website.title': 'Website Creation & Optimization',
    'services.website.description': 'We build high-converting, AI-powered websites that adapt to user behavior and optimize themselves for maximum engagement. Our sites integrate seamlessly with your automation ecosystem.',
    'services.website.feature1': 'Responsive design',
    'services.website.feature2': 'SEO optimization',
    'services.website.feature3': 'Analytics integration',
    'services.website.feature4': 'Conversion optimization',
    'services.email.title': 'Automated Email Systems',
    'services.email.description': 'We create intelligent email campaigns that personalize content, optimize send times, and nurture leads automatically. Increase open rates by 40% and conversions by 60% with AI-driven email automation.',
    'services.email.feature1': 'Behavioral triggers',
    'services.email.feature2': 'A/B testing automation',
    'services.email.feature3': 'Personalization at scale',
    'services.email.feature4': 'Advanced segmentation',
    'services.calling.title': 'AI Calling Systems',
    'services.calling.description': 'We deploy AI-powered calling systems for lead qualification, appointment setting, and customer follow-ups. Our voice AI handles thousands of calls simultaneously with human-like conversation quality.',
    'services.calling.feature1': 'Natural voice synthesis',
    'services.calling.feature2': 'Call scheduling',
    'services.calling.feature3': 'Lead scoring',
    'services.calling.feature4': 'CRM synchronization',
    'services.custom.title': 'Custom Integrations & Solutions',
    'services.custom.description': 'Every business is unique. We create bespoke automation solutions that integrate seamlessly with your existing technology stack, ensuring minimal disruption while maximizing efficiency gains.',
    'services.custom.feature1.title': 'API Integrations',
    'services.custom.feature1.description': 'We connect any software, database, or service with intelligent automation bridges',
    'services.custom.feature2.title': 'Legacy System Modernization',
    'services.custom.feature2.description': 'We breathe new life into old systems with AI-powered automation layers',
    'services.custom.feature3.title': 'Scalable Architecture',
    'services.custom.feature3.description': 'We provide future-proof solutions that grow with your business needs',
    
    // Testimonials Section
    'testimonials.title': 'What Our Clients Say',
    'testimonials.testimonial1': 'Invelar transformed our customer service operations completely. What used to take our team 40 hours a week now runs automatically, and our response times improved by 85%. The ROI was evident within the first month.',
    'testimonials.author1': 'Sarah Chen',
    'testimonials.testimonial2': 'The AI agents Invelar deployed have revolutionized our data processing workflows. We\'re now handling 10x the volume with the same team size, and accuracy has improved dramatically. It\'s like having a team that never sleeps.',
    'testimonials.author2': 'Marcus Rodriguez',
    
    // CTA Section
    'cta.title': 'Ready to Transform Your Operations?',
    'cta.subtitle': 'Join hundreds of companies already using Invelar to automate their way to success. Schedule your free consultation today and discover how AI can revolutionize your business.',
    'cta.button': 'Get Started',
    
    // Contact Form
    'contact.title': 'Get Started Today',
    'contact.subtitle': 'Ready to transform your business with AI automation? Share your details below and our team will reach out to discuss your specific needs and create a customized solution.',
    'contact.firstName': 'First Name',
    'contact.lastName': 'Last Name',
    'contact.email': 'Email Address',
    'contact.phone': 'Phone Number',
    'contact.company': 'Company Name',
    'contact.industry': 'Industry',
    'contact.notes': 'Additional Notes',
    'contact.newsletter': 'Stay Updated',
    'contact.newsletterDescription': 'I would like to receive news, updates, and promotional content from Invelar via email. You can unsubscribe at any time.',
    'contact.submit': 'Get Started',
    'contact.submitting': 'Submitting...',
    'contact.success.title': 'Thank You!',
    'contact.success.message': 'We\'ve received your information and will be in touch within 24 hours to discuss how Invelar can transform your business operations.',
    'contact.success.submitAnother': 'Submit Another Response',
    'contact.success.backHome': 'Back to Home',
    'contact.error.title': 'Submission Failed',
    'contact.error.retry': 'Please try again later.',
    'contact.whatHappensNext.title': 'What Happens Next?',
    'contact.whatHappensNext.step1.title': 'Initial Consultation',
    'contact.whatHappensNext.step1.description': 'We\'ll schedule a free 30-minute call to understand your business needs and automation goals.',
    'contact.whatHappensNext.step2.title': 'Custom Proposal',
    'contact.whatHappensNext.step2.description': 'Receive a tailored automation strategy with clear ROI projections and implementation timeline.',
    'contact.whatHappensNext.step3.title': 'Implementation',
    'contact.whatHappensNext.step3.description': 'Our expert team begins building your custom AI automation solution with regular progress updates.',
    'contact.privacyNotice': 'By submitting this form, you agree to our privacy policy and terms of service. We respect your privacy and will never share your information with third parties.',
    
    // Footer
    'footer.tagline': 'Intelligent automation for the modern enterprise. Transform your business with AI.',
    'footer.company': 'Company',
    'footer.legal': 'Legal',
    'footer.privacyPolicy': 'Privacy Policy',
    'footer.termsOfService': 'Terms of Service',
    'footer.cookiePolicy': 'Cookie Policy',
    'footer.copyright': '© 2025 Invelar. All rights reserved.',
    
    // Language Popup
    'language.title': 'Choose Your Language',
    'language.subtitle': 'Select your preferred language to continue',
    'language.english': 'Continue in English',
    'language.portuguese': 'Continuar em Português',
    'language.french': 'Continuer en Français',
    'language.note': 'You can change your language preference at any time in settings',
    
    // Chatbot
    'chatbot.title': 'Invelar AI Assistant',
    'chatbot.subtitle': 'Always here to help',
    'chatbot.thinking': 'Thinking...',
    'chatbot.placeholder': 'Ask me about Invelar\'s AI automation...',
    'chatbot.disclaimer': 'AI responses are for informational purposes. Contact us directly for detailed assistance.',
    
    // Meta and Alt Text
    'meta.title': 'Invelar - Intelligent Automation for the Modern Enterprise',
    'meta.description': 'Transform your business with AI-powered automation. Streamline processes, reduce costs, and accelerate growth with Invelar\'s intelligent automation solutions.',
    'alt.logo': 'Invelar Logo',
    'alt.heroImage': 'AI Automation Visualization',
  },
  pt: {
    // Navigation
    'nav.about': 'Sobre',
    'nav.services': 'Serviços',
    'nav.testimonials': 'Testemunhos',
    'nav.contact': 'Contacto',
    'nav.getStarted': 'Começar',
    'nav.aiChat': 'Chat IA',
    
    // Hero Section
    'hero.tagline': 'Capacitando todas as empresas com automação inteligente de IA para um futuro eficiente.',
    'hero.getStarted': 'Comece Hoje',
    
    // About Section
    'about.title': 'Sobre a Invelar',
    'about.mission.title': 'Nossa Missão',
    'about.mission.description': 'Democratizar a automação de IA de nível empresarial, tornando a tecnologia de ponta acessível a empresas de todos os tamanhos. Acreditamos que todas as empresas merecem a vantagem competitiva que vem de sistemas inteligentes e auto-otimizados que trabalham incansavelmente para impulsionar o crescimento e a eficiência.',
    'about.vision.title': 'Nossa Visão',
    'about.vision.description': 'Criar um mundo onde as empresas operam com eficiência sem precedentes através da automação alimentada por IA. Vislumbramos organizações que se adaptam, aprendem e evoluem autonomamente, libertando o talento humano para se concentrar na inovação, criatividade e iniciativas de crescimento estratégico.',
    
    // What Sets Invelar Apart Section
    'about.whatSetsUsApart.title': 'O Que Distingue a Invelar',
    'about.whatSetsUsApart.feature1.title': 'Implementação Ultra-Rápida',
    'about.whatSetsUsApart.feature1.description': 'Nossos frameworks proprietários de automação permitem a implantação rápida de sistemas de IA complexos. O que tradicionalmente leva meses, entregamos em semanas, levando você ao ROI mais rápido do que nunca.',
    'about.whatSetsUsApart.feature2.title': 'Segurança de Nível Empresarial',
    'about.whatSetsUsApart.feature2.description': 'Construído com arquitetura de segurança em primeiro lugar, nossas soluções atendem aos mais altos padrões da indústria. Seus dados permanecem protegidos enquanto nossos sistemas de IA trabalham perfeitamente dentro de seus protocolos de segurança existentes.',
    'about.whatSetsUsApart.feature3.title': 'Resultados Mensuráveis',
    'about.whatSetsUsApart.feature3.description': 'Cada automação que implantamos vem com análises abrangentes e rastreamento de KPIs. Não apenas prometemos eficiência—provamos isso com dados em tempo real e relatórios transparentes.',
    
    // Why Choose Invelar Section
    'about.whyChoose.title': 'Por Que Empresas Líderes Escolhem a Invelar',
    'about.whyChoose.feature1.title': 'Histórico Comprovado',
    'about.whyChoose.feature1.description': '500+ implementações bem-sucedidas em diversas indústrias',
    'about.whyChoose.feature2.title': 'Equipe Especializada',
    'about.whyChoose.feature2.description': 'Especialistas em IA, engenheiros de automação e veteranos da indústria',
    'about.whyChoose.feature3.title': 'ROI Rápido',
    'about.whyChoose.feature3.description': 'Período médio de retorno de 6 meses em investimentos de automação',
    'about.whyChoose.feature4.title': 'Suporte 24/7',
    'about.whyChoose.feature4.description': 'Monitoramento contínuo e otimização dos seus sistemas de IA',
    'about.whyChoose.description': 'Na Invelar, não somos apenas fornecedores de serviços—somos parceiros estratégicos na sua jornada de transformação digital. Nossa equipe de especialistas em IA, engenheiros de automação e especialistas da indústria trabalham colaborativamente para entender seus desafios únicos e criar soluções sob medida que entregam resultados mensuráveis. Combinamos tecnologia de ponta com profundo conhecimento empresarial para criar sistemas de automação que não apenas funcionam—eles se destacam, se adaptam e melhoram continuamente para mantê-lo à frente da concorrência.',
    
    // Power of Automation Section
    'power.title': 'O Poder da Automação',
    'power.stat1.value': '30%',
    'power.stat1.label': 'Redução de Custos',
    'power.stat2.value': '50+',
    'power.stat2.label': 'Horas Poupadas Semanalmente',
    'power.stat3.value': '300%',
    'power.stat3.label': 'Aumento de Produtividade',
    'power.description': 'A Invelar aproveita modelos de linguagem de ponta e integrações de API para criar pipelines de automação sofisticados. Nossas soluções não apenas substituem tarefas manuais—elas otimizam processos de forma inteligente, preveem gargalos e melhoram continuamente o desempenho para escalar suas operações exponencialmente.',
    
    // Services Section
    'services.title': 'Nossos Serviços',
    'services.subtitle': 'Da automação inteligente às soluções de IA personalizadas, fornecemos serviços abrangentes para transformar suas operações comerciais e impulsionar um crescimento sem precedentes.',
    'services.workflow.title': 'Automação de Fluxo de Trabalho',
    'services.workflow.description': 'Transformamos processos manuais repetitivos em fluxos de trabalho inteligentes e auto-executáveis. Nossas soluções de automação reduzem o erro humano em 95% enquanto liberam sua equipe para focar em iniciativas estratégicas que impulsionam o crescimento da receita.',
    'services.workflow.feature1': 'Mapeamento e otimização de processos',
    'services.workflow.feature2': 'Integrações multi-plataforma',
    'services.workflow.feature3': 'Monitoramento e alertas em tempo real',
    'services.workflow.feature4': 'Pipelines de automação escaláveis',
    'services.aiAgents.title': 'Agentes e Assistentes de IA',
    'services.aiAgents.description': 'Implantamos agentes de IA sofisticados que aprendem com os padrões do seu negócio e tomam decisões autônomas. Esses sistemas inteligentes trabalham 24/7 para otimizar operações, prever gargalos e melhorar continuamente o desempenho.',
    'services.aiAgents.feature1': 'Treinamento de modelo de IA personalizado',
    'services.aiAgents.feature2': 'Processamento de linguagem natural',
    'services.aiAgents.feature3': 'Análise preditiva',
    'services.aiAgents.feature4': 'Tomada de decisão autônoma',
    'services.chatbot.title': 'Implementação de Chatbot de IA',
    'services.chatbot.description': 'Revolucionamos o atendimento ao cliente com chatbots inteligentes que entendem contexto, lidam com consultas complexas e fornecem respostas personalizadas. Reduza os tempos de resposta em 90% enquanto melhora a satisfação do cliente.',
    'services.chatbot.feature1': 'Suporte multi-idioma',
    'services.chatbot.feature2': 'Integração com CRM',
    'services.chatbot.feature3': 'Qualificação de leads',
    'services.chatbot.feature4': 'Suporte ao cliente 24/7',
    'services.website.title': 'Criação e Otimização de Sites',
    'services.website.description': 'Construímos sites de alta conversão alimentados por IA que se adaptam ao comportamento do usuário e se otimizam para máximo engajamento. Nossos sites se integram perfeitamente com seu ecossistema de automação.',
    'services.website.feature1': 'Design responsivo',
    'services.website.feature2': 'Otimização SEO',
    'services.website.feature3': 'Integração de análises',
    'services.website.feature4': 'Otimização de conversão',
    'services.email.title': 'Sistemas de Email Automatizados',
    'services.email.description': 'Criamos campanhas de email inteligentes que personalizam conteúdo, otimizam horários de envio e nutrem leads automaticamente. Aumente as taxas de abertura em 40% e conversões em 60% com automação de email orientada por IA.',
    'services.email.feature1': 'Gatilhos comportamentais',
    'services.email.feature2': 'Automação de testes A/B',
    'services.email.feature3': 'Personalização em escala',
    'services.email.feature4': 'Segmentação avançada',
    'services.calling.title': 'Sistemas de Chamadas de IA',
    'services.calling.description': 'Implantamos sistemas de chamadas alimentados por IA para qualificação de leads, agendamento de compromissos e acompanhamento de clientes. Nossa IA de voz lida com milhares de chamadas simultaneamente com qualidade de conversa semelhante à humana.',
    'services.calling.feature1': 'Síntese de voz natural',
    'services.calling.feature2': 'Agendamento de chamadas',
    'services.calling.feature3': 'Pontuação de leads',
    'services.calling.feature4': 'Sincronização com CRM',
    'services.custom.title': 'Integrações e Soluções Personalizadas',
    'services.custom.description': 'Cada negócio é único. Criamos soluções de automação sob medida que se integram perfeitamente com sua pilha de tecnologia existente, garantindo interrupção mínima enquanto maximiza ganhos de eficiência.',
    'services.custom.feature1.title': 'Integrações de API',
    'services.custom.feature1.description': 'Conectamos qualquer software, banco de dados ou serviço com pontes de automação inteligentes',
    'services.custom.feature2.title': 'Modernização de Sistemas Legados',
    'services.custom.feature2.description': 'Damos nova vida a sistemas antigos com camadas de automação alimentadas por IA',
    'services.custom.feature3.title': 'Arquitetura Escalável',
    'services.custom.feature3.description': 'Fornecemos soluções à prova de futuro que crescem com suas necessidades de negócio',
    
    // Testimonials Section
    'testimonials.title': 'O Que Nossos Clientes Dizem',
    'testimonials.testimonial1': 'A Invelar transformou completamente nossas operações de atendimento ao cliente. O que costumava levar 40 horas por semana da nossa equipe agora funciona automaticamente, e nossos tempos de resposta melhoraram em 85%. O ROI foi evidente no primeiro mês.',
    'testimonials.author1': 'Sarah Chen',
    'testimonials.testimonial2': 'Os agentes de IA que a Invelar implantou revolucionaram nossos fluxos de trabalho de processamento de dados. Agora estamos lidando com 10x o volume com o mesmo tamanho de equipe, e a precisão melhorou drasticamente. É como ter uma equipe que nunca dorme.',
    'testimonials.author2': 'Marcus Rodriguez',
    
    // CTA Section
    'cta.title': 'Pronto para Transformar suas Operações?',
    'cta.subtitle': 'Junte-se a centenas de empresas que já usam a Invelar para automatizar seu caminho para o sucesso. Agende sua consulta gratuita hoje e descubra como a IA pode revolucionar seu negócio.',
    'cta.button': 'Começar',
    
    // Contact Form
    'contact.title': 'Comece Hoje',
    'contact.subtitle': 'Pronto para transformar seu negócio com automação de IA? Compartilhe seus detalhes abaixo e nossa equipe entrará em contato para discutir suas necessidades específicas e criar uma solução personalizada.',
    'contact.firstName': 'Primeiro Nome',
    'contact.lastName': 'Último Nome',
    'contact.email': 'Endereço de Email',
    'contact.phone': 'Número de Telefone',
    'contact.company': 'Nome da Empresa',
    'contact.industry': 'Indústria',
    'contact.notes': 'Notas Adicionais',
    'contact.newsletter': 'Manter-se Atualizado',
    'contact.newsletterDescription': 'Gostaria de receber notícias, atualizações e conteúdo promocional da Invelar por email. Você pode cancelar a inscrição a qualquer momento.',
    'contact.submit': 'Começar',
    'contact.submitting': 'Enviando...',
    'contact.success.title': 'Obrigado!',
    'contact.success.message': 'Recebemos suas informações e entraremos em contato em até 24 horas para discutir como a Invelar pode transformar suas operações comerciais.',
    'contact.success.submitAnother': 'Enviar Outra Resposta',
    'contact.success.backHome': 'Voltar ao Início',
    'contact.error.title': 'Falha no Envio',
    'contact.error.retry': 'Tente novamente mais tarde.',
    'contact.whatHappensNext.title': 'O Que Acontece Agora?',
    'contact.whatHappensNext.step1.title': 'Consulta Inicial',
    'contact.whatHappensNext.step1.description': 'Agendaremos uma chamada gratuita de 30 minutos para entender suas necessidades de negócio e objetivos de automação.',
    'contact.whatHappensNext.step2.title': 'Proposta Personalizada',
    'contact.whatHappensNext.step2.description': 'Receba uma estratégia de automação sob medida com projeções claras de ROI e cronograma de implementação.',
    'contact.whatHappensNext.step3.title': 'Implementação',
    'contact.whatHappensNext.step3.description': 'Nossa equipe especializada começa a construir sua solução de automação de IA personalizada com atualizações regulares de progresso.',
    'contact.privacyNotice': 'Ao enviar este formulário, você concorda com nossa política de privacidade e termos de serviço. Respeitamos sua privacidade e nunca compartilharemos suas informações com terceiros.',
    
    // Footer
    'footer.tagline': 'Automação inteligente para a empresa moderna. Transforme seu negócio com IA.',
    'footer.company': 'Empresa',
    'footer.legal': 'Legal',
    'footer.privacyPolicy': 'Política de Privacidade',
    'footer.termsOfService': 'Termos de Serviço',
    'footer.cookiePolicy': 'Política de Cookies',
    'footer.copyright': '© 2025 Invelar. Todos os direitos reservados.',
    
    // Language Popup
    'language.title': 'Escolha Seu Idioma',
    'language.subtitle': 'Selecione seu idioma preferido para continuar',
    'language.english': 'Continue in English',
    'language.portuguese': 'Continuar em Português',
    'language.french': 'Continuer en Français',
    'language.note': 'Você pode alterar sua preferência de idioma a qualquer momento nas configurações',
    
    // Chatbot
    'chatbot.title': 'Assistente de IA da Invelar',
    'chatbot.subtitle': 'Sempre aqui para ajudar',
    'chatbot.thinking': 'Pensando...',
    'chatbot.placeholder': 'Pergunte-me sobre a automação de IA da Invelar...',
    'chatbot.disclaimer': 'As respostas da IA são para fins informativos. Entre em contato conosco diretamente para assistência detalhada.',
    
    // Meta and Alt Text
    'meta.title': 'Invelar - Automação Inteligente para a Empresa Moderna',
    'meta.description': 'Transforme seu negócio com automação alimentada por IA. Simplifique processos, reduza custos e acelere o crescimento com as soluções de automação inteligente da Invelar.',
    'alt.logo': 'Logo da Invelar',
    'alt.heroImage': 'Visualização de Automação de IA',
  },
  fr: {
    // Navigation
    'nav.about': 'À Propos',
    'nav.services': 'Services',
    'nav.testimonials': 'Témoignages',
    'nav.contact': 'Contact',
    'nav.getStarted': 'Commencer',
    'nav.aiChat': 'Chat IA',
    
    // Hero Section
    'hero.tagline': 'Autonomiser chaque entreprise avec une automatisation IA intelligente pour un avenir efficace.',
    'hero.getStarted': 'Commencez Aujourd\'hui',
    
    // About Section
    'about.title': 'À Propos d\'Invelar',
    'about.mission.title': 'Notre Mission',
    'about.mission.description': 'Démocratiser l\'automatisation IA de niveau entreprise, rendant la technologie de pointe accessible aux entreprises de toutes tailles. Nous croyons que chaque entreprise mérite l\'avantage concurrentiel qui vient des systèmes intelligents et auto-optimisés qui travaillent sans relâche pour stimuler la croissance et l\'efficacité.',
    'about.vision.title': 'Notre Vision',
    'about.vision.description': 'Créer un monde où les entreprises opèrent avec une efficacité sans précédent grâce à l\'automatisation alimentée par l\'IA. Nous envisageons des organisations qui s\'adaptent, apprennent et évoluent de manière autonome, libérant le talent humain pour se concentrer sur l\'innovation, la créativité et les initiatives de croissance stratégique.',
    
    // What Sets Invelar Apart Section
    'about.whatSetsUsApart.title': 'Ce Qui Distingue Invelar',
    'about.whatSetsUsApart.feature1.title': 'Implémentation Ultra-Rapide',
    'about.whatSetsUsApart.feature1.description': 'Nos frameworks d\'automatisation propriétaires permettent un déploiement rapide de systèmes IA complexes. Ce qui prend traditionnellement des mois, nous le livrons en semaines, vous amenant au ROI plus rapidement que jamais.',
    'about.whatSetsUsApart.feature2.title': 'Sécurité de Niveau Entreprise',
    'about.whatSetsUsApart.feature2.description': 'Construites avec une architecture axée sur la sécurité, nos solutions répondent aux plus hauts standards de l\'industrie. Vos données restent protégées tandis que nos systèmes IA fonctionnent parfaitement dans vos protocoles de sécurité existants.',
    'about.whatSetsUsApart.feature3.title': 'Résultats Mesurables',
    'about.whatSetsUsApart.feature3.description': 'Chaque automatisation que nous déployons est accompagnée d\'analyses complètes et de suivi des KPI. Nous ne promettons pas seulement l\'efficacité—nous la prouvons avec des données en temps réel et des rapports transparents.',
    
    // Why Choose Invelar Section
    'about.whyChoose.title': 'Pourquoi les Entreprises Leaders Choisissent Invelar',
    'about.whyChoose.feature1.title': 'Historique Prouvé',
    'about.whyChoose.feature1.description': '500+ implémentations réussies dans diverses industries',
    'about.whyChoose.feature2.title': 'Équipe Experte',
    'about.whyChoose.feature2.description': 'Spécialistes IA, ingénieurs d\'automatisation et vétérans de l\'industrie',
    'about.whyChoose.feature3.title': 'ROI Rapide',
    'about.whyChoose.feature3.description': 'Période de retour moyenne de 6 mois sur les investissements d\'automatisation',
    'about.whyChoose.feature4.title': 'Support 24/7',
    'about.whyChoose.feature4.description': 'Surveillance continue et optimisation de vos systèmes IA',
    'about.whyChoose.description': 'Chez Invelar, nous ne sommes pas seulement des fournisseurs de services—nous sommes des partenaires stratégiques dans votre parcours de transformation numérique. Notre équipe de spécialistes IA, d\'ingénieurs d\'automatisation et d\'experts de l\'industrie travaillent en collaboration pour comprendre vos défis uniques et créer des solutions sur mesure qui livrent des résultats mesurables. Nous combinons une technologie de pointe avec une expertise commerciale approfondie pour créer des systèmes d\'automatisation qui ne fonctionnent pas seulement—ils excellent, s\'adaptent et s\'améliorent continuellement pour vous garder en avance sur la concurrence.',
    
    // Power of Automation Section
    'power.title': 'Le Pouvoir de l\'Automatisation',
    'power.stat1.value': '30%',
    'power.stat1.label': 'Réduction des Coûts',
    'power.stat2.value': '50+',
    'power.stat2.label': 'Heures Économisées par Semaine',
    'power.stat3.value': '300%',
    'power.stat3.label': 'Augmentation de Productivité',
    'power.description': 'Invelar exploite des modèles de langage de pointe et des intégrations API pour créer des pipelines d\'automatisation sophistiqués. Nos solutions ne remplacent pas seulement les tâches manuelles—elles optimisent intelligemment les processus, prédisent les goulots d\'étranglement et améliorent continuellement les performances pour faire évoluer vos opérations de manière exponentielle.',
    
    // Services Section
    'services.title': 'Nos Services',
    'services.subtitle': 'De l\'automatisation intelligente aux solutions IA personnalisées, nous fournissons des services complets pour transformer vos opérations commerciales et stimuler une croissance sans précédent.',
    'services.workflow.title': 'Automatisation des Flux de Travail',
    'services.workflow.description': 'Nous transformons les processus manuels répétitifs en flux de travail intelligents et auto-exécutables. Nos solutions d\'automatisation réduisent l\'erreur humaine de 95% tout en libérant votre équipe pour se concentrer sur des initiatives stratégiques qui stimulent la croissance des revenus.',
    'services.workflow.feature1': 'Cartographie et optimisation des processus',
    'services.workflow.feature2': 'Intégrations multi-plateformes',
    'services.workflow.feature3': 'Surveillance et alertes en temps réel',
    'services.workflow.feature4': 'Pipelines d\'automatisation évolutifs',
    'services.aiAgents.title': 'Agents et Assistants IA',
    'services.aiAgents.description': 'Nous déployons des agents IA sophistiqués qui apprennent de vos modèles commerciaux et prennent des décisions autonomes. Ces systèmes intelligents travaillent 24/7 pour optimiser les opérations, prédire les goulots d\'étranglement et améliorer continuellement les performances.',
    'services.aiAgents.feature1': 'Formation de modèle IA personnalisé',
    'services.aiAgents.feature2': 'Traitement du langage naturel',
    'services.aiAgents.feature3': 'Analyse prédictive',
    'services.aiAgents.feature4': 'Prise de décision autonome',
    'services.chatbot.title': 'Implémentation de Chatbot IA',
    'services.chatbot.description': 'Nous révolutionnons le service client avec des chatbots intelligents qui comprennent le contexte, gèrent des requêtes complexes et fournissent des réponses personnalisées. Réduisez les temps de réponse de 90% tout en améliorant la satisfaction client.',
    'services.chatbot.feature1': 'Support multilingue',
    'services.chatbot.feature2': 'Intégration CRM',
    'services.chatbot.feature3': 'Qualification des prospects',
    'services.chatbot.feature4': 'Support client 24/7',
    'services.website.title': 'Création et Optimisation de Sites Web',
    'services.website.description': 'Nous construisons des sites web à haute conversion alimentés par l\'IA qui s\'adaptent au comportement des utilisateurs et s\'optimisent pour un engagement maximal. Nos sites s\'intègrent parfaitement avec votre écosystème d\'automatisation.',
    'services.website.feature1': 'Design responsive',
    'services.website.feature2': 'Optimisation SEO',
    'services.website.feature3': 'Intégration d\'analyses',
    'services.website.feature4': 'Optimisation de conversion',
    'services.email.title': 'Systèmes d\'Email Automatisés',
    'services.email.description': 'Nous créons des campagnes email intelligentes qui personnalisent le contenu, optimisent les heures d\'envoi et nourrissent automatiquement les prospects. Augmentez les taux d\'ouverture de 40% et les conversions de 60% avec l\'automatisation email pilotée par l\'IA.',
    'services.email.feature1': 'Déclencheurs comportementaux',
    'services.email.feature2': 'Automatisation des tests A/B',
    'services.email.feature3': 'Personnalisation à grande échelle',
    'services.email.feature4': 'Segmentation avancée',
    'services.calling.title': 'Systèmes d\'Appels IA',
    'services.calling.description': 'Nous déployons des systèmes d\'appels alimentés par l\'IA pour la qualification des prospects, la prise de rendez-vous et le suivi client. Notre IA vocale gère des milliers d\'appels simultanément avec une qualité de conversation semblable à celle d\'un humain.',
    'services.calling.feature1': 'Synthèse vocale naturelle',
    'services.calling.feature2': 'Planification d\'appels',
    'services.calling.feature3': 'Notation des prospects',
    'services.calling.feature4': 'Synchronisation CRM',
    'services.custom.title': 'Intégrations et Solutions Personnalisées',
    'services.custom.description': 'Chaque entreprise est unique. Nous créons des solutions d\'automatisation sur mesure qui s\'intègrent parfaitement avec votre pile technologique existante, garantissant une perturbation minimale tout en maximisant les gains d\'efficacité.',
    'services.custom.feature1.title': 'Intégrations API',
    'services.custom.feature1.description': 'Nous connectons tout logiciel, base de données ou service avec des ponts d\'automatisation intelligents',
    'services.custom.feature2.title': 'Modernisation des Systèmes Hérités',
    'services.custom.feature2.description': 'Nous donnons une nouvelle vie aux anciens systèmes avec des couches d\'automatisation alimentées par l\'IA',
    'services.custom.feature3.title': 'Architecture Évolutive',
    'services.custom.feature3.description': 'Nous fournissons des solutions à l\'épreuve du futur qui grandissent avec vos besoins commerciaux',
    
    // Testimonials Section
    'testimonials.title': 'Ce Que Disent Nos Clients',
    'testimonials.testimonial1': 'Invelar a complètement transformé nos opérations de service client. Ce qui prenait 40 heures par semaine à notre équipe fonctionne maintenant automatiquement, et nos temps de réponse se sont améliorés de 85%. Le ROI était évident dès le premier mois.',
    'testimonials.author1': 'Sarah Chen',
    'testimonials.testimonial2': 'Les agents IA qu\'Invelar a déployés ont révolutionné nos flux de travail de traitement des données. Nous gérons maintenant 10 fois le volume avec la même taille d\'équipe, et la précision s\'est considérablement améliorée. C\'est comme avoir une équipe qui ne dort jamais.',
    'testimonials.author2': 'Marcus Rodriguez',
    
    // CTA Section
    'cta.title': 'Prêt à Transformer vos Opérations?',
    'cta.subtitle': 'Rejoignez des centaines d\'entreprises qui utilisent déjà Invelar pour automatiser leur chemin vers le succès. Planifiez votre consultation gratuite aujourd\'hui et découvrez comment l\'IA peut révolutionner votre entreprise.',
    'cta.button': 'Commencer',
    
    // Contact Form
    'contact.title': 'Commencez Aujourd\'hui',
    'contact.subtitle': 'Prêt à transformer votre entreprise avec l\'automatisation IA? Partagez vos détails ci-dessous et notre équipe vous contactera pour discuter de vos besoins spécifiques et créer une solution personnalisée.',
    'contact.firstName': 'Prénom',
    'contact.lastName': 'Nom de Famille',
    'contact.email': 'Adresse Email',
    'contact.phone': 'Numéro de Téléphone',
    'contact.company': 'Nom de l\'Entreprise',
    'contact.industry': 'Industrie',
    'contact.notes': 'Notes Supplémentaires',
    'contact.newsletter': 'Rester à Jour',
    'contact.newsletterDescription': 'J\'aimerais recevoir des nouvelles, des mises à jour et du contenu promotionnel d\'Invelar par email. Vous pouvez vous désabonner à tout moment.',
    'contact.submit': 'Commencer',
    'contact.submitting': 'Envoi en cours...',
    'contact.success.title': 'Merci!',
    'contact.success.message': 'Nous avons reçu vos informations et vous contacterons dans les 24 heures pour discuter de la façon dont Invelar peut transformer vos opérations commerciales.',
    'contact.success.submitAnother': 'Soumettre une Autre Réponse',
    'contact.success.backHome': 'Retour à l\'Accueil',
    'contact.error.title': 'Échec de l\'Envoi',
    'contact.error.retry': 'Veuillez réessayer plus tard.',
    'contact.whatHappensNext.title': 'Que Se Passe-t-il Ensuite?',
    'contact.whatHappensNext.step1.title': 'Consultation Initiale',
    'contact.whatHappensNext.step1.description': 'Nous programmerons un appel gratuit de 30 minutes pour comprendre vos besoins commerciaux et objectifs d\'automatisation.',
    'contact.whatHappensNext.step2.title': 'Proposition Personnalisée',
    'contact.whatHappensNext.step2.description': 'Recevez une stratégie d\'automatisation sur mesure avec des projections ROI claires et un calendrier d\'implémentation.',
    'contact.whatHappensNext.step3.title': 'Implémentation',
    'contact.whatHappensNext.step3.description': 'Notre équipe d\'experts commence à construire votre solution d\'automatisation IA personnalisée avec des mises à jour régulières sur les progrès.',
    'contact.privacyNotice': 'En soumettant ce formulaire, vous acceptez notre politique de confidentialité et nos conditions de service. Nous respectons votre vie privée et ne partagerons jamais vos informations avec des tiers.',
    
    // Footer
    'footer.tagline': 'Automatisation intelligente pour l\'entreprise moderne. Transformez votre entreprise avec l\'IA.',
    'footer.company': 'Entreprise',
    'footer.legal': 'Légal',
    'footer.privacyPolicy': 'Politique de Confidentialité',
    'footer.termsOfService': 'Conditions de Service',
    'footer.cookiePolicy': 'Politique des Cookies',
    'footer.copyright': '© 2025 Invelar. Tous droits réservés.',
    
    // Language Popup
    'language.title': 'Choisissez Votre Langue',
    'language.subtitle': 'Sélectionnez votre langue préférée pour continuer',
    'language.english': 'Continue in English',
    'language.portuguese': 'Continuar em Português',
    'language.french': 'Continuer en Français',
    'language.note': 'Vous pouvez changer votre préférence de langue à tout moment dans les paramètres',
    
    // Chatbot
    'chatbot.title': 'Assistant IA d\'Invelar',
    'chatbot.subtitle': 'Toujours là pour vous aider',
    'chatbot.thinking': 'Réflexion...',
    'chatbot.placeholder': 'Demandez-moi à propos de l\'automatisation IA d\'Invelar...',
    'chatbot.disclaimer': 'Les réponses IA sont à des fins informatives. Contactez-nous directement pour une assistance détaillée.',
    
    // Meta and Alt Text
    'meta.title': 'Invelar - Automatisation Intelligente pour l\'Entreprise Moderne',
    'meta.description': 'Transformez votre entreprise avec l\'automatisation alimentée par l\'IA. Rationalisez les processus, réduisez les coûts et accélérez la croissance avec les solutions d\'automatisation intelligente d\'Invelar.',
    'alt.logo': 'Logo Invelar',
    'alt.heroImage': 'Visualisation de l\'Automatisation IA',
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const languageHook = useLanguage();

  const t = (key: string): string => {
    const translation = translations[languageHook.currentLanguage]?.[key as keyof typeof translations['en']];
    return translation || key;
  };

  return (
    <LanguageContext.Provider value={{ ...languageHook, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguageContext() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguageContext must be used within a LanguageProvider');
  }
  return context;
}