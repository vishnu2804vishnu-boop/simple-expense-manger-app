import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';

export default function App() {
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [incomeList, setIncomeList] = useState([]);
  const [expenseList, setExpenseList] = useState([]);
  const [textIncome, setTextIncome] = useState('');
  const [textExpense, setTextExpense] = useState('');

  const addIncome = () => {
    if (textIncome === '') {
      alert('Please enter income amount');
    } else {
      const amount = parseFloat(textIncome);
      setIncomeList([...incomeList, { id: Math.random().toString(), amount }]);
      setIncome(prev => prev + amount);
      setTextIncome('');
    }
  };

  const addExpense = () => {
    if (textExpense === '') {
      alert('Please enter expense amount');
    } else {
      const amount = parseFloat(textExpense);
      setExpenseList([...expenseList, { id: Math.random().toString(), amount }]);
      setExpense(prev => prev + amount);
      setTextExpense('');
    }
  };

  const balance = income - expense;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expense Manager</Text>
      
      {/* Summary Section */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Income</Text>
          <Text style={styles.incomeText}>${income.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Expense</Text>
          <Text style={styles.expenseText}>${expense.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Balance</Text>
          <Text style={[styles.balanceText, { color: balance >= 0 ? '#4CAF50' : '#F44336' }]}>
            ${balance.toFixed(2)}
          </Text>
        </View>
      </View>

      {/* Input Section */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Income"
          keyboardType="numeric"
          value={textIncome}
          onChangeText={setTextIncome}
        />
        <TouchableOpacity style={styles.incomeButton} onPress={addIncome}>
          <Text style={styles.buttonText}>Add Income</Text>
        </TouchableOpacity>
        
        <TextInput
          style={styles.input}
          placeholder="Enter Expense"
          keyboardType="numeric"
          value={textExpense}
          onChangeText={setTextExpense}
        />
        <TouchableOpacity style={styles.expenseButton} onPress={addExpense}>
          <Text style={styles.buttonText}>Add Expense</Text>
        </TouchableOpacity>
      </View>

      {/* Lists Section */}
      <View style={styles.listContainer}>
        <View style={styles.list}>
          <Text style={styles.listTitle}>Income History</Text>
          <FlatList
            data={incomeList}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View style={styles.listItem}>
                <Text style={styles.incomeText}>+${item.amount.toFixed(2)}</Text>
              </View>
            )}
          />
        </View>
        
        <View style={styles.list}>
          <Text style={styles.listTitle}>Expense History</Text>
          <FlatList
            data={expenseList}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View style={styles.listItem}>
                <Text style={styles.expenseText}>-${item.amount.toFixed(2)}</Text>
              </View>
            )}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  incomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  expenseText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F44336',
  },
  balanceText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  incomeButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  expenseButton: {
    backgroundColor: '#F44336',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  listContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  list: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  listItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});