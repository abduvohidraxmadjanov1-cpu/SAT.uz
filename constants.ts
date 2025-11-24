
import { Page, PricingTier } from './types';
import { 
  Target, 
  TrendingUp, 
  BookOpen, 
  Award,
  Cpu,
  Globe,
  ShieldCheck,
  Zap
} from 'lucide-react';

export const NAV_ITEMS = [
  { label: 'Asosiy', page: Page.HOME },
  { label: 'Kurslar', pge: Page.COURSE },
  { label: 'Markaz', page: Page.HUB },
  { label: 'Narxlar', page: Page.PRICING },
];

export const HERO_STATS = [
  { label: 'Jami Grantlar', value: '$45M+' },
  { label: 'O\'rtacha O\'sish', value: '+210 Ball' },
  { label: 'Qabul Ko\'rsatkichi', value: '94%' },
  { label: 'Faol O\'quvchilar', value: '12.5k+' },
];

export const FEATURES = [
  {
    title: "Adaptiv Neyro-Tizim",
    description: "Sun'iy intellekt sizning bilim darajangizni 0.1% aniqlikda tahlil qiladi va shaxsiy o'quv strategiyasini tuzadi.",
    icon: Brain,
    stat: "AI Core v4.0"
  },
  {
    title: "Global Simulyatsiya",
    description: "College Board (Bluebook) standartidagi to'liq raqamli imtihon muhiti. Haqiqiy imtihon stressiga tayyorlaning.",
    icon: Laptop,
    stat: "Real Exam"
  },
  {
    title: "Ekspert Kontent",
    description: "Harvard va MIT bitiruvchilari tomonidan tuzilgan 50,000+ original savollar va video tahlillar.",
    icon: BookOpen,
    stat: "Premium"
  },
  {
    title: "Strategik Tahlil",
    description: "Har bir xatongizning tub ildizini aniqlab, uni bartaraf etish uchun aniq yechimlar taklif qiluvchi tahlil.",
    icon: TrendingUp,
    stat: "Analytics"
  }
];

export const PRICING_TIERS: PricingTier[] = [
  {
    name: "Start",
    price: "Bepul",
    features: [
      "Diagnostik Test (To'liq)",
      "Asosiy Video Darslar",
      "Kunlik Mashqlar (Lite)",
      "Cheklangan Analitika"
    ]
  },
  {
    name: "Pro",
    price: "$29",
    features: [
      "Cheksiz Mashqlar Bazasi",
      "Batafsil AI Tushuntirishlar",
      "10 ta To'liq Imtihon (Simulyator)",
      "Smart Flashcardlar (SRS)",
      "Xatolar Ustida Ishlash",
      "Reklamasiz"
    ],
    recommended: true
  },
  {
    name: "Premium",
    price: "$99",
    features: [
      "Barcha Pro Imkoniyatlari",
      "1-ga-1 AI Mentorlik sessiyalari",
      "Insholarni (Essay) Tekshirish",
      "Universitetga Kirish Strategiyasi",
      "Grant Yutish Kafolati*",
      "Premium Qo'llab-quvvatlash 24/7"
    ]
  }
];

// Helper import for icons used in features array but not imported at top
import { Brain, Laptop } from 'lucide-react';
