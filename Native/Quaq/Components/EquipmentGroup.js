import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

const EquipmentGroup = ({ title, onEditComplete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const handleLongPress = () => {
    setIsEditing(true);
  };

  const handleSubmitEditing = () => {
    setIsEditing(false);
    onEditComplete(newTitle); // Pass the new title back to the parent component
  };

  return (
    <TouchableOpacity onLongPress={handleLongPress} style={styles.box}>
      {isEditing ? (
        <TextInput
          style={styles.textInput}
          value={newTitle}
          onChangeText={setNewTitle}
          onSubmitEditing={handleSubmitEditing}
          autoFocus={true} // Automatically focus on the TextInput
          returnKeyType="done"
          keyboardAppearance="dark"
        />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  box: {
    width: 130,
    height: 90,
    borderRadius: 18,
    borderWidth: 4,
    borderColor: "#D9AC6E",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  text: {
    color: "#fff",
    fontSize: 24,
    fontFamily: "Segoe UI",
  },
  textInput: {
    color: "#fff",
    fontSize: 24,
    fontFamily: "Segoe UI",
    textAlign: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#D9AC6E",
    width: "100%",
  },
});

export default EquipmentGroup;
