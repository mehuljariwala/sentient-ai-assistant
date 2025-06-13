import { create } from "zustand";
import { Message, Conversation, SuggestedPrompt } from "@/types/assistant";

interface AssistantStore {
  conversations: Conversation[];
  currentConversation: Conversation | null;
  isLoading: boolean;

  // Actions
  createNewConversation: () => void;
  setCurrentConversation: (conversation: Conversation | null) => void;
  sendMessage: (content: string) => Promise<void>;
  deleteConversation: (id: string) => void;
  clearAllConversations: () => void;
}

// Mock AI response generator
const generateAIResponse = async (userMessage: string): Promise<string> => {
  // Simulate API delay
  await new Promise((resolve) =>
    setTimeout(resolve, 1000 + Math.random() * 2000)
  );

  // Mock responses based on keywords
  const lowerMessage = userMessage.toLowerCase();

  if (lowerMessage.includes("sentient")) {
    return `Sentient refers to the ability to experience feelings or sensations. It means being capable of sensing or feeling, conscious of or responsive to the sensations of seeing, hearing, feeling, tasting, or smelling.

Key Points:
• Sentient beings are able to feel things or sense them.
• The term is often used in phrases like "sentient beings" and "sentient creatures," emphasizing that things that don't have life don't have feelings.
• Sentient is a formal adjective that can be used in different contexts and languages.
• The word has its roots in Latin, with the earliest known use dating back to the early 1600s.

Examples and Usage:
• Man is a sentient being.
• There was no sign of any sentient life or activity.
• Sentient is used nouns like "being" to describe entities that possess consciousness or the ability to feel.

Related Concepts:
• Sentience is an important concept in ethics, particularly in utilitarianism, as it forms a basis for determining which entities deserve moral consideration.
• In Asian religions, the word "sentience" has been used to translate various concepts.
• In science fiction, the word "sentience" is often used to describe the ability of artificial intelligence or other non-human entities to experience consciousness or emotions.`;
  }

  if (lowerMessage.includes("meaning of life")) {
    return `The meaning of life is one of the most profound philosophical questions that has been contemplated throughout human history. Different philosophical, religious, and cultural traditions offer various perspectives:

**Philosophical Perspectives:**
• Existentialism suggests we create our own meaning through our choices and actions
• Nihilism argues that life has no inherent meaning
• Absurdism acknowledges life's lack of meaning while encouraging us to live fully anyway

**Religious Views:**
• Many religions propose serving a divine purpose or achieving spiritual enlightenment
• Buddhism focuses on ending suffering through the Eightfold Path
• Christianity often emphasizes love, service, and preparing for an afterlife

**Scientific Approach:**
• From a biological standpoint, life's "purpose" might be survival and reproduction
• Evolution suggests we're here due to natural selection, not predetermined purpose

**Personal Meaning:**
Many find meaning through:
• Relationships and love
• Personal growth and self-actualization
• Contributing to something larger than themselves
• Creative expression
• Helping others

Ultimately, the meaning of life might be deeply personal - what gives your life meaning may differ from what gives meaning to others.`;
  }

  if (lowerMessage.includes("love")) {
    return `Love is a complex and multifaceted emotion that has been explored by poets, philosophers, scientists, and artists throughout history. Here's a comprehensive look at love:

**Types of Love:**
• Romantic Love - Passionate attraction and emotional connection between partners
• Familial Love - Deep bonds between family members
• Platonic Love - Non-romantic affection between friends
• Self-Love - Acceptance and care for oneself
• Universal Love - Compassion for all beings

**Scientific Perspective:**
• Love involves complex brain chemistry including dopamine, oxytocin, and serotonin
• Attachment theory explains how early relationships shape our capacity for love
• Evolutionary psychology suggests love evolved to promote pair bonding and child-rearing

**Philosophical Views:**
• Plato described love as a desire for beauty and wisdom
• Aristotle distinguished between different types of love based on utility, pleasure, and virtue
• Modern philosophers explore love's role in ethics and human flourishing

**Cultural Expressions:**
Love is expressed differently across cultures through:
• Language (some languages have multiple words for different types of love)
• Customs and rituals
• Art, music, and literature

Love remains one of the most powerful forces in human experience, driving both great joy and deep sorrow, inspiring countless works of art, and forming the foundation of many of our most meaningful relationships.`;
  }

  if (
    lowerMessage.includes("ai") ||
    lowerMessage.includes("artificial intelligence")
  ) {
    return `Artificial Intelligence (AI) refers to the simulation of human intelligence in machines that are programmed to think and learn like humans. Here's an overview:

**Definition:**
AI is the capability of machines to imitate intelligent human behavior, including learning, reasoning, problem-solving, perception, and language understanding.

**Types of AI:**
• Narrow AI - Designed for specific tasks (current AI systems)
• General AI - Hypothetical AI with human-like general intelligence
• Super AI - Theoretical AI surpassing human intelligence

**Current Applications:**
• Natural Language Processing (chatbots, translation)
• Computer Vision (facial recognition, medical imaging)
• Machine Learning (recommendations, predictions)
• Robotics (automation, autonomous vehicles)

**Key Technologies:**
• Machine Learning - Systems that improve through experience
• Deep Learning - Neural networks with multiple layers
• Natural Language Processing - Understanding human language
• Computer Vision - Interpreting visual information

**Ethical Considerations:**
• Job displacement and economic impact
• Privacy and surveillance concerns
• Bias in AI systems
• Autonomous weapons
• The question of AI consciousness

AI continues to evolve rapidly, transforming industries and raising important questions about the future of human-machine interaction.`;
  }

  // Default response
  return `That's an interesting question! While I can provide information on many topics, I'm particularly knowledgeable about concepts like sentience, consciousness, philosophy, and technology. 

Feel free to ask me about:
• The nature of consciousness and sentience
• Philosophical questions about life, meaning, and existence
• Technology and artificial intelligence
• Science and how the world works
• Or any other topic you're curious about!

What would you like to explore?`;
};

export const useAssistantStore = create<AssistantStore>((set, get) => ({
  conversations: [],
  currentConversation: null,
  isLoading: false,

  createNewConversation: () => {
    const newConversation: Conversation = {
      id: Date.now().toString(),
      title: "New Conversation",
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    set((state) => ({
      conversations: [newConversation, ...state.conversations],
      currentConversation: newConversation,
    }));
  },

  setCurrentConversation: (conversation) => {
    set({ currentConversation: conversation });
  },

  sendMessage: async (content) => {
    const { currentConversation } = get();
    if (!currentConversation) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date(),
    };

    // Add user message
    set((state) => ({
      currentConversation: state.currentConversation
        ? {
            ...state.currentConversation,
            messages: [...state.currentConversation.messages, userMessage],
            updatedAt: new Date(),
            title:
              state.currentConversation.messages.length === 0
                ? content.slice(0, 50)
                : state.currentConversation.title,
          }
        : null,
      conversations: state.conversations.map((conv) =>
        conv.id === state.currentConversation?.id
          ? {
              ...conv,
              messages: [...conv.messages, userMessage],
              updatedAt: new Date(),
              title:
                conv.messages.length === 0 ? content.slice(0, 50) : conv.title,
            }
          : conv
      ),
      isLoading: true,
    }));

    try {
      // Generate AI response
      const aiResponse = await generateAIResponse(content);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: aiResponse,
        timestamp: new Date(),
      };

      // Add assistant message
      set((state) => ({
        currentConversation: state.currentConversation
          ? {
              ...state.currentConversation,
              messages: [
                ...state.currentConversation.messages,
                assistantMessage,
              ],
              updatedAt: new Date(),
            }
          : null,
        conversations: state.conversations.map((conv) =>
          conv.id === state.currentConversation?.id
            ? {
                ...conv,
                messages: [...conv.messages, assistantMessage],
                updatedAt: new Date(),
              }
            : conv
        ),
        isLoading: false,
      }));
    } catch (error) {
      console.error("Error generating response:", error);
      set({ isLoading: false });
    }
  },

  deleteConversation: (id) => {
    set((state) => ({
      conversations: state.conversations.filter((conv) => conv.id !== id),
      currentConversation:
        state.currentConversation?.id === id ? null : state.currentConversation,
    }));
  },

  clearAllConversations: () => {
    set({
      conversations: [],
      currentConversation: null,
    });
  },
}));

// Suggested prompts
export const suggestedPrompts: SuggestedPrompt[] = [
  { id: "1", text: "What's the meaning of life?" },
  { id: "2", text: "How do you define love?" },
  { id: "3", text: "What's the meaning of AI?" },
  { id: "4", text: "What is Sentient?" },
];
