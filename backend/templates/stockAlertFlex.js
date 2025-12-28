exports.createStockAlertFlex = (stockData, currentPrice) => {
    const { symbol, target_price, condition_type } = stockData;
    const isAbove = condition_type === 'above';

    const mainColor = isAbove ? '#059669' : '#dc2626'; 
    const badgeText = isAbove ? '📈 PRICE BREAKOUT' : '📉 PRICE DIP';

    return {
        type: "flex",
        altText: `🔔 แจ้งเตือนหุ้น ${symbol}: $${currentPrice}`,
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
                        size: "xs"
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
                        text: "ราคาปัจจุบัน",
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
                                    { type: "text", text: "เป้าหมาย", color: "#8c8c8c", size: "sm", flex: 1 },
                                    { type: "text", text: `$${target_price}`, color: "#111111", size: "sm", flex: 3, weight: "bold" }
                                ]
                            },
                            {
                                type: "box",
                                layout: "baseline",
                                spacing: "md",
                                contents: [
                                    { type: "text", text: "เงื่อนไข", color: "#8c8c8c", size: "sm", flex: 1 },
                                    { type: "text", text: isAbove ? "ราคาสูงกว่าเป้าหมาย" : "ราคาต่ำกว่าเป้าหมาย", color: "#111111", size: "sm", flex: 3 }
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
                            label: "เปิดดูหน้า Dashboard",
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