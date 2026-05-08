# 🚀 AI Lead Engine — Frontend

Complete Next.js 14 SaaS frontend for the AI Lead Capture & Intent Intelligence Engine.

---

## 📁 Project Structure

```
leadengine-frontend/
├── app/
│   ├── page.tsx                  ← Root (redirects to login)
│   ├── layout.tsx                ← Root layout + fonts + Toaster
│   ├── auth/
│   │   ├── login/page.tsx        ← Login with Google + email
│   │   └── signup/page.tsx       ← Signup with plan selection
│   ├── dashboard/page.tsx        ← Main dashboard + charts + stats
│   ├── leads/page.tsx            ← Advanced leads table + detail panel
│   ├── intent/page.tsx           ← Intent signals + trending problems
│   ├── collect/page.tsx          ← Data collection with live progress
│   ├── messages/page.tsx         ← AI message generator (email/DM/WhatsApp)
│   ├── export/page.tsx           ← CSV/PDF export center
│   ├── billing/page.tsx          ← Razorpay plans + billing history
│   ├── email/page.tsx            ← Email templates + quick send
│   ├── storage/page.tsx          ← Cloudinary file storage
│   ├── admin/page.tsx            ← Admin panel + user management
│   └── settings/page.tsx         ← Profile/Notifications/API/Security/Theme
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx           ← Collapsible sidebar nav
│   │   ├── TopBar.tsx            ← Top navbar + notifications
│   │   └── AppLayout.tsx         ← Main layout wrapper
│   ├── ui/
│   │   ├── StatCard.tsx          ← Animated metric cards
│   │   └── Badge.tsx             ← Badge, PriorityBadge, ScoreRing, Skeleton
│   ├── charts/
│   │   ├── LeadsGrowthChart.tsx  ← Area chart (leads growth)
│   │   └── Charts.tsx            ← Pie, Bar, Conversion charts
│   └── leads/
│       ├── LeadsTable.tsx        ← Full table with search/filter/sort/pagination
│       └── LeadDetailPanel.tsx   ← Slide-in lead detail sidebar
├── lib/
│   ├── data.ts                   ← All types + mock data
│   └── utils.ts                  ← cn(), formatters, color helpers
├── styles/
│   └── globals.css               ← Base styles, CSS vars, animations
├── tailwind.config.ts
├── next.config.js
├── tsconfig.json
└── package.json
```

---

## ⚡ Quick Start

### 1. Install dependencies
```bash
cd leadengine-frontend
npm install
```

### 2. Run development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 3. Login
- Use any email/password (mock auth)
- Or click "Continue with Google" (connect Firebase for real auth)

---

## 🔌 Connect to Real Backend

Replace mock data in `lib/data.ts` with real API calls:

```typescript
// lib/api.ts
const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export async function getLeads(token: string) {
  const res = await fetch(`${API}/leads`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
}

export async function collectLeads(query: string, location: string, token: string) {
  const res = await fetch(`${API}/collect`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ query, location, limit: 20 })
  });
  return res.json();
}
```

---

## 🔐 Firebase Auth Setup

1. Create Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable Email/Password + Google sign-in
3. Copy config to `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```

---

## 💳 Razorpay Integration

In `app/billing/page.tsx`, replace `handleUpgrade` with:

```typescript
const handleUpgrade = async (planId: string) => {
  const order = await createOrder(planId, token);
  const rzp = new (window as any).Razorpay({
    key: order.key_id,
    amount: order.amount,
    order_id: order.order_id,
    handler: async (response: any) => {
      await verifyPayment({ ...response, plan: planId }, token);
      toast.success('Plan activated!');
    }
  });
  rzp.open();
};
```

Add Razorpay script to `app/layout.tsx`:
```html
<Script src="https://checkout.razorpay.com/v1/checkout.js" />
```

---

## 🚀 Deploy to Vercel

```bash
npm run build
vercel deploy
```

Or connect GitHub repo to Vercel for auto-deploy.

---

## 📦 Tech Stack

| Tool | Purpose |
|------|---------|
| Next.js 14 | App Router framework |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| Recharts | Charts & graphs |
| Lucide React | Icons |
| Framer Motion | Animations (optional) |
| React Hot Toast | Notifications |
| Radix UI | Accessible components |
| Zustand | State management |
| Firebase | Auth |
