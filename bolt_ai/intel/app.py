from huggingface_hub import InferenceClient
from transcript import getTranscript
# import gradio as gr

client = InferenceClient(
    "mistralai/Mistral-7B-Instruct-v0.1"
)


def format_prompt(message, history):
  prompt = "<s>"
  for user_prompt, bot_response in history:
    prompt += f"[INST] {user_prompt} [/INST]"
    prompt += f" {bot_response}</s> "
  prompt += f"[INST] {message} [/INST]"
  return prompt

def generate(
    prompt, history, temperature=0.9, max_new_tokens=256, top_p=0.95, repetition_penalty=1.0,
):
    temperature = float(temperature)
    if temperature < 1e-2:
        temperature = 1e-2
    top_p = float(top_p)

    generate_kwargs = dict(
        temperature=temperature,
        max_new_tokens=max_new_tokens,
        top_p=top_p,
        repetition_penalty=repetition_penalty,
        do_sample=True,
        seed=42,
    )

    formatted_prompt = format_prompt(prompt, history)

    stream = client.text_generation(formatted_prompt, **generate_kwargs, stream=True, details=True, return_full_text=False)
    output = ""

    for response in stream:
        output += response.token.text
        yield output
    return output

# with gr.Blocks() as demo:
#     gr.HTML("<h1><center>BRAINIAC AI</h1>")
#     gr.HTML("<h3><center>Hey!! How can I help you</center></h3>")
#     gr.ChatInterface(
#         generate
#     )

# demo.queue().launch(debug=True)


def summaryBot(link : str):
    video_id = link[30:41]
    transcript = "mention the subtopics in this transcript in pointers" + getTranscript(video_id)
    op = generate((transcript),"")
    finalop = ''
    for i in op:
        finalop = i
    return [transcript, finalop[0:-4]]

def chatBot(prompt, history):
    op = generate(prompt, history)
    for i in op:
        finalop = i
    return finalop[0:-4]
   

op = generate("What's yellow", [("What's the colour of a banana", "Yellow")])
finalop = ''
for i in op:
    finalop = i
print(finalop[0:-4])