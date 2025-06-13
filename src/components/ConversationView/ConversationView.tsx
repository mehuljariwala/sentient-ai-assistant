"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Logo } from "../Logo";
import { Message } from "../Message";
import { MessageInput } from "../MessageInput";
import { SuggestedPrompts } from "../SuggestedPrompts";
import { useAssistantStore, suggestedPrompts } from "@/store/assistant-store";
import { cn } from "@/lib/utils";
import { ConversationViewProps } from "./ConversationView.types";
import {
  WELCOME_TITLE,
  WELCOME_SUBTITLE,
  PLACEHOLDER_TEXT,
  LOGO_SIZE,
  MAX_PROMPTS_FOR_FOLLOWUP,
  MIN_MESSAGES_FOR_PROMPTS,
  ANIMATION_CONFIG,
} from "./ConversationView.data";
import { conversationViewStyles as styles } from "./ConversationView.styles";

export function ConversationView({ className }: ConversationViewProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { currentConversation, sendMessage, isLoading, createNewConversation } =
    useAssistantStore();

  // Create a new conversation if none exists
  useEffect(() => {
    if (!currentConversation) {
      createNewConversation();
    }
  }, [currentConversation, createNewConversation]);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentConversation?.messages]);

  const handleSendMessage = async (content: string) => {
    await sendMessage(content);
  };

  const handleSelectPrompt = (prompt: string) => {
    handleSendMessage(prompt);
  };

  const messages = currentConversation?.messages || [];
  const showWelcome = messages.length === 0;

  return (
    <div className={cn(styles.container, className)}>
      {showWelcome ? (
        // Welcome screen - centered content
        <div className={styles.welcomeContainer}>
          <motion.div
            initial={ANIMATION_CONFIG.initial}
            animate={ANIMATION_CONFIG.animate}
            className={styles.welcomeContent}
          >
            {/* Logo at top */}
            <Logo size={LOGO_SIZE.mobile} animate className={styles.logo} />

            {/* Welcome text - hidden on mobile, shown on desktop */}
            <div className={styles.welcomeTextContainer}>
              <h1 className={styles.welcomeTitle}>{WELCOME_TITLE}</h1>
              <p className={styles.welcomeSubtitle}>{WELCOME_SUBTITLE}</p>
            </div>

            {/* Centered input box */}
            <div className={styles.welcomeInputWrapper}>
              <MessageInput
                onSendMessage={handleSendMessage}
                disabled={isLoading}
                placeholder={PLACEHOLDER_TEXT.initial}
                className={styles.messageInput}
              />
            </div>

            {/* Suggested prompts below input */}
            <SuggestedPrompts
              prompts={suggestedPrompts}
              onSelectPrompt={handleSelectPrompt}
              className={styles.welcomePromptsWrapper}
            />
          </motion.div>
        </div>
      ) : (
        // Messages view
        <>
          <div className={styles.messagesContainer}>
            <div className={styles.messagesContent}>
              {messages.map((message, index) => (
                <Message
                  key={message.id}
                  message={message}
                  isLast={index === messages.length - 1}
                />
              ))}
              {isLoading && (
                <Message
                  message={{
                    id: "loading",
                    role: "assistant",
                    content: "",
                    timestamp: new Date(),
                    isLoading: true,
                  }}
                />
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input area for conversation */}
          <div className={styles.inputArea}>
            <div className={styles.inputContent}>
              <MessageInput
                onSendMessage={handleSendMessage}
                disabled={isLoading}
                placeholder={PLACEHOLDER_TEXT.followUp}
                className={styles.messageInput}
              />

              {/* Suggested prompts for follow-up - hidden on mobile */}
              {messages.length > 0 &&
                messages.length < MIN_MESSAGES_FOR_PROMPTS && (
                  <SuggestedPrompts
                    prompts={suggestedPrompts.slice(
                      0,
                      MAX_PROMPTS_FOR_FOLLOWUP
                    )}
                    onSelectPrompt={handleSelectPrompt}
                    className={styles.followUpPrompts}
                  />
                )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
