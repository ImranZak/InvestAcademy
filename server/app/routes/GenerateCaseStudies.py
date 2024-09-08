from flask import Blueprint, jsonify
from transformers import GPT2LMHeadModel, GPT2Tokenizer, BertForMultipleChoice, BertTokenizer
import torch

# Load GPT-2 model and tokenizer
gpt2_model = GPT2LMHeadModel.from_pretrained('gpt2')
gpt2_tokenizer = GPT2Tokenizer.from_pretrained('gpt2')

# Load BERT model and tokenizer for multiple-choice
bert_model = BertForMultipleChoice.from_pretrained('bert-base-uncased')
bert_tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')

generatecasestudy_bp = Blueprint('generatecasestudy_bp', __name__)

@generatecasestudy_bp.route('/case-study', methods=['GET'])
def generate_case_study(prompt):
	inputs = gpt2_tokenizer.encode(prompt, return_tensors='pt')
	outputs = gpt2_model.generate(inputs, max_length=500, num_return_sequences=1)
	case_study = gpt2_tokenizer.decode(outputs[0], skip_special_tokens=True)
	return jsonify(case_study)

@generatecasestudy_bp.route('/mark', methods=['GET'])
def evaluate_decision(case_study, question, choices):
	inputs = bert_tokenizer([case_study] * len(choices), choices, return_tensors='pt', padding=True)
	outputs = bert_model(**inputs)
	logits = outputs.logits
	predicted_choice = torch.argmax(logits, dim=1).item()
	return jsonify(predicted_choice)

# Example usage
prompt = "Generate a case study about a fictional company's performance, background, future developments, public opinion, and relevant details for investment decision."
case_study = generate_case_study(prompt)
print("Case Study:\n", case_study)

question = "Based on the case study, should you invest in this company?"
choices = ["Yes, you should invest.", "No, you should not invest."]
predicted_choice = evaluate_decision(case_study, question, choices)
print("Model's Recommendation:", choices[predicted_choice])