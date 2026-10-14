/**
 * Starts a durable chat workflow and streams its output. The run ID is
 * returned in `x-workflow-run-id` so `WorkflowChatTransport` can reconnect via
 * `/api/chat/[id]/stream`.
 */
import { createModelCallToUIChunkTransform } from "@ai-sdk/workflow";
import { createUIMessageStreamResponse, type UIMessage } from "ai";
import { start } from "workflow/api";
import { chatWorkflow } from "@/lib/workflows/chat";

export const POST = async (req: Request) => {
  const { messages }: { messages: UIMessage[] } = await req.json();
  const run = await start(chatWorkflow, [messages]);
  return createUIMessageStreamResponse({
    stream: run.readable.pipeThrough(createModelCallToUIChunkTransform()),
    headers: { "x-workflow-run-id": run.runId },
  });
};
