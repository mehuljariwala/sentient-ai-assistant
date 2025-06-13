"use client";

import { Sidebar } from "@/components/Sidebar";
import { ConversationView } from "@/components/ConversationView";
import { MobileHeader } from "@/components/MobileHeader";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { useAssistantStore } from "@/store/assistant-store";
import { HomePageProps } from "./Home.types";
import { homePageStyles } from "./Home.styles";

export function HomePage({ className }: HomePageProps) {
  const { createNewConversation } = useAssistantStore();

  return (
    <div className={homePageStyles.container}>
      {/* Mobile Header - only visible on mobile */}
      <MobileHeader onNewChat={createNewConversation} />

      {/* Desktop Sidebar - hidden on mobile */}
      <div className={homePageStyles.sidebarWrapper}>
        <Sidebar />
      </div>

      {/* Main content area */}
      <main className={homePageStyles.mainContent}>
        <ConversationView className={homePageStyles.conversationView} />
      </main>

      {/* Mobile Bottom Navigation - only visible on mobile */}
      <MobileBottomNav />
    </div>
  );
}

export default HomePage;
