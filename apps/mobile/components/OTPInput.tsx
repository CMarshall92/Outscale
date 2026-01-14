import React, { useRef } from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";

interface OTPInputProps {
  code: string;
  setCode: (code: string) => void;
  length?: number;
}

export default function OTPInput({ code, setCode, length = 6 }: OTPInputProps) {
  const inputRef = useRef<TextInput>(null);

  const handlePress = () => {
    inputRef.current?.focus();
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.inputsContainer} onPress={handlePress}>
        {Array.from({ length }).map((_, index) => {
          const char = code[index] || "";
          const isFocused = code.length === index;

          return (
            <View
              key={index}
              style={[
                styles.box,
                isFocused && code.length < length && styles.boxFocused,
                char ? styles.boxFilled : null,
              ]}
            >
              <Text style={styles.text}>{char}</Text>
            </View>
          );
        })}
      </Pressable>

      <TextInput
        ref={inputRef}
        value={code}
        onChangeText={(text) => {
          const cleaned = text.replace(/[^0-9]/g, "").slice(0, length);
          setCode(cleaned);
        }}
        keyboardType="number-pad"
        style={styles.hiddenInput}
        maxLength={length}
        caretHidden
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    marginVertical: 10,
  },
  inputsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    width: "100%",
  },
  box: {
    width: 45,
    height: 55,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#404040",
    backgroundColor: "#2a2a2a",
    alignItems: "center",
    justifyContent: "center",
  },
  boxFocused: {
    borderColor: "#ffffff",
    backgroundColor: "#333333",
    borderWidth: 1.5,
  },
  boxFilled: {
    borderColor: "#6b7280",
    backgroundColor: "#2a2a2a",
  },
  text: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "600",
  },
  hiddenInput: {
    position: "absolute",
    opacity: 0,
    width: 1,
    height: 1,
    bottom: 0,
  },
});
