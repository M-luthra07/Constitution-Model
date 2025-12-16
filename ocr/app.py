import gradio as gr
import google.generativeai as genai
import os
from PIL import Image
import json
import re

# Load the Gemini API key from the .env file
try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY not found in .env file or environment variables")

genai.configure(api_key=GEMINI_API_KEY)

# Initialize the Gemini models
vision_model = genai.GenerativeModel('models/gemini-2.5-flash-image-preview')
text_model = genai.GenerativeModel('models/gemini-2.5-pro')

def identify_fields_and_get_suggestions(image):
    """
    Identifies the fields in a form image and gets suggestions for each field.

    Args:
        image (PIL.Image.Image): The image of the form.

    Yields:
        tuple: A tuple of gradio updates.
    """
    # Disable button, show loader, hide suggestions
    yield gr.update(interactive=False), gr.update(visible=True), gr.update(visible=False), *[gr.update(visible=False)] * 20

    print("\n'Get Suggestions' button clicked.")
    if image is None:
        print("No image provided.")
        # Re-enable button, hide loader
        yield gr.update(interactive=True), gr.update(visible=False), gr.update(visible=False), *[gr.update(visible=False)] * 20
        return

    # Prepare the prompt for the Gemini API to identify fields
    prompt = "Analyze the provided image of a form and identify all the distinct fields a user would need to fill out. Return only a comma-separated list of the field names. For example: Name, Address, Phone Number"

    # Call the Gemini API to identify fields
    try:
        print("Calling Gemini API to identify fields...")
        response = vision_model.generate_content([prompt, image])
        print("Gemini API response received.")

        # Process the response
        if response.parts:
            identified_fields = response.text
            print(f"Identified fields: {identified_fields}")
            field_list = [field.strip() for field in identified_fields.split(',')]
            
            # Get suggestions for all fields in one prompt
            print("Calling Gemini API to get all suggestions...")
            prompt_for_suggestions = "I have a form with the following fields: " + ", ".join(field_list) + ". Please provide a brief suggestion for how to fill out each field. Return the result as a JSON object where the keys are the field names and the values are the suggestions."
            response = text_model.generate_content(prompt_for_suggestions)
            print("Gemini API response for suggestions received.")

            suggestions = []
            if response.parts:
                response_text = response.text
                # Extract JSON from the response
                json_match = re.search(r"```json\n(.*)\n```", response_text, re.DOTALL)
                if json_match:
                    suggestions_json = json_match.group(1)
                else:
                    suggestions_json = response_text

                try:
                    suggestions_dict = json.loads(suggestions_json)
                    for field in field_list:
                        if field in suggestions_dict:
                            suggestions.append((field, suggestions_dict[field]))

                except json.JSONDecodeError:
                    print("Error: Could not decode JSON from the response.")
                    suggestions = []
            
            print(f"Suggestions received: {suggestions}")

            # Create update dictionaries for the textboxes
            updates = []
            for i in range(20): # Assuming a max of 20 fields
                if i < len(suggestions):
                    field, suggestion = suggestions[i]
                    updates.append(gr.update(label=field, value=suggestion, visible=True))
                else:
                    updates.append(gr.update(visible=False))

            print("UI updated with suggestions.")
            # Re-enable button, hide loader, and show suggestions
            yield gr.update(interactive=True), gr.update(visible=False), gr.update(visible=True), *updates
        else:
            print("No fields identified in the image.")
            # Re-enable button, hide loader
            yield gr.update(interactive=True), gr.update(visible=False), gr.update(visible=False), *[gr.update(visible=False)] * 20

    except Exception as e:
        print(f"An error occurred: {e}")
        # Re-enable button, hide loader
        yield gr.update(interactive=True), gr.update(visible=False), gr.update(visible=False), *[gr.update(visible=False)] * 20

# Create the Gradio interface
with gr.Blocks() as demo:
    gr.Markdown("# AI Form Assistant")
    gr.Markdown("Upload an image of a form to identify the fields and get suggestions on how to fill them.")

    with gr.Row():
        image_input = gr.Image(type="pil", label="Form Image")
        with gr.Column():
            extract_button = gr.Button("Get Suggestions")

    loader = gr.HTML("""
<div style="text-align: center;">
  <div style="display: inline-block; border: 4px solid #f3f3f3; border-top: 4px solid #3498db; border-radius: 50%; width: 40px; height: 40px; animation: spin 2s linear infinite;"></div>
  <p>Loading...</p>
</div>

<style>
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
""", visible=False)

    with gr.Column(visible=False) as suggestions_section:
        gr.Markdown("### Field Suggestions")
        
        # Create a number of textboxes that can be dynamically shown
        textboxes = []
        for i in range(20): # Assuming a max of 20 fields
            textboxes.append(gr.Textbox(visible=False, label=f"Field {i+1}", interactive=False))

    extract_button.click(
        fn=identify_fields_and_get_suggestions,
        inputs=[image_input],
        outputs=[extract_button, loader, suggestions_section] + textboxes
    )

if __name__ == "__main__":
    demo.launch()