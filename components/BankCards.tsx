import Image from "next/image";

export default function BankCards() {
  const cards = [
    {
      id: 1,
      title: "Secure Transactions",
      description:
        "Experience safe and secure banking transactions with advanced encryption.",
      image: "/assets/card1.jpg",
      link: "#",
    },
    {
      id: 2,
      title: "Easy Account Management",
      description:
        "Manage your bank accounts effortlessly with our user-friendly interface.",
      image: "/assets/card2.jpg",
      link: "#",
    },
    {
      id: 3,
      title: "24/7 Customer Support",
      description:
        "Our dedicated support team is available round-the-clock for your assistance.",
      image: "/assets/card3.jpg",
      link: "#",
    },
  ];

  return (
    <div className="space-y-6 px-4 md:px-0 my-8">
      {cards.map((card, index) => (
        <a
          key={card.id}
          href={card.link}
          className="flex flex-col md:flex-row items-center bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          {/* Conditional flex row direction for alternating image positions */}
          <div className={`flex ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center w-full`}>
            <Image
              className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
              src={card.image}
              alt={card.title}
              width={500}
              height={200}
            />
            <div className="flex flex-col justify-between p-4 leading-normal">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {card.title}
              </h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {card.description}
              </p>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
