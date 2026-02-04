import Groq from "groq-sdk";

type AppMode = 'global' | 'ngo';
type Region = 'arab' | 'international';

interface TrendItem {
  title: string;
  category: 'music' | 'content' | 'hashtag';
  platform: string[];
  engagement: string;
  momentum: number;
  description: string;
  url: string;
}

interface GroundingSource {
  title: string;
  uri: string;
}

interface TrendData {
  items: TrendItem[];
  sources: GroundingSource[];
  analysis: string;
}

export const fetchTrends = async (mode: AppMode, region: Region): Promise<TrendData> => {
  const groq = new Groq({
    apiKey: import.meta.env.VITE_GROQ_API_KEY,
    dangerouslyAllowBrowser: true // Required for client-side usage
  });
  
  const regionContext = region === 'arab' 
    ? "Focus exclusively on Egypt and the Arab world. Look for trends in Arabic and English popular in this region (MENA)." 
    : "Focus on International/Foreign trends (USA, Europe, Global West). Look for globally viral trends.";

  const modeContext = mode === 'global'
    ? "Analyze general social media trends across Facebook, TikTok, Instagram, X (Twitter), and YouTube."
    : "Identify top social media trends for NGOs and humanitarian impact. Focus on HIGH-REACH topics such as Gaza support, digging wells, charity (Sadaqah), education initiatives, and environmental activism.";

  const systemPrompt = `You are a social media trend analyst. Your task is to provide realistic, current social media trends.

${regionContext}
${modeContext}

TIME FRAME: Focus on the LAST 3 MONTHS, with a heavy emphasis on TODAY and the current week.

CRITICAL QUANTITY RULES:
- You MUST provide EXACTLY 6 items for the 'music' category.
- You MUST provide EXACTLY 6 items for the 'content' category.
- You MUST provide EXACTLY 6 items for the 'hashtag' category.
- TOTAL = 18 items. Do not provide fewer than 6 per category.

CONTENT FOCUS:
- For 'Content', focus on specific high-reach posts, viral topics, or trending discussions.
- For 'Music', focus on the top 6 trending tracks/artists currently being used in reels/tiktoks.
- For 'Hashtag', focus on the top 6 tags with the highest velocity today.

PLATFORMS: 
- Facebook MUST be included alongside TikTok, Instagram, X, and YouTube.

OUTPUT FORMAT:
Return ONLY valid JSON (no markdown, no backticks) with this exact structure:
{
  "items": [
    {
      "title": "string",
      "category": "music" | "content" | "hashtag",
      "platform": ["Facebook", "TikTok", etc],
      "engagement": "string (e.g., '2.5M views')",
      "momentum": number (0-100),
      "description": "string",
      "url": "string (direct link or search link)"
    }
  ],
  "analysis": "A strategic overview of the current landscape (2-3 sentences)"
}`;

  const userPrompt = `Generate current ${region === 'arab' ? 'Arab/MENA' : 'International'} social media trends for ${mode === 'global' ? 'general audience' : 'NGO/humanitarian sector'}.

Remember:
- Exactly 6 music trends
- Exactly 6 content trends  
- Exactly 6 hashtag trends
- Each with valid URLs
- Focus on current/recent trends

Return ONLY the JSON object, no other text.`;

  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: userPrompt
        }
      ],
      model: "llama-3.3-70b-versatile", // Fast and free model
      temperature: 0.7,
      max_tokens: 4000,
    });

    const responseText = completion.choices[0]?.message?.content || '{}';
    
    // Clean up response - remove markdown code blocks if present
    let cleanedText = responseText.trim();
    if (cleanedText.startsWith('```json')) {
      cleanedText = cleanedText.replace(/^```json\n/, '').replace(/\n```$/, '');
    } else if (cleanedText.startsWith('```')) {
      cleanedText = cleanedText.replace(/^```\n/, '').replace(/\n```$/, '');
    }
    
    const rawData = JSON.parse(cleanedText);
    
    return {
      items: rawData.items || [],
      analysis: rawData.analysis || 'Analysis unavailable',
      sources: [] // Groq doesn't provide grounding sources like Gemini
    };
  } catch (error: any) {
    console.error('Groq API Error:', error);
    throw new Error(error?.message || 'Failed to fetch trends from Groq API');
  }
};
