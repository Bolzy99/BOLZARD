const TermsOfServicePage = () => {
  return (
    // 1. This wrapper lifts the content in front of the particle background
    <div className="relative z-10">
      {/* 2. This container is now transparent to let the background show through */}
      <div className="text-white min-h-screen">
        <div className="max-w-4xl mx-auto py-24 px-6">
          {/* 3. The heading now has the brand's gradient color */}
          <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-500 to-cyan-400 text-transparent bg-clip-text">
            Terms of Service
          </h1>
          <p className="text-slate-400 mb-8">Last updated: September 19, 2025</p>

          <div className="space-y-6 text-slate-300 leading-relaxed">
            <h2 className="text-2xl font-semibold pt-4">1. Acceptance of Terms</h2>
            <p>
              By accessing and using the services provided by BOLZARD ("Service"), you accept and agree to be bound by the terms and provision of this agreement.
            </p>

            <h2 className="text-2xl font-semibold pt-4">2. Service Description</h2>
            <p>
              Our Service provides AI automation solutions for businesses. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. We reserve the right to modify, suspend, or discontinue the Service at any time without notice.
            </p>

            <h2 className="text-2xl font-semibold pt-4">3. User Responsibilities</h2>
            <p>
              You are responsible for your use of the Service and for any consequences thereof. You are responsible for safeguarding any passwords or credentials used to access the Service.
            </p>

            <h2 className="text-2xl font-semibold pt-4">4. Limitation of Liability</h2>
            <p>
              In no event shall BOLZARD, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;
