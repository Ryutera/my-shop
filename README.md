Skip to content
Navigation Menu
Ryutera
my-shop

Type / to search
Code
Issues
Pull requests
Actions
Projects
Wiki
Security
Insights
Settings
my-shop
/
README.md
in
main

Edit

Preview
Indent mode

Spaces
Indent size

2
Line wrap mode

Soft wrap
Editing README.md file contents
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
67
68
69
70
71
72
73
74
75
76
77
78
79
80
81
- Contentful (Headless CMS for product data)

## ✨ Features

- User authentication (Sign up / Log in)
- Product list and detail pages
- Cart functionality (supports both logged-in and guest users)
- Wishlist functionality
- Purchase history view for logged-in users
- Stripe Checkout integration
- Thank you page after successful payment
- Automatic saving of purchase history via Webhook

## 🧠 Notable Highlights

- **Complete logic separation based on login state**  
  Key features like cart, wishlist, and purchase history behave differently depending on the user's login state:
  - For guest users, data is managed using `useState` and stored in `localStorage`
  - For logged-in users, data is saved in Supabase and tied to their unique user ID

- **Checkout metadata integration with Stripe**  
  User IDs and product data are passed via Stripe Checkout metadata and handled through Webhooks to securely and automatically save order history to Supabase.

- **Product management with Contentful**  
  Products are managed through a headless CMS (Contentful), enabling non-developers to update product information without touching the codebase.

## 🖥️ Demo

🚀 https://my-shop-blond-ten.vercel.app/

## 🛠️ Getting Started

Clone the repository and install dependencies:

```bash
git clone https://github.com/Ryutera/my-shop.git
cd my-shop
npm install
npm run dev
```

Then create a `.env.local` file in the root directory and add the following:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

DATABASE_URL=

CONTENTFUL_SPACE_ID=
CONTENTFUL_ACCESS_TOKEN=
CONTENTFUL_PREVIEW_ACCESS_TOKEN=
CONTENTFUL_MANAGEMENT_TOKEN=

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

```
## 🔍 Overview

This app provides all the essential features of a modern e-commerce site, including user authentication, product browsing, wishlist registration, cart management, and secure checkout. Payments are handled via Stripe, and purchase data is automatically saved through Webhook integration with Supabase.

> 📌 **Note:** The current version uses demo product data and Stripe is operating in test mode.  
> 🛍️ I plan to add real product listings and switch to live payment mode in the near future.
Use Control + Shift + m to toggle the tab key moving focus. Alternatively, use esc then tab to move to the next interactive element on the page.
選択されていません
Attach files by dragging & dropping, selecting or pasting them.
Editing my-shop/README.md at main · Ryutera/my-shop