import type {
  BarberProfile,
  BarberReport,
  DemoUserAccess,
  PaymentSetupItem,
  PayoutAccount,
  ProductInventoryItem,
  ProductSale,
  RolePermissionRow,
  TaxSummary
} from '@/lib/types';

export const defaultBarberId = 'barber-jordan';

export const barberProfiles: BarberProfile[] = [
  {
    id: 'barber-jordan',
    name: 'Jordan Lee',
    role: 'Barber',
    commissionRate: 0.5,
    productCommissionRate: 0.1,
    bankStatus: 'Connected',
    stripeStatus: 'Verified',
    payoutMethod: 'Weekly ACH payout',
    nextPayoutDate: '2026-05-01',
    initials: 'JL'
  },
  {
    id: 'barber-casey',
    name: 'Casey Morgan',
    role: 'Barber',
    commissionRate: 0.45,
    productCommissionRate: 0.08,
    bankStatus: 'Needs onboarding',
    stripeStatus: 'Pending verification',
    payoutMethod: 'Onboarding in progress',
    nextPayoutDate: '2026-05-01',
    initials: 'CM'
  },
  {
    id: 'barber-riley',
    name: 'Riley Brooks',
    role: 'Barber',
    commissionRate: 0.52,
    productCommissionRate: 0.09,
    bankStatus: 'Connected',
    stripeStatus: 'Verified',
    payoutMethod: 'Weekly ACH payout',
    nextPayoutDate: '2026-05-01',
    initials: 'RB'
  }
];

export const barberReports: BarberReport[] = [
  {
    id: 'report-jordan',
    barberId: 'barber-jordan',
    barberName: 'Jordan Lee',
    dateRange: 'This week',
    paymentType: 'All',
    appointments: 17,
    serviceRevenue: 1380,
    refunds: 45,
    discounts: 30,
    netServiceRevenue: 1305,
    tips: 165,
    commissionPercent: 50,
    estimatedServicePayout: 652.5,
    productSales: 420,
    productCommission: 42,
    totalOwed: 694.5,
    cardHoldsCaptured: 8,
    prepaidBookings: 5
  },
  {
    id: 'report-casey',
    barberId: 'barber-casey',
    barberName: 'Casey Morgan',
    dateRange: 'This week',
    paymentType: 'All',
    appointments: 14,
    serviceRevenue: 1120,
    refunds: 0,
    discounts: 40,
    netServiceRevenue: 1080,
    tips: 125,
    commissionPercent: 45,
    estimatedServicePayout: 486,
    productSales: 310,
    productCommission: 24.8,
    totalOwed: 510.8,
    cardHoldsCaptured: 6,
    prepaidBookings: 4
  },
  {
    id: 'report-riley',
    barberId: 'barber-riley',
    barberName: 'Riley Brooks',
    dateRange: 'This week',
    paymentType: 'All',
    appointments: 16,
    serviceRevenue: 1320,
    refunds: 100,
    discounts: 25,
    netServiceRevenue: 1195,
    tips: 148,
    commissionPercent: 52,
    estimatedServicePayout: 621,
    productSales: 540,
    productCommission: 28.2,
    totalOwed: 649.2,
    cardHoldsCaptured: 7,
    prepaidBookings: 5
  }
];

export const payoutAccounts: PayoutAccount[] = [
  {
    barberId: 'barber-jordan',
    barberName: 'Jordan Lee',
    bankStatus: 'Connected',
    stripeStatus: 'Verified',
    serviceRevenue: 1380,
    refundAdjustments: -45,
    discountAdjustments: -30,
    pendingPayout: 694.5,
    nextPayoutDate: '2026-05-01',
    actionLabel: 'View payout'
  },
  {
    barberId: 'barber-casey',
    barberName: 'Casey Morgan',
    bankStatus: 'Needs onboarding',
    stripeStatus: 'Pending verification',
    serviceRevenue: 1120,
    refundAdjustments: 0,
    discountAdjustments: -40,
    pendingPayout: 510.8,
    nextPayoutDate: '2026-05-01',
    actionLabel: 'Send onboarding'
  },
  {
    barberId: 'barber-riley',
    barberName: 'Riley Brooks',
    bankStatus: 'Connected',
    stripeStatus: 'Verified',
    serviceRevenue: 1320,
    refundAdjustments: -100,
    discountAdjustments: -25,
    pendingPayout: 649.2,
    nextPayoutDate: '2026-05-01',
    actionLabel: 'View payout'
  }
];

export const productInventory: ProductInventoryItem[] = [
  { id: 'product-1', product: 'Texture Clay', category: 'Styling', currentStock: 18, lowStockThreshold: 8, soldThisWeek: 12, revenueThisWeek: 336, status: 'Healthy' },
  { id: 'product-2', product: 'Beard Oil', category: 'Grooming', currentStock: 9, lowStockThreshold: 6, soldThisWeek: 8, revenueThisWeek: 216, status: 'Healthy' },
  { id: 'product-3', product: 'Pomade', category: 'Styling', currentStock: 7, lowStockThreshold: 8, soldThisWeek: 10, revenueThisWeek: 280, status: 'Low stock' },
  { id: 'product-4', product: 'Styling Powder', category: 'Styling', currentStock: 11, lowStockThreshold: 5, soldThisWeek: 7, revenueThisWeek: 196, status: 'Healthy' },
  { id: 'product-5', product: 'Shampoo', category: 'Wash', currentStock: 15, lowStockThreshold: 6, soldThisWeek: 4, revenueThisWeek: 96, status: 'Healthy' },
  { id: 'product-6', product: 'Conditioner', category: 'Wash', currentStock: 6, lowStockThreshold: 6, soldThisWeek: 3, revenueThisWeek: 72, status: 'Reorder soon' },
  { id: 'product-7', product: 'Comb', category: 'Tools', currentStock: 13, lowStockThreshold: 4, soldThisWeek: 2, revenueThisWeek: 34, status: 'Healthy' },
  { id: 'product-8', product: 'Aftershave', category: 'Grooming', currentStock: 10, lowStockThreshold: 5, soldThisWeek: 2, revenueThisWeek: 40, status: 'Healthy' }
];

export const productSales: ProductSale[] = [
  { id: 'sale-1', date: '2026-04-28', productName: 'Texture Clay', barberId: 'barber-jordan', barberName: 'Jordan Lee', clientName: 'Avery Collins', amount: 28, commissionRate: 0.1, commissionOwed: 2.8, settlementAccount: 'Shop bank account' },
  { id: 'sale-2', date: '2026-04-28', productName: 'Beard Oil', barberId: 'barber-casey', barberName: 'Casey Morgan', clientName: 'Taylor Bennett', amount: 27, commissionRate: 0.08, commissionOwed: 2.16, settlementAccount: 'Shop bank account' },
  { id: 'sale-3', date: '2026-04-29', productName: 'Pomade', barberId: 'barber-riley', barberName: 'Riley Brooks', clientName: 'Morgan Hayes', amount: 28, commissionRate: 0.09, commissionOwed: 2.52, settlementAccount: 'Shop bank account' },
  { id: 'sale-4', date: '2026-04-29', productName: 'Styling Powder', barberId: 'barber-jordan', barberName: 'Jordan Lee', clientName: 'Cameron Price', amount: 28, commissionRate: 0.1, commissionOwed: 2.8, settlementAccount: 'Shop bank account' },
  { id: 'sale-5', date: '2026-04-29', productName: 'Shampoo', barberId: 'barber-casey', barberName: 'Casey Morgan', clientName: 'Jamie Foster', amount: 24, commissionRate: 0.08, commissionOwed: 1.92, settlementAccount: 'Shop bank account' },
  { id: 'sale-6', date: '2026-04-29', productName: 'Texture Clay', barberId: 'barber-riley', barberName: 'Riley Brooks', clientName: 'Harper Stone', amount: 28, commissionRate: 0.09, commissionOwed: 2.52, settlementAccount: 'Shop bank account' },
  { id: 'sale-7', date: '2026-04-29', productName: 'Aftershave', barberId: 'barber-jordan', barberName: 'Jordan Lee', clientName: 'Noah Jenkins', amount: 20, commissionRate: 0.1, commissionOwed: 2, settlementAccount: 'Shop bank account' },
  { id: 'sale-8', date: '2026-04-29', productName: 'Comb', barberId: 'barber-riley', barberName: 'Riley Brooks', clientName: 'Elliot Marks', amount: 17, commissionRate: 0.09, commissionOwed: 1.53, settlementAccount: 'Shop bank account' },
  { id: 'sale-9', date: '2026-04-29', productName: 'Conditioner', barberId: 'barber-jordan', barberName: 'Jordan Lee', clientName: 'Parker Lane', amount: 24, commissionRate: 0.1, commissionOwed: 2.4, settlementAccount: 'Shop bank account' },
  { id: 'sale-10', date: '2026-04-29', productName: 'Pomade', barberId: 'barber-casey', barberName: 'Casey Morgan', clientName: 'Rory Banks', amount: 28, commissionRate: 0.08, commissionOwed: 2.24, settlementAccount: 'Shop bank account' },
  { id: 'sale-11', date: '2026-04-29', productName: 'Texture Clay', barberId: 'barber-riley', barberName: 'Riley Brooks', clientName: 'Quinn Ellis', amount: 28, commissionRate: 0.09, commissionOwed: 2.52, settlementAccount: 'Shop bank account' },
  { id: 'sale-12', date: '2026-04-29', productName: 'Beard Oil', barberId: 'barber-jordan', barberName: 'Jordan Lee', clientName: 'Drew Harper', amount: 27, commissionRate: 0.1, commissionOwed: 2.7, settlementAccount: 'Shop bank account' },
  { id: 'sale-13', date: '2026-04-29', productName: 'Styling Powder', barberId: 'barber-riley', barberName: 'Riley Brooks', clientName: 'Blake Rowe', amount: 28, commissionRate: 0.09, commissionOwed: 2.52, settlementAccount: 'Shop bank account' },
  { id: 'sale-14', date: '2026-04-29', productName: 'Texture Clay', barberId: 'barber-casey', barberName: 'Casey Morgan', clientName: 'Alex Monroe', amount: 28, commissionRate: 0.08, commissionOwed: 2.24, settlementAccount: 'Shop bank account' },
  { id: 'sale-15', date: '2026-04-29', productName: 'Shampoo', barberId: 'barber-jordan', barberName: 'Jordan Lee', clientName: 'Sydney Vale', amount: 24, commissionRate: 0.1, commissionOwed: 2.4, settlementAccount: 'Shop bank account' },
  { id: 'sale-16', date: '2026-04-29', productName: 'Aftershave', barberId: 'barber-riley', barberName: 'Riley Brooks', clientName: 'Logan Hart', amount: 20, commissionRate: 0.09, commissionOwed: 1.8, settlementAccount: 'Shop bank account' },
  { id: 'sale-17', date: '2026-04-29', productName: 'Pomade', barberId: 'barber-jordan', barberName: 'Jordan Lee', clientName: 'Mia Cross', amount: 28, commissionRate: 0.1, commissionOwed: 2.8, settlementAccount: 'Shop bank account' },
  { id: 'sale-18', date: '2026-04-29', productName: 'Texture Clay', barberId: 'barber-casey', barberName: 'Casey Morgan', clientName: 'Ryan Cole', amount: 28, commissionRate: 0.08, commissionOwed: 2.24, settlementAccount: 'Shop bank account' },
  { id: 'sale-19', date: '2026-04-29', productName: 'Beard Oil', barberId: 'barber-riley', barberName: 'Riley Brooks', clientName: 'Levi Sloan', amount: 27, commissionRate: 0.09, commissionOwed: 2.43, settlementAccount: 'Shop bank account' },
  { id: 'sale-20', date: '2026-04-29', productName: 'Pomade', barberId: 'barber-jordan', barberName: 'Jordan Lee', clientName: 'Ari Flynn', amount: 28, commissionRate: 0.1, commissionOwed: 2.8, settlementAccount: 'Shop bank account' },
  { id: 'sale-21', date: '2026-04-29', productName: 'Texture Clay', barberId: 'barber-riley', barberName: 'Riley Brooks', clientName: 'Jules Carter', amount: 28, commissionRate: 0.09, commissionOwed: 2.52, settlementAccount: 'Shop bank account' },
  { id: 'sale-22', date: '2026-04-29', productName: 'Pomade', barberId: 'barber-casey', barberName: 'Casey Morgan', clientName: 'Kai Mercer', amount: 28, commissionRate: 0.08, commissionOwed: 2.24, settlementAccount: 'Shop bank account' },
  { id: 'sale-23', date: '2026-04-29', productName: 'Conditioner', barberId: 'barber-jordan', barberName: 'Jordan Lee', clientName: 'Wren Bishop', amount: 24, commissionRate: 0.1, commissionOwed: 2.4, settlementAccount: 'Shop bank account' },
  { id: 'sale-24', date: '2026-04-29', productName: 'Texture Clay', barberId: 'barber-riley', barberName: 'Riley Brooks', clientName: 'Finn Quinn', amount: 28, commissionRate: 0.09, commissionOwed: 2.52, settlementAccount: 'Shop bank account' },
  { id: 'sale-25', date: '2026-04-29', productName: 'Shampoo', barberId: 'barber-casey', barberName: 'Casey Morgan', clientName: 'Sage Hollis', amount: 24, commissionRate: 0.08, commissionOwed: 1.92, settlementAccount: 'Shop bank account' },
  { id: 'sale-26', date: '2026-04-29', productName: 'Texture Clay', barberId: 'barber-jordan', barberName: 'Jordan Lee', clientName: 'Remy Tate', amount: 28, commissionRate: 0.1, commissionOwed: 2.8, settlementAccount: 'Shop bank account' },
  { id: 'sale-27', date: '2026-04-29', productName: 'Pomade', barberId: 'barber-riley', barberName: 'Riley Brooks', clientName: 'Cole Madden', amount: 28, commissionRate: 0.09, commissionOwed: 2.52, settlementAccount: 'Shop bank account' },
  { id: 'sale-28', date: '2026-04-29', productName: 'Beard Oil', barberId: 'barber-jordan', barberName: 'Jordan Lee', clientName: 'Tate Winters', amount: 27, commissionRate: 0.1, commissionOwed: 2.7, settlementAccount: 'Shop bank account' },
  { id: 'sale-29', date: '2026-04-29', productName: 'Styling Powder', barberId: 'barber-casey', barberName: 'Casey Morgan', clientName: 'Zion Barrett', amount: 28, commissionRate: 0.08, commissionOwed: 2.24, settlementAccount: 'Shop bank account' },
  { id: 'sale-30', date: '2026-04-29', productName: 'Aftershave', barberId: 'barber-riley', barberName: 'Riley Brooks', clientName: 'Milo Wade', amount: 20, commissionRate: 0.09, commissionOwed: 1.8, settlementAccount: 'Shop bank account' },
  { id: 'sale-31', date: '2026-04-29', productName: 'Texture Clay', barberId: 'barber-jordan', barberName: 'Jordan Lee', clientName: 'Nico Byrd', amount: 28, commissionRate: 0.1, commissionOwed: 2.8, settlementAccount: 'Shop bank account' },
  { id: 'sale-32', date: '2026-04-29', productName: 'Shampoo', barberId: 'barber-riley', barberName: 'Riley Brooks', clientName: 'Reese Dyer', amount: 24, commissionRate: 0.09, commissionOwed: 2.16, settlementAccount: 'Shop bank account' },
  { id: 'sale-33', date: '2026-04-29', productName: 'Beard Oil', barberId: 'barber-casey', barberName: 'Casey Morgan', clientName: 'Lane Porter', amount: 27, commissionRate: 0.08, commissionOwed: 2.16, settlementAccount: 'Shop bank account' },
  { id: 'sale-34', date: '2026-04-29', productName: 'Pomade', barberId: 'barber-riley', barberName: 'Riley Brooks', clientName: 'Peyton Shaw', amount: 28, commissionRate: 0.09, commissionOwed: 2.52, settlementAccount: 'Shop bank account' },
  { id: 'sale-35', date: '2026-04-29', productName: 'Styling Powder', barberId: 'barber-jordan', barberName: 'Jordan Lee', clientName: 'Ainsley Dean', amount: 28, commissionRate: 0.1, commissionOwed: 2.8, settlementAccount: 'Shop bank account' },
  { id: 'sale-36', date: '2026-04-29', productName: 'Aftershave', barberId: 'barber-casey', barberName: 'Casey Morgan', clientName: 'Sky Monroe', amount: 20, commissionRate: 0.08, commissionOwed: 1.6, settlementAccount: 'Shop bank account' },
  { id: 'sale-37', date: '2026-04-29', productName: 'Texture Clay', barberId: 'barber-riley', barberName: 'Riley Brooks', clientName: 'Bailey Quinn', amount: 28, commissionRate: 0.09, commissionOwed: 2.52, settlementAccount: 'Shop bank account' },
  { id: 'sale-38', date: '2026-04-29', productName: 'Shampoo', barberId: 'barber-jordan', barberName: 'Jordan Lee', clientName: 'Charlie Fox', amount: 24, commissionRate: 0.1, commissionOwed: 2.4, settlementAccount: 'Shop bank account' },
  { id: 'sale-39', date: '2026-04-29', productName: 'Pomade', barberId: 'barber-casey', barberName: 'Casey Morgan', clientName: 'Micah West', amount: 28, commissionRate: 0.08, commissionOwed: 2.24, settlementAccount: 'Shop bank account' },
  { id: 'sale-40', date: '2026-04-29', productName: 'Texture Clay', barberId: 'barber-riley', barberName: 'Riley Brooks', clientName: 'Hayden Frost', amount: 28, commissionRate: 0.09, commissionOwed: 2.52, settlementAccount: 'Shop bank account' },
  { id: 'sale-41', date: '2026-04-29', productName: 'Beard Oil', barberId: 'barber-jordan', barberName: 'Jordan Lee', clientName: 'Jordan Pike', amount: 27, commissionRate: 0.1, commissionOwed: 2.7, settlementAccount: 'Shop bank account' },
  { id: 'sale-42', date: '2026-04-29', productName: 'Conditioner', barberId: 'barber-riley', barberName: 'Riley Brooks', clientName: 'Robin Chase', amount: 24, commissionRate: 0.09, commissionOwed: 2.16, settlementAccount: 'Shop bank account' },
  { id: 'sale-43', date: '2026-04-29', productName: 'Texture Clay', barberId: 'barber-casey', barberName: 'Casey Morgan', clientName: 'Dakota Blue', amount: 28, commissionRate: 0.08, commissionOwed: 2.24, settlementAccount: 'Shop bank account' },
  { id: 'sale-44', date: '2026-04-29', productName: 'Pomade', barberId: 'barber-jordan', barberName: 'Jordan Lee', clientName: 'Emerson Vale', amount: 28, commissionRate: 0.1, commissionOwed: 2.8, settlementAccount: 'Shop bank account' },
  { id: 'sale-45', date: '2026-04-29', productName: 'Beard Oil', barberId: 'barber-riley', barberName: 'Riley Brooks', clientName: 'Sawyer Grant', amount: 27, commissionRate: 0.09, commissionOwed: 2.43, settlementAccount: 'Shop bank account' }
];

export const taxSummaries: TaxSummary[] = [
  { barberId: 'barber-jordan', barberName: 'Jordan Lee', ytdServicePayouts: 28410, ytdProductCommission: 1640, totalReportable: 30050, w9Status: 'Ready', status1099: 'Ready', lastUpdated: '2026-04-27' },
  { barberId: 'barber-casey', barberName: 'Casey Morgan', ytdServicePayouts: 25180, ytdProductCommission: 1210, totalReportable: 26390, w9Status: 'Needs W-9', status1099: 'Review required', lastUpdated: '2026-04-25' },
  { barberId: 'barber-riley', barberName: 'Riley Brooks', ytdServicePayouts: 29760, ytdProductCommission: 1495, totalReportable: 31255, w9Status: 'Ready', status1099: 'Exported', lastUpdated: '2026-04-28' }
];

export const paymentSetupStatus: PaymentSetupItem[] = [
  {
    id: 'stripe-connect',
    title: 'Stripe Connect',
    status: 'Demo-ready',
    purpose: 'Barber payout accounts and transfer routing',
    detail: 'Connected accounts: 2 of 3 verified.'
  },
  {
    id: 'stripe-terminal',
    title: 'Stripe Terminal / Card Readers',
    status: 'Front desk reader online in demo',
    purpose: 'Front-desk checkout and card-present payments',
    detail: 'Stripe Reader / Terminal mock with tap, chip, swipe, receipts, and front-desk checkout.',
    bullets: ['Tap/chip/swipe', 'Front-desk checkout', 'Card-present payments', 'Receipts']
  },
  {
    id: 'online-prepay',
    title: 'Online Prepay',
    status: 'Enabled in demo',
    purpose: 'Clients can prepay before appointment',
    detail: 'Booking flow supports demo prepaid appointments with sample payment states.'
  },
  {
    id: 'card-hold',
    title: 'Card Hold / No-show Fee',
    status: 'Enabled in demo',
    purpose: 'Secure card on file for cancellation and no-show policy',
    detail: 'Card-hold messaging is active in customer booking and barber appointment details.'
  },
  {
    id: 'shop-bank',
    title: 'Shop Bank Account',
    status: 'Connected',
    purpose: 'Product sales and shop-retained revenue',
    detail: 'Product revenue routes to the shop settlement account in this demo.'
  },
  {
    id: 'clerk-roles',
    title: 'Clerk.js Role Access',
    status: 'Planned / Demo-ready',
    purpose: 'Authentication, login, and role-based routing',
    detail: 'Roles mapped for Owner, Barber, Front Desk, and Customer.',
    bullets: ['Owner', 'Barber', 'Front Desk', 'Customer']
  }
];

export const paymentSetupChecklist = [
  'Owner account configured',
  'Barber profiles created',
  'Barber payout onboarding',
  'Shop bank account connected',
  'Card reader paired',
  'Product catalog loaded',
  '1099 reporting fields collected',
  'Role permissions mapped'
] as const;

export const demoUsers: DemoUserAccess[] = [
  { id: 'user-1', name: 'Marcus Reed', email: 'marcus@scissorhandsdemo.com', role: 'Owner', accessLevel: 'Full shop access', status: 'Active', lastLogin: 'Today, 8:14 AM', inviteStatus: 'Accepted' },
  { id: 'user-2', name: 'Jordan Lee', email: 'jordan@scissorhandsdemo.com', role: 'Barber', accessLevel: 'Own schedule + own earnings', status: 'Active', lastLogin: 'Today, 7:48 AM', inviteStatus: 'Accepted' },
  { id: 'user-3', name: 'Casey Morgan', email: 'casey@scissorhandsdemo.com', role: 'Barber', accessLevel: 'Own schedule + own earnings', status: 'Pending invite', lastLogin: 'Not yet', inviteStatus: 'Pending invite' },
  { id: 'user-4', name: 'Riley Brooks', email: 'riley@scissorhandsdemo.com', role: 'Barber', accessLevel: 'Own schedule + own earnings', status: 'Active', lastLogin: 'Yesterday, 5:11 PM', inviteStatus: 'Accepted' },
  { id: 'user-5', name: 'Front Desk Team', email: 'frontdesk@scissorhandsdemo.com', role: 'Front Desk', accessLevel: 'Scheduling + checkout', status: 'Active', lastLogin: 'Today, 9:02 AM', inviteStatus: 'Accepted' },
  { id: 'user-6', name: 'Taylor Bennett', email: 'taylor.bennett@example.com', role: 'Customer', accessLevel: 'Booking + profile only', status: 'Active', lastLogin: 'Today, 10:25 AM', inviteStatus: 'Self-serve' }
];

export const rolePermissions: RolePermissionRow[] = [
  { feature: 'Book appointment', owner: true, barber: false, frontDesk: true, customer: true },
  { feature: 'View own appointments', owner: true, barber: true, frontDesk: true, customer: true },
  { feature: 'Manage shop schedule', owner: true, barber: false, frontDesk: true, customer: false },
  { feature: 'View own earnings', owner: true, barber: true, frontDesk: false, customer: false },
  { feature: 'View all barber reports', owner: true, barber: false, frontDesk: false, customer: false },
  { feature: 'Manage payouts', owner: true, barber: false, frontDesk: false, customer: false },
  { feature: 'Manage product sales', owner: true, barber: true, frontDesk: true, customer: false },
  { feature: 'View tax / 1099 summaries', owner: true, barber: false, frontDesk: false, customer: false },
  { feature: 'Manage payment setup', owner: true, barber: false, frontDesk: false, customer: false },
  { feature: 'Manage user access', owner: true, barber: false, frontDesk: false, customer: false }
];
