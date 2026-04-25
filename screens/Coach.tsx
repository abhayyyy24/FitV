import TopBar from '@/components/ui/Topbar';
import Colors from '@/constants/Colors';
import { getGeminiResponse } from '@/utlis/geminiClient';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

// Typing dots component
const TypingDots = () => {
  const [dots, setDots] = useState('');
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + '.' : ''));
    }, 500);
    return () => clearInterval(interval);
  }, []);
  return <Text>Typing{dots}</Text>;
};

export default function Coach() {
  const [messages, setMessages] = useState([
    { text: 'Hi! What can I guide you with today?', sender: 'ai' },
  ]);
  const [input, setInput] = useState('');
  const flatListRef = useRef<FlatList>(null);

  const handleSend = async () => {
    if (input.trim() === '') return;

    const newMessages = [...messages, { text: input, sender: 'user' }];
    setMessages(newMessages);
    setInput('');

    // Show typing indicator
    setMessages((prev) => [...prev, { text: 'typing', sender: 'ai', type: 'loading' }]);

    // Prompt with safety instructions
    const prompt = `
You are a Health AI Coach. Only respond to queries about fitness, wellness, hygiene, exercise, nutrition, or sleep.
If a question is outside these areas, reply:
"I'm here to help with health, wellness, and fitness-related questions only."
Answer briefly in 3–8 sentences max using bullet points and clear formatting.

User: ${input}
    `;
    const aiReply = await getGeminiResponse(prompt);

    // Simulate typing effect
    let displayedText = '';
    setMessages((prev) => [...prev.slice(0, -1), { text: '', sender: 'ai' }]);

    for (let i = 0; i < aiReply.length; i++) {
      displayedText += aiReply[i];
      await new Promise((res) => setTimeout(res, 10));
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = { text: displayedText, sender: 'ai' };
        return updated;
      });
    }
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
        {item.type === 'loading' ? (
          <Text style={styles.messageText}>
            <TypingDots />
          </Text>
        ) : (
          <Text style={[styles.messageText, item.sender === 'user' && { color: 'white' }]}>
            {item.text}
          </Text>
        )}
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
            ref={flatListRef}
            data={messages}
            renderItem={renderMessage}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.chatcontainer}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            style={{ flex: 1 }}
            onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
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
    paddingTop: 50,
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
    borderRadius: 20,
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
    backgroundColor: Colors.surface,
  },
});
