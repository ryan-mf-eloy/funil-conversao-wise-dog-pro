# 📋 Mapeamento de Campos - Wise Dog Pro

## 🐾 FASE 1: CADASTRO DE PET

### Estrutura

- **Total de etapas**: 6
- **Progresso**: Salvo automaticamente no AsyncStorage
- **Validação**: Por etapa antes de avançar

---

### **Etapa 1: Foto e Nome**

| Campo    | Tipo      | Obrigatório | Opções/Validação                                      |
| -------- | --------- | ----------- | ----------------------------------------------------- |
| **Foto** | Upload    | ✅ Sim      | Galeria/Câmera. IA identifica raça (máx 3 tentativas) |
| **Nome** | TextInput | ✅ Sim      | Mínimo 1 caractere. Auto-capitalize                   |

---

### **Etapa 2: Sexo**

| Campo    | Tipo          | Obrigatório | Opções                            |
| -------- | ------------- | ----------- | --------------------------------- |
| **Sexo** | Seleção única | ✅ Sim      | `male` (Macho) / `female` (Fêmea) |

---

### **Etapa 3: Data de Nascimento**

| Campo    | Tipo       | Obrigatório | Validação                                                |
| -------- | ---------- | ----------- | -------------------------------------------------------- |
| **Data** | DatePicker | ✅ Sim      | Data máxima: Hoje. Formato: "dd de MMMM de yyyy" (pt-BR) |

---

### **Etapa 4: Raça**

| Campo    | Tipo         | Obrigatório | Opções                                                                                                     |
| -------- | ------------ | ----------- | ---------------------------------------------------------------------------------------------------------- |
| **Raça** | Autocomplete | ✅ Sim      | 180+ raças (DOG_BREEDS). Busca em tempo real. IA identifica raça (máx 3 tentativas). Mostra mistura se SRD |

---

### **Etapa 5: Informações de Saúde**

| Campo             | Tipo               | Obrigatório | Validação/Limites                        |
| ----------------- | ------------------ | ----------- | ---------------------------------------- |
| **Castrado**      | Checkbox           | ❌ Não      | Padrão: `false`                          |
| **Peso**          | TextInput numérico | ✅ Sim      | 1-150 kg. Incremento: 0,5 kg. Botões +/- |
| **Temperamentos** | Seleção múltipla   | ❌ Não      | Máx 5. 20 opções disponíveis             |

**Temperamentos disponíveis**: Sociável com Pessoas, Sociável com Outros Cães, Tímido, Medroso, Protetor, Territorial, Ansioso, Nervoso, Muito Energético, Calmo, Relaxado, Teimoso, Independente, Obediente, Ansioso para Agradar, Brincalhão, Motivado por Comida, Reativo, Agressivo

---

### **Etapa 6: Condições Especiais**

| Campo         | Tipo             | Obrigatório | Validação/Limites                                      |
| ------------- | ---------------- | ----------- | ------------------------------------------------------ |
| **Condições** | Seleção múltipla | ❌ Não      | 12 opções pré-definidas + "Nenhuma condição"           |
| **Notas**     | TextArea         | ❌ Não      | Máx 500 caracteres. Desabilitado se "Nenhuma condição" |

**Condições disponíveis**: Diabetes mellitus, Artrose, Displasia de quadril, Problemas cardíacos, Epilepsia, Insuficiência renal, Hipotiroidismo, Cegueira, Surdez, Paralisia, Amputação, Nenhuma condição

---

## 🎯 FASE 2: QUIZ DE PERSONALIZAÇÃO (Treinamento)

> **Nota**: Etapas 8, 9 e 10 existem no código mas não estão no fluxo principal atual (TOTAL_STEPS = 6)

---

### **Etapa 8: Principais Desafios**

| Campo        | Tipo             | Obrigatório | Limites                                       |
| ------------ | ---------------- | ----------- | --------------------------------------------- |
| **Desafios** | Seleção múltipla | ❌ Não      | 11 opções. "Nenhum desafio" desabilita outras |

**Desafios**: `puxa_guia`, `late_muito`, `nao_obedece`, `ansiedade_separacao`, `agressivo`, `pula_pessoas`, `destrutivo`, `reativo_outros_caes`, `nao_socializado`, `medo_excessivo`, `sem_desafio`

---

### **Etapa 9: Objetivos de Treinamento**

| Campo         | Tipo             | Obrigatório | Limites                      |
| ------------- | ---------------- | ----------- | ---------------------------- |
| **Objetivos** | Seleção múltipla | ❌ Não      | Máx 5. 12 opções disponíveis |

**Objetivos**: `comandos_basicos`, `passeios_perfeitos`, `socializacao`, `truques_avancados`, `controle_latidos`, `comportamento_casa`, `ansiedade`, `agilidade`, `terapia_servico`, `estimulo_mental`, `convivencia_criancas`, `apenas_diversao`

---

### **Etapa 10: Tempo e Contexto** (4 sub-etapas)

#### **10.1: Tempo Disponível**

- **Campo**: Tempo diário
- **Tipo**: Seleção única
- **Obrigatório**: ✅ Sim
- **Opções**: `5` (5-10 min), `15` (15-20 min), `30` (30-45 min), `60` (1h+)

#### **10.2: Experiência Prévia**

- **Campo**: Experiência
- **Tipo**: Seleção única
- **Obrigatório**: ✅ Sim
- **Opções**: `primeira_vez`, `basico`, `intermediario`, `avancado`

#### **10.3: Tipo de Moradia**

- **Campo**: Moradia
- **Tipo**: Seleção única
- **Obrigatório**: ✅ Sim
- **Opções**: `apartamento_pequeno`, `apartamento_grande`, `casa_pequena`, `casa_grande`, `sítio_fazenda`

#### **10.4: Outros Pets**

- **Campo**: Outros pets
- **Tipo**: Seleção única
- **Obrigatório**: ✅ Sim
- **Opções**: `nenhum`, `outros_caes`, `gatos`, `outros_animais`, `caes_e_gatos`

---

## 📊 ESTRUTURA DE DADOS

### **PetData** (após cadastro)

```typescript
{
  photoUri: string;
  name: string;
  birthDate: Date | null;
  sex: 'male' | 'female';  // Converte para M/F ao salvar
  breed: string;
  neutered: boolean;
  weight: string;  // Formato: "25,5"
  temperaments: string[];  // Máx 5
  healthConditions: string[];
  healthNotes: string;  // Máx 500 chars
  mainChallenges: string[];
  trainingGoals: string[];  // Máx 5
  dailyTimeAvailable: number;  // 5, 15, 30 ou 60
  previousExperience: '' | 'primeira_vez' | 'basico' | 'intermediario' | 'avancado';
  housingType: string;
  otherPets: string;
}
```

### **QuizAnswers** (para geração de jornada)

```typescript
{
  age: string;
  mainChallenge: string; // Primeiro desafio selecionado
  goal: string; // Primeiro objetivo selecionado
  timeAvailable: string; // Label do tempo
  previousExperience: string;
  livingSpace: string;
  otherPets: boolean; // Convertido de string
}
```

---

## ✅ VALIDAÇÕES E REGRAS

### **Validações por Etapa**

- Etapa 1: Foto + Nome obrigatórios
- Etapa 2: Sexo obrigatório
- Etapa 3: Data obrigatória
- Etapa 4: Raça obrigatória
- Etapa 5: Peso obrigatório
- Etapa 6: Nenhum campo obrigatório

### **Limites**

- Temperamentos: Máx 5
- Objetivos: Máx 5
- Notas de saúde: Máx 500 caracteres
- Peso: 1-150 kg
- Identificação IA: Máx 3 tentativas
- Data: Não pode ser futura

### **Persistência**

- Chave AsyncStorage: `@wise_dog_pro:pet_registration_progress`
- Restauração automática ao reabrir
- Limpeza após cadastro bem-sucedido

---

## 📝 OBSERVAÇÕES

1. Etapas 8-10 existem no código mas não estão no fluxo principal (TOTAL_STEPS = 6)
2. Temperamentos estão no formData mas sem etapa dedicada no fluxo atual
3. IA de raça usa cache para evitar requisições duplicadas
4. Personalização de linguagem baseada em nome e sexo
5. Navegação para frente/trás com validação
6. Progresso salvo automaticamente

---

**Total**: 20+ campos principais + múltiplas opções de seleção
