import { WorkflowAgent, type ModelCallStreamPart } from "@ai-sdk/workflow";
import { convertToModelMessages, type UIMessage } from "ai";
import { getWritable } from "workflow";
import {
  SHOPPING_INSTRUCTIONS,
  SHOPPING_MODEL,
  shoppingTools,
} from "@/lib/agent";

export async function chatWorkflow(messages: UIMessage[]) {
  "use workflow";

  const writable = getWritable<ModelCallStreamPart>();

  const agent = new WorkflowAgent({
    model: SHOPPING_MODEL,
    instructions: SHOPPING_INSTRUCTIONS,
    tools: shoppingTools,
  });

  const modelMessages = await convertToModelMessages(messages);

  await agent.stream({ messages: modelMessages, writable });
}
