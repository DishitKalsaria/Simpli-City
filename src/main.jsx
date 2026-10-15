
import React, { useEffect, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { AnimatePresence, motion } from 'framer-motion'
import './styles.css'
import profilePhoto from './assets/dishit-profile.jpg'

const LANGUAGES = [
  { code:'en', label:'English' },
  { code:'nl', label:'Nederlands' },
  { code:'es', label:'Español' },
  { code:'fr', label:'Français' }
]

const TRANSLATIONS = {
  nl: {
    'IDEAS INTO SYSTEMS':'IDEEËN NAAR SYSTEMEN',
    'Building practical solutions for complex industries.':'Praktische systemen bouwen voor complexe sectoren.',
    'Click a structure to explore · Scroll anywhere for the day / night transition':'Klik op een gebouw om te verkennen · Scroll overal voor de dag-/nachtovergang',
    'HEALTHCARE OFFICE':'ZORGKANTOOR','UNDER CONSTRUCTION OFFICE':'KANTOOR IN AANBOUW','DISHIT TOWER':'HET CONTINUÜM','THE CONTINUUM':'HET CONTINUÜM','ENERGY OFFICE':'ENERGIEKANTOOR','MANUFACTURING OFFICE':'PRODUCTIEKANTOOR','CONNECT':'VERBINDEN',
    'Back to city':'Terug naar stad','Back to tower':'Terug naar toren','Choose a floor':'Kies een verdieping','Hover to highlight the matching tower floor. Click to open it.':'Beweeg over een verdieping om deze in de toren te markeren. Klik om te openen.',
    'HEALTHCARE':'GEZONDHEIDSZORG','Healthcare operations & workflow improvement':'Zorgprocessen & workflowverbetering','Operational experience panel':'Operationele ervaring',
    'Time Saved':'Tijd bespaard','Money Saved':'Geld bespaard','Users Helped':'Gebruikers geholpen','Experience':'Ervaring','Company':'Bedrijf','Role':'Rol','Timeline':'Periode','Skills & ratings':'Vaardigheden & beoordelingen','Applications':'Toepassingen','Highlights':'Hoogtepunten',
    'Construction going on':'Bouw in uitvoering','Stay tuned':'Blijf op de hoogte','IN PROGRESS':'IN UITVOERING','Construction going on — stay tuned.':'Bouw in uitvoering — blijf op de hoogte.',
    'ENERGY':'ENERGIE','Enterprise data products for utility operations':'Enterprise-dataproducten voor nutsactiviteiten','MANUFACTURING':'PRODUCTIE','Production, quality & dispatch intelligence':'Productie-, kwaliteits- & verzendinzichten',
    'Builder · Leader · Systems Thinker':'Bouwer · Leider · Systeemdenker','Builder focused on turning ambiguity into systems, platforms, and operating leverage across complex industries.':'Bouwer die ambiguïteit omzet in systemen, platforms en operationele slagkracht in complexe sectoren.',
    'The Living Room':'De Woonkamer','Concierge':'Conciërge','About me, hobbies, industries I enjoy':'Over mij, hobby’s en sectoren die mij interesseren','About me':'Over mij','Hobbies':'Hobby’s','Interested industries':'Interessante sectoren',
    'The Think Tank':'De Denktank','Library':'Bibliotheek','Education, research, interested topics':'Opleiding, onderzoek en interessegebieden','Education':'Opleiding','Research':'Onderzoek','Interested topics':'Interessegebieden',
    'The Trophy Room':'De Trofeeënkamer','Badges':'Badges','Education highlights, certificates, credentials':'Opleidingshoogtepunten, certificaten en referenties','Education highlights':'Opleidingshoogtepunten','Certificates':'Certificaten','Other credentials':'Overige referenties',
    'The Skill Forge':'De Vaardighedensmederij','Gym':'Gym','Skills grid and capability ratings':'Vaardighedenmatrix en niveaus','Programming Skills':'Programmeervaardigheden','Hardware Skills':'Hardwarevaardigheden','Language Skills':'Taalvaardigheden','Software Development':'Softwareontwikkeling','Cyber Security':'Cyberbeveiliging','Business / Finance':'Business / Financiën',
    'The Workshop':'De Werkplaats','Laboratory':'Laboratorium','Project categories and links':'Projectcategorieën en links','Enterprise Data Systems':'Enterprise-datasystemen','Operational Applications':'Operationele toepassingen','Emerging Work':'Opkomend werk',
    'The Wall of Fame':'De Erewand','Hall of Fame':'Eregalerij','Endorsements and visitor feedback':'Aanbevelingen en bezoekersfeedback','Endorsements':'Aanbevelingen','Website feedback':'Websitefeedback','Your name':'Je naam','Share a quick thought about the website':'Deel kort wat je van de website vindt','Post feedback':'Feedback plaatsen','Visitor feedback will appear here.':'Bezoekersfeedback verschijnt hier.',
    'The Arena':'De Arena','Hall of Game':'Spelhal','Play · Explore · Interact':'Speel · Ontdek · Interageer','Core games':'Hoofdspellen','Other featured games':'Andere uitgelichte spellen','Open ↗':'Open ↗',
    'Systems thinker':'Systeemdenker','Builder mindset':'Bouwermentaliteit','Curiosity':'Nieuwsgierigheid','Structured problem solving':'Gestructureerd probleemoplossen','Building side projects':'Nevenprojecten bouwen','Exploring games':'Spellen ontdekken','Systems thinking':'Systeemdenken','Reading technology':'Technologie lezen','Interactive design':'Interactief ontwerp','Trying new ideas':'Nieuwe ideeën uitproberen',
    'Energy':'Energie','Manufacturing':'Productie','Healthcare':'Gezondheidszorg','Operations':'Operaties','Enterprise Systems':'Enterprise-systemen','Optimization':'Optimalisatie','Game theory':'Speltheorie','Data platforms':'Dataplatforms','Industrial systems':'Industriële systemen','Human-in-the-loop systems':'Mens-in-de-lus-systemen','AI governance':'AI-governance'
  },
  es: {
    'IDEAS INTO SYSTEMS':'IDEAS EN SISTEMAS',
    'Building practical solutions for complex industries.':'Construyendo sistemas prácticos para industrias complejas.',
    'Click a structure to explore · Scroll anywhere for the day / night transition':'Haz clic en una estructura para explorar · Desplázate para cambiar entre día y noche',
    'HEALTHCARE OFFICE':'OFICINA DE SALUD','UNDER CONSTRUCTION OFFICE':'OFICINA EN CONSTRUCCIÓN','DISHIT TOWER':'EL CONTINUUM','THE CONTINUUM':'EL CONTINUUM','ENERGY OFFICE':'OFICINA DE ENERGÍA','MANUFACTURING OFFICE':'OFICINA DE MANUFACTURA','CONNECT':'CONECTAR',
    'Back to city':'Volver a la ciudad','Back to tower':'Volver a la torre','Choose a floor':'Elige un piso','Hover to highlight the matching tower floor. Click to open it.':'Pasa el cursor para resaltar el piso correspondiente. Haz clic para abrirlo.',
    'HEALTHCARE':'SALUD','Healthcare operations & workflow improvement':'Operaciones de salud y mejora de flujos','Operational experience panel':'Experiencia operativa',
    'Time Saved':'Tiempo ahorrado','Money Saved':'Dinero ahorrado','Users Helped':'Usuarios ayudados','Experience':'Experiencia','Company':'Empresa','Role':'Rol','Timeline':'Periodo','Skills & ratings':'Habilidades y niveles','Applications':'Aplicaciones','Highlights':'Aspectos destacados',
    'Construction going on':'Construcción en curso','Stay tuned':'Mantente atento','IN PROGRESS':'EN PROGRESO','Construction going on — stay tuned.':'Construcción en curso — mantente atento.',
    'ENERGY':'ENERGÍA','Enterprise data products for utility operations':'Productos de datos empresariales para operaciones energéticas','MANUFACTURING':'MANUFACTURA','Production, quality & dispatch intelligence':'Inteligencia de producción, calidad y despacho',
    'Builder · Leader · Systems Thinker':'Constructor · Líder · Pensador de sistemas','Builder focused on turning ambiguity into systems, platforms, and operating leverage across complex industries.':'Constructor enfocado en convertir la ambigüedad en sistemas, plataformas y ventaja operativa en industrias complejas.',
    'The Living Room':'La Sala de Estar','Concierge':'Conserjería','About me, hobbies, industries I enjoy':'Sobre mí, hobbies e industrias que me interesan','About me':'Sobre mí','Hobbies':'Hobbies','Interested industries':'Industrias de interés',
    'The Think Tank':'El Centro de Ideas','Library':'Biblioteca','Education, research, interested topics':'Educación, investigación y temas de interés','Education':'Educación','Research':'Investigación','Interested topics':'Temas de interés',
    'The Trophy Room':'La Sala de Trofeos','Badges':'Credenciales','Education highlights, certificates, credentials':'Educación, certificados y credenciales','Education highlights':'Formación destacada','Certificates':'Certificados','Other credentials':'Otras credenciales',
    'The Skill Forge':'La Forja de Habilidades','Gym':'Gimnasio','Skills grid and capability ratings':'Matriz de habilidades y niveles','Programming Skills':'Programación','Hardware Skills':'Hardware','Language Skills':'Idiomas','Software Development':'Desarrollo de software','Cyber Security':'Ciberseguridad','Business / Finance':'Negocios / Finanzas',
    'The Workshop':'El Taller','Laboratory':'Laboratorio','Project categories and links':'Categorías de proyectos y enlaces','Enterprise Data Systems':'Sistemas de datos empresariales','Operational Applications':'Aplicaciones operativas','Emerging Work':'Trabajo emergente',
    'The Wall of Fame':'El Muro de la Fama','Hall of Fame':'Salón de la Fama','Endorsements and visitor feedback':'Recomendaciones y comentarios de visitantes','Endorsements':'Recomendaciones','Website feedback':'Comentarios del sitio','Your name':'Tu nombre','Share a quick thought about the website':'Comparte una opinión breve sobre el sitio','Post feedback':'Publicar comentario','Visitor feedback will appear here.':'Los comentarios de visitantes aparecerán aquí.',
    'The Arena':'La Arena','Hall of Game':'Salón de Juegos','Play · Explore · Interact':'Juega · Explora · Interactúa','Core games':'Juegos principales','Other featured games':'Otros juegos destacados','Open ↗':'Abrir ↗',
    'Systems thinker':'Pensador de sistemas','Builder mindset':'Mentalidad de constructor','Curiosity':'Curiosidad','Structured problem solving':'Resolución estructurada de problemas','Building side projects':'Crear proyectos personales','Exploring games':'Explorar juegos','Systems thinking':'Pensamiento sistémico','Reading technology':'Leer sobre tecnología','Interactive design':'Diseño interactivo','Trying new ideas':'Probar nuevas ideas',
    'Energy':'Energía','Manufacturing':'Manufactura','Healthcare':'Salud','Operations':'Operaciones','Enterprise Systems':'Sistemas empresariales','Optimization':'Optimización','Game theory':'Teoría de juegos','Data platforms':'Plataformas de datos','Industrial systems':'Sistemas industriales','Human-in-the-loop systems':'Sistemas con humano en el circuito','AI governance':'Gobernanza de IA'
  },
  fr: {
    'IDEAS INTO SYSTEMS':'DES IDÉES AUX SYSTÈMES',
    'Building practical solutions for complex industries.':'Construire des systèmes pratiques pour des secteurs complexes.',
    'Click a structure to explore · Scroll anywhere for the day / night transition':'Cliquez sur une structure pour explorer · Faites défiler pour passer du jour à la nuit',
    'HEALTHCARE OFFICE':'BUREAU SANTÉ','UNDER CONSTRUCTION OFFICE':'BUREAU EN CONSTRUCTION','DISHIT TOWER':'LE CONTINUUM','THE CONTINUUM':'LE CONTINUUM','ENERGY OFFICE':'BUREAU ÉNERGIE','MANUFACTURING OFFICE':'BUREAU INDUSTRIE','CONNECT':'CONNECTER',
    'Back to city':'Retour à la ville','Back to tower':'Retour à la tour','Choose a floor':'Choisissez un étage','Hover to highlight the matching tower floor. Click to open it.':'Survolez pour mettre en évidence l’étage correspondant. Cliquez pour l’ouvrir.',
    'HEALTHCARE':'SANTÉ','Healthcare operations & workflow improvement':'Opérations de santé et amélioration des flux','Operational experience panel':'Expérience opérationnelle',
    'Time Saved':'Temps gagné','Money Saved':'Économies','Users Helped':'Utilisateurs aidés','Experience':'Expérience','Company':'Entreprise','Role':'Rôle','Timeline':'Période','Skills & ratings':'Compétences et niveaux','Applications':'Applications','Highlights':'Points forts',
    'Construction going on':'Travaux en cours','Stay tuned':'À suivre','IN PROGRESS':'EN COURS','Construction going on — stay tuned.':'Travaux en cours — à suivre.',
    'ENERGY':'ÉNERGIE','Enterprise data products for utility operations':'Produits de données d’entreprise pour les opérations énergétiques','MANUFACTURING':'INDUSTRIE','Production, quality & dispatch intelligence':'Pilotage de la production, qualité et expédition',
    'Builder · Leader · Systems Thinker':'Bâtisseur · Leader · Penseur systémique','Builder focused on turning ambiguity into systems, platforms, and operating leverage across complex industries.':'Bâtisseur qui transforme l’ambiguïté en systèmes, plateformes et levier opérationnel dans des secteurs complexes.',
    'The Living Room':'Le Salon','Concierge':'Conciergerie','About me, hobbies, industries I enjoy':'À propos de moi, loisirs et secteurs qui m’intéressent','About me':'À propos de moi','Hobbies':'Loisirs','Interested industries':'Secteurs d’intérêt',
    'The Think Tank':'Le Laboratoire d’Idées','Library':'Bibliothèque','Education, research, interested topics':'Formation, recherche et sujets d’intérêt','Education':'Formation','Research':'Recherche','Interested topics':'Sujets d’intérêt',
    'The Trophy Room':'La Salle des Trophées','Badges':'Badges','Education highlights, certificates, credentials':'Formation, certificats et références','Education highlights':'Formation mise en avant','Certificates':'Certificats','Other credentials':'Autres références',
    'The Skill Forge':'La Forge des Compétences','Gym':'Gym','Skills grid and capability ratings':'Grille de compétences et niveaux','Programming Skills':'Programmation','Hardware Skills':'Matériel','Language Skills':'Langues','Software Development':'Développement logiciel','Cyber Security':'Cybersécurité','Business / Finance':'Business / Finance',
    'The Workshop':'L’Atelier','Laboratory':'Laboratoire','Project categories and links':'Catégories de projets et liens','Enterprise Data Systems':'Systèmes de données d’entreprise','Operational Applications':'Applications opérationnelles','Emerging Work':'Travaux émergents',
    'The Wall of Fame':'Le Mur d’Honneur','Hall of Fame':'Temple de la renommée','Endorsements and visitor feedback':'Recommandations et avis des visiteurs','Endorsements':'Recommandations','Website feedback':'Avis sur le site','Your name':'Votre nom','Share a quick thought about the website':'Partagez rapidement votre avis sur le site','Post feedback':'Publier l’avis','Visitor feedback will appear here.':'Les avis des visiteurs apparaîtront ici.',
    'The Arena':'L’Arène','Hall of Game':'Salle de Jeux','Play · Explore · Interact':'Jouer · Explorer · Interagir','Core games':'Jeux principaux','Other featured games':'Autres jeux à découvrir','Open ↗':'Ouvrir ↗',
    'Systems thinker':'Penseur systémique','Builder mindset':'Esprit de bâtisseur','Curiosity':'Curiosité','Structured problem solving':'Résolution structurée de problèmes','Building side projects':'Créer des projets personnels','Exploring games':'Explorer des jeux','Systems thinking':'Pensée systémique','Reading technology':'Lire sur la technologie','Interactive design':'Design interactif','Trying new ideas':'Tester de nouvelles idées',
    'Energy':'Énergie','Manufacturing':'Industrie','Healthcare':'Santé','Operations':'Opérations','Enterprise Systems':'Systèmes d’entreprise','Optimization':'Optimisation','Game theory':'Théorie des jeux','Data platforms':'Plateformes de données','Industrial systems':'Systèmes industriels','Human-in-the-loop systems':'Systèmes avec humain dans la boucle','AI governance':'Gouvernance de l’IA'
  }
}

function tr(lang, text){ return lang === 'en' ? text : (TRANSLATIONS[lang]?.[text] || text) }
function localize(value, lang){
  if(Array.isArray(value)) return value.map(v=>localize(v,lang))
  if(value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([k,v])=>[k,localize(v,lang)]))
  if(typeof value === 'string') return tr(lang,value)
  return value
}

const buildingCards = {
  hospital: {
    eyebrow: 'HEALTHCARE',
    title: 'Healthcare operations & workflow improvement',
    icon: '✚',
    metrics: [['Time Saved', '10 hrs/wk'], ['Money Saved', '$15K+/yr'], ['Users Helped', '3+ users']],
    company: 'UniversalMed Supply',
    roleLabel: 'Audit Appeal Analyst / Intern',
    timeline: 'Oct 2020 – Dec 2020',
    skills: ['Quantitative analysis', 'Demand forecasting', 'Workflow automation', 'Operational reporting'],
    ratings: [['Analysis', '4.7'], ['Automation', '4.6'], ['Operations', '4.5']],
    applications: ['Google Sheets', 'Google Drive', 'Google Forms', 'Google Docs', 'Google Slides'],
    highlights: [
      'Improved department performance by 30% through quantitative analysis and forecasting recommendations.',
      'Built an automated data loading and migration workflow that saved 10 hours per week.',
      'Turned manual operational work into a repeatable process with clearer visibility for teams.'
    ]
  },
  construction: {
    eyebrow: 'UNDER CONSTRUCTION OFFICE',
    title: 'Construction going on',
    role: 'Stay tuned',
    icon: '△'
  },
  energy: {
    eyebrow: 'ENERGY',
    title: 'Enterprise data products for utility operations',
    icon: '⚡',
    metrics: [['Time Saved', '2,000+ hrs'], ['Money Saved', '$250K+/yr'], ['Users Helped', '50+ users']],
    company: 'National Grid',
    roleLabel: 'Data Scientist',
    timeline: 'May 2021 – Dec 2025',
    skills: ['Data products', 'Forecasting', 'Product ownership', 'Operational analytics'],
    ratings: [['Data Products', '4.5'], ['Analytics', '4.8'], ['Leadership', '4.2']],
    applications: ['Snowflake', 'Salesforce', 'Power BI', 'Excel', 'Power Apps', 'Python', 'SQL'],
    highlights: [
      'Reduced manual effort by up to 80% and improved reporting cycle time by 65%.',
      'Presented a live enterprise MVP demo to 500+ attendees and supported 50+ users.',
      'Translated stakeholder needs into KPIs, backlog items, release priorities, and UAT.'
    ]
  },
  manufacturing: {
    eyebrow: 'MANUFACTURING',
    title: 'Production, quality & dispatch intelligence',
    icon: '▣',
    metrics: [['Time Saved', '15 hrs/wk'], ['Money Saved', '$40K+/yr'], ['Users Helped', '15+ users']],
    company: 'Vijay Engineering Works',
    roleLabel: 'Supply Chain / Data Analyst',
    timeline: 'Aug 2016 – Jul 2018',
    skills: ['Manufacturing analytics', 'BOM readiness', 'Inventory visibility', 'Quality tracking'],
    ratings: [['Operations', '4.7'], ['Planning', '4.6'], ['Quality', '4.5']],
    applications: ['SAP ERP', 'Excel', 'Power BI', 'MRP / Production planning', 'Supplier tracking', 'Quality reporting'],
    highlights: [
      'Built dashboards across production, backlog, dispatch, vendors, and quality.',
      'Tracked delivery, cycle time, defects, shortages, supplier lead time, and delays.',
      'Connected production, procurement, quality, and dispatch teams through shared metrics.'
    ]
  },
  telecom: {
    eyebrow: 'CONNECT',
    title: 'Dishit Kalsaria',
    role: 'Builder · Innovator · Systems Thinker',
    links: [
      ['LinkedIn', 'https://www.linkedin.com/in/dishitk'],
      ['GitHub', 'https://github.com/'],
      ['Medium', 'https://medium.com/'],
      ['Email', 'mailto:dishitkalsaria@gmail.com']
    ]
  }
}

const floorData = [
  {
    id:'concierge', no:'01', name:'The Living Room', desc:'About me, hobbies, industries I enjoy', icon:'◎', art:'Builder · Curiosity · Personality',
    about:[
      'I build practical systems that turn ambiguity into structure, visibility, and execution across complex industries.',
      'My work sits at the intersection of data, product thinking, operational design, and interactive system building.'
    ],
    hobbies:[['🏊','Swimming'],['🎮','Exploring games'],['🧩','System Design'],['📚','Reading'],['⛳','Golf'],['🧪','Trying new ideas']],
    industries:[['⚡','Energy'],['🏭','Manufacturing'],['✚','Healthcare'],['🤖','AI / Data Platforms'],['⚙','Operations'],['🏢','Enterprise Systems']],
    languages:[['English',4.9],['Gujarati',4.9],['Hindi',4.8],['French',2.8],['Dutch',2.2],['Spanish',2.6]]
  },
  {
    id:'library', no:'02', name:'The Think Tank', desc:'Research, ideas, and systems that shape how I build', icon:'▤', art:'Ideas · Research · Systems',
    featuredResearch:[
      {
        icon:'game', title:'Non-Cooperative Game Models', tag:'GAME THEORY',
        summary:'Equilibrium, strategic interaction, and computational approaches for systems where multiple actors pursue different objectives.',
        context:'Graduate research foundation in non-cooperative game models, including Nikaido–Isoda based methods.',
        links:[
          ['Non-Cooperative Games — John Nash','https://www.jstor.org/stable/1969529']
        ]
      },
      {
        icon:'network', title:'Cyber-Physical Systems', tag:'SYSTEMS',
        summary:'How computation, physical processes, sensing, and control interact when software decisions have real-world consequences.',
        context:'A research area connected to my graduate work on computational algorithms for large-scale cyber-physical systems.',
        links:[
          ['Cyber Physical Systems: Design Challenges','https://www2.eecs.berkeley.edu/Pubs/TechRpts/2008/EECS-2008-8.html']
        ]
      },
      {
        icon:'human', title:'Human + Machine Decision Systems', tag:'HUMAN-IN-THE-LOOP',
        summary:'Designing systems where automation handles scale while people retain judgment, intervention, and accountability.',
        context:'A recurring theme across product design, operational systems, and governed AI execution.',
        links:[
          ['A Survey of Human-in-the-loop for Machine Learning','https://arxiv.org/abs/2108.00941']
        ]
      }
    ],
    topics:[
      {icon:'optimize', name:'Optimization', short:'Resources, trade-offs, and better decisions', why:'I am interested in optimization as the bridge between analysis and execution: deciding what should happen under real constraints.', links:[['Non-Cooperative Games','https://www.jstor.org/stable/1969529']]},
      {icon:'game', name:'Game Theory', short:'Strategy across competing objectives', why:'Useful when incentives, stakeholders, or autonomous actors do not all optimize for the same outcome.', links:[['Non-Cooperative Games','https://www.jstor.org/stable/1969529']]},
      {icon:'shield', name:'AI Governance', short:'Authorization, accountability, and control', why:'How AI systems can act with clear boundaries, approvals, traceability, and accountable execution.', links:[['Responsible AI Governance: A Systematic Literature Review','https://arxiv.org/abs/2401.10896']]},
      {icon:'human', name:'Human-in-the-Loop', short:'Judgment where automation should not decide alone', why:'I am interested in interfaces where human judgment and machine capability reinforce each other instead of competing.', links:[['Human-in-the-loop ML Survey','https://arxiv.org/abs/2108.00941']]},
      {icon:'factory', name:'Industrial Systems', short:'Physical operations connected to digital decisions', why:'Factories, machines, supply chains, and operational workflows make system design tangible because every decision eventually becomes an action.', links:[['Cyber Physical Systems: Design Challenges','https://www2.eecs.berkeley.edu/Pubs/TechRpts/2008/EECS-2008-8.html']]},
      {icon:'data', name:'Data Platforms', short:'Turning fragmented data into usable systems', why:'Data becomes valuable when it is structured around decisions, workflows, and the people who need to act on it.', links:[]}
    ],
    education:['M.S. Industrial Engineering — Texas A&M University–Kingsville','B.Tech. Electronics & Telecommunication']
  },
  {
    id:'badges', no:'03', name:'The Trophy Room', desc:'Education highlights, certificates, credentials', icon:'⬢', art:'Credentials · Professional growth',
    educationHighlights:[['M.S.','Industrial Engineering','Texas A&M University–Kingsville'],['B.Tech.','Electronics & Telecommunication','MPSTME University']],
    certificates:[['SAFe','6 POPM'],['SAFe','6 Practitioner'],['Leadership','The Living Leader Certified']],
    credentials:[["NASA's Human Rover Exploration Challenge 2017",'Representing India as part of Team Technovators'],['Institute of Engineering Technology (IET)',"Joint Secretary of Electronics and Telecomm. Department of IET's NMIMS chapter."]],
    endorsements:[
      '“Thank you Dishit for your continued focus on finding a better way to resolve issues for the team.” — Manager, National Grid',
      '“This appreciate award is a small recognition for your efforts, Dishit. You are effectively collaborating across 4 departments to achieve better outcomes for our commercial customers. You are centralizing data and being innovative in consolidating information for the account audit. The speed you are using to address these business challenges is greatly appreciated. We are so glad to have you here at National Grid” — Vice President, Account Management, National Grid'
    ]
  },
  {
    id:'gym', no:'04', name:'The Skill Forge', desc:'Skills grid and capability ratings', icon:'◆', art:'Train capabilities · Build strength',
    skillGroups:[
      { title:'Programming Skills', items:[['Python',4.2],['SQL',4.9],['R',4.2],['Java',4.5],['TypeScript',4.0]] },
      { title:'Hardware Skills', items:[['PCB design',4.1],['Electronics',4.4],['Sensors',4.1],['Embedded systems',3.9]] },
      { title:'AI / ML Skills', items:[['Generative AI',3.9],['Agentic AI',4.1],['LangGraph',4.0],['LLM Integration',3.9],['Machine Learning',3.8],['Model Evaluation / RAG',3.5]] },
      { title:'Software Development', items:[['React',4.4],['FastAPI',4.5],['Node.js',4.1],['PostgreSQL',4.7]] },
      { title:'Cyber Security', items:[['Access control',4.1],['MFA / SSO',4.2],['Audit trails',4.6],['Secure workflows',4.3]] },
      { title:'Business / Finance', items:[['Forecasting',4.7],['Operations',4.8],['Accounting',3.9],['Product strategy',4.7]] }
    ]
  },
  {
    id:'laboratory', no:'05', name:'The Workshop', desc:'Selected systems, tools, and experiments', icon:'✦', art:'Build · Test · Improve',
    projects:[
      {
        id:'unit', icon:'data', title:'UNIT', type:'ENTERPRISE DATA PRODUCT',
        teaser:'Operational data brought into one decision layer.',
        description:'A cross-functional data product designed to unify operational information, reduce fragmented reporting, and give teams a consistent view of the work that matters.',
        analytics:[['Problem','Fragmented data'],['Reach','Cross-functional'],['Outcome','Operational visibility'],['Build mode','Product + analytics']],
        tech:['SQL','Python','Power BI','Data pipelines','Enterprise systems'],
        roles:['Product ownership','Data science','Stakeholder coordination','System design'],
      },
      {
        id:'auditor', icon:'check', title:'Internal Auditor', type:'WORKFLOW APPLICATION',
        teaser:'A manual audit process turned into a traceable application.',
        description:'An internal workflow application that standardized audit activity, reduced repetitive manual effort, and created a clearer operating trail for users and reviewers.',
        analytics:[['Manual effort','≈97% reduction'],['Primary problem','Repetitive workflow'],['Outcome','Traceability'],['Build mode','Application']],
        tech:['Workflow design','SQL','Power Platform','Reporting','Audit logic'],
        roles:['Problem framing','Product design','Automation','User workflow'],
      },
      {
        id:'gesture', icon:'gesture', title:'Gesture Controlled Glove', type:'HUMAN–MACHINE INTERFACE',
        teaser:'Physical movement translated into machine commands.',
        description:'An electronics and interaction project exploring how hand gestures can become an intuitive control layer between a person and a machine.',
        analytics:[['Interface','Motion'],['Domain','Embedded systems'],['Signal','Human gesture'],['Build mode','Hardware prototype']],
        tech:['Sensors','Embedded systems','Electronics','Signal mapping','Prototyping'],
        roles:['Hardware design','Integration','Testing','Interaction design'],
      },
      {
        id:'manufacturing', icon:'factory', title:'Manufacturing Intelligence', type:'OPERATIONS ANALYTICS',
        teaser:'Production, supplier, quality, and dispatch signals in one view.',
        description:'A manufacturing analytics approach that connects production planning, shortages, suppliers, quality, and dispatch so teams can understand what is blocking execution.',
        analytics:[['Domain','Manufacturing'],['Scope','Plan → Dispatch'],['Decision layer','Operations'],['Build mode','Analytics system']],
        tech:['SQL','Dashboards','Operational metrics','Planning logic','Data modeling'],
        roles:['Process mapping','Analytics','Product thinking','Operations design'],
      },
      {
        id:'continuum', icon:'layers', title:'The Continuum', type:'INTERACTIVE WEB SYSTEM',
        teaser:'This portfolio — built as an explorable system instead of a résumé page.',
        description:'A React-based interactive portfolio combining a vector city, seven-floor personal hub, games, anonymous analytics, community feedback, and project storytelling.',
        analytics:[['Experience','Interactive'],['Architecture','Static + serverless'],['Analytics','Live aggregates'],['Build mode','Product experiment']],
        tech:['React','Vite','Framer Motion','SVG','Apps Script','Google Sheets'],
        roles:['Concept','UX','Frontend architecture','Analytics design'],
      },
      {
        id:'research', icon:'network', title:'Game Theory Research', type:'COMPUTATIONAL RESEARCH',
        teaser:'Strategic models for large-scale interacting systems.',
        description:'Graduate research focused on computational algorithms for non-cooperative game models and large-scale cyber-physical systems.',
        analytics:[['Domain','Optimization'],['Model','Non-cooperative'],['System type','Cyber-physical'],['Build mode','Research']],
        tech:['Optimization','Game theory','Computational modeling','Algorithms','Research'],
        roles:['Research','Model development','Algorithm design','Technical analysis'],
      }
    ]
  },
  {
    id:'fame', no:'06', name:'The Wall of Fame', desc:'Community feedback and live portfolio analytics', icon:'★', art:'Community · Feedback · Analytics'
  },
  {
    id:'game', no:'07', name:'The Arena', desc:'KNOW · BELIEVE · CONNECT', icon:'◈', art:'Play · Explore · Interact',
    primaryGames:[['KNOW','#know'],['BELIEVE','#believe'],['CONNECT','#connect-game']]
  }
]

const floorToHighlightIndex = { game:2, fame:3, laboratory:4, gym:5, badges:6, library:7, concierge:8 }

function hexToRgb(h){ const x=h.replace('#',''); return {r:parseInt(x.slice(0,2),16), g:parseInt(x.slice(2,4),16), b:parseInt(x.slice(4,6),16)} }
function mix(a,b,t){ const c1=hexToRgb(a), c2=hexToRgb(b); const m=(x,y)=>Math.round(x+(y-x)*t); return `rgb(${m(c1.r,c2.r)},${m(c1.g,c2.g)},${m(c1.b,c2.b)})` }
const palette=(t)=>({ bgTop:mix('#f6faff','#0a1630',t), bgBottom:mix('#d9e6f8','#17294f',t), wall:mix('#eef4fc','#2a4171',t), wall2:mix('#d3e0f2','#1e3160',t), side:mix('#b7c9e4','#162650',t), glass:mix('#a9c1e3','#33508a',t), win:mix('#8faad3','#f3cf74',t), ground:mix('#d5e0f0','#0d1a35',t), ink:mix('#0b3d91','#dce8ff',t), amber:mix('#d98e04','#f0ba54',t), blue:mix('#2f6fe0','#7ba8ff',t), leaf:mix('#5e8a6e','#4c7a5e',t), far:mix('#0b3d91','#6c8cd0',t) })

const focusTransforms = {
  city:'translate(0px, 0px) scale(1)', hospital:'translate(1680px, 195px) scale(2.15)', construction:'translate(1080px, 190px) scale(2.18)', tower:'translate(560px, 185px) scale(2.0)', energy:'translate(-80px, 190px) scale(2.2)', manufacturing:'translate(-640px, 180px) scale(2.0)', telecom:'translate(-1250px, 170px) scale(2.2)'
}
const floorTransforms = {
  concierge:'translate(640px, 300px) scale(2.55)', library:'translate(640px, 250px) scale(2.68)', badges:'translate(640px, 210px) scale(2.76)', gym:'translate(640px, 170px) scale(2.84)', laboratory:'translate(640px, 132px) scale(2.86)', fame:'translate(640px, 94px) scale(2.76)', game:'translate(640px, 56px) scale(2.66)'
}

function WinGrid({x,y,cols,rows,w,h,gx,gy,litChance,p}){ const items=[]; let seed=7+x+y; function rand(){ seed=(seed*9301+49297)%233280; return seed/233280 } for(let r=0;r<rows;r++) for(let c=0;c<cols;c++){ const lit=rand()<litChance; items.push(<rect key={`${r}-${c}`} x={x+c*(w+gx)} y={y+r*(h+gy)} width={w} height={h} rx="2" fill={lit?p.amber:p.win} opacity={lit?.92:.8} />) } return <>{items}</> }

function ChannelIcon({label}){
  const key=label.toLowerCase()
  if(key==='linkedin') return <svg className="channel-icon" viewBox="0 0 24 24" role="img" aria-label="LinkedIn"><path fill="currentColor" d="M20.45 2H3.55C2.69 2 2 2.68 2 3.53v16.94C2 21.32 2.69 22 3.55 22h16.9c.86 0 1.55-.68 1.55-1.53V3.53c0-.85-.69-1.53-1.55-1.53ZM7.93 18.75H4.98V9.2h2.95v9.55ZM6.46 7.89a1.71 1.71 0 1 1 0-3.42 1.71 1.71 0 0 1 0 3.42Zm12.29 10.86H15.8V14.1c0-1.11-.02-2.54-1.55-2.54-1.55 0-1.79 1.21-1.79 2.46v4.73H9.51V9.2h2.83v1.31h.04c.39-.74 1.36-1.53 2.79-1.53 2.99 0 3.58 1.97 3.58 4.54v5.23Z"/></svg>
  if(key==='email') return <svg className="channel-icon" viewBox="0 0 24 24" role="img" aria-label="Email"><rect x="2.5" y="5" width="19" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8"/><path d="m3.5 6.5 8.5 6.7 8.5-6.7" fill="none" stroke="currentColor" strokeWidth="1.8"/></svg>
  if(key==='github') return <svg className="channel-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.71c-2.78.6-3.37-1.18-3.37-1.18-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1 .07 1.52 1.03 1.52 1.03.89 1.53 2.34 1.09 2.91.83.09-.64.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.1.39-1.99 1.03-2.69-.1-.25-.45-1.28.1-2.65 0 0 .84-.27 2.75 1.03A9.6 9.6 0 0 1 12 6.66c.85 0 1.7.12 2.5.34 1.91-1.3 2.75-1.03 2.75-1.03.55 1.37.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.69 0 3.85-2.34 4.7-4.57 4.95.36.31.68.93.68 1.87v2.78c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"/></svg>
  return <span className="channel-fallback" aria-hidden="true">✎</span>
}
function TowerButtons({floors,onSelectFloor,onHoverFloor,onLeaveFloor}){ return <div className="floor-list">{[...floors].reverse().map(f=><button key={f.id} onClick={()=>onSelectFloor(f.id)} onMouseEnter={()=>onHoverFloor(f.id)} onMouseLeave={onLeaveFloor}><span className="floor-no">{f.no}</span><i className="floor-icon" aria-hidden="true">{f.icon}</i><strong>{f.name}</strong></button>)}</div> }

function BuildingPanel({card, kind, lang}){
  if(kind === 'telecom') return <>
    <div className="profile-card">
      <img src={profilePhoto} alt="Dishit Kalsaria portrait" className="profile-photo" />
      <div className="profile-copy"><div className="profile-name">{card.title}</div><div className="profile-tag">{card.role}</div><p>Builder focused on turning ambiguity into systems, platforms, and operating leverage across complex industries.</p></div>
    </div>
    <div className="connect-grid">{card.links.map(([label,href])=><a key={label} className="connect-link" href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noreferrer' : undefined}><span className="connect-channel-label"><ChannelIcon label={label}/>{label}</span><b>↗</b></a>)}</div>
  </>

  if(kind === 'construction') return <div className={`building-theme building-theme-${kind}`}>
    <div className="compact-hero"><div className="hero-icon">{card.icon}</div><div><div className="compact-title">{card.title}</div><div className="compact-role">{card.role}</div></div></div>
    <div className="single-message-card"><div className="section-title">{tr(lang,'UNDER CONSTRUCTION OFFICE')}</div><p>{tr(lang,'Construction going on — stay tuned.')}</p></div>
  </div>

  return <div className={`building-theme building-theme-${kind}`}>
    <div className="compact-hero"><div className="hero-icon">{card.icon}</div><div><div className="compact-title">{card.title}</div><div className="compact-role">{tr(lang,'Operational experience panel')}</div></div></div>
    <div className="metric-strip">{card.metrics.map(([k,v])=><div key={k} className="metric-box"><span>{k}</span><strong>{v}</strong></div>)}</div>
    <div className="industry-layout">
      <div className="compact-card industry-box experience-box">
        <div className="section-title">{tr(lang,'Experience')}</div>
        <div className="exp-line"><label>{tr(lang,'Company')}</label><strong>{card.company}</strong></div>
        <div className="exp-line"><label>{tr(lang,'Role')}</label><strong>{card.roleLabel}</strong></div>
        <div className="exp-line"><label>{tr(lang,'Timeline')}</label><strong>{card.timeline}</strong></div>
      </div>
      <div className="compact-card industry-box skill-box">
        <div className="section-title">{tr(lang,'Skills & ratings')}</div>
        <div className="chip-wrap">{card.skills.map(v=><span key={v}>{v}</span>)}</div>
        <div className="rating-list">{card.ratings.map(([label,value])=><div key={label} className="rating-row"><span>{label}</span><div className="rating-track"><div className="rating-fill" style={{width:`${(parseFloat(value)/5)*100}%`}} /></div><strong>{value}</strong></div>)}</div>
      </div>
      <div className="compact-card industry-box app-box">
        <div className="section-title">{tr(lang,'Applications')}</div>
        <div className="chip-wrap">{card.applications.map(v=><span key={v}>{v}</span>)}</div>
      </div>
    </div>
    <div className="compact-card highlight-wide">
      <div className="section-title">{tr(lang,'Highlights')}</div>
      <ul className="mini-list tight">{card.highlights.map((v,i)=><li key={i}>{v}</li>)}</ul>
    </div>
  </div>
}


const ANALYTICS_URL = 'https://script.google.com/macros/s/AKfycbyPknEEA9_Ro1tw5U4BG6DvRku4R3OLAEjlt6lTtH-Bmv4udZ-z-vBf6MPv79SVz6zusA/exec'
const SESSION_KEY = 'dishit-portfolio-session-id'

function getSessionId(){
  try {
    let id=localStorage.getItem(SESSION_KEY)
    if(!id){
      id=(crypto?.randomUUID?.() || `visitor_${Date.now()}_${Math.random().toString(36).slice(2)}`).replace(/[^A-Za-z0-9_-]/g,'')
      localStorage.setItem(SESSION_KEY,id)
    }
    return id
  } catch {
    return `visitor_${Date.now()}_${Math.random().toString(36).slice(2)}`
  }
}
function makeRecordId(prefix='record'){
  const token=(crypto?.randomUUID?.() || `${Date.now()}_${Math.random().toString(36).slice(2)}`).replace(/[^A-Za-z0-9_-]/g,'')
  return `${prefix}_${token}`.slice(0,96)
}
function submitPortfolioData(payload){
  try {
    const iframeName=`analytics_${Date.now()}_${Math.random().toString(36).slice(2)}`
    const iframe=document.createElement('iframe')
    iframe.name=iframeName
    iframe.style.display='none'
    iframe.setAttribute('aria-hidden','true')
    const form=document.createElement('form')
    form.method='POST'
    form.action=ANALYTICS_URL
    form.target=iframeName
    form.style.display='none'
    const input=document.createElement('input')
    input.type='hidden'
    input.name='payload'
    input.value=JSON.stringify({...payload,sessionId:payload.sessionId||getSessionId(),recordId:payload.recordId||makeRecordId(payload.type||'record')})
    form.appendChild(input)
    document.body.appendChild(iframe)
    document.body.appendChild(form)
    form.submit()
    setTimeout(()=>{ try{form.remove();iframe.remove()}catch{} },5000)
    return true
  } catch { return false }
}
function trackEvent(event, game='', meta=''){
  submitPortfolioData({type:'event',event,game,meta})
}
const PLAYER_NAME_KEY = 'dishit-portfolio-player-name'
function cleanPlayerName(value, limit=40){
  return String(value||'').replace(/[^A-Za-z ]/g,'').replace(/ {2,}/g,' ').slice(0,limit)
}
function getPlayerName(){
  try { return cleanPlayerName(localStorage.getItem(PLAYER_NAME_KEY)).trim() } catch { return '' }
}
function storePlayerName(value){
  const clean=cleanPlayerName(value).trim()
  try { if(clean) localStorage.setItem(PLAYER_NAME_KEY,clean); else localStorage.removeItem(PLAYER_NAME_KEY) } catch {}
  return clean
}
function GameStarRating({value,onChange,label='Your rating'}){
  return <div className="game-star-rating"><span>{label}</span><div className="star-picker compact-stars" role="group" aria-label={label}>{[1,2,3,4,5].map(n=><button type="button" key={n} className={n<=value?'active':''} onClick={()=>onChange(n)} aria-label={`${n} stars`}>★</button>)}</div></div>
}
const PUBLIC_STATS_CACHE_KEY = 'dishit-portfolio-public-stats-v5'
function readCachedPublicStats(){
  try { return JSON.parse(localStorage.getItem(PUBLIC_STATS_CACHE_KEY) || 'null') } catch { return null }
}
function loadPublicStats(onData){
  const cached=readCachedPublicStats()
  if(cached) onData({...cached,approvedFeedback:[]}) // Never publish cached feedback after approval changes
  const cb=`__continuumStats_${Date.now()}_${Math.random().toString(36).slice(2)}`.replace(/[^A-Za-z0-9_$]/g,'')
  const script=document.createElement('script')
  window[cb]=(data)=>{
    try{
      if(data && data.ok!==false){
        try{localStorage.setItem(PUBLIC_STATS_CACHE_KEY,JSON.stringify({...data,approvedFeedback:[]}))}catch{}
        onData(data)
      }
    }finally{delete window[cb];script.remove()}
  }
  script.src=`${ANALYTICS_URL}?callback=${encodeURIComponent(cb)}&t=${Date.now()}`
  script.async=true
  script.onerror=()=>{delete window[cb];script.remove()}
  document.body.appendChild(script)
}

const GAME_RESULTS_KEY = 'dishit-portfolio-game-results'
const HALL_FEEDBACK_KEY = 'dishit-portfolio-feedback'
function buildLocalLeaderboard(){
  const results=loadGameResults()
  const name=getPlayerName()
  return ['KNOW','BELIEVE','CONNECT'].map(game=>{
    const r=results[game]
    if(!r || !Number.isFinite(Number(r.score))) return null
    const score=Number(r.score)
    const pct=game==='CONNECT'?Math.max(0,Math.min(100,(score/600)*100)):Math.max(0,Math.min(100,score))
    return {name:name||'YOU',alias:name||'YOU',game,score,pct,displayScore:game==='CONNECT'?`${Math.round(score)}/600`:`${Math.round(score)}/100`,percentage:Math.round(pct),local:true}
  }).filter(Boolean).sort((a,b)=>b.pct-a.pct).slice(0,1)
}

function loadGameResults(){
  try { return JSON.parse(localStorage.getItem(GAME_RESULTS_KEY) || '{}') } catch { return {} }
}
function saveGameResult(game, result){
  try {
    const all=loadGameResults()
    const prior=all[game] || {attempts:0}
    const attempts=(prior.attempts||0)+1
    all[game]={...prior,...result,attempts,updatedAt:Date.now()}
    localStorage.setItem(GAME_RESULTS_KEY,JSON.stringify(all))
    submitPortfolioData({
      type:'game_result',
      game,
      score:Number(result.score||0),
      result:String(result.label||result.result||result.judgment||''),
      durationSeconds:Number(result.durationSeconds||0),
      replayCount:Math.max(0,attempts-1),
      playerName:getPlayerName()
    })
    trackEvent('game_completed',game,String(result.score||0))
  } catch {}
}
function saveHallFeedback(source, comment, name='Game player', rating=0, publishConsent=false){
  const clean=(comment||'').trim()
  if(!clean) return
  try {
    const entries=JSON.parse(localStorage.getItem(HALL_FEEDBACK_KEY)||'[]')
    localStorage.setItem(HALL_FEEDBACK_KEY,JSON.stringify([{name,comment:clean,source},...entries].slice(0,8)))
  } catch {}
  if(rating>=1 && rating<=5){
    submitPortfolioData({type:'feedback',source,rating,comment:clean,publishConsent,name:String(name||'').trim().slice(0,60)})
  }
}

function GameFeedbackConfirmation({status,onPublish,onDismiss}){
  if(!status || status==='dismissed') return null
  return <div className="game-feedback-confirmation" role="status" aria-live="polite">
    <strong>✓ Feedback submission initiated</strong>
    <p>Thanks for sharing your thoughts. The request was sent; delivery is not independently confirmed.</p>
    {status==='sent' && <><p>Want to leave your mark on Simpli-City? Your rating and comment may appear on the Wall of Fame after review.</p><div className="game-feedback-actions"><button type="button" onClick={onPublish}>Post on Wall of Fame</button><button type="button" onClick={onDismiss}>Maybe later</button></div></>}
    {status==='public' && <p>✓ Wall of Fame request sent. Public display requires approval.</p>}
  </div>
}
function submitGameFeedback(source,comment,rating,onStatus,extra){
  const name=getPlayerName()||'Game player'
  saveHallFeedback(source,comment,name,rating,false)
  if(typeof extra==='function') extra()
  onStatus('sent')
}
function publishGameFeedback(source,comment,rating,onStatus){
  const name=getPlayerName()||'Game player'
  const entry={source,rating,name,comment}
  // Backend upgrades the recent private feedback row to publication consent without adding a duplicate.
  submitPortfolioData({type:'feedback',...entry,publishConsent:true})
  onStatus('public')
}

function HallOfFameFeedback({lang}){
  const [name,setName]=useState('')
  const [title,setTitle]=useState('')
  const [company,setCompany]=useState('')
  const [comment,setComment]=useState('')
  const [rating,setRating]=useState(5)
  const [publishConsent,setPublishConsent]=useState(false)
  const [submitted,setSubmitted]=useState(false)
  const [stats,setStats]=useState(()=>readCachedPublicStats() && {...readCachedPublicStats(),approvedFeedback:[]})

  useEffect(()=>{ loadPublicStats(setStats) },[])

  const submitFeedback=(e)=>{
    e.preventDefault()
    const trimmedComment=comment.trim()
    if(!trimmedComment) return
    const publicEntry={source:'Website',rating,name:cleanPlayerName(name,60).trim()||'Visitor',title:title.trim(),company:company.trim(),comment:trimmedComment}
    submitPortfolioData({type:'feedback',...publicEntry,publishConsent})
    setName('');setTitle('');setCompany('');setComment('');setPublishConsent(false)
    setSubmitted(true)
    setTimeout(()=>setSubmitted(false),3000)
    setTimeout(()=>loadPublicStats(setStats),1500)
  }

  const remoteFeedback=Array.isArray(stats?.approvedFeedback) ? stats.approvedFeedback : []
  const publicFeedback=remoteFeedback.slice(0,10)

  return <div className="wall-of-fame-content">
    <div className="public-analytics-strip">
      <div><span>VISITORS</span><strong>{stats?.visitors ?? '—'}</strong></div>
      <div><span>COMMUNITY RATING</span><strong>{stats?.rating ? `${stats.rating}/5` : '—'}</strong><small>{stats?.ratingCount ? `${stats.ratingCount} ratings` : 'No ratings yet'}</small></div>
      <div><span>GAMES COMPLETED</span><strong>{stats?.gamesCompleted ?? '—'}</strong></div>
      <div><span>FEEDBACK</span><strong>{stats?.feedbackCount ?? '—'}</strong></div>
    </div>
    <div className="wall-fame-grid">
      <div className="compact-card wall-feedback-card">
        <div className="section-title">TOP COMMUNITY FEEDBACK</div>
        <div className="public-feedback-grid">
          {publicFeedback.length===0 ? <div className="empty-note">Community feedback will appear here after visitors choose to share it.</div> : publicFeedback.map((item,i)=><article className={`public-feedback-item ${item.local?'local':''}`} key={`${item.timestamp||''}-${i}`}>
            <div className="public-feedback-head"><strong>{item.name || 'Visitor'}</strong><span>{'★'.repeat(Math.max(0,Math.min(5,Number(item.rating)||0)))}</span></div>
            {(item.title||item.company) && <small>{[item.title,item.company].filter(Boolean).join(' · ')}</small>}
            <p>{item.comment}</p>
          </article>)}
        </div>
      </div>
      <div className="compact-card wall-form-card">
        <div className="section-title">SHARE YOUR FEEDBACK</div>
        <form className="feedback-form" onSubmit={submitFeedback}>
          <div className="feedback-identity-grid">
            <input value={name} onChange={e=>setName(cleanPlayerName(e.target.value,60))} placeholder={`${tr(lang,'Your name')} (optional)`} maxLength={60}/>
            <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title (optional)" maxLength={80}/>
            <input value={company} onChange={e=>setCompany(e.target.value)} placeholder="Company (optional)" maxLength={100}/>
          </div>
          <div className="star-picker" aria-label="Rating">{[1,2,3,4,5].map(n=><button type="button" key={n} className={n<=rating?'active':''} onClick={()=>setRating(n)} aria-label={`${n} stars`}>★</button>)}</div>
          <textarea value={comment} onChange={e=>setComment(e.target.value)} placeholder={tr(lang,'Share a quick thought about the website')} maxLength={300} rows={4}/>
          <label className="publish-consent"><input type="checkbox" checked={publishConsent} onChange={e=>setPublishConsent(e.target.checked)}/> Allow this comment to be considered for The Wall of Fame</label>
          <button type="submit" className="panel-btn feedback-btn">{tr(lang,'Post feedback')}</button>
          {submitted && <div className="feedback-submitted">Feedback submission sent ✓</div>}
        </form>
      </div>
    </div>
  </div>
}

function ArenaLeaderboard(){
  const [stats,setStats]=useState(()=>readCachedPublicStats() && {...readCachedPublicStats(),approvedFeedback:[]})
  useEffect(()=>{ loadPublicStats(setStats) },[])
  const remotePlayers=Array.isArray(stats?.topPlayers) ? stats.topPlayers : []
  const localPlayers=buildLocalLeaderboard()
  const players=[...remotePlayers,...localPlayers].filter((player,index,arr)=>{
    const key=`${player.name||player.alias||''}|${player.game||''}`
    return arr.findIndex(x=>`${x.name||x.alias||''}|${x.game||''}`===key)===index
  }).sort((a,b)=>(Number(b.percentage)||0)-(Number(a.percentage)||0)).slice(0,5)
  return <div className="arena-leaderboard">
    <div className="arena-leaderboard-head"><div><div className="section-title">TOP 5 PLAYERS</div><small>Best normalized performances across KNOW, BELIEVE and CONNECT</small></div><span>LIVE</span></div>
    <div className="leaderboard-rows">
      {players.length===0 ? <div className="empty-note">Leaderboard will populate as visitors complete games.</div> : players.map((player,i)=><div className="leaderboard-row" key={`${player.name||player.alias}-${i}`}>
        <b>{String(i+1).padStart(2,'0')}</b><strong>{player.name||player.alias}</strong><span>{player.game}</span><em>{player.displayScore}</em>
      </div>)}
    </div>
  </div>
}


function SmartIcon({name, size=22}){
  const common={width:size,height:size,viewBox:'0 0 24 24',fill:'none',stroke:'currentColor',strokeWidth:'1.7',strokeLinecap:'round',strokeLinejoin:'round','aria-hidden':'true'}
  const paths={
    data:<><ellipse cx="12" cy="5" rx="7" ry="3"/><path d="M5 5v6c0 1.7 3.1 3 7 3s7-1.3 7-3V5"/><path d="M5 11v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"/></>,
    check:<><path d="M4 12l5 5L20 6"/><rect x="3" y="3" width="18" height="18" rx="5"/></>,
    gesture:<><path d="M8 12V6a2 2 0 0 1 4 0v5"/><path d="M12 10V5a2 2 0 0 1 4 0v7"/><path d="M16 10V7a2 2 0 0 1 4 0v7c0 5-3 7-7 7h-1c-3.5 0-5.5-2-7-5l-1.5-3a2 2 0 0 1 3.4-2l1.1 1z"/></>,
    factory:<><path d="M3 21V10l6 3V9l6 3V7l6 3v11z"/><path d="M7 21v-4h3v4M14 16h3"/></>,
    layers:<><path d="M12 3l9 5-9 5-9-5z"/><path d="M3 12l9 5 9-5"/><path d="M3 16l9 5 9-5"/></>,
    network:<><circle cx="5" cy="12" r="2"/><circle cx="12" cy="5" r="2"/><circle cx="19" cy="12" r="2"/><circle cx="12" cy="19" r="2"/><path d="M6.5 10.5l4-4M13.5 6.5l4 4M17.5 13.5l-4 4M10.5 17.5l-4-4"/></>,
    game:<><circle cx="7" cy="7" r="3"/><circle cx="17" cy="17" r="3"/><path d="M9.5 8.5l5 7M14.5 8.5l-5 7"/></>,
    human:<><circle cx="12" cy="6" r="3"/><path d="M5 21c.8-5 3.2-8 7-8s6.2 3 7 8"/></>,
    shield:<><path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6z"/><path d="M9 12l2 2 4-4"/></>,
    optimize:<><path d="M4 18l5-5 4 3 7-9"/><circle cx="4" cy="18" r="1.5"/><circle cx="9" cy="13" r="1.5"/><circle cx="13" cy="16" r="1.5"/><circle cx="20" cy="7" r="1.5"/></>
  }
  return <svg {...common}>{paths[name]||paths.layers}</svg>
}

function ThinkTankFloor({card}){
  const [topic,setTopic]=useState(null)
  const active=topic ? card.topics.find(t=>t.name===topic) : null
  return <>
    <div className="compact-hero floor-hero think-hero"><div className="hero-icon"><SmartIcon name="network" size={27}/></div><div><div className="compact-title">{card.name}</div><div className="compact-role">{card.art}</div></div></div>
    <div className="think-intro"><strong>Ideas worth exploring.</strong><span>Research and system concepts that influence how I frame problems and build.</span></div>
    {!active ? <>
      <div className="think-feature-grid">{card.featuredResearch.map(item=><div className="think-feature-card" key={item.title}><div className="smart-icon-box"><SmartIcon name={item.icon}/></div><div className="think-feature-copy"><small>{item.tag}</small><strong>{item.title}</strong><p>{item.summary}</p><a href={item.links[0][1]} target="_blank" rel="noreferrer">Read / explore ↗</a></div></div>)}</div>
      <div className="think-topic-head"><span>INTERESTED TOPICS</span><small>Select one for context + research links</small></div>
      <div className="think-topic-grid">{card.topics.map(item=><button key={item.name} type="button" onClick={()=>setTopic(item.name)}><SmartIcon name={item.icon}/><span><strong>{item.name}</strong><small>{item.short}</small></span><b>→</b></button>)}</div>
      <div className="think-education-line">{card.education.map(v=><span key={v}>{v}</span>)}</div>
    </> : <div className="think-topic-detail">
      <button type="button" className="think-back" onClick={()=>setTopic(null)}>← All topics</button>
      <div className="think-detail-top"><div className="smart-icon-box large"><SmartIcon name={active.icon} size={28}/></div><div><small>INTERESTED TOPIC</small><h3>{active.name}</h3><p>{active.short}</p></div></div>
      <div className="think-detail-card"><span>WHY IT INTERESTS ME</span><p>{active.why}</p></div>
      <div className="think-links"><span>RESEARCH LINKS</span>{active.links.length ? active.links.map(([label,href])=><a key={label} href={href} target="_blank" rel="noreferrer"><span>{label}</span><b>↗</b></a>) : <div className="think-empty">Curated links coming next.</div>}</div>
    </div>}
  </>
}

function WorkshopFloor({card}){
  const [selected,setSelected]=useState(null)
  const project=selected ? card.projects.find(p=>p.id===selected) : null
  if(project) return <>
    <div className="compact-hero floor-hero workshop-hero"><div className="hero-icon"><SmartIcon name={project.icon} size={27}/></div><div><div className="compact-title">{project.title}</div><div className="compact-role">{project.type}</div></div></div>
    <button type="button" className="workshop-back" onClick={()=>setSelected(null)}>← All projects</button>
    <div className="workshop-detail-grid">
      <div className="workshop-story"><div className="section-title">WHAT IT DOES</div><p>{project.description}</p></div>
      <div className="workshop-analytics"><div className="section-title">PROJECT ANALYTICS</div><div className="project-analytics-grid">{project.analytics.map(([k,v])=><div key={k}><small>{k}</small><strong>{v}</strong></div>)}</div></div>
    </div>
    <div className="workshop-detail-lower">
      <div><div className="section-title">TECH INVOLVED</div><div className="project-tech-wrap">{project.tech.map(v=><span key={v}>{v}</span>)}</div></div>
      <div><div className="section-title">MY ROLE</div><div className="project-role-wrap">{project.roles.map(v=><span key={v}>{v}</span>)}</div></div>
    </div>
  </>
  return <>
    <div className="compact-hero floor-hero workshop-hero"><div className="hero-icon"><SmartIcon name="layers" size={27}/></div><div><div className="compact-title">{card.name}</div><div className="compact-role">{card.art}</div></div></div>
    <div className="workshop-intro"><strong>Selected projects.</strong><span>Open a project to see its purpose, technology, role, and outcomes.</span></div>
    <div className="workshop-grid">{card.projects.map(project=><button key={project.id} type="button" className="workshop-tile" onClick={()=>{setSelected(project.id);trackEvent('project_opened','',project.id)}}><div className="workshop-thumb"><SmartIcon name={project.icon} size={30}/><span>{project.type}</span></div><div className="workshop-tile-copy"><strong>{project.title}</strong><p>{project.teaser}</p><span>View case study →</span></div></button>)}</div>
  </>
}

function FloorDetail({card, lang, onStartKnow, onStartBelieve, onStartConnect}){
  if(card.id === 'concierge') return <>
    <div className="compact-hero floor-hero"><div className="hero-icon">{card.icon}</div><div><div className="compact-title">{card.name}</div><div className="compact-role">{card.art}</div></div></div>
    <div className="compact-card floor-wide-card">
      <div className="section-title">{tr(lang,'About me')}</div>
      <p className="floor-paragraph">{card.about[0]}</p>
      <p className="floor-paragraph">{card.about[1]}</p>
    </div>
    <div className="floor-grid simple-two">
      <div className="compact-card"><div className="section-title">{tr(lang,'Hobbies')}</div><div className="icon-tile-grid">{card.hobbies.map(([icon,label])=><div key={label} className="icon-info-tile"><div className="tile-icon">{icon}</div><span>{label}</span></div>)}</div></div>
      <div className="compact-card"><div className="section-title">{tr(lang,'Interested industries')}</div><div className="icon-tile-grid">{card.industries.map(([icon,label])=><div key={label} className="icon-info-tile"><div className="tile-icon">{icon}</div><span>{label}</span></div>)}</div></div>
    </div>
    <div className="compact-card floor-wide-card living-language-card"><div className="section-title">LANGUAGES</div><div className="living-language-grid">{card.languages.map(([language,rating])=><div key={language} className="skill-rating-row"><span>{language}</span><div className="skill-rating-track"><div className="skill-rating-fill" style={{width:`${rating*20}%`}} /></div><strong>{rating.toFixed(1)}</strong></div>)}</div></div>
  </>

  if(card.id === 'library') return <ThinkTankFloor card={card} />

  if(card.id === 'badges') return <>
    <div className="compact-hero floor-hero"><div className="hero-icon badge-hero-icon">{card.icon}</div><div><div className="compact-title">{card.name}</div><div className="compact-role">{card.art}</div></div></div>
    <div className="badge-section">
      <div className="section-title">{tr(lang,'Education')}</div>
      <div className="degree-grid">{card.educationHighlights.map(([degree,field,school])=><div key={degree+field} className="degree-card"><div className="degree-seal">🎓</div><div><strong>{degree}</strong><span>{field}</span><small>{school}</small></div></div>)}</div>
    </div>
    <div className="badge-lower-grid">
      <div className="compact-card prestige-card"><div className="section-title">{tr(lang,'Certificates')}</div><div className="certificate-grid">{card.certificates.map(([issuer,name])=><div key={issuer+name} className="certificate-tile"><div className="certificate-mark">✓</div><div><strong>{issuer}</strong><span>{name}</span></div></div>)}</div></div>
      <div className="compact-card prestige-card"><div className="section-title">{tr(lang,'Other credentials')}</div><div className="credential-grid">{card.credentials.map(([tag,text])=><div key={tag} className="credential-tile"><strong>{tag}</strong><span>{text}</span></div>)}</div></div>
    </div>
    <div className="compact-card trophy-endorsements"><div className="section-title">ENDORSEMENTS</div><div className="endorsement-grid">{card.endorsements.map((item,i)=><blockquote key={i}>{item}</blockquote>)}</div></div>
  </>

  if(card.id === 'gym') return <>
    <div className="compact-hero floor-hero"><div className="hero-icon">{card.icon}</div><div><div className="compact-title">{card.name}</div><div className="compact-role">{card.art}</div></div></div>
    <div className="gym-grid">{card.skillGroups.map(group=><div key={group.title} className="compact-card gym-card"><div className="section-title">{group.title}</div><div className="skill-rating-list">{group.items.map(([skill,rating])=><div key={skill} className="skill-rating-row"><span>{skill}</span><div className="skill-rating-track"><div className="skill-rating-fill" style={{width:`${rating*20}%`}} /></div><strong>{rating.toFixed(1)}</strong></div>)}</div></div>)}</div>
  </>

  if(card.id === 'laboratory') return <WorkshopFloor card={card} />

  if(card.id === 'fame') return <>
    <div className="compact-hero floor-hero"><div className="hero-icon">{card.icon}</div><div><div className="compact-title">{card.name}</div><div className="compact-role">{card.art}</div></div></div>
    <HallOfFameFeedback lang={lang} />
  </>

  if(card.id === 'game') {
    const gameResults=loadGameResults()
    const resultLine=(label)=>{
      const r=gameResults[label]
      if(!r) return <span className="game-result-empty">No result yet · play to set one</span>
      if(label==='KNOW') return <span className="game-result-line"><b>{r.score}</b> KNOW score · {r.attempts} play{r.attempts===1?'':'s'}</span>
      if(label==='BELIEVE') return <span className="game-result-line"><b>{r.correct}/4</b> facts · {r.style}</span>
      return <span className="game-result-line"><b>{r.score}/600</b> points · {r.solved}/5 words</span>
    }
    return <>
      <div className="compact-hero floor-hero lively-game-hero"><div className="hero-icon">{card.icon}</div><div><div className="compact-title">{card.name}</div><div className="compact-role">{card.art}</div></div></div>
      <div className="compact-card floor-wide-card game-lounge-card"><div className="section-title">{tr(lang,'Core games')}</div><div className="game-intro"><strong>Three quick portfolio games.</strong><span>Play to understand the work, the profile, and the interactive style behind the site.</span></div><div className="game-tile-grid">{card.primaryGames.map(([label])=> <button key={label} type="button" onClick={label==='KNOW'?onStartKnow:label==='BELIEVE'?onStartBelieve:onStartConnect} className={`game-tile game-tile-button game-${label.toLowerCase()}`}><em>{label}</em>{label==='KNOW' ? <><strong>Know the people</strong><span>Read the room →</span></> : label==='BELIEVE' ? <><strong>Judge the claims</strong><span>Can you tell what is true? →</span></> : <><strong>Complete the words</strong><span>Five clues. One connection. →</span></>}<div className="game-player-result">{resultLine(label)}</div></button>)}</div><ArenaLeaderboard /></div>
    </>
  }

  return null
}


const KNOW_OPTIONS = {
  team:['Engineering','Product','Operations','Finance','Design','Other'],
  specialty:['Building','Analyzing','Organizing','Communicating','Designing','Planning'],
  meetings:['Clear agenda only','Most meetings should be shorter','I prefer async communication','I enjoy discussing things live'],
  restaurant:['I already checked the menu','I have an idea but decide there','I decide completely in the moment','I ask what everyone recommends'],
  free:['Build or create something','Relax and disconnect','Organize something I postponed','Go somewhere or meet people']
}

const KNOW_TEAM = [
  {name:'Maya', team:'Product', specialty:'Communicating', meetings:'I enjoy discussing things live', restaurant:'I have an idea but decide there', free:'Go somewhere or meet people'},
  {name:'Dishit', team:'Engineering / Product', specialty:'Building', meetings:'Clear agenda only', restaurant:'I have an idea but decide there', free:'Build or create something'},
  {name:'Priya', team:'Operations', specialty:'Organizing', meetings:'Clear agenda only', restaurant:'I already checked the menu', free:'Organize something I postponed'},
  {name:'Leo', team:'Design', specialty:'Designing', meetings:'Most meetings should be shorter', restaurant:'I ask what everyone recommends', free:'Go somewhere or meet people'}
]

function KnowGame({onClose}){
  const empty={team:'',specialty:'',meetings:'',restaurant:'',free:''}
  const [phase,setPhase]=useState('setup')
  const [profile,setProfile]=useState(empty)
  const [setupLeft,setSetupLeft]=useState(60)
  const [introLeft,setIntroLeft]=useState(60)
  const [roundLeft,setRoundLeft]=useState(30)
  const [round,setRound]=useState(0)
  const [score,setScore]=useState(0)
  const [picked,setPicked]=useState(null)
  const [locked,setLocked]=useState(false)
  const [selfGuess,setSelfGuess]=useState(null)
  const [feedback,setFeedback]=useState(0)
  const [feedbackStatus,setFeedbackStatus]=useState(null)
  const [playerName,setPlayerName]=useState(()=>getPlayerName())

  const complete=Object.values(profile).every(Boolean)
  const everyone=[{name:'YOU',...profile},...KNOW_TEAM]
  const majorityFree=useMemo(()=>{
    const counts={}
    everyone.forEach(p=>{ if(p.free) counts[p.free]=(counts[p.free]||0)+1 })
    return Object.entries(counts).sort((a,b)=>b[1]-a[1])[0]?.[0] || 'Build or create something'
  },[profile])

  const rounds=[
    {type:'person', eyebrow:'ROUND 1 · WHO SAID IT?', q:'Who said they usually check the restaurant menu before arriving?', options:['Maya','Dishit','Priya','Leo'], answer:'Priya', reveal:'Priya likes to be prepared before she arrives.'},
    {type:'person', eyebrow:'ROUND 2 · KNOW YOUR PERSON', q:'A meeting has no agenda and too many people invited. Who is most likely to question whether it should happen?', options:['Maya','Dishit','Priya','Leo'], answer:'Dishit', reveal:'Dishit tends to look for structure and clarity before letting a meeting turn into extra work.'},
    {type:'choice', eyebrow:'ROUND 3 · PREDICT', q:'Dishit suddenly gets two completely free hours. What is he most likely to do?', options:KNOW_OPTIONS.free, answer:'Build or create something', reveal:'Dishit enjoys building systems and experimenting with new ideas in his spare time.'},
    {type:'person', eyebrow:'ROUND 4 · WHO WOULD YOU PICK?', q:'You need someone to explain a complicated idea to a non-technical audience. Who would you ask first?', options:['Maya','Dishit','Priya','Leo'], answer:'Maya', reveal:'Maya describes her specialty as communicating.'},
    {type:'choice', eyebrow:'ROUND 5 · READ THE ROOM', q:'The team unexpectedly gets one free hour. What will the majority probably choose?', options:KNOW_OPTIONS.free, answer:majorityFree, reveal:'This answer uses the choices of all five players — including you.'},
    {type:'self', eyebrow:'ROUND 6 · THE SELF ROUND', q:'You spent the game reading everyone else. How do you think the team would describe YOU?', options:['The Builder','The Planner','The Explorer','The Connector']}
  ]

  const deriveProfile=()=>{
    const pts={Builder:0,Planner:0,Explorer:0,Connector:0}
    if(profile.specialty==='Building') pts.Builder+=3
    if(profile.specialty==='Analyzing') pts.Planner+=2
    if(profile.specialty==='Organizing'||profile.specialty==='Planning') pts.Planner+=3
    if(profile.specialty==='Communicating') pts.Connector+=3
    if(profile.specialty==='Designing') pts.Explorer+=2
    if(profile.meetings==='I prefer async communication') pts.Builder+=1
    if(profile.meetings==='Clear agenda only') pts.Planner+=2
    if(profile.meetings==='I enjoy discussing things live') pts.Connector+=2
    if(profile.meetings==='Most meetings should be shorter') pts.Explorer+=1
    if(profile.restaurant==='I already checked the menu') pts.Planner+=2
    if(profile.restaurant==='I ask what everyone recommends') pts.Connector+=2
    if(profile.restaurant==='I decide completely in the moment') pts.Explorer+=2
    if(profile.free==='Build or create something') pts.Builder+=3
    if(profile.free==='Organize something I postponed') pts.Planner+=3
    if(profile.free==='Go somewhere or meet people') pts.Connector+=2
    if(profile.free==='Relax and disconnect') pts.Explorer+=2
    return Object.entries(pts).sort((a,b)=>b[1]-a[1])[0][0]
  }

  const actual='The '+deriveProfile()
  const teammateScore=Math.round((score/5)*100)
  useEffect(()=>{ if(phase==='result') saveGameResult('KNOW',{score:teammateScore,correct:score,label:outcome}) },[phase])
  const outcome=selfGuess===actual ? 'SELF-AWARE' : (score>=4 ? 'PLOT TWIST' : 'SURPRISE')

  useEffect(()=>{
    if(phase!=='setup') return
    setSetupLeft(60)
    const id=setInterval(()=>setSetupLeft(v=>{
      if(v<=1){ clearInterval(id); return 0 }
      return v-1
    }),1000)
    return ()=>clearInterval(id)
  },[phase])

  useEffect(()=>{
    if(phase!=='intro') return
    setIntroLeft(60)
    const id=setInterval(()=>setIntroLeft(v=>{
      if(v<=1){ clearInterval(id); setPhase('rounds'); setRound(0); return 0 }
      return v-1
    }),1000)
    return ()=>clearInterval(id)
  },[phase])

  useEffect(()=>{
    if(phase!=='rounds') return
    setRoundLeft(30)
    const id=setInterval(()=>setRoundLeft(v=>{
      if(v<=1){
        clearInterval(id)
        const r=rounds[round]
        if(r.type==='self'){
          setSelfGuess('No prediction')
          setLocked(true)
          setTimeout(()=>setPhase('result'),500)
        } else {
          setPicked('__timeout__')
          setLocked(true)
        }
        return 0
      }
      return v-1
    }),1000)
    return ()=>clearInterval(id)
  },[phase,round])

  const choose=(choice)=>{
    if(locked) return
    setPicked(choice); setLocked(true)
    const r=rounds[round]
    if(r.type==='self'){ setSelfGuess(choice); setTimeout(()=>setPhase('result'),450) }
    else if(choice===r.answer) setScore(v=>v+1)
  }
  const nextRound=()=>{ setPicked(null); setLocked(false); if(round<rounds.length-1) setRound(v=>v+1); else setPhase('result') }
  const restart=()=>{ setPhase('setup'); setProfile(empty); setRound(0); setScore(0); setPicked(null); setLocked(false); setSelfGuess(null); setFeedback(0); setFeedbackStatus(null) }

  const VideoTile=({p,i})=><div className={`know-video-tile ${i===0?'you':''}`}>
    <div className="know-video-top"><span className="know-live-dot"/><span>{i===0?'YOU':p.name}</span><small>{p.team}</small></div>
    <div className="know-video-avatar">{p.name==='YOU'?'YOU':p.name==='Dishit'?<img src={profilePhoto} alt="Dishit" />:p.name[0]}</div>
    <div className="know-video-name">{p.name}</div>
    <div className="know-video-role">{p.specialty}</div>
    <div className="know-video-description">
      <span><b>Meetings</b>{p.meetings}</span>
      <span><b>Restaurant</b>{p.restaurant}</span>
      <span><b>Free time</b>{p.free}</span>
    </div>
    <div className="know-video-controls"><i>●</i><i>◼</i><i>•••</i></div>
  </div>

  return <motion.div className="know-shell" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
    <div className="know-topbar"><div><span className="know-mark">KNOW</span><span className="know-submark">5-minute portfolio game</span></div><button className="know-close" onClick={onClose}>×</button></div>

    {phase==='setup' && <div className="know-stage know-setup">
      <div className="know-phase-head"><div><div className="know-kicker">MINUTE 1 · YOUR FIVE ANSWERS</div><h2>Build your behavioral fingerprint.</h2><p className="know-lead">No right or wrong answers. Pick the response that feels most like you.</p></div><div className={`know-timer ${setupLeft<=10?'urgent':''}`}>00:{String(setupLeft).padStart(2,'0')}</div></div>
      <div className="game-player-name"><label htmlFor="know-player-name">Leaderboard name <small>optional</small></label><input id="know-player-name" value={playerName} maxLength={40} placeholder="Your name" onChange={e=>{setPlayerName(cleanPlayerName(e.target.value));storePlayerName(e.target.value)}} /></div><div className="know-timebar"><i style={{width:`${(setupLeft/60)*100}%`}}/></div>
      <div className="know-question-grid">
        {[
          ['team','01','What is your team?'],['specialty','02','What is your specialty?'],['meetings','03','What are your views on meetings?'],['restaurant','04','At a restaurant, how do you usually choose?'],['free','05','What do you do with unexpected free time?']
        ].map(([key,no,label])=><div className="know-setup-card" key={key}><div className="know-qno">{no}</div><div className="know-qtitle">{label}</div><div className="know-option-wrap">{KNOW_OPTIONS[key].map(v=><button key={v} type="button" className={profile[key]===v?'selected':''} onClick={()=>setProfile(p=>({...p,[key]:v}))}>{v}</button>)}</div></div>)}
      </div>
      <div className="know-footer-line"><span>{Object.values(profile).filter(Boolean).length}/5 answered {setupLeft===0&&!complete?'· Timer finished — complete the remaining answers to continue.':''}</span><button className="know-primary" disabled={!complete} onClick={()=>setPhase('intro')}>Meet the team →</button></div>
    </div>}

    {phase==='intro' && <div className="know-stage know-intro-stage">
      <div className="know-intro-head"><div><div className="know-kicker">MINUTE 2 · INTRO ROUND</div><h2>Get to KNOW the room.</h2><p className="know-lead">Video-call view. You have one minute to notice the personalities — don't try to memorize everything.</p></div><div className={`know-timer ${introLeft<=10?'urgent':''}`}>00:{String(introLeft).padStart(2,'0')}</div></div>
      <div className="know-timebar"><i style={{width:`${(introLeft/60)*100}%`}}/></div>
      <div className="know-video-grid">{everyone.map((p,i)=><VideoTile key={p.name} p={p} i={i}/>)}</div>
      <div className="know-footer-line"><span>5 players · 6 timed rounds next · 30 seconds each</span><button className="know-primary" onClick={()=>{setPhase('rounds');setRound(0)}}>Start now →</button></div>
    </div>}

    {phase==='rounds' && (()=>{const r=rounds[round]; return <div className="know-stage know-round-stage">
      <div className="know-progress"><span>{r.eyebrow}</span><div className="know-round-meta"><span>{round+1} / 6</span><b className={roundLeft<=10?'urgent':''}>00:{String(roundLeft).padStart(2,'0')}</b></div></div>
      <div className="know-progressbar"><i style={{width:`${((round+1)/6)*100}%`}}/></div>
      <div className="know-timebar compact"><i style={{width:`${(roundLeft/30)*100}%`}}/></div>
      <div className="know-round-copy"><h2>{r.q}</h2>{r.type==='self' && <p>This answer is held until the final reveal.</p>}</div>
      <div className={`know-answer-grid ${r.type==='person'?'people':''}`}>{r.options.map(o=>{const correct=locked && r.type!=='self' && o===r.answer; const wrong=locked && picked===o && o!==r.answer && picked!=='__timeout__'; return <button type="button" key={o} disabled={locked} className={`${picked===o?'picked':''} ${correct?'correct':''} ${wrong?'wrong':''}`} onClick={()=>choose(o)}>{r.type==='person' && <b className="answer-avatar">{o[0]}</b>}<span>{o}</span></button>})}</div>
      {locked && r.type!=='self' && <div className="know-reveal"><strong>{picked==='__timeout__'?"Time's up.":picked===r.answer?'You got it.':'Not quite.'}</strong><span>{r.reveal}</span><button className="know-primary" onClick={nextRound}>Next round →</button></div>}
    </div>})()}

    {phase==='result' && <div className="know-stage know-result-stage">
      <div className="know-result-layout">
        <section className="know-result-main">
          <div className="know-kicker">RESULT · {outcome}</div>
          <div className="know-score-row"><div><div className="know-score">{teammateScore}</div><div className="know-score-label">KNOW SCORE</div></div><div className="know-result-copy"><h2>{score>=4?'You read this team quickly.':score>=3?'You picked up more than you think.':'This team kept a few secrets.'}</h2><p>{score} of 5 teammate predictions were correct.</p></div></div>
          <div className="know-surprise"><div className="know-kicker">SURPRISE ELEMENT</div><h2>{selfGuess===actual?'Apparently, you know yourself too.':'You spent the game reading everyone else. Your own answers had one more thing to say.'}</h2><div className="know-versus"><div><small>You described yourself as</small><strong>{selfGuess || 'No prediction'}</strong></div><div className="versus-arrow">→</div><div><small>Your five answers point to</small><strong>{actual}</strong></div></div><p>{selfGuess===actual?'Your prediction matched your behavioral fingerprint.':'That mismatch is the point: KNOW is about the model we carry of other people — and ourselves.'}</p></div>
          <div className="know-cta"><button className="know-secondary" onClick={restart}>Play again</button><button className="know-secondary" onClick={onClose}>Back to The Arena</button></div>
        </section>
        <aside className="know-result-side">
          <div className="know-feedback-card"><div className="know-kicker">QUICK FEEDBACK</div><h3>How was KNOW?</h3><GameStarRating value={feedback} onChange={setFeedback}/><button type="button" className="know-team-contact" disabled={!feedback||!!feedbackStatus} onClick={()=>submitGameFeedback('KNOW',`KNOW rating: ${feedback}/5`,feedback,setFeedbackStatus)}>Submit rating →</button><GameFeedbackConfirmation status={feedbackStatus} onPublish={()=>publishGameFeedback('KNOW',`KNOW rating: ${feedback}/5`,feedback,setFeedbackStatus)} onDismiss={()=>setFeedbackStatus('dismissed')}/></div>
          <div className="know-team-cta-card"><div className="know-kicker">YOUR TEAM</div><h3>Want KNOW with real teammates?</h3><p>Replace the four simulated profiles with your team's answers and play the same five-minute format together.</p><a className="know-team-contact" href="mailto:dishitkalsaria@gmail.com?subject=KNOW%20for%20my%20team&body=Hi%20Dishit%2C%0A%0AI%20played%20KNOW%20on%20your%20portfolio%20and%20would%20like%20to%20try%20a%20team%20version.%0A%0ATeam%20size%3A%20%0ACompany%2Fteam%3A%20%0A" onClick={()=>submitPortfolioData({type:'team_request',game:'KNOW',interest:'Team version',teamSize:'',name:'',email:'',note:'Requested from KNOW result screen'})}>Contact for my team →</a></div>
        </aside>
      </div>
    </div>}
  </motion.div>
}

// BELIEVE: four verifiable claims and two perspective questions. The latter are not graded.
const BELIEVE_ROUNDS = [
  {kind:'fact', tag:'01 · THE WARM-UP', title:'I have been in a Christopher Nolan movie.', truth:false,
    reveal:'No — I have not appeared in a Christopher Nolan movie. Sometimes the obvious answer is the right one.', note:'An easy start. Do not assume the next unusual claim is false, too.'},
  {kind:'fact', tag:'02 · THE PLOT TWIST', title:'I have been part of a project related to NASA.', truth:true,
    reveal:'Yes. I represented India in NASA’s Human Exploration Rover Challenge in 2017.', note:'A memorable chapter in my engineering journey.', articleUrl:'https://timesofindia.indiatimes.com/city/vadodara/barodian-led-team-successfully-completes-rover-challenge-at-nasa/articleshow/58212690.cms', articleTitle:'Barodian-led team successfully completes rover challenge at NASA' },
  {kind:'perspective', tag:'03 · YOUR INSTINCT', title:'A complicated operational problem appears with unclear ownership. What do you think I would naturally do first?',
    options:['Start building a technical solution','Understand the process and identify where it is breaking','Bring the stakeholders together immediately','Search for an existing tool that solves it'],
    reveal:'My own approach: understand the operating problem first, then determine whether data, software, automation or a process change is needed.', note:'Your choice shows what stood out to you — there is no wrong answer.'},
  {kind:'fact', tag:'04 · OWNERSHIP', title:'Most of my satisfaction from work came from delegation.', truth:false,
    reveal:'Not believe. Most of my satisfaction came from taking ownership of problems, helping teammates when they needed support, and guiding them toward the right solution.', note:'For me, the rewarding part is being close to the problem and helping the team move it forward.'},
  {kind:'fact', tag:'05 · THE NUMBERS', title:'One of my projects reduced manual effort by approximately 97%.', truth:true,
    reveal:'Believe. An internal audit application I worked on reduced manual effort by approximately 97%.', note:'The impact came from streamlining a highly manual process.'},
  {kind:'perspective', tag:'06 · YOUR JUDGMENT', title:'Based on what you have seen, which problem would you trust me with?',
    options:['Turn a messy operational process into a working system','Build a technical prototype from an unclear idea','Coordinate a cross-functional initiative with competing priorities','Analyze a complex problem and determine what should actually be built'],
    reveal:'Every option represents a different part of the work highlighted in this portfolio. Your answer tells me what made the strongest impression.', note:'This answer is not scored.'}
]

function BelieveGame({onClose}){
  const [phase,setPhase]=useState('welcome')
  const [round,setRound]=useState(0)
  const [seconds,setSeconds]=useState(30)
  const [answers,setAnswers]=useState({})
  const [chosen,setChosen]=useState(null)
  const [locked,setLocked]=useState(false)
  const [feedback,setFeedback]=useState(0)
  const [feedbackStatus,setFeedbackStatus]=useState(null)
  const [feedbackNote,setFeedbackNote]=useState('')
  const [playerName,setPlayerName]=useState(()=>getPlayerName())
  const current=BELIEVE_ROUNDS[round]
  const factRounds=BELIEVE_ROUNDS.filter(r=>r.kind==='fact')
  const correct=factRounds.filter(r=>answers[BELIEVE_ROUNDS.indexOf(r)]!==undefined && answers[BELIEVE_ROUNDS.indexOf(r)]===r.truth).length
  const factAnswers=factRounds.map(r=>answers[BELIEVE_ROUNDS.indexOf(r)]).filter(v=>typeof v==='boolean')
  const believeCount=factAnswers.filter(Boolean).length
  const judgment=believeCount>=3 ? 'THE OPEN-MINDED' : believeCount<=1 ? 'THE SKEPTIC' : correct>=3 ? 'THE CALIBRATOR' : 'THE INSTINCTIVE'
  const judgmentCopy={
    'THE OPEN-MINDED':'In these four rounds, you were willing to entertain most claims, even when they sounded unusual.',
    'THE SKEPTIC':'In these four rounds, you wanted more evidence before accepting most claims.',
    'THE CALIBRATOR':'In these four rounds, you distinguished between unlikely-sounding facts and plausible-sounding fiction.',
    'THE INSTINCTIVE':'You mixed belief and doubt. The reveals show how often your first instinct matched the facts.'
  }[judgment]
  const lastChoice=answers[5]
  const perspective=['EXECUTION','BUILDING','LEADERSHIP','SYSTEMS THINKING'][typeof lastChoice==='number'?lastChoice:0]
  const insight=[
    'You noticed an ability to transform complicated operations into systems people can actually use.',
    'You noticed the technical builder behind the work.',
    'You noticed the coordination and ownership needed to move cross-functional work forward.',
    'You noticed the analytical approach behind deciding what is worth building.'
  ][typeof lastChoice==='number'?lastChoice:0]
  const surprise=answers[1]===false?'You doubted the NASA connection — but it was real. An unexpected part of the journey made the biggest plot twist.':answers[4]===false?'You questioned the 97% reduction — that figure comes from an internal audit automation project.':answers[0]===true?'You believed the Christopher Nolan claim. The cinematic story was fiction; the rover challenge was real.':answers[3]===true?'You associated impact with managing large teams. My work shows how ownership and technical delivery can create impact across departments.':'You caught the invented claims and recognized the unusual true ones. Your first instincts held up in this game.'

  useEffect(()=>{
    if(phase!=='playing' || locked || seconds===0) return
    const id=setTimeout(()=>setSeconds(v=>Math.max(0,v-1)),1000)
    return ()=>clearTimeout(id)
  },[phase,round,locked,seconds])
  useEffect(()=>{
    if(phase==='playing' && seconds===0 && !locked){
      setLocked(true);setChosen(null);setAnswers(a=>({...a,[round]:null}))
    }
  },[phase,seconds,locked,round])
  useEffect(()=>{ if(phase==='result') saveGameResult('BELIEVE',{score:correct*25,correct,judgment,result:judgment}) },[phase])
  const choose=(value)=>{
    if(locked) return
    setChosen(value);setAnswers(a=>({...a,[round]:value}));setLocked(true)
  }
  const next=()=>{
    if(round===5){setPhase('result');return}
    setRound(v=>v+1);setSeconds(30);setChosen(null);setLocked(false)
  }
  const restart=()=>{setPhase('welcome');setRound(0);setSeconds(30);setAnswers({});setChosen(null);setLocked(false);setFeedback(0);setFeedbackNote('');setFeedbackStatus(null)}
  const answerButtons=current?.kind==='fact'?[{label:'BELIEVE',value:true},{label:'NOT BELIEVE',value:false}]:current?.options.map((label,value)=>({label,value}))
  const feedbackHref='mailto:dishitkalsaria@gmail.com?subject='+encodeURIComponent('BELIEVE demo feedback')+'&body='+encodeURIComponent('I played BELIEVE on your portfolio.\nRating: '+(feedback||'Not selected')+'\nFeedback: '+feedbackNote)
  return <motion.div className="know-shell believe-shell" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} role="dialog" aria-modal="true" aria-label="BELIEVE game">
    <div className="know-topbar"><div><span className="know-mark">BELIEVE</span><span className="know-submark">6 questions · 3-minute timed demo · Portfolio edition</span></div><button className="know-close" onClick={onClose} aria-label="Close BELIEVE">×</button></div>
    {phase==='welcome' && <div className="know-stage believe-welcome">
      <div className="know-kicker">A GAME ABOUT FIRST IMPRESSIONS</div><h1>What do you believe about Dishit?</h1>
      <p>You have seen the city. Now test your instincts. Two claims are true, two are invented, and two ask what you think of the person behind the portfolio.</p>
      <div className="believe-rules"><div><b>04</b><span>Believe / Not Believe</span></div><div><b>02</b><span>Your perspective</span></div><div><b>30s</b><span>Per round</span></div></div>
      <p className="believe-small">No microphone, camera, login or team required. Your perspective answers are not graded.</p>
      <div className="game-player-name centered-name"><label htmlFor="believe-player-name">Leaderboard name <small>optional</small></label><input id="believe-player-name" value={playerName} maxLength={40} placeholder="Your name" onChange={e=>{setPlayerName(cleanPlayerName(e.target.value));storePlayerName(e.target.value)}} /></div><button className="know-primary believe-start" onClick={()=>{setPhase('playing');setSeconds(30)}}>Start BELIEVE →</button>
    </div>}
    {phase==='playing' && <div className="know-stage know-round-stage believe-stage">
      <div className="know-progress"><span>{current.tag}</span><div className="know-round-meta"><span>{round+1} / 6</span><b className={seconds<=10?'urgent':''}>00:{String(seconds).padStart(2,'0')}</b></div></div>
      <div className="know-progressbar"><i style={{width:`${((round+1)/6)*100}%`}}/></div><div className="know-timebar compact"><i style={{width:`${(seconds/30)*100}%`}}/></div>
      <div className="believe-question"><div className="believe-question-mark">{current.kind==='fact'?'?':'◈'}</div><div className="know-kicker">{current.kind==='fact'?'FACT OR FICTION':'YOUR PERSPECTIVE · NO WRONG ANSWER'}</div><h2>{current.title}</h2></div>
      <div className={`know-answer-grid believe-answers ${current.kind==='fact'?'binary':''}`}>{answerButtons.map(o=><button type="button" key={o.label} disabled={locked} className={`${current.kind==='fact'?(o.value===true?'believe-yes':'believe-no'):''} ${chosen===o.value?'picked':''} ${locked&&current.kind==='fact'&&o.value===current.truth?'correct':''} ${locked&&current.kind==='fact'&&chosen===o.value&&o.value!==current.truth?'wrong':''}`} onClick={()=>choose(o.value)}>{o.label}</button>)}</div>
      {locked && <div className="know-reveal believe-reveal" aria-live="polite"><div><strong>{chosen===null?"TIME'S UP":current.kind==='perspective'?'YOUR VIEW IS IN':chosen===current.truth?'CORRECT':'PLOT TWIST'}</strong><p>{current.reveal}</p><small>{current.note}</small>{current.articleUrl && <a className="believe-source-link" href={current.articleUrl} target="_blank" rel="noopener noreferrer">Times of India · Read article ↗</a>}</div><button className="know-primary" onClick={next}>{round===5?'See results →':'Next question →'}</button></div>}
    </div>}
    {phase==='result' && <div className="know-stage know-result-stage believe-result"><div className="know-result-layout">
      <section className="know-result-main">
        <div className="know-kicker">BELIEVE · YOUR RESULTS</div>
        <div className="know-score-row"><div><div className="know-score">{correct}<span className="believe-score-denominator">/4</span></div><div className="know-score-label">FACTS READ CORRECTLY</div></div><div className="know-result-copy"><h2>{judgment}</h2><p>{judgmentCopy}</p><p className="believe-qualification">Your result describes your choices in this short game, not your overall personality.</p></div></div>
        <div className="believe-perspective"><div className="know-kicker">WHAT STOOD OUT TO YOU</div><h3>{typeof lastChoice==='number'?perspective:'NO SELECTION'}</h3><p>{typeof lastChoice==='number'?insight:'You skipped the final perspective question. It does not affect your factual score.'}</p></div>
        <div className="know-surprise"><div className="know-kicker">YOUR PLOT TWIST</div><h2>{surprise}</h2><p>Four factual judgments. Two perspectives. One more way to get to know the person behind the city.</p></div>
        <div className="know-cta"><button className="know-secondary" onClick={restart}>Play again</button><button className="know-secondary" onClick={onClose}>Back to The Arena</button></div>
      </section><aside className="know-result-side"><div className="know-feedback-card"><div className="know-kicker">QUICK FEEDBACK</div><h3>Did you enjoy BELIEVE?</h3><p>Help shape the next version.</p><GameStarRating value={feedback} onChange={setFeedback}/><label className="believe-feedback-label">What would make it better?<textarea value={feedbackNote} onChange={e=>setFeedbackNote(e.target.value)} maxLength={400} placeholder="Optional feedback..." /></label><button type="button" className="know-team-contact" disabled={!feedback||!!feedbackStatus} onClick={()=>submitGameFeedback('BELIEVE',`BELIEVE rating: ${feedback}/5${feedbackNote?` — ${feedbackNote}`:''}`,feedback,setFeedbackStatus)}>Submit feedback →</button><GameFeedbackConfirmation status={feedbackStatus} onPublish={()=>publishGameFeedback('BELIEVE',`BELIEVE rating: ${feedback}/5${feedbackNote?` — ${feedbackNote}`:''}`,feedback,setFeedbackStatus)} onDismiss={()=>setFeedbackStatus('dismissed')}/><a className="feedback-email-link" href={feedbackHref}>Send email ↗</a><p className="believe-feedback-disclosure">Thanks for the feedback. Email is optional if you want to add context.</p></div>
      <div className="know-team-cta-card"><div className="know-kicker">YOUR TEAM</div><h3>Want BELIEVE with real teammates?</h3><p>Bring your own stories and see which claims your team can spot.</p><a className="know-team-contact" href="mailto:dishitkalsaria@gmail.com?subject=BELIEVE%20for%20my%20team&body=Hi%20Dishit%2C%0A%0AI%20played%20BELIEVE%20on%20your%20portfolio%20and%20would%20like%20to%20try%20a%20team%20version.%0A%0ATeam%20size%3A%20%0ACompany%2Fteam%3A%20%0A" onClick={()=>submitPortfolioData({type:'team_request',game:'BELIEVE',interest:'Team version',teamSize:'',name:'',email:'',note:'Requested from BELIEVE result screen'})}>Contact for my team →</a></div></aside>
    </div></div>}
  </motion.div>
}

// CONNECT uses curated themed collections. All gameplay, scoring, and puzzle masks run locally.
const CONNECT_BANKS = {
  technology: {label:'Technology & AI', icon:'⌘', sets:[
    {link:'Building and running software', words:[['PYTHON','A popular programming language',1],['DATABASE','Stores and organizes application data',2],['ALGORITHM','A series of steps that solves a problem',3],['DEPLOYMENT','Releasing software into an environment',4],['ORCHESTRATION','Coordinating multiple services or tasks',5]]},
    {link:'Data and AI workflows',words:[['MODEL','A mathematical representation trained on data',1],['PROMPT','Instructions supplied to an AI model',2],['PIPELINE','A sequence of data-processing steps',3],['INFERENCE','Producing outputs from a trained model',4],['EMBEDDINGS','Numeric representations of meaning or content',5]]}
  ]},
  manufacturing: {label:'Manufacturing', icon:'⚙', sets:[
    {link:'Production planning',words:[['MACHINE','Equipment used to make a product',1],['SUPPLIER','Provides materials or components',2],['INVENTORY','Materials and finished goods held in stock',3],['SCHEDULING','Assigning production jobs across time',4],['BOTTLENECK','A constraint that limits total production flow',5]]},
    {link:'Factory operations',words:[['SAFETY','Preventing harm on the shop floor',1],['ASSEMBLY','Joining parts into a finished product',2],['CAPACITY','How much output a process can produce',3],['INSPECTION','Checking whether work meets requirements',4],['TRACEABILITY','Ability to follow a product through its history',5]]}
  ]},
  energy: {label:'Energy', icon:'⚡', sets:[
    {link:'Electric grid operations',words:[['POWER','Electrical energy delivered over time',1],['TURBINE','A rotating machine that can drive a generator',2],['VOLTAGE','Electrical potential difference',3],['SUBSTATION','Facility that transforms or switches electricity',4],['DISTRIBUTION','Delivering electricity from the grid to customers',5]]},
    {link:'Energy forecasting',words:[['SOLAR','Power obtained from sunlight',1],['DEMAND','Amount of electricity consumers need',2],['METERING','Measuring electrical consumption',3],['FORECASTING','Estimating future demand or generation',4],['RELIABILITY','Ability to deliver service consistently',5]]}
  ]},
  healthcare: {label:'Healthcare', icon:'✚', sets:[
    {link:'Patient care workflow',words:[['NURSE','Healthcare professional delivering patient care',1],['TRIAGE','Sorting patients by urgency of need',2],['DIAGNOSIS','Identifying a condition from evidence',3],['TREATMENT','Care intended to address a medical condition',4],['COORDINATION','Aligning the people and services involved in care',5]]},
    {link:'Healthcare administration',words:[['CLAIM','A request for insurance payment',1],['PATIENT','Person receiving medical care',2],['BILLING','Preparing charges for services provided',3],['ELIGIBILITY','Whether someone qualifies for coverage',4],['REIMBURSEMENT','Payment made for covered care or services',5]]}
  ]},
  business: {label:'Business & Finance', icon:'▥', sets:[
    {link:'Financial operations',words:[['BUDGET','Plan for income and spending',1],['REVENUE','Money earned from business activity',2],['CASHFLOW','Movement of money into and out of a business',3],['FORECASTING','Estimating future financial results',4],['RECONCILIATION','Comparing records to identify differences',5]]},
    {link:'Business operations',words:[['CLIENT','Person or organization receiving a service',1],['INVOICE','Document requesting payment for goods or services',2],['CONTRACT','Agreement specifying obligations',3],['PROCUREMENT','Acquiring goods or services for an organization',4],['STAKEHOLDER','Person or group affected by a decision or project',5]]}
  ]},
  general: {label:'General Knowledge', icon:'✦', sets:[
    {link:'Exploration and discovery',words:[['OCEAN','A vast body of salt water',1],['PLANET','Large celestial body orbiting a star',2],['TELESCOPE','Instrument used to see distant objects',3],['NAVIGATION','Finding a route from one place to another',4],['CONSTELLATION','Recognizable pattern of stars in the sky',5]]},
    {link:'Everyday connections',words:[['TRAIN','Rail vehicle carrying passengers or freight',1],['BICYCLE','Two-wheeled vehicle powered by pedaling',2],['HIGHWAY','Major road for long-distance travel',3],['TRANSPORT','Movement of people or goods',4],['INFRASTRUCTURE','Foundational facilities a society depends upon',5]]}
  ]}
}
const CONNECT_INDUSTRIES=Object.keys(CONNECT_BANKS)
const CONNECT_SECONDS=25
function connectMask(word, difficulty, variant){
  const chars=[...word]
  // Reveal at least two letters; start with multiple blanks and scale up to ~60% hidden.
  const target=Math.min(chars.length-2,Math.max(2,Math.round(chars.length*([0,.38,.44,.5,.57,.62][difficulty]))))
  const candidates=chars.map((_,i)=>i).filter(i=>i>0 && i<chars.length-1)
  const shuffled=[...candidates].sort((a,b)=>((a*7+variant*13)%17)-((b*7+variant*13)%17))
  const hidden=shuffled.slice(0,target).sort((a,b)=>a-b)
  return {hidden,mask:chars.map((c,i)=>hidden.includes(i)?'_':c)}
}
function ConnectGame({onClose}){
  const [phase,setPhase]=useState('welcome')
  const [industry,setIndustry]=useState('technology')
  const [variation,setVariation]=useState(0)
  const [round,setRound]=useState(0)
  const [seconds,setSeconds]=useState(CONNECT_SECONDS)
  const [entry,setEntry]=useState('')
  const [revealed,setRevealed]=useState(false)
  const [outcome,setOutcome]=useState('')
  const [records,setRecords]=useState([])
  const [connection,setConnection]=useState(null)
  const [connectionLocked,setConnectionLocked]=useState(false)
  const [bonusSeconds,setBonusSeconds]=useState(20)
  const [feedback,setFeedback]=useState(0)
  const [feedbackStatus,setFeedbackStatus]=useState(null)
  const [interest,setInterest]=useState('')
  const [playerName,setPlayerName]=useState(()=>getPlayerName())
  const [note,setNote]=useState('')
  const bank=CONNECT_BANKS[industry]
  const setIndex=variation%bank.sets.length
  const set=bank.sets[setIndex]
  const wordInfo=set.words[round]
  const mask=useMemo(()=>connectMask(wordInfo[0],wordInfo[2],variation),[industry,variation,round])
  const missing=mask.hidden.map(i=>wordInfo[0][i]).join('')
  const completed=records.filter(r=>r.correct).length
  const score=records.reduce((acc,r)=>acc+(r.correct?75+Math.round(25*r.time/CONNECT_SECONDS):0),0)+(connection===set.link?100:0)
  useEffect(()=>{ if(phase==='result') saveGameResult('CONNECT',{score,solved:completed,bonus:connection===set.link,result:completed===5?'THE QUICK CONNECTOR':completed>=3?'THE WORD EXPLORER':'THE CURIOUS STARTER'}) },[phase])
  const bonusOptions=useMemo(()=>{
    const all=[set.link,'Marketing and brand design','Recruitment and hiring','Travel and tourism'].filter((v,i,a)=>a.indexOf(v)===i)
    return [all[1],all[0],all[2],all[3]].filter(Boolean)
  },[set])
  useEffect(()=>{
    if(phase!=='words'||revealed||seconds<=0)return
    const timer=setTimeout(()=>setSeconds(v=>Math.max(0,v-1)),1000)
    return ()=>clearTimeout(timer)
  },[phase,seconds,revealed])
  useEffect(()=>{
    if(phase!=='words'||seconds!==0||revealed)return
    setOutcome('timeout');setRevealed(true)
    setRecords(old=>[...old,{word:wordInfo[0],correct:false,time:0}])
  },[phase,seconds,revealed,wordInfo])
  useEffect(()=>{
    if(phase!=='bonus'||connectionLocked||bonusSeconds<=0)return
    const timer=setTimeout(()=>setBonusSeconds(v=>Math.max(0,v-1)),1000)
    return ()=>clearTimeout(timer)
  },[phase,bonusSeconds,connectionLocked])
  useEffect(()=>{if(phase==='bonus'&&bonusSeconds===0)setConnectionLocked(true)},[phase,bonusSeconds])
  const submit=(e)=>{
    e.preventDefault(); if(revealed||!entry.trim())return
    const normalized=entry.trim().replace(/\s+/g,'').toUpperCase()
    const correct=normalized===missing||normalized===wordInfo[0]
    if(!correct){setOutcome('retry');return}
    setOutcome('correct');setRevealed(true)
    setRecords(old=>[...old,{word:wordInfo[0],correct:true,time:seconds}])
  }
  const next=()=>{
    if(round>=4){setPhase('bonus');setBonusSeconds(20);return}
    setRound(v=>v+1);setSeconds(CONNECT_SECONDS);setEntry('');setOutcome('');setRevealed(false)
  }
  const restart=()=>{setPhase('welcome');setVariation(v=>v+1);setRound(0);setSeconds(CONNECT_SECONDS);setEntry('');setOutcome('');setRevealed(false);setRecords([]);setConnection(null);setConnectionLocked(false);setBonusSeconds(20);setFeedback(0);setInterest('');setNote('');setFeedbackStatus(null)}
  const feedbackHref='mailto:dishitkalsaria@gmail.com?subject='+encodeURIComponent('CONNECT game feedback / team request')+'&body='+encodeURIComponent('I played CONNECT on your portfolio.\nIndustry: '+bank.label+'\nRating: '+(feedback||'Not selected')+'\nInterested in: '+(interest||'Not selected')+'\nNotes: '+note)
  return <motion.div className="know-shell connect-shell" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} role="dialog" aria-modal="true" aria-label="CONNECT word game">
    <div className="know-topbar"><div><span className="know-mark">CONNECT</span><span className="know-submark">Five words. One connection. · Portfolio edition</span></div><button className="know-close" onClick={onClose} aria-label="Close CONNECT">×</button></div>
    {phase==='welcome'&&<div className="know-stage connect-start">
      <div className="know-kicker">FIVE WORDS · ONE CONNECTION</div><h1>Know your field. Find the missing letters.</h1>
      <p>Choose an industry. Solve five increasingly tricky word puzzles, then discover the connection. Each word starts with multiple missing letters.</p>
      <div className="connect-industry-grid" role="group" aria-label="Choose industry">{CONNECT_INDUSTRIES.map(id=><button type="button" aria-pressed={id===industry} className={`connect-industry ${industry===id?'selected':''}`} key={id} onClick={()=>{setIndustry(id);setVariation(0)}}><span aria-hidden="true">{CONNECT_BANKS[id].icon}</span><strong>{CONNECT_BANKS[id].label}</strong></button>)}</div>
      <div className="connect-rules"><span><b>05</b> puzzles</span><span><b>25s</b> each</span><span><b>01</b> bonus connection</span></div>
      <p className="connect-disclaimer">Curated industry word sets. AI-generated specialization is available to request after the game. Puzzles are currently in English.</p>
      <div className="game-player-name connect-player-name"><label htmlFor="connect-player-name">Leaderboard name <small>optional</small></label><input id="connect-player-name" value={playerName} maxLength={40} placeholder="Your name" onChange={e=>{setPlayerName(cleanPlayerName(e.target.value));storePlayerName(e.target.value)}} /></div><button className="know-primary" onClick={()=>setPhase('words')}>Start CONNECT →</button>
    </div>}
    {phase==='words'&&<div className="know-stage connect-play">
      <div className="know-progress"><span>WORD {round+1} / 5 · {['WARM-UP','GETTING STARTED','KEEP GOING','HARD MODE','FINAL CHALLENGE'][round]}</span><div className="know-round-meta"><span>{bank.label}</span><b className={seconds<=10?'urgent':''}>00:{String(seconds).padStart(2,'0')}</b></div></div>
      <div className="know-progressbar"><i style={{width:`${(round/5)*100}%`}}/></div><div className="know-timebar compact"><i style={{width:`${seconds/CONNECT_SECONDS*100}%`}}/></div>
      <div className="connect-puzzle-title"><div className="know-kicker">FILL IN THE MISSING LETTERS</div><h2>{round===0?'Start with a few blanks.':'The gaps are growing.'}</h2><p>{wordInfo[1]}</p></div>
      <div className="connect-letter-grid" aria-label="Incomplete word">{mask.mask.map((c,i)=><div key={i} className={`connect-letter ${c==='_'?'missing':''}`}>{c==='_'?((entry.length===wordInfo[0].length?entry.toUpperCase()[i]:entry.toUpperCase()[mask.hidden.indexOf(i)])||'·'):c}</div>)}</div>
      <div className="connect-entry-info">{mask.hidden.length} missing letters · Enter them <b>in left-to-right order</b>, or type the full word.</div>
      <form className="connect-form" onSubmit={submit}><label htmlFor="connect-entry">Your answer</label><div className="connect-form-row"><input id="connect-entry" type="text" autoComplete="off" spellCheck="false" maxLength={wordInfo[0].length} value={entry} disabled={revealed} onChange={e=>{setEntry(e.target.value.replace(/[^a-zA-Z]/g,''));setOutcome('')}} placeholder="Missing letters or full word" aria-describedby="connect-message"/><button type="submit" className="know-primary" disabled={revealed||!entry.trim()}>Check →</button></div></form>
      <div id="connect-message" className={`connect-feedback ${outcome}`} aria-live="polite">{outcome==='retry'?'Not quite. Check the blanks and try again before time runs out.':outcome==='correct'?'That connects! Correct answer.':outcome==='timeout'?"Time's up — here's the word.":'Each word has one answer. The timer stops when you solve it.'}</div>
      {revealed&&<div className="connect-reveal"><div><span>{outcome==='correct'?'CORRECT':'WORD REVEALED'}</span><h3>{wordInfo[0]}</h3><p>{outcome==='correct'?`+${75+Math.round(25*seconds/CONNECT_SECONDS)} points · ${CONNECT_SECONDS-seconds}s to solve`:'You can try a new set when you replay.'}</p></div><button className="know-primary" onClick={next}>{round===4?'Final connection →':'Next word →'}</button></div>}
    </div>}
    {phase==='bonus'&&<div className="know-stage connect-bonus"><div className="know-progress"><span>FINAL CONNECTION · BONUS</span><div className="know-round-meta"><b className={bonusSeconds<=10?'urgent':''}>00:{String(bonusSeconds).padStart(2,'0')}</b></div></div><div className="know-timebar compact"><i style={{width:`${bonusSeconds/20*100}%`}}/></div><div className="know-kicker">ONE LAST CHALLENGE</div><h2>What connects your five words?</h2><div className="connect-summary-words">{set.words.map(([word])=><span key={word}>{word}</span>)}</div><div className="connect-bonus-grid">{bonusOptions.map(option=><button type="button" key={option} disabled={connectionLocked} className={`${connection===option?'picked':''} ${connectionLocked&&option===set.link?'correct':''}`} onClick={()=>{setConnection(option);setConnectionLocked(true)}}>{option}</button>)}</div>{connectionLocked&&<div className="connect-reveal"><div><span>{connection===set.link?'CORRECT CONNECTION':connection===null?"TIME'S UP":'THE CONNECTION'}</span><h3>{set.link}</h3><p>These terms all belong to {set.link.toLowerCase()}.</p></div><button className="know-primary" onClick={()=>setPhase('result')}>See your results →</button></div>}</div>}
    {phase==='result'&&<div className="know-stage know-result-stage connect-result"><div className="know-result-layout"><section className="know-result-main connect-result-main"><div className="know-kicker">CONNECT · YOUR RESULTS</div><div className="connect-score-hero"><div><div className="know-score">{score}<span className="connect-score-out-of">/600</span></div><div className="know-score-label">TOTAL POINTS</div></div><div className="connect-result-title"><span>{bank.label}</span><h2>{completed===5?'THE QUICK CONNECTOR':completed>=3?'THE WORD EXPLORER':'THE CURIOUS STARTER'}</h2><p>{completed===5?'You completed all five industry terms.':completed>=3?'You found most of the missing links.':'You made a start — replay to master this industry.'}</p></div></div><div className="connect-result-stats"><div><small>WORDS</small><b>{completed}/5</b><span>Solved</span></div><div><small>CONNECTION</small><b>{connection===set.link?'YES':'NO'}</b><span>Bonus</span></div><div><small>TIME</small><b>{records.filter(r=>r.correct).reduce((n,r)=>n+CONNECT_SECONDS-r.time,0)}s</b><span>Solving</span></div></div><div className="connect-review-card"><div className="section-title">YOUR WORD SET</div><div className="connect-answer-review">{set.words.map(([word],i)=><span className={records[i]?.correct?'solved':''} key={word}>{records[i]?.correct?'✓':'○'} {word}</span>)}</div><div className={`connect-bonus-result ${connection===set.link?'solved':''}`}><small>FINAL CONNECTION</small><strong>{set.link}</strong><span>{connection===set.link?'Correct connection':'Revealed after the round'}</span></div></div><div className="know-cta"><button className="know-secondary" onClick={restart}>Play another set</button><button className="know-secondary" onClick={onClose}>Back to The Arena</button></div></section><aside className="know-result-feedback connect-feedback-panel"><div className="know-kicker">YOUR FEEDBACK</div><h3>Enjoyed CONNECT?</h3><p>Would you like AI-generated words tailored to your actual job, or multiplayer for your team?</p><GameStarRating value={feedback} onChange={setFeedback} label="Your rating"/><label htmlFor="connect-interest">What would you like next?</label><select id="connect-interest" value={interest} onChange={e=>setInterest(e.target.value)}><option value="">Select an option</option><option>AI words for my profession</option><option>Multiplayer for my team</option><option>Both AI and multiplayer</option><option>Just enjoying the demo</option></select><label htmlFor="connect-note">Your industry or idea (optional)</label><textarea id="connect-note" rows="2" maxLength="300" value={note} onChange={e=>setNote(e.target.value)} placeholder="e.g. Medical billing for my 8-person team"/><button type="button" className="know-primary connect-contact" disabled={!feedback||!!feedbackStatus} onClick={()=>{submitGameFeedback('CONNECT',`CONNECT rating: ${feedback}/5 · ${interest||'No follow-up selected'}${note?` — ${note}`:''}`,feedback,setFeedbackStatus,()=>{if(interest && interest!=='Just enjoying the demo') submitPortfolioData({type:'team_request',game:'CONNECT',interest,teamSize:'',name:getPlayerName(),email:'',note})})}}>Submit feedback →</button><GameFeedbackConfirmation status={feedbackStatus} onPublish={()=>publishGameFeedback('CONNECT',`CONNECT rating: ${feedback}/5 · ${interest||'No follow-up selected'}${note?` — ${note}`:''}`,feedback,setFeedbackStatus)} onDismiss={()=>setFeedbackStatus('dismissed')}/><a className="feedback-email-link connect-email-link" href={feedbackHref}>Send email ↗</a><p className="connect-small-note">Thanks for the feedback. Email is optional if you want to continue the conversation.</p></aside></div></div>}
  </motion.div>
}

function Panel({focus, selectedFloor, onClose, onBackFloor, onSelectFloor, onHoverFloor, onLeaveFloor, cards, floors, lang, onStartKnow, onStartBelieve, onStartConnect}){
  if(focus === 'city') return null
  if(focus === 'tower' && selectedFloor){ const card = floors.find(f=>f.id===selectedFloor); return <motion.aside className="left-panel no-scroll" initial={{x:-420, opacity:0}} animate={{x:0, opacity:1}} exit={{x:-420, opacity:0}}><div className="panel-eyebrow">{lang==='en'?'THE CONTINUUM':tr(lang,'DISHIT TOWER')} · FLOOR {card.no}</div><FloorDetail card={card} lang={lang} onStartKnow={onStartKnow} onStartBelieve={onStartBelieve} onStartConnect={onStartConnect} /><div className="panel-actions bottom-actions"><button className="panel-btn secondary" onClick={onBackFloor}>{tr(lang,'Back to tower')}</button><button className="panel-btn" onClick={onClose}>{tr(lang,'Back to city')}</button></div></motion.aside> }
  if(focus === 'tower'){ return <motion.aside className="left-panel no-scroll tower-panel" initial={{x:-420, opacity:0}} animate={{x:0, opacity:1}} exit={{x:-420, opacity:0}}><div className="panel-eyebrow">{lang==='en'?'THE CONTINUUM':tr(lang,'DISHIT TOWER')}</div><div className="tower-panel-title">{tr(lang,'Choose a floor')}</div><TowerButtons floors={floors} onSelectFloor={onSelectFloor} onHoverFloor={onHoverFloor} onLeaveFloor={onLeaveFloor} /><div className="panel-actions bottom-actions"><button className="panel-btn" onClick={onClose}>{tr(lang,'Back to city')}</button></div></motion.aside> }
  const card = cards[focus]
  return <motion.aside className="left-panel no-scroll" initial={{x:-420, opacity:0}} animate={{x:0, opacity:1}} exit={{x:-420, opacity:0}}><div className="panel-eyebrow">{card.eyebrow}</div><BuildingPanel card={card} kind={focus} lang={lang} /><div className="panel-actions bottom-actions"><button className="panel-btn" onClick={onClose}>{tr(lang,'Back to city')}</button></div></motion.aside>
}

function Scene({blend, focus, selectedFloor, hoverFloor, onSelect, lang}){
  const [mobileScene,setMobileScene]=useState(()=>typeof window!=='undefined' && window.innerWidth<=900)
  useEffect(()=>{ const onResize=()=>setMobileScene(window.innerWidth<=900); window.addEventListener('resize',onResize); return ()=>window.removeEventListener('resize',onResize) },[])
  const p = useMemo(()=>palette(blend), [blend])
  const transform = selectedFloor ? floorTransforms[selectedFloor] : focusTransforms[focus]
  const inactive = (id) => focus !== 'city' && focus !== id
  const barYs = [185,214,243,272,301,330,359,388,417]
  const highlightIndex = selectedFloor ? floorToHighlightIndex[selectedFloor] : (hoverFloor ? floorToHighlightIndex[hoverFloor] : null)
  return <div className={`city-viewport ${focus!=='city'?'city-viewport-focused':''}`} aria-label="Interactive city skyline"><div className="city-scroll-track"><svg className="city-svg" viewBox="0 0 1600 740" preserveAspectRatio={mobileScene?"xMidYMid meet":"xMidYMid slice"}>
    <defs><linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={p.bgTop}/><stop offset="100%" stopColor={p.bgBottom}/></linearGradient><linearGradient id="wallGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={p.wall}/><stop offset="100%" stopColor={p.wall2}/></linearGradient><linearGradient id="glassGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={p.glass} stopOpacity=".55"/><stop offset="100%" stopColor={p.glass}/></linearGradient><linearGradient id="groundGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={p.ground}/><stop offset="100%" stopColor={p.bgTop}/></linearGradient><filter id="shadow" x="-20%" y="-10%" width="140%" height="130%"><feDropShadow dx="0" dy="8" stdDeviation="7" floodColor="#0B3D91" floodOpacity=".18"/></filter></defs>
    <rect width="1600" height="740" fill="url(#skyGrad)" />
    <g opacity={1-blend}><circle cx="1428" cy="70" r="28" fill={p.amber}/><ellipse cx="252" cy="66" rx="76" ry="20" fill={p.side} opacity=".32"/><ellipse cx="310" cy="70" rx="38" ry="14" fill={p.side} opacity=".28"/><ellipse cx="1380" cy="124" rx="86" ry="22" fill={p.side} opacity=".28"/><ellipse cx="1460" cy="126" rx="44" ry="16" fill={p.side} opacity=".24"/></g>
    <g opacity={blend}><circle cx="1432" cy="84" r="33" fill="#f7fbff"/>{[[56,62],[102,110],[160,84],[236,72],[306,114],[418,80],[530,126],[684,72],[812,120],[988,86],[1184,74],[1348,104],[1510,92]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r={i%3===0?2.4:1.6} fill="#fff" opacity=".88"/>)}</g>
    <g transform="translate(0 124)"><g opacity={focus==='city' ? .12 + blend*.1 : .16}>{Array.from({length:34}).map((_,i)=>{const x=i*46+((i*13)%20), h=36+((i*37)%150), w=28+((i*23)%26); return <rect key={i} x={x} y={470-h} width={w} height={h} fill={p.far}/>})}</g><g className="world" style={{ transform }}><rect y="470" width="1600" height="90" fill="url(#groundGrad)"/><rect y="470" width="1600" height="3" fill={p.ink} opacity=".15"/>
      <g filter="url(#shadow)" className={`interactive ${inactive('hospital') ? 'faded' : ''}`} onClick={()=>onSelect('hospital')}><polygon points="300,290 340,272 340,452 300,470" fill={p.side}/><rect x="70" y="290" width="230" height="180" rx="6" fill="url(#wallGrad)"/><polygon points="250,225 285,210 285,274 250,290" fill={p.side}/><rect x="120" y="225" width="130" height="65" rx="6" fill="url(#wallGrad)"/><rect x="163" y="178" width="46" height="46" rx="11" fill={p.blue}/><path d="M181 190h10v10h10v10h-10v10h-10v-10h-10v-10h10z" fill="#fff"/><rect x="70" y="284" width="230" height="8" rx="4" fill={p.ink} opacity=".18"/><WinGrid x={94} y={308} cols={5} rows={3} w={26} h={22} gx={14} gy={18} litChance={blend*.42 + .08} p={p}/><WinGrid x={132} y={240} cols={3} rows={1} w={26} h={22} gx={14} gy={0} litChance={blend*.62 + .10} p={p}/><rect x="146" y="408" width="108" height="9" rx="3" fill={p.ink}/><rect x="160" y="417" width="80" height="53" fill="url(#glassGrad)"/><rect x="199" y="417" width="2" height="53" fill={p.wall}/></g>
      <g filter="url(#shadow)" className={`interactive ${inactive('construction') ? 'faded' : ''}`} onClick={()=>onSelect('construction')}><rect x="393" y="426" width="57" height="44" fill="url(#glassGrad)"/><rect x="458" y="382" width="59" height="36" fill={p.glass} opacity=".4"/><g fill={p.wall2} stroke={p.side} strokeWidth="1.5"><rect x="385" y="330" width="140" height="8"/><rect x="385" y="374" width="140" height="8"/><rect x="385" y="418" width="140" height="8"/><rect x="385" y="330" width="8" height="140"/><rect x="450" y="330" width="8" height="140"/><rect x="517" y="330" width="8" height="140"/></g><path d="M393 338L450 374M450 338L393 374" stroke={p.side} strokeWidth="3"/><path d="M546 470L546 150M564 470L564 150" stroke={p.ink} strokeWidth="2"/>{Array.from({length:18}).map((_,idx)=>{const y=470-idx*18; const left=(y/18)%2<1?546:564; const right=(y/18)%2<1?564:546; return <path key={idx} d={`M${left} ${y}L${right} ${y-18}`} stroke={p.ink} strokeWidth="2"/>})}<rect x="450" y="150" width="200" height="8" rx="2" fill={p.amber}/><rect x="450" y="158" width="28" height="22" rx="2" fill={p.ink}/><rect x="562" y="156" width="20" height="16" rx="2" fill={p.ink}/><path d="M555 110L650 150M555 110L455 150" stroke={p.ink} strokeWidth="2" opacity=".6"/><path d="M620 158V250" stroke={p.ink} strokeWidth="2"/><rect x="608" y="250" width="24" height="12" rx="2" fill={p.amber}/><path d="M612 262L600 272M628 262L640 272" stroke={p.ink} strokeWidth="2"/><rect x="596" y="272" width="48" height="10" rx="2" fill={p.ink}/></g>
      <g filter="url(#shadow)" className={`interactive ${inactive('tower') ? 'faded' : ''}`} onClick={()=>!selectedFloor && onSelect('tower')}><polygon points="790,170 826,190 826,470 790,470" fill={p.side}/><polygon points="720,92 790,170 826,190 758,110" fill={p.side} opacity=".7"/><polygon points="650,170 720,92 790,170 790,470 650,470" fill="url(#wallGrad)"/><rect x="700" y="130" width="40" height="340" fill="url(#glassGrad)" opacity=".7"/><path d="M720 92V22" stroke={p.ink} strokeWidth="4" strokeLinecap="round"/><circle cx="720" cy="20" r="7" fill={p.blue}/>{barYs.map((y, idx)=>{const active=idx===highlightIndex; return <g key={idx}>{active && <rect x="660" y={y-6} width="120" height="26" rx="13" fill={p.amber} opacity=".22" />}<rect x="668" y={y} width="104" height="14" rx="7" fill={active ? p.blue : p.win} opacity=".96"/></g>})}<rect x="690" y="436" width="60" height="34" fill={p.ink} opacity=".85"/><rect x="700" y="446" width="40" height="24" fill={p.amber} opacity=".85"/></g>
      <g filter="url(#shadow)" className={`interactive ${inactive('energy') ? 'faded' : ''}`} onClick={()=>onSelect('energy')}>{[0,1,2].map(i=>{const x=880+i*62; return <g key={i}><path d={`M${x+58} 470V414`} stroke={p.side} strokeWidth="5"/><path d={`M${x+10} 372H${x+62}L${x+52} 414H${x}Z`} fill={p.blue}/><path d={`M${x+36} 372L${x+26} 414M${x+5} 393H${x+57}`} stroke="#fff" strokeWidth="1.2" opacity=".7"/></g>})}<path d="M1104 470L1107 240H1111L1114 470Z" fill={p.wall2} stroke={p.side}/><g transform="translate(1109 238)"><g className="spin" style={{transformOrigin:'0px 0px'}}>{[0,1,2].map(k=><path key={k} transform={`rotate(${k*120})`} d="M-6 0L-1 -82L1 -82L6 0Z" fill={p.wall} stroke={p.side} strokeWidth="1.5"/>)}</g></g><circle cx="1109" cy="238" r="7" fill={p.ink}/><path d="M1163 470L1165 335H1168L1170 470Z" fill={p.wall2} stroke={p.side}/><g transform="translate(1166 334)"><g className="spin2" style={{transformOrigin:'0px 0px'}}>{[0,1,2].map(k=><path key={k} transform={`rotate(${k*120})`} d="M-4 0L-1 -48L1 -48L4 0Z" fill={p.wall} stroke={p.side} strokeWidth="1.5"/>)}</g></g><circle cx="1166" cy="334" r="5" fill={p.ink}/></g>
      <g filter="url(#shadow)" className={`interactive ${inactive('manufacturing') ? 'faded' : ''}`} onClick={()=>onSelect('manufacturing')}><rect x="1335" y="215" width="22" height="130" rx="10" fill={p.glass}/><rect x="1375" y="230" width="22" height="115" rx="10" fill={p.glass}/><rect x="1335" y="235" width="22" height="7" fill={p.amber}/><rect x="1375" y="250" width="22" height="7" fill={p.amber}/><circle cx="1346" cy="205" r="13" fill={p.side} opacity=".55"/><circle cx="1386" cy="220" r="11" fill={p.side} opacity=".5"/><path d="M1220 470V320L1267 350V320L1314 350V320L1361 350V320L1408 350V470Z" fill="url(#wallGrad)"/><path d="M1220 320L1267 350M1267 320L1314 350M1314 320L1361 350M1361 320L1408 350" stroke={p.glass} strokeWidth="6"/><WinGrid x={1236} y={372} cols={8} rows={1} w={16} h={14} gx={6} gy={0} litChance={blend*.7 + .1} p={p}/><rect x="1236" y="420" width="44" height="50" rx="2" fill={p.win}/><rect x="1290" y="420" width="44" height="50" rx="2" fill={p.win}/><rect x="1344" y="420" width="44" height="50" rx="2" fill={p.win}/><rect x="1220" y="462" width="188" height="8" fill={p.amber} opacity=".9"/><rect x="1428" y="456" width="26" height="14" rx="3" fill={p.ink}/><path d="M1441 456V420L1478 392L1500 410V424M1493 424H1507" stroke={p.ink} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" fill="none"/><circle cx="1441" cy="420" r="6" fill={p.amber}/><circle cx="1478" cy="392" r="6" fill={p.amber}/></g>
      <g className={`interactive ${inactive('telecom') ? 'faded' : ''}`} onClick={()=>onSelect('telecom')}><path d="M1526 470L1550 190L1574 470" stroke={p.ink} strokeWidth="3" fill="none" strokeLinecap="round"/>{Array.from({length:4}).map((_,idx)=>{const by=440-idx*60; const hw=24*(by-190)/280; const hw2=24*(by-60-190)/280; return <g key={idx}><path d={`M${1550-hw} ${by}H${1550+hw}`} stroke={p.ink} strokeWidth="2"/><path d={`M${1550-hw} ${by}L${1550+hw2} ${by-60}`} stroke={p.ink} strokeWidth="2"/><path d={`M${1550+hw} ${by}L${1550-hw2} ${by-60}`} stroke={p.ink} strokeWidth="2"/></g>})}<path d="M1550 300L1590 280" stroke={p.amber} strokeWidth="5" strokeLinecap="round"/><circle cx="1550" cy="184" r="9" fill={p.blue}/></g>
      {focus==='city' && <>{[352,596,862,1196,1490].map((x,i)=><g key={i}><rect x={x-2} y="452" width="4" height="18" fill={p.side}/><circle cx={x} cy="446" r="14" fill={p.leaf}/></g>)}{[
        {lines:['HEALTHCARE','OFFICE'],x:200},
        {lines:['UNDER CONSTRUCTION','OFFICE'],x:470},
        {lines:['THE CONTINUUM'],x:720},
        {lines:['ENERGY','OFFICE'],x:1000},
        {lines:['MANUFACTURING','OFFICE'],x:1320},
        {lines:['CONNECT'],x:1550}
      ].map(({lines,x})=><g key={lines.join('-')}>
        <path d={`M${x} 478V492`} stroke={p.blue} strokeWidth="2" opacity=".45"/>
        <text x={x} y="512" className="label-text" fill={p.ink}>
          {lines.map((line,i)=><tspan key={line} x={x} dy={i===0 ? 0 : 17}>{tr(lang,line)}</tspan>)}
        </text>
      </g>)}</>}
    </g></g></svg>
  </div></div>
}

function PrivacyNotice({onClose}){
  return <motion.div className="privacy-backdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onMouseDown={e=>{if(e.target===e.currentTarget)onClose()}} role="dialog" aria-modal="true" aria-label="Privacy notice">
    <motion.section className="privacy-card" initial={{y:18,opacity:0}} animate={{y:0,opacity:1}} exit={{y:12,opacity:0}}>
      <div className="privacy-head"><div><div className="panel-eyebrow">PRIVACY</div><h2>Simple, minimal analytics.</h2></div><button type="button" className="privacy-close" onClick={onClose} aria-label="Close privacy notice">×</button></div>
      <div className="privacy-copy">
        <p>This portfolio uses browser storage to remember an anonymous visitor ID, optional player name, recent game results, and cached public analytics. The portfolio itself does not intentionally set first-party cookies.</p>
        <p>Game results, ratings, feedback, and selected interaction events may be sent to a private Google Sheet through Google Apps Script. Public sections display only aggregate analytics, leaderboard names you choose to provide, and feedback that is shared for publication.</p>
        <p>Name, title, company, and email fields are optional unless a specific form says otherwise. You can clear locally stored portfolio data at any time through your browser's site-data controls.</p>
      </div>
      <button type="button" className="panel-btn privacy-done" onClick={onClose}>Close</button>
    </motion.section>
  </motion.div>
}

function App(){
  const [blend, setBlend] = useState(0)
  const [focus, setFocus] = useState('city')
  const [selectedFloor, setSelectedFloor] = useState(null)
  const [hoverFloor, setHoverFloor] = useState(null)
  const [language, setLanguage] = useState('en')
  const [langOpen, setLangOpen] = useState(false)
  const [knowOpen, setKnowOpen] = useState(false)
  const [believeOpen, setBelieveOpen] = useState(false)
  const [connectOpen, setConnectOpen] = useState(false)
  const [privacyOpen, setPrivacyOpen] = useState(false)
  const cards = useMemo(()=>localize(buildingCards, language), [language])
  const floors = useMemo(()=>localize(floorData, language), [language])

  useEffect(()=>{
    try { localStorage.removeItem('dishit-portfolio-public-feedback-local') } catch {}
    trackEvent('visit','','portfolio_load')
  },[])

  // Desktop keeps the original wheel-driven sky. On touch devices, ordinary
  // swipes must remain available for scrolling the city and portfolio content.
  useEffect(()=>{
    const onWheel=(event)=>{
      if(knowOpen || believeOpen || connectOpen || privacyOpen) return
      if(window.matchMedia('(max-width: 900px)').matches) return
      if(event.target.closest('.left-panel, .privacy-backdrop, .know-shell, input, textarea, select')) return
      event.preventDefault()
      const delta=Math.sign(event.deltaY)*Math.min(Math.abs(event.deltaY)/800,.12)
      setBlend(v=>Math.max(0,Math.min(1,v+delta)))
    }
    window.addEventListener('wheel',onWheel,{passive:false})
    return ()=>window.removeEventListener('wheel',onWheel)
  },[knowOpen,believeOpen,connectOpen,privacyOpen])
  const gameActive=knowOpen || believeOpen || connectOpen
  const select=(id)=>{ if(id===focus){ setFocus('city'); setSelectedFloor(null); setHoverFloor(null); return } setFocus(id); setSelectedFloor(null); setHoverFloor(null) }
  const chooseLanguage=(code)=>{ setLanguage(code); setLangOpen(false) }

  return <main className={`app ${blend>.55 ? 'night' : ''}`}>
    <button className={`brand brand-btn ${focus !== 'city' ? 'brand-active' : ''}`} onClick={()=>select('telecom')}>DISHIT KALSARIA</button>

    <button type="button" className="mobile-header-theme" onClick={()=>setBlend(v=>v>.55?0:1)} aria-label={blend>.55?'Night mode. Switch to day':'Day mode. Switch to night'} title={blend>.55?'Night mode':'Day mode'}><span aria-hidden="true">{blend>.55?'☾':'☀'}</span></button>
    <div className="language-control">
      <button className="plane-button" onClick={()=>setLangOpen(v=>!v)} aria-label="Change language" title="Language / Taal / Idioma / Langue">
        <span className="plane-icon">✈</span>
        <span className="plane-code">{language.toUpperCase()}</span>
      </button>
      <AnimatePresence>
        {langOpen && <motion.div className="language-menu" initial={{opacity:0,y:-6}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-6}}>
          {LANGUAGES.map(item=><button key={item.code} className={language===item.code ? 'active' : ''} onClick={()=>chooseLanguage(item.code)}>{item.label}</button>)}
        </motion.div>}
      </AnimatePresence>
    </div>

    <button type="button" className="privacy-link" onClick={()=>setPrivacyOpen(true)}>Privacy</button>

    <div className={`masthead ${focus !== 'city' ? 'hidden' : ''}`}>
      <div className="eyebrow">{tr(language,'IDEAS INTO SYSTEMS')}</div>
      <h1>{tr(language,'Building practical solutions for complex industries.')}</h1>
      <p className="desktop-city-instructions">{tr(language,'Click a structure to explore · Scroll anywhere for the day / night transition')}</p>
    </div>

    <Scene blend={blend} focus={focus} selectedFloor={selectedFloor} hoverFloor={hoverFloor} onSelect={select} lang={language} />

    {focus!=='city' && !gameActive && !privacyOpen && <nav className="mobile-panel-navigation" aria-label="Portfolio navigation">
      <button type="button" onClick={()=>{if(focus==='tower' && selectedFloor){setSelectedFloor(null);setHoverFloor(null)} else {setFocus('city');setSelectedFloor(null);setHoverFloor(null)}}}>{focus==='tower' && selectedFloor?'← Back to tower':'← Back to city'}</button>
      {focus==='tower' && selectedFloor && <button type="button" onClick={()=>{setFocus('city');setSelectedFloor(null);setHoverFloor(null)}}>⌂ City</button>}
    </nav>}
    <AnimatePresence mode="wait">
      <Panel key={`${focus}-${selectedFloor || 'root'}-${language}`} focus={focus} selectedFloor={selectedFloor} onClose={()=>{ setFocus('city'); setSelectedFloor(null); setHoverFloor(null) }} onBackFloor={()=>{ setSelectedFloor(null); setHoverFloor(null) }} onSelectFloor={setSelectedFloor} onHoverFloor={setHoverFloor} onLeaveFloor={()=>setHoverFloor(null)} cards={cards} floors={floors} lang={language} onStartKnow={()=>{trackEvent('game_started','KNOW');setKnowOpen(true)}} onStartBelieve={()=>{trackEvent('game_started','BELIEVE');setBelieveOpen(true)}} onStartConnect={()=>{trackEvent('game_started','CONNECT');setConnectOpen(true)}} />
    </AnimatePresence>
    <AnimatePresence>{knowOpen && <KnowGame onClose={()=>setKnowOpen(false)} />}{believeOpen && <BelieveGame onClose={()=>setBelieveOpen(false)} />}{connectOpen && <ConnectGame onClose={()=>setConnectOpen(false)} />}</AnimatePresence>
    <AnimatePresence>{privacyOpen && <PrivacyNotice onClose={()=>setPrivacyOpen(false)} />}</AnimatePresence>
  </main>
}

createRoot(document.getElementById('root')).render(<App />)
