/**
 * KI-M4N Contact Form Worker
 * Receives contact form submissions and forwards to Discord webhook
 * 
 * Deploy: wrangler deploy worker.js
 * Set secret: wrangler secret put DISCORD_WEBHOOK_URL
 */

const HTML_SAFE_PATTERN = /<[^>]*>/g;
const RATE_LIMIT_WINDOW = 60; // seconds
const RATE_LIMIT_MAX = 3; // requests per window

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

const jsonResponse = (data, status = 200) => {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...CORS_HEADERS },
  });
};

const PRIORITY_CONFIG = {
  "MISSION_CRITICAL": { color: 0xFF0000, emoji: "🚨", title: "MISSION CRITICAL" },
  "SYSTEM_AUDIT": { color: 0xFFA500, emoji: "🔧", title: "SYSTEM AUDIT" },
  "COLLABORATION": { color: 0x0099FF, emoji: "🤝", title: "COLLABORATION" },
  "GENERAL BRIEFING": { color: 0x00FF00, emoji: "📋", title: "GENERAL BRIEFING" }
};

const ipCache = new Map();

function getClientIP(request) {
  const cf = request.headers.get("CF-Connecting-IP");
  if (cf) return cf;
  const forwarded = request.headers.get("X-Forwarded-For");
  if (forwarded) return forwarded.split(",")[0].trim();
  return "unknown";
}

function checkRateLimit(ip) {
  const now = Date.now();
  const windowStart = now - (RATE_LIMIT_WINDOW * 1000);
  
  if (!ipCache.has(ip)) {
    ipCache.set(ip, { count: 1, windowStart: now });
    return true;
  }
  
  const record = ipCache.get(ip);
  
  if (record.windowStart < windowStart) {
    record.count = 1;
    record.windowStart = now;
    return true;
  }
  
  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }
  
  record.count++;
  return true;
}

function sanitizeInput(input, maxLength = 2000) {
  if (!input || typeof input !== "string") return "";
  return input
    .replace(HTML_SAFE_PATTERN, "")
    .substring(0, maxLength)
    .trim();
}

function validateEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

async function sendDiscordWebhook(webhookUrl, embed) {
  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: "KI-M4N Contact System",
      avatar_url: "https://ki-m4n.dev/favicon.svg",
      embeds: [embed]
    })
  });
  
  return response.ok;
}

export default {
  async fetch(request, env) {
    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    if (request.method !== "POST") {
      return jsonResponse({ error: "Method not allowed" }, 405);
    }

    const webhookUrl = env.DISCORD_WEBHOOK_URL;
    if (!webhookUrl) {
      return jsonResponse({ error: "Webhook not configured" }, 500);
    }

    const clientIP = getClientIP(request);
    if (!checkRateLimit(clientIP)) {
      return jsonResponse({ error: "Rate limit exceeded. Try again later." }, 429);
    }

    try {
      const body = await request.json();
      const { email, priority, message } = body;

      if (!email || !message) {
        return jsonResponse({ error: "Email and message are required" }, 400);
      }

      const sanitizedEmail = sanitizeInput(email, 254);
      const sanitizedMessage = sanitizeInput(message, 2000);
      const sanitizedPriority = sanitizeInput(priority || "GENERAL BRIEFING", 50);

      if (!validateEmail(sanitizedEmail)) {
        return jsonResponse({ error: "Invalid email format" }, 400);
      }

      const priorityKey = sanitizedPriority.toUpperCase();
      const priorityConfig = PRIORITY_CONFIG[priorityKey] || PRIORITY_CONFIG["GENERAL BRIEFING"];

      const timestamp = new Date().toISOString();
      const embed = {
        title: `${priorityConfig.emoji} KI-M4N ${priorityConfig.title}`,
        color: priorityConfig.color,
        fields: [
          {
            name: "👤 Email",
            value: sanitizedEmail,
            inline: true
          },
          {
            name: "🎯 Priority",
            value: priorityConfig.title,
            inline: true
          },
          {
            name: "🌍 IP Address",
            value: clientIP,
            inline: true
          },
          {
            name: "🕒 Timestamp",
            value: timestamp,
            inline: true
          }
        ],
        description: `📝 **Message:**\n${sanitizedMessage}`,
        footer: {
          text: "KI-M4N Contact System | Secure Form Submission",
          icon_url: "https://ki-m4n.dev/favicon.svg"
        },
        timestamp: timestamp
      };

      const success = await sendDiscordWebhook(webhookUrl, embed);

      if (!success) {
        return new Response(JSON.stringify({ error: "Failed to send to Discord" }), {
          status: 500,
          headers: { "Content-Type": "application/json" }
        });
      }

      return jsonResponse({ 
        success: true, 
        message: "Message transmitted successfully" 
      });

    } catch (error) {
      return jsonResponse({ error: "Invalid request body" }, 400);
    }
  }
};
