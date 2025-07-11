import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import TopBar from '@/components/ui/Topbar';

export default function Coach() {
  const [messages, setMessages] = useState([
    { text: 'Hello! How can I assist you today?', sender: 'ai' },
    { text: 'How many calories did I burn yesterday?', sender: 'user' },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() === '') return;
    const newMessages = [...messages, { text: input, sender: 'user' }];
    setMessages(newMessages);
    setInput('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: 'You burned 245 kcal yesterday.', sender: 'ai' },
      ]);
    }, 1000);
  };

  const renderMessage = ({ item }: any) => {
    const isUser = item.sender === 'user';
    return (
      <View
        style={[
          styles.messageBubble,
          isUser ? styles.userBubble : styles.aiBubble,
        ]}
      >
        <Text style={[styles.messageText,item.sender==='user' && {color:'white'}]}>{item.text}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        >
          <TopBar title="Coach" />

          <View style={styles.headerrow}>
            <Ionicons name="sparkles" size={20} color={Colors.primary} />
            <Text style={styles.pagetitle}>AI Coach</Text>
          </View>

          <FlatList
            data={messages}
            renderItem={renderMessage}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.chatcontainer}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            style={{ flex: 1 }}
          />

          <View style={styles.inputcontainer}>
            <TextInput
              placeholder="Ask AI Coach"
              value={input}
              onChangeText={setInput}
              style={styles.textinput}
              placeholderTextColor="#888"
            />
            <TouchableOpacity onPress={handleSend}>
              <Ionicons name="send" size={24} color={Colors.primary} />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop:50,
  },
  headerrow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  pagetitle: {
    fontSize: 20,
    fontFamily: 'Bold',
  },
  chatcontainer: {
    paddingVertical: 10,
    paddingBottom: 10,
    flexGrow: 1,
  },
  messageBubble: {
    maxWidth: '75%',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  aiBubble: {
    backgroundColor: Colors.surface,
    alignSelf: 'flex-start',
    borderTopLeftRadius: 0,
  },
  userBubble: {
    backgroundColor: Colors.primary,
    alignSelf: 'flex-end',
    borderTopRightRadius: 0,
    
  },
  messageText: {
    fontSize: 14,
    fontFamily: 'Medium',
  },
  inputcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 50,
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === 'ios' ? 14 : 10,
    marginBottom: Platform.OS === 'ios' ? 10 : 10,
  },
  textinput: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Medium',
    color: Colors.textPrimary,
    backgroundColor:Colors.surface
  },
});
