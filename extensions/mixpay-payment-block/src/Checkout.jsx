import {
  reactExtension,
  Banner,
  Button,
  Text,
  BlockStack,
  InlineStack,
  Spinner,
  useApi,
  useLanguage,
} from '@shopify/ui-extensions-react/checkout';
import { useState, useEffect } from 'react';


// !!! Replace this with your MixPay Plugin API Symbol
// This is the unique merchant identifier in the MixPay Plugin backend
const MIXPAY_PLUGIN_MERCHANT_ID = "14347bda-45fb-45c7-8e5f-cdc6c6362b17";

// MixPay Plugin API domain URL 
const MIXPAY_PLUGIN_API_DOMAIN_URL = "https://pluginsapi.mixpay.me";

// Debug mode - set to false in production to disable console logs
const DEBUG_MODE = true;

// Debug logger helper function
const debugLog = (...args) => {
  if (DEBUG_MODE) {
    console.log(...args);
  }
};

// Internationalization (i18n) - Language translations
const translations = {
  en: {
    checkingStatus: "Checking MixPay payment status…",
    paidTitle: "Paid with MixPay 🎉",
    paidMessage: "Your MixPay payment has been confirmed.",
    invalidTitle: "MixPay",
    invalidMessage: "Your order is closed.",
    payTitle: "Pay with MixPay",
    orderLabel: "Order",
    goToCheckout: "Go to MixPay checkout",
    linkUnavailable: "MixPay payment link is not available. Please contact the store owner.",
    networkError: "Network error, please refresh this page.",
    paymentGuideIntro: "After clicking the \"MixPay\" button above, you will be redirected to MixPay - Payment Gateway to complete your purchase securely.",
    cryptoPaymentTitle: "Payment tutorial with on-chain wallet",
    cryptoStep1: "Click on \"Pay with MixPay\"",
    cryptoStep2: "Select your payment method as \"Crypto\"",
    cryptoStep3: "Choose the payment currency",
    cryptoStep4: "Choose the payment method",
    cryptoStep5: "Pay with any Web3 wallet or exchange",
    cryptoStep6: "After successful payment, your order will show \"Your order has been confirmed\"",
    binancePayTitle: "Payment tutorial with Binance Pay",
    binanceStep1: "Click on \"Pay with MixPay\"",
    binanceStep2: "Choose your payment method as \"Binance Pay\"",
    binanceStep3: "Click on the \"Binance Pay\" button",
    binanceStep4: "Log in to your Binance account and complete the payment",
    binanceStep5: "After successful payment, your order will be displayed as \"Your order is confirmed\".",
  },
  zh: {
    checkingStatus: "正在检查 MixPay 支付状态…",
    paidTitle: "已通过 MixPay 支付 🎉",
    paidMessage: "您的 MixPay 支付已确认。",
    invalidTitle: "MixPay",
    invalidMessage: "您的订单已关闭。",
    payTitle: "使用 MixPay 支付",
    orderLabel: "订单",
    goToCheckout: "前往 MixPay 结账",
    linkUnavailable: "MixPay 支付链接不可用，请联系店主。",
    networkError: "网络错误，请刷新此页面。",
    paymentGuideIntro: "点击上方的 \"MixPay\" 按钮后，页面会跳转到 MixPay 支付网关，让您安全地完成支付。",
    cryptoPaymentTitle: "使用链上支付",
    cryptoStep1: "点击 \"Pay with MixPay\"",
    cryptoStep2: "选择 \"Crypto\" 作为您的支付方式",
    cryptoStep3: "选择支付币种",
    cryptoStep4: "选择支付方式",
    cryptoStep5: "使用 Web3 钱包或交易所转账",
    cryptoStep6: "成功付款后，您的订单会显示 \"Your order has been confirmed（您的订单已完成确认）\"",
    binancePayTitle: "使用 Binance Pay 支付",
    binanceStep1: "点击 \"Pay with MixPay\"",
    binanceStep2: "选择 \"Binance Pay\" 作为您的支付方式",
    binanceStep3: "点击 \"Binance Pay\" 按钮",
    binanceStep4: "登录您的币安账户，继续完成支付",
    binanceStep5: "成功付款后，您的订单会显示 \"Your order has been confirmed（您的订单已完成确认）\"",
  },
  "zh-CN": {
    checkingStatus: "正在检查 MixPay 支付状态…",
    paidTitle: "已通过 MixPay 支付 🎉",
    paidMessage: "您的 MixPay 支付已确认。",
    invalidTitle: "MixPay",
    invalidMessage: "您的订单已关闭。",
    payTitle: "使用 MixPay 支付",
    orderLabel: "订单",
    goToCheckout: "前往 MixPay 结账",
    linkUnavailable: "MixPay 支付链接不可用，请联系店主。",
    networkError: "网络错误，请刷新此页面。",
    paymentGuideIntro: "点击上方的 \"MixPay\" 按钮后，页面会跳转到 MixPay 支付网关，让您安全地完成支付。",
    cryptoPaymentTitle: "使用链上支付",
    cryptoStep1: "点击 \"Pay with MixPay\"",
    cryptoStep2: "选择 \"Crypto\" 作为您的支付方式",
    cryptoStep3: "选择支付币种",
    cryptoStep4: "选择支付方式",
    cryptoStep5: "使用 Web3 钱包或交易所转账",
    cryptoStep6: "成功付款后，您的订单会显示 \"Your order has been confirmed（您的订单已完成确认）\"",
    binancePayTitle: "使用 Binance Pay 支付",
    binanceStep1: "点击 \"Pay with MixPay\"",
    binanceStep2: "选择 \"Binance Pay\" 作为您的支付方式",
    binanceStep3: "点击 \"Binance Pay\" 按钮",
    binanceStep4: "登录您的币安账户，继续完成支付",
    binanceStep5: "成功付款后，您的订单会显示 \"Your order has been confirmed（您的订单已完成确认）\"",
  },
  "zh-TW": {
    checkingStatus: "正在檢查 MixPay 支付狀態…",
    paidTitle: "已通過 MixPay 支付 🎉",
    paidMessage: "您的 MixPay 支付已確認。",
    invalidTitle: "MixPay",
    invalidMessage: "您的訂單已關閉。",
    payTitle: "使用 MixPay 支付",
    orderLabel: "訂單",
    goToCheckout: "前往 MixPay 結賬",
    linkUnavailable: "MixPay 支付鏈接不可用，請聯繫店主。",
    networkError: "網絡錯誤，請刷新此頁面。",
    paymentGuideIntro: "點擊上方的 \"MixPay\" 按鈕後，頁面會跳轉到 MixPay 支付網關，讓您安全地完成支付。",
    cryptoPaymentTitle: "使用鏈上支付",
    cryptoStep1: "點擊 \"Pay with MixPay\"",
    cryptoStep2: "選擇 \"Crypto\" 作為您的支付方式",
    cryptoStep3: "選擇支付幣種",
    cryptoStep4: "選擇支付方式",
    cryptoStep5: "使用 Web3 錢包或交易所轉賬",
    cryptoStep6: "成功付款後，您的訂單會顯示 \"Your order has been confirmed（您的訂單已完成確認）\"",
    binancePayTitle: "使用 Binance Pay 支付",
    binanceStep1: "點擊 \"Pay with MixPay\"",
    binanceStep2: "選擇 \"Binance Pay\" 作為您的支付方式",
    binanceStep3: "點擊 \"Binance Pay\" 按鈕",
    binanceStep4: "登錄您的幣安賬戶，繼續完成支付",
    binanceStep5: "成功付款後，您的訂單會顯示 \"Your order has been confirmed（您的訂單已完成確認）\"",
  },
};

// Get translation helper function
const getTranslation = (locale, key) => {
  // Try exact match first
  if (translations[locale] && translations[locale][key]) {
    return translations[locale][key];
  }
  
  // Try language prefix (e.g., 'zh-CN' -> 'zh')
  const langPrefix = locale?.split('-')[0];
  if (langPrefix && translations[langPrefix] && translations[langPrefix][key]) {
    return translations[langPrefix][key];
  }
  
  // Fallback to English
  return translations.en[key] || key;
};

/**
 * Ajax implementation for making HTTP requests
 * 
 * @param {string} method - HTTP method
 * @param {string} url - Request URL
 * @param {object|string} [data] - Request body data
 * @returns {Promise<any>}
 */
function ajax(method, url, data = null) {
  const upper = method.toUpperCase();

  const options = {
    method: upper,
  };

  if (upper !== "GET" && upper !== "HEAD" && data) {
    options.headers = {
      "Content-Type": "application/json;charset=UTF-8",
    };
    options.body = JSON.stringify(data);
  }

  return fetch(url, options).then(async (res) => {
    const text = await res.text();

    // Try to parse as JSON
    let parsed;
    try {
      parsed = text ? JSON.parse(text) : {};
    } catch (e) {
      parsed = text;
    }

    if (res.ok) {
      return parsed;
    }

    // Same as original XHR version, throw JSON or Error on failure
    if (parsed && typeof parsed === "object") {
      throw parsed;
    } else {
      throw new Error(text || "Request failed");
    }
  });
}


// ------------------ UI Extension Entry Point ------------------
// Supports two targets: Thank You page and Order Status page
export default reactExtension('purchase.thank-you.block.render', () => <Extension />);

// Register the same component for Order Status page
// @ts-ignore - customer-account.order-status.block.render is a valid extension target
export const orderStatusExtension = reactExtension('customer-account.order-status.block.render', () => <Extension />);

function Extension() {
  // Use Shopify UI Extensions API
  const api = useApi();
  
  // Use Shopify's useLanguage hook to get current language
  const language = useLanguage();
  const locale = language?.isoCode || 'en';
  
  // ===== All Hooks must be at the top, no conditional returns =====
  // orderConfirmation is a signal that needs to be subscribed
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null); // unpaid / paid / invalid / null
  const [payUrl, setPayUrl] = useState(null);
  const [error, setError] = useState(null);
  const [orderExists, setOrderExists] = useState(null); // null = checking, true = exists, false = not exists
  
  // Translation helper for this component
  const t = (key) => getTranslation(locale, key);
  
  debugLog("MixPay current locale:", locale);
  
  useEffect(() => {
    debugLog("MixPay useEffect - extensionPoint:", api.extensionPoint);
    // @ts-ignore - api properties vary by extension point
    debugLog("MixPay useEffect - has orderConfirmation:", !!(api.orderConfirmation));
    // @ts-ignore - api properties vary by extension point
    debugLog("MixPay useEffect - has order:", !!(api.order));
    
    // Subscribe to orderConfirmation changes (Thank You page)
    // @ts-ignore - orderConfirmation exists on Thank You page
    if (api.orderConfirmation) {
      debugLog("MixPay subscribing to orderConfirmation");
      // @ts-ignore - orderConfirmation exists on Thank You page
      const unsubscribe = api.orderConfirmation.subscribe((value) => {
        debugLog("MixPay orderConfirmation value:", value);
        // Thank You page uses orderConfirmation data directly
        // Payment method info is already included in value.order
        setOrderData(value);
      });
      
      return unsubscribe;
    }
    
    // Order Status page: get from api.order (this is a signal)
    // @ts-ignore - extensionPoint string comparison is valid at runtime
    if (api.extensionPoint === 'customer-account.order-status.block.render') {
      debugLog("MixPay Order Status page detected");
      
      // @ts-ignore - order exists on Order Status page
      if (api.order) {
        debugLog("MixPay api.order exists, subscribing...");
        // @ts-ignore - order exists on Order Status page
        const unsubscribe = api.order.subscribe((orderValue) => {
          debugLog("MixPay api.order value:", orderValue);
          if (orderValue) {
            setOrderData({ order: orderValue });
          }
        });
        
        return unsubscribe;
      } else {
        debugLog("MixPay api.order does NOT exist!");
        debugLog("MixPay Available API keys:", Object.keys(api));
        return undefined;
      }
    }
    
    return undefined;
  }, []);
  
  // Check if payment method is Manual Payment (Custom Payment Method)
  const isMixPayOrder = () => {
    // If orderData is not loaded yet, return true to show loading state
    if (!orderData) {
      return true;
    }
    
    debugLog("MixPay checking order data:", orderData);
    
    // 1. Check payment type from selectedPaymentOptions (Thank You page)
    try {
      // @ts-ignore - selectedPaymentOptions may exist
      if (api.selectedPaymentOptions && api.selectedPaymentOptions.current) {
        // @ts-ignore
        const selectedPayments = api.selectedPaymentOptions.current || [];
        debugLog("MixPay selectedPaymentOptions:", selectedPayments);
        
        // Check if there is manualPayment type
        const hasManualPayment = selectedPayments.some(p => p.type === 'manualPayment');
        debugLog("MixPay has manual payment:", hasManualPayment);
        
        if (hasManualPayment) {
          return true;
        }
      }
    } catch (e) {
      debugLog("MixPay error reading selectedPaymentOptions:", e);
    }
    
    // 2. For Order Status page, check if order exists via API
    // @ts-ignore - extensionPoint string comparison is valid at runtime
    if (api.extensionPoint === 'customer-account.order-status.block.render') {
      debugLog("MixPay: Order Status page - checking orderExists:", orderExists);
      // If still checking (null), show loading
      if (orderExists === null) {
        return true;
      }
      // Only show if order exists
      return orderExists === true;
    }
    
    debugLog("MixPay: Not a manual payment order");
    return false;
  };
  
  // Extract order ID from orderConfirmation or api.data (needed for API calls)
  let merchOrderId = null;
  let orderName = "Order";
  let totalAmount = null;
  let currencyCode = null;
  
  if (orderData?.order?.id) {
    const rawId = orderData.order.id;
    // gid://shopify/Order/6707233882389 -> 6707233882389
    merchOrderId = String(rawId).split('/').pop();
    orderName = orderData.order.name || orderName;
    totalAmount = orderData.order.totalPrice?.amount;
    currencyCode = orderData.order.totalPrice?.currencyCode;
  }
  
  debugLog("MixPay extracted order ID:", merchOrderId);
  debugLog("MixPay order name:", orderName);
  debugLog("MixPay amount:", totalAmount, currencyCode);

  // Build return_to URL
  // Prefer statusPageUrl, otherwise build complete order details page URL
  let returnUrl = orderData?.order?.statusPageUrl || '';
  
  if (!returnUrl && merchOrderId) {
    // Fallback: build order status page URL
    // Format: https://shopify.com/{shop_id}/account/orders/{order_id}
    if (api.shop?.id && api.shop?.myshopifyDomain) {
      // Extract numeric ID from shop.id (gid://shopify/Shop/86977839381 -> 86977839381)
      const shopId = String(api.shop.id).split('/').pop();
      returnUrl = `https://shopify.com/${shopId}/account/orders/${merchOrderId}`;
      debugLog("MixPay using constructed returnUrl:", returnUrl);
    } else if (api.shop?.myshopifyDomain) {
      // If no shop.id, use myshopify domain format
      returnUrl = `https://${api.shop.myshopifyDomain}/account/orders/${merchOrderId}`;
      debugLog("MixPay using myshopify domain returnUrl:", returnUrl);
    }
  }
  
  debugLog("MixPay return URL:", returnUrl);
  debugLog("MixPay orderData.order:", orderData?.order);
  debugLog("MixPay statusPageUrl:", orderData?.order?.statusPageUrl);
  debugLog("MixPay ready to fetch:", { 
    hasApiKey: !!MIXPAY_PLUGIN_MERCHANT_ID, 
    hasMerchOrderId: !!merchOrderId, 
    hasReturnUrl: !!returnUrl 
  });

  // 2. Check if order exists (for Order Status page only)
  useEffect(() => {
    // Only run this check for Order Status page
    // @ts-ignore - extensionPoint string comparison is valid at runtime
    if (api.extensionPoint !== 'customer-account.order-status.block.render') {
      setOrderExists(true); // For Thank You page, always consider order exists
      return;
    }
    
    // Basic validation: no api key
    if (!MIXPAY_PLUGIN_MERCHANT_ID) {
      setOrderExists(false);
      return;
    }
    
    // If no order data yet, continue waiting
    if (!merchOrderId) {
      debugLog("MixPay: Waiting for order data to check existence...");
      return;
    }
    
    debugLog("MixPay: Checking if order exists for Order Status page...");
    
    // Check order existence via API
    const checkUrl = `${MIXPAY_PLUGIN_API_DOMAIN_URL}/v1/orders/order_exists?api_symbol=${encodeURIComponent(
      MIXPAY_PLUGIN_MERCHANT_ID
    )}&merch_order_id=${encodeURIComponent(merchOrderId)}`;
    
    ajax("get", checkUrl)
      .then((data) => {
        debugLog("MixPay order_exists response:", data);
        const merchOrderIdValue = data?.data?.merch_order_id || 0;
        const exists = merchOrderIdValue > 0;
        debugLog("MixPay order exists:", exists);
        setOrderExists(exists);
      })
      .catch((err) => {
        console.error("MixPay order_exists check error:", err);
        // On error, assume order doesn't exist (don't show)
        setOrderExists(false);
      });
  }, [merchOrderId]);
  
  // 3. On Thank you page, follow original logic: first query merch_order, then create one_time_payment if needed
  useEffect(() => {
    // Basic validation: no api key, throw error
    if (!MIXPAY_PLUGIN_MERCHANT_ID) {
      setLoading(false);
      setError("MixPay config error: missing API key.");
      return;
    }
    
    // If no order data yet, continue waiting (show loading)
    if (!merchOrderId) {
      debugLog("MixPay: Waiting for order data...");
      return;
    }
    
    // Wait for returnUrl to load
    if (!returnUrl) {
      debugLog("MixPay: Waiting for returnUrl...");
      return;
    }
    
    // For Order Status page, wait for orderExists check to complete
    // @ts-ignore - extensionPoint string comparison is valid at runtime
    if (api.extensionPoint === 'customer-account.order-status.block.render' && orderExists === null) {
      debugLog("MixPay: Waiting for order existence check...");
      return;
    }
    
    // For Order Status page, if order doesn't exist, don't proceed
    // @ts-ignore - extensionPoint string comparison is valid at runtime
    if (api.extensionPoint === 'customer-account.order-status.block.render' && orderExists === false) {
      debugLog("MixPay: Order doesn't exist, skipping status check");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    // === Corresponds to ajax("get", `${apiDomainUrl}/v1/orders/merch_order?...`) in old code ===
    const url = `${MIXPAY_PLUGIN_API_DOMAIN_URL}/v1/orders/merch_order?api_symbol=${encodeURIComponent(
      MIXPAY_PLUGIN_MERCHANT_ID
    )}&merch_order_id=${encodeURIComponent(merchOrderId)}`;

    ajax("get", url)
      .then((data) => {
        const info = data && data.data ? data.data : {};

        // Handle based on status
        if (info.status === "unpaid") {
          // === Corresponds to: ajax("post", `${apiDomainUrl}/v1/one_time_payment`, {...}) in old code ===
          return ajax("post", `${MIXPAY_PLUGIN_API_DOMAIN_URL}/v1/one_time_payment`, {
            api_symbol: MIXPAY_PLUGIN_MERCHANT_ID,
            merch_order_id: merchOrderId,
            return_to: returnUrl,
          }).then((res) => {
            const payInfo = res && res.data ? res.data : {};
            setPayUrl(payInfo.url || null);
            setStatus("unpaid");
            setLoading(false);
          });
        }

        if (info.status === "paid") {
          setStatus("paid");
          setLoading(false);
          return;
        }

        if (info.status === "invalid") {
          setStatus("invalid");
          setLoading(false);
          return;
        }

        // For other unknown statuses, just display them
        setStatus(info.status || null);
        setLoading(false);
      })
      .catch((err) => {
        console.error("MixPay order error:", err);
        setError(
          err?.message ||
            err?.error ||
            t('networkError')
        );
        setLoading(false);
      });
  }, [merchOrderId, returnUrl, orderExists]);

  // For Order Status page: hide content until orderExists check completes
  // @ts-ignore - extensionPoint string comparison is valid at runtime
  if (api.extensionPoint === 'customer-account.order-status.block.render') {
    // If still checking or order doesn't exist, hide everything (no flash)
    if (orderExists === null || orderExists === false) {
      debugLog("MixPay: Order Status page - hiding until order existence confirmed");
      return null;
    }
  }
  
  // If not a MixPay order, don't show anything
  const shouldShowExtension = isMixPayOrder();
  
  if (!shouldShowExtension) {
    debugLog("MixPay: Not a MixPay order, hiding extension");
    return null;
  }

  // UI rendering: convert original pageSuccess/pageInvalid/pageError to Banner

  if (loading) {
    return (
      <Banner title="MixPay" status="info">
        <InlineStack spacing="base">
          <Spinner size="small" />
          <Text>{t('checkingStatus')}</Text>
        </InlineStack>
      </Banner>
    );
  }

  if (error) {
    return (
      <Banner title="MixPay" status="critical">
        <Text>{String(error)}</Text>
      </Banner>
    );
  }

  if (status === "paid") {
    return (
      <Banner title={t('paidTitle')} status="success">
        <BlockStack spacing="base">
          <Text>{t('paidMessage')}</Text>
        </BlockStack>
      </Banner>
    );
  }

  if (status === "invalid") {
    return (
      <Banner title={t('invalidTitle')} status="warning">
        <Text>{t('invalidMessage')}</Text>
      </Banner>
    );
  }

  // Default to unpaid scenario
  return (
    <Banner title={t('payTitle')}>
      <BlockStack spacing="base">
        {orderName && totalAmount && currencyCode && (
          <Text>
            {t('orderLabel')}: {orderName} — {totalAmount} {currencyCode}
          </Text>
        )}

        {payUrl ? (
          <>
            <Button
              kind="primary"
              to={payUrl}
            >
              {t('goToCheckout')}
            </Button>
            
            {/* Payment Guide */}
            <BlockStack spacing="tight">
              <Text size="small" appearance="subdued">
                {t('paymentGuideIntro')}
              </Text>
              
              {/* Crypto Payment Tutorial */}
              <BlockStack spacing="extraTight">
                <Text size="small" emphasis="bold">
                  {t('cryptoPaymentTitle')}
                </Text>
                <Text size="small">1. {t('cryptoStep1')}</Text>
                <Text size="small">2. {t('cryptoStep2')}</Text>
                <Text size="small">3. {t('cryptoStep3')}</Text>
                <Text size="small">4. {t('cryptoStep4')}</Text>
                <Text size="small">5. {t('cryptoStep5')}</Text>
                <Text size="small">6. {t('cryptoStep6')}</Text>
              </BlockStack>
              
              {/* Binance Pay Tutorial */}
              <BlockStack spacing="extraTight">
                <Text size="small" emphasis="bold">
                  {t('binancePayTitle')}
                </Text>
                <Text size="small">1. {t('binanceStep1')}</Text>
                <Text size="small">2. {t('binanceStep2')}</Text>
                <Text size="small">3. {t('binanceStep3')}</Text>
                <Text size="small">4. {t('binanceStep4')}</Text>
                <Text size="small">5. {t('binanceStep5')}</Text>
              </BlockStack>
            </BlockStack>
          </>
        ) : (
          <Text appearance="critical">
            {t('linkUnavailable')}
          </Text>
        )}
      </BlockStack>
    </Banner>
  );
}
