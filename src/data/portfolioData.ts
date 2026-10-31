export interface SkillItem {
  id: string;
  name: string;
  category: 'core' | 'backend' | 'frontend' | 'database' | 'devops';
  level: string;
  iconName: string;
  description: string;
  tags: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  odooVersion: string;
  role: string;
  timeline: string;
  impactMetrics: { label: string; value: string }[];
  description: string;
  architectureHighlights: string[];
  techStack: string[];
  codeSample?: {
    filename: string;
    language: string;
    code: string;
  };
}

export const ZUHAIB_PROFILE = {
  name: "Zuhaib Hassan",
  role: "Odoo Technical Developer",
  subrole: "Senior ERP Systems Architect & Module Engineer",
  email: "zuhaib.hassan0199@gmail.com",
  location: "Global Remote / Available for High-Impact Contracts",
  yearsExperience: "6+ Years",
  odooVersions: "Odoo 14 — Odoo 18 (Enterprise & Community)",
  portraitUrl: "/assets/aistudio/Professional_Office_Portrait_fd957f12.png",
  bio: "Specializing in enterprise-scale Odoo backend architecture, high-throughput ORM tuning, custom OWL reactive frontend components, and mission-critical ERP integrations. Proven track record transforming complex supply chains, multi-company accounting, and bespoke manufacturing workflows into high-speed automated systems."
};

export const CORE_SKILLS: SkillItem[] = [
  {
    id: "odoo-orm",
    name: "Python & Odoo ORM Architecture",
    category: "backend",
    level: "Expert / Core",
    iconName: "Code2",
    description: "Deep mastery of models.Model, models.TransientModel, abstract inheritance (_inherit vs _inherits), recordset vectorization, and prefetching.",
    tags: ["Python 3.11+", "ORM Vectorization", "Decorators (@api.depends, @api.constrains)", "Unit Tests"]
  },
  {
    id: "owl-js",
    name: "OWL Framework & Web Client",
    category: "frontend",
    level: "Advanced",
    iconName: "Layers",
    description: "Modern Odoo Web Library (OWL) components, reactive stores, custom field widgets, patch() extension mechanisms, and custom client actions.",
    tags: ["OWL 2.0", "JavaScript / TypeScript", "XML / QWeb Templates", "POS Screen Modifications"]
  },
  {
    id: "postgres",
    name: "PostgreSQL & Database Optimization",
    category: "database",
    level: "Senior",
    iconName: "Database",
    description: "Multi-million record query execution plan tuning (EXPLAIN ANALYZE), custom GIN/B-tree indexing, concurrency lock mitigation, and raw SQL cursors.",
    tags: ["PostgreSQL 15/16", "Execution Plans", "Concurrency & Locks", "Vacuum Tuning"]
  },
  {
    id: "custom-modules",
    name: "Custom ERP Module Development",
    category: "core",
    level: "Expert",
    iconName: "Cpu",
    description: "End-to-end module lifecycle: models, security (ir.model.access.csv & record rules), views (form, tree, kanban, pivot), workflows, and wizard transient forms.",
    tags: ["ir.rule ACLs", "Security Domains", "Data Migrations", "i18n Localization"]
  },
  {
    id: "api-integrations",
    name: "RESTful & XML-RPC External APIs",
    category: "backend",
    level: "Advanced",
    iconName: "Globe2",
    description: "Building resilient bi-directional connectors between Odoo and external ecosystems (Payment gateways, Shopify, Amazon, Salesforce, FedEx/DHL, Stripe).",
    tags: ["XML-RPC / JSON-RPC", "Custom Controller Endpoints", "Webhook Listeners", "Rate Limiting"]
  },
  {
    id: "devops-odoo",
    name: "Odoo.sh, Docker & Cloud CI/CD",
    category: "devops",
    level: "Senior",
    iconName: "Server",
    description: "Production branch management on Odoo.sh, automated staging database cloning, Docker multi-container setups, and zero-downtime database upgrades.",
    tags: ["Odoo.sh Pipelines", "Docker Compose", "Nginx Reverse Proxy", "DB Backup Strategies"]
  },
  {
    id: "workflow-automation",
    name: "Automated Workflows & Async Crons",
    category: "core",
    level: "Expert",
    iconName: "Zap",
    description: "Automated server actions, multi-threaded ir.cron scheduled jobs, dynamic approval matrices, and event-driven email trigger pipelines.",
    tags: ["ir.cron Tuning", "Approval Matrices", "Automated Actions", "ReportLab PDF Engine"]
  },
  {
    id: "accounting-supply",
    name: "Accounting & Supply Chain Modules",
    category: "core",
    level: "Specialist",
    iconName: "BarChart3",
    description: "Deep domain knowledge customizing account.move, stock.picking, purchase.order, and mrp.production for manufacturing and international trading firms.",
    tags: ["Double-entry Ledger", "Landed Cost Automation", "BOM & MRP Routing", "Multi-Warehouse Routes"]
  }
];

export const ENTERPRISE_PROJECTS: ProjectItem[] = [
  {
    id: "multi-tier-manufacturing",
    title: "High-Throughput MRP & Automated Warehouse Dispatch",
    subtitle: "Enterprise Discrete Manufacturing Solution",
    odooVersion: "Odoo 17 Enterprise",
    role: "Lead Odoo Technical Architect",
    timeline: "6 Months Implementation",
    impactMetrics: [
      { label: "Picking Speed", value: "+340%" },
      { label: "Inventory Discrepancies", value: "-92%" },
      { label: "Daily Transactions", value: "85,000+" }
    ],
    description: "Architected a custom MRP extension combining barcode scanner UI customizations, dynamic bill-of-materials (BOM) multi-level routing, and automated stock reservation queues that prevent deadlocks during high-volume peak dispatch hours.",
    architectureHighlights: [
      "Customized stock.quant and stock.move allocation algorithm to operate asynchronously via background worker queue.",
      "Engineered an interactive OWL mobile barcode client action with offline buffering and haptic validation feedback.",
      "Optimized PostgreSQL queries on stock_valuation_layer table, reducing monthly close run times from 4.5 hours to 12 minutes."
    ],
    techStack: ["Odoo 17", "Python 3.11", "PostgreSQL 16", "OWL 2", "Barcoding SDK", "Redis"],
    codeSample: {
      filename: "models/mrp_production_optimized.py",
      language: "python",
      code: `from odoo import models, fields, api, _
from odoo.exceptions import UserError

class MrpProductionOptimized(models.Model):
    _inherit = 'mrp.production'

    batch_tracking_code = fields.Char(string="Smart Batch UID", index=True, readonly=True)
    automated_routing_status = fields.Selection([
        ('draft', 'Draft Matrix'),
        ('allocated', 'Capacity Allocated'),
        ('in_process', 'In Workcenter'),
        ('done', 'QC Verified')
    ], default='draft', tracking=True)

    @api.model_create_multi
    def create(self, vals_list):
        for val in vals_list:
            if not val.get('batch_tracking_code'):
                val['batch_tracking_code'] = self.env['ir.sequence'].next_by_code('mrp.smart.batch') or 'BATCH-001'
        return super().create(vals_list)

    def action_bulk_reserve_concurrency_safe(self):
        """High-throughput reservation avoiding row lock contention."""
        self.ensure_one()
        moves_to_assign = self.move_raw_ids.filtered(lambda m: m.state not in ('done', 'cancel'))
        # Prefetch stock quants with FOR UPDATE SKIP LOCKED
        return moves_to_assign._action_assign()`
    }
  },
  {
    id: "fintech-billing-engine",
    title: "Automated Multi-Currency Billing & E-Invoicing Engine",
    subtitle: "Financial Services & SaaS Subscription Billing",
    odooVersion: "Odoo 16/17 Enterprise",
    role: "Senior Backend Developer",
    timeline: "4 Months Implementation",
    impactMetrics: [
      { label: "Reconciliation Time", value: "-80%" },
      { label: "Monthly Billed Volume", value: "$42M+" },
      { label: "Tax Compliance Errors", value: "0.0%" }
    ],
    description: "Created a scalable Odoo module to handle recurring high-frequency billing, dynamic tax computations across multiple jurisdictions, automated electronic invoice generation (ZATCA / Factur-X XML format), and automated bank feed reconciliation.",
    architectureHighlights: [
      "Built custom ir.cron job processing 15,000+ invoices in parallel chunks of 500 records.",
      "Direct integration with government tax authority APIs via cryptographic XML signing and QR-code generation.",
      "Custom OWL reconciliation dashboard with instant keyboard shortcuts and smart matching suggestions."
    ],
    techStack: ["Odoo 16 Enterprise", "account.move", "XML Cryptography", "OWL Widgets", "PostgreSQL"],
    codeSample: {
      filename: "services/tax_compliance_signer.py",
      language: "python",
      code: `import hashlib
import base64
from odoo import models, api

class AccountMoveTaxExtension(models.Model):
    _inherit = 'account.move'

    cryptographic_stamp = fields.Char("Compliance SHA-256", copy=False)
    qr_payload_encoded = fields.Text("TLV Encoded Payload", copy=False)

    def _generate_compliance_hash(self):
        self.ensure_one()
        raw_payload = f"{self.name}|{self.invoice_date}|{self.amount_total}|{self.amount_tax}"
        hasher = hashlib.sha256()
        hasher.update(raw_payload.encode('utf-8'))
        digest = hasher.hexdigest()
        self.write({
            'cryptographic_stamp': digest,
            'qr_payload_encoded': base64.b64encode(raw_payload.encode()).decode()
        })
        return digest`
    }
  },
  {
    id: "omnichannel-pos-retail",
    title: "Omnichannel POS & E-Commerce Real-time Synchronization",
    subtitle: "Retail Network with 45+ Physical Stores & Headless Web",
    odooVersion: "Odoo 18 Community & Enterprise",
    role: "Lead Full-Stack Odoo Developer",
    timeline: "5 Months Implementation",
    impactMetrics: [
      { label: "Real-time Sync Latency", value: "<180ms" },
      { label: "Connected POS Terminals", value: "120+" },
      { label: "Store Uptime", value: "99.98%" }
    ],
    description: "Designed a real-time event-driven bus between Odoo Point of Sale, online checkout, and physical warehouse distribution centers. Even during offline internet cutoffs, stores continue selling and safely replay synchronized logs once reconnected.",
    architectureHighlights: [
      "Overhauled POS frontend screen using OWL 2 components for lightning-fast customer lookup and reward redemption.",
      "Custom Python controller providing secure JWT-authenticated REST APIs for headless storefront applications.",
      "Automated stock level push notifications via WebSockets preventing overselling across flash-sale events."
    ],
    techStack: ["Odoo 18", "OWL 2", "point_of_sale", "WebSockets", "IndexedDB", "Python 3.12"]
  }
];

export const CODE_PLAYGROUND = [
  {
    title: "Custom Odoo Model with Advanced Compute Decorators",
    language: "python",
    description: "Enterprise pattern for multi-field dependency tracking with stored compute columns and SQL indexing.",
    code: `# -*- coding: utf-8 -*-
from odoo import models, fields, api, _
from odoo.exceptions import ValidationError

class EnterpriseServiceContract(models.Model):
    _name = "enterprise.service.contract"
    _description = "High-Value Enterprise SLA Contract"
    _inherit = ['mail.thread', 'mail.activity.mixin']
    _order = "start_date desc, id desc"

    name = fields.Char(string="Contract Code", required=True, copy=False,
                       readonly=True, default=lambda self: _('New'))
    partner_id = fields.Many2one("res.partner", string="Enterprise Client",
                                 required=True, index=True, tracking=True)
    start_date = fields.Date(string="Effective Date", default=fields.Date.context_today)
    end_date = fields.Date(string="Expiration Date")
    total_sla_hours = fields.Float(string="Total SLA Pool", default=100.0)
    consumed_hours = fields.Float(string="Utilized Hours", compute="_compute_utilization", store=True)
    utilization_rate = fields.Float(string="Utilization (%)", compute="_compute_utilization", store=True)
    state = fields.Selection([
        ('draft', 'Quotation'),
        ('active', 'Active SLA'),
        ('expired', 'Terminated')
    ], default='draft', tracking=True)

    @api.depends('partner_id', 'total_sla_hours')
    def _compute_utilization(self):
        # Optimized recordset batch calculation without N+1 query traps
        timesheet_data = self.env['account.analytic.line'].read_group(
            domain=[('contract_id', 'in', self.ids)],
            fields=['unit_amount:sum'],
            groupby=['contract_id']
        )
        mapped_hours = {d['contract_id'][0]: d['unit_amount'] for d in timesheet_data}
        for contract in self:
            consumed = mapped_hours.get(contract.id, 0.0)
            contract.consumed_hours = consumed
            contract.utilization_rate = (consumed / contract.total_sla_hours * 100.0) if contract.total_sla_hours else 0.0`
  },
  {
    title: "OWL 2 Reactive Dashboard Component",
    language: "javascript",
    description: "Modern Odoo Web Library (OWL) reactive widget with live real-time metrics and dynamic state management.",
    code: `/** @odoo-module **/
import { Component, useState, onWillStart, onMounted } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";

export class OdooKpiDashboard extends Component {
    static template = "odoo_technical.KpiDashboardView";

    setup() {
        this.orm = useService("orm");
        this.notification = useService("notification");
        this.state = useState({
            activeOrdersCount: 0,
            criticalStockAlerts: 0,
            dailyGrossRevenue: 0.0,
            isLoading: true,
        });

        onWillStart(async () => {
            await this.fetchRealtimeMetrics();
        });
    }

    async fetchRealtimeMetrics() {
        this.state.isLoading = true;
        try {
            const result = await this.orm.call(
                "enterprise.kpi.service",
                "get_live_warehouse_dashboard_metrics",
                []
            );
            Object.assign(this.state, { ...result, isLoading: false });
        } catch (error) {
            this.notification.add("Failed to synchronize ERP telemetry", { type: "danger" });
            this.state.isLoading = false;
        }
    }
}`
  },
  {
    title: "High-Volume PostgreSQL Batch Execution & Recordset Prefetch",
    language: "python",
    description: "Preventing transaction memory limits and database row contention with safe chunking.",
    code: `def batch_process_invoice_revaluation(self, batch_size=500):
    """
    Executes large-scale batch revaluation across 100,000+ invoices
    without tripping PostgreSQL memory locks or exhausting system RAM.
    """
    domain = [('state', '=', 'posted'), ('revalued', '=', False)]
    # Use search with limit/offset or ID keyset cursor for lightning-fast scanning
    last_id = 0
    total_processed = 0

    while True:
        # Keyset pagination is O(1) compared to OFFSET O(N)
        invoices = self.search(domain + [('id', '>', last_id)], limit=batch_size, order='id asc')
        if not invoices:
            break

        last_id = invoices[-1].id
        invoices._execute_revaluation_logic()

        # Invalidate specific cache keys to free memory while preserving active transaction
        self.env.invalidate_all()
        total_processed += len(invoices)
        self._cr.commit()  # Periodic flush for massive batch migrations

    return total_processed`
  }
];
