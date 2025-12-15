# MixPay Shopify Payment Plugin

MixPay Shopify payment plugin enables cryptocurrency payments in Shopify stores.

**GitHub Repository**: [https://github.com/MixPayProtocol/mixpay-payment-shopify](https://github.com/MixPayProtocol/mixpay-payment-shopify)

## Features

- ✅ Display payment button on Thank You page
- ✅ Display payment button on Order Status page
- ✅ Built with Shopify Checkout UI Extensions
- ✅ Automatic order payment status detection
- ✅ Support for multiple cryptocurrencies

## Quick Start

For detailed installation and configuration instructions, see [INSTALLATION.md](./INSTALLATION.md).

## Requirements

1. Node.js 18+ 
2. Shopify Partner account
3. Shopify store (development or production)
4. MixPay merchant account and API Symbol (from MixPay's [bd@mixpay.me](mailto:bd@mixpay.me))

## Quick Installation

```bash
# 1. Install dependencies
npm install

# 2. Configure MixPay API Symbol
# Edit extensions/mixpay-payment-block/src/Checkout.jsx
# Replace MIXPAY_PLUGIN_MERCHANT_ID with your MixPay API Symbol

# 3. Login to Shopify
npm run shopify auth login

# 4. Link app
npm run shopify app config link

# 5. Deploy
npm run shopify app deploy
```

## Local Development

```bash
npm run shopify app dev
```

## Project Structure

```
mixpay-payment-shopify/
├── extensions/
│   └── mixpay-payment-block/      # UI Extension
│       ├── src/
│       │   └── Checkout.jsx       # Main component
│       ├── shopify.extension.toml # Extension configuration
│       └── package.json
├── shopify.app.toml               # App configuration
├── INSTALLATION.md                # Detailed installation guide
└── README.md
```

## Tech Stack

- **Shopify CLI**: App development and deployment tool
- **Shopify UI Extensions**: Checkout UI extensions
- **React**: UI component library
- **MixPay API**: Cryptocurrency payment interface

## Support

- 📧 Email: bd@mixpay.me
- 📖 Documentation: [MixPay Developer Docs](https://mixpay.me/developers)
- 🔧 Issues: [GitHub Issues](https://github.com/MixPayProtocol/mixpay-payment-shopify/issues)

## License

MIT License
