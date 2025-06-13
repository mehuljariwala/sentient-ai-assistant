import { Message as MessageType } from "@/types/assistant";

export interface MessageProps {
  message: MessageType;
  isLast?: boolean;
}
