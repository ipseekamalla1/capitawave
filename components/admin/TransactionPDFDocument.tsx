// components/TransactionPDFDocument.js
import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image
} from '@react-pdf/renderer';
import logo from '@/public/assets/icons/logo-full.png'; // adjust path based on where your logo is

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: 'Helvetica'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  logo: { width: 50, height: 50 },
  title: { fontSize: 20, fontWeight: 'bold' },
  section: {
    marginBottom: 10,
    paddingBottom: 10,
    borderBottom: '1 solid #ccc'
  },
  label: { fontWeight: 'bold' },
});

const TransactionPDFDocument = ({ transaction }) => (
  <Document>
    <Page style={styles.page} size="A4">
      <View style={styles.header}>
        <Image style={styles.logo} src={logo.src} />
        <Text style={styles.title}>Transaction Receipt</Text>
      </View>

      <View style={styles.section}>
        <Text><Text style={styles.label}>Amount:</Text> ${transaction.amount.toFixed(2)}</Text>
        <Text><Text style={styles.label}>Type:</Text> {transaction.type}</Text>
        <Text><Text style={styles.label}>Status:</Text> {transaction.status}</Text>
        <Text><Text style={styles.label}>Sender:</Text> {transaction.senderUser?.fname} {transaction.senderUser?.lname}</Text>
        <Text><Text style={styles.label}>Recipient:</Text> {transaction.recipientUser?.fname || '-'}</Text>
        <Text><Text style={styles.label}>Date:</Text> {new Date(transaction.createdAt).toLocaleString()}</Text>
      </View>
    </Page>
  </Document>
);

export default TransactionPDFDocument;
