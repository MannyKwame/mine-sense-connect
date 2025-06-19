
import { useState, useEffect } from 'react';
import { reportsStore, Report } from '../store/reportsStore';

export const useReports = () => {
  const [reports, setReports] = useState<Report[]>(reportsStore.getReports());

  useEffect(() => {
    const unsubscribe = reportsStore.subscribe(() => {
      setReports(reportsStore.getReports());
    });

    return unsubscribe;
  }, []);

  return {
    reports,
    addReport: (reportData: Omit<Report, 'id' | 'status' | 'dateSubmitted'>) => 
      reportsStore.addReport(reportData)
  };
};
