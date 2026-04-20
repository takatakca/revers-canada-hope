export type Lang = "fr" | "en";

export const translations = {
  fr: {
    nav: {
      home: "Accueil",
      donate: "Donner",
      further: "Aller plus loin",
      international: "Aide internationale",
      organizers: "Organisateurs",
      brochures: "Brochures",
      contact: "Contact",
      about: "À propos",
      donateCta: "Donner",
      menu: "Menu",
    },
    navGroups: {
      discover: "Découvrir",
      act: "Passer à l'action",
      resources: "Ressources",
    },
    common: {
      learnMore: "En savoir plus",
      back: "Retour",
      soon: "Contenu à venir",
      construction: "Cette page est en construction. Revenez bientôt pour plus d'information.",
    },
    home: {
      heroEyebrow: "Organisme de bienfaisance — Québec, Canada",
      heroTitleA: "Redonnons espoir",
      heroTitleHighlight: "ensemble",
      heroTitleB: "aux familles du Québec",
      heroSubtitle:
        "Refuge, nourriture et retour à l'emploi pour les femmes et enfants en situation d'itinérance. Joignez-vous au mouvement.",
      ctaDonate: "Faire un don",
      ctaLearn: "Découvrir nos actions",
      stats: [
        { n: "1 200+", l: "Familles accueillies" },
        { n: "85 000", l: "Repas servis" },
        { n: "340", l: "Retours à l'emploi" },
        { n: "12 ans", l: "Au cœur du Québec" },
      ],
      ctaBand: "Chaque geste compte. Devenez partenaire du changement.",
      ctaBandBtn: "Soutenir maintenant",
    },
    donate: {
      title: "Faire un don",
      lead:
        "Votre don finance directement nos refuges, nos cuisines et nos programmes de retour à l'emploi au Québec.",
    },
    further: {
      title: "Aller plus loin",
      lead:
        "Bénévolat, partenariats, dons planifiés et campagnes — découvrez toutes les façons de soutenir Revers Canada.",
    },
    international: {
      title: "Aide internationale",
      lead:
        "Notre programme d'aide internationale recueille des dons matériels — jamais d'argent — pour soutenir des familles, des animaux et des communautés à l'étranger.",
    },
    organizers: {
      title: "Organisateurs",
      lead:
        "Lancez une collecte au profit de Revers Canada dans votre milieu, votre école ou votre entreprise.",
    },
    brochures: {
      title: "Brochures",
      lead:
        "Téléchargez nos documents officiels: rapport annuel, dépliants de programmes et trousses pour partenaires.",
    },
    contact: {
      title: "Nous joindre",
      lead: "Une question, un partenariat, un besoin d'aide? Écrivez-nous.",
    },
    about: {
      title: "À propos de Revers Canada",
      lead:
        "Organisme de bienfaisance enregistré au Canada, basé au Québec, dédié aux femmes et enfants en situation d'itinérance.",
    },
    footer: {
      tagline: "Redonner espoir, une famille à la fois.",
      newsletter: "Infolettre",
      newsletterD: "Recevez nos nouvelles et nos campagnes en cours.",
      firstName: "Prénom",
      lastName: "Nom",
      emailPh: "Adresse courriel",
      subscribe: "S'abonner",
      rights: "Tous droits réservés.",
      privacy: "Politique de confidentialité",
      registered: "Organisme de bienfaisance enregistré au Canada",
    },
  },
  en: {
    nav: {
      home: "Home",
      donate: "Donate",
      further: "Go further",
      international: "International Help",
      organizers: "Organizers",
      brochures: "Brochures",
      contact: "Contact",
      about: "About",
      donateCta: "Donate",
      menu: "Menu",
    },
    navGroups: {
      discover: "Discover",
      act: "Take action",
      resources: "Resources",
    },
    common: {
      learnMore: "Learn more",
      back: "Back",
      soon: "Coming soon",
      construction: "This page is under construction. Check back soon for more information.",
    },
    home: {
      heroEyebrow: "Registered Charity — Québec, Canada",
      heroTitleA: "Bringing hope back",
      heroTitleHighlight: "together",
      heroTitleB: "to families in Québec",
      heroSubtitle:
        "Shelter, food, and back-to-work support for homeless women and children. Join the movement.",
      ctaDonate: "Donate now",
      ctaLearn: "Discover our work",
      stats: [
        { n: "1,200+", l: "Families helped" },
        { n: "85,000", l: "Meals served" },
        { n: "340", l: "Back to employment" },
        { n: "12 yrs", l: "Serving Québec" },
      ],
      ctaBand: "Every gesture matters. Become a partner in change.",
      ctaBandBtn: "Support now",
    },
    donate: {
      title: "Donate",
      lead:
        "Your gift directly funds our shelters, kitchens and back-to-work programs across Québec.",
    },
    further: {
      title: "Go further",
      lead:
        "Volunteering, partnerships, planned giving and campaigns — find every way to support Revers Canada.",
    },
    international: {
      title: "International Help",
      lead:
        "Our international program collects in-kind donations — never money — for families, animals and communities abroad.",
    },
    organizers: {
      title: "Organizers",
      lead:
        "Launch a fundraiser for Revers Canada in your community, school or workplace.",
    },
    brochures: {
      title: "Brochures",
      lead:
        "Download our official documents: annual report, program flyers and partner kits.",
    },
    contact: {
      title: "Contact us",
      lead: "A question, a partnership, or a need for help? Write to us.",
    },
    about: {
      title: "About Revers Canada",
      lead:
        "A registered Canadian charity based in Québec, dedicated to homeless women and children.",
    },
    footer: {
      tagline: "Bringing hope back, one family at a time.",
      newsletter: "Newsletter",
      newsletterD: "Get our latest news and active campaigns.",
      firstName: "First name",
      lastName: "Last name",
      emailPh: "Email address",
      subscribe: "Subscribe",
      rights: "All rights reserved.",
      privacy: "Privacy policy",
      registered: "Registered Canadian charity",
    },
  },
};

export type Translations = typeof translations.fr;
