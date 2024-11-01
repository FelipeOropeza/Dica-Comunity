# DicaCommunity - Frontend

Este é o frontend da aplicação **DicaCommunity**, uma plataforma de compartilhamento de dicas e interação entre usuários.

## Tecnologias Utilizadas

- **React**: para criação de uma interface dinâmica e responsiva.
- **React Router**: para gerenciamento de rotas e navegação com `useNavigate`.
- **React Query**: para gerenciamento de dados e requisições com `useQuery` e `useQueryClient`.
- **useState** e **useEffect**: para gerenciamento de estado e efeitos colaterais.
- **useContext**: para compartilhar dados entre componentes.
- **useParams**: para acessar parâmetros da URL.
- **axios**: para fazer requisições HTTP.
- **Tailwind CSS**: para estilos otimizados e design moderno.
- **Dotenv**: Carrega variáveis de ambiente a partir de um arquivo `.env`, mantendo segredos e configurações fora do código-fonte.

## Funcionalidades Principais

- Navegação fluida entre páginas.
- Autenticação de usuários.
- Sistema de postagens com likes e comentários.
- Upload e visualização de imagens.

## Como Executar o Projeto

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/FelipeOropeza/Dica-Comunity.git
   cd Dica-Comunity

2. **Certifique-se de ter o Node.js instalado**:
  Versão mínima recomendada: 14.x

3. **Instale as dependências**:
   ```bash
   npm install

4. **Crie o arquivo .env com base no arquivo .env.example fornecido**:
   Configure as variáveis de ambiente de acordo com as credenciais e configurações do seu ambiente.

5. **Execute o servidor**:
    ```bash
    npm run dev
