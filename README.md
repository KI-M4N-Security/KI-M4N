# BLUE PILL - MEDUSA PROJECT
🟦 SKIN v0.1 — Human-Centric Defensive Operations Platform

Fast. Local. Human-Readable.
SKIN is a lightweight defensive operations stack for operators who want answers, not dashboards full of noise.

🧠 Philosophy

Most security stacks are built for enterprises.

SKIN is built for:

Solo defenders

Small teams

Red/Blue operators

Labs, field ops, rapid response

No SIEM fatigue. No vendor lock-in. No nonsense.

SKIN answers one core question:

“What is happening right now, and should I care?”

🟦 Why SKIN instead of a SIEM?
Traditional SIEM	SKIN
Heavy ingestion	Selective visibility
Alert overload	Human-labeled signals
Enterprise-only	Laptop → Server ready
Weeks to tune	Usable in minutes

SKIN is not a replacement for enterprise SIEMs.

It’s a tactical layer — the place where humans actually look.

🧩 What’s Inside (v0.1)
🧠 Brain

OpenSearch – fast, local, open

OpenSearch Dashboards – human-first visuals

🛰 Sensors

Zeek – network metadata (what really happened)

Suricata – IDS (quiet, intentional rules)

osquery – endpoint truth

🚚 Transport

Filebeat – lightweight log shipping

All orchestrated with Docker Compose.

📁 Repository Structure
skin/
├─ docker-compose.yml
├─ README.md
├─ .env
├─ .gitignore
│
├─ configs/
│  ├─ filebeat/
│  │  └─ filebeat.yml
│  ├─ osquery/
│  │  └─ osquery.conf
│  ├─ zeek/
│  │  └─ local.zeek
│  └─ suricata/
│     └─ suricata.yaml
│
├─ dashboards/
│  └─ skin-v0.1.ndjson
│
└─ screenshots/

🚀 Quick Start

1️⃣ Clone
git clone https://github.com/yourname/skin.git
cd skin

2️⃣ Configure

Edit .env if needed (defaults are safe).

3️⃣ Deploy
docker compose up -d
4️⃣ Access

OpenSearch Dashboards → http://localhost:5601

Import the dashboard:

Dashboards → Saved Objects → Import skin-v0.1.ndjson

📊 What You’ll See First

Live network connections (Zeek)

IDS alerts with human labels

Endpoint process execution

DNS anomalies

Beacon-like behavior

No ML magic. No black boxes.

Just truth you can explain.

🧪 Use Cases

Home lab defense

Purple team exercises

Rogue AP detection

Lateral movement spotting

Credential harvesting detection

🧭 Roadmap
v0.2 (Planned)

Behavioral tagging

Timeline view

Attack story reconstruction

v1.0 (Future)

Multi-host federation

Remote sensors

Pro rule packs

⚠️ Disclaimer

This project is for defensive security and research purposes only.

You are responsible for how you deploy and use it.

🟦 Final Note

SKIN is opinionated by design.

If you want:

More data → use a SIEM

More alerts → buy a product

If you want clarity → use SKIN.

Built by operators, for operators.
