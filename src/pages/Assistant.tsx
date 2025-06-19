
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, MessageSquare, ArrowLeft, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const Assistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your AI assistant for mining-related questions in Ghana. I can help you understand your rights, environmental regulations, compensation laws, and more. What would you like to know?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const suggestionQuestions = [
    "What are my rights as a community member near mining operations?",
    "How do I report water pollution from mining activities?",
    "What compensation can I claim for property damage from blasting?",
    "What environmental standards must mining companies follow in Ghana?"
  ];

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    // Simulate AI response (in real implementation, this would call OpenAI API)
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getSimulatedResponse(inputMessage),
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const getSimulatedResponse = (question: string): string => {
    const q = question.toLowerCase();
    
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
  };

  const handleSuggestionClick = (question: string) => {
    setInputMessage(question);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-4">
            <Link to="/" className="mr-4">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">AI Mining Assistant</h1>
                <p className="text-sm text-gray-600">Get answers about mining rights and regulations</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Suggestions Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-4">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                <Sparkles className="w-4 h-4 mr-2 text-yellow-600" />
                Suggested Questions
              </h3>
              <div className="space-y-2">
                {suggestionQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(question)}
                    className="w-full text-left p-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </Card>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <Card className="h-[600px] flex flex-col">
              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.isUser
                            ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <p className="whitespace-pre-line">{message.content}</p>
                        <p className={`text-xs mt-2 ${message.isUser ? 'text-blue-100' : 'text-gray-500'}`}>
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 rounded-lg p-3">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Input */}
              <div className="border-t p-4">
                <div className="flex space-x-2">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Ask about mining rights, compensation, environmental regulations..."
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleSendMessage}
                    disabled={isLoading || !inputMessage.trim()}
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assistant;
