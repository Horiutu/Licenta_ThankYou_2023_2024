import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';

const Menu = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const menuOptions = ['Option 1', 'Option 2', 'Option 3']; // Your menu options

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleMenu}>
        <Text>Show Menu</Text>
      </TouchableOpacity>
      <Modal
        visible={isMenuVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={toggleMenu}
      >
        <View style={styles.modalContainer}>
          <View style={styles.menu}>
            {menuOptions.map((option, index) => (
              <TouchableOpacity key={index} style={styles.option} onPress={toggleMenu}>
                <Text>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  menu: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    elevation: 5,
  },
  option: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default Menu;
