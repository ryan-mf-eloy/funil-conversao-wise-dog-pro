"use client";

import React from "react";
import { Header } from "@/components/common/Header";
import { FooterTapedDesign } from "@/components/ui/footer-taped-design";
import { Container } from "@/components/common/Container";
import { FileText, Scale, AlertTriangle, CreditCard, Shield, Mail } from "lucide-react";

export default function TermosCondicoesPage() {
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
                  <Scale className="w-4 h-4" />
                  Termos Legais
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2D2E29] mb-4">
                  Termos e Condições de Uso
                </h1>
                <p className="text-lg text-[#6B7280] max-w-2xl mx-auto">
                  Última atualização: {new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
              </div>

              {/* Content */}
              <div className="prose prose-lg max-w-none space-y-8">
                {/* Aceitação */}
                <section className="bg-white rounded-2xl p-8 border-2 border-[#D4C4A8]/30 shadow-sm">
                  <h2 className="text-2xl font-bold text-[#2D2E29] mb-4 flex items-center gap-3">
                    <FileText className="w-6 h-6 text-[#1C8C58]" />
                    1. Aceitação dos Termos
                  </h2>
                  <p className="text-[#6B7280] leading-relaxed mb-4">
                    Ao acessar e usar o aplicativo Wise Dog Pro ("Aplicativo", "Serviço"), você concorda em cumprir e estar vinculado a estes Termos e Condições de Uso ("Termos"). Se você não concordar com qualquer parte destes termos, não deve usar nosso aplicativo.
                  </p>
                  <p className="text-[#6B7280] leading-relaxed">
                    Estes Termos constituem um acordo legal entre você e a Wise Dog Pro. Recomendamos que você leia cuidadosamente estes Termos antes de usar o Aplicativo.
                  </p>
                </section>

                {/* Descrição do Serviço */}
                <section className="bg-white rounded-2xl p-8 border-2 border-[#D4C4A8]/30 shadow-sm">
                  <h2 className="text-2xl font-bold text-[#2D2E29] mb-4">
                    2. Descrição do Serviço
                  </h2>
                  <p className="text-[#6B7280] leading-relaxed mb-4">
                    O Wise Dog Pro é um aplicativo móvel de adestramento canino que oferece:
                  </p>
                  <ul className="list-disc list-inside text-[#6B7280] space-y-2 ml-4">
                    <li>Jornada personalizada de treinamento gerada por inteligência artificial</li>
                    <li>Chat com assistente de IA especializado em cães 24/7</li>
                    <li>Lições de treinamento interativas e educativas</li>
                    <li>Calendário de saúde e atividades</li>
                    <li>Ferramentas profissionais (clicker, apito, timer)</li>
                    <li>Sistema de gamificação e conquistas</li>
                  </ul>
                </section>

                {/* Cadastro e Conta */}
                <section className="bg-white rounded-2xl p-8 border-2 border-[#D4C4A8]/30 shadow-sm">
                  <h2 className="text-2xl font-bold text-[#2D2E29] mb-4">
                    3. Cadastro e Conta de Usuário
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold text-[#2D2E29] mb-2">3.1. Elegibilidade</h3>
                      <p className="text-[#6B7280] leading-relaxed">
                        Você deve ter pelo menos 18 anos de idade para usar o Aplicativo. Ao se cadastrar, você declara e garante que tem idade legal para celebrar este acordo.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-[#2D2E29] mb-2">3.2. Informações da Conta</h3>
                      <p className="text-[#6B7280] leading-relaxed mb-2">
                        Você é responsável por:
                      </p>
                      <ul className="list-disc list-inside text-[#6B7280] space-y-2 ml-4">
                        <li>Fornecer informações precisas, completas e atualizadas</li>
                        <li>Manter a segurança de sua senha e conta</li>
                        <li>Notificar-nos imediatamente sobre qualquer uso não autorizado</li>
                        <li>Ser responsável por todas as atividades que ocorrem em sua conta</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Assinaturas e Pagamentos */}
                <section className="bg-white rounded-2xl p-8 border-2 border-[#D4C4A8]/30 shadow-sm">
                  <h2 className="text-2xl font-bold text-[#2D2E29] mb-4 flex items-center gap-3">
                    <CreditCard className="w-6 h-6 text-[#1C8C58]" />
                    4. Assinaturas e Pagamentos
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold text-[#2D2E29] mb-2">4.1. Planos de Assinatura</h3>
                      <p className="text-[#6B7280] leading-relaxed mb-2">
                        O Wise Dog Pro oferece planos de assinatura (Mensal e Anual) que fornecem acesso a recursos premium. Detalhes dos planos, preços e recursos estão disponíveis no aplicativo.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-[#2D2E29] mb-2">4.2. Período de Teste</h3>
                      <p className="text-[#6B7280] leading-relaxed">
                        Oferecemos um período de teste gratuito de 7 dias. Após o período de teste, sua assinatura será renovada automaticamente, a menos que você cancele antes do término do período de teste.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-[#2D2E29] mb-2">4.3. Renovação Automática</h3>
                      <p className="text-[#6B7280] leading-relaxed">
                        As assinaturas são renovadas automaticamente no final de cada período de cobrança. Você será cobrado na data de renovação, a menos que cancele antes.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-[#2D2E29] mb-2">4.4. Cancelamento</h3>
                      <p className="text-[#6B7280] leading-relaxed mb-2">
                        Você pode cancelar sua assinatura a qualquer momento através das configurações do aplicativo ou entrando em contato conosco. O cancelamento entrará em vigor no final do período de cobrança atual.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-[#2D2E29] mb-2">4.5. Reembolsos</h3>
                      <p className="text-[#6B7280] leading-relaxed">
                        Reembolsos são avaliados caso a caso. Em geral, não oferecemos reembolsos para assinaturas já utilizadas, exceto conforme exigido por lei.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Uso Aceitável */}
                <section className="bg-white rounded-2xl p-8 border-2 border-[#D4C4A8]/30 shadow-sm">
                  <h2 className="text-2xl font-bold text-[#2D2E29] mb-4 flex items-center gap-3">
                    <AlertTriangle className="w-6 h-6 text-[#1C8C58]" />
                    5. Uso Aceitável
                  </h2>
                  <p className="text-[#6B7280] leading-relaxed mb-4">
                    Você concorda em usar o Aplicativo apenas para fins legais e de acordo com estes Termos. Você não deve:
                  </p>
                  <ul className="list-disc list-inside text-[#6B7280] space-y-2 ml-4">
                    <li>Usar o Aplicativo de forma que viole qualquer lei ou regulamento</li>
                    <li>Violar ou tentar violar a segurança do Aplicativo</li>
                    <li>Acessar contas de outros usuários sem autorização</li>
                    <li>Interferir ou interromper o funcionamento do Aplicativo</li>
                    <li>Usar bots, scripts ou métodos automatizados para acessar o Aplicativo</li>
                    <li>Copiar, modificar, distribuir ou criar trabalhos derivados do Aplicativo</li>
                    <li>Remover ou alterar avisos de direitos autorais ou propriedade</li>
                    <li>Usar o Aplicativo para transmitir conteúdo ofensivo, difamatório ou ilegal</li>
                  </ul>
                </section>

                {/* Propriedade Intelectual */}
                <section className="bg-white rounded-2xl p-8 border-2 border-[#D4C4A8]/30 shadow-sm">
                  <h2 className="text-2xl font-bold text-[#2D2E29] mb-4">
                    6. Propriedade Intelectual
                  </h2>
                  <p className="text-[#6B7280] leading-relaxed mb-4">
                    Todo o conteúdo do Aplicativo, incluindo mas não limitado a textos, gráficos, logos, ícones, imagens, clipes de áudio, downloads digitais e software, é propriedade da Wise Dog Pro ou de seus fornecedores de conteúdo e está protegido por leis de direitos autorais, marcas registradas e outras leis de propriedade intelectual.
                  </p>
                  <p className="text-[#6B7280] leading-relaxed">
                    Você recebe uma licença limitada, não exclusiva e não transferível para usar o Aplicativo apenas para seus fins pessoais e não comerciais.
                  </p>
                </section>

                {/* Limitação de Responsabilidade */}
                <section className="bg-white rounded-2xl p-8 border-2 border-[#D4C4A8]/30 shadow-sm">
                  <h2 className="text-2xl font-bold text-[#2D2E29] mb-4">
                    7. Limitação de Responsabilidade
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold text-[#2D2E29] mb-2">7.1. Aviso Médico</h3>
                      <p className="text-[#6B7280] leading-relaxed">
                        O Wise Dog Pro fornece informações educacionais sobre adestramento canino. NÃO substitui o conselho veterinário profissional. Sempre consulte um veterinário qualificado para questões de saúde do seu pet.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-[#2D2E29] mb-2">7.2. Resultados Não Garantidos</h3>
                      <p className="text-[#6B7280] leading-relaxed">
                        Embora nos esforcemos para fornecer conteúdo de alta qualidade, não garantimos resultados específicos de treinamento. O sucesso do treinamento depende de vários fatores, incluindo a raça, idade, temperamento do cão e consistência do tutor.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-[#2D2E29] mb-2">7.3. Limitação Geral</h3>
                      <p className="text-[#6B7280] leading-relaxed">
                        Na medida máxima permitida por lei, a Wise Dog Pro não será responsável por danos diretos, indiretos, incidentais, especiais ou consequenciais resultantes do uso ou incapacidade de usar o Aplicativo.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Inteligência Artificial */}
                <section className="bg-white rounded-2xl p-8 border-2 border-[#D4C4A8]/30 shadow-sm">
                  <h2 className="text-2xl font-bold text-[#2D2E29] mb-4">
                    8. Inteligência Artificial
                  </h2>
                  <p className="text-[#6B7280] leading-relaxed mb-4">
                    O Wise Dog Pro utiliza inteligência artificial para gerar conteúdo personalizado e fornecer assistência. Você reconhece que:
                  </p>
                  <ul className="list-disc list-inside text-[#6B7280] space-y-2 ml-4">
                    <li>O conteúdo gerado por IA é fornecido "como está" e pode conter imprecisões</li>
                    <li>Você deve usar seu próprio julgamento ao seguir recomendações geradas por IA</li>
                    <li>A Wise Dog Pro não se responsabiliza por decisões tomadas com base em conteúdo gerado por IA</li>
                    <li>Dados podem ser processados por terceiros (provedores de IA) conforme suas políticas de privacidade</li>
                  </ul>
                </section>

                {/* Modificações do Serviço */}
                <section className="bg-white rounded-2xl p-8 border-2 border-[#D4C4A8]/30 shadow-sm">
                  <h2 className="text-2xl font-bold text-[#2D2E29] mb-4">
                    9. Modificações do Serviço
                  </h2>
                  <p className="text-[#6B7280] leading-relaxed">
                    Reservamo-nos o direito de modificar, suspender ou descontinuar qualquer parte do Aplicativo a qualquer momento, com ou sem aviso prévio. Não seremos responsáveis perante você ou terceiros por qualquer modificação, suspensão ou descontinuação do Aplicativo.
                  </p>
                </section>

                {/* Rescisão */}
                <section className="bg-white rounded-2xl p-8 border-2 border-[#D4C4A8]/30 shadow-sm">
                  <h2 className="text-2xl font-bold text-[#2D2E29] mb-4">
                    10. Rescisão
                  </h2>
                  <p className="text-[#6B7280] leading-relaxed mb-4">
                    Podemos encerrar ou suspender sua conta e acesso ao Aplicativo imediatamente, sem aviso prévio, por qualquer motivo, incluindo se você violar estes Termos. Após a rescisão, seu direito de usar o Aplicativo cessará imediatamente.
                  </p>
                </section>

                {/* Lei Aplicável */}
                <section className="bg-white rounded-2xl p-8 border-2 border-[#D4C4A8]/30 shadow-sm">
                  <h2 className="text-2xl font-bold text-[#2D2E29] mb-4">
                    11. Lei Aplicável
                  </h2>
                  <p className="text-[#6B7280] leading-relaxed">
                    Estes Termos serão regidos e interpretados de acordo com as leis do Brasil, sem dar efeito a qualquer princípio de conflitos de leis.
                  </p>
                </section>

                {/* Alterações dos Termos */}
                <section className="bg-white rounded-2xl p-8 border-2 border-[#D4C4A8]/30 shadow-sm">
                  <h2 className="text-2xl font-bold text-[#2D2E29] mb-4">
                    12. Alterações dos Termos
                  </h2>
                  <p className="text-[#6B7280] leading-relaxed">
                    Podemos revisar estes Termos a qualquer momento, atualizando esta página. É sua responsabilidade revisar periodicamente estes Termos. O uso continuado do Aplicativo após qualquer alteração constitui sua aceitação dos novos Termos.
                  </p>
                </section>

                {/* Contato */}
                <section className="bg-gradient-to-br from-[#1C8C58]/5 to-[#5BA67B]/5 rounded-2xl p-8 border-2 border-[#1C8C58]/20 shadow-sm">
                  <h2 className="text-2xl font-bold text-[#2D2E29] mb-4 flex items-center gap-3">
                    <Mail className="w-6 h-6 text-[#1C8C58]" />
                    13. Contato
                  </h2>
                  <p className="text-[#6B7280] leading-relaxed mb-4">
                    Se você tiver dúvidas sobre estes Termos e Condições, entre em contato conosco:
                  </p>
                  <div className="space-y-2 text-[#6B7280]">
                    <p><strong className="text-[#2D2E29]">E-mail:</strong> <a href="mailto:legal@wisedog.pro" className="text-[#1C8C58] hover:underline font-semibold">legal@wisedog.pro</a></p>
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

