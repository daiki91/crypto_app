from cryptography.fernet import Fernet

# ⚠️ À stocker de façon sécurisée, ici pour démo
SECRET_KEY = Fernet.generate_key()
fernet = Fernet(SECRET_KEY)

def encrypt_text(text: str) -> str:
    return fernet.encrypt(text.encode()).decode()

def decrypt_text(token: str) -> str:
    try:
        return fernet.decrypt(token.encode()).decode()
    except Exception:
        return "Erreur : texte non valide ou clé incorrecte"
