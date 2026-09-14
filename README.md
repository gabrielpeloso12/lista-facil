<div align="center">

# 🛒 Lista Fácil

### Sua lista de compras do mercado, sempre à mão.

</div>

---

## 📖 Sobre o projeto

**Lista Fácil** é um aplicativo mobile criado para resolver um problema simples do dia a dia: **anotar o que precisa comprar no mercado sem complicação**. Chega de listas em papel perdidas no fundo da bolsa ou anotações espalhadas no bloco de notas do celular.

O objetivo do app é **facilitar a criação e o acompanhamento de listas de compras**, permitindo organizar os produtos por categoria, marcar o que já foi colocado no carrinho e acompanhar o progresso da compra em tempo real — tudo isso de forma rápida, visual e intuitiva.

---

## ✨ Funcionalidades

- 📝 **Criar listas de compras** rapidamente, com nome personalizado
- 🕓 **Últimas 5 listas** sempre disponíveis na tela inicial (as mais antigas saem automaticamente para abrir espaço)
- 🗑️ **Excluir listas ou itens** manualmente a qualquer momento, sem precisar esperar o limite ser atingido
- ➕ **Adicionar produtos** com nome, quantidade e categoria
- 🏷️ **Categorias predefinidas**: Hortifruti, Padaria, Laticínios, Carnes, Mantimentos, Bebidas, Limpeza, Higiene e Outros
- 🔍 **Filtro por categoria** para encontrar itens rapidamente dentro de uma lista grande
- ✅ **Marcar item como comprado**, com atualização instantânea do progresso
- ⭐ **Favoritar itens** importantes ou recorrentes
- 📊 **Barra e percentual de progresso da compra**, mostrando quantos itens já foram pegos
- ⌨️ Formulários pensados para uso com uma mão só, sem travar no teclado do celular

---

## 🖼️ Layout

O design do app foi construído a partir de protótipos de tela (menu principal e lançamento de produtos), disponíveis em [`layout/`](layout), garantindo uma experiência visual limpa, consistente e fácil de usar.

---

## 🛠️ Tecnologias utilizadas

| Tecnologia | Uso |
|---|---|
| ⚛️ **React Native** + **Expo** | Base do aplicativo mobile |
| 🔷 **TypeScript** | Tipagem estática e mais segurança no código |
| 🧭 **React Navigation** | Navegação entre as telas |
| 💾 **AsyncStorage** | Armazenamento local das listas (cache no dispositivo) |
| 🎨 **@expo/vector-icons** | Ícones utilizados na interface |
| ☁️ **EAS Build** | Geração do APK/build de instalação |

---

## 📂 Estrutura do projeto

```
lista-facil/
├── assets/              # Ícones, logo e splash do app
├── layout/              # Protótipos/telas de referência do design
├── src/
│   ├── components/      # Componentes reutilizáveis (cards, chips, itens...)
│   ├── constants/       # Categorias, cores e tema visual
│   ├── navigation/       # Configuração de rotas/telas
│   ├── screens/         # Telas principais (Menu e Detalhe da Lista)
│   ├── services/        # Persistência local das listas (AsyncStorage)
│   ├── utils/            # Funções auxiliares (datas, geração de id)
│   └── types.ts          # Tipos compartilhados do app
├── app.json              # Configuração do Expo
└── eas.json               # Perfis de build (EAS)
```

---

## 🚀 Como rodar o projeto

### Pré-requisitos
- 📦 [Node.js](https://nodejs.org/)
- 📱 App **Expo Go** instalado no celular *(ou emulador Android configurado)*

### Passo a passo

```bash
# 1. Instale as dependências
npm install

# 2. Inicie o servidor de desenvolvimento
npx expo start
```

Depois é só escanear o QR Code exibido no terminal com o app **Expo Go** 📲 e testar o aplicativo direto no seu celular.

---

## 📦 Gerando o instalável (APK)

O projeto usa o **EAS Build** para gerar o instalável Android:

```bash
eas build -p android --profile preview
```

> ℹ️ O build para iOS depende de uma conta Apple Developer e de um Mac para compilação, por isso o foco inicial do projeto é **Android**.

---

## 🗺️ Próximos passos

- [ ] 🍎 Build e publicação para iOS
- [ ] ☁️ Sincronização das listas entre dispositivos
- [ ] 🔔 Lembretes/notificações de compras recorrentes

---

## 📄 Licença

Este projeto está sob a licença especificada em [`LICENSE`](LICENSE).

---

<div align="center">

Feito com 💙 para deixar a ida ao mercado mais simples.

</div>
