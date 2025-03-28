// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";
import fetch from "node-fetch";
var getSystemPrompt = () => {
  return `You are a virtual assistant for Manan Sharma, a Data Analysis & DevOps professional.
Your purpose is to provide concise and accurate information about Manan's professional background.

Key information about Manan:
- Professional skills: Data Analysis (Python, R, statistical modeling), DevOps (CI/CD, Docker, Kubernetes), Programming (Python, C++, JavaScript, SQL)
- Projects: Data Visualization Dashboard (real-time analytics), DevOps Automation Tool (streamlined deployment)
- Experience: Expertise in transforming complex data into actionable insights, cloud infrastructure optimization, and software development
- Background: Strong knowledge in statistical analysis and technological processes

When asked about Manan's skills, projects, experience, or contact information, provide relevant details from the above information.
Keep responses concise (under 150 words), professional, and helpful.
If asked something outside of your knowledge scope, politely explain you can only provide information about Manan's professional background.`;
};
async function registerRoutes(app2) {
  app2.post("/api/chat", async (req, res) => {
    try {
      const { message } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }
      const apiKey = process.env.GROQ_API_KEY;
      if (apiKey) {
        try {
          const apiUrl = "https://api.groq.com/openai/v1/chat/completions";
          const requestBody = {
            model: "llama3-8b-8192",
            // Using Llama 3 model for better responses
            messages: [
              {
                role: "system",
                content: getSystemPrompt()
              },
              {
                role: "user",
                content: message
              }
            ],
            temperature: 0.7,
            max_tokens: 200
          };
          const groqResponse = await fetch(apiUrl, {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${apiKey}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
          });
          if (!groqResponse.ok) {
            throw new Error(`Groq API request failed with status ${groqResponse.status}`);
          }
          const groqData = await groqResponse.json();
          const response2 = groqData.choices[0].message.content;
          return res.json({ response: response2 });
        } catch (error) {
          console.error("Error with Groq API call:", error);
        }
      }
      const lowercaseMessage = message.toLowerCase();
      let response;
      if (lowercaseMessage.includes("skill") || lowercaseMessage.includes("know") || lowercaseMessage.includes("can")) {
        response = "I specialize in Data Analysis (Python, R, statistical modeling), DevOps (CI/CD, Docker, Kubernetes) and Programming (Python, C++, JavaScript, SQL). I'm also experienced with cloud technologies.";
      } else if (lowercaseMessage.includes("project") || lowercaseMessage.includes("work") || lowercaseMessage.includes("portfolio")) {
        response = "I've worked on several key projects including a Data Visualization Dashboard that provides real-time analytics, and a DevOps Automation Tool that streamlines deployment processes.";
      } else if (lowercaseMessage.includes("experience") || lowercaseMessage.includes("background") || lowercaseMessage.includes("history")) {
        response = "I'm a Data Analysis & DevOps professional with extensive experience transforming complex data into actionable insights. My background includes work in statistical analysis, cloud infrastructure optimization, and software development.";
      } else if (lowercaseMessage.includes("contact") || lowercaseMessage.includes("reach") || lowercaseMessage.includes("email")) {
        response = "You can contact me through the contact form on this website, or directly via email. I'm also available on LinkedIn and GitHub - the links are provided in the social section of my portfolio.";
      } else if (lowercaseMessage.includes("hello") || lowercaseMessage.includes("hi") || lowercaseMessage.includes("hey")) {
        response = "Hello! I'm Manan's virtual assistant. I can tell you about my skills, projects, experience, or how to contact me. What would you like to know?";
      } else {
        response = "I'm not sure I understand that query. I can provide information about my skills, projects, professional experience, or contact details. How can I help you today?";
      }
      res.json({ response });
    } catch (error) {
      console.error("Error processing chat message:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2, { dirname as dirname2 } from "path";
import { fileURLToPath as fileURLToPath2 } from "url";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path, { dirname } from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { fileURLToPath } from "url";
var __filename = fileURLToPath(import.meta.url);
var __dirname = dirname(__filename);
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    themePlugin(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  base: "/new123",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets")
    }
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var __filename2 = fileURLToPath2(import.meta.url);
var __dirname2 = dirname2(__filename2);
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        __dirname2,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(__dirname2, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
