export async function sendDiscordMessage(embeds: any[]) {
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (!webhookUrl) {
        console.warn("DISCORD_WEBHOOK_URL is not defined. Skipping Discord notification.");
        return;
    }

    try {
        const response = await fetch(webhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ embeds }),
        });

        if (!response.ok) {
            console.error("Failed to send Discord notification:", await response.text());
        }
    } catch (error) {
        console.error("Discord notification error:", error);
    }
}
