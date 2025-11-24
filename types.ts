
export enum Page {
  HOME = 'HOME',
  COURSE = 'COURSE',
  HUB = 'HUB',
  ABOUT = 'ABOUT',
  PRICING = 'PRICING',
  BLOG = 'BLOG',
  FOCUS_MODE = 'FOCUS_MODE',
  PRACTICE = 'PRACTICE',
  MCP_HUB = 'MCP_HUB',
  SECURITY = 'SECURITY',
  GEO_MAP = 'GEO_MAP',
  MARKETING = 'MARKETING',
  UNIVERSITY = 'UNIVERSITY',
  GAMES = 'GAMES',
  CV_LAB = 'CV_LAB',
  SEARCH = 'SEARCH',
  INTEGRATION = 'INTEGRATION',
  FLASHCARDS = 'FLASHCARDS',
  VIDEO_LESSON = 'VIDEO_LESSON',
  PARENT_PORTAL = 'PARENT_PORTAL',
  ROI_CALCULATOR = 'ROI_CALCULATOR',
  LEADERBOARD = 'LEADERBOARD',
  STUDENT_DNA = 'STUDENT_DNA',
  STUDY_ROOM = 'STUDY_ROOM',
  AGENT_MARKET = 'AGENT_MARKET',
  IQ_TEST = 'IQ_TEST',
  EXAM_SIM = 'EXAM_SIM',
  QUANTUM_BATTLE = 'QUANTUM_BATTLE',
  ALGO_FORGE = 'ALGO_FORGE',
  CURRICULUM = 'CURRICULUM',
  CERTIFICATE = 'CERTIFICATE',
  CONFIG = 'CONFIG',
  GEOMETRY_VOID = 'GEOMETRY_VOID',
  DEBATE_AI = 'DEBATE_AI',
  NEURAL_LIBRARY = 'NEURAL_LIBRARY',
  ESSAY_GRADER = 'ESSAY_GRADER',
  AR_CONCEPT = 'AR_CONCEPT',
  LIVE_SEMINAR = 'LIVE_SEMINAR',
  PAYMENT = 'PAYMENT',
  INTERVIEW = 'INTERVIEW',
  ZEN_ZONE = 'ZEN_ZONE',
  SCHOLARSHIP = 'SCHOLARSHIP',
  DREAM_TIMELINE = 'DREAM_TIMELINE',
  AVATAR = 'AVATAR',
  DATA_LAB = 'DATA_LAB',
  VIRTUAL_CAMPUS = 'VIRTUAL_CAMPUS',
  STORE = 'STORE',
  QUANTUM_READER = 'QUANTUM_READER',
  ERROR_NET = 'ERROR_NET',
  HOLO_BOARD = 'HOLO_BOARD',
  MIND_MAP = 'MIND_MAP',
  SNIPER = 'SNIPER',
  COSMIC = 'COSMIC',
  VOICE_COACH = 'VOICE_COACH',
  LOGIC_GRAPH = 'LOGIC_GRAPH',
  SCHEDULER = 'SCHEDULER',
  CONCEPT_UNIVERSE = 'CONCEPT_UNIVERSE',
  PREDICTOR = 'PREDICTOR',
  CALCULATOR = 'CALCULATOR',
  CHEAT_SHEET = 'CHEAT_SHEET',
  AUTOPSY = 'AUTOPSY'
}

export interface NavItem {
  label: string;
  page: Page;
  icon?: any;
}

export interface Feature {
  title: string;
  description: string;
  icon: any;
  stat: string;
}

export interface PricingTier {
  name: string;
  price: string;
  features: string[];
  recommended?: boolean;
}

export interface AIResponse {
  text: string;
  loading: boolean;
  error?: string;
}

export type AgentRole = 'general' | 'math' | 'reading' | 'writing' | 'strategy';

export interface AgentConfig {
  id: AgentRole;
  name: string;
  description: string;
  icon: any;
  color: string;
}

export interface PracticeQuestion {
  id: string;
  topic: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string; // Step-by-step explanation
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface HubModule {
    id: string;
    title: string;
    description: string;
    icon: any;
    status: 'Active' | 'Locked' | 'Coming Soon';
    stats: string;
    page?: Page;
    category?: string;
}

export interface SecurityLayer {
    id: number;
    name: string;
    status: 'Secure' | 'Scanning' | 'Threat Detected';
    detail: string;
}

export interface BlogPost {
    id: number;
    title: string;
    excerpt: string;
    category: 'Strategy' | 'News' | 'University' | 'Tech';
    readTime: string;
    views: number;
    image: string;
}

export interface MarketingNode {
    id: string;
    label: string;
    value: number;
    status: 'Active' | 'Optimizing' | 'Idle';
    type: 'Acquisition' | 'Retention' | 'Revenue' | 'Neuro';
}

export interface University {
    id: string;
    name: string;
    location: string;
    ranking: number;
    matchScore: number;
    scholarship: string;
    requirements: string[];
    logo: string; // Placeholder color
}

export interface SpecializedAgent {
    id: string;
    name: string;
    specialty: string;
    level: 'Elite' | 'Expert' | 'Master';
    cost: number;
    hired: boolean;
    image: string; // Placeholder color
}

export interface IQProblem {
    id: number;
    grid: string[][]; // Visual pattern representation
    options: string[];
    correct: number;
    difficulty: number;
}

export interface SearchResult {
    title: string;
    type: 'Video' | 'Article' | 'Practice' | 'Concept' | 'Podcast';
    relevance: string;
    summary: string;
}

export interface GraphNode {
    id: number;
    label: string;
    type: 'Core' | 'Sub' | 'Related';
    x: number; // 0-100 percentage
    y: number; // 0-100 percentage
}
