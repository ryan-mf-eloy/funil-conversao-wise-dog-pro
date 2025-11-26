"use client";

import React from "react";
import { Header } from "@/components/common/Header";
import { FooterTapedDesign } from "@/components/ui/footer-taped-design";
import { Container } from "@/components/common/Container";
import { Shield, Lock, Eye, FileText, Mail } from "lucide-react";

export default function PoliticaPrivacidadePage() {
  const handleStartClick = () => {
    window.location.href = "/";
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAF9]">
      <div className="flex-1">
        <Header onStartClick={handleStartClick} hideAnchorLinks={true} />
        <section className="py-16 pb-24">
          <Container size="lg">
            <div className="max-w-4xl mx-auto">
              {/* Hero Section */}
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#1C8C58]/10 to-[#5BA67B]/10 text-[#1C8C58] px-5 py-2.5 rounded-full text-sm font-semibold border border-[#1C8C58]/20 mb-6 shadow-sm">
                  <Shield className="w-4 h-4" />
                  Proteção de Dados
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2D2E29] mb-4">
                  Política de Privacidade
                </h1>
                <p className="text-lg text-[#6B7280] max-w-2xl mx-auto">
                  Última atualização: {new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
              </div>

              {/* Content */}
              <div className="prose prose-lg max-w-none space-y-8">
                {/* Introdução */}
                <section className="bg-white rounded-2xl p-8 border-2 border-[#D4C4A8]/30 shadow-sm">
                  <h2 className="text-2xl font-bold text-[#2D2E29] mb-4 flex items-center gap-3">
                    <FileText className="w-6 h-6 text-[#1C8C58]" />
                    1. Introdução
                  </h2>
                  <p className="text-[#6B7280] leading-relaxed mb-4">
                    A Wise Dog Pro ("nós", "nosso" ou "aplicativo") está comprometida em proteger sua privacidade. Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos suas informações pessoais quando você utiliza nosso aplicativo de adestramento canino.
                  </p>
                  <p className="text-[#6B7280] leading-relaxed">
                    Ao usar o Wise Dog Pro, você concorda com as práticas descritas nesta política. Se não concordar com esta política, por favor, não utilize nosso aplicativo.
                  </p>
                </section>

                {/* Informações Coletadas */}
                <section className="bg-white rounded-2xl p-8 border-2 border-[#D4C4A8]/30 shadow-sm">
                  <h2 className="text-2xl font-bold text-[#2D2E29] mb-4 flex items-center gap-3">
                    <Eye className="w-6 h-6 text-[#1C8C58]" />
                    2. Informações que Coletamos
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold text-[#2D2E29] mb-2">2.1. Informações de Cadastro</h3>
                      <ul className="list-disc list-inside text-[#6B7280] space-y-2 ml-4">
                        <li>Nome completo</li>
                        <li>Endereço de e-mail</li>
                        <li>Senha (criptografada)</li>
                        <li>Data de nascimento (opcional)</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-[#2D2E29] mb-2">2.2. Informações do Pet</h3>
                      <ul className="list-disc list-inside text-[#6B7280] space-y-2 ml-4">
                        <li>Nome do cão</li>
                        <li>Raça</li>
                        <li>Idade</li>
                        <li>Fotos do pet</li>
                        <li>Informações de saúde e comportamento</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-[#2D2E29] mb-2">2.3. Dados de Uso</h3>
                      <ul className="list-disc list-inside text-[#6B7280] space-y-2 ml-4">
                        <li>Progresso nas lições de treinamento</li>
                        <li>Interações com o chat de IA</li>
                        <li>Eventos de saúde registrados</li>
                        <li>Preferências e configurações do aplicativo</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-[#2D2E29] mb-2">2.4. Informações Técnicas</h3>
                      <ul className="list-disc list-inside text-[#6B7280] space-y-2 ml-4">
                        <li>Endereço IP</li>
                        <li>Tipo de dispositivo</li>
                        <li>Sistema operacional</li>
                        <li>Identificadores únicos do dispositivo</li>
                        <li>Dados de uso e logs</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Como Usamos */}
                <section className="bg-white rounded-2xl p-8 border-2 border-[#D4C4A8]/30 shadow-sm">
                  <h2 className="text-2xl font-bold text-[#2D2E29] mb-4 flex items-center gap-3">
                    <Lock className="w-6 h-6 text-[#1C8C58]" />
                    3. Como Usamos suas Informações
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold text-[#2D2E29] mb-2">Utilizamos suas informações para:</h3>
                      <ul className="list-disc list-inside text-[#6B7280] space-y-2 ml-4">
                        <li>Fornecer e melhorar nossos serviços de adestramento</li>
                        <li>Personalizar sua jornada de treinamento com base nas informações do seu pet</li>
                        <li>Gerar conteúdo personalizado através de inteligência artificial</li>
                        <li>Processar pagamentos e gerenciar assinaturas</li>
                        <li>Enviar notificações sobre treinamentos, lembretes de saúde e atualizações</li>
                        <li>Responder a suas solicitações de suporte</li>
                        <li>Analisar o uso do aplicativo para melhorias contínuas</li>
                        <li>Detectar e prevenir fraudes ou atividades suspeitas</li>
                        <li>Cumprir obrigações legais</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Compartilhamento */}
                <section className="bg-white rounded-2xl p-8 border-2 border-[#D4C4A8]/30 shadow-sm">
                  <h2 className="text-2xl font-bold text-[#2D2E29] mb-4">
                    4. Compartilhamento de Informações
                  </h2>
                  <p className="text-[#6B7280] leading-relaxed mb-4">
                    Não vendemos suas informações pessoais. Podemos compartilhar suas informações apenas nas seguintes situações:
                  </p>
                  <ul className="list-disc list-inside text-[#6B7280] space-y-2 ml-4">
                    <li><strong>Prestadores de Serviços:</strong> Compartilhamos com provedores que nos ajudam a operar o aplicativo (hospedagem, processamento de pagamentos, análise de dados)</li>
                    <li><strong>Inteligência Artificial:</strong> Utilizamos serviços de IA (OpenAI) para gerar conteúdo personalizado. Seus dados são processados de acordo com as políticas de privacidade desses provedores</li>
                    <li><strong>Obrigações Legais:</strong> Quando exigido por lei ou para proteger nossos direitos legais</li>
                    <li><strong>Com seu Consentimento:</strong> Em outras situações, apenas com seu consentimento explícito</li>
                  </ul>
                </section>

                {/* Segurança */}
                <section className="bg-white rounded-2xl p-8 border-2 border-[#D4C4A8]/30 shadow-sm">
                  <h2 className="text-2xl font-bold text-[#2D2E29] mb-4">
                    5. Segurança dos Dados
                  </h2>
                  <p className="text-[#6B7280] leading-relaxed mb-4">
                    Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações:
                  </p>
                  <ul className="list-disc list-inside text-[#6B7280] space-y-2 ml-4">
                    <li>Criptografia de dados em trânsito e em repouso</li>
                    <li>Autenticação segura e controle de acesso</li>
                    <li>Monitoramento regular de segurança</li>
                    <li>Backups regulares dos dados</li>
                    <li>Conformidade com padrões de segurança da indústria</li>
                  </ul>
                </section>

                {/* Seus Direitos */}
                <section className="bg-white rounded-2xl p-8 border-2 border-[#D4C4A8]/30 shadow-sm">
                  <h2 className="text-2xl font-bold text-[#2D2E29] mb-4">
                    6. Seus Direitos
                  </h2>
                  <p className="text-[#6B7280] leading-relaxed mb-4">
                    Você tem os seguintes direitos em relação às suas informações pessoais:
                  </p>
                  <ul className="list-disc list-inside text-[#6B7280] space-y-2 ml-4">
                    <li><strong>Acesso:</strong> Solicitar uma cópia dos dados que temos sobre você</li>
                    <li><strong>Correção:</strong> Corrigir informações incorretas ou desatualizadas</li>
                    <li><strong>Exclusão:</strong> Solicitar a exclusão de suas informações pessoais</li>
                    <li><strong>Portabilidade:</strong> Receber seus dados em formato estruturado</li>
                    <li><strong>Oposição:</strong> Opor-se ao processamento de seus dados em certas circunstâncias</li>
                    <li><strong>Revogação:</strong> Revogar seu consentimento a qualquer momento</li>
                  </ul>
                  <p className="text-[#6B7280] leading-relaxed mt-4">
                    Para exercer esses direitos, entre em contato conosco através do e-mail: <a href="mailto:privacidade@wisedog.pro" className="text-[#1C8C58] hover:underline font-semibold">privacidade@wisedog.pro</a>
                  </p>
                </section>

                {/* Cookies */}
                <section className="bg-white rounded-2xl p-8 border-2 border-[#D4C4A8]/30 shadow-sm">
                  <h2 className="text-2xl font-bold text-[#2D2E29] mb-4">
                    7. Cookies e Tecnologias Similares
                  </h2>
                  <p className="text-[#6B7280] leading-relaxed mb-4">
                    Utilizamos cookies e tecnologias similares para melhorar sua experiência, analisar o uso do aplicativo e personalizar conteúdo. Você pode gerenciar suas preferências de cookies nas configurações do aplicativo.
                  </p>
                </section>

                {/* Retenção */}
                <section className="bg-white rounded-2xl p-8 border-2 border-[#D4C4A8]/30 shadow-sm">
                  <h2 className="text-2xl font-bold text-[#2D2E29] mb-4">
                    8. Retenção de Dados
                  </h2>
                  <p className="text-[#6B7280] leading-relaxed mb-4">
                    Mantemos suas informações pessoais apenas pelo tempo necessário para cumprir os propósitos descritos nesta política, a menos que um período de retenção mais longo seja exigido ou permitido por lei.
                  </p>
                </section>

                {/* Menores */}
                <section className="bg-white rounded-2xl p-8 border-2 border-[#D4C4A8]/30 shadow-sm">
                  <h2 className="text-2xl font-bold text-[#2D2E29] mb-4">
                    9. Privacidade de Menores
                  </h2>
                  <p className="text-[#6B7280] leading-relaxed mb-4">
                    O Wise Dog Pro não é destinado a menores de 18 anos. Não coletamos intencionalmente informações pessoais de menores. Se descobrirmos que coletamos informações de um menor, tomaremos medidas para excluir essas informações imediatamente.
                  </p>
                </section>

                {/* Alterações */}
                <section className="bg-white rounded-2xl p-8 border-2 border-[#D4C4A8]/30 shadow-sm">
                  <h2 className="text-2xl font-bold text-[#2D2E29] mb-4">
                    10. Alterações nesta Política
                  </h2>
                  <p className="text-[#6B7280] leading-relaxed mb-4">
                    Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos você sobre mudanças significativas publicando a nova política nesta página e atualizando a data de "Última atualização". Recomendamos que você revise esta política regularmente.
                  </p>
                </section>

                {/* Contato */}
                <section className="bg-gradient-to-br from-[#1C8C58]/5 to-[#5BA67B]/5 rounded-2xl p-8 border-2 border-[#1C8C58]/20 shadow-sm">
                  <h2 className="text-2xl font-bold text-[#2D2E29] mb-4 flex items-center gap-3">
                    <Mail className="w-6 h-6 text-[#1C8C58]" />
                    11. Contato
                  </h2>
                  <p className="text-[#6B7280] leading-relaxed mb-4">
                    Se você tiver dúvidas, preocupações ou solicitações relacionadas a esta Política de Privacidade ou ao tratamento de suas informações pessoais, entre em contato conosco:
                  </p>
                  <div className="space-y-2 text-[#6B7280]">
                    <p><strong className="text-[#2D2E29]">E-mail:</strong> <a href="mailto:privacidade@wisedog.pro" className="text-[#1C8C58] hover:underline font-semibold">privacidade@wisedog.pro</a></p>
                    <p><strong className="text-[#2D2E29]">Suporte:</strong> <a href="mailto:suporte@wisedog.pro" className="text-[#1C8C58] hover:underline font-semibold">suporte@wisedog.pro</a></p>
                  </div>
                </section>
              </div>
            </div>
          </Container>
        </section>
      </div>
      <FooterTapedDesign />
    </div>
  );
}

