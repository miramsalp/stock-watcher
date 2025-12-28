exports.createStockAlertFlex = (stockData, currentPrice) => {
    const { symbol, target_price, condition_type } = stockData;
    const isAbove = condition_type === 'above';
    
    const mainColor = isAbove ? '#06c755' : '#ef4444'; 
    const badgeText = isAbove ? '🚀 BREAKOUT' : '🔻 BUY DIP';
    const altText = `แจ้งเตือนหุ้น ${symbol}: $${currentPrice}`;

    return {
        type: "flex",
        altText: altText,
        contents: {
            type: "bubble",
            size: "medium",
            header: {
                type: "box",
                layout: "vertical",
                contents: [
                    {
                        type: "text",
                        text: badgeText,
                        color: mainColor,
                        weight: "bold",
                        size: "sm"
                    },
                    {
                        type: "text",
                        text: symbol,
                        weight: "bold",
                        size: "xxl",
                        margin: "md"
                    }
                ],
                paddingBottom: "none"
            },
            body: {
                type: "box",
                layout: "vertical",
                contents: [
                    {
                        type: "box",
                        layout: "horizontal",
                        contents: [
                            { type: "text", text: "ราคาปัจจุบัน", color: "#8c8c8c", size: "sm" },
                            {
                                type: "text",
                                text: `$${currentPrice}`,
                                align: "end",
                                weight: "bold",
                                size: "lg",
                                color: mainColor
                            }
                        ]
                    },
                    {
                        type: "box",
                        layout: "horizontal",
                        contents: [
                            { type: "text", text: "เป้าหมายที่ตั้งไว้", color: "#8c8c8c", size: "sm" },
                            {
                                type: "text",
                                text: `$${target_price}`,
                                align: "end",
                                size: "sm",
                                color: "#111111"
                            }
                        ],
                        margin: "md"
                    },
                    { type: "separator", margin: "lg" }
                ]
            },
            footer: {
                type: "box",
                layout: "vertical",
                contents: [
                    {
                        type: "button",
                        action: {
                            type: "uri",
                            label: "ดู Watchlist ของฉัน",
                            uri: "https://stock-watcher-vert.vercel.app"
                        },
                        style: "primary",
                        color: mainColor
                    }
                ]
            }
        }
    };
};