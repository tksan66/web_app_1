import subprocess

prompt = """
[INST] 
<<SYS>>あなたは数学の専門家です<</SYS>>
4*32の答えを教えてください
[/INST] 
"""
cmd = f"../llama.cpp/main -m '../llama.cpp/models/ELYZA-japanese-Llama-2-7b-instruct-q4_K_M.gguf' -n 256 -p '{prompt}' --temp 0"
result = subprocess.run(["powershell.exe", "-Command", cmd], capture_output=True, text=True)
res = result.stdout
print(res)

# if result.stderr:
#     print(result.stderr)

# # 終了コードを確認
# print(f"Exit code: {result.returncode}")