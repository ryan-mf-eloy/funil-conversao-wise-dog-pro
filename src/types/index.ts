export type Section = "landing" | "quiz" | "journey-generation" | "paywall" | "cadastro" | "confirmation";

export interface FAQItem {
  q: string;
  a: string;
  details?: string[];
  extra?: string;
  note?: string;
}

export interface QuizData {
  name?: string;
  gender?: string;
  birthday?: string;
  breed?: string;
  health?: string[];
  healthNotes?: string;
  personality?: string[];
  special?: string;
  challenge?: string[];
  time?: string;
  housingType?: string;
  otherPeople?: string;
  plan?: string;
}

export interface Stat {
  number: string;
  label: string;
}

export interface Benefit {
  emoji: string;
  title: string;
  desc: string;
  tag: string;
}

export interface Step {
  num: string;
  emoji: string;
  title: string;
  time: string;
  desc: string;
}

export interface Review {
  emoji: string;
  name: string;
  location: string;
  text: string;
  image?: string;
  role?: string;
}

export interface Feature {
  icon: string;
  title: string;
  desc: string;
}

export interface Plan {
  name: string;
  price: string;
  period: string;
  pricePerMonth?: string;
  features: string[];
  badge?: string;
  highlighted?: boolean;
}

