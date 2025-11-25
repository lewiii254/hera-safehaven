# 🛡️ HERA SafeSpace

<div align="center">

![HERA SafeSpace Banner](https://img.shields.io/badge/HERA-SafeSpace-blueviolet?style=for-the-badge&logo=shield&logoColor=white)

**Empowering women and girls across Africa with AI-powered protection, survivor support, and digital literacy education**

[![Made with Love](https://img.shields.io/badge/Made%20with-❤️-red?style=flat-square)](https://github.com)
[![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](LICENSE)
[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Enabled-3ECF8E?style=flat-square&logo=supabase)](https://supabase.com/)

[Features](#-features) • [Getting Started](#-getting-started) • [Architecture](#-architecture) • [Contributing](#-contributing) • [Support](#-support)

</div>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Core Technologies](#-core-technologies)
- [Security & Privacy](#-security--privacy)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)
- [Support Resources](#-support-resources)

---

## 🌟 Overview

**HERA SafeSpace** is a comprehensive digital safety platform specifically designed for women and girls across Africa, with special focus on communities in Kenya and surrounding regions. The platform combines cutting-edge AI technology with culturally-sensitive support systems to create a safe space for learning, reporting, and community support.

### 🎯 Mission

To provide accessible, secure, and culturally-aware digital tools that empower women and girls to:
- **Detect** harmful content and online threats using AI
- **Document** incidents securely with military-grade encryption
- **Learn** digital safety skills through interactive lessons
- **Connect** with support networks and verified resources
- **Support** each other through anonymous community forums

---

## ✨ Features

### 🤖 AI-Powered Detection
- **Real-time toxicity analysis** using advanced AI models
- **Content categorization** for different types of harmful content
- **Severity assessment** with confidence scores
- **Detailed explanations** to help users understand threats

### 🖼️ AI-Moderated Image Sharing
- **Image upload support** in forum posts and private messages
- **Automatic AI content moderation** for all uploaded images
- **Safety filtering** to block inappropriate content
- **Progress tracking** for upload status

### 🔒 Evidence Locker
- **Military-grade AES encryption** for file security
- **Secure upload system** with metadata tracking
- **Incident date logging** for documentation
- **Privacy-first design** with user-only access

### 📚 Digital Literacy Hub
- **Interactive lessons** on digital safety
- **Progress tracking** with completion badges
- **Quiz system** to reinforce learning
- **Achievement system** with unlockable badges:
  - 🎓 First Steps (Complete first lesson)
  - 🏆 Safety Scholar (Complete 3 lessons)
  - 🛡️ Digital Guardian (Complete all lessons)

### 💬 Community Forum
- **Anonymous posting** option for privacy
- **Image sharing** with AI moderation
- **Reputation system** with points and badges
- **Reaction system** for supportive engagement
- **Content moderation** tools
- **Flag system** for inappropriate content

### 📨 Private Messaging
- **End-to-end encrypted** conversations
- **Image sharing** with AI content moderation
- **Anonymous chat** capabilities
- **Real-time messaging** with WebSocket support
- **Video/Voice calls** using WebRTC
- **Read receipts** and status indicators

### 🚨 Quick Exit (SOS Mode)
- **Emergency exit button** (hold for 2 seconds)
- **Decoy calculator screen** for safety
- **Triple-tap exit** from decoy mode
- **Quick escape** in dangerous situations

### ⚙️ User Settings
- **Profile management** with display name customization
- **Password change** functionality
- **Notification preferences** (email, forum, messages)
- **Privacy controls** (anonymous posting, online status, message permissions)
- **Account management** options

### 👥 Admin Dashboard
- **Interactive analytics** with charts and graphs
- **User management** with role assignment
- **Evidence monitoring** (metadata only)
- **Content moderation** for flagged posts
- **Toxicity trends** visualization
- **Activity tracking** over time
- **Secure admin-only access** via `/admin` URL

### 📊 Reporting Dashboard (Admin)
- **Platform activity charts** showing posts, evidence, and user trends
- **Content moderation pie charts** by category
- **Monthly trends** for flagged vs resolved content
- **Evidence upload** activity visualization
- **Real-time statistics** updates

---

## 🏗️ Architecture

```mermaid
graph TB
    subgraph "Frontend Layer"
        A[React Application]
        B[React Router]
        C[TanStack Query]
        D[Tailwind CSS]
    end
    
    subgraph "State Management"
        E[Auth Context]
        F[Reputation Hook]
        G[Custom Hooks]
    end
    
    subgraph "Backend Services"
        H[Supabase Auth]
        I[Supabase Database]
        J[Supabase Storage]
        K[Edge Functions]
    end
    
    subgraph "AI Services"
        L[Toxicity Detection]
        M[Lovable AI Gateway]
    end
    
    subgraph "Real-time Features"
        N[WebRTC]
        O[Realtime Subscriptions]
    end
    
    A --> B
    A --> C
    A --> D
    A --> E
    E --> G
    G --> F
    
    A --> H
    A --> I
    A --> J
    A --> K
    
    K --> L
    L --> M
    
    A --> N
    A --> O
    O --> I
    
    style A fill:#61DAFB
    style H fill:#3ECF8E
    style I fill:#3ECF8E
    style L fill:#9333EA
    style N fill:#FF6B6B
```

### 🔄 Data Flow

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Auth
    participant Database
    participant AI
    participant Storage
    
    User->>Frontend: Access Platform
    Frontend->>Auth: Check Authentication
    Auth-->>Frontend: Session Status
    
    User->>Frontend: Upload Evidence
    Frontend->>Storage: Encrypt & Store File
    Storage-->>Frontend: Storage Path
    Frontend->>Database: Save Metadata
    Database-->>Frontend: Confirmation
    
    User->>Frontend: Check Content
    Frontend->>AI: Analyze Text
    AI-->>Frontend: Toxicity Report
    Frontend-->>User: Display Results
    
    User->>Frontend: Send Message
    Frontend->>Database: Store Message
    Database-->>Frontend: Real-time Update
    Frontend-->>User: Message Delivered
```

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/hera-safespace.git
   cd hera-safespace
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   
   The `.env` file is auto-generated by Lovable Cloud integration. It contains:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_PUBLISHABLE_KEY=your_anon_key
   VITE_SUPABASE_PROJECT_ID=your_project_id
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173` to see the application running.

### 🔑 First Admin Setup

1. Create a regular account through `/auth`
2. Access your Supabase dashboard
3. Insert admin role in `user_roles` table:
   ```sql
   INSERT INTO user_roles (user_id, role)
   VALUES ('your-user-id', 'admin');
   ```
4. Access admin dashboard at `/admin`

---

## 📁 Project Structure

```
hera-safespace/
├── 📂 public/              # Static assets
├── 📂 src/
│   ├── 📂 components/      # Reusable UI components
│   │   ├── ui/            # shadcn/ui components
│   │   ├── Navigation.tsx # Main navigation
│   │   ├── SOSButton.tsx  # Emergency exit button
│   │   ├── DecoyScreen.tsx # Safety decoy screen
│   │   ├── ImageUpload.tsx # AI-moderated image upload
│   │   └── VideoCallInterface.tsx # WebRTC component
│   ├── 📂 hooks/          # Custom React hooks
│   │   ├── useAuth.tsx    # Authentication hook
│   │   └── useReputation.tsx # Reputation system
│   ├── 📂 integrations/   # Third-party integrations
│   │   └── supabase/      # Supabase client & types
│   ├── 📂 pages/          # Page components
│   │   ├── Index.tsx      # Landing page
│   │   ├── Auth.tsx       # Login/Signup
│   │   ├── Learn.tsx      # Learning hub
│   │   ├── Detect.tsx     # AI detection
│   │   ├── Support.tsx    # Support portal
│   │   ├── EvidenceLocker.tsx # Evidence management
│   │   ├── CommunityForum.tsx # Forum with image sharing
│   │   ├── Messages.tsx   # Private messaging
│   │   ├── Settings.tsx   # User settings & preferences
│   │   └── AdminDashboard.tsx # Admin panel with analytics
│   ├── 📂 lib/            # Utility functions
│   ├── App.tsx            # Root component
│   ├── main.tsx           # Entry point
│   └── index.css          # Global styles
├── 📂 supabase/
│   ├── 📂 functions/      # Edge functions
│   │   └── detect-toxicity/ # AI detection service
│   └── 📂 migrations/     # Database migrations
├── package.json
├── vite.config.ts
├── tailwind.config.ts
└── README.md
```

---

## 🛠️ Core Technologies

### Frontend Stack
- **⚛️ React 18.3.1** - UI library
- **📘 TypeScript** - Type safety
- **🎨 Tailwind CSS** - Utility-first styling
- **🧩 shadcn/ui** - Component library
- **🔄 TanStack Query** - Server state management
- **🧭 React Router** - Client-side routing

### Backend & Infrastructure
- **🔐 Supabase** - Backend-as-a-Service
  - PostgreSQL database
  - Authentication
  - Row Level Security (RLS)
  - Real-time subscriptions
  - File storage
  - Edge functions

### AI & Real-time
- **🤖 Lovable AI Gateway** - AI model access
  - Google Gemini 2.5 Flash for toxicity detection
- **📹 WebRTC** - Video/voice calling
- **⚡ WebSocket** - Real-time messaging

### Development Tools
- **⚡ Vite** - Build tool & dev server
- **🔍 ESLint** - Code linting
- **💅 Prettier** - Code formatting

---

## 🔐 Security & Privacy

### Encryption
- **AES-256** encryption for evidence files
- **Unique encryption keys** per file
- **Secure key storage** in database
- **Client-side encryption** before upload

### Authentication
- **JWT-based authentication** via Supabase Auth
- **Email verification** support
- **Password requirements** enforced
- **Session management** with auto-refresh

### Row Level Security (RLS)
All database tables have RLS policies:
- Users can only access their own data
- Anonymous posting support
- Admin-level access controls
- Evidence files are user-isolated

### Data Privacy
- **No personal data collection** without consent
- **Anonymous participation** option throughout
- **Encrypted communications**
- **GDPR compliance** considerations
- **African data sovereignty** awareness

---

## 📊 Database Schema

```mermaid
erDiagram
    profiles ||--o{ user_roles : has
    profiles ||--o{ evidence_files : uploads
    profiles ||--o{ forum_posts : creates
    profiles ||--o{ forum_comments : creates
    profiles ||--o{ user_reputation : has
    profiles ||--o{ user_badges : earns
    
    forum_posts ||--o{ forum_comments : has
    forum_posts ||--o{ forum_reactions : receives
    forum_comments ||--o{ forum_reactions : receives
    
    conversations ||--o{ private_messages : contains
    profiles ||--o{ conversations : participates
    
    profiles {
        uuid id PK
        uuid user_id FK
        text full_name
        timestamp created_at
    }
    
    evidence_files {
        uuid id PK
        uuid user_id FK
        text file_name
        text encryption_key
        text storage_path
        timestamp incident_date
    }
    
    forum_posts {
        uuid id PK
        uuid user_id FK
        text title
        text content
        boolean is_anonymous
        boolean is_flagged
    }
    
    user_reputation {
        uuid id PK
        uuid user_id FK
        int total_points
        int posts_count
        int helpful_reactions
    }
```

---

## 🚀 Deployment

### Deploying with Lovable

1. **Commit your changes**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push
   ```

2. **Deploy via Lovable Dashboard**
   - Click "Publish" button in Lovable editor
   - Frontend changes: Click "Update" in publish dialog
   - Backend changes: Deploy automatically

3. **Custom Domain** (Optional)
   - Navigate to Project > Settings > Domains
   - Click "Connect Domain"
   - Follow DNS configuration steps

### Manual Deployment Options

#### Frontend (Vercel)
```bash
npm run build
vercel --prod
```

#### Frontend (Netlify)
```bash
npm run build
netlify deploy --prod --dir=dist
```

#### Edge Functions
Edge functions are deployed automatically with Lovable Cloud.

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Commit with clear messages**
   ```bash
   git commit -m "Add: Amazing feature description"
   ```
5. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### Contribution Guidelines

- ✅ Follow existing code style
- ✅ Write clear commit messages
- ✅ Add comments for complex logic
- ✅ Test your changes thoroughly
- ✅ Update documentation as needed
- ✅ Respect cultural sensitivities
- ✅ Maintain privacy-first approach

### Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Support survivors and vulnerable users
- Maintain confidentiality
- Report security issues responsibly

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🆘 Support Resources

### Kenya 🇰🇪
- **Gender Violence Recovery Centre**: +254 709 400 200
- **COVAW**: +254 800 720 553
- **FIDA Kenya**: +254 20 387 4938
- **Kenya Red Cross**: 1199
- **Emergency Services**: 112 or 999

### International
- **National Domestic Violence Hotline**: 1-800-799-7233
- **Crisis Text Line**: Text HOME to 741741
- **RAINN**: 1-800-656-4673

### Within the Platform
- 📚 **Learning Hub**: `/learn` - Digital safety education
- 🤖 **AI Detector**: `/detect` - Content analysis
- 💬 **Community Forum**: `/forum` - Peer support with image sharing
- 📨 **Private Messages**: `/messages` - One-on-one support
- 🔒 **Evidence Locker**: `/evidence` - Secure documentation
- ⚙️ **Settings**: `/settings` - Profile & privacy preferences
- 🛡️ **Admin Dashboard**: `/admin` - Analytics & moderation (admin only)

---

## 🙏 Acknowledgments

- **African women's rights organizations** for guidance and feedback
- **Survivors** who shared their stories to improve the platform
- **Open source community** for the amazing tools and libraries
- **Lovable team** for the development platform
- **Supabase team** for the backend infrastructure

---

## 📞 Contact & Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/hera-safespace/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/hera-safespace/discussions)
- **Email**: support@herasafespace.org
- **Twitter**: [@HERASafeSpace](https://twitter.com/herasafespace)

---

<div align="center">

**Built with ❤️ for women and girls across Africa**

🌍 **Together, we create safer digital spaces** 🌍

[⬆ Back to Top](#️-hera-safespace)

</div>
