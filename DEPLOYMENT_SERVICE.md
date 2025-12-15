# MixPay Shopify Plugin Deployment Service Guide

This document is for **merchants using MixPay team deployment services**. If you prefer to deploy yourself, please refer to [INSTALLATION.md](./INSTALLATION.md).

## Service Description

The MixPay team will help you deploy the MixPay payment plugin in your Shopify store. No programming knowledge required.

## Pre-Deployment Preparation

### What Merchants Need to Prepare

1. **Shopify Store**
   - Your store URL (e.g., `your-store.myshopify.com`)
   - Store administrator access

2. **Shopify Partner Account** (Choose one)
   - **Option A**: You have a Partner account, add us as a team member
   - **Option B**: You don't have a Partner account, we'll create one for you

3. **MixPay Merchant Information**
   - MixPay API Symbol (unique merchant identifier)
   - Payment receiving Mixin UUID or multisig ID
   - Settlement currency

## Option A: Add Team Member (Recommended)

If you already have a Shopify Partner account, you can add us as a team member (Staff Member), and we will create and deploy the app under your Partner organization.

### Step 1: Create Shopify Partner Account (If You Don't Have One)

1. Visit [Shopify Partners](https://partners.shopify.com/)
2. Click **Join now** to register
3. Fill in information:
   - **Email**: Your email
   - **First name / Last name**: Your name
   - **Company name**: Your company name (optional)
4. Complete email verification
5. Log in to Partner Dashboard

### Step 2: Add Team Member (Staff Member)

#### 2.1 Add Team Member in Partner Dashboard

1. Log in to [Shopify Partner Dashboard](https://partners.shopify.com/)
2. Find and click **Settings** at the **bottom** of the left navigation bar
3. On the Settings page, click the **Team** tab
4. Click the **Add team member** button
5. Fill in team member information:
   - **Email**: `bd@mixpay.me` (or email provided by MixPay)
   - **First name**: MixPay
   - **Last name**: Deploy Team
   - **Role**: Select **Staff member** (not Owner)
6. Set permissions (check the following options):
   - ✅ **Apps** - Manage apps
     - ✅ **Manage apps** - Create and manage apps
     - ✅ **Manage app extensions** - Manage app extensions
   - ❌ **Stores** - Not needed
   - ❌ **Finances** - Not needed
   - ❌ **Settings** - Not needed
7. Click **Send invite** to send the invitation

#### 2.2 Team Member Permission Description

After being added as a team member, the MixPay team can:

✅ **Allowed Operations**:
- Create app
- Configure app settings
- Deploy UI Extensions
- Run `npm run shopify auth login` (login with team member account)
- Run `npm run shopify app deploy`
- Test app functionality

❌ **Not Allowed Operations**:
- Access your store admin
- View store order data
- Modify store settings
- Delete your Partner account
- Manage other users

#### 2.3 Team Member Accepts Invitation

1. MixPay team will receive an invitation email (subject similar to "You've been invited to join [Your Organization]")
2. Click the **Accept invitation** or **Join team** link in the email
3. If you already have a Shopify Partner account, log in directly; if not, register first
4. After accepting the invitation, you can see your organization in your Partner Dashboard
5. Switch organization: Click the organization name in the upper left corner and select your organization to start working

### Step 3: Provide Store Access (Temporary)

To complete deployment and testing, we need temporary access to your store:

#### 3.1 Create Staff Account

1. Log in to Shopify admin
2. Go to **Settings** > **Users and permissions**
3. Click **Add staff**
4. Fill in information:
   - **Email**: `bd@mixpay.me` (or email provided by MixPay)
   - **First name**: MixPay
   - **Last name**: Deploy
5. Set permissions (minimum required only):
   - ✅ **Orders** - View and manage
   - ✅ **Apps and channels** - Install and manage
   - ❌ Other permissions not needed
6. Click **Send invite**

**Note**: You can delete this staff account anytime after deployment is complete.

### Step 4: Provide MixPay Configuration Information

Please send the following information to the MixPay team:

```
Store Information:
- Store URL: your-store.myshopify.com
- Store Name: Your Store Name

MixPay Configuration:
- API Symbol: your-mixpay-api-symbol
- Payment Receiving Mixin UUID: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
- Settlement Currency: USDT (or other)

Partner Account:
- Team member email added: bd@mixpay.me
- Partner Organization Name: Your Organization Name
```

### Step 5: MixPay Team Deployment

The MixPay team will perform the following operations:

1. **Login as Team Member**
   ```bash
   npm run shopify auth login
   # Login with team member account
   ```

2. **Create App**
   - Create app under your Partner account
   - App name: MixPay Payment
   - Configure API permissions

3. **Configure Code**
   - Set your MixPay API Symbol
   - Configure store URL

4. **Deploy Extension**
   ```bash
   npm run shopify app config link
   # Select your organization and store
   
   npm run shopify app deploy
   # Deploy UI Extensions
   ```

5. **Install App**
   - Generate installation link
   - Send to you for installation authorization

### Step 6: Merchant Installs App

1. MixPay team will provide an installation link, similar to:
   ```
   https://partners.shopify.com/1234567/apps/8901234/test
   ```

2. Click the link and select your store

3. Click **Install app**

4. Authorize the required permissions:
   - Read orders
   - Write orders
   - Read order edits
   - Write order edits

5. Installation complete

### Step 7: Configure Payment Method

#### 7.1 Add MixPay Payment Method

**Important**: The plugin automatically detects all orders using Custom Payment Method (manual payment) and displays the MixPay payment button.

1. Log in to Shopify admin
2. Go to **Settings** > **Payments**
3. In the **Manual payment methods** section, click **Add manual payment method**
4. Select **Create custom payment method**
5. Fill in:
   - **Name**: `MixPay` or `MixPay Crypto Payment` (recommended to include "MixPay" in the name)
   - **Additional details**: `Pay with cryptocurrency via MixPay`
   - **Payment instructions**: `You will be redirected to MixPay to complete the payment`
6. Click **Activate**

**Note**: The plugin will display on all orders using Custom Payment Method. If you have multiple custom payment methods, it's recommended to use this plugin only for MixPay-related orders.

#### 7.2 Enable UI Extension

1. Go to **Settings** > **Checkout**
2. Scroll to the **Order status page** section
3. Click **Customize**
4. Find **App blocks** on the right side
5. Add **MixPay Payment Block**
6. Click **Save**

Repeat the above steps to add **MixPay Payment Block** in the **Thank you page** section.

### Step 8: Test Payment Flow

1. Create a test order on the store frontend
2. Select **MixPay** as the payment method
3. Complete the order
4. You should see the **Go to MixPay checkout** button on the Thank You page
5. Click the button to redirect to the MixPay payment page
6. Complete the payment test

### Step 9: Remove Temporary Permissions (Optional)

After deployment and testing are complete, you can:

1. **Remove Staff Account**
   - Go to **Settings** > **Users and permissions**
   - Find `bd@mixpay.me`
   - Click **Remove staff**

2. **Keep Team Member** (Recommended)
   - Keep team member permissions for future updates and maintenance
   - Team members cannot access your store data, only manage the app

3. **Remove Team Member** (Not Recommended)
   - If you want to completely remove, go to Partner Dashboard left sidebar bottom **Settings** > **Team** tab
   - Find the team member, click the **...** menu on the right, select **Remove**
   - **Note**: After removal, MixPay team cannot help you update the app

## Option B: MixPay Creates Partner Account for You

If you don't want to create a Partner account, MixPay can create and manage it for you.

### Advantages
- ✅ You don't need to register a Partner account
- ✅ Faster deployment
- ✅ Managed by MixPay

### Disadvantages
- ❌ App belongs to MixPay Partner account
- ❌ You cannot directly manage the app
- ❌ Updates require contacting MixPay

### Process

1. **Merchant Provides Information**
   - Store URL
   - MixPay configuration information
   - Temporary staff account permissions

2. **MixPay Creates and Deploys**
   - Create app under MixPay Partner account
   - Deploy to your store

3. **Merchant Installs**
   - Use installation link provided by MixPay
   - Authorize and install

4. **Future Maintenance**
   - All updates performed by MixPay
   - Merchants cannot modify on their own

## Pricing

- **One-time Deployment Fee**: Contact MixPay for pricing
- **Annual Maintenance Fee**: Optional (includes updates and technical support)
- **Emergency Support**: Optional

## FAQ

### Q1: Can team members see my store data?

**A**: No. Team members can only access app management functions in Partner Dashboard and cannot access your store admin or view orders, customers, and other data.

### Q2: How long does deployment take?

**A**: Usually 1-2 business days, including:
- Configuration and deployment: 30 minutes
- Testing and verification: 1 hour
- Communication and coordination: Depends on response time

### Q3: Can I modify the configuration after deployment?

**A**: 
- **Option A (Team Member)**: Yes, you have full control of the app
- **Option B (Created by MixPay)**: No, you need to contact MixPay

### Q4: How to update the plugin?

**A**: 
- **Option A**: Keep team member permissions, MixPay can update directly
- **Option B**: Contact MixPay, we will update

### Q5: What if deployment fails?

**A**: MixPay team will troubleshoot and redeploy at no additional cost.

### Q6: Can I deploy to multiple stores?

**A**: Yes, each store requires separate deployment with separate pricing.

### Q7: Are team member permissions secure?

**A**: Yes. Team member permissions are an official Shopify feature with limited scope, and you can revoke them at any time.

## Technical Support

- **Email**: bd@mixpay.me
- **Business Hours**: Monday to Friday 9:00-18:00 (Beijing Time)
- **Response Time**: Within 24 hours

## Service Agreement

1. **Confidentiality Agreement**: MixPay team commits not to disclose your store information and configuration
2. **Permission Usage**: Only used for deploying and maintaining MixPay plugin, no other purposes
3. **Data Security**: Does not collect, store, or transmit your store data
4. **Service Period**: After deployment, team member permissions remain valid indefinitely (unless you revoke them)

---

**Last Updated**: 2025-12-12
