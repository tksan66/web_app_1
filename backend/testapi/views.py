from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .models import RandomString
from .serializers import RandomStringSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
import re

class RandomStringViewSet(viewsets.ModelViewSet):
    queryset = RandomString.objects.all()
    serializer_class = RandomStringSerializer

class AddTestView(APIView):
    def post(self, request):
        input_string = request.data.get('message', '')
        # ここにLLMの応答を生成するコードを書けばよい！
        import subprocess

        prompt = """
        [INST] 
        <<SYS>>ユーザーと会話しましょう。ユーザからの問いかけが後に続きます<</SYS>>
        $
        [/INST] 
        """
        prompt = prompt.replace("$",input_string)
        cmd = f"../llama.cpp/main -m '../llama.cpp/models/ELYZA-japanese-Llama-2-7b-instruct-q4_K_M.gguf' -n 256 -p '{prompt}' --temp 0"
        result = subprocess.run(["powershell.exe", "-Command", cmd], capture_output=True, text=True)
        res = result.stdout
        print(res)

        match = re.search(r'\[/INST\]',res)
        res_trim = res[match.end():-4]
        
        return Response({"message": res_trim})