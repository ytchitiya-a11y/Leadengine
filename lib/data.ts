// ─── Types ────────────────────────────────────────────────────────────────────

export type Priority = "HOT" | "WARM" | "COLD";
export type PlanType = "free" | "basic" | "pro" | "enterprise";
export type LeadStatus = "new" | "contacted" | "qualified" | "converted" | "archived";

export interface Lead {
  id: number;
  business_name: string;
  category: string;
  location: string;
  rating: number | null;
  reviews: number;
  website: string | null;
  phone: string | null;
  score: number;
  priority: Priority;
  reason: string;
  intent_summary: string | null;
  source: string;
  status: LeadStatus;
  tags: string[];
  created_at: string;
  email?: string;
  owner?: string;
}

export interface IntentRecord {
  id: number;
  source: string;
  problem: string;
  category: string;
  intent_score: number;
  urgency: "High" | "Medium" | "Low";
  location: string;
  keywords: string;
  subreddit?: string;
  created_at: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  plan: PlanType;
  lead_count: number;
  created_at: string;
}

// ─── Mock Leads ─────────────────────────────────────────────────────────────

export const MOCK_LEADS: Lead[] = [
  { id: 1, business_name: "Alpha Dental Clinic", category: "Healthcare", location: "Mumbai, MH", rating: 3.2, reviews: 14, website: null, phone: "+91-9876543210", score: 91, priority: "HOT", reason: "No website, low rating, very few reviews", intent_summary: "Owner posted about needing more patients online", source: "Google", status: "new", tags: ["healthcare", "no-website"], created_at: "2024-06-01", email: "alpha@dental.in", owner: "You" },
  { id: 2, business_name: "BrightSmile Orthodontics", category: "Healthcare", location: "Pune, MH", rating: 4.5, reviews: 210, website: "https://brightsmile.in", phone: "+91-9812345678", score: 38, priority: "COLD", reason: "Well-established, good online presence", intent_summary: null, source: "Google", status: "contacted", tags: ["healthcare"], created_at: "2024-06-01", owner: "You" },
  { id: 3, business_name: "QuickFix Auto Repair", category: "Automotive", location: "Chennai, TN", rating: 2.9, reviews: 7, website: null, phone: null, score: 88, priority: "HOT", reason: "Low rating, no website, no phone listed", intent_summary: "Struggling with customer retention", source: "Reddit", status: "new", tags: ["automotive", "urgent"], created_at: "2024-06-02", email: null, owner: "You" },
  { id: 4, business_name: "GreenLeaf Restaurant", category: "F&B", location: "Delhi, NCR", rating: 4.1, reviews: 320, website: "https://greenleaf.com", phone: "+91-9900112233", score: 52, priority: "WARM", reason: "Good reviews but mentioned needing digital marketing", intent_summary: "Wants help with weekday footfall", source: "Facebook", status: "qualified", tags: ["restaurant"], created_at: "2024-06-02", owner: "You" },
  { id: 5, business_name: "SwiftDeliver Logistics", category: "Logistics", location: "Delhi, NCR", rating: 3.8, reviews: 42, website: null, phone: "+91-9400000004", score: 79, priority: "HOT", reason: "No website, actively hiring — growth phase", intent_summary: "Looking for growth hacker and marketing help", source: "LinkedIn", status: "new", tags: ["logistics", "hiring"], created_at: "2024-06-03", owner: "You" },
  { id: 6, business_name: "Sunrise Law Associates", category: "Legal", location: "Hyderabad, TS", rating: 4.7, reviews: 89, website: "https://sunriselaw.in", phone: "+91-9600000002", score: 44, priority: "WARM", reason: "Sole practitioner, inconsistent pipeline", intent_summary: "Needs consistent lead generation", source: "Google", status: "new", tags: ["legal"], created_at: "2024-06-03", owner: "You" },
  { id: 7, business_name: "MediCare Pharmacy", category: "Healthcare", location: "Kolkata, WB", rating: 3.5, reviews: 55, website: null, phone: "+91-9500000003", score: 74, priority: "HOT", reason: "No website, below-average rating", intent_summary: null, source: "Google", status: "contacted", tags: ["pharmacy"], created_at: "2024-06-04", owner: "You" },
  { id: 8, business_name: "City Gym & Fitness", category: "Health & Wellness", location: "Bangalore, KA", rating: 3.2, reviews: 18, website: null, phone: null, score: 85, priority: "HOT", reason: "No website, no phone, low rating", intent_summary: "Posted about struggling to retain members", source: "Reddit", status: "new", tags: ["gym", "no-website", "urgent"], created_at: "2024-06-04", owner: "You" },
  { id: 9, business_name: "LuxeApparel Fashion", category: "Retail", location: "Chennai, TN", rating: 4.2, reviews: 130, website: "https://luxeapparel.in", phone: "+91-9300000005", score: 61, priority: "WARM", reason: "Wasting budget on Facebook ads, looking for better ROI", intent_summary: "Facebook ads not converting, needs strategy", source: "Facebook", status: "qualified", tags: ["retail", "ads"], created_at: "2024-06-05", owner: "You" },
  { id: 10, business_name: "TechHub IT Solutions", category: "Technology", location: "Bangalore, KA", rating: 4.0, reviews: 130, website: "https://techhub.co.in", phone: "+91-9400000004", score: 48, priority: "WARM", reason: "Established but growing — potential for SEO services", intent_summary: "Exploring content marketing", source: "Google", status: "new", tags: ["tech"], created_at: "2024-06-05", owner: "You" },
  { id: 11, business_name: "Nagpur Salon Hub", category: "Health & Wellness", location: "Nagpur, MH", rating: 3.9, reviews: 28, website: null, phone: "+91-9700000001", score: 82, priority: "HOT", reason: "No website, appointment chaos, clear automation need", intent_summary: "Needs booking automation and marketing", source: "Facebook", status: "new", tags: ["salon", "automation"], created_at: "2024-06-06", owner: "You" },
  { id: 12, business_name: "Jodhpur Furniture Craft", category: "Manufacturing", location: "Jodhpur, RJ", rating: null, reviews: 0, website: null, phone: "+91-9800000008", score: 93, priority: "HOT", reason: "Zero digital presence, 20 years in business", intent_summary: "Owner wants complete digital setup", source: "Facebook", status: "new", tags: ["manufacturing", "no-digital", "urgent"], created_at: "2024-06-06", owner: "You" },
];

// ─── Mock Intent Data ────────────────────────────────────────────────────────

export const MOCK_INTENT: IntentRecord[] = [
  { id: 1, source: "Reddit", problem: "Clinic owner needs digital marketing to get more patients", category: "Healthcare", intent_score: 91, urgency: "High", location: "Mumbai", keywords: "marketing, patients, digital, clinic", subreddit: "smallbusiness", created_at: "2024-06-01" },
  { id: 2, source: "Reddit", problem: "B2B SaaS founder struggling to get first 100 customers", category: "SaaS/Tech", intent_score: 87, urgency: "High", location: "Bangalore", keywords: "leads, customers, B2B, cold email", subreddit: "entrepreneur", created_at: "2024-06-01" },
  { id: 3, source: "Facebook", problem: "Restaurant owner needs help with weekday footfall", category: "F&B", intent_score: 76, urgency: "Medium", location: "Pune", keywords: "restaurant, marketing, customers, footfall", created_at: "2024-06-02" },
  { id: 4, source: "Reddit", problem: "Startup hiring process is eating all founder's time", category: "HR/Recruitment", intent_score: 72, urgency: "Medium", location: "Delhi", keywords: "hiring, ATS, automation, recruitment", subreddit: "startups", created_at: "2024-06-02" },
  { id: 5, source: "Reddit", problem: "Solo lawyer needs consistent lead pipeline beyond referrals", category: "Legal", intent_score: 80, urgency: "High", location: "Hyderabad", keywords: "leads, law firm, referrals, marketing", subreddit: "legaladvice", created_at: "2024-06-03" },
  { id: 6, source: "Facebook", problem: "Facebook ads failing — jewelry business wasting ₹50k/month", category: "E-commerce", intent_score: 84, urgency: "High", location: "Surat", keywords: "facebook ads, ROI, jewelry, e-commerce", created_at: "2024-06-03" },
  { id: 7, source: "Reddit", problem: "Freelance photographer needs automation for consistent enquiries", category: "Freelancer", intent_score: 68, urgency: "Medium", location: "Goa", keywords: "freelance, clients, automation, photography", subreddit: "freelance", created_at: "2024-06-04" },
  { id: 8, source: "Facebook", problem: "Furniture manufacturer needs complete digital transformation", category: "Manufacturing", intent_score: 93, urgency: "High", location: "Jodhpur", keywords: "digital, website, social media, manufacturer", created_at: "2024-06-04" },
];

// ─── Dashboard Stats ─────────────────────────────────────────────────────────

export const DASHBOARD_STATS = {
  total_leads: 248,
  hot_leads: 67,
  intent_leads: 134,
  revenue: 47800,
  active_searches: 3,
  plan: "pro" as PlanType,
  leads_this_week: 42,
  hot_this_week: 18,
};

// ─── Chart Data ──────────────────────────────────────────────────────────────

export const LEADS_GROWTH = [
  { date: "Jan", leads: 28, hot: 8, warm: 12, cold: 8 },
  { date: "Feb", leads: 42, hot: 14, warm: 18, cold: 10 },
  { date: "Mar", leads: 38, hot: 11, warm: 16, cold: 11 },
  { date: "Apr", leads: 61, hot: 22, warm: 24, cold: 15 },
  { date: "May", leads: 79, hot: 28, warm: 31, cold: 20 },
  { date: "Jun", leads: 95, hot: 35, warm: 38, cold: 22 },
];

export const INTENT_PIE = [
  { name: "Marketing Help", value: 38, color: "#4f74ff" },
  { name: "Lead Generation", value: 26, color: "#34d399" },
  { name: "Hiring Issues", value: 14, color: "#f5a623" },
  { name: "Automation", value: 12, color: "#a78bfa" },
  { name: "Other", value: 10, color: "#4a5578" },
];

export const INDUSTRY_DIST = [
  { name: "Healthcare", leads: 52, color: "#4f74ff" },
  { name: "F&B", leads: 43, color: "#34d399" },
  { name: "Tech", leads: 38, color: "#a78bfa" },
  { name: "Retail", leads: 31, color: "#f5a623" },
  { name: "Legal", leads: 24, color: "#fb7185" },
  { name: "Logistics", leads: 19, color: "#38bdf8" },
  { name: "Manufacturing", leads: 17, color: "#fcd34d" },
];

export const CONVERSION_DATA = [
  { month: "Jan", potential: 65, actual: 18 },
  { month: "Feb", potential: 72, actual: 24 },
  { month: "Mar", potential: 68, actual: 21 },
  { month: "Apr", potential: 81, actual: 35 },
  { month: "May", potential: 88, actual: 42 },
  { month: "Jun", potential: 94, actual: 51 },
];

export const MONTHLY_REVENUE = [
  { month: "Jan", revenue: 4990 },
  { month: "Feb", revenue: 7485 },
  { month: "Mar", revenue: 6990 },
  { month: "Apr", revenue: 11970 },
  { month: "May", revenue: 14960 },
  { month: "Jun", revenue: 17950 },
];

// ─── AI Insights ─────────────────────────────────────────────────────────────

export const AI_INSIGHTS = [
  { icon: "🏥", title: "Healthcare Surge", desc: "72% of healthcare leads have no digital presence — highest conversion window in 3 months", trend: "+24%", color: "from-blue-600/20 to-blue-500/5" },
  { icon: "⚡", title: "Automation Demand", desc: "Salon & appointment-based businesses actively seeking automation tools this week", trend: "+41%", color: "from-amber-600/20 to-amber-500/5" },
  { icon: "🎯", title: "HOT Window Open", desc: "Reddit r/smallbusiness has 14 high-intent posts in last 48 hours — act now", trend: "14 posts", color: "from-rose-600/20 to-rose-500/5" },
  { icon: "📈", title: "Jodhpur Manufacturing", desc: "Manufacturing cluster businesses show zero digital presence — massive untapped market", trend: "New", color: "from-emerald-600/20 to-emerald-500/5" },
];

// ─── Admin Users ─────────────────────────────────────────────────────────────

export const ADMIN_USERS: User[] = [
  { id: "u1", email: "rahul@startup.in", name: "Rahul Sharma", plan: "pro", lead_count: 124, created_at: "2024-03-15" },
  { id: "u2", email: "priya@agency.co", name: "Priya Verma", plan: "basic", lead_count: 67, created_at: "2024-04-02" },
  { id: "u3", email: "amit@clinic.com", name: "Amit Patel", plan: "pro", lead_count: 248, created_at: "2024-04-18" },
  { id: "u4", email: "sneha@freelance.io", name: "Sneha Reddy", plan: "free", lead_count: 12, created_at: "2024-05-01" },
  { id: "u5", email: "vikram@growth.in", name: "Vikram Joshi", plan: "basic", lead_count: 89, created_at: "2024-05-14" },
  { id: "u6", email: "anita@seo.com", name: "Anita Desai", plan: "pro", lead_count: 311, created_at: "2024-05-20" },
];

// ─── Email Templates ──────────────────────────────────────────────────────────

export const EMAIL_TEMPLATES = [
  { id: 1, name: "Healthcare — No Website", subject: "Quick idea for {{business}} — more patients online", preview: "Hi {{business}} team, I noticed you don't have a website yet...", category: "Healthcare", used: 34 },
  { id: 2, name: "Restaurant — Low Footfall", subject: "Simple fix for {{business}}'s weekday bookings", preview: "Hi team, I saw your restaurant and had an idea...", category: "F&B", used: 28 },
  { id: 3, name: "Generic Lead Gen", subject: "Getting more customers for {{business}}", preview: "I came across your business and noticed an opportunity...", category: "General", used: 91 },
  { id: 4, name: "SaaS Outreach", subject: "Growth strategy for {{business}}", preview: "I've been watching your product and think...", category: "Tech", used: 17 },
];

// ─── Export History ───────────────────────────────────────────────────────────

export const EXPORT_HISTORY = [
  { id: 1, name: "Leads_Mumbai_June2024.csv", type: "CSV", size: "42 KB", leads: 48, created_at: "2024-06-06 14:22", url: "#" },
  { id: 2, name: "Lead_Report_Q2_2024.pdf", type: "PDF", size: "1.2 MB", leads: 124, created_at: "2024-06-04 09:15", url: "#" },
  { id: 3, name: "HOT_Leads_May2024.csv", type: "CSV", size: "18 KB", leads: 22, created_at: "2024-05-31 17:44", url: "#" },
  { id: 4, name: "Intent_Analysis_Report.pdf", type: "PDF", size: "890 KB", leads: 67, created_at: "2024-05-28 11:30", url: "#" },
];

// ─── Plans ───────────────────────────────────────────────────────────────────

export const PLANS = [
  {
    id: "basic",
    name: "Basic",
    price: 499,
    period: "month",
    description: "Perfect for freelancers & solo consultants",
    features: [
      "200 leads/month",
      "Google Maps collection",
      "AI intent detection",
      "CSV export",
      "Email support",
      "5 AI messages/day",
    ],
    limits: ["No Reddit/Facebook mining", "No PDF reports", "No admin tools"],
    popular: false,
    color: "from-blue-600/20 to-blue-500/5",
    accent: "#4f74ff",
  },
  {
    id: "pro",
    name: "Pro",
    price: 999,
    period: "month",
    description: "For agencies and serious growth teams",
    features: [
      "Unlimited leads",
      "All data sources",
      "AI lead scoring",
      "CSV + PDF export",
      "Cloudinary storage",
      "Unlimited AI messages",
      "Intent intelligence",
      "Priority support",
    ],
    limits: [],
    popular: true,
    color: "from-violet-600/20 to-violet-500/5",
    accent: "#a78bfa",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 4999,
    period: "month",
    description: "White-label + custom integrations",
    features: [
      "Everything in Pro",
      "White-label dashboard",
      "Custom API integration",
      "Dedicated account manager",
      "SLA guarantee",
      "Team accounts",
      "Custom AI training",
    ],
    limits: [],
    popular: false,
    color: "from-amber-600/20 to-amber-500/5",
    accent: "#f5a623",
  },
];
