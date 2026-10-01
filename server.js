const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const PRODUCT = {
  id: "demo-product",
  name: "Demo Product",
  description: "This is a sample product. Replace it with your real product later.",
  amount: 10000, // ₹100.00
  currency: "INR"
};

app.get("/api/product", (req, res) => {
  res.json(PRODUCT);
});

app.post("/api/create-order", (req, res) => {
  const demoOrderId = "TEST_ORDER_" + Date.now();

  res.json({
    success: true,
    orderId: demoOrderId,
    amount: PRODUCT.amount,
    currency: PRODUCT.currency,
    productName: PRODUCT.name
  });
});

app.post("/api/complete-test-payment", (req, res) => {
  const { orderId, customer } = req.body;

  if (!orderId || !customer) {
    return res.status(400).json({
      success: false,
      error: "Missing order or customer details."
    });
  }

  const demoPaymentId = "TEST_PAYMENT_" + Date.now();

  res.json({
    success: true,
    orderId,
    paymentId: demoPaymentId,
    message: "Test payment completed successfully."
  });
});

app.listen(PORT, () => {
  console.log(`Website running at http://localhost:${PORT}`);
});