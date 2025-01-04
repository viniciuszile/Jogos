import tkinter as tk
from tkinter import ttk, messagebox
import pandas as pd
import subprocess
import os

# Função para salvar os dados na planilha
def salvar_dados():
    nome = entry_nome.get()
    status = combo_status.get()
    plataforma = combo_plataforma.get()
    objetivo = combo_objetivo.get()
    
    if not nome or not status or not plataforma or not objetivo:
        messagebox.showerror("Erro", "Todos os campos devem ser preenchidos!")
        return
    
    # Novo jogo a ser adicionado
    novo_jogo = pd.DataFrame([{
        'Nome do Jogo': nome,
        'Status': status,
        'Plataforma': plataforma,
        'Objetivo': objetivo
    }])
    
    try:
        # Carregar a planilha existente
        arquivo = 'jogos.xlsx'
        df = pd.read_excel(arquivo)
        
        # Adicionar o novo jogo ao DataFrame existente
        df = pd.concat([df, novo_jogo], ignore_index=True)
        
        # Salvar o DataFrame atualizado
        df.to_excel(arquivo, index=False)
        messagebox.showinfo("Sucesso", "Novo jogo adicionado com sucesso!")
        
        # Fechar a janela
        root.destroy()
        
        # # Rodar o upload.py (ajustando o caminho absoluto)
        # upload_script = os.path.join(os.path.dirname(__file__), 'upload.py')
        # subprocess.run(['python', upload_script])
        
    except Exception as e:
        messagebox.showerror("Erro", f"Erro ao salvar os dados: {str(e)}")

# Função para limpar os campos da interface
def limpar_campos():
    entry_nome.delete(0, tk.END)
    combo_status.set("")
    combo_plataforma.set("")
    combo_objetivo.set("")

# Criar a janela principal
root = tk.Tk()
root.title("Cadastro de Jogos")
root.geometry("400x300")

# Nome do Jogo
tk.Label(root, text="Nome do Jogo:").pack(pady=5)
entry_nome = tk.Entry(root, width=40)
entry_nome.pack()

# Status
tk.Label(root, text="Status:").pack(pady=5)
combo_status = ttk.Combobox(root, values=["Completo", "Incompleto"], state="readonly", width=37)
combo_status.pack()

# Plataforma
tk.Label(root, text="Plataforma:").pack(pady=5)
combo_plataforma = ttk.Combobox(root, values=["PC", "PS3", "PS4", "PS5", "Outro"], state="readonly", width=37)
combo_plataforma.pack()

# Objetivo
tk.Label(root, text="Objetivo:").pack(pady=5)
combo_objetivo = ttk.Combobox(root, values=["Platinado", "Zerar", "Concluído"], state="readonly", width=37)
combo_objetivo.pack()

# Botão para salvar
btn_salvar = tk.Button(root, text="Salvar Jogo", command=salvar_dados)
btn_salvar.pack(pady=20)

# Executar a interface
root.mainloop()
