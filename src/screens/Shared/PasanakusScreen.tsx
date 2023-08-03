// src/screens/Shared/PasanakusScreen.tsx
import {Picker} from '@react-native-picker/picker';
import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const PasanakusScreen = () => {
  const [cardType, setCardType] = useState('visa');
  const [focusedField, setFocusedField] = useState(null);

  return (
    <ScrollView>
      <View style={styles.formContainer}>
        <View style={styles.pickerContainer}>
          <Text>Checkout</Text>
          <Picker
            selectedValue={cardType}
            onValueChange={itemValue => setCardType(itemValue)}>
            <Picker.Item label="Visa" value="visa" />
            <Picker.Item label="Mastercard" value="mastercard" />
          </Picker>
        </View>
        <Text>Full name</Text>
        <TextInput
          style={[
            styles.input,
            focusedField === 'fullName'
              ? styles.focusedInput
              : styles.unfocusedInput,
          ]}
          onFocus={() => setFocusedField('fullName')}
          onBlur={() => setFocusedField(null)}
        />
        <Text>Credit card number</Text>
        <TextInput
          style={[
            styles.input,
            focusedField === 'cardNumber'
              ? styles.focusedInput
              : styles.unfocusedInput,
          ]}
          onFocus={() => setFocusedField('cardNumber')}
          onBlur={() => setFocusedField(null)}
        />
        <Text>Full name on card</Text>
        <TextInput
          style={[
            styles.input,
            focusedField === 'nameOnCard'
              ? styles.focusedInput
              : styles.unfocusedInput,
          ]}
          onFocus={() => setFocusedField('nameOnCard')}
          onBlur={() => setFocusedField(null)}
        />
        <View style={styles.rowContainer}>
          <View style={{flex: 1}}>
            <Text>Expiration date</Text>
            <View style={{flexDirection: 'row'}}>
              <TextInput
                placeholder="MM"
                style={[
                  styles.input,
                  {
                    flex: 1,
                    marginHorizontal: 5,
                    borderBottomColor:
                      focusedField === 'expMonth' ? 'blue' : 'grey',
                  },
                ]}
                onFocus={() => setFocusedField('expMonth')}
                onBlur={() => setFocusedField(null)}
              />
              <TextInput
                placeholder="YY"
                style={[
                  styles.input,
                  styles.expYearInput,
                  {
                    borderBottomColor:
                      focusedField === 'expYear' ? 'blue' : 'grey',
                  },
                ]}
                onFocus={() => setFocusedField('expYear')}
                onBlur={() => setFocusedField(null)}
              />
            </View>
          </View>
          <View style={styles.flexOneContainer}>
            <Text>CVV code</Text>
            <TextInput
              placeholder="CVV"
              style={[
                styles.input,
                focusedField === 'cvv'
                  ? styles.focusedInput
                  : styles.unfocusedInput,
              ]}
              onFocus={() => setFocusedField('cvv')}
              onBlur={() => setFocusedField(null)}
            />
          </View>
        </View>
      </View>
      <View style={styles.buyNowButtonContainer}>
        <TouchableOpacity style={styles.buyNowButton}>
          <Text style={styles.buyNowButtonText}>Buy now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    paddingVertical: 2,
    marginVertical: 10,
  },
  focusedInput: {
    borderBottomColor: 'blue',
  },
  unfocusedInput: {
    borderBottomColor: 'grey',
  },
  pickerContainer: {
    marginHorizontal: 20,
  },
  buyNowButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buyNowButtonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
  },
  formContainer: {
    flex: 1,
    marginBottom: 60,
  },
  rowContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  flexOneContainer: {
    flex: 1,
  },
  expMonthInput: {
    flex: 1,
    marginHorizontal: 5,
  },
  expYearInput: {
    flex: 1,
    marginHorizontal: 5,
  },
  buyNowButtonText: {
    color: 'white',
  },
});

export default PasanakusScreen;
