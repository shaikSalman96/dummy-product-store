let product;

const buyButton = document.getElementById("buy-button");
const customerModal = document.getElementById("customer-modal");
const successModal = document.getElementById("success-modal");
const customerForm = document.getElementById("customer-form");

async function loadProduct() {
  const response = await fetch("/api/product");
  product = await response.json();

  document.getElementById("product-name").textContent = product.name;

  document.getElementById("product-description").textContent =
    product.description;

  document.getElementById("product-price").textContent =
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR"
    }).format(product.amount / 100);
}

buyButton.addEventListener("click", () => {
  customerModal.classList.remove("hidden");
});

document.getElementById("close-modal").addEventListener("click", () => {
  customerModal.classList.add("hidden");
});

customerForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = document.getElementById("customer-name").value;
  const email = document.getElementById("customer-email").value;
  const phone = document.getElementById("customer-phone").value;

  const submitButton = event.submitter;
  const originalText = submitButton.textContent;

  submitButton.disabled = true;
  submitButton.textContent = "Processing...";

  try {
    // Create a test order
    const orderResponse = await fetch("/api/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const order = await orderResponse.json();

    if (!orderResponse.ok || !order.success) {
      throw new Error(order.error || "Could not create order.");
    }

    // Complete the test payment
    const paymentResponse = await fetch("/api/complete-test-payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        orderId: order.orderId,
        customer: {
          name,
          email,
          phone
        }
      })
    });

    const payment = await paymentResponse.json();

    if (!paymentResponse.ok || !payment.success) {
      throw new Error(payment.error || "Test payment failed.");
    }

    customerModal.classList.add("hidden");

    document.getElementById("success-order-id").textContent =
      payment.orderId;

    document.getElementById("success-payment-id").textContent =
      payment.paymentId;

    successModal.classList.remove("hidden");

  } catch (error) {
    alert(error.message);
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = originalText;
  }
});

loadProduct().catch(() => {
  document.getElementById("product-name").textContent = "Demo Product";

  document.getElementById("product-description").textContent =
    "Unable to load product.";
});