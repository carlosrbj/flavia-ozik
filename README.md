# 🏺 Flavia Ozik - Arte e Cerâmica

Sistema completo de gestão para ateliês de cerâmica, desenvolvido com Angular + PrimeNG no frontend e preparado para integração futura com Java/Spring Boot + MySQL.

## ✨ Funcionalidades Implementadas

### 🔐 **Sistema de Autenticação**
- Tela de login responsiva com validações
- Autenticação mock (teste: `test@example.com` / `password`)
- Redirecionamento automático para dashboard

### 🎨 **Interface e Design**
- **Paleta de Cores Outonal**: Terracota, ocre, dourado, marrom, verde musgo
- **Layout Responsivo**: Desktop, tablet e mobile
- **Componentes PrimeNG**: Tabelas, formulários, diálogos, abas, cards
- **Animações e Transições**: Hover effects, transformações suaves

### 👥 **Gestão Completa de Alunos**

#### 📝 **Cadastro Avançado**
- **Informações Pessoais**: Nome, CPF, RG, gênero, data de nascimento
- **Contato**: Telefone principal/secundário, email, endereço completo
- **Informações do Curso**: Data de início, nível, valor mensalidade, forma de pagamento
- **Status e Controle**: Ativo/inativo, motivo de inativação
- **Observações**: Alergias, restrições, observações gerais

#### 🔍 **Visualização Detalhada**
- **Perfil Completo**: Todas as informações organizadas em seções
- **Abas Organizadas**: Perfil, Financeiro, Mensalidades, Aulas, Queimas
- **Estatísticas em Tempo Real**: Cards com métricas importantes

### 💰 **Sistema Financeiro**

#### 📊 **Dashboard Financeiro**
- Mensalidades em aberto
- Queimas em aberto
- Total pago em mensalidades
- Total pago em queimas
- Próximos vencimentos

#### 📅 **Gestão de Mensalidades**
- Geração automática de mensalidades
- Controle de vencimentos
- Histórico de pagamentos
- Status: Em aberto, Pago parcial, Pago, Vencida, Cancelada
- Descontos e multas
- Formas de pagamento (PIX, Cartão, Dinheiro, Transferência)

### 📚 **Controle de Aulas**

#### 🎯 **Sistema de Aulas**
- **4 aulas por mensalidade** (padrão)
- **Controle de Presença**: Presente, Ausente, Justificada, Pendente
- **Tipos de Aula**: Teórica, Prática, Teórico-Prática
- **Agendamento**: Data, horário, duração (3h padrão)
- **Avaliação**: Notas e feedback
- **Status**: Agendada, Em andamento, Realizada, Cancelada, Reprogramada

### 🔥 **Gestão de Queimas**

#### 🏺 **Controle de Queimas**
- **Tipos**: Biscoito, Esmalte, Raku, Outro
- **Agendamento**: Data, horário, responsável
- **Controle de Temperatura**: Máxima, tempo total, programa
- **Status**: Agendada, Em andamento, Concluída, Cancelada
- **Resultado**: Sucesso, Parcial, Falha
- **Controle Financeiro**: Valor, pagamento

## 🛠️ **Tecnologias Utilizadas**

### **Frontend**
- **Angular 18** - Framework principal
- **PrimeNG** - Componentes UI avançados
- **PrimeFlex** - Sistema de grid responsivo
- **PrimeIcons** - Ícones consistentes
- **SCSS** - Pré-processador CSS com variáveis

### **Arquitetura**
- **Lazy Loading** - Módulos carregados sob demanda
- **Componentes Reutilizáveis** - Arquitetura modular
- **Services** - Lógica de negócio centralizada
- **Interfaces TypeScript** - Tipagem forte
- **Formulários Reativos** - Validações avançadas

### **Componentes Principais**
- `AlunoFormComponent` - Formulário de cadastro/edição
- `AlunoViewComponent` - Visualização detalhada com abas
- `AlunosComponent` - Listagem e gestão geral
- `LayoutComponent` - Layout principal com sidebar

## 🚀 **Como Executar**

### **Pré-requisitos**
- Node.js 18+ 
- npm ou yarn

### **Instalação**
```bash
# Clonar o repositório
git clone [url-do-repositorio]
cd flavia-ozik

# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm start

# Compilar para produção
npm run build
```

### **Acesso**
- **URL**: `http://localhost:4200`
- **Login**: `test@example.com`
- **Senha**: `password`

## 📱 **Responsividade**

O sistema é totalmente responsivo e funciona perfeitamente em:
- **Desktop** (1200px+)
- **Tablet** (768px - 1199px)
- **Mobile** (< 768px)

## 🎨 **Sistema de Cores**

### **Paleta Principal**
- **Terracota**: `#B5542D` - Elementos principais
- **Ocre**: `#C68E17` - Destaques e hover
- **Dourado**: `#DAA520` - Bordas e separadores
- **Marrom Sela**: `#8B4513` - Textos secundários
- **Verde Musgo**: `#4F6F52` - Elementos de sucesso

### **Gradientes**
- **Outonal**: Transições suaves entre cores
- **Terra**: Combinações naturais e harmoniosas

## 🔧 **Estrutura do Projeto**

```
src/
├── app/
│   ├── core/           # Serviços e componentes principais
│   │   ├── models/     # Interfaces TypeScript
│   │   ├── services/   # Lógica de negócio
│   │   └── layout/     # Layout principal
│   ├── pages/          # Páginas da aplicação
│   │   ├── login/      # Autenticação
│   │   ├── home/       # Dashboard
│   │   └── alunos/     # Gestão de alunos
│   └── shared/         # Componentes compartilhados
├── assets/             # Recursos estáticos
└── styles/             # Estilos globais
```

## 📊 **Funcionalidades Futuras**

### **Backend (Java/Spring Boot)**
- API REST completa
- Autenticação JWT
- Validações de negócio
- Relatórios avançados

### **Banco de Dados (MySQL)**
- Persistência de dados
- Relacionamentos complexos
- Backup e recuperação
- Auditoria de mudanças

### **Funcionalidades Adicionais**
- Upload de fotos
- Notificações por email
- Relatórios em PDF
- Dashboard analítico
- Integração com sistemas externos

## 🤝 **Contribuição**

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 **Licença**

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 **Desenvolvido por**

Sistema desenvolvido para **Flavia Ozik - Arte e Cerâmica** com foco em:
- **Usabilidade** - Interface intuitiva e responsiva
- **Escalabilidade** - Arquitetura preparada para crescimento
- **Manutenibilidade** - Código limpo e bem documentado
- **Performance** - Lazy loading e otimizações

---

**🎯 Sistema em constante evolução para atender às necessidades do ateliê de cerâmica!**
