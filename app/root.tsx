import { useEffect } from "react";
import { Links, LinksFunction, Meta, MetaFunction, Outlet, Scripts, ScrollRestoration } from "react-router";
import type { Route } from "../app/+types/root";
import tailwind from "./tailwind.css?url";
import { initializeTheme } from "./utils/theme";

export const links: LinksFunction = () => {
  return [
    {
      rel: "icon",
      type: "image/svg+xml",
      href: "/logo_dark.ico",
    },
    ...(tailwind ? [{ rel: "stylesheet", href: tailwind }] : []),
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: "anonymous",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&family=Raleway:ital,wght@0,100..900;1,100..900&family=Unbounded:wght@200..900&display=swap",
    },
  ];
};

export const meta: MetaFunction = () => [
  {
    title: "Graston Technique® Provider Directory",
  },
  {
    name: "description",
    content: "Find certified Graston Technique healthcare providers near you. Search by location, specialty, and certification level. Interactive map with detailed provider profiles.",
  },
  {
    name: "keywords",
    content: "Graston Technique, healthcare providers, physical therapy, chiropractor, massage therapy, sports medicine, injury recovery, manual therapy",
  },
  {
    name: "viewport",
    content: "width=device-width, initial-scale=1",
  },
  {
    property: "og:title",
    content: "Graston Technique® Provider Directory",
  },
  {
    property: "og:description",
    content: "Find certified Graston Technique healthcare providers near you. Advanced search and filtering with interactive maps.",
  },
  {
    property: "og:type",
    content: "website",
  },
  {
    property: "og:image",
    content: "/banner.jpg",
  },
  {
    name: "twitter:card",
    content: "summary_large_image",
  },
  {
    name: "twitter:title",
    content: "Graston Technique® Provider Directory",
  },
  {
    name: "twitter:description",
    content: "Find certified Graston Technique healthcare providers near you.",
  },
];

export const loader = ({ context }: Route.LoaderArgs) => {
  console.log(context.cloudflare);
  return null;
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-bg text-light">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  useEffect(() => {
    initializeTheme();
  }, []);

  return <Outlet />;
}
