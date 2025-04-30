'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 30 },
  section: { marginBottom: 10 },
  title: { fontSize: 20, marginBottom: 10 },
});

const TransactionPDF = ({ transaction }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Transaction Details</Text>
      <View style={styles.section}>
        <Text>Amount: ${transaction.amount}</Text>
        <Text>Type: {transaction.type}</Text>
        <Text>Status: {transaction.status}</Text>
        <Text>Sender: {transaction.senderUser?.fname} {transaction.senderUser?.lname}</Text>
        <Text>Recipient: {transaction.recipientUser?.fname || '-'}</Text>
        <Text>Date: {new Date(transaction.createdAt).toLocaleString()}</Text>
      </View>
    </Page>
  </Document>
);

const TransactionPDFPage = () => {
  const { id } = useParams();
  const [transaction, setTransaction] = React.useState(null);

  React.useEffect(() => {
    fetch(`/api/admin/transactions/${id}`)
      .then((res) => res.json())
      .then(setTransaction);
  }, [id]);

  if (!transaction) return <p>Loading...</p>;

  return (
    <div className="p-8">
      <PDFDownloadLink
        document={<TransactionPDF transaction={transaction} />}
        fileName={`transaction-${id}.pdf`}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {({ loading }) => (loading ? 'Preparing PDF...' : 'Download PDF')}
      </PDFDownloadLink>
    </div>
  );
};

export default TransactionPDFPage;
