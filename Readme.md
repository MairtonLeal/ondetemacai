# 📍 App Lista de Locais

Aplicativo básico desenvolvido com **React Native + Expo**, utilizando **Firebase Firestore** como banco de dados e **React Navigation (Native Stack)** para navegação.

---

# 🚀 Tecnologias Utilizadas

- React Native
- Expo SDK 54
- Firebase
- Firestore
- React Navigation Native Stack
- TypeScript

---

# 📦 Funcionalidades

- Criar local
- Listar locais
- Atualizar local
- Deletar local

---

# 🔥 Configuração do Firebase

1. Acesse o console do Firebase
2. Crie um novo projeto
3. Ative o Firestore Database
4. Adicione um app Web
5. Copie as credenciais `firebaseConfig`

```ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
```
# 📁 Estrutura de Pastas

```bash
src/
 ├── core/
 │    └── firebase/
 │         └── config.ts
 │
 ├── domain/
 │    ├── models/
 │    │     └── Local.ts
 │    │
 │    └── repository/
 │          └── LocalRepository.ts
 │
 └── ui/
      ├── screens/
      │     ├── HomeScreen.tsx
      │     └── CreateLocalScreen.tsx
      │
      └── components/
            └── LocalCard.tsx
```

# 📌 Descrição das Pastas
## 🔹 core/

Responsável pela infraestrutura do projeto.
Contém configurações externas, como integração com Firebase.

## 🔹 domain/

Camada de regra de negócio.

models/ → Define os modelos da aplicação.

repository/ → Responsável pela comunicação com o banco de dados.

## 🔹 ui/

Camada de interface do usuário.

screens/ → Telas principais do aplicativo.

components/ → Componentes reutilizáveis.

🎯 Essa organização facilita manutenção, escalabilidade e separação de responsabilidades.

## ♿ Acessibilidade

Todos os botões têm accessibilityRole, accessibilityLabel e accessibilityHint.

Os TextInput e elementos de listagem (FlatList) são acessíveis para leitores de tela.

Modal e ações de atualização/remover possuem foco e leitura corretos.

## 🗺️ Métodos Adicionais

```tsx
//Abrir no Mapa
import * as Linking from 'expo-linking';
const handleOpenMaps = (local: Local) => {
  const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(local.endereco)}`;
  Linking.openURL(url);
};
```

```tsx
//Compartilhar Local
import * as Sharing from 'expo-sharing';

const handleShare = async (local: Local) => {
  try {
    await Sharing.shareAsync(`Confira este local: ${local.nome}, ${local.bairro} - ${local.endereco}`);
  } catch (error) {
    console.error("Erro ao compartilhar:", error);
  }
};
```