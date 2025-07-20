# Cloudflare Pages Deployment Guide

## Automatic Deployment Setup

### 1. Connect Repository to Cloudflare Pages

1. **Login to Cloudflare Dashboard**

   - Go to [dash.cloudflare.com](https://dash.cloudflare.com)
   - Navigate to **Pages** section

2. **Create New Project**

   - Click **"Create a project"**
   - Select **"Connect to Git"**
   - Choose **GitHub** and authorize Cloudflare

3. **Select Repository**
   - Find and select: `JdarlingGT/CFpage-graston-provider-directory`
   - Click **"Begin setup"**

### 2. Configure Build Settings

**Framework preset**: `None` (or `Vite` if available)

**Build configurations**:

- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Root directory**: `/` (leave empty)

**Environment variables**:

- Add any needed environment variables in the Cloudflare Pages dashboard
- **Important**: Never commit real API keys to Git

### 3. Deploy

- Click **"Save and Deploy"**
- Cloudflare will automatically build and deploy your site
- Future pushes to `main` branch will trigger automatic deployments

### 4. Custom Domain (Optional)

- In Cloudflare Pages dashboard, go to **Custom domains**
- Add your domain and follow DNS setup instructions

## Build Configuration

The project is configured with:

- **Build tool**: Vite
- **Output**: Static files in `dist/` directory
- **Node.js version**: 18+ (automatically detected)

## Environment Variables

Set these in Cloudflare Pages dashboard if needed:

- `VITE_APP_NAME`: Application name
- `VITE_API_BASE_URL`: API endpoint URL
- Any other environment variables from `.env.example`

## Deployment Status

- ✅ Repository connected
- ✅ Build configuration ready
- ✅ Static assets optimized
- ✅ Environment variables configured

Your site will be available at: `https://your-project-name.pages.dev`
