const PrivacyPolicyPage = () => {
  return (
    // 1. This wrapper lifts the content in front of the particle background
    <div className="relative z-10">
      {/* 2. This container is now transparent to let the background show through */}
      <div className="text-white min-h-screen">
        <div className="max-w-4xl mx-auto py-24 px-6">
          {/* 3. The heading now has the brand's gradient color */}
          <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-500 to-cyan-400 text-transparent bg-clip-text">
            Privacy Policy
          </h1>
          <p className="text-slate-400 mb-8">Last updated: September 19, 2025</p>

          <div className="space-y-6 text-slate-300 leading-relaxed">
            <p>
              It is BOLZARD's policy to respect your privacy regarding any information we may collect while operating our website. This Privacy Policy applies to bolzard.com (hereinafter, "us", "we", or "bolzard.com"). We respect your privacy and are committed to protecting personally identifiable information you may provide us through the Website.
            </p>

            <h2 className="text-2xl font-semibold pt-4">1. Information We Collect</h2>
            <p>
              We only collect information about you if we have a reason to do so–for example, to provide our Services, to communicate with you, or to make our Services better.
            </p>
            <p>
              <strong>Information You Provide to Us:</strong> We collect information that you provide to us directly. For example, we collect information when you fill out a form, request customer support, or otherwise communicate with us. The types of information we may collect include your name, email address, and any other information you choose to provide.
            </p>

            <h2 className="text-2xl font-semibold pt-4">2. How We Use Information</h2>
            <p>
              We use the information we collect to provide, maintain, and improve our services. We may also use the information to send you technical notices, updates, and support messages, and to respond to your comments and requests.
            </p>

            <h2 className="text-2xl font-semibold pt-4">3. Data Security</h2>
            <p>
              The security of your Personal Information is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Information, we cannot guarantee its absolute security.
            </p>

            <h2 className="text-2xl font-semibold pt-4">4. Changes to This Privacy Policy</h2>
            <p>
              Although most changes are likely to be minor, BOLZARD may change its Privacy Policy from time to time. We encourage visitors to frequently check this page for any changes. Your continued use of this site after any change in this Privacy Policy will constitute your acceptance of such change.
            </p>

            <h2 className="text-2xl font-semibold pt-4">5. Contact Information</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us via the form on our booking page.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
