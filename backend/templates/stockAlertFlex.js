exports.createStockAlertFlex = (stockData, currentPrice) => {
    const { symbol, target_price, condition_type } = stockData;
    const isAbove = condition_type === 'above';
    
    const mainColor = isAbove ? '#059669' : '#dc2626'; 
    const bgColor = isAbove ? '#ecfdf5' : '#fef2f2'; 
    const badgeText = isAbove ? '📈 PRICE BREAKOUT' : '📉 PRICE DIP';

    return {
        type: "flex",
        altText: `🔔 ${symbol} Alert: $${currentPrice}`,
        contents: {
            type: "bubble",
            size: "mega",
            header: {
                type: "box",
                layout: "vertical",
                contents: [
                    {
                        type: "text",
                        text: badgeText,
                        color: "#ffffff",
                        weight: "bold",
                        size: "xs",
                        letterSpacing: "0.1rem"
                    },
                    {
                        type: "text",
                        text: String(symbol),
                        weight: "bold",
                        size: "xxl",
                        margin: "sm",
                        color: "#ffffff"
                    }
                ],
                backgroundColor: mainColor, 
                paddingAll: "xl"
            },
            body: {
                type: "box",
                layout: "vertical",
                contents: [
                    {
                        type: "text",
                        text: "CURRENT PRICE",
                        size: "xs",
                        color: "#8c8c8c",
                        weight: "bold"
                    },
                    {
                        type: "text",
                        text: `$${currentPrice}`,
                        size: "3xl",
                        weight: "bold",
                        color: mainColor,
                        margin: "xs"
                    },
                    {
                        type: "box",
                        layout: "vertical",
                        margin: "lg",
                        spacing: "sm",
                        contents: [
                            {
                                type: "box",
                                layout: "baseline",
                                spacing: "md",
                                contents: [
                                    { type: "text", text: "Target", color: "#8c8c8c", size: "sm", flex: 1 },
                                    { type: "text", text: `$${target_price}`, color: "#111111", size: "sm", flex: 3, weight: "bold" }
                                ]
                            },
                            {
                                type: "box",
                                layout: "baseline",
                                spacing: "md",
                                contents: [
                                    { type: "text", text: "Condition", color: "#8c8c8c", size: "sm", flex: 1 },
                                    { type: "text", text: isAbove ? "Price ≥ Target" : "Price ≤ Target", color: "#111111", size: "sm", flex: 3 }
                                ]
                            }
                        ]
                    }
                ],
                paddingAll: "xl"
            },
            footer: {
                type: "box",
                layout: "vertical",
                contents: [
                    {
                        type: "button",
                        action: {
                            type: "uri",
                            label: "OPEN DASHBOARD",
                            uri: "https://stock-watcher-vert.vercel.app"
                        },
                        style: "primary",
                        color: mainColor,
                        height: "md"
                    }
                ],
                paddingAll: "xl",
                paddingTop: "none"
            }
        }
    };
};