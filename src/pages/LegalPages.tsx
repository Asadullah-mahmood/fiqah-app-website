import React, { useEffect } from 'react';

const PRIVACY_POLICY_URL = 'https://fiqah.rustinnovations.com/privacy';
const PRIVACY_POLICY_TITLE =
  'Privacy Policy | Fiqah App | Rust Innovations';
const PRIVACY_POLICY_DESCRIPTION =
  'Read how the Fiqah App by Rust Innovations handles account, location, notification, and other personal information.';

export const PrivacyPolicyPage: React.FC = () => {
  useEffect(() => {
    document.title = PRIVACY_POLICY_TITLE;

    const setMetaContent = (
      attribute: 'name' | 'property',
      key: string,
      content: string
    ) => {
      let element = document.head.querySelector<HTMLMetaElement>(
        `meta[${attribute}="${key}"]`
      );
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
      }
      element.content = content;
    };

    setMetaContent(
      'name',
      'description',
      PRIVACY_POLICY_DESCRIPTION
    );
    setMetaContent('name', 'author', 'Rust Innovations');
    setMetaContent('name', 'robots', 'index, follow');
    setMetaContent('property', 'og:title', PRIVACY_POLICY_TITLE);
    setMetaContent(
      'property',
      'og:description',
      PRIVACY_POLICY_DESCRIPTION
    );
    setMetaContent('property', 'og:url', PRIVACY_POLICY_URL);
    setMetaContent('property', 'og:type', 'website');
    setMetaContent('name', 'twitter:title', PRIVACY_POLICY_TITLE);
    setMetaContent(
      'name',
      'twitter:description',
      PRIVACY_POLICY_DESCRIPTION
    );
    setMetaContent('name', 'twitter:url', PRIVACY_POLICY_URL);

    const canonical = document.head.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]'
    );
    if (canonical) canonical.href = PRIVACY_POLICY_URL;

    let structuredData = document.head.querySelector<HTMLScriptElement>(
      '#privacy-policy-json-ld'
    );
    if (!structuredData) {
      structuredData = document.createElement('script');
      structuredData.id = 'privacy-policy-json-ld';
      structuredData.type = 'application/ld+json';
      document.head.appendChild(structuredData);
    }
    structuredData.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: PRIVACY_POLICY_TITLE,
      description: PRIVACY_POLICY_DESCRIPTION,
      url: PRIVACY_POLICY_URL,
      dateModified: '2026-11-16',
      inLanguage: 'en',
      publisher: {
        '@type': 'Organization',
        name: 'Rust Innovations',
        url: 'https://www.rustinnovations.com',
      },
    });
  }, []);

  return (
    <main className="mx-auto max-w-[960px] bg-[#FFFFFF] px-4 py-10 sm:px-6 lg:px-8">
      <article className="rounded-[8px] border border-[#1B5E20]/20 bg-[#FFFFFF] p-6 sm:p-10">
        <a
          href="/"
          className="text-sm font-semibold text-[#1B5E20] hover:underline"
        >
          ← Fiqah home
        </a>
        <p className="mt-8 text-xs font-semibold tracking-wide text-[#1B5E20]">
          Effective Date: November 16, 2026
        </p>
        <h1 className="font-display mt-2 text-3xl font-bold text-[#1A1A1A] sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-[#4A554C]">
          <strong>Application:</strong> Fiqah App
          <br />
          <strong>Developer:</strong> Rust Innovations
          <br />
          <strong>Website:</strong>{' '}
          <a
            className="font-semibold text-[#1B5E20] underline underline-offset-2"
            href="https://www.rustinnovations.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            www.rustinnovations.com
          </a>
        </p>
        <section
          id="introduction"
          className="mt-8 border-t border-[#1B5E20]/15 pt-6"
        >
          <h2 className="font-display text-2xl font-bold text-[#1A1A1A]">
            1. Introduction
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[#4A554C]">
            Welcome to the Fiqah App, developed and maintained by Rust
            Innovations. We respect your privacy and are committed to
            protecting your personal information. The application provides
            Islamic guidance, religious resources, prayer times, reminders, and
            related services while aiming to collect only information needed to
            operate and improve the application. This Privacy Policy explains
            what information may be processed, how it is used, and the choices
            available to you. By using our application, you agree to the
            practices described here.
          </p>
        </section>

        <nav
          aria-label="Privacy policy contents"
          className="mt-7 rounded-[8px] bg-[#F7FAF7] p-5"
        >
          <h2 className="text-sm font-semibold text-[#1A1A1A]">In this policy</h2>
          <ul className="mt-3 grid gap-2 text-sm text-[#1B5E20] sm:grid-cols-2">
            {[
              ['introduction', 'Introduction'],
              ['information', 'Information we collect'],
              ['use', 'How we use your information'],
              ['sharing', 'Data sharing and third parties'],
              ['children', 'Children’s privacy'],
              ['security', 'Data security'],
              ['retention', 'Data retention and deletion'],
              ['choices', 'Privacy choices and permissions'],
              ['offline', 'Offline functionality'],
              ['international', 'International users'],
              ['changes', 'Policy changes'],
              ['contact', 'Contact information'],
            ].map(([id, label]) => (
              <li key={id}>
                <a className="hover:underline" href={`#${id}`}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-8 space-y-8 divide-y divide-[#1B5E20]/15 text-sm leading-relaxed text-[#4A554C]">
          <section id="information" className="pt-6 first:pt-0">
            <h2 className="font-display text-2xl font-bold text-[#1A1A1A]">
              2. Information We Collect
            </h2>
            <p className="mt-2 mb-6">
              We aim to minimize personal data collection. Depending on the
              features you use, the application may process the following
              information:
            </p>
            <h3 className="mt-5 text-lg font-semibold text-[#1A1A1A]">
              2.1 Authentication Information
            </h3>
            <p className="mt-2 mb-6">
              The application supports OAuth-based sign-in. When you use a
              supported authentication provider, we may receive limited account
              information, such as:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Unique account identifier.</li>
              <li>Email address, if provided by the authentication provider.</li>
              <li>Display name, if available.</li>
              <li>Profile image, if provided.</li>
            </ul>
            <p className="mt-2 mb-6">
              We use this information for authentication, account management,
              and personalized application services. We do not collect or store
              your authentication provider’s password.
            </p>
            <h3 className="mt-5 text-lg font-semibold text-[#1A1A1A]">
              2.2 Location Information
            </h3>
            <p className="mt-2 mb-6">
              The application may request your device’s location to provide
              location-based Islamic services, including accurate local prayer
              times, prayer time calculations, and related features. Location
              access is requested only when required for these features. You
              can control or revoke permission in your device settings. Without
              it, some location-dependent features may be unavailable or less
              accurate. Continuous location tracking is not required for
              ordinary prayer time functionality.
            </p>
            <h3 className="mt-5 text-lg font-semibold text-[#1A1A1A]">
              2.3 Notification Permissions
            </h3>
            <p className="mt-2 mb-6">
              The application may request notification permission for daily
              prayer reminders, Fajr, Dhuhr, Asr, Maghrib, and Isha notifications,
              Islamic event and user-configured reminders, and important
              application announcements where enabled. You can disable
              notifications through your device settings.
            </p>
            <h3 className="mt-5 text-lg font-semibold text-[#1A1A1A]">
              2.4 Background and Alarm Permissions
            </h3>
            <p className="mt-2 mb-6">
              Certain Android devices require background execution capabilities
              or alarm scheduling permissions to deliver scheduled prayer
              alarms and reminders when the application is not open. These
              permissions support reminder functionality and are not used to
              continuously monitor your activities or track your location.
            </p>
          </section>

          <section id="use" className="pt-6">
            <h2 className="font-display text-2xl font-bold text-[#1A1A1A]">
              3. How We Use Your Information
            </h2>
            <p className="mt-2 mb-6">
              Information processed by the application may be used to provide
              secure OAuth authentication, display local prayer times, schedule
              prayer alarms and notifications, save user preferences and
              settings, provide personalized Islamic services, maintain
              application functionality and security, and diagnose technical
              issues and improve performance. We do not sell users’ personal
              information.
            </p>
          </section>

          <section id="sharing" className="pt-6">
            <h2 className="font-display text-2xl font-bold text-[#1A1A1A]">
              4. Data Sharing and Third-Party Services
            </h2>
            <p className="mt-2 mb-6">
              We may rely on trusted third-party services to operate
              application features. These may include:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                <strong>Google OAuth:</strong> secure account authentication.
              </li>
              <li>
                <strong>Firebase Authentication:</strong> account authentication
                and management, where applicable.
              </li>
              <li>
                <strong>Firebase Services:</strong> application infrastructure
                and data storage, where applicable.
              </li>
              <li>
                <strong>Google Play Services:</strong> Android functionality
                and location-related services, where applicable.
              </li>
            </ul>
            <p className="mt-2 mb-6">
              These providers may process information under their own privacy
              policies and applicable data protection requirements. We do not
              sell or rent personal information to third parties for
              advertising purposes.
            </p>
          </section>

          <section id="children" className="pt-6">
            <h2 className="font-display text-2xl font-bold text-[#1A1A1A]">
              5. Children’s Privacy and Age Restrictions
            </h2>
            <p className="mt-2 mb-6">
              The Fiqah App is intended to be accessible to users of all
              ages and does not impose a minimum age restriction. We do not
              knowingly request unnecessary personal information from children.
              Information processed through authentication or application
              functionality is limited to what is needed to provide requested
              services. Parents or guardians with concerns about information
              associated with a child’s account may contact us using the details
              below.
            </p>
          </section>

          <section id="security" className="pt-6">
            <h2 className="font-display text-2xl font-bold text-[#1A1A1A]">
              6. Data Security
            </h2>
            <p className="mt-2 mb-6">
              Rust Innovations takes reasonable technical and organizational
              measures to protect information processed through the
              application. These measures may include:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Secure authentication mechanisms.</li>
              <li>Encrypted network communication where supported.</li>
              <li>Access controls.</li>
              <li>Secure backend infrastructure.</li>
              <li>Protection against unauthorized access.</li>
            </ul>
            <p className="mt-2">
              No electronic storage system or internet transmission can be
              guaranteed to be completely secure.
            </p>
          </section>

          <section id="retention" className="pt-6">
            <h2 className="font-display text-2xl font-bold text-[#1A1A1A]">
              7. Data Retention and Deletion
            </h2>
            <p className="mt-2 mb-6">
              We retain personal information only as long as needed to provide
              application services, maintain account functionality, and meet
              applicable legal obligations. You may request deletion of your
              account and associated personal data by contacting us. Signing
              out and uninstalling the application does not automatically delete
              information stored on our servers.
            </p>
          </section>

          <section id="choices" className="pt-6">
            <h2 className="font-display text-2xl font-bold text-[#1A1A1A]">
              8. User Privacy Choices and Permissions
            </h2>
            <p className="mt-2">
              You remain in control of the permissions granted to the
              application. You can:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Sign out of your authenticated account.</li>
              <li>Revoke location access.</li>
              <li>Disable notification permissions.</li>
              <li>
                Manage alarm and background permissions through your device
                settings.
              </li>
              <li>Request deletion of your account and associated information.</li>
            </ul>
            <p className="mt-2 mb-6">
              Some application features may become unavailable if required
              permissions are disabled.
            </p>
          </section>

          <section id="offline" className="pt-6">
            <h2 className="font-display text-2xl font-bold text-[#1A1A1A]">
              9. Offline Functionality
            </h2>
            <p className="mt-2 mb-6">
              Certain Islamic resources and application features may be
              available offline. Information stored locally on your device may
              remain available until you clear the application’s data or
              uninstall it. Offline information may not automatically
              synchronize with online services.
            </p>
          </section>

          <section id="international" className="pt-6">
            <h2 className="font-display text-2xl font-bold text-[#1A1A1A]">
              10. International Users
            </h2>
            <p className="mt-2 mb-6">
              The application may be used around the world. Depending on the
              services and infrastructure used, information may be processed
              or stored in countries other than your country of residence. We
              take reasonable steps to handle personal information in
              accordance with applicable privacy and data protection laws.
            </p>
          </section>

          <section id="changes" className="pt-6">
            <h2 className="font-display text-2xl font-bold text-[#1A1A1A]">
              11. Changes to This Privacy Policy
            </h2>
            <p className="mt-2 mb-6">
              Rust Innovations may update this policy when application
              features, services, or legal requirements change. Updated
              versions will be published through the application or on the
              official website and will include a revised effective date.
            </p>
          </section>

          <section id="contact" className="pt-6">
            <h2 className="font-display text-2xl font-bold text-[#1A1A1A]">
              12. Contact Information
            </h2>
            <p className="mt-2">
              For questions, concerns, account information, or data deletion
              requests, contact us:
            </p>
            <ul className="mt-2 space-y-1">
              <li>
                <strong>Developer:</strong> Rust Innovations
              </li>
              <li>
                <strong>Application:</strong> Fiqah App
              </li>
              <li>
                <strong>Website:</strong>{' '}
                <a
                  className="font-semibold text-[#1B5E20] underline underline-offset-2"
                  href="https://www.rustinnovations.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  www.rustinnovations.com
                </a>
              </li>
              <li>
                <strong>Email:</strong>{' '}
                <a
                  className="font-semibold text-[#1B5E20] underline underline-offset-2"
                  href="mailto:support@fiqah.rustinnovations.com"
                >
                  support@fiqah.rustinnovations.com
                </a>
              </li>
            </ul>
          </section>
         
        </div>
      </article>
    </main>
  );
};

export const DeleteAccountPage: React.FC = () => {
  return (
    <main className="mx-auto max-w-[760px] bg-[#FFFFFF] px-4 py-10 sm:px-6 lg:px-8">
      <article className="rounded-[8px] border border-[#1B5E20]/20 bg-[#FFFFFF] p-6 sm:p-10">
        <p className="text-xs font-semibold tracking-wide text-[#1B5E20]">
          Account Management
        </p>
        <h1 className="font-display mt-2 text-3xl font-bold text-[#1A1A1A] sm:text-4xl">
          Delete Account
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-[#4A554C]">
          Account deletion must be requested from within the Fiqah App.
          This website cannot delete your account.
        </p>
        <h2 className="font-display mt-6 text-xl font-bold text-[#1A1A1A]">
          Steps to delete your account
        </h2>
        <ol className="mt-3 list-decimal space-y-3 pl-5 text-sm leading-relaxed text-[#4A554C]">
          <li>
            Open the Fiqah App and sign in to the account you want to
            delete.
          </li>
          <li>Go to the Home screen and open Profile.</li>
          <li>Tap Delete account.</li>
          <li>
            Review the notice and confirm that you want to permanently delete
            your account.
          </li>
        </ol>
        <p className="mt-6 rounded-[8px] border-l-4 border-[#1B5E20] bg-[#F7FAF7] p-4 text-sm leading-relaxed text-[#4A554C]">
          After confirmation in the app, your account and associated data will
          be deleted from our active servers immediately. This action cannot be
          undone.
        </p>
      </article>
    </main>
  );
};

export const TermsPage: React.FC = () => {
  return (
    <main className="mx-auto max-w-[960px] bg-[#FFFFFF] px-4 py-10 sm:px-6 lg:px-8">
      <article className="rounded-[8px] border border-[#1B5E20]/20 bg-[#FFFFFF] p-6 sm:p-10">
        <a
          href="/"
          className="text-sm font-semibold text-[#1B5E20] hover:underline"
        >
          ← Fiqah home
        </a>
        <p className="mt-8 text-xs font-semibold tracking-wide text-[#1B5E20]">
          Effective Date: November 16, 2026
        </p>
        <h1 className="font-display mt-2 text-3xl font-bold text-[#1A1A1A] sm:text-4xl">
          Terms &amp; Conditions
        </h1>
        <div className="mt-3 text-sm leading-relaxed text-[#4A554C]">
          <p>
            <strong>Application:</strong> Fiqah App
          </p>
          <p>
            <strong>Developer:</strong> Rust Innovations IT Company
          </p>
          <p>
            <strong>Effective Date:</strong> November 16, 2026
          </p>
        </div>

        <nav
          aria-label="Terms and conditions contents"
          className="mt-7 rounded-[8px] bg-[#F7FAF7] p-5"
        >
          <h2 className="text-sm font-semibold text-[#1A1A1A]">In these terms</h2>
          <ol className="mt-3 grid gap-2 text-sm text-[#1B5E20] sm:grid-cols-2">
            {[
              ['acceptance', 'Acceptance of Terms'],
              ['purpose', 'Purpose of the Application'],
              ['guidance', 'Islamic Information and Religious Guidance'],
              ['accounts', 'User Accounts and Authentication'],
              ['permissions', 'Location and Notification Permissions'],
              ['acceptable-use', 'Acceptable Use'],
              ['intellectual-property', 'Intellectual Property Rights'],
              ['accuracy', 'Accuracy of Prayer Times and Calculations'],
              ['third-party', 'Third-Party Services'],
              ['availability', 'Application Availability and Updates'],
              ['liability', 'Limitation of Liability'],
              ['privacy', 'Privacy and Data Protection'],
              ['termination', 'Account Suspension and Termination'],
              ['changes', 'Changes to These Terms'],
              ['governing-law', 'Governing Law'],
              ['contact', 'Contact Information'],
            ].map(([id, label], index) => (
              <li key={id}>
                <a className="hover:underline" href={`#${id}`}>
                  {index + 1}. {label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="mt-8 space-y-8 divide-y divide-[#1B5E20]/15 text-sm leading-relaxed text-[#4A554C]">
          <section id="acceptance" className="pt-6 first:pt-0">
            <h2 className="font-display text-2xl font-bold text-[#1A1A1A]">
              1. Acceptance of Terms
            </h2>
            <p className="mt-2 mb-6">
              Welcome to Fiqah App, developed and operated by Rust Innovations
              IT Company.
            </p>
            <p className="mt-2 mb-6">
              By downloading, accessing, registering for, or using our
              application, you acknowledge that you have read, understood, and
              agreed to these Terms &amp; Conditions.
            </p>
            <p className="mt-2 mb-6">
              If you do not agree with any part of these terms, please
              discontinue using the application.
            </p>
          </section>

          <section id="purpose" className="pt-6">
            <h2 className="font-display text-2xl font-bold text-[#1A1A1A]">
              2. Purpose of the Application
            </h2>
            <p className="mt-2 mb-6">
              Fiqah App is an Islamic educational and informational platform
              designed to help Muslims access Islamic knowledge and religious
              resources. Our services may include:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Quranic content and translations.</li>
              <li>Hadith collections and references.</li>
              <li>Islamic Fiqh information and guidance.</li>
              <li>Hanafi and Jafari Fiqh resources.</li>
              <li>Daily prayer times (Namaz timings).</li>
              <li>Qibla direction.</li>
              <li>Islamic calendars and important dates.</li>
              <li>Duas, supplications, and Islamic reminders.</li>
              <li>Zakat calculation tools.</li>
              <li>Other Islamic educational features.</li>
            </ul>
            <p className="mt-2 mb-6">
              The availability of individual features may change as the
              application develops.
            </p>
          </section>

          <section id="guidance" className="pt-6">
            <h2 className="font-display text-2xl font-bold text-[#1A1A1A]">
              3. Islamic Information and Religious Guidance
            </h2>
            <p className="mt-2 mb-6">
              Fiqah App aims to provide reliable Islamic educational
              information based on recognized Islamic sources and scholarly
              references. However:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                The application is intended for educational and informational
                purposes.
              </li>
              <li>
                Islamic rulings may differ between scholars, schools of
                thought, and individual circumstances.
              </li>
              <li>
                Users are encouraged to consult qualified Islamic scholars for
                personal religious matters.
              </li>
              <li>
                Calculators and automated tools provide estimates based on
                selected rules and entered information.
              </li>
              <li>
                Automated calculations and AI-generated explanations do not
                replace qualified Islamic scholarship.
              </li>
            </ul>
            <p className="mt-2 mb-6">
              Users are responsible for evaluating information according to
              their chosen school of thought and consulting appropriate
              scholars when necessary.
            </p>
          </section>

          <section id="accounts" className="pt-6">
            <h2 className="font-display text-2xl font-bold text-[#1A1A1A]">
              4. User Accounts and Authentication
            </h2>
            <p className="mt-2 mb-6">
              Certain application features may require users to create an
              account or sign in through supported OAuth authentication
              providers. By using account-based services, you agree to:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Provide accurate information when requested.</li>
              <li>
                Keep your account credentials and authentication methods secure.
              </li>
              <li>Avoid unauthorized access to other users’ accounts.</li>
              <li>
                Notify us if you suspect unauthorized use of your account.
              </li>
            </ul>
            <p className="mt-2 mb-6">
              We reserve the right to restrict access to accounts involved in
              misuse, fraudulent activities, or violations of these terms.
            </p>
          </section>

          <section id="permissions" className="pt-6">
            <h2 className="font-display text-2xl font-bold text-[#1A1A1A]">
              5. Location and Notification Permissions
            </h2>
            <p className="mt-2 mb-6">
              Fiqah App may request device permissions to provide its services.
              You can manage or revoke these permissions through your device
              settings. Disabling them may affect related application
              functionality.
            </p>
            <h3 className="mt-4 text-lg font-semibold text-[#1A1A1A]">
              Location Permission
            </h3>
            <p className="mt-1 mb-6">
              Location information may be used to calculate local prayer times,
              determine relevant geographical settings, and provide
              location-based Islamic features.
            </p>
            <h3 className="mt-4 text-lg font-semibold text-[#1A1A1A]">
              Notification Permission
            </h3>
            <p className="mt-1 mb-6">
              Notifications may be used for prayer reminders, Islamic events,
              and other user-configured reminders.
            </p>
            <h3 className="mt-4 text-lg font-semibold text-[#1A1A1A]">
              Background and Alarm Permissions
            </h3>
            <p className="mt-1 mb-6">
              Relevant background execution and alarm permissions may be used
              to deliver scheduled prayer alarms and reminders.
            </p>
          </section>

          <section id="acceptable-use" className="pt-6">
            <h2 className="font-display text-2xl font-bold text-[#1A1A1A]">
              6. Acceptable Use
            </h2>
            <p className="mt-2 mb-6">
              Users agree to use Fiqah App responsibly and only for lawful
              purposes. You must not:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Attempt to hack, damage, or disrupt the application or services.</li>
              <li>
                Reverse engineer or exploit application systems unlawfully.
              </li>
              <li>
                Use the application to distribute harmful, misleading, or
                unlawful material.
              </li>
              <li>
                Attempt unauthorized access to application databases or other
                users’ information.
              </li>
              <li>Interfere with the normal operation of the application.</li>
              <li>
                Copy, redistribute, or commercially exploit protected
                application content without permission.
              </li>
            </ul>
          </section>

          <section id="intellectual-property" className="pt-6">
            <h2 className="font-display text-2xl font-bold text-[#1A1A1A]">
              7. Intellectual Property Rights
            </h2>
            <p className="mt-2 mb-6">
              Application branding, logos, designs, software, original content,
              and other intellectual property owned by Rust Innovations IT
              Company are protected by applicable intellectual property laws.
            </p>
            <p className="mt-2 mb-6">
              Users may access and use the application for personal,
              educational, and non-commercial purposes. You may not reproduce,
              modify, distribute, or commercially exploit protected materials
              without prior written permission.
            </p>
            <p className="mt-2 mb-6">
              Third-party Islamic texts, translations, books, and resources may
              remain subject to their respective copyright and licensing
              conditions.
            </p>
          </section>

          <section id="accuracy" className="pt-6">
            <h2 className="font-display text-2xl font-bold text-[#1A1A1A]">
              8. Accuracy of Prayer Times and Calculations
            </h2>
            <p className="mt-2 mb-6">
              Prayer times may vary depending on geographical location,
              calculation methods, time zones, and selected Islamic
              jurisprudential settings. Users are responsible for selecting
              appropriate calculation methods and Fiqh preferences.
            </p>
            <p className="mt-2 mb-6">
              Zakat calculations and other financial or religious tools provide
              informational estimates based on the selected methodology and
              supplied information. Rust Innovations IT Company does not
              guarantee that every automated calculation will apply to every
              individual religious or financial circumstance.
            </p>
          </section>

          <section id="third-party" className="pt-6">
            <h2 className="font-display text-2xl font-bold text-[#1A1A1A]">
              9. Third-Party Services
            </h2>
            <p className="mt-2 mb-6">
              Fiqah App may integrate third-party services, including
              authentication providers, mapping services, cloud infrastructure,
              and other external technologies. These services may be subject to
              their own terms, conditions, and privacy policies. Rust
              Innovations IT Company is not responsible for the independent
              operations, availability, or policies of third-party services.
            </p>
          </section>

          <section id="availability" className="pt-6">
            <h2 className="font-display text-2xl font-bold text-[#1A1A1A]">
              10. Application Availability and Updates
            </h2>
            <p className="mt-2 mb-6">
              We continuously work to improve Fiqah App and reserve the right
              to:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Add, modify, or remove application features.</li>
              <li>Release updates and improvements.</li>
              <li>Temporarily suspend services for maintenance.</li>
              <li>
                Restrict access when necessary for security or technical
                reasons.
              </li>
              <li>Discontinue services where reasonably necessary.</li>
            </ul>
            <p className="mt-2 mb-6">
              We do not guarantee uninterrupted or error-free availability of
              the application.
            </p>
          </section>

          <section id="liability" className="pt-6">
            <h2 className="font-display text-2xl font-bold text-[#1A1A1A]">
              11. Limitation of Liability
            </h2>
            <p className="mt-2 mb-6">
              To the extent permitted by applicable law, Rust Innovations IT
              Company shall not be liable for:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Errors or inaccuracies in informational content.</li>
              <li>Differences in Islamic interpretations or scholarly opinions.</li>
              <li>Incorrect user-entered information.</li>
              <li>
                Prayer time discrepancies resulting from device settings or
                calculation methods.
              </li>
              <li>
                Estimated Zakat calculations that do not account for individual
                circumstances.
              </li>
              <li>
                Temporary service interruptions or third-party service
                failures.
              </li>
              <li>Losses resulting from misuse of the application.</li>
            </ul>
            <p className="mt-2 mb-6">
              Nothing in these terms excludes liability that cannot legally be
              excluded under applicable law.
            </p>
          </section>

          <section id="privacy" className="pt-6">
            <h2 className="font-display text-2xl font-bold text-[#1A1A1A]">
              12. Privacy and Data Protection
            </h2>
            <p className="mt-2 mb-6">
              Your use of Fiqah App is also governed by our{' '}
              <a
                className="font-semibold text-[#1B5E20] underline underline-offset-2"
                href="/privacy"
              >
                Privacy Policy
              </a>
              , which explains how information is collected, processed, stored,
              and protected. By using the application, you acknowledge that you
              have had the opportunity to review it.
            </p>
          </section>

          <section id="termination" className="pt-6">
            <h2 className="font-display text-2xl font-bold text-[#1A1A1A]">
              13. Account Suspension and Termination
            </h2>
            <p className="mt-2 mb-6">
              We reserve the right to suspend or restrict access to accounts
              that violate these Terms &amp; Conditions or compromise
              application security. Users may discontinue using the application
              at any time. Account deletion and associated data requests are
              handled according to our Privacy Policy and applicable data
              protection requirements.
            </p>
          </section>

          <section id="changes" className="pt-6">
            <h2 className="font-display text-2xl font-bold text-[#1A1A1A]">
              14. Changes to These Terms
            </h2>
            <p className="mt-2 mb-6">
              Rust Innovations IT Company may update these Terms &amp;
              Conditions to reflect changes in application functionality,
              business operations, or legal requirements. Updated terms will be
              published through the application or on our official website.
              Continued use of the application after updated terms become
              effective constitutes acceptance of the revised terms, to the
              extent permitted by applicable law.
            </p>
          </section>

          <section id="governing-law" className="pt-6">
            <h2 className="font-display text-2xl font-bold text-[#1A1A1A]">
              15. Governing Law
            </h2>
            <p className="mt-2 mb-6">
              These Terms &amp; Conditions shall be governed by the applicable
              laws of Pakistan, subject to any mandatory consumer protection
              and data protection laws applicable to users in their respective
              jurisdictions.
            </p>
          </section>

          <section id="contact" className="pt-6">
            <h2 className="font-display text-2xl font-bold text-[#1A1A1A]">
              16. Contact Information
            </h2>
            <p className="mt-2 mb-6">
              For questions, concerns, or inquiries regarding these Terms
              &amp; Conditions, please contact us:
            </p>
            <ul className="mt-2 space-y-1">
              <li>
                <strong>Developer:</strong> Rust Innovations IT Company
              </li>
              <li>
                <strong>Application:</strong> Fiqah App
              </li>
              <li>
                <strong>Website:</strong>{' '}
                <a
                  className="font-semibold text-[#1B5E20] underline underline-offset-2"
                  href="https://rustinnovations.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://rustinnovations.com
                </a>
              </li>
              <li>
                <strong>Email:</strong>{' '}
                <a
                  className="font-semibold text-[#1B5E20] underline underline-offset-2"
                  href="mailto:support@fiqah.rustinnovations.com"
                >
                  support@fiqah.rustinnovations.com
                </a>
              </li>
            </ul>
          </section>
        </div>
      </article>
    </main>
  );
};
