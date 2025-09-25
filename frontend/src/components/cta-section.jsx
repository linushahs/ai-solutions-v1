function CTASection() {
  return (
    <section className="bg-gray-900 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold mb-6">
          Ready to Transform Your Digital Experience?
        </h2>
        <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
          Join leading companies worldwide who trust AI Solutions to accelerate
          their innovation and enhance employee productivity.
        </p>
        <div className="flex justify-center space-x-4">
          <button className="bg-white text-gray-900 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold">
            Start Free Trial
          </button>
          <button className="border border-gray-600 text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors">
            Contact Sales
          </button>
        </div>
      </div>
    </section>
  );
}

export default CTASection;
