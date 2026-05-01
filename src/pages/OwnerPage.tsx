import { useMemo, useState } from 'react';
import {
  barberProfiles,
  barberReports,
  demoUsers,
  paymentSetupChecklist,
  paymentSetupStatus,
  payoutAccounts,
  productInventory,
  productSales,
  rolePermissions,
  taxSummaries
} from '@/data/ownerDemoData';
import { SALON_ADDRESS } from '@/data/salonConfig';
import { buildOwnerOverviewMetrics } from '@/lib/ownerModel';
import { formatPrice } from '@/lib/salonModel';
import type { OwnerTabId } from '@/lib/types';

const ownerTabs: Array<{ id: OwnerTabId; label: string }> = [
  { id: 'overview', label: 'Overview' },
  { id: 'barber-reports', label: 'Barber Reports' },
  { id: 'payouts', label: 'Payouts' },
  { id: 'product-sales', label: 'Product Sales' },
  { id: 'tax-1099', label: 'Tax / 1099' },
  { id: 'payment-setup', label: 'Payment Setup' },
  { id: 'access-control', label: 'Access Control' }
];

export function OwnerPage() {
  const [activeTab, setActiveTab] = useState<OwnerTabId>('overview');
  const overview = useMemo(() => buildOwnerOverviewMetrics({
    barberReports,
    productInventory,
    productSales,
    taxSummaries
  }), []);

  const topSellingProduct = useMemo(() => {
    const byProduct = new Map<string, number>();
    productSales.forEach((sale) => {
      byProduct.set(sale.productName, (byProduct.get(sale.productName) ?? 0) + 1);
    });
    return Array.from(byProduct.entries()).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'Texture Clay';
  }, []);

  const topProductSeller = useMemo(() => {
    const byBarber = new Map<string, number>();
    productSales.forEach((sale) => {
      byBarber.set(sale.barberName, (byBarber.get(sale.barberName) ?? 0) + sale.amount);
    });
    return Array.from(byBarber.entries()).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'Riley Brooks';
  }, []);

  return (
    <main className="view-shell view-shell--admin" id="top">
      <section className="admin-hero" data-demo="owner-overview">
        <div className="admin-hero__copy">
          <p className="eyebrow">Owner view</p>
          <h1>Owner Dashboard.</h1>
          <p className="admin-address">{SALON_ADDRESS}</p>
        </div>
        <p className="admin-hero__note">Track shop revenue, barber payouts, product commissions, inventory, year-end reporting, and user access in one place.</p>
      </section>

      <div className="availability-helper">
        Demo mode uses visible role switching. In production, each user&apos;s login role determines their default view and route access.
      </div>

      <section className="panel owner-tabs-panel">
        <div className="segmented-control owner-tabs" aria-label="Owner dashboard sections">
          {ownerTabs.map((tab) => (
            <button key={tab.id} type="button" className={activeTab === tab.id ? 'is-active' : ''} onClick={() => setActiveTab(tab.id)}>
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {activeTab === 'overview' && (
        <section className="owner-section-stack">
          <div className="admin-metrics-grid owner-metrics-grid">
            <MetricCard label="Weekly Revenue" value={formatPrice(overview.weeklyRevenue)} detail="Combined services and product sales this week." />
            <MetricCard label="Service Revenue" value={formatPrice(overview.serviceRevenue)} detail="All barber-attributed service revenue before payout." />
            <MetricCard label="Product Sales" value={formatPrice(overview.productSales)} detail="Settles to the shop bank account in this demo." />
            <MetricCard label="Refunds" value={formatPrice(overview.refunds)} detail="Refund adjustments applied against the responsible barber." />
            <MetricCard label="Discounts" value={formatPrice(overview.discounts)} detail="Discounts reduce net service revenue before commissions." />
            <MetricCard label="Estimated Barber Payouts" value={formatPrice(overview.estimatedBarberPayouts)} detail="Weekly service payout estimate across all barbers." />
            <MetricCard label="Shop Retained Revenue" value={formatPrice(overview.shopRetainedRevenue)} detail="Shop share after barber payouts and product commissions." />
            <MetricCard label="Appointments This Week" value={String(overview.appointmentsThisWeek)} detail="Scheduled barber appointments across the shop." />
            <MetricCard label="Card Holds Captured" value={String(overview.cardHoldsCaptured)} detail="Card holds collected for cancellation and no-show protection." />
            <MetricCard label="Prepaid Bookings" value={String(overview.prepaidBookings)} detail="Online prepay bookings already marked paid." />
          </div>

          <div className="owner-content-grid">
            <article className="panel admin-side-panel">
              <div className="section-heading section-heading--compact">
                <p className="eyebrow">Weekly owner summary</p>
                <h2>Gross-to-net snapshot</h2>
              </div>
              <div className="stat-list">
                <div><span>Gross service revenue</span><strong>{formatPrice(overview.serviceRevenue)}</strong></div>
                <div><span>Refunds</span><strong>{formatPrice(overview.refunds)}</strong></div>
                <div><span>Discounts</span><strong>{formatPrice(overview.discounts)}</strong></div>
                <div><span>Net service revenue</span><strong>{formatPrice(overview.serviceRevenue - overview.refunds - overview.discounts)}</strong></div>
                <div><span>Product revenue</span><strong>{formatPrice(overview.productSales)}</strong></div>
                <div><span>Estimated barber payouts</span><strong>{formatPrice(overview.estimatedBarberPayouts)}</strong></div>
                <div><span>Product commission owed</span><strong>{formatPrice(overview.productCommissionOwed)}</strong></div>
                <div><span>Shop retained</span><strong>{formatPrice(overview.shopRetainedRevenue)}</strong></div>
              </div>
            </article>
            <article className="panel admin-side-panel">
              <div className="section-heading section-heading--compact">
                <p className="eyebrow">Business highlights</p>
                <h2>Scannable weekly signals</h2>
              </div>
              <div className="inline-list inline-list--wide">
                <div className="mini-card">
                  <strong>{topSellingProduct}</strong>
                  <p>Top selling product</p>
                  <small>Shop bank account settlement</small>
                </div>
                <div className="mini-card">
                  <strong>{topProductSeller}</strong>
                  <p>Top product seller</p>
                  <small>Commission tracked separately</small>
                </div>
                <div className="mini-card">
                  <strong>{overview.lowStockItems}</strong>
                  <p>Low stock items</p>
                  <small>Ready for reorder planning</small>
                </div>
              </div>
            </article>
          </div>
        </section>
      )}

      {activeTab === 'barber-reports' && (
        <section className="owner-section-stack">
          <article className="panel admin-controls">
            <div>
              <p className="eyebrow">Barber reports</p>
              <h2>Weekly commission calculations</h2>
            </div>
            <div className="admin-filter-row">
              <label className="admin-filter-select">
                <span>Date range</span>
                <select defaultValue="This week">
                  <option>This week</option>
                  <option>Last week</option>
                  <option>Month to date</option>
                  <option>Year to date</option>
                </select>
              </label>
              <label className="admin-filter-select">
                <span>Barber</span>
                <select defaultValue="All barbers">
                  <option>All barbers</option>
                  {barberProfiles.map((barber) => <option key={barber.id}>{barber.name}</option>)}
                </select>
              </label>
              <label className="admin-filter-select">
                <span>Payment type</span>
                <select defaultValue="All">
                  <option>All</option>
                  <option>Prepaid</option>
                  <option>In-shop</option>
                  <option>Product</option>
                  <option>Refund</option>
                </select>
              </label>
            </div>
          </article>

          <div className="owner-content-grid">
            <article className="panel appointments-panel">
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Barber</th>
                      <th>Appointments</th>
                      <th>Service Revenue</th>
                      <th>Refunds</th>
                      <th>Discounts</th>
                      <th>Net Service Revenue</th>
                      <th>Tips</th>
                      <th>Commission %</th>
                      <th>Estimated Service Payout</th>
                      <th>Product Sales</th>
                      <th>Product Commission</th>
                      <th>Total Owed</th>
                    </tr>
                  </thead>
                  <tbody>
                    {barberReports.map((report) => (
                      <tr key={report.id}>
                        <td>{report.barberName}</td>
                        <td>{report.appointments}</td>
                        <td>{formatPrice(report.serviceRevenue)}</td>
                        <td>{formatPrice(report.refunds)}</td>
                        <td>{formatPrice(report.discounts)}</td>
                        <td>{formatPrice(report.netServiceRevenue)}</td>
                        <td>{formatPrice(report.tips)}</td>
                        <td>{report.commissionPercent}%</td>
                        <td>{formatPrice(report.estimatedServicePayout)}</td>
                        <td>{formatPrice(report.productSales)}</td>
                        <td>{formatPrice(report.productCommission)}</td>
                        <td>{formatPrice(report.totalOwed)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>
            <article className="panel admin-side-panel">
              <div className="section-heading section-heading--compact">
                <p className="eyebrow">Commission calculation</p>
                <h2>How payouts are modeled</h2>
              </div>
              <p>Weekly barber payouts are calculated from net service revenue after refunds and discounts. Product commissions are tracked separately because product revenue settles to the shop bank account.</p>
            </article>
          </div>
        </section>
      )}

      {activeTab === 'payouts' && (
        <section className="owner-section-stack">
          <div className="admin-metrics-grid barber-metrics-grid">
            <MetricCard label="Shop bank account" value="Connected" detail="Used for product sales and shop-retained revenue." />
            <MetricCard label="Barber payout accounts" value="2 of 3 verified" detail="One barber still needs onboarding in demo mode." />
            <MetricCard label="Transfer routing" value="Demo mode" detail="Service payments can be attributed to the selected barber." />
          </div>
          <article className="panel admin-side-panel">
            <p>Haircut and service payments are attributed to the booked barber. In production, this flow would use Stripe Connect or an equivalent payout provider to route funds according to commission and transfer rules.</p>
          </article>
          <article className="panel appointments-panel">
            <div className="section-heading section-heading--compact">
              <p className="eyebrow">Payout routing mockup</p>
              <h2>Bank and transfer status</h2>
            </div>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Barber</th>
                    <th>Bank Status</th>
                    <th>Stripe Connect Status</th>
                    <th>Service Revenue</th>
                    <th>Refund Adjustments</th>
                    <th>Discount Adjustments</th>
                    <th>Pending Payout</th>
                    <th>Next Payout Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {payoutAccounts.map((account) => (
                    <tr key={account.barberId}>
                      <td>{account.barberName}</td>
                      <td><span className="badge badge--success">{account.bankStatus}</span></td>
                      <td><span className="badge badge--neutral">{account.stripeStatus}</span></td>
                      <td>{formatPrice(account.serviceRevenue)}</td>
                      <td>{formatPrice(account.refundAdjustments)}</td>
                      <td>{formatPrice(account.discountAdjustments)}</td>
                      <td>{formatPrice(account.pendingPayout)}</td>
                      <td>{account.nextPayoutDate}</td>
                      <td><button type="button" className="secondary-action">{account.actionLabel}</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>
        </section>
      )}

      {activeTab === 'product-sales' && (
        <section className="owner-section-stack">
          <div className="admin-metrics-grid owner-metrics-grid">
            <MetricCard label="Product Revenue" value={formatPrice(overview.productSales)} detail="Retail settlement flows to the shop bank account." />
            <MetricCard label="Product Commission Owed" value={formatPrice(overview.productCommissionOwed)} detail="Tracked separately for payout planning." />
            <MetricCard label="Low Stock Items" value={String(overview.lowStockItems)} detail="Threshold-based inventory alerting in demo." />
            <MetricCard label="Top Selling Product" value={topSellingProduct} detail="Current weekly top performer." />
            <MetricCard label="Top Product Seller" value={topProductSeller} detail="Highest retail revenue among barbers this week." />
          </div>
          <div className="owner-content-grid">
            <article className="panel appointments-panel">
              <div className="section-heading section-heading--compact">
                <p className="eyebrow">Product inventory</p>
                <h2>Stock and sell-through</h2>
              </div>
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Category</th>
                      <th>Current Stock</th>
                      <th>Low Stock Threshold</th>
                      <th>Sold This Week</th>
                      <th>Revenue This Week</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productInventory.map((item) => (
                      <tr key={item.id}>
                        <td>{item.product}</td>
                        <td>{item.category}</td>
                        <td>{item.currentStock}</td>
                        <td>{item.lowStockThreshold}</td>
                        <td>{item.soldThisWeek}</td>
                        <td>{formatPrice(item.revenueThisWeek)}</td>
                        <td><span className="badge badge--neutral">{item.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>
            <article className="panel appointments-panel">
              <div className="section-heading section-heading--compact">
                <p className="eyebrow">Product sales</p>
                <h2>Retail commission tracking</h2>
              </div>
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Product</th>
                      <th>Sold By Barber</th>
                      <th>Client</th>
                      <th>Sale Amount</th>
                      <th>Commission Rate</th>
                      <th>Commission Owed</th>
                      <th>Settlement Account</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productSales.slice(0, 12).map((sale) => (
                      <tr key={sale.id}>
                        <td>{sale.date}</td>
                        <td>{sale.productName}</td>
                        <td>{sale.barberName}</td>
                        <td>{sale.clientName}</td>
                        <td>{formatPrice(sale.amount)}</td>
                        <td>{Math.round(sale.commissionRate * 100)}%</td>
                        <td>{formatPrice(sale.commissionOwed)}</td>
                        <td>{sale.settlementAccount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>
          </div>
          <article className="panel admin-side-panel">
            <div className="section-heading section-heading--compact">
              <p className="eyebrow">Product revenue routing</p>
              <h2>Shop settlement behavior</h2>
            </div>
            <p>Product sales settle to the shop bank account. Barber product commissions are tracked separately for weekly, monthly, or year-end payout.</p>
          </article>
        </section>
      )}

      {activeTab === 'tax-1099' && (
        <section className="owner-section-stack">
          <div className="admin-metrics-grid owner-metrics-grid">
            <MetricCard label="YTD Barber Payouts" value={formatPrice(taxSummaries.reduce((total, item) => total + item.ytdServicePayouts, 0))} detail="Service payouts tracked for year-end reporting." />
            <MetricCard label="YTD Product Commissions" value={formatPrice(taxSummaries.reduce((total, item) => total + item.ytdProductCommission, 0))} detail="Retail commissions tracked separately." />
            <MetricCard label="Total Reportable Payments" value={formatPrice(overview.totalReportablePayments)} detail="Combined reportable payments across the team." />
            <MetricCard label="Missing Tax Info" value="1" detail="One barber still needs W-9 collection in demo." />
            <MetricCard label="1099 Ready" value="2 of 3" detail="Mock year-end readiness status." />
          </div>
          <article className="panel admin-side-panel">
            <p>Payment totals are tracked for annual 1099 preparation. Export-ready summaries can be reviewed before filing or delivery.</p>
          </article>
          <article className="panel appointments-panel">
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Barber</th>
                    <th>YTD Service Payouts</th>
                    <th>YTD Product Commission</th>
                    <th>Total Reportable</th>
                    <th>W-9 Status</th>
                    <th>1099 Status</th>
                    <th>Last Updated</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {taxSummaries.map((summary) => (
                    <tr key={summary.barberId}>
                      <td>{summary.barberName}</td>
                      <td>{formatPrice(summary.ytdServicePayouts)}</td>
                      <td>{formatPrice(summary.ytdProductCommission)}</td>
                      <td>{formatPrice(summary.totalReportable)}</td>
                      <td><span className="badge badge--neutral">{summary.w9Status}</span></td>
                      <td><span className="badge badge--neutral">{summary.status1099}</span></td>
                      <td>{summary.lastUpdated}</td>
                      <td>
                        <div className="table-action-row">
                          <button type="button" className="secondary-action">Export CSV</button>
                          <button type="button" className="secondary-action">Preview 1099 Summary</button>
                          <button type="button" className="secondary-action">Mark Reviewed</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>
        </section>
      )}

      {activeTab === 'payment-setup' && (
        <section className="owner-section-stack">
          <div className="owner-setup-grid">
            {paymentSetupStatus.map((item) => (
              <article key={item.id} className="panel admin-side-panel">
                <div className="section-heading section-heading--compact">
                  <p className="eyebrow">{item.title}</p>
                  <h2>{item.status}</h2>
                </div>
                <p><strong>Purpose:</strong> {item.purpose}</p>
                <p>{item.detail}</p>
                {item.bullets && (
                  <div className="inline-list">
                    {item.bullets.map((bullet) => (
                      <span key={bullet} className="badge badge--neutral">{bullet}</span>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
          <article className="panel admin-side-panel">
            <div className="section-heading section-heading--compact">
              <p className="eyebrow">Production direction</p>
              <h2>Infrastructure notes</h2>
            </div>
            <p>Clerk handles authentication and role-based access. Stripe handles payments, card readers, and payout infrastructure.</p>
            <p>Demo mode uses visible role switching. In production, each user&apos;s login role determines their default view and route access.</p>
            <button type="button" className="primary-action" onClick={() => setActiveTab('access-control')}>
              View Access Control
            </button>
          </article>
          <article className="panel admin-side-panel">
            <div className="section-heading section-heading--compact">
              <p className="eyebrow">Launch checklist</p>
              <h2>Readiness checklist</h2>
            </div>
            <div className="checklist-grid">
              {paymentSetupChecklist.map((item) => (
                <label key={item} className="checklist-item">
                  <input type="checkbox" checked readOnly />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </article>
        </section>
      )}

      {activeTab === 'access-control' && (
        <section className="owner-section-stack">
          <div className="admin-metrics-grid owner-metrics-grid">
            <MetricCard label="Owners" value="1" detail="Full shop access." />
            <MetricCard label="Barbers" value="3" detail="Own schedule and own earnings." />
            <MetricCard label="Front Desk" value="1" detail="Scheduling and checkout access." />
            <MetricCard label="Customers" value="128" detail="Booking and profile access." />
            <MetricCard label="Pending invites" value="1" detail="Casey Morgan needs invite completion." />
          </div>
          <article className="panel admin-side-panel">
            <p>Access Control previews how production login permissions would work. In production, Clerk.js or a similar auth provider would assign each user a role after login, then route them to the correct dashboard and restrict protected pages.</p>
            <p>Current demo navigation is intentionally open so the client can preview every role.</p>
          </article>
          <article className="panel appointments-panel">
            <div className="section-heading section-heading--compact">
              <p className="eyebrow">User management</p>
              <h2>Owner-managed role access</h2>
            </div>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Access Level</th>
                    <th>Status</th>
                    <th>Last Login</th>
                    <th>Invite Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {demoUsers.map((user) => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>{user.accessLevel}</td>
                      <td><span className="badge badge--neutral">{user.status}</span></td>
                      <td>{user.lastLogin}</td>
                      <td>{user.inviteStatus}</td>
                      <td>
                        <div className="table-action-row">
                          <button type="button" className="secondary-action">Change role</button>
                          <button type="button" className="secondary-action">Resend invite</button>
                          <button type="button" className="secondary-action">Disable access</button>
                          <button type="button" className="secondary-action">View permissions</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>
          <article className="panel appointments-panel">
            <div className="section-heading section-heading--compact">
              <p className="eyebrow">Permissions matrix</p>
              <h2>Role-based route and feature access</h2>
            </div>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th>Owner</th>
                    <th>Barber</th>
                    <th>Front Desk</th>
                    <th>Customer</th>
                  </tr>
                </thead>
                <tbody>
                  {rolePermissions.map((permission) => (
                    <tr key={permission.feature}>
                      <td>{permission.feature}</td>
                      <td>{permission.owner ? 'Yes' : 'No'}</td>
                      <td>{permission.barber ? 'Yes' : 'No'}</td>
                      <td>{permission.frontDesk ? 'Yes' : 'No'}</td>
                      <td>{permission.customer ? 'Yes' : 'No'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>
        </section>
      )}
    </main>
  );
}

function MetricCard({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <article className="panel admin-metric-card">
      <p className="eyebrow">{label}</p>
      <strong>{value}</strong>
      <p>{detail}</p>
    </article>
  );
}
