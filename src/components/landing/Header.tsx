import React from "react";
import { Header as CommonHeader } from "@/components/common/Header";

interface HeaderProps {
  onStartClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onStartClick }) => {
  return <CommonHeader onStartClick={onStartClick} />;
};

