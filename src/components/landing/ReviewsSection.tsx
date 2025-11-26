import React from "react";
import { Container } from "@/components/common/Container";
import { Section } from "@/components/common/Section";
import { Heading } from "@/components/common/Heading";
import { Card } from "@/components/common/Card";
import { REVIEWS } from "@/constants/data";

export const ReviewsSection: React.FC = () => {
  return (
    <Section id="reviews" background="light">
      <Container>
        <div className="text-center mb-20">
          <Heading>Tutores Amam Wise Dog Pro</Heading>
          <p className="text-base text-[#6B7280] mt-4">
            Mais de 2.500 avaliações positivas
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {REVIEWS.map((review, i) => (
            <Card key={i} hover className="p-7">
              <div className="flex gap-0.5 mb-5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="text-[#FBBF24] text-base">
                    ★
                  </span>
                ))}
              </div>
              <p className="text-sm text-[#2D2E29] mb-6 leading-relaxed">
                &quot;{review.text}&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#1C8C58] to-[#5BA67B] rounded-xl flex items-center justify-center text-2xl shadow-sm">
                  {review.emoji}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-sm text-[#2D2E29]">
                    {review.name}
                  </h4>
                  <p className="text-xs text-[#6B7280]">{review.location}</p>
                </div>
                <span className="bg-[#1C8C58]/8 text-[#1C8C58] text-[10px] px-2.5 py-1 rounded-lg font-medium border border-[#1C8C58]/15">
                  ✓
                </span>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
};

