'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is Defi Portfolio Analytics?",
    answer: "A comprehensive platform that helps you track, analyze, and optimize your DeFi investments across multiple chains and protocols in real-time."
  },
  {
    question: "Which chains are supported?",
    answer: "We support major chains including Ethereum, Polygon, Binance Smart Chain, Arbitrum, and Optimism, with more being added regularly."
  },
  {
    question: "Is there a mobile app available?",
    answer: "Yes, we offer both web and mobile applications to help you track your portfolio on the go."
  },
  {
    question: "How do you ensure data accuracy?",
    answer: "We fetch data directly from on-chain sources and reliable price oracles, ensuring real-time accuracy of all portfolio metrics."
  }
];

export function FAQ() {
  return (
    <section className="flex justify-center py-20 w-full">
      <div className="text-center max-w-2xl px-4">
        <h2 className="text-3xl font-semibold mb-10">Frequently asked questions</h2>
        <Accordion type="single" collapsible className="w-full text-left">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent>
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
} 