const Groq = require('groq-sdk');

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

class AIService {
  async parseUserIntent(message) {
    try {
      const prompt = `You are an AI assistant for a WhatsApp marketplace. Parse the user's message and extract:
1. Service type (logo, website, app, content, marketing, design, other)
2. Budget (if mentioned, extract the number)
3. Any specific requirements

User message: "${message}"

Respond ONLY with valid JSON in this exact format:
{
  "service": "service_type",
  "budget": number_or_null,
  "requirements": "specific requirements or null"
}`;

      const response = await groq.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: 'You are a helpful assistant that extracts structured data from user messages. Always respond with valid JSON only.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.3,
        max_tokens: 150
      });

      const content = response.choices[0].message.content.trim();
      
      // Clean up response if it has markdown code blocks
      let cleanContent = content;
      if (content.includes('```json')) {
        cleanContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      } else if (content.includes('```')) {
        cleanContent = content.replace(/```\n?/g, '').trim();
      }
      
      const parsed = JSON.parse(cleanContent);
      
      return {
        service: parsed.service || 'other',
        budget: parsed.budget || null,
        requirements: parsed.requirements || null
      };
    } catch (error) {
      console.error('AI parsing error:', error);
      // Fallback to basic parsing
      return this.fallbackParse(message);
    }
  }

  fallbackParse(message) {
    const lowerMsg = message.toLowerCase();
    
    // Extract service type
    let service = 'other';
    if (lowerMsg.includes('logo')) service = 'logo';
    else if (lowerMsg.includes('website') || lowerMsg.includes('site')) service = 'website';
    else if (lowerMsg.includes('app')) service = 'app';
    else if (lowerMsg.includes('content') || lowerMsg.includes('writing')) service = 'content';
    else if (lowerMsg.includes('marketing')) service = 'marketing';
    else if (lowerMsg.includes('design')) service = 'design';

    // Extract budget
    const budgetMatch = message.match(/₹?\s*(\d+)/);
    const budget = budgetMatch ? parseInt(budgetMatch[1]) : null;

    return { service, budget, requirements: message };
  }

  async generateResponse(sellers, userIntent) {
    if (!sellers || sellers.length === 0) {
      return `Sorry, I couldn't find any services matching "${userIntent.service}"${userIntent.budget ? ` under ₹${userIntent.budget}` : ''}. 

Try:
• Increasing your budget
• Being more specific
• Asking for a different service

What else can I help you with?`;
    }

    let response = `Great! I found ${sellers.length} option${sellers.length > 1 ? 's' : ''} for you:\n\n`;
    
    sellers.forEach((seller, index) => {
      response += `${index + 1}. *${seller.name}*\n`;
      response += `   ${seller.service}\n`;
      response += `   💰 ₹${seller.price}\n`;
      response += `   ⭐ ${seller.rating}/5 (${seller.completedOrders} orders)\n`;
      response += `   ⏱️ ${seller.deliveryTime}\n`;
      response += `   📝 ${seller.description}\n\n`;
    });

    response += `Reply with the number (1-${sellers.length}) to proceed with payment! 💳`;
    
    return response;
  }
}

module.exports = new AIService();
