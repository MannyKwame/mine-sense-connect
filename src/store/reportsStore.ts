
interface Report {
  id: string;
  name: string;
  phone: string;
  email: string;
  location: string;
  category: string;
  severity: string;
  title: string;
  description: string;
  dateOccurred: string;
  status: string;
  dateSubmitted: string;
}

class ReportsStore {
  private reports: Report[] = [
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
    },
    {
      id: "GR-2024-086",
      title: "Unpaid compensation for land acquisition",
      location: "Prestea, Western Region",
      category: "Compensation",
      severity: "Critical",
      status: "Escalated",
      dateOccurred: "2024-01-05",
      dateSubmitted: "2024-01-12",
      name: "Akua D.",
      phone: "+233123456792",
      email: "akua.d@email.com",
      description: "We have not received promised compensation for our land that was acquired for mining operations."
    }
  ];

  private listeners: (() => void)[] = [];

  addReport(reportData: Omit<Report, 'id' | 'status' | 'dateSubmitted'>): string {
    const id = `GR-2024-${String(Date.now()).slice(-3)}`;
    const newReport: Report = {
      ...reportData,
      id,
      status: "Under Review",
      dateSubmitted: new Date().toISOString().split('T')[0]
    };
    
    this.reports.unshift(newReport);
    this.notifyListeners();
    return id;
  }

  getReports(): Report[] {
    return this.reports;
  }

  subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener());
  }
}

export const reportsStore = new ReportsStore();
export type { Report };
