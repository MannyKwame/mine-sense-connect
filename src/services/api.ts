const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export interface ChatMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export interface ChatResponse {
  response: string;
  timestamp: string;
  fallback?: boolean;
}

export const chatService = {
  async sendMessage(message: string, conversationHistory: ChatMessage[] = []): Promise<ChatResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          conversationHistory: conversationHistory.slice(-10) // Keep last 10 messages for context
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Chat API error:', error);
      // Return fallback response
      return {
        response: "I'm sorry, I'm having trouble connecting to the AI service right now. Please try again later or contact support for assistance with your mining-related questions.",
        timestamp: new Date().toISOString(),
        fallback: true
      };
    }
  }
};

export const exportService = {
  async exportReports(): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/export/reports`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Create blob and download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `mining-reports-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export error:', error);
      throw new Error('Failed to export reports. Please try again.');
    }
  }
};

export const healthService = {
  async checkHealth(): Promise<{ status: string; timestamp: string; service: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Health check error:', error);
      throw error;
    }
  }
};