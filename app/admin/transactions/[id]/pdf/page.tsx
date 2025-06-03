'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import {
  PDFViewer,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: 'Helvetica',
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderBottom: '1 solid #ccc',
    paddingBottom: 10,
  },
  logo: {
    width: 80,
    height: 40,
  },
  verticalLine: {
    width: 1,
    height: '100%',
    backgroundColor: '#000',
    marginHorizontal: 15,
  },
  headerRight: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 4,
  },
  date: {
    fontSize: 11,
    color: '#333',
    textAlign: 'left',
  },
  section: {
    marginBottom: 15,
  },
  label: {
    fontWeight: 'bold',
    width: 120,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  divider: {
    borderBottom: '1 solid #e4e4e4',
    marginVertical: 10,
  },
  heading: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: 'bold',
    color: '#222',
  },
});

const TransactionPDF = ({ transaction }) => {
  const logoUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/assets/icons/logo-full.png`;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Image style={styles.logo} src={logoUrl} />
          <View style={styles.verticalLine} />
          <View style={styles.headerRight}>
            <Text style={styles.title}>Transaction Receipt</Text>
            <Text style={styles.date}>
              {new Date(transaction.createdAt).toLocaleString()}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Transaction Summary</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Transaction ID:</Text>
            <Text>{transaction.id}</Text>
          </View>
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
          <Text style={styles.heading}>Sender Information</Text>
          <Text>
            {transaction.senderUser?.fname} {transaction.senderUser?.lname}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Recipient Information</Text>
          <Text>
            {transaction.recipientUser?.fname ?? '-'}{' '}
            {transaction.recipientUser?.lname ?? ''}
          </Text>
        </View>
      </Page>
    </Document>
  );
};


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
