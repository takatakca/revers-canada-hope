export type Lang = "fr" | "en";

export const translations = {
  fr: {
    nav: {
      home: "Accueil",
      about: "À propos",
      mission: "Mission",
      revpere: "RêvPÈRE",
      programs: "Programmes",
      resources: "Ressources",
      community: "Communauté",
      housing: "Habitation",
      food: "Aide alimentaire",
      partners: "Partenaires",
      international: "Aide internationale",
      donate: "Faire un don",
      contact: "Contact",
      donateCta: "Donner",
      start: "Commencer mon parcours",
      pillars: "Les 5 piliers",
      emploi: "Emploi",
      numerique: "Numérique",
      web: "Web",
      distance: "Travail à distance",
      ia: "Intelligence artificielle",
    },
    brand: {
      org: "REVERS CANADA",
      program: "RêvPÈRE",
      programTag: "Emploi. Web. IA. Autonomie.",
      umbrella: "Un programme de REVERS CANADA",
    },
    home: {
      heroEyebrow: "REVERS CANADA · Montréal, Québec",
      heroTitleA: "Aider un père",
      heroTitleHighlight: "à se remettre debout",
      heroTitleB: ", c'est aussi aider ses enfants à avancer",
      heroSubtitle:
        "RêvPÈRE est le programme communautaire de REVERS CANADA destiné aux pères : emploi, compétences numériques, web, travail à distance et intelligence artificielle. Un point d'entrée clair vers l'autonomie durable.",
      ctaDonate: "Faire un don",
      ctaStart: "Commencer mon parcours",
      ctaLearn: "Découvrir les 5 piliers",
      pillarStrip: ["Emploi", "Numérique", "Web", "Travail à distance", "IA"],

      whyKicker: "Pourquoi RêvPÈRE",
      whyTitle: "Les pères sont souvent le trou dans le filet social",
      whyBody:
        "Beaucoup d'hommes séparés, sans emploi stable ou en rupture de logement se retrouvent entre deux dispositifs : trop autonomes pour l'urgence, trop fragilisés pour le marché du travail classique. RêvPÈRE construit ce chaînon manquant, sans jugement et sans remplacer les organismes déjà en place.",
      whyList: [
        "Un accompagnement pensé pour les réalités des pères (garde, pension, isolement, honte).",
        "Des compétences réellement monnayables : numérique, web, IA, travail à distance.",
        "Un lien direct vers les ressources existantes de Montréal plutôt qu'un doublon de services.",
      ],

      pillarsKicker: "Le parcours",
      pillarsTitle: "Cinq piliers, un seul objectif : l'autonomie",
      pillarsLead:
        "Chaque pilier est un module concret. On peut entrer par n'importe lequel, selon la situation.",

      modelKicker: "Notre modèle",
      modelTitle: "Le point d'entrée, pas un doublon",
      modelLead:
        "Montréal compte déjà des organismes solides pour les pères, le logement, l'alimentation et l'emploi. Le rôle de RêvPÈRE est d'être la porte d'entrée qui oriente, accompagne et reste présent dans la durée.",
      modelSteps: [
        { t: "Accueillir", d: "Un premier contact humain, sans formulaire interminable ni jugement." },
        { t: "Évaluer", d: "Comprendre la situation réelle : logement, revenu, garde, santé, compétences." },
        { t: "Orienter", d: "Diriger vers le bon organisme partenaire quand il existe déjà et fait mieux." },
        { t: "Former", d: "Combler ce qui manque : numérique, web, IA, travail à distance, employabilité." },
        { t: "Suivre", d: "Rester présent après le placement, parce que la rechute arrive souvent après." },
      ],

      ecosystemKicker: "REVERS CANADA",
      ecosystemTitle: "Quatre volets, une même organisation",
      ecosystemLead:
        "RêvPÈRE est notre programme phare. Il s'inscrit dans un ensemble plus large de services communautaires.",
      ecosystem: [
        {
          tag: "Programme phare",
          t: "RêvPÈRE",
          d: "Emploi, numérique, web, travail à distance et IA pour les pères en reconstruction.",
          to: "/revpere",
        },
        {
          tag: "Volet",
          t: "Habitation communautaire",
          d: "Orientation vers le logement social, transitoire et abordable, et soutien au maintien en logement.",
          to: "/habitation",
        },
        {
          tag: "Volet",
          t: "Aide et sécurité alimentaire",
          d: "Dépannage alimentaire, cuisines collectives et accès aux ressources du quartier.",
          to: "/alimentaire",
        },
        {
          tag: "Volet",
          t: "Aide internationale",
          d: "Dons matériels uniquement — vêtements, médicaments, matériel vétérinaire. Aucun don monétaire.",
          to: "/international",
        },
      ],

      directoryKicker: "Bottin de ressources",
      directoryTitle: "Vous n'êtes pas seul, et vous n'avez pas à chercher seul",
      directoryLead:
        "Nous maintenons un répertoire des ressources montréalaises pour les pères : hébergement, soutien psychosocial, droit familial, alimentation, emploi.",
      directoryCta: "Consulter le bottin",

      communityKicker: "Communauté",
      communityTitle: "Un père accompagné en accompagne un autre",
      communityBody:
        "Groupes de pairs, mentorat, ateliers et moments père-enfant. La compétence technique ouvre des portes ; le lien social empêche de retomber.",
      communityCta: "Voir la communauté",

      finalTitle: "Aider un père, c'est aider une famille entière",
      finalLead:
        "Votre don finance les ateliers, l'équipement informatique et l'accompagnement individuel.",
      ctaBandBtn: "Soutenir RêvPÈRE",
      ctaBand: "Chaque geste compte. Devenez partenaire du changement.",
    },

    pillarsHub: {
      title: "RêvPÈRE — les 5 piliers",
      lead:
        "Un programme structuré en cinq modules complémentaires. Chacun peut être suivi seul ou en parcours complet.",
      cta: "Explorer le pilier",
      note:
        "Les parcours sont gratuits pour les participants et adaptés au rythme de chacun. Aucun prérequis scolaire.",
    },

    pillars: {
      emploi: {
        n: "01",
        name: "Emploi",
        title: "Retour à l'emploi durable",
        lead:
          "Reprendre pied sur le marché du travail avec un plan réaliste, pas un simple CV refait à la hâte.",
        sections: [
          {
            t: "Ce qu'on travaille ensemble",
            items: [
              "Bilan de compétences et reconnaissance de l'expérience non diplômée",
              "CV, lettre et profil LinkedIn revus avec un accompagnateur",
              "Préparation aux entrevues et gestion des trous dans le parcours",
              "Recherche d'emploi structurée : cibles, suivi, relances",
            ],
          },
          {
            t: "Après l'embauche",
            items: [
              "Suivi les premiers mois, période où beaucoup décrochent",
              "Médiation avec l'employeur au besoin",
              "Ajustement horaire selon les droits de garde",
            ],
          },
        ],
      },
      numerique: {
        n: "02",
        name: "Numérique",
        title: "Compétences numériques essentielles",
        lead:
          "Sans aisance numérique, une candidature n'existe pas. On part exactement d'où vous êtes.",
        sections: [
          {
            t: "Les bases",
            items: [
              "Courriel, gestion de fichiers, sécurité et mots de passe",
              "Suite bureautique : traitement de texte, tableurs, présentations",
              "Formulaires gouvernementaux et démarches en ligne",
              "Téléphone intelligent : agenda, documents, identité numérique",
            ],
          },
          {
            t: "Le matériel",
            items: [
              "Accès à des postes de travail sur place",
              "Prêt d'équipement selon disponibilité",
              "Aide à la connexion Internet à faible coût",
            ],
          },
        ],
      },
      web: {
        n: "03",
        name: "Web",
        title: "Créer et vendre sur le web",
        lead:
          "Un métier accessible, apprenable rapidement, et qui se pratique de n'importe où.",
        sections: [
          {
            t: "Ce qu'on apprend",
            items: [
              "Créer un site simple et professionnel",
              "Bases du référencement et de la présence en ligne",
              "Vitrine et vente en ligne pour un travailleur autonome",
              "Portfolio et premiers contrats",
            ],
          },
          {
            t: "Débouchés",
            items: [
              "Travail autonome à la pige",
              "Soutien web pour petits commerces de quartier",
              "Poste junior en agence ou en OBNL",
            ],
          },
        ],
      },
      distance: {
        n: "04",
        name: "Travail à distance",
        title: "Travailler à distance, concrètement",
        lead:
          "Le télétravail change la donne pour un père : moins de transport, plus de présence auprès des enfants.",
        sections: [
          {
            t: "Se préparer",
            items: [
              "Aménager un espace de travail même en logement réduit",
              "Outils de collaboration : visioconférence, gestion de tâches, partage de fichiers",
              "Discipline, horaires et communication écrite professionnelle",
            ],
          },
          {
            t: "Trouver le travail",
            items: [
              "Repérer les employeurs réellement ouverts au télétravail",
              "Plateformes de mandats et de pige",
              "Éviter les fraudes et les offres abusives",
            ],
          },
        ],
      },
      ia: {
        n: "05",
        name: "Intelligence artificielle",
        title: "L'IA comme levier, pas comme menace",
        lead:
          "Savoir utiliser l'IA est devenu une compétence de base. C'est aussi un accélérateur puissant pour quelqu'un qui repart de zéro.",
        sections: [
          {
            t: "Usages concrets",
            items: [
              "Rédiger, corriger et traduire ses communications professionnelles",
              "Préparer une entrevue et structurer une recherche d'emploi",
              "Automatiser des tâches répétitives dans un emploi existant",
              "Créer du contenu et des visuels pour une activité autonome",
            ],
          },
          {
            t: "Esprit critique",
            items: [
              "Comprendre les limites et les erreurs des outils",
              "Protéger ses données personnelles",
              "Utiliser l'IA de façon honnête et transparente en emploi",
            ],
          },
        ],
      },
    },

    mission: {
      title: "Notre mission",
      lead:
        "REVERS CANADA est une organisation communautaire montréalaise. Nous accompagnons les personnes en rupture — en priorité les pères, à travers le programme RêvPÈRE — vers l'autonomie économique et sociale.",
      blocks: [
        {
          t: "Ce que nous croyons",
          d: "Un revers n'est pas une identité. Avec un logement, un revenu et un lien social, la très grande majorité des personnes se remettent debout.",
        },
        {
          t: "Ce que nous faisons",
          d: "Nous accueillons, évaluons, orientons, formons et assurons un suivi. Nous privilégions les compétences durables plutôt que le dépannage répété.",
        },
        {
          t: "Ce que nous ne faisons pas",
          d: "Nous ne remplaçons pas les organismes spécialisés existants. Nous travaillons avec eux et nous orientons vers eux dès qu'ils sont mieux placés pour aider.",
        },
      ],
      valuesT: "Nos valeurs",
      values: [
        { t: "Dignité", d: "Personne ne doit se justifier pour recevoir de l'aide." },
        { t: "Réalisme", d: "Des étapes atteignables plutôt que des promesses." },
        { t: "Compétence", d: "Former pour l'économie d'aujourd'hui, pas celle d'hier." },
        { t: "Transparence", d: "Dire clairement ce que nous faisons et ce que nous ne faisons pas." },
      ],
      ctaT: "Vous voulez en parler ?",
      ctaD: "Écrivez-nous ou passez nous voir. Aucune démarche compliquée.",
    },

    resources: {
      title: "Bottin de ressources — Montréal",
      lead:
        "Ces organismes ne sont pas gérés par REVERS CANADA. Nous les listons parce qu'ils font un travail essentiel et que trouver la bonne porte est souvent le plus difficile.",
      note:
        "Répertoire informatif. Vérifiez toujours les heures et l'admissibilité directement auprès de l'organisme. Pour toute urgence, composez le 811 (santé) ou le 911.",
      urgent: "En cas d'urgence ou de détresse : 811 · Info-Social 811 option 2 · 911",
      categories: [
        {
          t: "Pères et famille",
          d: "Soutien à la paternité, séparation, droits de garde, groupes de pères.",
          items: [
            "Maisons d'hébergement et centres de ressources périnatales pour pères",
            "Organismes de médiation familiale",
            "Groupes de soutien à la paternité de quartier",
          ],
        },
        {
          t: "Hébergement et logement",
          d: "Urgence, transitoire, logement social et défense des droits des locataires.",
          items: [
            "Refuges d'urgence pour hommes",
            "Logement transitoire et supervisé",
            "Comités logement et offices d'habitation",
          ],
        },
        {
          t: "Alimentation",
          d: "Dépannage alimentaire, cuisines collectives, repas communautaires.",
          items: [
            "Banques alimentaires de quartier",
            "Cuisines collectives",
            "Popotes et repas communautaires à bas prix",
          ],
        },
        {
          t: "Santé mentale et dépendances",
          d: "Écoute, intervention de crise, suivi psychosocial.",
          items: [
            "Lignes d'écoute et de prévention du suicide",
            "Centres de crise",
            "Ressources en dépendance",
          ],
        },
        {
          t: "Emploi et formation",
          d: "Employabilité, retour aux études, reconnaissance des acquis.",
          items: [
            "Carrefours jeunesse-emploi et centres d'employabilité",
            "Services publics d'emploi du Québec",
            "Formation professionnelle et alphabétisation numérique",
          ],
        },
        {
          t: "Droit et démarches",
          d: "Aide juridique, papiers d'identité, accès aux programmes.",
          items: [
            "Cliniques juridiques communautaires",
            "Aide au remplacement des pièces d'identité",
            "Accompagnement aux démarches gouvernementales",
          ],
        },
      ],
      helpT: "Vous ne savez pas par où commencer ?",
      helpD:
        "Contactez-nous. Nous vous aidons à identifier la bonne ressource et, si vous le souhaitez, nous faisons le pont avec elle.",
    },

    community: {
      title: "Communauté RêvPÈRE",
      lead:
        "La formation ouvre des portes. La communauté empêche de retomber. Les deux vont ensemble.",
      items: [
        {
          t: "Groupes de pairs",
          d: "Des rencontres régulières entre pères qui traversent des situations semblables. Parole libre, confidentialité, aucune obligation de performance.",
        },
        {
          t: "Mentorat",
          d: "Un père plus avancé dans son parcours accompagne un nouveau participant. Le lien est encadré et volontaire des deux côtés.",
        },
        {
          t: "Ateliers pratiques",
          d: "Cuisine, budget, démarches administratives, informatique. Des compétences concrètes, en groupe.",
        },
        {
          t: "Moments père-enfant",
          d: "Des activités pensées pour recréer du temps de qualité, surtout quand la garde est partielle.",
        },
      ],
      volunteerT: "Devenir bénévole ou mentor",
      volunteerD:
        "Vous avez du temps, un métier à transmettre ou simplement de l'écoute ? Écrivez-nous.",
      volunteerCta: "Nous écrire",
    },

    housing: {
      title: "Habitation communautaire",
      lead:
        "Sans logement stable, aucun parcours d'emploi ne tient. Nous accompagnons les personnes dans la recherche, l'obtention et le maintien d'un logement.",
      items: [
        { t: "Recherche de logement", d: "Aide au repérage d'un logement abordable et au montage du dossier locatif." },
        { t: "Logement transitoire", d: "Orientation vers les ressources de logement transitoire et supervisé du réseau." },
        { t: "Maintien en logement", d: "Budget, relation avec le propriétaire, prévention des arriérés et de l'éviction." },
        { t: "Défense des droits", d: "Information sur les droits des locataires et accompagnement vers les comités logement." },
      ],
      noteT: "Important",
      noteD:
        "REVERS CANADA n'est pas un refuge d'urgence. En situation d'itinérance immédiate, contactez-nous et nous vous orientons rapidement vers une ressource d'hébergement.",
    },

    food: {
      title: "Aide et sécurité alimentaire",
      lead:
        "Manger correctement n'est pas un luxe : c'est la base d'un retour à l'emploi. Nous facilitons l'accès aux ressources alimentaires du quartier.",
      items: [
        { t: "Dépannage alimentaire", d: "Orientation vers les banques alimentaires et distributions de quartier." },
        { t: "Cuisines collectives", d: "Cuisiner en groupe, à faible coût, et repartir avec des portions." },
        { t: "Autonomie alimentaire", d: "Planification des repas, budget d'épicerie, bases nutritionnelles." },
        { t: "Repas et enfants", d: "Soutien particulier lors des périodes de garde pour éviter l'insécurité alimentaire." },
      ],
      noteT: "Comment y accéder",
      noteD:
        "Contactez-nous pour connaître les ressources disponibles près de chez vous. Aucun dossier lourd n'est exigé.",
    },

    partners: {
      title: "Partenaires et employeurs",
      lead:
        "RêvPÈRE fonctionne en réseau. Organismes communautaires, employeurs, formateurs et donateurs : chacun tient une partie de la chaîne.",
      groups: [
        {
          t: "Organismes communautaires",
          d: "Nous orientons vers vous, vous nous orientez des participants. Objectif : zéro doublon, zéro personne perdue entre deux services.",
        },
        {
          t: "Employeurs",
          d: "Accueillez un participant en stage, en essai ou en poste. Nous restons présents pendant l'intégration.",
        },
        {
          t: "Formateurs et bénévoles",
          d: "Animez un atelier numérique, web ou IA. Quelques heures par mois suffisent.",
        },
        {
          t: "Donateurs et fondations",
          d: "Vous financez l'équipement, les ateliers et l'accompagnement individuel.",
        },
      ],
      ctaT: "Devenir partenaire",
      ctaD: "Écrivez-nous en précisant votre organisation et ce que vous souhaitez apporter.",
    },

    about: {
      title: "À propos de REVERS CANADA",
      lead:
        "Organisation communautaire montréalaise dédiée à l'accompagnement des personnes en rupture vers l'autonomie, avec le programme RêvPÈRE comme initiative principale.",
      missionT: "Mission",
      missionD:
        "Offrir un environnement sécuritaire, des ressources concrètes et un accompagnement humain pour permettre à chaque personne de se reconstruire.",
      visionT: "Vision",
      visionD:
        "Un Québec où un revers de vie ne condamne personne, et où chaque parent a accès à un logement et à un travail dignes.",
      valuesT: "Valeurs",
      values: ["Dignité", "Écoute", "Action concrète", "Transparence"],
      taxT: "Reçu fiscal",
      taxD:
        "Une confirmation de don vous est envoyée par courriel. Cette confirmation ne constitue pas un reçu fiscal officiel : seuls les reçus officiels émis ultérieurement par REVERS CANADA peuvent être utilisés à des fins d'impôt.",
    },

    programs: {
      title: "Nos programmes",
      lead: "RêvPÈRE en tête, soutenu par l'habitation, l'alimentaire et l'aide internationale.",
      items: [
        {
          t: "RêvPÈRE — emploi, numérique, web, IA",
          d: "Le programme principal : cinq piliers pour ramener les pères vers un travail durable et une autonomie réelle.",
          tag: "Programme phare",
        },
        {
          t: "Habitation communautaire",
          d: "Recherche de logement, logement transitoire, maintien en logement et défense des droits des locataires.",
          tag: "Habitation",
        },
        {
          t: "Aide et sécurité alimentaire",
          d: "Dépannage, cuisines collectives et autonomie alimentaire pour les personnes et familles accompagnées.",
          tag: "Alimentation",
        },
      ],
    },

    international: {
      title: "Aide internationale",
      lead:
        "Notre programme d'aide internationale recueille des dons matériels — jamais d'argent — pour soutenir des familles, des animaux et des communautés à l'étranger.",
      noticeT: "Important",
      noticeD:
        "Aucun don monétaire n'est accepté pour cette section. Les dons financiers à REVERS CANADA servent exclusivement nos programmes au Québec.",
      acceptT: "Ce que nous acceptons aux points de dépôt",
      accept: [
        "Vêtements propres pour adultes et enfants",
        "Nourriture non périssable",
        "Médicaments en cours de validité (pour humains)",
        "Soins vétérinaires: médicaments, vermifuges, antiparasitaires",
        "Nourriture pour animaux (chiens, chats, animaux de ferme)",
        "Matériel vétérinaire et accessoires (laisses, cages, gamelles)",
      ],
      dropT: "Point de dépôt",
      drops: [
        { city: "LaSalle", addr: "5505 Rue Irwin, LaSalle (QC) H8N 1A1", hours: "Sur rendez-vous · 514-825-2825" },
      ],
      whyT: "Pourquoi des dons matériels?",
      whyD:
        "Nous travaillons avec des partenaires locaux fiables qui assurent la livraison directe aux familles, refuges et cliniques vétérinaires sur place. Vos dons matériels arrivent là où on en a réellement besoin.",
    },

    donate: {
      title: "Faire un don",
      lead:
        "Votre don finance les ateliers RêvPÈRE, l'équipement informatique, l'accompagnement individuel et nos volets habitation et alimentaire. La confirmation envoyée par courriel ne constitue pas un reçu fiscal officiel.",
      onceT: "Don ponctuel",
      monthlyT: "Don mensuel",
      amounts: ["25", "50", "100", "250"],
      other: "Autre montant",
      coverFee: "Je couvre les frais de transaction",
      donateBtn: "Préparer mon don",
      donateBtnSecure: "Faire mon don sécurisé",
      monthlyBtn: "Préparer mon don mensuel",
      monthlyBtnSecure: "Faire mon don mensuel sécurisé",
      preparing: "Préparation du paiement sécurisé…",
      redirecting: "Redirection vers le paiement sécurisé…",
      stripeUnavailable:
        "Le paiement sécurisé n'est pas disponible pour le moment. Votre intention de don a été enregistrée.",
      verseT: "Votre impact",
      impactList: [
        "25 $ — du matériel pour un atelier numérique",
        "50 $ — une séance d'accompagnement individuel",
        "100 $ — une journée complète de formation web ou IA",
        "250 $ — l'équipement informatique d'un participant",
      ],
      stripeNote:
        "Les paiements sont traités de manière sécurisée par Stripe. REVERS CANADA ne stocke aucune donnée de carte bancaire.",
      intentSaved: (a: string) => `Merci. Votre intention de don de ${a} $ a été enregistrée.`,
      invalidAmount: "Veuillez choisir ou saisir un montant supérieur à 0.",
    },

    contact: {
      title: "Nous joindre",
      lead: "Une question, un partenariat, un besoin d'aide? Écrivez-nous.",
      name: "Nom complet",
      email: "Courriel",
      phone: "Téléphone (optionnel)",
      subject: "Sujet (optionnel)",
      message: "Message",
      send: "Envoyer mon message",
      sent: "Merci. Votre message a été enregistré et pourra être traité par REVERS CANADA.",
      missing: "Veuillez vérifier les champs obligatoires.",
      unavailable: "La demande n'a pas pu être enregistrée. Veuillez réessayer plus tard.",
      info: "Coordonnées",
      address: "REVERS CANADA · 5505 Rue Irwin, LaSalle (QC) H8N 1A1, Canada",
      phoneNum: "514-825-2825",
      mapsLabel: "Ouvrir dans Google Maps",
    },

    footer: {
      tagline: "Emploi. Web. IA. Autonomie.",
      newsletter: "Infolettre",
      newsletterD: "Recevez nos nouvelles, ateliers et appels au don.",
      firstName: "Prénom",
      lastName: "Nom",
      emailPh: "Adresse courriel",
      subscribe: "S'abonner",
      newsletterOk: "Merci pour votre intérêt. Votre demande d'inscription à l'infolettre a été enregistrée.",
      newsletterAlready: "Cette adresse est déjà enregistrée pour l'infolettre.",
      newsletterErr: "Veuillez entrer une adresse courriel valide.",
      rights: "Tous droits réservés.",
      privacy: "Politique de confidentialité",
      registered: "Organisme communautaire — Montréal, Québec",
      colProgram: "Programme RêvPÈRE",
      colOrg: "Organisation",
      colSupport: "Soutenir",
      colContact: "Nous joindre",
    },
  },

  en: {
    nav: {
      home: "Home",
      about: "About",
      mission: "Mission",
      revpere: "RêvPÈRE",
      programs: "Programs",
      resources: "Resources",
      community: "Community",
      housing: "Housing",
      food: "Food support",
      partners: "Partners",
      international: "International Help",
      donate: "Donate",
      contact: "Contact",
      donateCta: "Donate",
      start: "Start my journey",
      pillars: "The 5 pillars",
      emploi: "Employment",
      numerique: "Digital skills",
      web: "Web",
      distance: "Remote work",
      ia: "Artificial intelligence",
    },
    brand: {
      org: "REVERS CANADA",
      program: "RêvPÈRE",
      programTag: "Work. Web. AI. Independence.",
      umbrella: "A REVERS CANADA program",
    },
    home: {
      heroEyebrow: "REVERS CANADA · Montréal, Québec",
      heroTitleA: "Helping a father",
      heroTitleHighlight: "get back on his feet",
      heroTitleB: " also helps his children move forward",
      heroSubtitle:
        "RêvPÈRE is REVERS CANADA's community program for fathers: employment, digital skills, web, remote work and artificial intelligence. One clear entry point toward lasting independence.",
      ctaDonate: "Donate",
      ctaStart: "Start my journey",
      ctaLearn: "Explore the 5 pillars",
      pillarStrip: ["Employment", "Digital", "Web", "Remote work", "AI"],

      whyKicker: "Why RêvPÈRE",
      whyTitle: "Fathers are often the gap in the safety net",
      whyBody:
        "Many separated, unemployed or housing-insecure men fall between two systems: too independent for emergency services, too fragile for the standard job market. RêvPÈRE builds that missing link — without judgment, and without duplicating the organizations already doing the work.",
      whyList: [
        "Support designed around fathers' realities: custody, support payments, isolation, shame.",
        "Skills that actually pay: digital, web, AI, remote work.",
        "A direct bridge to Montréal's existing resources instead of a duplicate service.",
      ],

      pillarsKicker: "The journey",
      pillarsTitle: "Five pillars, one goal: independence",
      pillarsLead:
        "Each pillar is a concrete module. You can start with any of them, depending on your situation.",

      modelKicker: "Our model",
      modelTitle: "The entry point, not a duplicate",
      modelLead:
        "Montréal already has strong organizations for fathers, housing, food and employment. RêvPÈRE's role is to be the front door that welcomes, guides and stays present over time.",
      modelSteps: [
        { t: "Welcome", d: "A first human contact — no endless intake form, no judgment." },
        { t: "Assess", d: "Understand the real situation: housing, income, custody, health, skills." },
        { t: "Refer", d: "Point to the right partner organization when one already does it better." },
        { t: "Train", d: "Fill the gap: digital, web, AI, remote work, employability." },
        { t: "Follow up", d: "Stay present after placement — that's when most setbacks happen." },
      ],

      ecosystemKicker: "REVERS CANADA",
      ecosystemTitle: "Four streams, one organization",
      ecosystemLead:
        "RêvPÈRE is our flagship program, part of a broader set of community services.",
      ecosystem: [
        {
          tag: "Flagship program",
          t: "RêvPÈRE",
          d: "Employment, digital, web, remote work and AI for fathers rebuilding their lives.",
          to: "/revpere",
        },
        {
          tag: "Stream",
          t: "Community housing",
          d: "Guidance toward social, transitional and affordable housing, plus tenancy support.",
          to: "/habitation",
        },
        {
          tag: "Stream",
          t: "Food support & security",
          d: "Food assistance, collective kitchens and access to neighbourhood resources.",
          to: "/alimentaire",
        },
        {
          tag: "Stream",
          t: "International help",
          d: "In-kind donations only — clothing, medication, veterinary supplies. No money accepted.",
          to: "/international",
        },
      ],

      directoryKicker: "Resource directory",
      directoryTitle: "You're not alone, and you shouldn't have to search alone",
      directoryLead:
        "We maintain a directory of Montréal resources for fathers: shelter, psychosocial support, family law, food, employment.",
      directoryCta: "Open the directory",

      communityKicker: "Community",
      communityTitle: "One supported father supports the next",
      communityBody:
        "Peer groups, mentorship, workshops and father-child moments. Technical skills open doors; social connection prevents relapse.",
      communityCta: "See the community",

      finalTitle: "Helping a father helps a whole family",
      finalLead: "Your gift funds workshops, computer equipment and one-on-one support.",
      ctaBandBtn: "Support RêvPÈRE",
      ctaBand: "Every gesture matters. Become a partner in change.",
    },

    pillarsHub: {
      title: "RêvPÈRE — the 5 pillars",
      lead:
        "A program built as five complementary modules. Each can be taken alone or as a full journey.",
      cta: "Explore this pillar",
      note:
        "Programs are free for participants and adapted to each person's pace. No academic prerequisites.",
    },

    pillars: {
      emploi: {
        n: "01",
        name: "Employment",
        title: "A lasting return to work",
        lead: "Getting back into the job market with a realistic plan, not just a rushed resume.",
        sections: [
          {
            t: "What we work on together",
            items: [
              "Skills assessment and recognition of undiplomated experience",
              "Resume, cover letter and LinkedIn profile reviewed with a coach",
              "Interview prep and handling gaps in your work history",
              "Structured job search: targets, tracking, follow-ups",
            ],
          },
          {
            t: "After being hired",
            items: [
              "Follow-up through the first months, when most drop off",
              "Mediation with the employer when needed",
              "Schedule adjustments around custody rights",
            ],
          },
        ],
      },
      numerique: {
        n: "02",
        name: "Digital skills",
        title: "Essential digital skills",
        lead: "Without digital comfort, an application doesn't exist. We start exactly where you are.",
        sections: [
          {
            t: "The basics",
            items: [
              "Email, file management, security and passwords",
              "Office suite: documents, spreadsheets, presentations",
              "Government forms and online procedures",
              "Smartphone: calendar, documents, digital identity",
            ],
          },
          {
            t: "Equipment",
            items: [
              "On-site workstation access",
              "Equipment loans subject to availability",
              "Help getting low-cost internet",
            ],
          },
        ],
      },
      web: {
        n: "03",
        name: "Web",
        title: "Build and sell on the web",
        lead: "An accessible trade, learnable quickly, and practicable from anywhere.",
        sections: [
          {
            t: "What you learn",
            items: [
              "Build a simple, professional website",
              "Basics of search visibility and online presence",
              "Storefront and online sales for self-employed work",
              "Portfolio and first contracts",
            ],
          },
          {
            t: "Where it leads",
            items: [
              "Freelance self-employment",
              "Web support for neighbourhood small businesses",
              "Junior role in an agency or nonprofit",
            ],
          },
        ],
      },
      distance: {
        n: "04",
        name: "Remote work",
        title: "Remote work, concretely",
        lead:
          "Remote work changes everything for a father: less commuting, more time with the children.",
        sections: [
          {
            t: "Getting ready",
            items: [
              "Setting up a workspace even in a small apartment",
              "Collaboration tools: video calls, task management, file sharing",
              "Discipline, schedules and professional written communication",
            ],
          },
          {
            t: "Finding the work",
            items: [
              "Spotting employers genuinely open to remote work",
              "Contract and freelance platforms",
              "Avoiding scams and abusive offers",
            ],
          },
        ],
      },
      ia: {
        n: "05",
        name: "Artificial intelligence",
        title: "AI as leverage, not a threat",
        lead:
          "Knowing how to use AI is now a baseline skill — and a powerful accelerator for someone starting over.",
        sections: [
          {
            t: "Concrete uses",
            items: [
              "Write, correct and translate professional communications",
              "Prepare for interviews and structure a job search",
              "Automate repetitive tasks in an existing job",
              "Create content and visuals for self-employed work",
            ],
          },
          {
            t: "Critical thinking",
            items: [
              "Understanding the tools' limits and errors",
              "Protecting personal data",
              "Using AI honestly and transparently at work",
            ],
          },
        ],
      },
    },

    mission: {
      title: "Our mission",
      lead:
        "REVERS CANADA is a Montréal community organization. We support people facing a rupture — fathers first, through the RêvPÈRE program — toward economic and social independence.",
      blocks: [
        {
          t: "What we believe",
          d: "A setback is not an identity. With housing, income and social connection, the vast majority of people get back on their feet.",
        },
        {
          t: "What we do",
          d: "We welcome, assess, refer, train and follow up. We favour durable skills over repeated emergency relief.",
        },
        {
          t: "What we don't do",
          d: "We don't replace existing specialized organizations. We work with them and refer to them whenever they're better placed to help.",
        },
      ],
      valuesT: "Our values",
      values: [
        { t: "Dignity", d: "No one should have to justify themselves to receive help." },
        { t: "Realism", d: "Achievable steps rather than promises." },
        { t: "Competence", d: "Training for today's economy, not yesterday's." },
        { t: "Transparency", d: "Saying clearly what we do and what we don't." },
      ],
      ctaT: "Want to talk about it?",
      ctaD: "Write to us or drop by. No complicated process.",
    },

    resources: {
      title: "Resource directory — Montréal",
      lead:
        "These organizations are not run by REVERS CANADA. We list them because their work is essential and finding the right door is often the hardest part.",
      note:
        "Informational directory. Always verify hours and eligibility directly with the organization. In an emergency, call 811 (health) or 911.",
      urgent: "Emergency or distress: 811 · Info-Social 811 option 2 · 911",
      categories: [
        {
          t: "Fathers and family",
          d: "Fatherhood support, separation, custody rights, fathers' groups.",
          items: [
            "Shelters and perinatal resource centres for fathers",
            "Family mediation organizations",
            "Neighbourhood fatherhood support groups",
          ],
        },
        {
          t: "Shelter and housing",
          d: "Emergency, transitional, social housing and tenant rights advocacy.",
          items: [
            "Emergency shelters for men",
            "Transitional and supervised housing",
            "Housing committees and municipal housing offices",
          ],
        },
        {
          t: "Food",
          d: "Food assistance, collective kitchens, community meals.",
          items: [
            "Neighbourhood food banks",
            "Collective kitchens",
            "Low-cost community meal services",
          ],
        },
        {
          t: "Mental health and addiction",
          d: "Listening lines, crisis intervention, psychosocial follow-up.",
          items: [
            "Listening and suicide prevention lines",
            "Crisis centres",
            "Addiction support resources",
          ],
        },
        {
          t: "Employment and training",
          d: "Employability, return to school, recognition of prior learning.",
          items: [
            "Youth employment centres and employability services",
            "Québec public employment services",
            "Vocational training and digital literacy",
          ],
        },
        {
          t: "Legal and paperwork",
          d: "Legal aid, identity documents, access to programs.",
          items: [
            "Community legal clinics",
            "Help replacing identity documents",
            "Support with government procedures",
          ],
        },
      ],
      helpT: "Not sure where to start?",
      helpD:
        "Contact us. We'll help identify the right resource and, if you want, make the introduction for you.",
    },

    community: {
      title: "RêvPÈRE community",
      lead: "Training opens doors. Community keeps you from falling back. Both matter.",
      items: [
        {
          t: "Peer groups",
          d: "Regular meetings between fathers going through similar situations. Free speech, confidentiality, no pressure to perform.",
        },
        {
          t: "Mentorship",
          d: "A father further along in his journey supports a newer participant. The relationship is structured and voluntary on both sides.",
        },
        {
          t: "Practical workshops",
          d: "Cooking, budgeting, paperwork, computers. Concrete skills, learned in a group.",
        },
        {
          t: "Father-child moments",
          d: "Activities designed to rebuild quality time, especially with partial custody.",
        },
      ],
      volunteerT: "Become a volunteer or mentor",
      volunteerD: "Have time, a trade to pass on, or simply a listening ear? Write to us.",
      volunteerCta: "Contact us",
    },

    housing: {
      title: "Community housing",
      lead:
        "Without stable housing, no employment path holds. We support people in finding, obtaining and keeping a home.",
      items: [
        { t: "Housing search", d: "Help finding affordable housing and building a rental application." },
        { t: "Transitional housing", d: "Referral to transitional and supervised housing resources in the network." },
        { t: "Keeping the home", d: "Budgeting, landlord relations, preventing arrears and eviction." },
        { t: "Rights advocacy", d: "Information on tenant rights and referral to housing committees." },
      ],
      noteT: "Important",
      noteD:
        "REVERS CANADA is not an emergency shelter. If you are homeless right now, contact us and we will quickly direct you to a shelter resource.",
    },

    food: {
      title: "Food support & security",
      lead:
        "Eating properly isn't a luxury: it's the foundation of a return to work. We make neighbourhood food resources easier to reach.",
      items: [
        { t: "Food assistance", d: "Referral to food banks and neighbourhood distributions." },
        { t: "Collective kitchens", d: "Cook as a group, at low cost, and leave with portions." },
        { t: "Food autonomy", d: "Meal planning, grocery budgeting, nutrition basics." },
        { t: "Meals and children", d: "Extra support during custody periods to prevent food insecurity." },
      ],
      noteT: "How to access it",
      noteD:
        "Contact us to learn what's available near you. No heavy paperwork required.",
    },

    partners: {
      title: "Partners and employers",
      lead:
        "RêvPÈRE works as a network. Community organizations, employers, trainers and donors each hold part of the chain.",
      groups: [
        {
          t: "Community organizations",
          d: "We refer to you, you refer participants to us. Goal: no duplication, nobody lost between two services.",
        },
        {
          t: "Employers",
          d: "Host a participant for an internship, trial or position. We stay present during onboarding.",
        },
        {
          t: "Trainers and volunteers",
          d: "Lead a digital, web or AI workshop. A few hours a month is enough.",
        },
        {
          t: "Donors and foundations",
          d: "You fund equipment, workshops and one-on-one support.",
        },
      ],
      ctaT: "Become a partner",
      ctaD: "Write to us with your organization and what you'd like to contribute.",
    },

    about: {
      title: "About REVERS CANADA",
      lead:
        "A Montréal community organization dedicated to guiding people through rupture toward independence, with the RêvPÈRE program as our main initiative.",
      missionT: "Mission",
      missionD:
        "Offer a safe environment, real resources and human support so every person can rebuild.",
      visionT: "Vision",
      visionD:
        "A Québec where a setback condemns no one, and where every parent has access to dignified housing and work.",
      valuesT: "Values",
      values: ["Dignity", "Listening", "Concrete action", "Transparency"],
      taxT: "Tax receipts",
      taxD:
        "A donation confirmation is sent by email. This confirmation does not constitute an official tax receipt: only official receipts later issued by REVERS CANADA can be used for tax purposes.",
    },

    programs: {
      title: "Our programs",
      lead: "RêvPÈRE first, supported by housing, food security and international help.",
      items: [
        {
          t: "RêvPÈRE — work, digital, web, AI",
          d: "Our main program: five pillars to bring fathers back to durable work and real independence.",
          tag: "Flagship program",
        },
        {
          t: "Community housing",
          d: "Housing search, transitional housing, tenancy support and tenant rights advocacy.",
          tag: "Housing",
        },
        {
          t: "Food support & security",
          d: "Assistance, collective kitchens and food autonomy for the people and families we support.",
          tag: "Food",
        },
      ],
    },

    international: {
      title: "International Help",
      lead:
        "Our international help program collects in-kind donations — never money — to support families, animals and communities abroad.",
      noticeT: "Important",
      noticeD:
        "No monetary donations are accepted for this section. Financial gifts to REVERS CANADA exclusively fund our programs in Québec.",
      acceptT: "What we accept at drop-off points",
      accept: [
        "Clean clothing for adults and children",
        "Non-perishable food",
        "Unexpired human medication",
        "Veterinary care: medication, dewormers, antiparasitics",
        "Pet & farm animal food (dogs, cats, livestock)",
        "Veterinary equipment & accessories (leashes, crates, bowls)",
      ],
      dropT: "Drop-off location",
      drops: [
        { city: "LaSalle", addr: "5505 Rue Irwin, LaSalle QC H8N 1A1", hours: "By appointment · 514-825-2825" },
      ],
      whyT: "Why in-kind donations?",
      whyD:
        "We work with trusted local partners who deliver directly to families, shelters and veterinary clinics on the ground. Your in-kind donations land exactly where they're truly needed.",
    },

    donate: {
      title: "Make a donation",
      lead:
        "Your gift funds RêvPÈRE workshops, computer equipment, one-on-one support and our housing and food streams. The email confirmation does not constitute an official tax receipt.",
      onceT: "One-time gift",
      monthlyT: "Monthly gift",
      amounts: ["25", "50", "100", "250"],
      other: "Other amount",
      coverFee: "I'll cover the transaction fee",
      donateBtn: "Prepare my gift",
      donateBtnSecure: "Make my secure donation",
      monthlyBtn: "Prepare my monthly gift",
      monthlyBtnSecure: "Make my secure monthly donation",
      preparing: "Preparing secure payment…",
      redirecting: "Redirecting to secure payment…",
      stripeUnavailable:
        "Secure payment is unavailable right now. Your donation intent has been saved.",
      verseT: "Your impact",
      impactList: [
        "$25 — materials for one digital workshop",
        "$50 — one one-on-one coaching session",
        "$100 — a full day of web or AI training",
        "$250 — computer equipment for one participant",
      ],
      stripeNote:
        "Payments are processed securely by Stripe. REVERS CANADA does not store any credit card data.",
      intentSaved: (a: string) => `Thank you. Your $${a} donation intent has been recorded.`,
      invalidAmount: "Please choose or enter an amount greater than 0.",
    },

    contact: {
      title: "Contact us",
      lead: "A question, a partnership, or a need for help? Write to us.",
      name: "Full name",
      email: "Email",
      phone: "Phone (optional)",
      subject: "Subject (optional)",
      message: "Message",
      send: "Send my message",
      sent: "Thank you. Your message has been recorded and will be reviewed by REVERS CANADA.",
      missing: "Please check the required fields.",
      unavailable: "The request could not be saved. Please try again later.",
      info: "Contact information",
      address: "REVERS CANADA · 5505 Rue Irwin, LaSalle QC H8N 1A1, Canada",
      phoneNum: "514-825-2825",
      mapsLabel: "Open in Google Maps",
    },

    footer: {
      tagline: "Work. Web. AI. Independence.",
      newsletter: "Newsletter",
      newsletterD: "Get our news, workshops and donation appeals.",
      firstName: "First name",
      lastName: "Last name",
      emailPh: "Email address",
      subscribe: "Subscribe",
      newsletterOk: "Thank you for your interest. Your newsletter subscription request has been recorded.",
      newsletterAlready: "This address is already signed up for the newsletter.",
      newsletterErr: "Please enter a valid email address.",
      rights: "All rights reserved.",
      privacy: "Privacy policy",
      registered: "Community organization — Montréal, Québec",
      colProgram: "RêvPÈRE program",
      colOrg: "Organization",
      colSupport: "Support",
      colContact: "Contact",
    },
  },
};

export type Translations = typeof translations.fr;
export type PillarKey = keyof Translations["pillars"];
