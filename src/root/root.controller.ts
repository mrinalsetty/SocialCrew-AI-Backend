import { Controller, Get, Header } from '@nestjs/common';

@Controller()
export class RootController {
  @Get()
  @Header('Content-Type', 'text/html; charset=utf-8')
  getDashboard(): string {
    const frontendUrl = process.env.FRONTEND_APP_URL || 'http://localhost:3000';

    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>SocialCrew AI Backend</title>
  <style>
    :root {
      --bg: #020617;
      --panel: rgba(255,255,255,0.03);
      --border: rgba(255,255,255,0.10);
      --text: #e5f9ff;
      --muted: rgba(255,255,255,0.55);
      --cyan: #22d3ee;
      --green: #34d399;
      --orange: #fb923c;
    }

    * { box-sizing: border-box; }

    body {
      margin: 0;
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      background:
        radial-gradient(circle at top, rgba(34,211,238,0.10), transparent 28%),
        var(--bg);
      color: var(--text);
      min-height: 100vh;
    }

    .container {
      max-width: 1100px;
      margin: 0 auto;
      padding: 40px 24px;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 16px;
      border-bottom: 1px solid var(--border);
      padding-bottom: 18px;
      margin-bottom: 28px;
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
      justify-content: flex-end;
    }

    .title {
      font-size: 38px;
      font-weight: 800;
      color: var(--cyan);
      margin: 0;
      letter-spacing: -0.03em;
    }

    .subtitle {
      margin-top: 8px;
      color: var(--muted);
      font-size: 14px;
    }

    .status-badge {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      border-radius: 999px;
      padding: 10px 14px;
      border: 1px solid var(--border);
      font-size: 14px;
      font-weight: 600;
      background: rgba(255,255,255,0.03);
    }

    .status-dot {
      width: 10px;
      height: 10px;
      border-radius: 999px;
      background: var(--orange);
      box-shadow: 0 0 14px rgba(251,146,60,0.85);
    }

    .header-link {
      color: #04131a;
      font-weight: 700;
      text-decoration: none;
      border: 1px solid rgba(34,211,238,0.25);
      background: var(--cyan);
      padding: 10px 14px;
      border-radius: 999px;
      font-size: 14px;
      transition: opacity 0.2s ease;
    }

    .header-link:hover {
      opacity: 0.92;
    }

    .grid {
      display: grid;
      gap: 20px;
    }

    .grid.cards {
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      margin-bottom: 24px;
    }

    .two-col {
      grid-template-columns: 1.1fr 0.9fr;
    }

    @media (max-width: 900px) {
      .two-col {
        grid-template-columns: 1fr;
      }
    }

    .card {
      background: var(--panel);
      border: 1px solid var(--border);
      border-radius: 24px;
      padding: 20px;
      box-shadow:
        0 0 0 1px rgba(255,255,255,0.02),
        0 0 28px rgba(34,211,238,0.04);
    }

    .label {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.18em;
      color: rgba(34,211,238,0.75);
      margin-bottom: 10px;
    }

    .value {
      font-size: 22px;
      font-weight: 700;
      color: white;
    }

    .subvalue {
      margin-top: 6px;
      color: var(--muted);
      font-size: 13px;
      word-break: break-word;
    }

    .section-title {
      font-size: 24px;
      font-weight: 700;
      color: var(--cyan);
      margin: 0 0 16px;
    }

    .stack {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .pill {
      border-radius: 999px;
      border: 1px solid var(--border);
      background: rgba(0,0,0,0.35);
      padding: 8px 12px;
      font-size: 13px;
      color: rgba(255,255,255,0.85);
    }

    .steps {
      display: grid;
      gap: 12px;
    }

    .step {
      display: flex;
      gap: 14px;
      border: 1px solid var(--border);
      background: rgba(0,0,0,0.35);
      border-radius: 18px;
      padding: 14px;
    }

    .step-index {
      width: 32px;
      height: 32px;
      min-width: 32px;
      border-radius: 999px;
      display: grid;
      place-items: center;
      background: rgba(34,211,238,0.10);
      color: var(--cyan);
      font-weight: 700;
    }

    .step-text {
      color: rgba(255,255,255,0.80);
      font-size: 14px;
      line-height: 1.6;
    }

    .links {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 14px;
    }

    .link {
      color: var(--cyan);
      text-decoration: none;
      border: 1px solid rgba(34,211,238,0.22);
      background: rgba(34,211,238,0.08);
      padding: 10px 14px;
      border-radius: 14px;
      font-size: 14px;
    }

    pre {
      overflow: auto;
      border-radius: 18px;
      border: 1px solid var(--border);
      background: rgba(0,0,0,0.40);
      padding: 14px;
      color: rgba(255,255,255,0.78);
      font-size: 12px;
      line-height: 1.65;
      margin: 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div>
        <h1 class="title">SocialCrew AI Backend</h1>
        <div class="subtitle">
          Backend dashboard UI for health, architecture, stack, and live status
        </div>
      </div>

      <div class="header-actions">
        <a class="header-link" href="${frontendUrl}" target="_blank" rel="noreferrer">Open Frontend App</a>

        <div id="statusBadge" class="status-badge">
          <span id="statusDot" class="status-dot"></span>
          <span id="statusText">Checking backend…</span>
        </div>
      </div>
    </div>

    <div class="grid cards">
      <div class="card">
        <div class="label">Service</div>
        <div id="serviceName" class="value">Loading…</div>
        <div id="serviceVersion" class="subvalue">—</div>
      </div>

      <div class="card">
        <div class="label">Runtime</div>
        <div id="graphRuntime" class="value">Loading…</div>
        <div id="llmProvider" class="subvalue">—</div>
      </div>

      <div class="card">
        <div class="label">Uptime</div>
        <div id="uptime" class="value">Loading…</div>
        <div id="timestamp" class="subvalue">—</div>
      </div>

      <div class="card">
        <div class="label">Models</div>
        <div id="creatorModel" class="value" style="font-size:16px;">Loading…</div>
        <div id="analystModel" class="subvalue">—</div>
      </div>
    </div>

    <div class="grid two-col">
      <section class="card">
        <h2 class="section-title">Architecture</h2>
        <div id="architecture" class="steps">
          <div class="step">
            <div class="step-index">…</div>
            <div class="step-text">Loading backend architecture…</div>
          </div>
        </div>

        <div class="links">
          <a class="link" href="/health" target="_blank" rel="noreferrer">Open /health</a>
          <a class="link" href="/system/meta" target="_blank" rel="noreferrer">Open /system/meta</a>
        </div>
      </section>

      <section class="grid" style="gap:20px;">
        <div class="card">
          <h2 class="section-title">Stack</h2>
          <div class="label">Runtime</div>
          <div id="runtimeStack" class="stack"></div>

          <div class="label" style="margin-top:16px;">AI</div>
          <div id="aiStack" class="stack"></div>

          <div class="label" style="margin-top:16px;">Deployment</div>
          <div id="deploymentStack" class="stack"></div>
        </div>

        <div class="card">
          <h2 class="section-title">Health JSON</h2>
          <pre id="healthJson">{}</pre>
        </div>
      </section>
    </div>
  </div>

  <script>
    const statusDot = document.getElementById('statusDot');
    const statusText = document.getElementById('statusText');
    const statusBadge = document.getElementById('statusBadge');

    function setOnlineUI(isOnline) {
      if (isOnline) {
        statusDot.style.background = 'var(--green)';
        statusDot.style.boxShadow = '0 0 14px rgba(52,211,153,0.85)';
        statusText.textContent = 'Backend online';
        statusBadge.style.borderColor = 'rgba(52,211,153,0.35)';
        statusBadge.style.background = 'rgba(52,211,153,0.10)';
        statusText.style.color = 'var(--green)';
      } else {
        statusDot.style.background = 'var(--orange)';
        statusDot.style.boxShadow = '0 0 14px rgba(251,146,60,0.85)';
        statusText.textContent = 'Backend sleeping / unavailable';
        statusBadge.style.borderColor = 'rgba(251,146,60,0.35)';
        statusBadge.style.background = 'rgba(251,146,60,0.10)';
        statusText.style.color = 'var(--orange)';
      }
    }

    function setText(id, value) {
      const el = document.getElementById(id);
      if (el) el.textContent = value;
    }

    function renderPills(id, items) {
      const root = document.getElementById(id);
      if (!root) return;
      root.innerHTML = '';
      if (!Array.isArray(items) || items.length === 0) {
        root.innerHTML = '<span class="pill">Unavailable</span>';
        return;
      }
      items.forEach((item) => {
        const span = document.createElement('span');
        span.className = 'pill';
        span.textContent = item;
        root.appendChild(span);
      });
    }

    function renderArchitecture(items) {
      const root = document.getElementById('architecture');
      if (!root) return;
      root.innerHTML = '';

      if (!Array.isArray(items) || items.length === 0) {
        root.innerHTML = '<div class="step"><div class="step-index">!</div><div class="step-text">No architecture metadata available.</div></div>';
        return;
      }

      items.forEach((item, index) => {
        const wrapper = document.createElement('div');
        wrapper.className = 'step';
        wrapper.innerHTML = '<div class="step-index">' + (index + 1) + '</div><div class="step-text">' + item + '</div>';
        root.appendChild(wrapper);
      });
    }

    async function loadDashboard() {
      try {
        const [healthRes, metaRes] = await Promise.all([
          fetch('/health', { cache: 'no-store' }),
          fetch('/system/meta', { cache: 'no-store' }),
        ]);

        if (!healthRes.ok || !metaRes.ok) {
          throw new Error('Backend endpoints unavailable');
        }

        const health = await healthRes.json();
        const meta = await metaRes.json();

        setOnlineUI(true);

        setText('serviceName', health.service || 'SocialCrew AI Backend');
        setText('serviceVersion', health.version || '—');
        setText('graphRuntime', health.graphRuntime || '—');
        setText('llmProvider', health.llmProvider || '—');
        setText('uptime', String((health.uptimeSeconds ?? 0)) + 's');
        setText('timestamp', health.timestamp || '—');
        setText('creatorModel', health.creatorModel || '—');
        setText('analystModel', health.analystModel || '—');

        renderArchitecture(meta.architecture || []);
        renderPills('runtimeStack', meta.stack?.runtime || []);
        renderPills('aiStack', meta.stack?.ai || []);
        renderPills('deploymentStack', meta.stack?.deployment || []);

        const healthJson = document.getElementById('healthJson');
        if (healthJson) {
          healthJson.textContent = JSON.stringify(health, null, 2);
        }
      } catch (error) {
        setOnlineUI(false);
      }
    }

    loadDashboard();
    setInterval(loadDashboard, 15000);
  </script>
</body>
</html>
    `;
  }
}
