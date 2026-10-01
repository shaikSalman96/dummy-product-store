# Dummy Product Store

A very simple one-product website with Razorpay payment integration.

## 1. Requirements

Install Node.js on your computer.

## 2. Install dependencies

Open a terminal in this folder:

```bash
npm install
```

## 3. Configure Razorpay

Create a Razorpay account and get your **Test Key ID** and **Test Key Secret**.

Copy `.env.example` to `.env` and add:

```text
RAZORPAY_KEY_ID=your_test_key_id
RAZORPAY_KEY_SECRET=your_test_key_secret
PORT=3000
```

Never share or commit the Key Secret.

## 4. Run

```bash
npm start
```

Open:

http://localhost:3000

## 5. What to change later

The dummy product is defined in `server.js`:

```js
const PRODUCT = {
  id: "demo-product",
  name: "Demo Product",
  description: "This is a sample product.",
  amount: 10000,
  currency: "INR"
};
```

`10000` means ₹100 because Razorpay amounts are sent in paise.

You can later add:
- Real product image
- Multiple products
- Database
- Orders page
- Customer accounts
- Email confirmation
- Delivery address
- Admin page
- Refunds
- Coupons
- Inventory

## Deployment

This project can be deployed to a Node/Express-compatible hosting platform such as Vercel. Add the same environment variables (`RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET`) in the hosting platform rather than uploading `.env`.
