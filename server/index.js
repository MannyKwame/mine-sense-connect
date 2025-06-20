import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'your-openai-api-key-here'
});

// Mining law knowledge base for context
const MINING_CONTEXT = `
You are an AI assistant specialized in Ghana's mining laws and regulations. You help community members understand their rights and navigate mining-related issues.

Key Ghana Mining Laws and Regulations:
- Mining Act 2006 (Act 703)
- Environmental Protection Agency Act 1994 (Act 490)
- Water Resources Commission Act 1996 (Act 522)
- Minerals and Mining (Health, Safety and Technical) Regulations 2012 (L.I. 2182)

Community Rights:
1. Right to compensation for property damage
2. Right to clean water and air
3. Right to prior consultation before mining operations
4. Right to receive mining royalties through District Assembly
5. Right to employment opportunities

Environmental Standards:
- Environmental Impact Assessment (EIA) required
- Water quality standards must be maintained
- Air quality limits for dust and emissions
- Noise level restrictions
- Land reclamation after mining

Compensation Process:
1. Document damages with photos and receipts
2. Report to mining company's Community Relations Officer
3. Contact Minerals Commission if unsatisfied
4. Legal action for complex cases

Reporting Authorities:
- Environmental Protection Agency (EPA)
- Minerals Commission
- Water Resources Commission
- Traditional authorities
- District Assembly

Always provide practical, actionable advice and reference specific laws where applicable.
`;

// AI Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Build conversation context
    const messages = [
      {
        role: 'system',
        content: MINING_CONTEXT
      },
      ...conversationHistory.map(msg => ({
        role: msg.isUser ? 'user' : 'assistant',
        content: msg.content
      })),
      {
        role: 'user',
        content: message
      }
    ];

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: messages,
      max_tokens: 500,
      temperature: 0.7,
    });

    const aiResponse = completion.choices[0].message.content;

    res.json({
      response: aiResponse,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('OpenAI API Error:', error);
    
    // Fallback response if OpenAI fails
    const fallbackResponse = getFallbackResponse(req.body.message);
    
    res.json({
      response: fallbackResponse,
      timestamp: new Date().toISOString(),
      fallback: true
    });
  }
});

// Fallback responses when OpenAI is not available
function getFallbackResponse(message) {
  const q = message.toLowerCase();
  
  if (q.includes("rights") || q.includes("right")) {
    return "Under Ghana's Mining Act (Act 703), you have several important rights as a community member:\n\n• Right to compensation for damaged property or crops\n• Right to clean water and air\n• Right to prior consultation before mining operations begin\n• Right to receive a portion of mining royalties through the District Assembly\n• Right to employment opportunities from mining companies\n\nYou can file complaints with the Environmental Protection Agency (EPA) or Minerals Commission if these rights are violated.";
  }
  
  if (q.includes("water") || q.includes("pollution")) {
    return "To report water pollution from mining activities:\n\n1. **Document the issue**: Take photos, note the date, time, and location\n2. **Contact EPA**: Call the Environmental Protection Agency hotline or visit their regional office\n3. **File with Minerals Commission**: Submit a formal complaint with evidence\n4. **Community leader**: Inform your traditional authority or assembly member\n5. **Keep records**: Save all correspondence and reference numbers\n\nUnder Ghana's Water Resources Commission Act, mining companies must treat wastewater before discharge and maintain water quality standards.";
  }
  
  if (q.includes("compensation") || q.includes("damage")) {
    return "You may be entitled to compensation for:\n\n**Property Damage**: Buildings, structures, or land affected by mining operations\n**Crop Loss**: Agricultural crops destroyed or damaged\n**Water Sources**: Contaminated boreholes, wells, or streams\n**Noise/Dust**: Health impacts from mining activities\n\n**Process**:\n1. Document all damages with photos and receipts\n2. Report to the mining company's Community Relations Officer\n3. If unsatisfied, contact the Minerals Commission\n4. Legal action may be necessary for complex cases\n\nCompensation should be fair market value plus additional damages for inconvenience.";
  }
  
  if (q.includes("environmental") || q.includes("standard")) {
    return "Mining companies in Ghana must comply with:\n\n**Environmental Standards**:\n• Environmental Impact Assessment (EIA) before operations\n• Water quality standards (no toxic discharge)\n• Air quality limits for dust and emissions\n• Noise level restrictions (especially at night)\n• Land reclamation after mining ends\n\n**Monitoring Requirements**:\n• Regular environmental audits\n• Community consultation meetings\n• Public disclosure of environmental data\n• Emergency response plans for accidents\n\nThe EPA enforces these standards and can issue fines or suspend operations for violations.";
  }
  
  return "Thank you for your question. I can help you with information about mining rights, environmental regulations, compensation processes, and legal procedures in Ghana. Could you please be more specific about what aspect of mining law or community rights you'd like to know about?";
}

// Export data endpoint
app.get('/api/export/reports', (req, res) => {
  try {
    // This would typically fetch from a database
    // For now, we'll use mock data
    const reports = [
      {
        id: "GR-2024-089",
        title: "Water contamination from mining runoff",
        location: "Konongo, Ashanti Region",
        category: "Environmental",
        severity: "High",
        status: "Under Review",
        dateOccurred: "2024-01-10",
        dateSubmitted: "2024-01-15",
        name: "Kwame A.",
        phone: "+233123456789",
        email: "",
        description: "Mining activities have contaminated our water sources, making them unsafe for consumption."
      },
      {
        id: "GR-2024-088",
        title: "Excessive dust affecting respiratory health",
        location: "Obuasi, Ashanti Region",
        category: "Health & Safety",
        severity: "Medium",
        status: "In Progress",
        dateOccurred: "2024-01-12",
        dateSubmitted: "2024-01-14",
        name: "Ama B.",
        phone: "+233123456790",
        email: "ama.b@email.com",
        description: "Heavy machinery operations create excessive dust that affects our breathing and health."
      },
      {
        id: "GR-2024-087",
        title: "Property damage from blasting operations",
        location: "Tarkwa, Western Region",
        category: "Property Damage",
        severity: "High",
        status: "Resolved",
        dateOccurred: "2024-01-08",
        dateSubmitted: "2024-01-13",
        name: "Kofi C.",
        phone: "+233123456791",
        email: "",
        description: "Blasting activities have caused cracks in our buildings and property damage."
      }
    ];

    // Convert to CSV
    const csvHeader = "ID,Title,Location,Category,Severity,Status,Date Occurred,Date Submitted,Reporter Name,Phone,Email,Description\n";
    const csvRows = reports.map(report => {
      return [
        report.id,
        `"${report.title}"`,
        `"${report.location}"`,
        report.category,
        report.severity,
        report.status,
        report.dateOccurred,
        report.dateSubmitted,
        `"${report.name}"`,
        report.phone,
        report.email,
        `"${report.description.replace(/"/g, '""')}"`
      ].join(',');
    }).join('\n');

    const csv = csvHeader + csvRows;

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="mining-reports.csv"');
    res.send(csv);

  } catch (error) {
    console.error('Export error:', error);
    res.status(500).json({ error: 'Failed to export data' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'MineSense Ghana API'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});