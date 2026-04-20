export type Lang = "fr" | "en";

export const translations = {
  fr: {
    nav: {
      home: "Accueil",
      about: "À propos",
      programs: "Programmes",
      international: "Aide internationale",
      donate: "Faire un don",
      contact: "Contact",
      donateCta: "Donner",
    },
    home: {
      heroEyebrow: "Organisme de bienfaisance — Québec, Canada",
      heroTitleA: "Redonner espoir",
      heroTitleHighlight: "aux familles",
      heroTitleB: "qui en ont besoin",
      heroSubtitle:
        "Revers Canada offre refuge, nourriture et accompagnement aux femmes et enfants en situation d'itinérance, et les aide à retrouver leur place sur le marché du travail.",
      ctaDonate: "Faire un don",
      ctaLearn: "Découvrir nos programmes",
      statsTitle: "Notre impact",
      stats: [
        { n: "1 200+", l: "Femmes et enfants accueillis" },
        { n: "85 000", l: "Repas chauds servis" },
        { n: "340", l: "Retours à l'emploi" },
        { n: "12 ans", l: "Au service du Québec" },
      ],
      programsTitle: "Comment nous aidons",
      programsKicker: "Nos programmes",
      programs: [
        {
          t: "Refuge & hébergement",
          d: "Un toit sécuritaire pour les mères et leurs enfants, avec accompagnement quotidien.",
        },
        {
          t: "Nourriture & essentiels",
          d: "Repas chauds, paniers alimentaires et produits d'hygiène distribués chaque semaine.",
        },
        {
          t: "Retour à l'emploi",
          d: "Formation, rédaction de CV, jumelage avec des employeurs partenaires du Québec.",
        },
      ],
      missionTitle: "Notre mission",
      missionBody:
        "Depuis plus d'une décennie, Revers Canada accompagne des femmes et des enfants québécois vers l'autonomie. Chaque don ouvre une porte: un lit chaud ce soir, un repas demain, et un emploi pour bâtir l'avenir.",
      ctaBand: "Chaque geste compte. Devenez partenaire du changement.",
      ctaBandBtn: "Soutenir maintenant",
    },
    about: {
      title: "À propos de Revers Canada",
      lead:
        "Nous sommes un organisme de bienfaisance enregistré au Canada, basé au Québec, qui se consacre à la réinsertion des femmes et enfants en situation d'itinérance.",
      missionT: "Mission",
      missionD:
        "Offrir un environnement sécuritaire, des ressources concrètes et un accompagnement humain pour permettre à chaque mère et son enfant de se reconstruire.",
      visionT: "Vision",
      visionD:
        "Un Québec où aucune mère ni aucun enfant ne dort dans la rue, et où chaque famille a accès à un emploi digne.",
      valuesT: "Valeurs",
      values: ["Dignité", "Écoute", "Action concrète", "Transparence"],
      taxT: "Reçu fiscal",
      taxD:
        "Revers Canada émet des reçus officiels pour fins d'impôt pour tout don de 20 $ et plus. Votre générosité est déductible.",
    },
    programs: {
      title: "Nos programmes",
      lead: "Trois piliers pour reconstruire des vies, du toit à l'emploi.",
      items: [
        {
          t: "Refuge pour femmes et enfants",
          d: "Hébergement d'urgence et transitionnel, suivi psychosocial, garderie sur place et accompagnement personnalisé pour chaque famille.",
          tag: "Hébergement",
        },
        {
          t: "Sécurité alimentaire",
          d: "Cuisine communautaire, paniers alimentaires hebdomadaires et distribution de produits essentiels d'hygiène et de soins pour bébés.",
          tag: "Alimentation",
        },
        {
          t: "Réinsertion professionnelle",
          d: "Ateliers de CV, préparation aux entrevues, formations courtes et jumelage avec un réseau d'employeurs partenaires du Québec.",
          tag: "Emploi",
        },
      ],
    },
    international: {
      title: "Aide internationale",
      lead:
        "Notre programme d'aide internationale recueille des dons matériels — jamais d'argent — pour soutenir des familles, des animaux et des communautés à l'étranger.",
      noticeT: "Important",
      noticeD:
        "Aucun don monétaire n'est accepté pour cette section. Les dons financiers à Revers Canada servent exclusivement nos programmes au Québec.",
      acceptT: "Ce que nous acceptons aux points de dépôt",
      accept: [
        "Vêtements propres pour adultes et enfants",
        "Nourriture non périssable",
        "Médicaments en cours de validité (pour humains)",
        "Soins vétérinaires: médicaments, vermifuges, antiparasitaires",
        "Nourriture pour animaux (chiens, chats, animaux de ferme)",
        "Matériel vétérinaire et accessoires (laisses, cages, gamelles)",
      ],
      dropT: "Points de dépôt",
      drops: [
        { city: "Montréal", addr: "1234, rue Sainte-Catherine Est", hours: "Lun–Sam · 10h–18h" },
        { city: "Québec", addr: "567, boulevard Charest Ouest", hours: "Mar–Sam · 11h–17h" },
        { city: "Sherbrooke", addr: "89, rue King Ouest", hours: "Mer–Ven · 12h–18h" },
      ],
      whyT: "Pourquoi des dons matériels?",
      whyD:
        "Nous travaillons avec des partenaires locaux fiables qui assurent la livraison directe aux familles, refuges et cliniques vétérinaires sur place. Vos dons matériels arrivent là où on en a réellement besoin.",
    },
    donate: {
      title: "Faire un don",
      lead:
        "Votre don finance directement nos refuges, nos cuisines et nos programmes de retour à l'emploi au Québec. Reçu fiscal officiel pour tout don de 20 $ et plus.",
      onceT: "Don ponctuel",
      monthlyT: "Don mensuel",
      amounts: ["25", "50", "100", "250"],
      other: "Autre montant",
      coverFee: "Je couvre les frais de transaction",
      donateBtn: "Donner par Stripe",
      monthlyBtn: "Donner mensuellement",
      verseT: "Votre impact",
      impactList: [
        "25 $ — un repas chaud pour une famille pendant 5 jours",
        "50 $ — une nuit en refuge pour une mère et son enfant",
        "100 $ — un atelier de réinsertion professionnelle",
        "250 $ — une semaine complète d'hébergement et d'accompagnement",
      ],
      stripeNote:
        "Les paiements seront traités de façon sécurisée par Stripe une fois l'intégration activée.",
    },
    contact: {
      title: "Nous joindre",
      lead: "Une question, un partenariat, un besoin d'aide? Écrivez-nous.",
      name: "Nom complet",
      email: "Courriel",
      subject: "Sujet",
      message: "Message",
      send: "Envoyer",
      sent: "Merci! Nous vous répondrons rapidement.",
      info: "Coordonnées",
      address: "Revers Canada · CP 4521, succ. Centre-ville, Montréal (QC) H2X 0A1",
      phone: "1 (844) 555-0199",
      mail: "info@reverscanada.org",
    },
    footer: {
      tagline: "Redonner espoir, une famille à la fois.",
      newsletter: "Infolettre",
      newsletterD: "Recevez nos nouvelles et appels au don.",
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
      about: "About",
      programs: "Programs",
      international: "International Help",
      donate: "Donate",
      contact: "Contact",
      donateCta: "Donate",
    },
    home: {
      heroEyebrow: "Registered Charity — Québec, Canada",
      heroTitleA: "Bringing hope",
      heroTitleHighlight: "back to families",
      heroTitleB: "who need it most",
      heroSubtitle:
        "Revers Canada offers shelter, food and reintegration support to homeless women and children, helping them find their way back to work and stability.",
      ctaDonate: "Donate now",
      ctaLearn: "Discover our programs",
      statsTitle: "Our impact",
      stats: [
        { n: "1,200+", l: "Women & children housed" },
        { n: "85,000", l: "Hot meals served" },
        { n: "340", l: "Back to employment" },
        { n: "12 yrs", l: "Serving Québec" },
      ],
      programsTitle: "How we help",
      programsKicker: "Our programs",
      programs: [
        {
          t: "Shelter & housing",
          d: "Safe roof for mothers and their children, with daily one-on-one support.",
        },
        {
          t: "Food & essentials",
          d: "Hot meals, weekly food baskets and hygiene supplies for families in need.",
        },
        {
          t: "Back to work",
          d: "Training, resume coaching, and matching with our Québec employer partners.",
        },
      ],
      missionTitle: "Our mission",
      missionBody:
        "For more than a decade, Revers Canada has walked alongside Québec mothers and children on their path back to autonomy. Every gift opens a door — a warm bed tonight, a meal tomorrow, a job to build the future.",
      ctaBand: "Every gesture matters. Become a partner in change.",
      ctaBandBtn: "Support now",
    },
    about: {
      title: "About Revers Canada",
      lead:
        "We are a registered Canadian charity based in Québec, dedicated to the reintegration of homeless women and children.",
      missionT: "Mission",
      missionD:
        "Offer a safe environment, real resources, and human support so every mother and child can rebuild.",
      visionT: "Vision",
      visionD:
        "A Québec where no mother and no child sleeps on the street, and every family has access to dignified work.",
      valuesT: "Values",
      values: ["Dignity", "Listening", "Concrete action", "Transparency"],
      taxT: "Tax receipts",
      taxD:
        "Revers Canada issues official tax receipts for any donation of $20 or more. Your generosity is tax-deductible.",
    },
    programs: {
      title: "Our programs",
      lead: "Three pillars to rebuild lives, from a roof to a job.",
      items: [
        {
          t: "Shelter for women & children",
          d: "Emergency and transitional housing, psychosocial follow-up, on-site daycare and personalized support for every family.",
          tag: "Housing",
        },
        {
          t: "Food security",
          d: "Community kitchen, weekly food baskets and distribution of essential hygiene and baby-care products.",
          tag: "Food",
        },
        {
          t: "Back to employment",
          d: "Resume workshops, interview prep, short trainings and matching with our network of Québec employer partners.",
          tag: "Jobs",
        },
      ],
    },
    international: {
      title: "International Help",
      lead:
        "Our international help program collects in-kind donations — never money — to support families, animals and communities abroad.",
      noticeT: "Important",
      noticeD:
        "No monetary donations are accepted for this section. Financial gifts to Revers Canada exclusively fund our programs in Québec.",
      acceptT: "What we accept at drop-off points",
      accept: [
        "Clean clothing for adults and children",
        "Non-perishable food",
        "Unexpired human medication",
        "Veterinary care: medication, dewormers, antiparasitics",
        "Pet & farm animal food (dogs, cats, livestock)",
        "Veterinary equipment & accessories (leashes, crates, bowls)",
      ],
      dropT: "Drop-off locations",
      drops: [
        { city: "Montréal", addr: "1234 Sainte-Catherine St. E.", hours: "Mon–Sat · 10am–6pm" },
        { city: "Québec City", addr: "567 Charest Blvd. W.", hours: "Tue–Sat · 11am–5pm" },
        { city: "Sherbrooke", addr: "89 King St. W.", hours: "Wed–Fri · 12pm–6pm" },
      ],
      whyT: "Why in-kind donations?",
      whyD:
        "We work with trusted local partners who deliver directly to families, shelters and veterinary clinics on the ground. Your in-kind donations land exactly where they're truly needed.",
    },
    donate: {
      title: "Make a donation",
      lead:
        "Your gift directly funds our shelters, kitchens and back-to-work programs in Québec. Official tax receipt for any donation of $20 or more.",
      onceT: "One-time gift",
      monthlyT: "Monthly gift",
      amounts: ["25", "50", "100", "250"],
      other: "Other amount",
      coverFee: "I'll cover the transaction fee",
      donateBtn: "Donate with Stripe",
      monthlyBtn: "Give monthly",
      verseT: "Your impact",
      impactList: [
        "$25 — a hot meal for a family for 5 days",
        "$50 — one night of shelter for a mother and child",
        "$100 — one back-to-work workshop",
        "$250 — a full week of housing and support",
      ],
      stripeNote:
        "Payments will be processed securely through Stripe once the integration is enabled.",
    },
    contact: {
      title: "Contact us",
      lead: "A question, a partnership, or a need for help? Write to us.",
      name: "Full name",
      email: "Email",
      subject: "Subject",
      message: "Message",
      send: "Send",
      sent: "Thank you! We'll get back to you shortly.",
      info: "Contact information",
      address: "Revers Canada · PO Box 4521, Stn Downtown, Montréal QC H2X 0A1",
      phone: "1 (844) 555-0199",
      mail: "info@reverscanada.org",
    },
    footer: {
      tagline: "Bringing hope back, one family at a time.",
      newsletter: "Newsletter",
      newsletterD: "Get our latest news and donation appeals.",
      firstName: "First name",
      lastName: "Last name",
      emailPh: "Email address",
      subscribe: "Subscribe",
      rights: "All rights reserved.",
      privacy: "Privacy policy",
      registered: "Registered Canadian charity",
    },
  },
} as const;

export type Translations = typeof translations.fr;
