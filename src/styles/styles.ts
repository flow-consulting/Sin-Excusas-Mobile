// src/styles/styles.ts
import { StyleSheet } from 'react-native';

export const customButtonStyles = StyleSheet.create({
  button: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: 'bold',
  },
});

export const customViewStyles = StyleSheet.create({
  view: {
    flex: 1,
  },
});

export const customTextStyles = StyleSheet.create({
  text: {
    fontSize: 16,
  },
});

export const customInputStyles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginVertical: 8,
  },
});

export const customSwitchStyles = StyleSheet.create({
  // Define your custom styles for the CustomSwitch component here
});

export const customFlatListStyles = StyleSheet.create({
  item: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
  },
});

export const customActivityIndicatorStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const customDeleteButtonStyles = StyleSheet.create({
  button: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
