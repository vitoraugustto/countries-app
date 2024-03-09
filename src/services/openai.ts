import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';

import { OPENAI_API_KEY } from '@config/api';

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const chatCompletion = (messages: ChatCompletionMessageParam[]) => {
  return openai.chat.completions.create({
    messages,
    model: 'gpt-3.5-turbo',
  });
};
