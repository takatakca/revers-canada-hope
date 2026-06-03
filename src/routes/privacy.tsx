import { createFileRoute } from "@tanstack/react-router";
import { useLang } from "@/i18n/LangContext";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Politique de confidentialité — Revers Canada" },
      {
        name: "description",
        content:
          "Politique de confidentialité de Revers Canada : informations collectées, formulaire de contact, infolettre, dons et stockage local.",
      },
      { property: "og:title", content: "Politique de confidentialité — Revers Canada" },
      {
        property: "og:description",
        content: "Comment Revers Canada traite vos informations.",
      },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  const { lang } = useLang();
  const updated =
    lang === "fr" ? "Dernière mise à jour : 1 juin 2026" : "Last updated: June 1, 2026";

  return (
    <>
      <section className="bg-ink py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h1 className="font-display text-5xl sm:text-6xl">
            {lang === "fr" ? "Politique de confidentialité" : "Privacy Policy"}
          </h1>
          <p className="mt-3 text-sm text-white/70">{updated}</p>
        </div>
      </section>

      <section className="bg-background py-16">
        <div className="mx-auto max-w-3xl space-y-6 px-4 text-ink sm:px-6">
          {lang === "fr" ? <FrContent /> : <EnContent />}
        </div>
      </section>
    </>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-2xl text-[color:var(--teal-deep)]">{title}</h2>
      <div className="mt-2 space-y-2 text-sm leading-relaxed text-muted-foreground">{children}</div>
    </div>
  );
}

function FrContent() {
  return (
    <>
      <Block title="Introduction">
        <p>
          Revers Canada respecte votre vie privée. Cette politique explique quelles informations
          nous collectons sur notre site, comment elles sont utilisées et conservées.
        </p>
      </Block>
      <Block title="Informations collectées">
        <p>
          Nous collectons uniquement les informations que vous nous fournissez volontairement via
          nos formulaires (contact, infolettre, intention de don) : nom, courriel, téléphone,
          message et préférences de don.
        </p>
      </Block>
      <Block title="Formulaire de contact">
        <p>
          Lorsque vous utilisez notre formulaire de contact, vos informations (nom, courriel,
          téléphone optionnel, sujet et message) peuvent être enregistrées dans une base de
          données sécurisée afin d'être traitées par l'équipe de Revers Canada. Si
          l'enregistrement échoue, votre message est préparé sous forme de courriel envoyé via
          votre application courriel par défaut à reverscanada@gmail.com.
        </p>
      </Block>
      <Block title="Infolettre">
        <p>
          Votre adresse courriel et votre langue préférée peuvent être enregistrées dans une
          base de données sécurisée pour permettre un suivi ultérieur. Aucun courriel
          d'infolettre n'est encore envoyé tant que notre service d'envoi (Brevo, Mailchimp ou
          équivalent) n'est pas officiellement connecté.
        </p>
      </Block>
      <Block title="Dons">
        <p>
          Votre intention de don (montant, fréquence, devise) peut être enregistrée dans une
          base de données sécurisée afin de préparer la transaction. Aucun paiement réel n'est
          encore traité tant que notre passerelle de paiement sécurisée (Stripe) n'est pas
          officiellement connectée.
        </p>
      </Block>
      <Block title="Stockage local temporaire">
        <p>
          Le stockage local (localStorage) est utilisé pour conserver temporairement vos choix
          (langue, intentions de don, intérêt pour l'infolettre). Vous pouvez l'effacer à tout
          moment dans les paramètres de votre navigateur.
        </p>
      </Block>
      <Block title="Sécurité">
        <p>
          Nous mettons en place des mesures raisonnables pour protéger les informations qui nous
          sont confiées. Aucune méthode de transmission sur Internet n'est cependant sécurisée à
          100 %.
        </p>
      </Block>
      <Block title="Contact">
        <p>
          REVERS CANADA<br />
          5505 Rue Irwin<br />
          LaSalle, QC H8N 1A1, Canada<br />
          <a className="underline" href="mailto:reverscanada@gmail.com">reverscanada@gmail.com</a>
          {" · "}
          <a className="underline" href="tel:5148252825">514-825-2825</a>
        </p>
      </Block>
    </>
  );
}

function EnContent() {
  return (
    <>
      <Block title="Introduction">
        <p>
          Revers Canada respects your privacy. This policy explains what information we collect,
          how it is used, and how it is stored.
        </p>
      </Block>
      <Block title="Information collected">
        <p>
          We only collect information you voluntarily provide via our forms (contact, newsletter,
          donation intent): name, email, phone, message and donation preferences.
        </p>
      </Block>
      <Block title="Contact form">
        <p>
          When you use our contact form, your information (name, email, optional phone, subject
          and message) may be stored in a secure database so the Revers Canada team can review
          it. If storage fails, your message is prepared as an email opened via your default
          mail client to reverscanada@gmail.com.
        </p>
      </Block>
      <Block title="Newsletter">
        <p>
          Your email and preferred language may be stored in a secure database so we can follow
          up later. No newsletter email is sent yet — our mailing provider (Brevo, Mailchimp or
          similar) is not officially connected at this stage.
        </p>
      </Block>
      <Block title="Donations">
        <p>
          Your donation intent (amount, frequency, currency) may be stored in a secure database
          to prepare the transaction. No real payment is processed yet — our secure payment
          gateway (Stripe) is not officially connected at this stage.
        </p>
      </Block>
      <Block title="Temporary local storage">
        <p>
          localStorage is used to temporarily keep your choices (language, donation intents,
          newsletter interest). You can clear it at any time in your browser settings.
        </p>
      </Block>
      <Block title="Security">
        <p>
          We apply reasonable measures to protect the information entrusted to us. However, no
          internet transmission method is 100% secure.
        </p>
      </Block>
      <Block title="Contact">
        <p>
          For any question regarding this policy:{" "}
          <a className="underline" href="mailto:info@reverscanada.org">
            info@reverscanada.org
          </a>
        </p>
      </Block>
    </>
  );
}
