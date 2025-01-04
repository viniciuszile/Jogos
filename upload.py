import subprocess

def git_add_commit_push(file_path, commit_message, branch='main'):
    try:
        # Adiciona o arquivo ao repositório
        subprocess.run(['git', 'add', file_path], check=True)
        
        # Faz o commit
        subprocess.run(['git', 'commit', '-m', commit_message], check=True)
        
        # Envia para o repositório remoto
        subprocess.run(['git', 'push', 'origin', branch], check=True)
        
        print(f"Arquivo '{file_path}' foi adicionado, commitado e enviado para a branch '{branch}'.")
    
    except subprocess.CalledProcessError as e:
        print(f"Erro ao executar o comando Git: {e}")

# Chama a função
file_path = 'jogos.xlsx'  # Altere o nome do arquivo conforme necessário
commit_message = 'Adicionando o arquivo jogos.xlsx'  # Sua mensagem de commit
git_add_commit_push(file_path, commit_message)
