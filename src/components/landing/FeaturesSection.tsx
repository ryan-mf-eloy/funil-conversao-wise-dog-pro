import React from "react";
import { Container } from "@/components/common/Container";
import { Section } from "@/components/common/Section";
import { Heading } from "@/components/common/Heading";
import { Card } from "@/components/common/Card";
import { FEATURES } from "@/constants/data";

export const FeaturesSection: React.FC = () => {
  return (
    <Section background="white">
      <Container>
        <div className="text-center mb-20">
          <Heading>Tudo que Você Precisa</Heading>
          <p className="text-base text-[#6B7280] mt-4">
            Ferramentas completas para treinar seu cão
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((feature, i) => (
            <Card key={i} hover className="flex gap-3 p-5">
              <div className="text-3xl">{feature.icon}</div>
              <div>
                <h3 className="font-semibold text-sm text-[#2D2E29] mb-0.5">
                  {feature.title}
                </h3>
                <p className="text-xs text-[#6B7280]">{feature.desc}</p>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
};

