import requests
import base64
from datetime import datetime

# Defina a URL do repositório e o arquivo a ser enviado
repo_url = "https://api.github.com/repos/viniciuszile/Jogos/contents/jogos.xlsx"  # Caminho correto para o arquivo jogos.xlsx
file_path = "jogos.xlsx"  # Certifique-se de que este arquivo existe

# Verifique se o arquivo existe localmente
try:
    with open(file_path, "rb") as file:
        file_content = file.read()
except FileNotFoundError:
    print(f"Erro: O arquivo '{file_path}' não foi encontrado.")
    exit()

# Converta o conteúdo do arquivo para base64
file_content_encoded = base64.b64encode(file_content).decode()

# Defina o cabeçalho com o token de autenticação
headers = {
    "Authorization": "token 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",  # Substitua pelo seu token
    "Content-Type": "application/json"
}

# Obtenha a data e hora atual para a mensagem de commit
commit_message = f"Atualizando o arquivo jogos.xlsx com novas informações em {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}"

# Primeiro, verifique se o arquivo já existe no repositório
response = requests.get(repo_url, headers=headers)

# Caso o arquivo já exista, obtenha o SHA para enviar na atualização
if response.status_code == 200:
    sha = response.json()["sha"]
    print(f"Arquivo encontrado. SHA: {sha}")
elif response.status_code == 404:
    print("Arquivo não encontrado. Criando novo arquivo...")
    sha = None
else:
    print(f"Erro ao verificar o arquivo: {response.status_code} - {response.text}")
    exit()

# Defina o corpo da requisição para o GitHub
data = {
    "message": commit_message,  # Mensagem de commit com data e hora
    "content": file_content_encoded  # Conteúdo do arquivo codificado em base64
}

# Se o arquivo já existir, adicione o SHA para atualizar o arquivo
if sha:
    data["sha"] = sha  # Adicionando o SHA para atualizar o arquivo

# Faça a requisição PUT para enviar o arquivo ao repositório
response = requests.put(repo_url, json=data, headers=headers)

# Verifique o status da requisição
if response.status_code == 200 or response.status_code == 201:
    print("Arquivo enviado com sucesso!")
elif response.status_code == 404:
    print("Erro: Repositório ou arquivo não encontrado. Verifique o caminho e as permissões.")
elif response.status_code == 403:
    print("Erro: Permissões insuficientes. Verifique se o token tem acesso adequado.")
else:
    print(f"Erro ao enviar arquivo: {response.status_code} - {response.text}")
    print("Resposta detalhada:", response.json())  # Adiciona mais detalhes para depuração
