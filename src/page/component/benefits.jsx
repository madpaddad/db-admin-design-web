export default function BenefitCard({ benefit }) {
    return (
      <div className="text-center">
        <div className="bg-white text-green-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          {benefit.icon}
        </div>
        <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
        <p>{benefit.description}</p>
      </div>
    );
  }