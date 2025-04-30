'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { PDFViewer, Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    fontFamily: 'Helvetica',
    backgroundColor: '#fff',
  },
  header: {
    borderBottom: '1 solid #ccc',
    paddingBottom: 10,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    width: 100,
    height: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  section: {
    marginBottom: 15,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  divider: {
    borderBottom: '1 solid #e4e4e4',
    marginVertical: 10,
  },
});

const TransactionPDF = ({ transaction }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Image style={styles.logo} src="/logo.png" />
        <Text style={styles.title}>Transaction Receipt</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.row}>
          <Text style={styles.label}>Transaction ID:</Text>
          <Text>{transaction.id}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Date:</Text>
          <Text>{new Date(transaction.createdAt).toLocaleString()}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.section}>
        <Text style={{ fontSize: 14, marginBottom: 5 }}>Details</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Amount:</Text>
          <Text>${transaction.amount}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Type:</Text>
          <Text>{transaction.type}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Status:</Text>
          <Text>{transaction.status}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.section}>
        <Text style={{ fontSize: 14, marginBottom: 5 }}>Sender Info</Text>
        <Text>
          {transaction.senderUser?.fname} {transaction.senderUser?.lname}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={{ fontSize: 14, marginBottom: 5 }}>Recipient Info</Text>
        <Text>
          {transaction.recipientUser?.fname ?? '-'} {transaction.recipientUser?.lname ?? ''}
        </Text>
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
    <div className="h-screen w-screen">
      <PDFViewer style={{ width: '100%', height: '100%' }}>
        <TransactionPDF transaction={transaction} />
      </PDFViewer>
    </div>
  );
};

export default TransactionPDFPage;
