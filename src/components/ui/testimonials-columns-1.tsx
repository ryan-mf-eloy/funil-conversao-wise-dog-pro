"use client";

import React from "react";
import { motion } from "motion/react";

interface Testimonial {
  text: string;
  image?: string;
  name: string;
  role?: string;
  emoji?: string;
}

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        initial={{ translateY: 0 }}
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        style={{ willChange: "transform" }}
        className="flex flex-col gap-6 pb-6 bg-transparent"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(
                ({ text, image, name, role, emoji }, i) => (
                  <div
                    className="p-10 rounded-3xl border shadow-lg shadow-primary/10 max-w-xs w-full"
                    key={`${index}-${i}`}
                  >
                    <div>{text}</div>
                    <div className="flex items-center gap-2 mt-5">
                      {image ? (
                        <img
                          width={40}
                          height={40}
                          src={image}
                          alt={name}
                          className="h-10 w-10 rounded-full"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#1C8C58] to-[#5BA67B] flex items-center justify-center text-lg">
                          {emoji || "🐕"}
                        </div>
                      )}
                      <div className="flex flex-col">
                        <div className="font-medium tracking-tight leading-5">
                          {name}
                        </div>
                        {role && (
                          <div className="leading-5 opacity-60 tracking-tight">
                            {role}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              )}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};
