import React, { useEffect } from 'react';
import { PageRoute } from '../types/fiqah';

interface LegalPageProps {
  onNavigate: (page: PageRoute) => void;
}

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

export const TermsPage: React.FC<LegalPageProps> = ({ onNavigate }) => {
  return (
    <main className="mx-auto max-w-[960px] bg-[#FFFFFF] px-4 py-10 sm:px-6 lg:px-8">
      <article className="rounded-[8px] border border-[#1B5E20]/20 bg-[#FFFFFF] p-6 sm:p-10">
        <p className="text-xs font-semibold tracking-wide text-[#1B5E20]">
          Legal &amp; Governance · Effective November 2026
        </p>
        <h1 className="font-display mt-2 text-3xl font-bold text-[#1A1A1A] sm:text-4xl">
          Terms &amp; Services
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-[#4A554C]">
          By accessing the Fiqah website or installing the Fiqah mobile
          application, you agree to the following Terms &amp; Conditions
          established by Fiqah and the Rust Innovations IT Department.
        </p>

        <div className="mt-8 space-y-6 divide-y divide-[#1B5E20]/15 text-sm leading-relaxed text-[#4A554C]">
          <section className="pt-4 first:pt-0">
            <h2 className="font-display text-2xl font-bold text-[#1A1A1A]">
              1. Educational &amp; Worship Purpose
            </h2>
            <p className="mt-2">
              Fiqah provides Quranic scripts, verified translations, Salah
              schedules, Qibla calibration, and foundational Fiqh references for
              personal worship and study. For complex personal legal rulings
              (Fatwa), users are encouraged to consult qualified local scholars.
            </p>
          </section>

          <section className="pt-6">
            <h2 className="font-display text-2xl font-bold text-[#1A1A1A]">
              2. Intellectual Property &amp; Brand Marks
            </h2>
            <p className="mt-2">
              The Fiqah name, emblem, application interface, 3D visual assets,
              and original software architecture are protected works of Fiqah
              and the Rust Innovations IT Department. Classical sacred texts
              remain the shared heritage of the Ummah.
            </p>
          </section>

          <section className="pt-6">
            <h2 className="font-display text-2xl font-bold text-[#1A1A1A]">
              3. Astronomical &amp; Sensor Accuracy
            </h2>
            <p className="mt-2">
              Qibla compass accuracy depends on device magnetometer calibration.
              Users should periodically verify compass alignment away from
              magnetic interference.
            </p>
          </section>

          <section className="pt-6">
            <h2 className="font-display text-2xl font-bold text-[#1A1A1A]">
              4. Questions Regarding Terms
            </h2>
            <p className="mt-2">
              Questions regarding these Terms &amp; Services may be directed to
              our team via the{' '}
              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="font-semibold text-[#1B5E20] underline underline-offset-2"
              >
                Contact Page
              </button>
              .
            </p>
          </section>
        </div>
      </article>
    </main>
  );
};
