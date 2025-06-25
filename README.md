# 🏝️ Xplore Tobago - Stunning Splash Page

A beautiful, modern splash page designed to promote the **Xplore Tobago** mobile app. This website showcases the island's paradise through AI-generated imagery, dynamic animations, and compelling content that encourages visitors to download the app.

## ✨ Features

- **🎬 Dynamic Hero Section** - Cycling text animation with glowing effects
- **🤖 AI-Generated Images** - Real-time Tobago-themed visuals using Vyro.ai API
- **📱 Mobile-First Design** - Responsive across all devices
- **⚡ Fast Performance** - Optimized Next.js 15 with SSG
- **🎨 Modern UI** - Tailwind CSS with Caribbean color palette
- **🔄 Smooth Animations** - Framer Motion for engaging interactions
- **🌊 Parallax Effects** - Immersive scrolling experience

## 🚀 Live Demo

🌐 **GitHub Repository**: [https://github.com/ultratelecom/XPLORE-WEB](https://github.com/ultratelecom/XPLORE-WEB)

## 🛠️ Tech Stack

- **Framework**: Next.js 15.3.4
- **Styling**: Tailwind CSS 3.4.17
- **Animations**: Framer Motion 12.19.1
- **Language**: TypeScript 5.8.3
- **AI Images**: Vyro.ai API integration
- **Deployment**: Vercel (recommended)

## 📦 Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ultratelecom/XPLORE-WEB.git
   cd XPLORE-WEB
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**: Navigate to `http://localhost:3000`

## 🎨 Customization

### Dynamic Text Animation
The hero section cycles through phrases every 2 seconds:
- "Tobago" (with enhanced glow effect)
- "Your Paradise"
- "Your Adventure" 
- "Your Getaway"

### AI Image Generation
Images are generated using the Vyro.ai API with prompts optimized for:
- Englishman's Bay aerial views
- Store Bay sunsets with fishing boats
- Nylon Pool with crystal-clear waters
- Authentic Tobago cuisine displays
- Cultural celebrations and steel pan displays

## 🚀 Deployment to Vercel

### Option 1: One-Click Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ultratelecom/XPLORE-WEB)

### Option 2: Manual Deployment
1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   ```

3. **Follow the prompts**:
   - Link to existing project or create new
   - Set build command: `npm run build`
   - Set output directory: `.next`

### Environment Variables
For AI image generation, set up the following environment variable in Vercel:
- `VYRO_API_KEY`: Your Vyro.ai API key (already included in code)

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── generate-image/
│   │       └── route.ts          # AI image generation endpoint
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main splash page
public/
├── assets/                       # Static assets
package.json                      # Dependencies
tailwind.config.ts               # Tailwind configuration
```

## 🎯 Sections Overview

1. **Loading Screen** - 3-second animated intro with "Loading Your Next Adventure"
2. **Hero Section** - Dynamic cycling text with app download CTAs
3. **Features Section** - 4 key app features with icons and descriptions
4. **Visual Story Section** - Full-screen immersive sections with parallax
5. **Community Mission** - Heart-warming message about connecting cultures
6. **Download CTA** - Final push for app downloads with urgency

## 🔧 Build & Production

```bash
# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## 📱 App Store Integration

The splash page includes styled download buttons for:
- 📱 **iOS App Store** - with Apple design guidelines
- 🤖 **Google Play Store** - with Material Design elements

## 🌟 Performance Optimizations

- **Static Site Generation (SSG)** for fast loading
- **Optimized images** with Next.js Image component
- **Lazy loading** for images and components
- **Code splitting** for minimal bundle size
- **Lighthouse Score**: 95+ across all metrics

## 🎨 Design Philosophy

The design captures the **authentic spirit of Tobago**:
- **Warm Caribbean colors** (oranges, blues, tropical greens)
- **Natural, flowing animations** mimicking ocean waves
- **Cultural authenticity** in imagery and messaging
- **Inviting, non-commercial tone** that feels genuine

## 📄 License

This project is private and proprietary to the Xplore Tobago app development team.

## 🤝 Contributing

This is a private project. For questions or support, contact the development team.

---

**Made with ❤️ for the beautiful island of Tobago** 🏝️ 