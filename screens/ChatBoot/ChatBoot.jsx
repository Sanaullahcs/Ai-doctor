import { Alert, Button, Linking } from "react-native";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import styles from "./ChatBoot.style";
import * as Icon from "react-native-feather";
import LottieView from "lottie-react-native";
import { apiKey, systemContent } from "../../constants/chatBoot";
import { blackColor, grayColor, lightColor, lightGrayColor } from "../../style";

const ChatBoot = () => {
  const [userMessage, setUserMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const scrollViewRef = useRef();
  const [conversationActive, setConversationActive] = useState(true);
  // start snackbar
  const [loading, setLoading] = useState(false);

  // end snackbar

  const animation = useRef(null);

  useEffect(() => {
    scrollViewRef.current.scrollToEnd({ animated: true });
  }, [messages]);
  const messageSent = [
    {
      role: "system",
      content: systemContent,
    },
    { role: "user", content: userMessage },
  ];
  const fetchAIResponse = async () => {
    if (userMessage.trim() === "") return;

    setLoading(true);
    try {
      const result = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
          "OpenAI-Beta": "assistants=v1",
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: messageSent,
          max_tokens: 150,
        }),
      });

      const data = await result.json();
      if (data && data.choices && data.choices[0] && data.choices[0].message) {
        const newMessage = {
          text: data.choices[0].message.content,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          type: "bot",
        };

        setMessages((prevMessages) => [...prevMessages, newMessage]);
      } else {
        throw new Error("API request failed " + data.error.code);
      }
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Error",
        "Unable to chat with AI at the moment. Please try again later."
      );
      setConversationActive(false);
    } finally {
      setLoading(false);
      setUserMessage("");
    }
  };

  // Use the fetchAIResponse function to send messages when the button is pressed
  const sendMessage = () => {
    if (!conversationActive) return; // Prevent sending messages if conversation is not active
    fetchAIResponse();
  };
  const getVerticalOffset = () => {
    const { height } = Dimensions.get("window");
    return height >= 812 ? 95 : 45; // iPhone X and above have a height of 812 or more
  };
  console.log(apiKey + "open ai api");
  return (
    <View style={{ flex: 1, backgroundColor: blackColor }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : ""}
        keyboardVerticalOffset={Platform.OS === "ios" ? getVerticalOffset() : 0}
        style={{ flex: 1, flexDirection: "column-reverse", marginBottom: 10 }}
      >
        {/* start input field to send message------------------ */}
        <View
          style={[
            styles.messageChatInput,
            { opacity: conversationActive ? 1 : 0.5 },
          ]}
        >
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Message"
              style={{ marginLeft: 8, flex: 1, padding: 7, color: lightColor }}
              placeholderTextColor={lightColor}
              value={userMessage}
              onChangeText={(text) => setUserMessage(text)}
              onSubmitEditing={sendMessage}
            />

            <View style={styles.sendButtonAndLine}>
              <TouchableOpacity>
                <Icon.Mic
                  height="25"
                  width="25"
                  color={lightGrayColor}
                  style={{ marginRight: 2 }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            style={styles.sendButtonBg}
            onPress={sendMessage}
            // disabled={!conversationActive}
          >
            <Icon.ArrowRight color={lightGrayColor} />
          </TouchableOpacity>
        </View>
        {/* end input field to send message------------------ */}

        <ScrollView
          onContentSizeChange={() => {
            scrollViewRef.current.scrollToEnd({ animated: true });
          }}
          ref={scrollViewRef}
        >
          {messages.map((message, index) => {
            return (
              <View className=" " key={index}>
                {message.userMessage && (
                  <View key={index} style={styles.userMessageContainer}>
                    <View style={styles.userMessageBg}>
                      <Text
                        style={[
                          styles.messageText,
                          Platform.OS === "ios" && {
                            overflow: "hidden",
                            borderRadius: 20,
                          },
                        ]}
                        className="bg-[#1C81CB]"
                      >
                        {message.userMessage}
                      </Text>
                      <Text
                        style={styles.messageTime}
                        className="text-right m-2 mr-4"
                      >
                        {message.time}
                      </Text>
                    </View>
                  </View>
                )}

                {message.text && (
                  <View style={styles.chatBootMessageContainer}>
                    {/* start user message */}
                    <View style={styles.chatBootMessageBg}>
                      <Text
                        style={[
                          styles.messageText,
                          Platform.OS === "ios" && {
                            overflow: "hidden",
                            borderRadius: 20,
                          },
                        ]}
                        className="bg-[#3D3B3B]"
                      >
                        {message.text}
                      </Text>
                      <Text
                        style={styles.messageTime}
                        className="text-left m-2 ml-5"
                      >
                        {message.time}
                      </Text>
                    </View>
                    {/* end user message */}
                  </View>
                )}
              </View>
            );
          })}

          {loading && (
            <View style={styles.animationContainer}>
              <LottieView
                autoPlay
                ref={animation}
                style={{
                  width: 55,
                  height: 55,
                }}
                source={require("../../assets/Animations/Waiting.json")}
              />
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ChatBoot;
