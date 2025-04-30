// lib/utils/downloadPdf.tsx
import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import TransactionPDFDocument from '@/components/admin/TransactionPDFDocument';

export const generateAndDownloadPDF = async (transaction) => {
  const blob = await pdf(<TransactionPDFDocument transaction={transaction} />).toBlob();
  saveAs(blob, `transaction-${transaction.id}.pdf`);
};
