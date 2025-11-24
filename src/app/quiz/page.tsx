"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, Upload, Check, Calendar, Search } from "lucide-react";

// Tipos
interface PetData {
  photoUri: string;
  name: string;
  birthDate: Date | null;
  sex: "male" | "female" | "";
  breed: string;
  neutered: boolean;
  weight: string;
  temperaments: string[];
  healthConditions: string[];
  healthNotes: string;
  mainChallenges: string[];
  trainingGoals: string[];
  dailyTimeAvailable: number;
  previousExperience: "" | "primeira_vez" | "basico" | "intermediario" | "avancado";
  housingType: string;
  otherPets: string;
}

// Constantes
const DOG_BREEDS = [
  "Sem Raça Definida (SRD)",
  "Labrador Retriever",
  "Golden Retriever",
  "Pastor Alemão",
  "Bulldog Francês",
  "Bulldog Inglês",
  "Beagle",
  "Poodle",
  "Rottweiler",
  "Yorkshire Terrier",
  "Boxer",
  "Dachshund",
  "Shih Tzu",
  "Husky Siberiano",
  "Pug",
  "Chihuahua",
  "Border Collie",
  "Doberman",
  "Cocker Spaniel",
  "Maltês",
  "Schnauzer",
  "Akita",
  "Basset Hound",
  "Bernese Mountain Dog",
  "Bichon Frisé",
  "Boston Terrier",
  "Cavalier King Charles",
  "Chow Chow",
  "Dálmata",
  "English Springer Spaniel",
  "Great Dane",
  "Lhasa Apso",
  "Mastiff",
  "Pinscher",
  "Pit Bull",
  "Pomeranian",
  "Samoieda",
  "Shar Pei",
  "Staffordshire Bull Terrier",
  "Weimaraner",
];

const TEMPERAMENTS = [
  "Sociável com Pessoas",
  "Sociável com Outros Cães",
  "Tímido",
  "Medroso",
  "Protetor",
  "Territorial",
  "Ansioso",
  "Nervoso",
  "Muito Energético",
  "Calmo",
  "Relaxado",
  "Teimoso",
  "Independente",
  "Obediente",
  "Ansioso para Agradar",
  "Brincalhão",
  "Motivado por Comida",
  "Reativo",
  "Agressivo",
];

const HEALTH_CONDITIONS = [
  "Diabetes mellitus",
  "Artrose",
  "Displasia de quadril",
  "Problemas cardíacos",
  "Epilepsia",
  "Insuficiência renal",
  "Hipotiroidismo",
  "Cegueira",
  "Surdez",
  "Paralisia",
  "Amputação",
  "Nenhuma condição",
];

const TOTAL_STEPS = 6;

export default function QuizPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<PetData>({
    photoUri: "",
    name: "",
    birthDate: null,
    sex: "",
    breed: "",
    neutered: false,
    weight: "",
    temperaments: [],
    healthConditions: [],
    healthNotes: "",
    mainChallenges: [],
    trainingGoals: [],
    dailyTimeAvailable: 0,
    previousExperience: "",
    housingType: "",
    otherPets: "",
  });

  const [breedSearch, setBreedSearch] = useState("");
  const [filteredBreeds, setFilteredBreeds] = useState<string[]>([]);
  const [showBreedDropdown, setShowBreedDropdown] = useState(false);

  // Carregar progresso salvo
  useEffect(() => {
    const saved = localStorage.getItem("@wise_dog_pro:pet_registration_progress");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.birthDate) {
        parsed.birthDate = new Date(parsed.birthDate);
      }
      setFormData(parsed);
    }
  }, []);

  // Salvar progresso automaticamente
  useEffect(() => {
    localStorage.setItem("@wise_dog_pro:pet_registration_progress", JSON.stringify(formData));
  }, [formData]);

  // Filtrar raças
  useEffect(() => {
    if (breedSearch) {
      const filtered = DOG_BREEDS.filter((breed) =>
        breed.toLowerCase().includes(breedSearch.toLowerCase())
      );
      setFilteredBreeds(filtered);
    } else {
      setFilteredBreeds(DOG_BREEDS);
    }
  }, [breedSearch]);

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return formData.photoUri !== "" && formData.name.trim() !== "";
      case 2:
        return formData.sex !== "";
      case 3:
        return formData.birthDate !== null;
      case 4:
        return formData.breed !== "";
      case 5:
        return formData.weight !== "" && parseFloat(formData.weight) >= 1 && parseFloat(formData.weight) <= 150;
      case 6:
        return true; // Nenhum campo obrigatório
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < TOTAL_STEPS) {
        setCurrentStep(currentStep + 1);
      } else {
        // Finalizar cadastro
        handleSubmit();
      }
    } else {
      alert("Por favor, preencha todos os campos obrigatórios.");
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Limpar progresso salvo
    localStorage.removeItem("@wise_dog_pro:pet_registration_progress");
    alert("Cadastro concluído com sucesso! 🎉");
    // Aqui você enviaria os dados para o backend
    console.log("Dados finais:", formData);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, photoUri: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleWeightChange = (delta: number) => {
    const currentWeight = parseFloat(formData.weight) || 0;
    const newWeight = Math.max(1, Math.min(150, currentWeight + delta));
    setFormData({ ...formData, weight: newWeight.toFixed(1) });
  };

  const toggleTemperament = (temp: string) => {
    const current = formData.temperaments;
    if (current.includes(temp)) {
      setFormData({ ...formData, temperaments: current.filter((t) => t !== temp) });
    } else {
      if (current.length < 5) {
        setFormData({ ...formData, temperaments: [...current, temp] });
      } else {
        alert("Você pode selecionar no máximo 5 temperamentos.");
      }
    }
  };

  const toggleHealthCondition = (condition: string) => {
    const current = formData.healthConditions;
    
    if (condition === "Nenhuma condição") {
      if (current.includes(condition)) {
        setFormData({ ...formData, healthConditions: [], healthNotes: "" });
      } else {
        setFormData({ ...formData, healthConditions: ["Nenhuma condição"], healthNotes: "" });
      }
    } else {
      if (current.includes(condition)) {
        setFormData({ ...formData, healthConditions: current.filter((c) => c !== condition) });
      } else {
        const filtered = current.filter((c) => c !== "Nenhuma condição");
        setFormData({ ...formData, healthConditions: [...filtered, condition] });
      }
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Foto e Nome do seu Pet</h2>
              <p className="text-gray-600">Vamos começar conhecendo seu melhor amigo!</p>
            </div>

            {/* Upload de Foto */}
            <div className="flex flex-col items-center">
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
                <div className="w-40 h-40 rounded-full border-4 border-dashed border-gray-300 hover:border-[#EFE988] transition-colors flex items-center justify-center overflow-hidden bg-gray-50">
                  {formData.photoUri ? (
                    <img src={formData.photoUri} alt="Pet" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <span className="text-sm text-gray-500">Adicionar Foto</span>
                    </div>
                  )}
                </div>
              </label>
              <p className="text-xs text-gray-500 mt-2">A IA identificará a raça automaticamente</p>
            </div>

            {/* Nome */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome do Pet <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ex: Max, Luna, Thor..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EFE988] focus:border-transparent"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Qual o sexo do {formData.name || "seu pet"}?</h2>
              <p className="text-gray-600">Isso nos ajuda a personalizar o treinamento</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setFormData({ ...formData, sex: "male" })}
                className={`p-6 rounded-xl border-2 transition-all ${
                  formData.sex === "male"
                    ? "border-[#EFE988] bg-[#EFE988]/10"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="text-4xl mb-2">🐕</div>
                <div className="font-semibold text-gray-900">Macho</div>
              </button>

              <button
                onClick={() => setFormData({ ...formData, sex: "female" })}
                className={`p-6 rounded-xl border-2 transition-all ${
                  formData.sex === "female"
                    ? "border-[#EFE988] bg-[#EFE988]/10"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="text-4xl mb-2">🐕</div>
                <div className="font-semibold text-gray-900">Fêmea</div>
              </button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Quando {formData.name || "seu pet"} nasceu?</h2>
              <p className="text-gray-600">A idade influencia no tipo de treinamento</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data de Nascimento <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  max={new Date().toISOString().split("T")[0]}
                  value={formData.birthDate ? formData.birthDate.toISOString().split("T")[0] : ""}
                  onChange={(e) =>
                    setFormData({ ...formData, birthDate: e.target.value ? new Date(e.target.value) : null })
                  }
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EFE988] focus:border-transparent"
                />
              </div>
              {formData.birthDate && (
                <p className="text-sm text-gray-600 mt-2">
                  Idade aproximada: {Math.floor((Date.now() - formData.birthDate.getTime()) / (365.25 * 24 * 60 * 60 * 1000))} anos
                </p>
              )}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Qual a raça do {formData.name || "seu pet"}?</h2>
              <p className="text-gray-600">Busque ou selecione da lista</p>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Raça <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.breed || breedSearch}
                  onChange={(e) => {
                    setBreedSearch(e.target.value);
                    setFormData({ ...formData, breed: "" });
                    setShowBreedDropdown(true);
                  }}
                  onFocus={() => setShowBreedDropdown(true)}
                  placeholder="Digite para buscar..."
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EFE988] focus:border-transparent"
                />
              </div>

              {showBreedDropdown && (
                <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {filteredBreeds.map((breed) => (
                    <button
                      key={breed}
                      onClick={() => {
                        setFormData({ ...formData, breed });
                        setBreedSearch("");
                        setShowBreedDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors"
                    >
                      {breed}
                    </button>
                  ))}
                </div>
              )}

              {formData.breed && (
                <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 bg-[#EFE988]/20 rounded-full">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium">{formData.breed}</span>
                </div>
              )}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Informações de Saúde</h2>
              <p className="text-gray-600">Ajude-nos a personalizar o treinamento</p>
            </div>

            {/* Castrado */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="neutered"
                checked={formData.neutered}
                onChange={(e) => setFormData({ ...formData, neutered: e.target.checked })}
                className="w-5 h-5 text-[#EFE988] border-gray-300 rounded focus:ring-[#EFE988]"
              />
              <label htmlFor="neutered" className="text-gray-700 font-medium">
                {formData.name || "Seu pet"} é castrado{formData.sex === "female" ? "a" : ""}?
              </label>
            </div>

            {/* Peso */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Peso (kg) <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleWeightChange(-0.5)}
                  className="w-12 h-12 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors font-bold text-xl"
                >
                  -
                </button>
                <input
                  type="number"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  min="1"
                  max="150"
                  step="0.5"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-center text-xl font-semibold focus:ring-2 focus:ring-[#EFE988] focus:border-transparent"
                />
                <button
                  onClick={() => handleWeightChange(0.5)}
                  className="w-12 h-12 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors font-bold text-xl"
                >
                  +
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">Entre 1 e 150 kg</p>
            </div>

            {/* Temperamentos */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Temperamentos (máx 5)
              </label>
              <div className="grid grid-cols-2 gap-2">
                {TEMPERAMENTS.map((temp) => (
                  <button
                    key={temp}
                    onClick={() => toggleTemperament(temp)}
                    className={`px-3 py-2 rounded-lg text-sm transition-all ${
                      formData.temperaments.includes(temp)
                        ? "bg-[#EFE988] text-black font-medium"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {temp}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Selecionados: {formData.temperaments.length}/5
              </p>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Condições Especiais</h2>
              <p className="text-gray-600">Informe se há alguma condição de saúde</p>
            </div>

            {/* Condições */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Condições de Saúde
              </label>
              <div className="grid grid-cols-2 gap-2">
                {HEALTH_CONDITIONS.map((condition) => (
                  <button
                    key={condition}
                    onClick={() => toggleHealthCondition(condition)}
                    className={`px-3 py-2 rounded-lg text-sm transition-all ${
                      formData.healthConditions.includes(condition)
                        ? "bg-[#EFE988] text-black font-medium"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {condition}
                  </button>
                ))}
              </div>
            </div>

            {/* Notas */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notas Adicionais (máx 500 caracteres)
              </label>
              <textarea
                value={formData.healthNotes}
                onChange={(e) => {
                  if (e.target.value.length <= 500) {
                    setFormData({ ...formData, healthNotes: e.target.value });
                  }
                }}
                disabled={formData.healthConditions.includes("Nenhuma condição")}
                placeholder="Descreva detalhes sobre as condições de saúde..."
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EFE988] focus:border-transparent disabled:bg-gray-50 disabled:text-gray-400"
              />
              <p className="text-xs text-gray-500 mt-1">
                {formData.healthNotes.length}/500 caracteres
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Cadastro do Pet</h1>
          <p className="text-gray-600">Preencha as informações para personalizar o treinamento</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              Etapa {currentStep} de {TOTAL_STEPS}
            </span>
            <span className="text-sm font-medium text-gray-700">
              {Math.round((currentStep / TOTAL_STEPS) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-[#EFE988] h-3 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          {renderStep()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4">
          {currentStep > 1 && (
            <button
              onClick={handleBack}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-semibold transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Voltar
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={!validateStep(currentStep)}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-black hover:bg-gray-800 text-white rounded-lg font-semibold transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {currentStep === TOTAL_STEPS ? "Finalizar" : "Próximo"}
            {currentStep < TOTAL_STEPS && <ArrowRight className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
}
