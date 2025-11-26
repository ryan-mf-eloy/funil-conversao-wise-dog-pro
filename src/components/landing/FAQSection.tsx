import React from "react";
import { Container } from "@/components/common/Container";
import { Section } from "@/components/common/Section";
import { Heading } from "@/components/common/Heading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ_DATA } from "@/constants/data";

interface FAQSectionProps {
  onStartClick?: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onStartClick }) => {
  return (
    <Section id="faq" background="light">
      <Container size="md">
        <Heading>Perguntas Frequentes</Heading>
        <p className="text-base text-[#6B7280] text-center mb-16 mt-4">
          Removendo objeções e respondendo suas dúvidas
        </p>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {FAQ_DATA.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    <p className="text-sm text-[#2D2E29] leading-relaxed font-medium">
                      {faq.a}
                    </p>

                    {faq.details && faq.details.length > 0 && (
                      <ul className="space-y-1.5 ml-3">
                        {faq.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-[#FBBF24] mt-1 flex-shrink-0 text-xs font-bold">
                              •
                            </span>
                            <span className="text-xs text-[#6B7280] leading-relaxed">
                              {detail}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {faq.extra && (
                      <p className="text-sm text-[#2D2E29] leading-relaxed font-medium">
                        {faq.extra}
                      </p>
                    )}

                    {faq.note && (
                      <div className="bg-[#FBBF24]/20 border-l-4 border-[#FBBF24] p-3 rounded-r-lg">
                        <p className="text-xs text-[#2D2E29] leading-relaxed">
                          <span className="font-semibold text-black">
                            💡 Detalhe adicional:
                          </span>{" "}
                          {faq.note}
                        </p>
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Container>
    </Section>
  );
};
