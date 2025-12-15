# MixPay Shopify Plugin Installation Guide

This document will guide you through installing and configuring the MixPay payment plugin in your Shopify store.

## Prerequisites

- Shopify store administrator access
- Registered MixPay merchant account
- MixPay API Symbol (unique merchant identifier， from MixPay's [bd@mixpay.me](mailto:bd@mixpay.me))

## Installation Method

The MixPay plugin is currently deployed as a **Custom App**, requiring each merchant to install it independently in their Shopify store. This approach offers:

- ✅ Full control over plugin code and configuration
- ✅ Support for Shopify Checkout UI Extensions
- ✅ No waiting for Shopify review
- ✅ Customizable features

## Step 1: Create Shopify Partner Account

1. Visit [Shopify Partners](https://partners.shopify.com/)
2. Click **Join now** to register
3. Fill in personal/company information and complete registration
4. Log in to Partner Dashboard

## Step 2: Create Development App

### 2.1 Create App in Partner Dashboard

1. Log in to [Shopify Partner Dashboard](https://partners.shopify.com/)
2. Click **Apps** in the left menu
3. Click **Create app**
4. Select **Create app manually**
5. Fill in app information:
   - **App name**: `MixPay Payment` (or your preferred name)
   - **App URL**: Temporarily enter `https://example.com` (will be updated later)
   - **Allowed redirection URL(s)**: Temporarily enter `https://example.com/callback`
6. Click **Create app**

### 2.2 Get API Credentials

After creating the app, you will receive:
- **Client ID**: Record this ID for later configuration
- **Client Secret**: Click to display and record, **keep it secure**

## Step 3: Prepare Plugin Code

### 3.1 Clone or Download Plugin Code

Clone the plugin repository from GitHub:

```bash
# Clone repository
git clone https://github.com/MixPayProtocol/mixpay-payment-shopify.git
cd mixpay-payment-shopify

# Or download and extract the ZIP file from GitHub
```

### 3.2 Install Dependencies

```bash
npm install
```

### 3.3 Configure App Information

Edit `shopify.app.toml` file:

```toml
# App name
name = "mixpay-payment"

# App type (must be custom)
application_url = "https://example.com"
embedded = true

[access_scopes]
# Required permissions
scopes = "read_orders,write_orders,read_order_edits,write_order_edits"

[auth]
redirect_urls = [
  "https://example.com/callback"
]

[webhooks]
api_version = "2025-07"

[pos]
embedded = false

[build]
automatically_update_urls_on_dev = true
dev_store_url = "your-store.myshopify.com"  # Replace with your store URL
```

### 3.4 Configure MixPay API

Edit `extensions/mixpay-payment-block/src/Checkout.jsx` file:

Find the following line and replace with your MixPay API Symbol:

```javascript
// Line 16
const MIXPAY_PLUGIN_MERCHANT_ID = "your-mixpay-api-symbol";  // Replace with your MixPay API Symbol
```

## Step 4: Deploy to Shopify

### 4.1 Login to Shopify CLI

```bash
npm run shopify auth login
```

Follow the prompts to complete login in your browser.

### 4.2 Connect to Your Store

```bash
npm run shopify app config link
```

Select:
1. Your Partner organization
2. The app you just created
3. Your development store (or production store)

### 4.3 Deploy App

```bash
npm run shopify app deploy
```

During deployment:
1. Build UI Extensions
2. Upload to Shopify
3. Update app configuration

### 4.4 Install to Store

After deployment, CLI will provide an installation link, similar to:

```
https://partners.shopify.com/1234567/apps/8901234/test
```

1. Open this link in your browser
2. Click **Select store** to choose the store to install
3. Click **Install app**
4. Authorize the required permissions

## Step 5: Configure MixPay Payment Method

### 5.1 Add Custom Payment Method in Shopify Admin

**Important**: The plugin automatically detects all orders using Custom Payment Method (manual payment) and displays the MixPay payment button.

1. Log in to Shopify admin
2. Go to **Settings** > **Payments**
3. In the **Manual payment methods** section, click **Add manual payment method**
4. Select **Create custom payment method**
5. Fill in the information:
   - **Custom payment method name**: `MixPay` or `MixPay Crypto Payment` (recommended to include "MixPay" in the name)
   - **Additional details**: `Pay with cryptocurrency via MixPay`
   - **Payment instructions**: `You will be redirected to MixPay to complete the payment.`
6. Click **Activate**

**Note**: The plugin will display on all orders using Custom Payment Method. If you have multiple custom payment methods, it's recommended to use this plugin only for MixPay-related orders.

### 5.2 Enable UI Extension

1. In Shopify admin, go to **Settings** > **Checkout**
2. Scroll to the **Order status page** section
3. Click **Add app block**
4. Find and add **MixPay Payment Block**
5. Click **Save**

Repeat the same steps to add **MixPay Payment Block** in the **Thank you page** section.

## Step 6: Test Payment Flow

### 6.1 Create Test Order

1. Add products to cart on store frontend
2. Go to checkout page
3. Select **MixPay** as payment method
4. Complete the order

### 6.2 Verify Payment Button

After completing the order, you should see the MixPay payment button on:

- **Thank You page**: Order confirmation page
- **Order Status page**: Order details page in customer account

Clicking the **Go to MixPay checkout** button should redirect to the MixPay payment page.

## FAQ

### Q1: Permission error during deployment?

**A**: Ensure your Partner account has permission to access the app and is correctly connected to the store.

### Q2: UI Extension not displaying?

**A**: Check the following:
1. Confirm App Block has been added in Checkout settings
2. Confirm order uses MixPay payment method
3. Check browser console for error messages
4. Confirm `MIXPAY_PLUGIN_MERCHANT_ID` is configured correctly

### Q3: Payment button not responding when clicked?

**A**: 
1. Check browser console network requests
2. Confirm MixPay API Symbol is configured correctly
3. Confirm merchant is configured in MixPay backend

### Q4: How to update the plugin?

**A**: 
1. Pull latest code or download new version
2. Run `npm install` to update dependencies
3. Run `npm run shopify app deploy` to redeploy
4. No need to reinstall the app

### Q5: Production deployment considerations?

**A**: 
1. Change `dev_store_url` to production store URL in `shopify.app.toml`
2. Ensure MixPay API uses production environment configuration
3. Test complete payment flow
4. Recommend verifying in test store before deploying to production

## Development Mode

If you need to modify the plugin code, you can use development mode:

```bash
npm run shopify app dev
```

This will start a local development server for real-time preview of changes.

## Technical Support

If you encounter any issues, please contact:

- **MixPay Technical Support**: [bd@mixpay.me](mailto:bd@mixpay.me)
- **Documentation**: [MixPay Developer Docs](https://mixpay.me/developers)

## License

This plugin follows the MIT License.

---

**Last Updated**: 2025-12-12
