# Graston Provider Directory

A comprehensive web application for finding Graston Technique certified healthcare providers. Built with React Router v7, TypeScript, and Cloudflare Pages.

## 🌟 Features

### 🔍 **Advanced Search & Filtering**

- **Text Search**: Search by provider name, specialty, location, or practice name
- **Dynamic Filters**: Filter by specialty, languages spoken, patient types, and Graston certification level
- **Real-time Results**: Instant updates with URL parameter integration
- **Clear Filters**: Easy reset of all applied filters

### �️ **Interactive Map**

- **Provider Locations**: Visual representation of all provider locations
- **Detailed Popups**: Comprehensive provider information in map markers
- **Responsive Design**: Optimized for desktop and mobile viewing

### � **Provider Profiles**

- **Comprehensive Information**: Name, credentials, specializations, contact details
- **Certification Levels**: Visual badges for Graston certification levels (Basic, Advanced, Specialist, Instructor)
- **Specialization Tags**: Easy-to-read specialty indicators
- **Contact Integration**: Direct phone and email links

### 📊 **Data Management**

- **TypeScript Integration**: Fully typed provider data structure
- **Mock API**: Realistic data service simulating real Graston API
- **Server-Side Rendering**: React Router loaders for optimal performance

## 🚀 Technology Stack

- **Framework**: React Router v7
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Mapping**: Leaflet with React-Leaflet
- **Icons**: React Icons
- **Deployment**: Cloudflare Pages
- **Build Tool**: Vite

## � Prerequisites

- Node.js 18+
- npm or yarn
- Git

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/JdarlingGT/CFpage-graston-provider-directory.git
   cd CFpage-graston-provider-directory
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

4. **Start development server**

   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
app/
├── components/
│   ├── base/                 # Reusable UI components
│   │   ├── SearchBar.tsx    # Search functionality
│   │   ├── LoadMoreButton.tsx
│   │   └── Aside.tsx
│   └── providers/           # Provider-specific components
│       ├── ProviderCard.tsx      # Individual provider display
│       ├── ProviderCardList.tsx  # Provider grid layout
│       ├── FilterGroup.tsx       # Search filters
│       ├── DirectoryMap.tsx      # Interactive map
│       └── ProximityFilter.tsx   # Location-based filtering
├── data/
│   └── providers.ts         # Provider data service & types
├── routes/
│   ├── providers.tsx        # Main provider directory page
│   ├── _index.tsx          # Homepage
│   └── _layout.tsx         # Layout wrapper
└── utils/
    └── theme.ts            # Theme configuration
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run deploy` - Deploy to Cloudflare Pages
- `npm run typecheck` - Run TypeScript checks

## 🎯 Key Features Explained

### Provider Data Structure

```typescript
interface Provider {
  id: number;
  name: string;
  credentials: string;
  specialty: string;
  practice: string;
  address: string;
  city: string;
  state: string;
  position: [number, number]; // [latitude, longitude]
  certifications: string[];
  specializations: string[];
  languages: string[];
  patients: string[];
  yearsExperience: number;
  grastonLevel: "Basic" | "Advanced" | "Specialist" | "Instructor";
}
```

### Search Functionality

- **URL Integration**: Search terms and filters are reflected in the URL
- **Server-Side Loading**: React Router loaders handle data fetching
- **Multi-field Search**: Searches across name, specialty, location, and practice fields
- **Combined Filtering**: Search works alongside specialty and location filters

### Responsive Design

- **Mobile-First**: Optimized for mobile devices
- **Flexible Layout**: Sidebar filters stack on mobile
- **Touch-Friendly**: Large touch targets for mobile interaction

## 🌐 API Integration

Currently uses mock data based on real Graston Technique providers. The data service (`app/data/providers.ts`) provides:

- `getProviders()` - Fetch providers with optional filters
- `searchProviders()` - Text-based provider search
- `getProviderById()` - Individual provider lookup
- Helper functions for filter options

To integrate with real Graston API:

1. Replace mock functions in `providers.ts`
2. Update API endpoints
3. Adjust data structure if needed

D1 is perfect for:

- Web applications requiring global data access
- Projects needing SQL without managing infrastructure
- Applications with moderate data requirements (up to 100GB per database)

## 📦 Installation

```bash
git clone https://github.com/Xazu001/react-router-cf.git
cd react-router-cf
npm install
```

## ⚙️ Configuration

1. Create a D1 Database in Cloudflare:

   - Go to Cloudflare Dashboard > Workers & Pages
   - Click on "D1" in the sidebar
   - Click "Create database"
   - Note down the `database_name` and `database_id`

2. Configure `wrangler.toml`:

   ```toml
   name = "your-project-name"

   [vars]
   JWT_PRIVATE = """
   Your private key for JWT
   """
   JWT_PUBLIC = """
   Your public key for JWT
   """

   [[d1_databases]]
   binding = "db"
   database_name = "your_database_name"
   database_id = "your_database_id"
   ```

3. Generate JWT Keys:

   ```bash
   # Using OpenSSL to generate keys
   # Generate private key
   openssl genpkey -algorithm RSA -out private_key.pem -pkeyopt rsa_keygen_bits:2048

   # Generate public key from private key
   openssl rsa -pubout -in private_key.pem -out public_key.pem
   ```

   Copy the contents of these files into the respective JWT_PRIVATE and JWT_PUBLIC fields in `wrangler.toml`

4. Environment Variables: 🔐

```bash
# Create a .env file in the root directory
touch .env

# Add the following environment variables
CLOUDFLARE_ACCOUNT_ID="your_account_id"
CLOUDFLARE_DATABASE_ID="your_database_id"
CLOUDFLARE_D1_TOKEN="your_d1_token"
```

5. Development: 🛠️

```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# Your app will be available at http://localhost:5173
```

## 🏗️ Building for Production

Build your application:

```bash
npm run build
```

The optimized build will be available in the `dist` directory.

## 🚀 Deployment

Deploy to Cloudflare Pages:

```bash
npm run deploy
```

> **Note**: Make sure you have configured your Cloudflare account and set up the necessary environment variables.

## 📁 Project Structure

```
react-router-cf/
├── app/
│   ├── components/    # Reusable components
│   ├── routes/        # Application routes
│   └── root.tsx      # Root component
├── public/           # Static assets
├── server/           # Server-side code
│   ├── load-context.ts # Load context for context and type safety
│   └── ...server files
└── ...config files
```

## 🔧 Tech Stack

- [React](https://reactjs.org/)
- [React Router](https://reactrouter.com/)
- [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Cloudflare Pages](https://pages.cloudflare.com/)
- [Cloudflare D1](https://www.cloudflare.com/products/d1/)
- [Drizzle](https://orm.drizzle.team/)
- [Kysely](https://kysely.dev/)
- [Framer Motion](https://www.framer.com/motion/)

## 🔍 Important Development Notes

### Load Context File

The `load-context.ts` file in the server directory is crucial for context availability and type safety in your application. It defines the context and types for your loader and action that will be available throughout your routes. After making any changes to this file, you must run:

```bash
# Generate new types and run type checking
npm run typecheck
```

This command ensures your route types are properly updated and type-safe. Skipping this step after modifying the context may lead to type errors in your routes.

## 📝 License

MIT License - feel free to use this template for your projects!
